import os
import requests

BASE_URL = "http://barbarian.1987.free.fr/online/"
RESOURCES_FILE = "resources/html5/js/resources.txt"
DEST_DIR = "mirrored_resources"

def download_file(resource_path):
    url = BASE_URL + resource_path
    dest_path = os.path.join(DEST_DIR, resource_path.replace("\\", "/"))
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        with open(dest_path, "wb") as f:
            f.write(r.content)
        print(f"Scaricato: {resource_path}")
    except Exception as e:
        print(f"Errore con {resource_path}: {e}")

def main():
    with open(RESOURCES_FILE, encoding="utf-8") as f:
        resources = [line.strip() for line in f if line.strip()]
    for resource in resources:
        download_file(resource)

if __name__ == "__main__":
    main()