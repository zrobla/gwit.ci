# Template 01 - GWIT (Rebuilt Architecture)

This template is rebuilt using the `template_01` legacy corporate layout style,
with GWIT content extracted from the existing GWIT website.

## Main structure
- `site/index.html`
- `site/a-propos.html`
- `site/expertises.html`
- `site/gwit-blog-telecom-it-analyses.html`
- `site/contact.html`
- `site/services/*.html`
- `site/en/index.html`

## Technical notes
- Static-only stack (no Django).
- Bootstrap via CDN.
- Custom theme: `site/assets/css/template01-gwit.css`.
- Form selectors preserved for WAAS bridge compatibility:
  - `#form-pro`
  - `#c-form`
  - `#careerForm`
  - `.lead-form`

## Nomenclature reference
- `site/index.html` is the canonical naming model for all template pages.
- Keep ids/classes and section naming aligned with home page conventions.
- For cross-page styling/content imports, follow `Waas/INSTRUCTIONS.md`.
