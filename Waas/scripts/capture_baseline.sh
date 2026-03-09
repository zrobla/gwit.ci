#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SITE_DIR="$ROOT_DIR/Waas/templates/template_01/site"
MANIFEST="$ROOT_DIR/Waas/refactor/baseline-manifest.csv"
OUT_DIR="${1:-$ROOT_DIR/Waas/refactor/baseline/current}"

if [[ ! -f "$MANIFEST" ]]; then
  echo "Manifest not found: $MANIFEST"
  exit 1
fi

mkdir -p "$OUT_DIR"

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required."
  exit 1
fi

capture_count=0

tail -n +2 "$MANIFEST" | while IFS=',' read -r profile page width height full_page; do
  [[ -z "${page:-}" ]] && continue
  src="$SITE_DIR/$page"
  if [[ ! -f "$src" ]]; then
    echo "skip (missing): $page"
    continue
  fi

  safe_page="${page//\//__}"
  safe_page="${safe_page%.html}"
  out_file="$OUT_DIR/${safe_page}--${profile}-${width}x${height}.png"
  url="file://$src"

  echo "capture: $page [$profile ${width}x${height}]"
  cmd=(npx --yes playwright screenshot --viewport-size="${width},${height}")
  if [[ "$full_page" == "true" ]]; then
    cmd+=(--full-page)
  fi
  cmd+=("$url" "$out_file")
  "${cmd[@]}"
  capture_count=$((capture_count + 1))
done

echo "Baseline capture complete. Files written to: $OUT_DIR"
