import IconAerialLift, { __iconNode as aerialLiftNode } from "@tabler/icons-react/dist/esm/icons/IconAerialLift.mjs";
import IconAirBalloon, { __iconNode as airBalloonNode } from "@tabler/icons-react/dist/esm/icons/IconAirBalloon.mjs";
import IconCar4wd, { __iconNode as car4wdNode } from "@tabler/icons-react/dist/esm/icons/IconCar4wd.mjs";
import IconCliffJumping, { __iconNode as cliffJumpingNode } from "@tabler/icons-react/dist/esm/icons/IconCliffJumping.mjs";
import IconDeer, { __iconNode as deerNode } from "@tabler/icons-react/dist/esm/icons/IconDeer.mjs";
import IconDog, { __iconNode as dogNode } from "@tabler/icons-react/dist/esm/icons/IconDog.mjs";
import IconFall, { __iconNode as fallNode } from "@tabler/icons-react/dist/esm/icons/IconFall.mjs";
import IconHelicopter, { __iconNode as helicopterNode } from "@tabler/icons-react/dist/esm/icons/IconHelicopter.mjs";
import IconSleigh, { __iconNode as sleighNode } from "@tabler/icons-react/dist/esm/icons/IconSleigh.mjs";
import IconSnowboarding, { __iconNode as snowboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSnowboarding.mjs";
import IconSubmarine, { __iconNode as submarineNode } from "@tabler/icons-react/dist/esm/icons/IconSubmarine.mjs";
import {
  GARMIN_ICON_VIEW_BOX,
  garminActivityIcon,
  garminActivityIconNode,
} from "./garminActivityIcons.js";

const garminMeta = (label, color, glyph) => ({
  label,
  color,
  glyph,
  iconSource: "garmin",
  icon: garminActivityIcon(glyph),
  iconNode: garminActivityIconNode(glyph),
  iconViewBox: GARMIN_ICON_VIEW_BOX,
  iconFill: "currentColor",
  iconStroke: "none",
});

const customMeta = (label, color, icon, iconNode, iconAsset) => ({
  label,
  color,
  iconSource: "custom-fallback",
  iconAsset,
  icon,
  iconNode,
  iconViewBox: "0 0 24 24",
  iconFill: "none",
  iconStroke: "currentColor",
});

const g = garminMeta;
const c = customMeta;

export const SPORT_META = {
  running: g("Running", "#d65b3d", "activity-running"),
  trail_running: g("Trail Running", "#b65b37", "activity-running"),
  treadmill_running: g("Treadmill Running", "#c64f45", "activity-running"),
  cycling: g("Cycling", "#3378a5", "activity-cycling"),
  road_cycling: g("Road Cycling", "#2f73a0", "activity-cycling"),
  gravel_cycling: g("Gravel Cycling", "#667b48", "activity-cycling"),
  mountain_biking: g("Mountain Biking", "#4c724f", "activity-cycling"),
  indoor_cycling: g("Indoor Cycling", "#5a6d9f", "activity-cycling"),
  e_biking: g("E-Biking", "#3d7f95", "activity-cycling"),
  swimming: g("Swimming", "#168da0", "activity-swimming"),
  walking: g("Walking", "#8b6f47", "activity-walking"),
  hiking: g("Hiking", "#4f7b52", "activity-hiking"),
  mountaineering: g("Mountaineering", "#606e4b", "activity-hiking"),
  rucking: g("Rucking", "#6d7248", "activity-hiking"),
  strength: g("Strength", "#6d5b91", "activity-fitness-equipment"),
  fitness: g("Fitness", "#bc4d78", "activity-fitness-equipment"),
  cardio: g("Cardio", "#b84d76", "activity-fitness-equipment"),
  hiit: g("HIIT", "#d04d64", "activity-fitness-equipment"),
  stair_climbing: g("Stair Climbing", "#936077", "activity-fitness-equipment"),
  elliptical: g("Elliptical", "#a2587a", "activity-elliptical"),
  boxing: g("Boxing", "#a95054", "activity-fitness-equipment"),
  dance: g("Dance", "#c05887", "activities"),
  jump_rope: g("Jump Rope", "#b45c72", "activity-fitness-equipment"),
  skiing: g("Skiing", "#607fa1", "activity-hiking"),
  snowboarding: g("Snowboarding", "#65758b", "activity-hiking"),
  snow_sports: g("Skiing & Snowboarding", "#637b96", "activity-hiking"),
  snowshoeing: g("Snowshoeing", "#71889a", "activity-hiking"),
  golf: g("Golf", "#768f42", "activity-golf"),
  racket: g("Racket Sports", "#d38a2f", "activity-multisport-people"),
  tennis: g("Tennis", "#d38a2f", "activity-multisport-people"),
  table_tennis: g("Table Tennis", "#c8792f", "activity-multisport-people"),
  badminton: g("Badminton", "#c98c35", "activity-multisport-people"),
  squash: g("Squash", "#b97838", "activity-multisport-people"),
  pickleball: g("Pickleball", "#c89638", "activity-multisport-people"),
  padel: g("Padel", "#bf8332", "activity-multisport-people"),
  team_sport: g("Team Sports", "#bb623d", "activity-multisport-people"),
  soccer: g("Soccer", "#af6540", "activity-multisport-people"),
  american_football: g("American Football", "#a45d3e", "activity-multisport-people"),
  rugby: g("Rugby", "#9b6541", "activity-multisport-people"),
  hockey: g("Hockey", "#716f86", "activity-multisport-people"),
  cricket: g("Cricket", "#8b713e", "activity-multisport-people"),
  lacrosse: g("Lacrosse", "#9e6747", "activity-multisport-people"),
  handball: g("Handball", "#b36340", "activity-multisport-people"),
  sailing: g("Sailing", "#277f91", "activity-marine"),
  kayaking: g("Kayaking", "#197d8d", "activity-marine"),
  canoeing: g("Canoeing", "#347b89", "activity-marine"),
  paddling: g("Paddling", "#2e8291", "activity-marine"),
  stand_up_paddling: g("Stand-Up Paddling", "#3a8891", "activity-marine"),
  surfing: g("Surfing", "#0d8797", "activity-swimming"),
  windsurfing: g("Windsurfing", "#2a7898", "activity-marine"),
  kitesurfing: g("Kitesurfing", "#39729a", "activity-marine"),
  jet_skiing: g("Jet Skiing", "#2c718f", "activity-marine"),
  rowing: g("Rowing", "#407c85", "activity-marine"),
  indoor_rowing: g("Indoor Rowing", "#597a82", "activity-fitness-equipment"),
  yoga: g("Yoga", "#92678e", "activities"),
  pilates: g("Pilates", "#9a668b", "activities"),
  mobility: g("Mobility", "#856b93", "activities"),
  breathwork: g("Breathwork", "#6e7694", "activities"),
  climbing: g("Climbing", "#735f46", "activity-climbing"),
  bouldering: g("Bouldering", "#7d6545", "activity-climbing"),
  via_ferrata: g("Via Ferrata", "#6c604b", "activity-climbing"),
  equestrian: g("Equestrian", "#8d643e", "activity-other"),
  horseback_riding: g("Horseback Riding", "#8d643e", "activity-other"),
  motorsport: g("Motorsport", "#53606b", "activity-motorcycle"),
  atv: g("ATV", "#5f665b", "activity-motorcycle"),
  excursion: g("Excursion", "#7c6448", "activity-motorcycle"),
  scuba_diving: g("Scuba Diving", "#176d80", "activity-swimming"),
  freediving: g("Freediving", "#28788a", "activity-swimming"),
  paragliding: g("Paragliding", "#9a6540", "activity-other"),
  hang_gliding: g("Hang Gliding", "#946a48", "activity-other"),
  skydiving: g("Skydiving", "#8c674f", "activity-other"),
  flight: g("Flight", "#68788a", "activity-other"),
  rafting: g("Rafting", "#287a8b", "activity-marine"),
  wakeboarding: g("Wakeboarding", "#167f91", "activity-swimming"),
  water_skiing: g("Water Skiing", "#268092", "activity-swimming"),
  archery: g("Archery", "#7b6545", "activity-other"),
  bowling: g("Bowling", "#976047", "activity-other"),
  disc_golf: g("Disc Golf", "#718345", "activity-golf"),
  fishing: g("Fishing", "#367582", "activity-marine"),
  hunting: g("Hunting", "#6b6747", "activity-hiking"),
  geocaching: g("Geocaching", "#657348", "activity-hiking"),
  camping: g("Camping", "#687347", "activity-hiking"),
  martial_arts: g("Martial Arts", "#9b554f", "activity-fitness-equipment"),
  gymnastics: g("Gymnastics", "#a95c77", "activities"),
  scooter: g("Scooter", "#5c7180", "activity-motorcycle"),
  snowmobiling: g("Snowmobiling", "#65798c", "activity-motorcycle"),
  ferry: g("Ferry", "#3d7186", "activity-marine"),
  boating: g("Boating", "#316f91", "activity-marine"),
  snorkeling: g("Snorkeling", "#0e8795", "activity-swimming"),
  multisport: g("Multisport", "#a8554c", "activity-multisport"),
  skating: g("Skating", "#5b7d99", "activity-other"),
  baseball: g("Baseball", "#a65b3c", "activity-multisport-people"),
  basketball: g("Basketball", "#c2742e", "activity-multisport-people"),
  volleyball: g("Volleyball", "#597eb7", "activity-multisport-people"),
  submarine: c("Submarine", "#235f73", IconSubmarine, submarineNode, "submarine.svg"),
  hot_air_balloon: c("Hot-Air Balloon", "#a8683f", IconAirBalloon, airBalloonNode, "air-balloon.svg"),
  dog_sledding: c("Dog Sledding", "#526f83", IconDog, dogNode, "dog-sledding.svg"),
  reindeer_sledding: c("Reindeer Sledding", "#7a6548", IconDeer, deerNode, "reindeer-sledding.svg"),
  sledding: c("Sledding", "#607b91", IconSleigh, sleighNode, "sledding.svg"),
  ziplining: c("Ziplining", "#68754b", IconAerialLift, aerialLiftNode, "ziplining.svg"),
  bungee_jumping: c("Bungee Jumping", "#a15c5c", IconFall, fallNode, "bungee-jumping.svg"),
  cliff_jumping: c("Cliff Jumping", "#337a8b", IconCliffJumping, cliffJumpingNode, "cliff-jumping.svg"),
  sandboarding: c("Sandboarding", "#a8793e", IconSnowboarding, snowboardingNode, "sandboarding.svg"),
  dune_bashing: c("Dune Bashing", "#8a7049", IconCar4wd, car4wdNode, "dune-bashing.svg"),
  safari: c("Safari", "#6d7444", IconCar4wd, car4wdNode, "safari.svg"),
  helicopter_tour: c("Helicopter Tour", "#63758a", IconHelicopter, helicopterNode, "helicopter-tour.svg"),
  other: g("Other", "#66756f", "activity-uncategorized"),
};

export function sportIcon(type) {
  return (SPORT_META[type] ?? SPORT_META.other).icon;
}

export function sportIconNode(type) {
  return (SPORT_META[type] ?? SPORT_META.other).iconNode;
}
