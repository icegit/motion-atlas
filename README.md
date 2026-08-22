# Atlas in Motion

A privacy-conscious OpenStreetMap view of Garmin Connect activities. Activities of the same sport whose start points are connected within a 100 km radius are published as one marker. Clicking a marker shows the activity count for each year.

The public data file contains only canonical sport categories, rounded cluster centers, totals, and per-year counts. Garmin activity IDs, names, routes, timestamps, and exact coordinates are never written to the repository.

## Local development

```bash
npm install
npm run dev
```

Run the tests and production build with:

```bash
npm test
npm run build
python -m unittest discover -s scripts -p "test_*.py"
```

## Garmin sync

The sync uses the same `garminconnect` token flow as the `escape` project. Create a local token store with:

```bash
python -m pip install -r requirements-garmin.txt
python scripts/setup_garmin_tokens.py
python scripts/sync_garmin_activities.py
```

For GitHub Actions, add the complete contents of `.garminconnect/garmin_tokens.json` as the repository secret `GARMIN_TOKENS_JSON`. The scheduled workflow refreshes and deploys the activity map every day at 03:17 UTC. `GARMIN_EMAIL` and `GARMIN_PASSWORD` are supported as a fallback.

## Hosting

The site is built with Vite and deployed by `.github/workflows/pages.yml`. In the repository settings, select **GitHub Actions** as the Pages source.
