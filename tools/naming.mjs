/**
 * French -> English renaming shared by the QB64 translator (variables, state
 * strings, labels, asset paths) and the asset packer (file names), so that
 * names in the generated code always match the files on disk.
 *
 * A name is split into chunks by case/digits ("protegeD1" -> protege, D, 1);
 * each chunk is segmented into dictionary stems (tools/fr-en.json) and the
 * result is joined in camelCase. Names that cannot be fully resolved are
 * reported through `unresolved` instead of being guessed.
 *
 * CLI: node tools/naming.mjs <C64 resource dir> <output asset-names.json>
 */
import { readFileSync, readdirSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dict = JSON.parse(readFileSync(join(here, 'fr-en.json'), 'utf8'));
const STEMS = Object.entries(dict.stems);
const SUFFIXES = dict.suffixes;

export const unresolved = new Set();

const cache = new Map();

function segment(chunk, upper) {
  const s = chunk.toLowerCase();
  const memo = new Map();
  const best = (i) => {
    if (i === s.length) return { cost: 0, toks: [] };
    if (memo.has(i)) return memo.get(i);
    let res = null;
    const consider = (len, tok, cost) => {
      const rest = best(i + len);
      if (!rest) return;
      const total = cost + rest.cost;
      if (!res || total < res.cost) res = { cost: total, toks: [tok, ...rest.toks] };
    };
    for (const [fr, en] of STEMS) {
      if (s.startsWith(fr, i)) consider(fr.length, { t: en, key: fr }, en === '' ? 1.1 : 1);
    }
    if (upper) {
      for (const [k, v] of Object.entries(SUFFIXES)) {
        if (s.startsWith(k, i)) consider(k.length, { t: v, key: k, suffix: true }, 1);
      }
    } else if (s[i] === 'a' || s[i] === 'b') {
      consider(1, { t: s[i].toUpperCase(), key: s[i] }, 3);
    }
    memo.set(i, res);
    return res;
  };
  return best(0);
}

/** Translate one identifier-like name; returns null when it has unknown words. */
export function translate(name) {
  if (cache.has(name)) return cache.get(name);
  const result = compute(name);
  cache.set(name, result);
  return result;
}

function compute(name) {
  const override = dict.overrides[name.toLowerCase()];
  if (override) return override;
  const chunks = name.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g);
  if (!chunks || chunks.join('') !== name) return null;
  const toks = [];
  for (const chunk of chunks) {
    if (/^\d+$/.test(chunk)) { toks.push({ t: chunk, key: chunk }); continue; }
    const full = segment(chunk, /^[A-Z]+$/.test(chunk));
    if (!full) return null;
    toks.push(...full.toks);
  }
  const out = [];
  toks.forEach((tok) => {
    let t = tok.t;
    const prev = out[out.length - 1];
    if (tok.suffix && prev && dict.bodyHeadAfter.includes(prev.t)) {
      if (tok.key === 'd') t = 'Body';
      else if (tok.key === 'h') t = 'Head';
    }
    if (t === '') return;
    if (out.length === 0) {
      // lower-case the first word, but keep acronyms such as USA / DS
      out.push({ t: /^[A-Z]{2,}/.test(t) ? t : t[0].toLowerCase() + t.slice(1) });
      return;
    }
    out.push({ t: t[0].toUpperCase() + t.slice(1) });
  });
  return out.map((o) => o.t).join('');
}

export function translateOrKeep(name, what) {
  const t = translate(name);
  if (t === null) {
    unresolved.add(`${what}: ${name}`);
    return name;
  }
  return t;
}

/** Map every resource file below `dir` (original name, lower-cased, relative) to its English path. */
export function assetNames(dir, exts) {
  const map = {};
  const walk = (d) => {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      const ext = extname(entry).toLowerCase();
      if (!exts.includes(ext)) continue;
      const rel = relative(dir, full).split('\\').join('/');
      const parts = rel.split('/');
      const file = parts.pop();
      const base = basename(file, extname(file));
      const english = translateOrKeep(base, `file ${rel}`);
      map[rel.toLowerCase()] = [...parts, english + ext.toLowerCase()].join('/');
    }
  };
  walk(dir);
  return map;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [, , dir, out] = process.argv;
  if (!dir || !out) {
    console.error('usage: node tools/naming.mjs <C64 resource dir> <output json>');
    process.exit(1);
  }
  const map = assetNames(dir, ['.gif', '.png', '.bmp', '.ogg', '.wav', '.ttf']);
  const seen = new Map();
  for (const [from, to] of Object.entries(map)) {
    const key = to.toLowerCase();
    if (seen.has(key)) throw new Error(`name collision: ${from} and ${seen.get(key)} -> ${to}`);
    seen.set(key, from);
  }
  if (unresolved.size) {
    console.error('unresolved names:\n  ' + [...unresolved].join('\n  '));
    process.exit(1);
  }
  writeFileSync(out, JSON.stringify(map, null, 2) + '\n');
  console.log(`${Object.keys(map).length} asset names written to ${out}`);
}
