#!/usr/bin/env python3
"""Assemble the GWIT Waas static template.

This script is intentionally conservative:
- it keeps the existing page markup under Waas/templates/template_01/site
- it refreshes support assets and images when available
- it regenerates technical metadata files (manifest, sitemap, robots, data json)
"""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WAAS_ROOT = ROOT / "Waas"
TEMPLATE_ROOT = WAAS_ROOT / "templates" / "template_01"
SITE_ROOT = TEMPLATE_ROOT / "site"
REFERENCE_ROOT = Path("/home/kayz/Documents/maridav.ci-2")
PRIMARY_DOMAIN = "www.gwit.ci"

PAGES = [
    "index.html",
    "a-propos.html",
    "nos-services.html",
    "expertises.html",
    "gwit-blog-telecom-it-analyses.html",
    "contact.html",
    "services/benchmarking.html",
    "services/benchmarking-qos.html",
    "services/ingenierie-telecom.html",
    "services/installations-telecom.html",
    "services/deploiement-installations.html",
    "services/solutions-it.html",
    "services/conseil-formation.html",
    "services/support-formation.html",
    "en/index.html",
]

SUPPORT_FILES = [
    ("assets/css/main.min.css", "assets/css/main.min.css"),
    ("assets/js/main.min.js", "assets/js/main.min.js"),
    ("assets/js/site-crm-bridge.js", "assets/js/site-crm-bridge.js"),
    ("assets/js/sw.js", "assets/js/sw.js"),
    ("assets/manifest.webmanifest", "assets/manifest.webmanifest"),
]

IMAGE_COPIES = [
    ("assets/images/logos/gwit-1.jpeg", "assets/images/logos/gwit-1.jpeg"),
    ("assets/images/logos/gwit-cadre.ico", "assets/images/logos/gwit-cadre.ico"),
    ("assets/images/previews/africa-benchmarking-telecoms.jpg", "assets/images/previews/hero-benchmarking.jpg"),
    ("assets/images/previews/telecoms-ingenierie.jpg", "assets/images/previews/hero-ingenierie.jpg"),
    ("assets/images/previews/integrations-telecoms.avif", "assets/images/previews/hero-integration.avif"),
    ("assets/images/previews/solutions-informatiques.jpg", "assets/images/previews/hero-it.jpg"),
    ("assets/images/previews/infrastructure-telecom-gwit.jpg", "assets/images/previews/hero-infra.jpg"),
    ("assets/images/previews/deux-pylones-ciel-cyan.jpg", "assets/images/previews/deux-pylones-ciel-cyan.jpg"),
    ("assets/images/previews/formation-gwit.jpg", "assets/images/previews/formation-gwit.jpg"),
    ("assets/images/previews/afrique-connected.avif", "assets/images/previews/hero-connected.avif"),
    ("assets/images/previews/gwit-qos-5g.svg", "assets/images/previews/gwit-qos-5g.svg"),
    ("assets/images/team/gerant-bafemory.png", "assets/images/team/gerant-bafemory.png"),
    ("assets/images/team/db.jpg", "assets/images/team/db.jpg"),
    ("assets/images/team/ibrahim-khalil.jpg", "assets/images/team/ibrahim-khalil.jpg"),
    ("assets/images/team/katiene-sarah.jpg", "assets/images/team/katiene-sarah.jpg"),
    ("assets/images/partners/artci.svg", "assets/images/partners/artci.svg"),
    ("assets/images/partners/mtn-ci.svg", "assets/images/partners/mtn-ci.svg"),
    ("assets/images/partners/orange-ci.svg", "assets/images/partners/orange-ci.svg"),
    ("assets/images/partners/axian.svg", "assets/images/partners/axian.svg"),
    ("assets/images/partners/artci.png", "assets/images/partners/artci.png"),
    ("assets/images/partners/igtsd-partner.png", "assets/images/partners/igtsd-partner.png"),
    ("assets/images/partners/midwex-partner.png", "assets/images/partners/midwex-partner.png"),
    ("assets/images/partners/eis-partner.png", "assets/images/partners/eis-partner.png"),
    ("assets/images/partners/keyside-partner.png", "assets/images/partners/keyside-partner.png"),
    ("assets/images/partners/nuran-wireless-partner.png", "assets/images/partners/nuran-wireless-partner.png"),
    ("assets/images/partners/setg-partner.png", "assets/images/partners/setg-partner.png"),
    ("assets/images/services/benchmarking.jpeg", "assets/images/services/benchmarking.jpeg"),
    ("assets/images/services/ingenierie-telecoms.jpg", "assets/images/services/ingenierie-telecoms.jpg"),
    ("assets/images/services/deploiement-et-installation-telecoms.jpg", "assets/images/services/deploiement-et-installation-telecoms.jpg"),
    ("assets/images/services/solutions-informatiques.avif", "assets/images/services/solutions-informatiques.avif"),
    ("assets/images/services/support-professionnel-formations.png", "assets/images/services/support-professionnel-formations.png"),
    ("GWIT_Doc_Presentation_v11_A4.pdf", "GWIT_Doc_Presentation_v11_A4.pdf"),
]


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.strip() + "\n", encoding="utf-8")


def find_source(rel_path: str, roots: tuple[Path, ...]) -> Path | None:
    for root in roots:
        candidate = root / rel_path
        if candidate.exists():
            return candidate
    return None


def copy_mapped_files(mappings: list[tuple[str, str]], source_roots: tuple[Path, ...]) -> tuple[list[str], list[str]]:
    copied: list[str] = []
    missing: list[str] = []

    for src_rel, dst_rel in mappings:
        src = find_source(src_rel, source_roots)
        if src is None:
            missing.append(src_rel)
            continue

        dst = SITE_ROOT / dst_rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied.append(dst_rel)

    return copied, missing


def sanitize_floating_whatsapp_assets() -> None:
    js_path = SITE_ROOT / "assets/js/main.min.js"
    if js_path.exists():
        js = js_path.read_text(encoding="utf-8")
        updated = re.sub(
            r"\n\s*// Floating WhatsApp.*?\n\s*function addWhatsApp\(\)\{.*?\n\s*\}\n",
            "\n",
            js,
            flags=re.S,
        )
        updated = re.sub(r"\n\s*addWhatsApp\(\);\s*\n", "\n", updated)
        if updated != js:
            js_path.write_text(updated, encoding="utf-8")

    css_path = SITE_ROOT / "assets/css/main.min.css"
    if css_path.exists():
        css = css_path.read_text(encoding="utf-8")
        updated = re.sub(
            r"\n/\* Floating WhatsApp \*/.*?@media\(max-width: 768px\)\{\.floating-whatsapp\{display:none\}\}\n",
            "\n",
            css,
            flags=re.S,
        )
        if updated != css:
            css_path.write_text(updated, encoding="utf-8")


def collect_pages() -> list[str]:
    existing = {
        str(path.relative_to(SITE_ROOT)).replace("\\", "/")
        for path in SITE_ROOT.rglob("*.html")
    }

    if not existing:
        return PAGES.copy()

    ordered = [page for page in PAGES if page in existing]
    extras = sorted(page for page in existing if page not in PAGES)
    return ordered + extras


def build_data_files(pages: list[str], copied_images: list[str], copied_support: list[str]) -> None:
    payload = {
        "site_name": "GWIT",
        "domain": PRIMARY_DOMAIN,
        "pages": pages,
        "images": copied_images,
        "support_assets": copied_support,
        "source": str(ROOT),
        "layout_reference": str(REFERENCE_ROOT / "CRM/website"),
        "content_origin": "existing GWIT website",
    }
    write_text(SITE_ROOT / "data/site-content.json", json.dumps(payload, indent=2, ensure_ascii=False))


def build_technical_files(pages: list[str]) -> None:
    robots = """
User-agent: *
Allow: /
Sitemap: https://www.gwit.ci/sitemap.xml
"""
    write_text(SITE_ROOT / "robots.txt", robots)

    urls: list[str] = []
    for page in pages:
        if page == "index.html":
            urls.append(f"https://{PRIMARY_DOMAIN}/")
        else:
            urls.append(f"https://{PRIMARY_DOMAIN}/{page}")

    sitemap_items = "\n".join(f"  <url><loc>{url}</loc></url>" for url in urls)
    sitemap = f"""<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">
{sitemap_items}
</urlset>
"""
    write_text(SITE_ROOT / "sitemap.xml", sitemap)


def write_manifest(pages: list[str], copied_images: list[str], copied_support: list[str]) -> None:
    manifest = {
        "kit_name": "GWIT Waas Client Kit",
        "client_name": "GWIT",
        "primary_domain": PRIMARY_DOMAIN,
        "sector_pack": "services_b2b",
        "website_template": "template_01",
        "layout_mode": "template_01_premium_legacy_from_crm_website",
        "source_project": str(ROOT),
        "layout_reference": str(REFERENCE_ROOT / "CRM/website"),
        "template_payload": {
            "site_root": str(SITE_ROOT),
            "generated_pages": pages,
            "generated_assets": [
                "assets/css/template01-gwit.css",
                "assets/js/template01-gwit.js",
                "data/site-content.json",
                "robots.txt",
                "sitemap.xml",
            ],
            "copied_layout_assets": copied_support,
            "copied_images": copied_images,
        },
    }
    write_text(WAAS_ROOT / "manifest.json", json.dumps(manifest, indent=2, ensure_ascii=False))


def ensure_site_root() -> None:
    SITE_ROOT.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_site_root()

    copied_support, missing_support = copy_mapped_files(
        SUPPORT_FILES,
        (REFERENCE_ROOT, ROOT),
    )
    sanitize_floating_whatsapp_assets()

    copied_images, missing_images = copy_mapped_files(
        IMAGE_COPIES,
        (ROOT, REFERENCE_ROOT),
    )

    pages = collect_pages()
    build_data_files(pages, copied_images, copied_support)
    build_technical_files(pages)
    write_manifest(pages, copied_images, copied_support)

    summary = {
        "status": "ok",
        "site_root": str(SITE_ROOT),
        "pages": len(pages),
        "copied_support_assets": len(copied_support),
        "copied_images": len(copied_images),
        "missing_support_assets": len(missing_support),
        "missing_images": len(missing_images),
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))

    if missing_support:
        print("[warn] Missing support assets:")
        for rel in missing_support:
            print(f"  - {rel}")

    if missing_images:
        print("[warn] Missing images:")
        for rel in missing_images:
            print(f"  - {rel}")


if __name__ == "__main__":
    main()
