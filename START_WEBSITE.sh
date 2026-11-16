#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo 'Node.js not found. Install Node.js LTS: https://nodejs.org/'
  exit 1
fi
if [ ! -d node_modules ]; then npm install; fi
npm run dev -- --open
