import json
import tempfile
import unittest
from pathlib import Path

from sync_garmin_activities import (
    DEFAULT_CLUSTER_RADIUS_KM,
    activity_location,
    build_public_archive,
    canonical_activity_type,
    canonical_sport,
    haversine_km,
    load_custom_activities,
    write_archive,
)


def activity(
    activity_type: str,
    latitude=None,
    longitude=None,
    year="2026",
    started_at=None,
    activity_id=123456789,
    name="Private morning route",
):
    return {
        "activityId": activity_id,
        "activityName": name,
        "activityType": {"typeKey": activity_type},
        "startLatitude": latitude,
        "startLongitude": longitude,
        "startTimeLocal": started_at or f"{year}-06-10 08:00:00",
    }


class GarminActivityMapTests(unittest.TestCase):
    def test_classifies_common_garmin_sports(self):
        self.assertEqual(canonical_sport("trail_running"), "trail_running")
        self.assertEqual(canonical_sport("treadmill_running"), "treadmill_running")
        self.assertEqual(canonical_sport("lap_swimming"), "swimming")
        self.assertEqual(canonical_sport("open_water_swimming"), "swimming")
        self.assertEqual(canonical_sport("road_biking"), "road_cycling")
        self.assertEqual(canonical_sport("gravel_cycling"), "gravel_cycling")
        self.assertEqual(canonical_sport("resort_skiing_snowboarding_ws"), "snow_sports")
        self.assertEqual(canonical_sport("boating_v2"), "boating")
        self.assertEqual(canonical_sport("overland"), "excursion")
        self.assertEqual(canonical_sport("driving_general"), "excursion")
        self.assertEqual(canonical_sport("submarine"), "submarine")
        self.assertEqual(canonical_sport("hot_air_balloon"), "hot_air_balloon")
        self.assertEqual(canonical_sport("rucking"), "rucking")
        self.assertEqual(canonical_sport("diving"), "scuba_diving")
        self.assertEqual(canonical_sport("single_gas_diving"), "scuba_diving")
        self.assertEqual(canonical_sport("multi_gas_diving"), "scuba_diving")
        self.assertEqual(canonical_sport("apnea"), "freediving")
        self.assertEqual(DEFAULT_CLUSTER_RADIUS_KM, 30.0)

    def test_generic_garmin_types_use_activity_name_without_overriding_specific_types(self):
        self.assertEqual(
            canonical_activity_type(activity("custom", name="Luxor AirBallon")),
            "hot_air_balloon",
        )
        self.assertEqual(
            canonical_activity_type(activity("other", name="Strait sub-marine dive")),
            "submarine",
        )
        self.assertEqual(
            canonical_activity_type(activity("other", name="Khasab Snoerkeling")),
            "snorkeling",
        )
        self.assertEqual(
            canonical_activity_type(activity("walking", name="Luxor AirBallon")),
            "walking",
        )
        custom_name_types = {
            "Lapland Dog Sledding": "dog_sledding",
            "Reindeer Sleigh Ride": "reindeer_sledding",
            "Alpine Toboggan": "sledding",
            "Rainforest Zipline": "ziplining",
            "Canyon Bungee Jump": "bungee_jumping",
            "Adriatic Cliff Jumping": "cliff_jumping",
            "Desert Sandboarding": "sandboarding",
            "Dubai Dune Bashing": "dune_bashing",
            "Serengeti Safari": "safari",
            "Grand Canyon Helicopter Tour": "helicopter_tour",
        }
        for name, expected_type in custom_name_types.items():
            with self.subTest(name=name):
                self.assertEqual(
                    canonical_activity_type(activity("other", name=name)),
                    expected_type,
                )
        self.assertEqual(
            canonical_activity_type(activity("walking", name="Serengeti Safari")),
            "walking",
        )

    def test_ambiguous_resort_activity_uses_name_for_skiing_or_snowboarding(self):
        self.assertEqual(
            canonical_activity_type(
                activity("resort_skiing_snowboarding", name="Morning Snowboarding")
            ),
            "snowboarding",
        )
        self.assertEqual(
            canonical_activity_type(
                activity("resort_skiing_snowboarding", name="Alpine Skiing")
            ),
            "skiing",
        )
        self.assertEqual(
            canonical_activity_type(
                activity("resort_skiing_snowboarding", name="Winter resort day")
            ),
            "snow_sports",
        )

    def test_keeps_water_activities_specific(self):
        self.assertEqual(canonical_sport("sailing_v2"), "sailing")
        self.assertEqual(canonical_sport("kayaking_v2"), "kayaking")
        self.assertEqual(canonical_sport("surfing_v2"), "surfing")
        self.assertEqual(canonical_sport("stand_up_paddleboarding"), "stand_up_paddling")

    def test_haversine_distance_is_geographic(self):
        distance = haversine_km((52.3676, 4.9041), (51.9244, 4.4777))
        self.assertGreater(distance, 50)
        self.assertLess(distance, 70)

    def test_same_sport_within_radius_is_grouped_by_year(self):
        archive = build_public_archive(
            [
                activity("running", 52.3676, 4.9041, "2026"),
                activity("running", 51.9244, 4.4777, "2025"),
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
        archive = build_public_archive(
            [activity("strength_training"), activity("lap_swimming")],
            100.0,
        )
        self.assertEqual(archive["mappedActivities"], 0)
        self.assertEqual(archive["unlocatedActivities"], 2)
        self.assertEqual(
            [item["label"] for item in archive["unlocatedSportTotals"]],
            ["Strength", "Swimming"],
        )

    def test_gps_free_activity_uses_nearest_native_gps_within_five_days(self):
        archive = build_public_archive(
            [
                activity(
                    "strength_training",
                    started_at="2026-06-10 08:00:00",
                    activity_id=1,
                ),
                activity(
                    "running",
                    52.0,
                    4.0,
                    started_at="2026-06-06 09:00:00",
                    activity_id=2,
                ),
                activity(
                    "cycling",
                    48.0,
                    2.0,
                    started_at="2026-06-15 07:00:00",
                    activity_id=3,
                ),
            ],
            100.0,
        )
        strength = next(group for group in archive["groups"] if group["type"] == "strength")
        self.assertEqual(strength["latitude"], 52.0)
        self.assertEqual(strength["longitude"], 4.0)
        self.assertEqual(archive["inferredLocationActivities"], 1)
        self.assertEqual(archive["manuallyLocatedActivities"], 0)

    def test_default_location_is_used_when_nearest_gps_is_more_than_five_days_away(self):
        archive = build_public_archive(
            [
                activity(
                    "strength_training",
                    started_at="2026-06-10 08:00:00",
                    activity_id=1,
                ),
                activity(
                    "running",
                    48.0,
                    2.0,
                    started_at="2026-06-15 08:00:01",
                    activity_id=2,
                ),
            ],
            100.0,
            {
                "locations": {"gym": {"latitude": 52.37, "longitude": 4.90}},
                "defaults": {"strength": "gym"},
            },
        )
        strength = next(group for group in archive["groups"] if group["type"] == "strength")
        self.assertEqual(strength["latitude"], 52.4)
        self.assertEqual(archive["inferredLocationActivities"], 0)
        self.assertEqual(archive["manuallyLocatedActivities"], 1)

    def test_private_rules_can_place_gps_free_activities_by_type_and_date(self):
        archive = build_public_archive(
            [activity("strength_training", year="2026")],
            100.0,
            {
                "locations": {
                    "gym": {"latitude": 52.3676123, "longitude": 4.9041389}
                },
                "rules": [
                    {
                        "location": "gym",
                        "activityTypes": ["strength_training"],
                        "from": "2026-01-01",
                    }
                ],
            },
        )
        self.assertEqual(archive["mappedActivities"], 1)
        self.assertEqual(archive["manuallyLocatedActivities"], 1)
        self.assertEqual(archive["unlocatedActivities"], 0)
        self.assertEqual(archive["groups"][0]["latitude"], 52.4)
        self.assertEqual(archive["groups"][0]["longitude"], 4.9)

    def test_zero_zero_is_not_a_real_activity_start(self):
        self.assertIsNone(activity_location(activity("running", 0, 0)))

    def test_custom_activities_support_garmin_missing_types(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "custom.json"
            source.write_text(
                json.dumps(
                    {
                        "activities": [
                            {
                                "id": "sub-1",
                                "type": "other",
                                "name": "Strait sub-marine dive",
                                "date": "2026-04-05T10:30:00",
                                "latitude": 36.1,
                                "longitude": -5.4,
                            },
                            {
                                "id": "balloon-1",
                                "type": "custom",
                                "name": "Luxor AirBallon",
                                "date": "2026-04-07T08:00:00",
                                "latitude": 38.6,
                                "longitude": 34.8,
                            },
                        ]
                    }
                ),
                encoding="utf-8",
            )
            custom = load_custom_activities(source)
        archive = build_public_archive(custom, 100.0)
        self.assertEqual(archive["customActivities"], 2)
        self.assertEqual(
            {group["type"] for group in archive["groups"]},
            {"submarine", "hot_air_balloon"},
        )

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
