# GWIT Waas Kit

Kit WAAS statique reconstruit pour GWIT.

## Objectif
- Utiliser le layout `template_01` (legacy corporate) comme base.
- Refaire une nouvelle architecture de pages.
- Injecter les informations essentielles du site GWIT existant.

## Architecture livrée
- `templates/template_01/site/index.html`
- `templates/template_01/site/a-propos.html`
- `templates/template_01/site/nos-services.html`
- `templates/template_01/site/expertises.html`
- `templates/template_01/site/gwit-blog-telecom-it-analyses.html`
- `templates/template_01/site/contact.html`
- `templates/template_01/site/services/*.html`
- `templates/template_01/site/en/index.html`

## Build
```bash
cd /home/kayz/Documents/GitRepo/gwit-copycopy
python3 Waas/scripts/assemble_gwit_template.py
```

## Stack
- 100% statique (HTML/CSS/JS)
- Bootstrap CDN + theme local `assets/css/template01-gwit.css`
- Aucun composant Django

## Nomenclature rule
- `templates/template_01/site/index.html` is the baseline nomenclature for all other pages.
- Any style/content import or page adjustment must align with home page naming conventions.
- See mandatory instructions: `Waas/INSTRUCTIONS.md`.

## Refactor governance
- Active refactor baseline and freeze policy: `Waas/refactor/README.md`
- Technical metrics snapshot: `Waas/refactor/metrics-baseline.md`
- Phase checklist: `Waas/refactor/checklist-phase1-2.md`
