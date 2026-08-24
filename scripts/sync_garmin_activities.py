#!/usr/bin/env python3
"""Publish a privacy-preserving map summary from Garmin Connect activities."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import sys
from collections import Counter, defaultdict
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TOKEN_STORE = ROOT / ".garminconnect"
DEFAULT_OUTPUT = ROOT / "public" / "data" / "activity-groups.json"
DEFAULT_LOCATION_RULES = ROOT / ".activity-locations.json"
DEFAULT_CLUSTER_RADIUS_KM = 100.0
PRIVACY_DECIMALS = 1
EARTH_RADIUS_KM = 6371.0088

SPORT_LABELS = {
    "running": "Running",
    "trail_running": "Trail running",
    "treadmill_running": "Treadmill running",
    "cycling": "Cycling",
    "road_cycling": "Road cycling",
    "gravel_cycling": "Gravel cycling",
    "mountain_biking": "Mountain biking",
    "indoor_cycling": "Indoor cycling",
    "e_biking": "E-biking",
    "open_water_swimming": "Open-water swimming",
    "lap_swimming": "Lap swimming",
    "walking": "Walking",
    "hiking": "Hiking",
    "mountaineering": "Mountaineering",
    "rucking": "Rucking",
    "strength": "Strength",
    "cardio": "Cardio",
    "hiit": "HIIT",
    "stair_climbing": "Stair climbing",
    "elliptical": "Elliptical",
    "boxing": "Boxing",
    "dance": "Dance",
    "jump_rope": "Jump rope",
    "skiing": "Skiing",
    "snowboarding": "Snowboarding",
    "snow_sports": "Skiing & snowboarding",
    "snowshoeing": "Snowshoeing",
    "golf": "Golf",
    "tennis": "Tennis",
    "table_tennis": "Table tennis",
    "badminton": "Badminton",
    "squash": "Squash",
    "pickleball": "Pickleball",
    "padel": "Padel",
    "soccer": "Soccer",
    "american_football": "American football",
    "rugby": "Rugby",
    "hockey": "Hockey",
    "cricket": "Cricket",
    "lacrosse": "Lacrosse",
    "handball": "Handball",
    "sailing": "Sailing",
    "kayaking": "Kayaking",
    "canoeing": "Canoeing",
    "paddling": "Paddling",
    "stand_up_paddling": "Stand-up paddling",
    "surfing": "Surfing",
    "windsurfing": "Windsurfing",
    "kitesurfing": "Kitesurfing",
    "jet_skiing": "Jet skiing",
    "rowing": "Rowing",
    "indoor_rowing": "Indoor rowing",
    "yoga": "Yoga",
    "pilates": "Pilates",
    "mobility": "Mobility",
    "breathwork": "Breathwork",
    "climbing": "Climbing",
    "bouldering": "Bouldering",
    "via_ferrata": "Via ferrata",
    "equestrian": "Equestrian",
    "horseback_riding": "Horseback riding",
    "motorsport": "Motorsport",
    "atv": "ATV",
    "driving": "Driving",
    "overland": "Overland",
    "boating": "Boating",
    "snorkeling": "Snorkeling",
    "multisport": "Multisport",
    "skating": "Skating",
    "baseball": "Baseball",
    "basketball": "Basketball",
    "volleyball": "Volleyball",
    "other": "Other",
}

EXACT_ACTIVITY_TYPES = {
    "strength_training": "strength",
    "open_water_swimming": "open_water_swimming",
    "lap_swimming": "lap_swimming",
    "pool_swimming": "lap_swimming",
    "trail_running": "trail_running",
    "treadmill_running": "treadmill_running",
    "gravel_cycling": "gravel_cycling",
    "indoor_cycling": "indoor_cycling",
    "indoor_cardio": "cardio",
    "stair_climbing": "stair_climbing",
    "mountaineering": "mountaineering",
    "table_tennis": "table_tennis",
    "resort_skiing_snowboarding": "snow_sports",
    "kayaking": "kayaking",
    "sailing": "sailing",
    "surfing": "surfing",
    "boating": "boating",
    "snorkeling": "snorkeling",
    "overland": "overland",
    "multi_sport": "multisport",
    "skating": "skating",
    "rucking": "rucking",
    "horseback_riding": "horseback_riding",
    "mobility": "mobility",
    "pilates": "pilates",
    "breathwork": "breathwork",
    "driving_general": "driving",
    "atv": "atv",
    "hiit": "hiit",
}


def normalized_activity_type(activity_type: Any) -> str:
    key = str(activity_type or "").strip().lower().replace("-", "_").replace(" ", "_")
    for suffix in ("_v2", "_ws"):
        if key.endswith(suffix):
            key = key[: -len(suffix)]
    return key


def canonical_sport(activity_type: Any) -> str:
    key = normalized_activity_type(activity_type)
    if key in EXACT_ACTIVITY_TYPES:
        return EXACT_ACTIVITY_TYPES[key]
    if "multi_sport" in key or "multisport" in key or "triathlon" in key:
        return "multisport"
    if "rollerblade" in key or "inline_skat" in key or "ice_skat" in key:
        return "skating"
    if "snowboard" in key:
        return "snowboarding"
    if "snowshoe" in key:
        return "snowshoeing"
    if "ski" in key:
        return "skiing"
    if "open_water" in key and "swim" in key:
        return "open_water_swimming"
    if any(word in key for word in ("lap_swim", "pool_swim")):
        return "lap_swimming"
    if "swim" in key:
        return "open_water_swimming"
    if "indoor" in key and any(word in key for word in ("bike", "cycling")):
        return "indoor_cycling"
    if "gravel" in key and any(word in key for word in ("bike", "cycling")):
        return "gravel_cycling"
    if "mountain" in key and any(word in key for word in ("bike", "biking", "cycling")):
        return "mountain_biking"
    if "road" in key and any(word in key for word in ("bike", "biking", "cycling")):
        return "road_cycling"
    if any(word in key for word in ("e_bike", "ebike", "electric_bike")):
        return "e_biking"
    if any(word in key for word in ("bike", "biking", "cycling", "cyclocross", "bmx")):
        return "cycling"
    if "trail" in key and any(word in key for word in ("run", "jog")):
        return "trail_running"
    if "treadmill" in key and any(word in key for word in ("run", "jog")):
        return "treadmill_running"
    if any(word in key for word in ("run", "jog")):
        return "running"
    if "mountaineering" in key:
        return "mountaineering"
    if "rucking" in key:
        return "rucking"
    if any(word in key for word in ("hiking", "trekking")):
        return "hiking"
    if any(word in key for word in ("walking", "walk")):
        return "walking"
    if any(word in key for word in ("strength", "weight_training", "gym")):
        return "strength"
    if "pilates" in key:
        return "pilates"
    if "mobility" in key:
        return "mobility"
    if any(word in key for word in ("breathwork", "meditation")):
        return "breathwork"
    if "yoga" in key:
        return "yoga"
    if "indoor" in key and any(word in key for word in ("row", "rowing")):
        return "indoor_rowing"
    if any(word in key for word in ("row", "rowing", "crew")):
        return "rowing"
    if "kitesurf" in key:
        return "kitesurfing"
    if "windsurf" in key:
        return "windsurfing"
    if "sail" in key:
        return "sailing"
    if "kayak" in key:
        return "kayaking"
    if "canoe" in key:
        return "canoeing"
    if any(word in key for word in ("stand_up_paddl", "standup_paddl", "sup_paddl")):
        return "stand_up_paddling"
    if "surf" in key:
        return "surfing"
    if any(word in key for word in ("jet_ski", "jetski")):
        return "jet_skiing"
    if "paddl" in key:
        return "paddling"
    if "boulder" in key:
        return "bouldering"
    if "via_ferrata" in key:
        return "via_ferrata"
    if "climb" in key:
        return "climbing"
    if "golf" in key:
        return "golf"
    if "table_tennis" in key:
        return "table_tennis"
    if "badminton" in key:
        return "badminton"
    if "squash" in key:
        return "squash"
    if "pickleball" in key:
        return "pickleball"
    if "padel" in key:
        return "padel"
    if any(word in key for word in ("tennis", "racquet")):
        return "tennis"
    if "baseball" in key or "softball" in key:
        return "baseball"
    if "basketball" in key:
        return "basketball"
    if "volleyball" in key:
        return "volleyball"
    if any(word in key for word in ("american_football", "gridiron")):
        return "american_football"
    if any(word in key for word in ("soccer", "football")):
        return "soccer"
    for sport in ("rugby", "hockey", "cricket", "lacrosse", "handball"):
        if sport in key:
            return sport
    if "horseback" in key:
        return "horseback_riding"
    if any(word in key for word in ("horse", "equestrian")):
        return "equestrian"
    if "atv" in key:
        return "atv"
    if "driving" in key:
        return "driving"
    if any(word in key for word in ("motocross", "motorcycling", "auto_racing", "atv", "driving")):
        return "motorsport"
    if "stair" in key:
        return "stair_climbing"
    if "elliptical" in key:
        return "elliptical"
    if "hiit" in key:
        return "hiit"
    if "boxing" in key:
        return "boxing"
    if "dance" in key:
        return "dance"
    if "jump_rope" in key:
        return "jump_rope"
    if any(word in key for word in ("cardio", "indoor_training")):
        return "cardio"
    return "other"


def activity_type_key(activity: dict[str, Any]) -> str:
    value = activity.get("activityType")
    if isinstance(value, dict):
        return str(value.get("typeKey") or value.get("typeId") or "")
    return str(value or activity.get("activityTypeKey") or "")


def activity_year(activity: dict[str, Any]) -> str:
    for key in ("startTimeLocal", "startTimeGMT", "calendarDate"):
        value = activity.get(key)
        if isinstance(value, str) and len(value) >= 4 and value[:4].isdigit():
            return value[:4]
    timestamp = activity.get("beginTimestamp") or activity.get("startTimestamp")
    if isinstance(timestamp, (int, float)) and timestamp > 0:
        seconds = timestamp / 1000 if timestamp > 10_000_000_000 else timestamp
        return str(datetime.fromtimestamp(seconds, UTC).year)
    return "Unknown"


def activity_location(activity: dict[str, Any]) -> tuple[float, float] | None:
    candidates = (
        (activity.get("startLatitude"), activity.get("startLongitude")),
        (activity.get("latitude"), activity.get("longitude")),
    )
    for raw_latitude, raw_longitude in candidates:
        try:
            latitude = float(raw_latitude)
            longitude = float(raw_longitude)
        except (TypeError, ValueError):
            continue
        if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
            continue
        if latitude == 0 and longitude == 0:
            continue
        return latitude, longitude
    return None


def activity_date(activity: dict[str, Any]) -> str:
    for key in ("startTimeLocal", "startTimeGMT", "calendarDate"):
        value = activity.get(key)
        if isinstance(value, str) and len(value) >= 10:
            return value[:10]
    return ""


def load_location_rules(path: Path) -> dict[str, Any]:
    inline_json = os.getenv("ACTIVITY_LOCATIONS_JSON", "").strip()
    if inline_json:
        payload = json.loads(inline_json)
    elif path.exists():
        payload = json.loads(path.read_text(encoding="utf-8"))
    else:
        return {}
    if not isinstance(payload, dict):
        raise ValueError("Activity location rules must be a JSON object")
    if not isinstance(payload.get("locations", {}), dict):
        raise ValueError("Activity location rules 'locations' must be an object")
    if not isinstance(payload.get("activities", {}), dict):
        raise ValueError("Activity location rules 'activities' must be an object")
    if not isinstance(payload.get("rules", []), list):
        raise ValueError("Activity location rules 'rules' must be an array")
    return payload


def configured_location(
    reference: Any, location_rules: dict[str, Any]
) -> tuple[float, float] | None:
    value = reference
    if isinstance(reference, str):
        value = location_rules.get("locations", {}).get(reference)
    if not isinstance(value, dict):
        return None
    try:
        latitude = float(value["latitude"])
        longitude = float(value["longitude"])
    except (KeyError, TypeError, ValueError):
        return None
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        return None
    if latitude == 0 and longitude == 0:
        return None
    return latitude, longitude


def manual_activity_location(
    activity: dict[str, Any], location_rules: dict[str, Any]
) -> tuple[float, float] | None:
    if not location_rules:
        return None

    activity_id = str(activity.get("activityId") or "")
    activity_overrides = location_rules.get("activities", {})
    if activity_id and activity_id in activity_overrides:
        return configured_location(activity_overrides[activity_id], location_rules)

    raw_type = normalized_activity_type(activity_type_key(activity))
    sport = canonical_sport(raw_type)
    date = activity_date(activity)
    for rule in location_rules.get("rules", []):
        if not isinstance(rule, dict):
            continue
        activity_types = {
            normalized_activity_type(value)
            for value in rule.get("activityTypes", [])
        }
        sports = {str(value) for value in rule.get("sports", [])}
        if activity_types and raw_type not in activity_types:
            continue
        if sports and sport not in sports:
            continue
        if rule.get("from") and (not date or date < str(rule["from"])):
            continue
        if rule.get("to") and (not date or date > str(rule["to"])):
            continue
        if not activity_types and not sports and not rule.get("from") and not rule.get("to"):
            continue
        location = configured_location(rule.get("location"), location_rules)
        if location is not None:
            return location
    return None


def haversine_km(left: tuple[float, float], right: tuple[float, float]) -> float:
    left_lat, left_lon = map(math.radians, left)
    right_lat, right_lon = map(math.radians, right)
    delta_lat = right_lat - left_lat
    delta_lon = right_lon - left_lon
    value = (
        math.sin(delta_lat / 2) ** 2
        + math.cos(left_lat) * math.cos(right_lat) * math.sin(delta_lon / 2) ** 2
    )
    return EARTH_RADIUS_KM * 2 * math.atan2(math.sqrt(value), math.sqrt(1 - value))


def spherical_centroid(points: list[tuple[float, float]]) -> tuple[float, float]:
    x = y = z = 0.0
    for latitude, longitude in points:
        lat = math.radians(latitude)
        lon = math.radians(longitude)
        x += math.cos(lat) * math.cos(lon)
        y += math.cos(lat) * math.sin(lon)
        z += math.sin(lat)
    count = len(points)
    x, y, z = x / count, y / count, z / count
    longitude = math.atan2(y, x)
    latitude = math.atan2(z, math.sqrt(x * x + y * y))
    return math.degrees(latitude), math.degrees(longitude)


def connected_clusters(items: list[dict[str, Any]], radius_km: float) -> list[list[dict[str, Any]]]:
    parents = list(range(len(items)))

    def find(index: int) -> int:
        while parents[index] != index:
            parents[index] = parents[parents[index]]
            index = parents[index]
        return index

    def union(left: int, right: int) -> None:
        left_root, right_root = find(left), find(right)
        if left_root != right_root:
            parents[right_root] = left_root

    for left in range(len(items)):
        for right in range(left + 1, len(items)):
            if haversine_km(items[left]["location"], items[right]["location"]) <= radius_km:
                union(left, right)

    grouped: dict[int, list[dict[str, Any]]] = defaultdict(list)
    for index, item in enumerate(items):
        grouped[find(index)].append(item)
    return list(grouped.values())


def build_public_archive(
    activities: list[dict[str, Any]],
    radius_km: float,
    location_rules: dict[str, Any] | None = None,
) -> dict[str, Any]:
    location_rules = location_rules or {}
    located_by_sport: dict[str, list[dict[str, Any]]] = defaultdict(list)
    unlocated_by_sport: dict[str, Counter[str]] = defaultdict(Counter)
    manually_located = 0
    for activity in activities:
        sport = canonical_sport(activity_type_key(activity))
        location = activity_location(activity)
        if location is None:
            location = manual_activity_location(activity, location_rules)
            if location is None:
                unlocated_by_sport[sport][activity_year(activity)] += 1
                continue
            manually_located += 1
        located_by_sport[sport].append(
            {"location": location, "year": activity_year(activity)}
        )

    groups: list[dict[str, Any]] = []
    totals: Counter[str] = Counter()
    for sport, items in located_by_sport.items():
        totals[sport] += len(items)
        for cluster in connected_clusters(items, radius_km):
            latitude, longitude = spherical_centroid([item["location"] for item in cluster])
            latitude = round(latitude, PRIVACY_DECIMALS)
            longitude = round(longitude, PRIVACY_DECIMALS)
            years = Counter(item["year"] for item in cluster)
            stable_key = f"{sport}:{latitude:.1f}:{longitude:.1f}"
            groups.append(
                {
                    "id": hashlib.sha256(stable_key.encode("utf-8")).hexdigest()[:12],
                    "type": sport,
                    "label": SPORT_LABELS[sport],
                    "latitude": latitude,
                    "longitude": longitude,
                    "activityCount": len(cluster),
                    "clusterRadiusKm": int(radius_km) if radius_km.is_integer() else radius_km,
                    "years": dict(sorted(years.items(), reverse=True)),
                }
            )

    groups.sort(key=lambda group: (-group["activityCount"], group["type"], group["id"]))
    sport_totals = [
        {
            "type": sport,
            "label": SPORT_LABELS[sport],
            "activityCount": count,
            "groupCount": sum(group["type"] == sport for group in groups),
        }
        for sport, count in totals.most_common()
    ]
    unlocated_sport_totals = [
        {
            "type": sport,
            "label": SPORT_LABELS[sport],
            "activityCount": sum(years.values()),
            "years": dict(sorted(years.items(), reverse=True)),
        }
        for sport, years in sorted(
            unlocated_by_sport.items(),
            key=lambda item: (-sum(item[1].values()), item[0]),
        )
    ]
    mapped = sum(totals.values())
    unlocated = sum(
        sport["activityCount"] for sport in unlocated_sport_totals
    )
    return {
        "generatedAt": datetime.now(UTC).replace(microsecond=0).isoformat(),
        "source": "Garmin Connect",
        "clusterRadiusKm": int(radius_km) if radius_km.is_integer() else radius_km,
        "privacyPrecisionDecimals": PRIVACY_DECIMALS,
        "totalActivities": len(activities),
        "mappedActivities": mapped,
        "manuallyLocatedActivities": manually_located,
        "unlocatedActivities": unlocated,
        "sportTotals": sport_totals,
        "unlocatedSportTotals": unlocated_sport_totals,
        "groups": groups,
    }


def connect_to_garmin(token_store: Path) -> Any:
    try:
        from garminconnect import Garmin
    except ImportError as error:
        raise RuntimeError(
            "garminconnect is not installed; run pip install -r requirements-garmin.txt"
        ) from error

    token_json = os.getenv("GARMIN_TOKENS_JSON", "").strip()
    if token_json:
        client = Garmin()
        client.login(token_json)
        return client

    if token_store.exists():
        client = Garmin()
        client.login(str(token_store))
        return client

    email = os.getenv("GARMIN_EMAIL", "").strip()
    password = os.getenv("GARMIN_PASSWORD", "")
    if not email or not password:
        raise RuntimeError(
            "Set GARMIN_TOKENS_JSON, provide --token-store, or set GARMIN_EMAIL and GARMIN_PASSWORD"
        )
    client = Garmin(email=email, password=password)
    client.login()
    return client


def fetch_all_activities(client: Any) -> list[dict[str, Any]]:
    activities: list[dict[str, Any]] = []
    start = 0
    while True:
        page = client.get_activities(start=start, limit=1000)
        if not isinstance(page, list):
            raise RuntimeError("Garmin returned an invalid activities response")
        activities.extend(item for item in page if isinstance(item, dict))
        if len(page) < 1000:
            return activities
        start += len(page)


def write_archive(archive: dict[str, Any], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        json.dumps(archive, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def read_activities_file(path: Path) -> list[dict[str, Any]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, list):
        raise ValueError("Activities file must contain a JSON array")
    return [item for item in payload if isinstance(item, dict)]


def unclassified_type_counts(activities: list[dict[str, Any]]) -> Counter[str]:
    return Counter(
        activity_type_key(activity) or "unknown"
        for activity in activities
        if canonical_sport(activity_type_key(activity)) == "other"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--token-store", type=Path, default=DEFAULT_TOKEN_STORE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--radius-km", type=float, default=DEFAULT_CLUSTER_RADIUS_KM)
    parser.add_argument(
        "--activities-file",
        type=Path,
        help="Use an existing private Garmin activity-summary JSON file instead of connecting",
    )
    parser.add_argument(
        "--location-rules",
        type=Path,
        default=DEFAULT_LOCATION_RULES,
        help="Ignored JSON file that assigns approximate locations to activities without GPS",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.radius_km <= 0:
        print("Cluster radius must be greater than zero", file=sys.stderr)
        return 2
    try:
        activities = (
            read_activities_file(args.activities_file)
            if args.activities_file
            else fetch_all_activities(connect_to_garmin(args.token_store))
        )
        location_rules = load_location_rules(args.location_rules)
        archive = build_public_archive(activities, args.radius_km, location_rules)
        write_archive(archive, args.output)
    except Exception as error:
        print(f"Garmin activity sync failed: {type(error).__name__}: {error}", file=sys.stderr)
        return 1
    print(
        f"Published {archive['mappedActivities']} mapped activities in "
        f"{len(archive['groups'])} privacy-preserving groups."
    )
    if archive["manuallyLocatedActivities"]:
        print(
            f"Placed {archive['manuallyLocatedActivities']} GPS-free activities "
            "using private location rules."
        )
    if archive["unlocatedActivities"]:
        print(f"Left {archive['unlocatedActivities']} activities without a map location.")
    unknown_types = unclassified_type_counts(activities)
    if unknown_types:
        summary = ", ".join(
            f"{activity_type} ({count})"
            for activity_type, count in unknown_types.most_common()
        )
        print(f"Unclassified Garmin types: {summary}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
