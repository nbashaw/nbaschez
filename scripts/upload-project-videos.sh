#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v bun >/dev/null 2>&1; then
  echo "bun is required to run the Vercel Blob upload script." >&2
  exit 1
fi

bun scripts/upload-project-videos.mjs
