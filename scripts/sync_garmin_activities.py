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
DEFAULT_CLUSTER_RADIUS_KM = 100.0
PRIVACY_DECIMALS = 1
EARTH_RADIUS_KM = 6371.0088

SPORT_LABELS = {
    "running": "Running",
    "cycling": "Cycling",
    "swimming": "Swimming",
    "walking": "Walking",
    "hiking": "Hiking",
    "strength": "Strength",
    "fitness": "Fitness",
    "skiing": "Skiing",
    "snowboarding": "Snowboarding",
    "golf": "Golf",
    "racket": "Racket sports",
    "team_sport": "Team sports",
    "water_sport": "Water sports",
    "rowing": "Rowing",
    "yoga": "Yoga & mobility",
    "climbing": "Climbing",
    "equestrian": "Equestrian",
    "motorsport": "Motorsport",
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


def canonical_sport(activity_type: Any) -> str:
    key = str(activity_type or "").strip().lower().replace("-", "_").replace(" ", "_")
    if "overland" in key:
        return "overland"
    if "boating" in key or key in ("boat", "powerboat"):
        return "boating"
    if "snorkel" in key:
        return "snorkeling"
    if "multi_sport" in key or "multisport" in key or "triathlon" in key:
        return "multisport"
    if "skating" in key or "rollerblade" in key:
        return "skating"
    if "rucking" in key:
        return "hiking"
    if "snowboard" in key:
        return "snowboarding"
    if any(word in key for word in ("ski", "snowshoe")):
        return "skiing"
    if any(word in key for word in ("swim", "pool", "open_water")):
        return "swimming"
    if any(word in key for word in ("bike", "biking", "cycling", "cyclocross", "bmx")):
        return "cycling"
    if any(word in key for word in ("run", "jog")):
        return "running"
    if any(word in key for word in ("hiking", "mountaineering", "trekking")):
        return "hiking"
    if any(word in key for word in ("walking", "walk")):
        return "walking"
    if any(word in key for word in ("strength", "weight_training", "gym")):
        return "strength"
    if any(word in key for word in ("yoga", "pilates", "mobility", "breathwork", "meditation")):
        return "yoga"
    if any(word in key for word in ("row", "rowing", "crew")):
        return "rowing"
    if any(word in key for word in ("sailing", "surf", "kayak", "paddl", "canoe", "sup", "windsurf", "kitesurf")):
        return "water_sport"
    if any(word in key for word in ("climb", "boulder", "via_ferrata")):
        return "climbing"
    if "golf" in key:
        return "golf"
    if any(word in key for word in ("tennis", "badminton", "squash", "pickleball", "padel", "racquet", "table_tennis")):
        return "racket"
    if "baseball" in key or "softball" in key:
        return "baseball"
    if "basketball" in key:
        return "basketball"
    if "volleyball" in key:
        return "volleyball"
    if any(word in key for word in ("soccer", "football", "rugby", "hockey", "cricket", "lacrosse", "handball")):
        return "team_sport"
    if any(word in key for word in ("horse", "equestrian")):
        return "equestrian"
    if any(word in key for word in ("motocross", "motorcycling", "auto_racing", "atv", "driving")):
        return "motorsport"
    if any(word in key for word in ("cardio", "elliptical", "stair", "hiit", "boxing", "dance", "jump_rope", "indoor_training")):
        return "fitness"
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


def build_public_archive(activities: list[dict[str, Any]], radius_km: float) -> dict[str, Any]:
    located_by_sport: dict[str, list[dict[str, Any]]] = defaultdict(list)
    unlocated = 0
    for activity in activities:
        location = activity_location(activity)
        if location is None:
            unlocated += 1
            continue
        sport = canonical_sport(activity_type_key(activity))
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
    mapped = sum(totals.values())
    return {
        "generatedAt": datetime.now(UTC).replace(microsecond=0).isoformat(),
        "source": "Garmin Connect",
        "clusterRadiusKm": int(radius_km) if radius_km.is_integer() else radius_km,
        "privacyPrecisionDecimals": PRIVACY_DECIMALS,
        "totalActivities": len(activities),
        "mappedActivities": mapped,
        "unlocatedActivities": unlocated,
        "sportTotals": sport_totals,
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


def unclassified_type_counts(activities: list[dict[str, Any]]) -> Counter[str]:
    return Counter(
        activity_type_key(activity) or "unknown"
        for activity in activities
        if activity_location(activity) is not None
        and canonical_sport(activity_type_key(activity)) == "other"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--token-store", type=Path, default=DEFAULT_TOKEN_STORE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--radius-km", type=float, default=DEFAULT_CLUSTER_RADIUS_KM)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.radius_km <= 0:
        print("Cluster radius must be greater than zero", file=sys.stderr)
        return 2
    try:
        activities = fetch_all_activities(connect_to_garmin(args.token_store))
        archive = build_public_archive(activities, args.radius_km)
        write_archive(archive, args.output)
    except Exception as error:
        print(f"Garmin activity sync failed: {type(error).__name__}: {error}", file=sys.stderr)
        return 1
    print(
        f"Published {archive['mappedActivities']} mapped activities in "
        f"{len(archive['groups'])} privacy-preserving groups."
    )
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
