# Waas Instructions - Nomenclature Baseline

## Refactor mode (active)
- UI feature freeze is active during refactor phases 1-2.
- No new sections, animations, color changes, or content/layout redesign while freeze is active.
- Allowed changes in freeze mode:
  - baseline capture tooling
  - refactor docs/metrics/checklists
  - bug fixes required to keep current rendering stable
- Any exception requires explicit approval before implementation.

## Mandatory rule
For all pages in `Waas/templates/template_01/site`, `index.html` is the canonical reference for:
- section naming
- ids and classes
- content block structure
- style import patterns
- shared UI behavior conventions

## Application scope
This rule applies to:
- `a-propos.html`
- `expertises.html`
- `gwit-blog-telecom-it-analyses.html`
- `contact.html`
- `services/*.html`
- `en/index.html`

## How to apply on edits/imports
1. Identify the equivalent block in `index.html`.
2. Reuse the same wrappers, ids, classes and naming style.
3. Reuse existing shared tokens and theme rules before adding new ones.
4. Keep naming consistency between HTML, CSS and JS hooks (`data-*`, class hooks, ids).
5. Avoid introducing alternate naming for the same UI concept across pages.

## Exception policy
- If a new naming pattern is unavoidable, update the generator and documentation first.
- Do not create page-local naming drift that diverges from home naming conventions.
