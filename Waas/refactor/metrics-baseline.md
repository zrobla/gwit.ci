# Metrics Baseline

Snapshot date: 2026-03-09

## Current technical baseline
- CSS main file: `Waas/templates/template_01/site/assets/css/template01-gwit.css`
  - lines: `1226`
- JS main file: `Waas/templates/template_01/site/assets/js/template01-gwit.js`
  - lines: `505`
- `!important` occurrences in main CSS: `59`
- `body.*-page` selector occurrences in main CSS: `607`

## Target (refactor exit)
- `!important <= 10`
- no CSS file above `350` lines
- at least `50%` reduction of `body.*-page` selectors
- no visual regressions on critical pages
- one JS module per responsibility

## Commands used
```bash
wc -l Waas/templates/template_01/site/assets/css/template01-gwit.css \
      Waas/templates/template_01/site/assets/js/template01-gwit.js

rg -n "!important" Waas/templates/template_01/site/assets/css/template01-gwit.css | wc -l
rg -n "body\\.[a-zA-Z0-9\\-]+-page" Waas/templates/template_01/site/assets/css/template01-gwit.css | wc -l
```
