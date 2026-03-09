# Waas Refactor - Phase 1 & 2

This folder tracks refactor governance before CSS/JS migration.

## Scope
- Phase 1: UI feature freeze
- Phase 2: visual baseline definition and capture process

## Current freeze policy
- No new visual features during refactor preparation.
- No layout redesign during baseline build.
- Allowed changes:
  - tooling for baseline capture
  - documentation/checklists/metrics
  - stability fixes only

## Critical pages for baseline
- `index.html`
- `a-propos.html`
- `nos-services.html`
- `contact.html`
- `gwit-blog-telecom-it-analyses.html`
- `services/benchmarking.html`
- `services/ingenierie-telecom.html`
- `services/solutions-it.html`
- `blog-qos-5g.html`
- `analyse-campagne-qos-5g.html`
- `en/index.html`

## Viewports
- Desktop: `1440x1024`
- Tablet: `1024x1366`
- Mobile: `390x844`

## Baseline capture
Use:

```bash
bash Waas/scripts/capture_baseline.sh
```

Outputs:
- `Waas/refactor/baseline/current/*.png`

Manifest source:
- `Waas/refactor/baseline-manifest.csv`

## Approval gate to start phase 3
- Baseline folder complete for all manifest entries
- Visual review done on desktop/tablet/mobile
- Freeze policy respected
