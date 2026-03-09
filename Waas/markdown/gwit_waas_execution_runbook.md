# GWIT Waas Execution Runbook

## Objective
Rebuild and package the GWIT website as a Waas-compatible reusable template from the existing website data.

## Build command
```bash
cd /home/kayz/Documents/GitRepo/gwit-copycopy
python3 Waas/scripts/assemble_gwit_template.py
```

## Expected outputs
- `Waas/templates/template_01/site`
- `Waas/manifest.json`
- Documentation and operation files in `Waas/`

## Validation checks
1. `site/index.html` opens correctly.
2. `site/assets/*` paths are valid.
3. `site/services/*` pages resolve.
4. `site/en/index.html` resolves.
5. `site/sitemap.xml` and `site/robots.txt` are present.

## Nomenclature enforcement
1. Use `site/index.html` as the reference for naming and structure.
2. For other pages, preserve index-aligned ids/classes and block patterns.
3. Apply style/content imports using index nomenclature conventions.
4. Reject changes that introduce naming drift across pages.
5. See detailed rule set in `Waas/INSTRUCTIONS.md`.
