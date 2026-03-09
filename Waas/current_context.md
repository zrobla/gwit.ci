# Current Context - GWIT Waas

## Status
- `template_01` rebuilt with a new GWIT site architecture.
- Source content reused from existing GWIT site (service lines, metrics, positioning, contacts).
- Delivery is static-only and framework-agnostic.

## Architecture
- Core pages: home, about, capabilities, resources, contact.
- Service detail pages under `services/`.
- English landing page under `en/`.

## Build process
- Single generator script: `Waas/scripts/assemble_gwit_template.py`.
- Output site root: `Waas/templates/template_01/site`.

## Nomenclature baseline
- `site/index.html` is the canonical naming reference for all other pages.
- Section ids/classes and style/content imports must follow home page nomenclature.
- Reference instructions: `Waas/INSTRUCTIONS.md`.

## Refactor status
- Refactor phases 1-2 initialized.
- UI feature freeze is active for baseline stabilization.
- Baseline artifacts tracked under `Waas/refactor/`.
