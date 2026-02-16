#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
import re
import html
from urllib.parse import quote

def render_template(template: str, data: dict) -> str:
    def replace(match):
        key = match.group(1)
        return str(data.get(key, match.group(0)))
    return re.sub(r"\{\{\s*([a-zA-Z0-9_]+)\s*\}\}", replace, template)


def main():
    parser = argparse.ArgumentParser(description="Render a GWIT blog article from template and JSON data.")
    parser.add_argument("--template", required=True, help="Path to HTML template")
    parser.add_argument("--data", required=True, help="Path to JSON data")
    parser.add_argument("--out", required=True, help="Output HTML file")
    args = parser.parse_args()

    template = Path(args.template).read_text()
    data = json.loads(Path(args.data).read_text())

    # Ensure canonical and og_url defaults
    if "canonical_url" not in data and "slug" in data:
        data["canonical_url"] = f"https://www.gwit.ci/{data['slug']}"
    if "og_url" not in data and "canonical_url" in data:
        data["og_url"] = data["canonical_url"]

    # Analysis defaults for prefill links
    if "analysis_slug" not in data and "slug" in data:
        data["analysis_slug"] = data["slug"]
    if "analysis_title_encoded" not in data and "title" in data:
        data["analysis_title_encoded"] = quote(data["title"])
    if "analysis_category" not in data:
        tags_html = data.get("hero_tags_html", "")
        match = re.search(r"<span>(.*?)</span>", tags_html)
        if match:
            data["analysis_category"] = html.unescape(match.group(1)).strip()
    if "analysis_category_param" not in data:
        category = data.get("analysis_category")
        if category:
            data["analysis_category_param"] = quote(category)

    rendered = render_template(template, data)
    Path(args.out).write_text(rendered)

if __name__ == "__main__":
    main()
