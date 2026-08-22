import IconBallBaseball, { __iconNode as ballBaseballNode } from "@tabler/icons-react/dist/esm/icons/IconBallBaseball.mjs";
import IconBallBasketball, { __iconNode as ballBasketballNode } from "@tabler/icons-react/dist/esm/icons/IconBallBasketball.mjs";
import IconBallFootball, { __iconNode as ballFootballNode } from "@tabler/icons-react/dist/esm/icons/IconBallFootball.mjs";
import IconBallTennis, { __iconNode as ballTennisNode } from "@tabler/icons-react/dist/esm/icons/IconBallTennis.mjs";
import IconBallVolleyball, { __iconNode as ballVolleyballNode } from "@tabler/icons-react/dist/esm/icons/IconBallVolleyball.mjs";
import IconBarbell, { __iconNode as barbellNode } from "@tabler/icons-react/dist/esm/icons/IconBarbell.mjs";
import IconBike, { __iconNode as bikeNode } from "@tabler/icons-react/dist/esm/icons/IconBike.mjs";
import IconBolt, { __iconNode as boltNode } from "@tabler/icons-react/dist/esm/icons/IconBolt.mjs";
import IconCar, { __iconNode as carNode } from "@tabler/icons-react/dist/esm/icons/IconCar.mjs";
import IconDumbbell, { __iconNode as dumbbellNode } from "@tabler/icons-react/dist/esm/icons/IconDumbbell.mjs";
import IconGolf, { __iconNode as golfNode } from "@tabler/icons-react/dist/esm/icons/IconGolf.mjs";
import IconHorse, { __iconNode as horseNode } from "@tabler/icons-react/dist/esm/icons/IconHorse.mjs";
import IconKayak, { __iconNode as kayakNode } from "@tabler/icons-react/dist/esm/icons/IconKayak.mjs";
import IconMedal, { __iconNode as medalNode } from "@tabler/icons-react/dist/esm/icons/IconMedal.mjs";
import IconMotorbike, { __iconNode as motorbikeNode } from "@tabler/icons-react/dist/esm/icons/IconMotorbike.mjs";
import IconMountain, { __iconNode as mountainNode } from "@tabler/icons-react/dist/esm/icons/IconMountain.mjs";
import IconRun, { __iconNode as runNode } from "@tabler/icons-react/dist/esm/icons/IconRun.mjs";
import IconSailboat, { __iconNode as sailboatNode } from "@tabler/icons-react/dist/esm/icons/IconSailboat.mjs";
import IconSkiJumping, { __iconNode as skiJumpingNode } from "@tabler/icons-react/dist/esm/icons/IconSkiJumping.mjs";
import IconSkateboarding, { __iconNode as skateboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSkateboarding.mjs";
import IconSnowboarding, { __iconNode as snowboardingNode } from "@tabler/icons-react/dist/esm/icons/IconSnowboarding.mjs";
import IconSwimming, { __iconNode as swimmingNode } from "@tabler/icons-react/dist/esm/icons/IconSwimming.mjs";
import IconTrekking, { __iconNode as trekkingNode } from "@tabler/icons-react/dist/esm/icons/IconTrekking.mjs";
import IconWalk, { __iconNode as walkNode } from "@tabler/icons-react/dist/esm/icons/IconWalk.mjs";
import IconYoga, { __iconNode as yogaNode } from "@tabler/icons-react/dist/esm/icons/IconYoga.mjs";

export const SPORT_META = {
  running: { label: "Running", color: "#d65b3d", icon: IconRun, iconNode: runNode },
  cycling: { label: "Cycling", color: "#3378a5", icon: IconBike, iconNode: bikeNode },
  swimming: { label: "Swimming", color: "#168da0", icon: IconSwimming, iconNode: swimmingNode },
  walking: { label: "Walking", color: "#8b6f47", icon: IconWalk, iconNode: walkNode },
  hiking: { label: "Hiking", color: "#4f7b52", icon: IconTrekking, iconNode: trekkingNode },
  strength: { label: "Strength", color: "#6d5b91", icon: IconDumbbell, iconNode: dumbbellNode },
  fitness: { label: "Fitness", color: "#bc4d78", icon: IconBolt, iconNode: boltNode },
  skiing: { label: "Skiing", color: "#607fa1", icon: IconSkiJumping, iconNode: skiJumpingNode },
  snowboarding: { label: "Snowboarding", color: "#65758b", icon: IconSnowboarding, iconNode: snowboardingNode },
  golf: { label: "Golf", color: "#768f42", icon: IconGolf, iconNode: golfNode },
  racket: { label: "Racket sports", color: "#d38a2f", icon: IconBallTennis, iconNode: ballTennisNode },
  team_sport: { label: "Team sports", color: "#bb623d", icon: IconBallFootball, iconNode: ballFootballNode },
  water_sport: { label: "Water sports", color: "#277f91", icon: IconSailboat, iconNode: sailboatNode },
  rowing: { label: "Rowing", color: "#407c85", icon: IconKayak, iconNode: kayakNode },
  yoga: { label: "Yoga & mobility", color: "#92678e", icon: IconYoga, iconNode: yogaNode },
  climbing: { label: "Climbing", color: "#735f46", icon: IconMountain, iconNode: mountainNode },
  equestrian: { label: "Equestrian", color: "#8d643e", icon: IconHorse, iconNode: horseNode },
  motorsport: { label: "Motorsport", color: "#53606b", icon: IconMotorbike, iconNode: motorbikeNode },
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
