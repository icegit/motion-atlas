import IconBallBaseball, { __iconNode as ballBaseballNode } from "@tabler/icons-react/dist/esm/icons/IconBallBaseball.mjs";
import IconBallAmericanFootball, { __iconNode as ballAmericanFootballNode } from "@tabler/icons-react/dist/esm/icons/IconBallAmericanFootball.mjs";
import IconBallBasketball, { __iconNode as ballBasketballNode } from "@tabler/icons-react/dist/esm/icons/IconBallBasketball.mjs";
import IconBallFootball, { __iconNode as ballFootballNode } from "@tabler/icons-react/dist/esm/icons/IconBallFootball.mjs";
import IconBallTennis, { __iconNode as ballTennisNode } from "@tabler/icons-react/dist/esm/icons/IconBallTennis.mjs";
import IconBallVolleyball, { __iconNode as ballVolleyballNode } from "@tabler/icons-react/dist/esm/icons/IconBallVolleyball.mjs";
import IconBarbell, { __iconNode as barbellNode } from "@tabler/icons-react/dist/esm/icons/IconBarbell.mjs";
import IconBike, { __iconNode as bikeNode } from "@tabler/icons-react/dist/esm/icons/IconBike.mjs";
import IconBolt, { __iconNode as boltNode } from "@tabler/icons-react/dist/esm/icons/IconBolt.mjs";
import IconCar, { __iconNode as carNode } from "@tabler/icons-react/dist/esm/icons/IconCar.mjs";
import IconCar4wd, { __iconNode as car4wdNode } from "@tabler/icons-react/dist/esm/icons/IconCar4wd.mjs";
import IconDumbbell, { __iconNode as dumbbellNode } from "@tabler/icons-react/dist/esm/icons/IconDumbbell.mjs";
import IconGolf, { __iconNode as golfNode } from "@tabler/icons-react/dist/esm/icons/IconGolf.mjs";
import IconHorse, { __iconNode as horseNode } from "@tabler/icons-react/dist/esm/icons/IconHorse.mjs";
import IconJetski, { __iconNode as jetskiNode } from "@tabler/icons-react/dist/esm/icons/IconJetski.mjs";
import IconJumpRope, { __iconNode as jumpRopeNode } from "@tabler/icons-react/dist/esm/icons/IconJumpRope.mjs";
import IconKayak, { __iconNode as kayakNode } from "@tabler/icons-react/dist/esm/icons/IconKayak.mjs";
import IconMedal, { __iconNode as medalNode } from "@tabler/icons-react/dist/esm/icons/IconMedal.mjs";
import IconMotorbike, { __iconNode as motorbikeNode } from "@tabler/icons-react/dist/esm/icons/IconMotorbike.mjs";
import IconMountain, { __iconNode as mountainNode } from "@tabler/icons-react/dist/esm/icons/IconMountain.mjs";
import IconRipple, { __iconNode as rippleNode } from "@tabler/icons-react/dist/esm/icons/IconRipple.mjs";
import IconRun, { __iconNode as runNode } from "@tabler/icons-react/dist/esm/icons/IconRun.mjs";
import IconRunSprint, { __iconNode as runSprintNode } from "@tabler/icons-react/dist/esm/icons/IconRunSprint.mjs";
import IconSailboat, { __iconNode as sailboatNode } from "@tabler/icons-react/dist/esm/icons/IconSailboat.mjs";
import IconSkiJumping, { __iconNode as skiJumpingNode } from "@tabler/icons-react/dist/esm/icons/IconSkiJumping.mjs";
import IconSkateboarding, { __iconNode as skateboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSkateboarding.mjs";
import IconSnowboarding, { __iconNode as snowboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSnowboarding.mjs";
import IconSwimming, { __iconNode as swimmingNode } from "@tabler/icons-react/dist/esm/icons/IconSwimming.mjs";
import IconStairs, { __iconNode as stairsNode } from "@tabler/icons-react/dist/esm/icons/IconStairs.mjs";
import IconTrekking, { __iconNode as trekkingNode } from "@tabler/icons-react/dist/esm/icons/IconTrekking.mjs";
import IconWalk, { __iconNode as walkNode } from "@tabler/icons-react/dist/esm/icons/IconWalk.mjs";
import IconWind, { __iconNode as windNode } from "@tabler/icons-react/dist/esm/icons/IconWind.mjs";
import IconYoga, { __iconNode as yogaNode } from "@tabler/icons-react/dist/esm/icons/IconYoga.mjs";

export const SPORT_META = {
  running: { label: "Running", color: "#d65b3d", icon: IconRun, iconNode: runNode },
  trail_running: { label: "Trail running", color: "#b65b37", icon: IconTrekking, iconNode: trekkingNode },
  treadmill_running: { label: "Treadmill running", color: "#c64f45", icon: IconRunSprint, iconNode: runSprintNode },
  cycling: { label: "Cycling", color: "#3378a5", icon: IconBike, iconNode: bikeNode },
  road_cycling: { label: "Road cycling", color: "#2f73a0", icon: IconBike, iconNode: bikeNode },
  gravel_cycling: { label: "Gravel cycling", color: "#667b48", icon: IconBike, iconNode: bikeNode },
  mountain_biking: { label: "Mountain biking", color: "#4c724f", icon: IconBike, iconNode: bikeNode },
  indoor_cycling: { label: "Indoor cycling", color: "#5a6d9f", icon: IconBike, iconNode: bikeNode },
  e_biking: { label: "E-biking", color: "#3d7f95", icon: IconBike, iconNode: bikeNode },
  swimming: { label: "Swimming", color: "#168da0", icon: IconSwimming, iconNode: swimmingNode },
  open_water_swimming: { label: "Open-water swimming", color: "#087f98", icon: IconSwimming, iconNode: swimmingNode },
  lap_swimming: { label: "Lap swimming", color: "#2b8aa6", icon: IconSwimming, iconNode: swimmingNode },
  walking: { label: "Walking", color: "#8b6f47", icon: IconWalk, iconNode: walkNode },
  hiking: { label: "Hiking", color: "#4f7b52", icon: IconTrekking, iconNode: trekkingNode },
  mountaineering: { label: "Mountaineering", color: "#606e4b", icon: IconMountain, iconNode: mountainNode },
  rucking: { label: "Rucking", color: "#6d7248", icon: IconTrekking, iconNode: trekkingNode },
  strength: { label: "Strength", color: "#6d5b91", icon: IconDumbbell, iconNode: dumbbellNode },
  fitness: { label: "Fitness", color: "#bc4d78", icon: IconBolt, iconNode: boltNode },
  cardio: { label: "Cardio", color: "#b84d76", icon: IconBolt, iconNode: boltNode },
  hiit: { label: "HIIT", color: "#d04d64", icon: IconBolt, iconNode: boltNode },
  stair_climbing: { label: "Stair climbing", color: "#936077", icon: IconStairs, iconNode: stairsNode },
  elliptical: { label: "Elliptical", color: "#a2587a", icon: IconBolt, iconNode: boltNode },
  boxing: { label: "Boxing", color: "#a95054", icon: IconBarbell, iconNode: barbellNode },
  dance: { label: "Dance", color: "#c05887", icon: IconBolt, iconNode: boltNode },
  jump_rope: { label: "Jump rope", color: "#b45c72", icon: IconJumpRope, iconNode: jumpRopeNode },
  skiing: { label: "Skiing", color: "#607fa1", icon: IconSkiJumping, iconNode: skiJumpingNode },
  snowboarding: { label: "Snowboarding", color: "#65758b", icon: IconSnowboarding, iconNode: snowboardingNode },
  snow_sports: { label: "Skiing & snowboarding", color: "#637b96", icon: IconSnowboarding, iconNode: snowboardingNode },
  snowshoeing: { label: "Snowshoeing", color: "#71889a", icon: IconTrekking, iconNode: trekkingNode },
  golf: { label: "Golf", color: "#768f42", icon: IconGolf, iconNode: golfNode },
  racket: { label: "Racket sports", color: "#d38a2f", icon: IconBallTennis, iconNode: ballTennisNode },
  tennis: { label: "Tennis", color: "#d38a2f", icon: IconBallTennis, iconNode: ballTennisNode },
  table_tennis: { label: "Table tennis", color: "#c8792f", icon: IconBallTennis, iconNode: ballTennisNode },
  badminton: { label: "Badminton", color: "#c98c35", icon: IconBallTennis, iconNode: ballTennisNode },
  squash: { label: "Squash", color: "#b97838", icon: IconBallTennis, iconNode: ballTennisNode },
  pickleball: { label: "Pickleball", color: "#c89638", icon: IconBallTennis, iconNode: ballTennisNode },
  padel: { label: "Padel", color: "#bf8332", icon: IconBallTennis, iconNode: ballTennisNode },
  team_sport: { label: "Team sports", color: "#bb623d", icon: IconBallFootball, iconNode: ballFootballNode },
  soccer: { label: "Soccer", color: "#af6540", icon: IconBallFootball, iconNode: ballFootballNode },
  american_football: { label: "American football", color: "#a45d3e", icon: IconBallAmericanFootball, iconNode: ballAmericanFootballNode },
  rugby: { label: "Rugby", color: "#9b6541", icon: IconBallAmericanFootball, iconNode: ballAmericanFootballNode },
  hockey: { label: "Hockey", color: "#716f86", icon: IconMedal, iconNode: medalNode },
  cricket: { label: "Cricket", color: "#8b713e", icon: IconMedal, iconNode: medalNode },
  lacrosse: { label: "Lacrosse", color: "#9e6747", icon: IconMedal, iconNode: medalNode },
  handball: { label: "Handball", color: "#b36340", icon: IconBallVolleyball, iconNode: ballVolleyballNode },
  sailing: { label: "Sailing", color: "#277f91", icon: IconSailboat, iconNode: sailboatNode },
  kayaking: { label: "Kayaking", color: "#197d8d", icon: IconKayak, iconNode: kayakNode },
  canoeing: { label: "Canoeing", color: "#347b89", icon: IconKayak, iconNode: kayakNode },
  paddling: { label: "Paddling", color: "#2e8291", icon: IconKayak, iconNode: kayakNode },
  stand_up_paddling: { label: "Stand-up paddling", color: "#3a8891", icon: IconKayak, iconNode: kayakNode },
  surfing: { label: "Surfing", color: "#0d8797", icon: IconRipple, iconNode: rippleNode },
  windsurfing: { label: "Windsurfing", color: "#2a7898", icon: IconWind, iconNode: windNode },
  kitesurfing: { label: "Kitesurfing", color: "#39729a", icon: IconWind, iconNode: windNode },
  jet_skiing: { label: "Jet skiing", color: "#2c718f", icon: IconJetski, iconNode: jetskiNode },
  rowing: { label: "Rowing", color: "#407c85", icon: IconKayak, iconNode: kayakNode },
  indoor_rowing: { label: "Indoor rowing", color: "#597a82", icon: IconKayak, iconNode: kayakNode },
  yoga: { label: "Yoga & mobility", color: "#92678e", icon: IconYoga, iconNode: yogaNode },
  pilates: { label: "Pilates", color: "#9a668b", icon: IconYoga, iconNode: yogaNode },
  mobility: { label: "Mobility", color: "#856b93", icon: IconYoga, iconNode: yogaNode },
  breathwork: { label: "Breathwork", color: "#6e7694", icon: IconWind, iconNode: windNode },
  climbing: { label: "Climbing", color: "#735f46", icon: IconMountain, iconNode: mountainNode },
  bouldering: { label: "Bouldering", color: "#7d6545", icon: IconMountain, iconNode: mountainNode },
  via_ferrata: { label: "Via ferrata", color: "#6c604b", icon: IconMountain, iconNode: mountainNode },
  equestrian: { label: "Equestrian", color: "#8d643e", icon: IconHorse, iconNode: horseNode },
  horseback_riding: { label: "Horseback riding", color: "#8d643e", icon: IconHorse, iconNode: horseNode },
  motorsport: { label: "Motorsport", color: "#53606b", icon: IconMotorbike, iconNode: motorbikeNode },
  atv: { label: "ATV", color: "#5f665b", icon: IconCar4wd, iconNode: car4wdNode },
  driving: { label: "Driving", color: "#60686e", icon: IconCar, iconNode: carNode },
  overland: { label: "Overland", color: "#7c6448", icon: IconCar, iconNode: carNode },
  boating: { label: "Boating", color: "#316f91", icon: IconSailboat, iconNode: sailboatNode },
  snorkeling: { label: "Snorkeling", color: "#0e8795", icon: IconSwimming, iconNode: swimmingNode },
  multisport: { label: "Multisport", color: "#a8554c", icon: IconMedal, iconNode: medalNode },
  skating: { label: "Skating", color: "#5b7d99", icon: IconSkateboarding, iconNode: skateboardingNode },
  baseball: { label: "Baseball", color: "#a65b3c", icon: IconBallBaseball, iconNode: ballBaseballNode },
  basketball: { label: "Basketball", color: "#c2742e", icon: IconBallBasketball, iconNode: ballBasketballNode },
  volleyball: { label: "Volleyball", color: "#597eb7", icon: IconBallVolleyball, iconNode: ballVolleyballNode },
  other: { label: "Other", color: "#66756f", icon: IconBarbell, iconNode: barbellNode },
};

export function sportIcon(type) {
  return (SPORT_META[type] ?? SPORT_META.other).icon;
}

export function sportIconNode(type) {
  return (SPORT_META[type] ?? SPORT_META.other).iconNode;
}
