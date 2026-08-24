import IconAerialLift, { __iconNode as aerialLiftNode } from "@tabler/icons-react/dist/esm/icons/IconAerialLift.mjs";
import IconAirBalloon, { __iconNode as airBalloonNode } from "@tabler/icons-react/dist/esm/icons/IconAirBalloon.mjs";
import IconBackpack, { __iconNode as backpackNode } from "@tabler/icons-react/dist/esm/icons/IconBackpack.mjs";
import IconBallTennis, { __iconNode as ballTennisNode } from "@tabler/icons-react/dist/esm/icons/IconBallTennis.mjs";
import IconBarbell, { __iconNode as barbellNode } from "@tabler/icons-react/dist/esm/icons/IconBarbell.mjs";
import IconBolt, { __iconNode as boltNode } from "@tabler/icons-react/dist/esm/icons/IconBolt.mjs";
import IconCamper, { __iconNode as camperNode } from "@tabler/icons-react/dist/esm/icons/IconCamper.mjs";
import IconCar4wd, { __iconNode as car4wdNode } from "@tabler/icons-react/dist/esm/icons/IconCar4wd.mjs";
import IconCliffJumping, { __iconNode as cliffJumpingNode } from "@tabler/icons-react/dist/esm/icons/IconCliffJumping.mjs";
import IconDeer, { __iconNode as deerNode } from "@tabler/icons-react/dist/esm/icons/IconDeer.mjs";
import IconDog, { __iconNode as dogNode } from "@tabler/icons-react/dist/esm/icons/IconDog.mjs";
import IconFall, { __iconNode as fallNode } from "@tabler/icons-react/dist/esm/icons/IconFall.mjs";
import IconFerry, { __iconNode as ferryNode } from "@tabler/icons-react/dist/esm/icons/IconFerry.mjs";
import IconFish, { __iconNode as fishNode } from "@tabler/icons-react/dist/esm/icons/IconFish.mjs";
import IconHeartbeat, { __iconNode as heartbeatNode } from "@tabler/icons-react/dist/esm/icons/IconHeartbeat.mjs";
import IconHelicopter, { __iconNode as helicopterNode } from "@tabler/icons-react/dist/esm/icons/IconHelicopter.mjs";
import IconHorse, { __iconNode as horseNode } from "@tabler/icons-react/dist/esm/icons/IconHorse.mjs";
import IconIceSkating, { __iconNode as iceSkatingNode } from "@tabler/icons-react/dist/esm/icons/IconIceSkating.mjs";
import IconJetski, { __iconNode as jetskiNode } from "@tabler/icons-react/dist/esm/icons/IconJetski.mjs";
import IconKayak, { __iconNode as kayakNode } from "@tabler/icons-react/dist/esm/icons/IconKayak.mjs";
import IconLungs, { __iconNode as lungsNode } from "@tabler/icons-react/dist/esm/icons/IconLungs.mjs";
import IconMountain, { __iconNode as mountainNode } from "@tabler/icons-react/dist/esm/icons/IconMountain.mjs";
import IconParachute, { __iconNode as parachuteNode } from "@tabler/icons-react/dist/esm/icons/IconParachute.mjs";
import IconPingPong, { __iconNode as pingPongNode } from "@tabler/icons-react/dist/esm/icons/IconPingPong.mjs";
import IconPlaneTilt, { __iconNode as planeTiltNode } from "@tabler/icons-react/dist/esm/icons/IconPlaneTilt.mjs";
import IconRipple, { __iconNode as rippleNode } from "@tabler/icons-react/dist/esm/icons/IconRipple.mjs";
import IconSailboat, { __iconNode as sailboatNode } from "@tabler/icons-react/dist/esm/icons/IconSailboat.mjs";
import IconScubaDiving, { __iconNode as scubaDivingNode } from "@tabler/icons-react/dist/esm/icons/IconScubaDiving.mjs";
import IconScubaMask, { __iconNode as scubaMaskNode } from "@tabler/icons-react/dist/esm/icons/IconScubaMask.mjs";
import IconSkiJumping, { __iconNode as skiJumpingNode } from "@tabler/icons-react/dist/esm/icons/IconSkiJumping.mjs";
import IconSleigh, { __iconNode as sleighNode } from "@tabler/icons-react/dist/esm/icons/IconSleigh.mjs";
import IconSnowboarding, { __iconNode as snowboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSnowboarding.mjs";
import IconSnowflake, { __iconNode as snowflakeNode } from "@tabler/icons-react/dist/esm/icons/IconSnowflake.mjs";
import IconStairs, { __iconNode as stairsNode } from "@tabler/icons-react/dist/esm/icons/IconStairs.mjs";
import IconStretching, { __iconNode as stretchingNode } from "@tabler/icons-react/dist/esm/icons/IconStretching.mjs";
import IconSubmarine, { __iconNode as submarineNode } from "@tabler/icons-react/dist/esm/icons/IconSubmarine.mjs";
import IconTent, { __iconNode as tentNode } from "@tabler/icons-react/dist/esm/icons/IconTent.mjs";
import IconWind, { __iconNode as windNode } from "@tabler/icons-react/dist/esm/icons/IconWind.mjs";
import IconYoga, { __iconNode as yogaNode } from "@tabler/icons-react/dist/esm/icons/IconYoga.mjs";
import { IconCamel, camelNode } from "./customActivityIcons.js";
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

const semanticMeta = (label, color, icon, iconNode, iconAsset) => ({
  ...customMeta(label, color, icon, iconNode, iconAsset),
  iconSource: "semantic",
});

const g = garminMeta;
const c = customMeta;
const s = semanticMeta;

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
  mountaineering: s("Mountaineering", "#606e4b", IconMountain, mountainNode, "tabler-mountain.svg"),
  rucking: s("Rucking", "#6d7248", IconBackpack, backpackNode, "tabler-backpack.svg"),
  strength: s("Strength", "#6d5b91", IconBarbell, barbellNode, "tabler-barbell.svg"),
  fitness: g("Fitness", "#bc4d78", "activity-fitness-equipment"),
  cardio: s("Cardio", "#b84d76", IconHeartbeat, heartbeatNode, "tabler-heartbeat.svg"),
  hiit: s("HIIT", "#d04d64", IconBolt, boltNode, "tabler-bolt.svg"),
  stair_climbing: s("Stair Climbing", "#936077", IconStairs, stairsNode, "tabler-stairs.svg"),
  elliptical: g("Elliptical", "#a2587a", "activity-elliptical"),
  boxing: g("Boxing", "#a95054", "activity-fitness-equipment"),
  dance: g("Dance", "#c05887", "activities"),
  jump_rope: g("Jump Rope", "#b45c72", "activity-fitness-equipment"),
  skiing: s("Skiing", "#607fa1", IconSkiJumping, skiJumpingNode, "tabler-ski-jumping.svg"),
  snowboarding: s("Snowboarding", "#65758b", IconSnowboarding, snowboardingNode, "tabler-snowboarding.svg"),
  snow_sports: s("Skiing & Snowboarding", "#637b96", IconSnowflake, snowflakeNode, "tabler-snowflake.svg"),
  snowshoeing: g("Snowshoeing", "#71889a", "activity-hiking"),
  golf: g("Golf", "#768f42", "activity-golf"),
  racket: s("Racket Sports", "#d38a2f", IconBallTennis, ballTennisNode, "tabler-ball-tennis.svg"),
  tennis: s("Tennis", "#d38a2f", IconBallTennis, ballTennisNode, "tabler-ball-tennis.svg"),
  table_tennis: s("Table Tennis", "#c8792f", IconPingPong, pingPongNode, "tabler-ping-pong.svg"),
  badminton: s("Badminton", "#c98c35", IconBallTennis, ballTennisNode, "tabler-ball-tennis.svg"),
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
  sailing: s("Sailing", "#277f91", IconSailboat, sailboatNode, "tabler-sailboat.svg"),
  kayaking: s("Kayaking", "#197d8d", IconKayak, kayakNode, "tabler-kayak.svg"),
  canoeing: s("Canoeing", "#347b89", IconKayak, kayakNode, "tabler-kayak.svg"),
  paddling: s("Paddling", "#2e8291", IconKayak, kayakNode, "tabler-kayak.svg"),
  stand_up_paddling: s("Stand-Up Paddling", "#3a8891", IconRipple, rippleNode, "tabler-ripple.svg"),
  surfing: s("Surfing", "#0d8797", IconRipple, rippleNode, "tabler-ripple.svg"),
  windsurfing: s("Windsurfing", "#2a7898", IconWind, windNode, "tabler-wind.svg"),
  kitesurfing: s("Kitesurfing", "#39729a", IconWind, windNode, "tabler-wind.svg"),
  jet_skiing: s("Jet Skiing", "#2c718f", IconJetski, jetskiNode, "tabler-jetski.svg"),
  rowing: s("Rowing", "#407c85", IconKayak, kayakNode, "tabler-kayak.svg"),
  indoor_rowing: g("Indoor Rowing", "#597a82", "activity-fitness-equipment"),
  yoga: s("Yoga", "#92678e", IconYoga, yogaNode, "tabler-yoga.svg"),
  pilates: s("Pilates", "#9a668b", IconStretching, stretchingNode, "tabler-stretching.svg"),
  mobility: s("Mobility", "#856b93", IconStretching, stretchingNode, "tabler-stretching.svg"),
  breathwork: s("Breathwork", "#6e7694", IconLungs, lungsNode, "tabler-lungs.svg"),
  climbing: g("Climbing", "#735f46", "activity-climbing"),
  bouldering: g("Bouldering", "#7d6545", "activity-climbing"),
  via_ferrata: g("Via Ferrata", "#6c604b", "activity-climbing"),
  equestrian: s("Equestrian", "#8d643e", IconHorse, horseNode, "tabler-horse.svg"),
  horseback_riding: s("Horseback Riding", "#8d643e", IconHorse, horseNode, "tabler-horse.svg"),
  camel_riding: c("Camel Riding", "#9a6b3f", IconCamel, camelNode, "camel.svg"),
  motorsport: g("Motorsport", "#53606b", "activity-motorcycle"),
  atv: s("ATV", "#5f665b", IconCar4wd, car4wdNode, "tabler-car-4wd.svg"),
  excursion: s("Excursion", "#7c6448", IconCamper, camperNode, "tabler-camper.svg"),
  scuba_diving: s("Scuba Diving", "#176d80", IconScubaDiving, scubaDivingNode, "tabler-scuba-diving.svg"),
  freediving: s("Freediving", "#28788a", IconScubaMask, scubaMaskNode, "tabler-scuba-mask.svg"),
  paragliding: s("Paragliding", "#9a6540", IconParachute, parachuteNode, "tabler-parachute.svg"),
  hang_gliding: s("Hang Gliding", "#946a48", IconParachute, parachuteNode, "tabler-parachute.svg"),
  skydiving: s("Skydiving", "#8c674f", IconParachute, parachuteNode, "tabler-parachute.svg"),
  flight: s("Flight", "#68788a", IconPlaneTilt, planeTiltNode, "tabler-plane-tilt.svg"),
  rafting: s("Rafting", "#287a8b", IconKayak, kayakNode, "tabler-kayak.svg"),
  wakeboarding: s("Wakeboarding", "#167f91", IconRipple, rippleNode, "tabler-ripple.svg"),
  water_skiing: s("Water Skiing", "#268092", IconRipple, rippleNode, "tabler-ripple.svg"),
  archery: g("Archery", "#7b6545", "activity-other"),
  bowling: g("Bowling", "#976047", "activity-other"),
  disc_golf: g("Disc Golf", "#718345", "activity-golf"),
  fishing: s("Fishing", "#367582", IconFish, fishNode, "tabler-fish.svg"),
  hunting: g("Hunting", "#6b6747", "activity-hiking"),
  geocaching: g("Geocaching", "#657348", "activity-hiking"),
  camping: s("Camping", "#687347", IconTent, tentNode, "tabler-tent.svg"),
  martial_arts: g("Martial Arts", "#9b554f", "activity-fitness-equipment"),
  gymnastics: g("Gymnastics", "#a95c77", "activities"),
  scooter: g("Scooter", "#5c7180", "activity-motorcycle"),
  snowmobiling: g("Snowmobiling", "#65798c", "activity-motorcycle"),
  ferry: s("Ferry", "#3d7186", IconFerry, ferryNode, "tabler-ferry.svg"),
  boating: g("Boating", "#316f91", "activity-marine"),
  snorkeling: s("Snorkeling", "#0e8795", IconScubaMask, scubaMaskNode, "tabler-scuba-mask.svg"),
  multisport: g("Multisport", "#a8554c", "activity-multisport"),
  skating: s("Skating", "#5b7d99", IconIceSkating, iceSkatingNode, "tabler-ice-skating.svg"),
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
