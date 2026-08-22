import json
import tempfile
import unittest
from pathlib import Path

from sync_garmin_activities import (
    activity_location,
    build_public_archive,
    canonical_sport,
    haversine_km,
    write_archive,
)


def activity(activity_type: str, latitude=None, longitude=None, year="2026"):
    return {
        "activityId": 123456789,
        "activityName": "Private morning route",
        "activityType": {"typeKey": activity_type},
        "startLatitude": latitude,
        "startLongitude": longitude,
        "startTimeLocal": f"{year}-06-10 08:00:00",
    }


class GarminActivityMapTests(unittest.TestCase):
    def test_classifies_common_garmin_sports(self):
        self.assertEqual(canonical_sport("trail_running"), "running")
        self.assertEqual(canonical_sport("lap_swimming"), "swimming")
        self.assertEqual(canonical_sport("road_biking"), "cycling")
        self.assertEqual(canonical_sport("resort_skiing_snowboarding"), "snowboarding")
        self.assertEqual(canonical_sport("boating_v2"), "boating")
        self.assertEqual(canonical_sport("overland"), "overland")
        self.assertEqual(canonical_sport("rucking"), "hiking")

    def test_haversine_distance_is_geographic(self):
        distance = haversine_km((52.3676, 4.9041), (51.9244, 4.4777))
        self.assertGreater(distance, 50)
        self.assertLess(distance, 70)

    def test_same_sport_within_radius_is_grouped_by_year(self):
        archive = build_public_archive(
            [
                activity("running", 52.3676, 4.9041, "2026"),
                activity("trail_running", 51.9244, 4.4777, "2025"),
            ],
            100.0,
        )
        self.assertEqual(len(archive["groups"]), 1)
        self.assertEqual(archive["groups"][0]["activityCount"], 2)
        self.assertEqual(archive["groups"][0]["years"], {"2026": 1, "2025": 1})

    def test_different_sports_are_not_grouped(self):
        archive = build_public_archive(
            [
                activity("running", 52.37, 4.90),
                activity("cycling", 52.37, 4.90),
            ],
            100.0,
        )
        self.assertEqual(len(archive["groups"]), 2)

    def test_unlocated_activities_are_reported(self):
        archive = build_public_archive([activity("running")], 100.0)
        self.assertEqual(archive["mappedActivities"], 0)
        self.assertEqual(archive["unlocatedActivities"], 1)

    def test_zero_zero_is_not_a_real_activity_start(self):
        self.assertIsNone(activity_location(activity("running", 0, 0)))

    def test_public_file_omits_identifiers_names_and_exact_coordinates(self):
        archive = build_public_archive(
            [activity("running", 52.3676123, 4.9041389)],
            100.0,
        )
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "activities.json"
            write_archive(archive, output)
            text = output.read_text(encoding="utf-8")
        payload = json.loads(text)
        self.assertNotIn("activityId", text)
        self.assertNotIn("Private morning route", text)
        self.assertEqual(payload["groups"][0]["latitude"], 52.4)
        self.assertEqual(payload["groups"][0]["longitude"], 4.9)


if __name__ == "__main__":
    unittest.main()
