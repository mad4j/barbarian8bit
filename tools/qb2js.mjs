#!/usr/bin/env node
/**
 * Minimal QB64 -> JavaScript translator, tailored to the subset of the
 * language used by barbarianC64.bas.
 *
 * The original program is one big GOTO state machine, so every label becomes
 * a `case` of a `switch` inside a labelled loop; GOTO is `pc = N; continue`.
 * Block IF/ELSE/END IF are compiled to conditional jumps as well, because the
 * source jumps into the middle of IF blocks. Single-line IFs map to JS `if`.
 * Blocking statements (SLEEP, _LIMIT) are `yield`s of a generator that the
 * runtime scheduler resumes.
 *
 * Usage: node tools/qb2js.mjs <input.bas> <output.js> [--check]
 *   --check  do not write; fail if <output.js> differs from the fresh translation
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { translate, translateOrKeep, unresolved } from './naming.mjs';

const args = process.argv.slice(2);
const check = args.includes('--check');
const [inputPath, outputPath] = args.filter((a) => !a.startsWith('--'));
if (!inputPath || !outputPath) {
  console.error('usage: node tools/qb2js.mjs <input.bas> <output.js> [--check]');
  process.exit(1);
}

// ---------------------------------------------------------------- lexer
function tokenizeLine(text, lineNo) {
  const tokens = [];
  let i = 0;
  const err = (m) => { throw new Error(`line ${lineNo}: ${m}: ${text.trim()}`); };
  while (i < text.length) {
    const c = text[i];
    if (c === ' ' || c === '\t') { i++; continue; }
    if (c === "'") break;
    if (c === '"') {
      let s = '';
      i++;
      for (;;) {
        if (i >= text.length) break; // QB tolerates a missing closing quote
        if (text[i] === '"') {
          if (text[i + 1] === '"') { s += '"'; i += 2; continue; }
          i++;
          break;
        }
        s += text[i++];
      }
      tokens.push({ t: 'str', v: s });
      continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(text[i + 1] || ''))) {
      const m = /^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(text.slice(i));
      i += m[0].length;
      if (/[!#%&]/.test(text[i] || '')) i++;
      tokens.push({ t: 'num', v: m[0] });
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      const m = /^[A-Za-z_][A-Za-z0-9_]*[$%&!#]?/.exec(text.slice(i));
      i += m[0].length;
      const word = m[0];
      if (word.toUpperCase() === 'REM') break;
      tokens.push({ t: 'id', v: word.toLowerCase(), up: word.toUpperCase() });
      continue;
    }
    const two = text.slice(i, i + 2);
    if (two === '<>' || two === '<=' || two === '>=') { tokens.push({ t: 'op', v: two }); i += 2; continue; }
    if ('=<>+-*/\\^(),;:'.includes(c)) { tokens.push({ t: 'op', v: c }); i++; continue; }
    err(`unexpected character '${c}'`);
  }
  return tokens;
}

// ---------------------------------------------------------------- translator
const KEYWORD_LABEL_EXCLUDE = new Set(['do', 'else', 'loop', 'cls']);
const BUILTIN_FUNCS = {
  '_keydown': 'rt.keydown', 'stick': 'rt.stick', 'strig': 'rt.strig', 'string$': 'rt.string_',
  'chr$': 'rt.chr_', '_rgb': 'rt.rgb', '_rgb32': 'rt.rgb', '_loadimage': 'rt.loadimage',
  '_loadfont': 'rt.loadfont', '_sndopen': 'rt.sndopen',
  'int': 'Math.floor', 'abs': 'Math.abs', 'rnd': 'rt.rnd', 'len': 'rt.len',
  'left$': 'rt.left_', 'right$': 'rt.right_', 'str$': 'rt.str_', 'timer': 'rt.timer',
};
const CONSTANTS = {
  '_keepbackground': 'rt.KEEPBACKGROUND', '_fillbackground': 'rt.FILLBACKGROUND',
  '_off': 'rt.OFF', '_middle': 'rt.MIDDLE',
};

const assetNames = JSON.parse(readFileSync(new URL('./asset-names.json', import.meta.url), 'utf8'));
const nameOrigins = new Map();

function claim(english, french, what) {
  const key = `${what}:${english}`;
  const prev = nameOrigins.get(key);
  if (prev && prev !== french) throw new Error(`${what} name collision: '${prev}' and '${french}' -> '${english}'`);
  nameOrigins.set(key, french);
  return english;
}

function varName(id) {
  const base = id.replace(/[$%&!#]$/, '');
  const english = claim(translateOrKeep(base, 'variable'), base, 'variable');
  return `${id.endsWith('$') ? 's' : 'v'}_${english}`;
}

// Translates a string literal: asset paths via the generated file map, state
// words (e.g. "debout") via the dictionary. Anything else is left untouched.
function stringLiteral(value) {
  if (/^C64\//i.test(value)) {
    const mapped = assetNames[value.slice(4).toLowerCase()];
    if (mapped) return `C64/${mapped}`;
    // referenced by the original program but absent from its resources (a silent no-op there)
    const m = /^(.*\/)([^/.]+)(\.\w+)$/.exec(value);
    return m ? m[1] + translateOrKeep(m[2], `missing file ${value}`) + m[3] : value;
  }
  if (/^[A-Za-z][A-Za-z0-9]*$/.test(value)) {
    const english = translate(value);
    if (english !== null) return claim(english, value, 'string');
  }
  return value;
}

class Translator {
  constructor(source) {
    this.lines = source.split(/\r?\n/);
    this.labels = new Map();
    this.vars = new Set();
    this.out = [];
    this.ifStack = [];
    this.loops = [];
    this.nextId = 1;
    this.lineNo = 0;
  }

  fail(msg) { throw new Error(`line ${this.lineNo}: ${msg}`); }

  labelId(name) {
    if (!this.labels.has(name)) this.labels.set(name, { id: this.nextId++, defined: false });
    return this.labels.get(name).id;
  }

  // ---- token stream helpers
  peek(o = 0) { return this.toks[this.p + o]; }
  next() { return this.toks[this.p++]; }
  isOp(v, o = 0) { const t = this.peek(o); return t && t.t === 'op' && t.v === v; }
  isKw(up, o = 0) { const t = this.peek(o); return t && t.t === 'id' && t.up === up; }
  expectOp(v) { if (!this.isOp(v)) this.fail(`expected '${v}'`); return this.next(); }
  atEnd() { return this.p >= this.toks.length; }

  // ---- expressions (QB precedence: OR < AND < NOT < comparison < +- < MOD < \ < */ < unary - < ^)
  expr() { return this.orExpr(); }
  orExpr() {
    let l = this.andExpr();
    while (this.isKw('OR')) { this.next(); l = `(${l} || ${this.andExpr()})`; }
    return l;
  }
  andExpr() {
    let l = this.notExpr();
    while (this.isKw('AND')) { this.next(); l = `(${l} && ${this.notExpr()})`; }
    return l;
  }
  notExpr() {
    if (this.isKw('NOT')) { this.next(); return `(!${this.notExpr()})`; }
    return this.cmpExpr();
  }
  cmpExpr() {
    let l = this.addExpr();
    const map = { '=': '===', '<>': '!==', '<': '<', '>': '>', '<=': '<=', '>=': '>=' };
    while (this.peek() && this.peek().t === 'op' && map[this.peek().v]) {
      const op = map[this.next().v];
      l = `(${l} ${op} ${this.addExpr()})`;
    }
    return l;
  }
  addExpr() {
    let l = this.modExpr();
    while (this.isOp('+') || this.isOp('-')) {
      const op = this.next().v;
      l = `(${l} ${op} ${this.modExpr()})`;
    }
    return l;
  }
  modExpr() {
    let l = this.idivExpr();
    while (this.isKw('MOD')) { this.next(); l = `(${l} % ${this.idivExpr()})`; }
    return l;
  }
  idivExpr() {
    let l = this.mulExpr();
    while (this.isOp('\\')) { this.next(); l = `Math.trunc(${l} / ${this.mulExpr()})`; }
    return l;
  }
  mulExpr() {
    let l = this.unaryExpr();
    while (this.isOp('*') || this.isOp('/')) {
      const op = this.next().v;
      l = `(${l} ${op} ${this.unaryExpr()})`;
    }
    return l;
  }
  unaryExpr() {
    if (this.isOp('-')) { this.next(); return `(-${this.unaryExpr()})`; }
    if (this.isOp('+')) { this.next(); return this.unaryExpr(); }
    return this.powExpr();
  }
  powExpr() {
    let l = this.primary();
    while (this.isOp('^')) { this.next(); l = `Math.pow(${l}, ${this.primary()})`; }
    return l;
  }
  primary() {
    const t = this.next();
    if (!t) this.fail('unexpected end of expression');
    if (t.t === 'num') return t.v;
    if (t.t === 'str') return JSON.stringify(this.inPrint ? t.v : stringLiteral(t.v));
    if (t.t === 'op' && t.v === '(') {
      const e = this.expr();
      this.expectOp(')');
      return `(${e})`;
    }
    if (t.t === 'id') {
      if (CONSTANTS[t.v]) return CONSTANTS[t.v];
      if (t.v === 'inkey$') return 'rt.inkey()';
      if (this.isOp('(')) {
        const fn = BUILTIN_FUNCS[t.v];
        if (!fn) this.fail(`unknown function ${t.up}`);
        this.next();
        const args = [];
        if (!this.isOp(')')) {
          do { args.push(this.expr()); } while (this.isOp(',') && this.next());
        }
        this.expectOp(')');
        return `${fn}(${args.join(', ')})`;
      }
      if (t.v === 'timer') return 'rt.timer()';
      const name = varName(t.v);
      this.vars.add(name);
      return name;
    }
    this.fail(`unexpected token ${JSON.stringify(t)}`);
  }

  // ---- statements
  statements(stopAtElse) {
    const parts = [];
    for (;;) {
      if (this.atEnd()) break;
      if (this.isOp(':')) { this.next(); continue; }
      if (stopAtElse && this.isKw('ELSE')) break;
      parts.push(this.statement());
    }
    return parts.join(' ');
  }

  coordPair() {
    this.expectOp('(');
    const x = this.expr();
    this.expectOp(',');
    const y = this.expr();
    this.expectOp(')');
    return [x, y];
  }

  jump(label) {
    return `{ pc = ${this.labelId(label)}; continue main; }`;
  }

  statement() {
    const t = this.peek();
    if (t.t !== 'id') this.fail('statement expected');
    const kw = t.up;

    // assignment
    if (this.isOp('=', 1)) {
      this.next(); this.next();
      const name = varName(t.v);
      this.vars.add(name);
      return `${name} = ${this.expr()};`;
    }

    this.next();
    switch (kw) {
      case 'IF': {
        const cond = this.expr();
        if (this.isKw('GOTO')) {
          return `if (${cond}) { ${this.statements(true)} }`;
        }
        if (!this.isKw('THEN')) this.fail('THEN expected');
        this.next();
        if (this.atEnd()) this.fail('block IF must start a line');
        const thenPart = this.statements(true);
        let elsePart = '';
        if (this.isKw('ELSE')) { this.next(); elsePart = ` else { ${this.statements(true)} }`; }
        return `if (${cond}) { ${thenPart} }${elsePart}`;
      }
      case 'GOTO': return this.jump(this.next().v);
      case 'DO': {
        const id = this.nextId++;
        this.loops.push(id);
        this.pendingCase = id;
        return `/*DO*/`;
      }
      case 'LOOP': {
        const id = this.loops.pop();
        if (id === undefined) this.fail('LOOP without DO');
        if (this.isKw('UNTIL')) {
          this.next();
          return `if (!(${this.expr()})) { pc = ${id}; continue main; }`;
        }
        if (this.isKw('WHILE')) {
          this.next();
          return `if (${this.expr()}) { pc = ${id}; continue main; }`;
        }
        return `{ pc = ${id}; continue main; }`;
      }
      case 'END': return 'return;';
      case 'SYSTEM': return 'yield rt.system(); return;';
      case 'SCREEN': return `rt.screen(${this.expr()});`;
      case 'CLS': {
        const args = [];
        if (!this.atEnd() && !this.isOp(':')) {
          if (!this.isOp(',')) args.push(this.expr()); else args.push('undefined');
          if (this.isOp(',')) { this.next(); args.push(this.expr()); }
        }
        return `rt.cls(${args.join(', ')});`;
      }
      case 'COLOR': {
        const fg = this.isOp(',') ? 'undefined' : this.expr();
        let bg = 'undefined';
        if (this.isOp(',')) { this.next(); bg = this.expr(); }
        return `rt.color(${fg}, ${bg});`;
      }
      case 'LOCATE': {
        const r = this.isOp(',') ? 'undefined' : this.expr();
        let c = 'undefined';
        if (this.isOp(',')) { this.next(); c = this.expr(); }
        return `rt.locate(${r}, ${c});`;
      }
      case 'PRINT': {
        const items = [];
        let newline = true;
        this.inPrint = true; // printed text is user-visible: never translated
        while (!this.atEnd() && !this.isOp(':') && !this.isKw('ELSE')) {
          if (this.isOp(';') || this.isOp(',')) { this.next(); newline = false; continue; }
          items.push(this.expr());
          newline = true;
        }
        this.inPrint = false;
        return `rt.print([${items.join(', ')}], ${newline});`;
      }
      case 'LINE': {
        let x1 = 'undefined', y1 = 'undefined';
        if (this.isOp('(')) [x1, y1] = this.coordPair();
        this.expectOp('-');
        const [x2, y2] = this.coordPair();
        let color = 'undefined', mode = '""';
        if (this.isOp(',')) {
          this.next();
          if (!this.isOp(',')) color = this.expr();
          if (this.isOp(',')) { this.next(); mode = JSON.stringify(this.next().up); }
        }
        return `rt.line(${x1}, ${y1}, ${x2}, ${y2}, ${color}, ${mode});`;
      }
      case '_PUTIMAGE': {
        let a = ['undefined', 'undefined'], b = ['undefined', 'undefined'];
        if (this.isOp('(')) {
          a = this.coordPair();
          if (this.isOp('-')) { this.next(); b = this.coordPair(); }
        }
        this.expectOp(',');
        const img = this.expr();
        return `rt.putimage(${img}, ${a[0]}, ${a[1]}, ${b[0]}, ${b[1]});`;
      }
      case '_COPYPALETTE': {
        const src = this.isOp(',') ? 'undefined' : this.expr();
        let dst = 'undefined';
        if (this.isOp(',')) { this.next(); dst = this.expr(); }
        return `rt.copypalette(${src}, ${dst});`;
      }
      case '_PALETTECOLOR': case 'PALETTE': {
        const a = this.expr(); this.expectOp(','); const c = this.expr();
        return `rt.${kw === 'PALETTE' ? 'palette' : 'palettecolor'}(${a}, ${c});`;
      }
      case '_CLEARCOLOR': {
        const c = this.expr(); this.expectOp(','); const img = this.expr();
        return `rt.clearcolor(${c}, ${img});`;
      }
      case '_FONT': return `rt.font(${this.expr()});`;
      case '_PRINTMODE': return `rt.printmode(${this.expr()});`;
      case '_DISPLAY': return 'rt.display();';
      case '_LIMIT': return `yield rt.limit(${this.expr()});`;
      case 'SLEEP': return `yield rt.sleep(${this.atEnd() || this.isOp(':') || this.isKw('ELSE') ? '' : this.expr()});`;
      case '_SNDPLAYFILE': return `rt.sndplayfile(${this.expr()});`;
      case '_SNDLOOP': return `rt.sndloop(${this.expr()});`;
      case '_SNDSTOP': return `rt.sndstop(${this.expr()});`;
      case '_FULLSCREEN': return `rt.fullscreen(${this.atEnd() || this.isOp(':') || this.isKw('ELSE') ? '' : this.expr()});`;
      case '_SCREENMOVE': this.expr(); return '';
      case '_TITLE': return `rt.title(${this.expr()});`;
      case '_ICON': this.expr(); return '';
      default:
        this.fail(`unsupported statement ${kw}`);
    }
  }

  // ---- program
  firstPass() {
    this.lines.forEach((text, i) => {
      this.lineNo = i + 1;
      const toks = tokenizeLine(text, this.lineNo);
      if (toks.length >= 2 && toks[0].t === 'id' && toks[1].t === 'op' && toks[1].v === ':'
          && !KEYWORD_LABEL_EXCLUDE.has(toks[0].v) && /^[a-z_][a-z0-9_]*$/.test(toks[0].v)) {
        this.labelId(toks[0].v);
        this.labels.get(toks[0].v).defined = true;
      }
    });
  }

  translate() {
    this.firstPass();
    this.out.push('case 0:');
    this.lines.forEach((text, i) => {
      this.lineNo = i + 1;
      this.toks = tokenizeLine(text, this.lineNo);
      this.p = 0;
      if (!this.toks.length) return;

      // label definition
      if (this.toks.length >= 2 && this.toks[0].t === 'id' && this.isOp(':', 1)
          && !KEYWORD_LABEL_EXCLUDE.has(this.toks[0].v)) {
        this.out.push(`case ${this.labelId(this.toks[0].v)}: // ${translateOrKeep(this.toks[0].v, 'label')}`);
        this.p = 2;
      }
      this.line();
    });
    if (this.ifStack.length || this.loops.length) this.fail('unbalanced blocks at end of file');
    for (const [name, l] of this.labels) if (!l.defined) throw new Error(`undefined label ${name}`);
  }

  // Block IFs are compiled to conditional jumps (not JS blocks) because the
  // source GOTOs into the middle of them.
  line() {
    const top = () => this.ifStack[this.ifStack.length - 1];
    const closeBranch = () => {
      const f = top();
      if (!f) this.fail('ELSE/ELSEIF without IF');
      this.out.push(`{ pc = ${f.end}; continue main; }`);
      if (f.elseLabel) this.out.push(`case ${f.elseLabel}:`);
      f.elseLabel = 0;
    };
    while (!this.atEnd()) {
      if (this.isOp(':')) { this.next(); continue; }

      if (this.isKw('END') && this.isKw('IF', 1)) {
        this.p += 2;
        const f = this.ifStack.pop();
        if (!f) this.fail('END IF without IF');
        if (f.elseLabel) this.out.push(`case ${f.elseLabel}:`);
        this.out.push(`case ${f.end}:`);
        continue;
      }
      if (this.isKw('ELSEIF')) {
        this.next();
        const cond = this.expr();
        if (!this.isKw('THEN')) this.fail('THEN expected');
        this.next();
        closeBranch();
        top().elseLabel = this.nextId++;
        this.out.push(`if (!(${cond})) { pc = ${top().elseLabel}; continue main; }`);
        continue;
      }
      if (this.isKw('ELSE')) {
        this.next();
        closeBranch();
        continue;
      }
      if (this.isKw('IF')) {
        // block IF = IF cond THEN <end of line>
        const save = this.p;
        this.next();
        const cond = this.expr();
        if (this.isKw('THEN') && this.p + 1 === this.toks.length) {
          this.next();
          const f = { end: this.nextId++, elseLabel: this.nextId++ };
          this.ifStack.push(f);
          this.out.push(`if (!(${cond})) { pc = ${f.elseLabel}; continue main; }`);
          continue;
        }
        this.p = save;
      }
      this.pendingCase = 0;
      const code = this.statements(false);
      if (this.pendingCase) {
        const id = this.pendingCase;
        this.pendingCase = 0;
        this.out.push(`case ${id}: // DO`);
      }
      if (code.trim()) this.out.push(code.replace('/*DO*/', ''));
      break;
    }
  }

  emit() {
    const vars = [...this.vars].sort().map((v) => `${v} = ${v.startsWith('s_') ? '""' : '0'}`);
    return [
      '// Generated by tools/qb2js.mjs from barbarianC64.bas - do not edit.',
      '/* eslint-disable */',
      'export function* program(rt) {',
      `  let ${vars.join(', ')};`,
      '  let pc = 0;',
      '  main: for (;;) {',
      '    switch (pc) {',
      ...this.out.map((l) => '      ' + l),
      '      default: return;',
      '    }',
      '    return;',
      '  }',
      '}',
      '',
    ].join('\n');
  }
}

const source = readFileSync(inputPath, 'latin1');
const tr = new Translator(source);
tr.translate();
if (unresolved.size) {
  console.error('untranslated French names (add them to tools/fr-en.json):\n  ' + [...unresolved].join('\n  '));
  process.exit(1);
}
const output = tr.emit();
if (check) {
  let current = '';
  try { current = readFileSync(outputPath, 'utf8'); } catch { /* missing */ }
  if (current !== output) {
    console.error(`${outputPath} is out of date: run "npm run build:game"`);
    process.exit(1);
  }
  console.log(`${outputPath} is up to date`);
} else {
  writeFileSync(outputPath, output);
  console.log(`translated ${tr.lines.length} lines, ${tr.labels.size} labels, ${tr.vars.size} variables`);
}
