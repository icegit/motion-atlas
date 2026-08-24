# Motion Black

A privacy-conscious OpenStreetMap view of Garmin Connect activities. Activities of the same specific type whose start points are connected within a 100 km radius are published as one marker. Clicking a marker shows the activity count for each year.

The public data file contains only specific activity categories, rounded cluster centers, totals, and per-year counts. Sailing, kayaking, surfing, open-water swimming, lap swimming, trail running, treadmill running, and other distinct Garmin types stay separate. Garmin activity IDs, names, routes, timestamps, and exact coordinates are never written to the repository.

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

An existing private Garmin summary export can be used without reconnecting:

```bash
python scripts/sync_garmin_activities.py --activities-file path/to/activities_all_summaries.json
```

For GitHub Actions, add the complete contents of `.garminconnect/garmin_tokens.json` as the repository secret `GARMIN_TOKENS_JSON`. The scheduled workflow refreshes and deploys the activity map every day at 03:17 UTC. `GARMIN_EMAIL` and `GARMIN_PASSWORD` are supported as a fallback.

## Activities without GPS

Activities such as strength training, yoga, lap swimming, and treadmill running do not normally contain coordinates. They remain visible in the **Without GPS** section instead of being silently omitted or placed at a guessed location.

To place them on the map, copy `.activity-locations.example.json` to the ignored `.activity-locations.json` file and define approximate places. Rules can match a raw Garmin activity type and an optional date range; one-off activities can be assigned by Garmin activity ID. The exact private coordinates are never published: the generated map uses the same one-decimal rounding and clustering as GPS activities.

For scheduled GitHub Actions syncs, store the complete JSON configuration as the `ACTIVITY_LOCATIONS_JSON` repository secret. Date ranges allow older activities to be assigned to a previous gym or home base without moving the entire history to the current location.

## Hosting

The site is built with Vite and deployed by `.github/workflows/pages.yml`. In the repository settings, select **GitHub Actions** as the Pages source.
