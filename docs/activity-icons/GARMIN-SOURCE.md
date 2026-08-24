# Garmin activity icon source

The `garmin-*.svg` files in this directory are exact path extractions from the Garmin Connect `connect-icons` SVG font. They were copied for Motion Black with permission confirmed by the repository owner on 2026-08-24.

- Source font: `garmin-connect-icons.svg`
- Source mirror commit: `773cf40eec4cbfbd075b07f42977980250e91d6f`
- Extraction: `scripts/extract_garmin_activity_icons.py`
- Geometry: original path data; only the font-coordinate transform needed for standalone SVG display is applied

The `air-balloon.svg` and `submarine.svg` fallback files are from Tabler Icons and remain covered by `LICENSE-TABLER.txt`. They are not Garmin glyphs and are only used for name-inferred `Other`/`Custom` activities.
