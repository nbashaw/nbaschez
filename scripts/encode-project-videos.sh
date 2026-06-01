#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install it with: brew install ffmpeg" >&2
  exit 1
fi

output_dir="public/projects/encoded"
mkdir -p "$output_dir"

encode_video() {
  local input="$1"
  local output="$2"

  ffmpeg -y \
    -i "$input" \
    -vf "scale='min(1920,iw)':-2,fps=60" \
    -c:v libx264 \
    -preset slow \
    -crf 20 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$output"
}

encode_video "public/projects/rd-vid.mp4" "$output_dir/rd-vid-1920-60fps.mp4"
encode_video "public/projects/tfl-vid.mp4" "$output_dir/tfl-vid-1920-60fps.mp4"

ls -lh "$output_dir"/*.mp4
