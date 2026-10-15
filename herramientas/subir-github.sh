#!/bin/sh
# Sube la web al repositorio de GitHub (finomik215-mj/Finomik-Landing). Vercel la publica sola al recibir los cambios.
#   sh herramientas/subir-github.sh            -> rama main: se publica en finomik.com
#   sh herramientas/subir-github.sh web-nueva  -> otra rama: Vercel crea una vista previa sin tocar finomik.com
# La copia de trabajo de git vive en ~/FinomikLocal/Finomik-Landing (fuera de iCloud, que estropea git).
set -e
cd "$(dirname "$0")/.."
SRC="$(pwd)"; REPO="$HOME/FinomikLocal/Finomik-Landing"; RAMA="${1:-main}"
python3 build.py
[ -d "$REPO/.git" ] || gh repo clone finomik215-mj/Finomik-Landing "$REPO"
cd "$REPO"
git fetch -q origin
if git show-ref --verify --quiet "refs/remotes/origin/$RAMA"; then git checkout -q -B "$RAMA" "origin/$RAMA"; else git checkout -q -B "$RAMA" origin/main; fi
# copia exacta de la web (lo que ya no existe aquí se borra del repo); CNAME y .git no se tocan
rsync -a --delete --exclude .git --exclude CNAME --exclude .vista --exclude __pycache__ --exclude .DS_Store "$SRC"/ ./
git add -A
if git diff --cached --quiet; then echo "No hay cambios que subir."; exit 0; fi
git commit -q -m "Web: actualización del $(date '+%d-%m-%Y %H:%M')"
git push -q origin "$RAMA"
echo "Subido a la rama $RAMA. Vercel tarda 1-2 minutos en publicarlo."
