# Motion Black

A privacy-conscious topographic view of Garmin Connect activities. Activities of the same specific type whose start points are connected within a 100 km radius are published as one marker. Clicking a marker shows the activity count for each year.

The public data file contains only canonical activity categories, rounded cluster centers, totals, and per-year counts. Sailing, kayaking, surfing, trail running, treadmill running, and other distinct Garmin types stay separate; open-water, pool, and lap swimming are combined as **Swimming**. Garmin `driving` and `overland` activities are published under the single **Excursion** type. Garmin activity IDs, names, routes, timestamps, and exact coordinates are never written to the repository.

See [ACTIVITY_TYPES.md](ACTIVITY_TYPES.md) for the complete supported vocabulary, name-matching rules, and a visible catalog of every map icon.

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

Activities such as strength training, yoga, lap swimming, and treadmill running do not normally contain coordinates. Their location is resolved in this order:

1. An exact private override for the activity.
2. The location of the temporally nearest activity with native GPS, when it is within ±2 days. Only native GPS is used, so inferred locations never form a chain.
3. A matching private JSON rule or default location.
4. The **Without GPS** section when no safe match exists.

To provide private rules and defaults, copy `.activity-locations.example.json` to the ignored `.activity-locations.json` file and define approximate places. Rules can match a raw Garmin activity type and an optional date range; one-off activities can be assigned by Garmin activity ID. Defaults are only used when no native GPS exists within ±2 days. The exact private coordinates are never published: the generated map uses the same one-decimal rounding and clustering as GPS activities.

For scheduled GitHub Actions syncs, store the complete JSON configuration as the `ACTIVITY_LOCATIONS_JSON` repository secret. Date ranges allow older activities to be assigned to a previous gym or home base without moving the entire history to the current location.

## Activities outside Garmin

Activities without a Garmin type, such as a submarine dive or hot-air balloon flight, can be added from private JSON. Copy `.custom-activities.example.json` to the ignored `.custom-activities.json` file, then provide a date, a generic type such as `custom` or `other`, and an activity name. A custom activity may have its own coordinates or a named private location; without either, it follows the same nearest-GPS and fallback rules as Garmin activities.

For GitHub Actions, store the JSON as the `CUSTOM_ACTIVITIES_JSON` repository secret. Generic Garmin/custom types are classified from the private activity name—for example, `Luxor AirBallon` becomes `hot_air_balloon`. `submarine` and `hot_air_balloon` have dedicated map icons; unmatched custom types use the generic activity icon. Private activity names are not published.

## Basemap

The interface uses OpenTopoMap tiles, built from OpenStreetMap and SRTM elevation data. A restrained CSS treatment reduces visual noise while keeping contours and terrain shading legible. The required attribution remains visible on the map.

## Hosting

The site is built with Vite and deployed by `.github/workflows/pages.yml`. In the repository settings, select **GitHub Actions** as the Pages source.
