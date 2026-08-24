# Activity type and icon reference

Motion Black publishes canonical activity types rather than Garmin's raw labels. The tables below are the supported public vocabulary and show the exact icon used by the site.

Core Garmin categories use the authorized Garmin activity glyph set whenever that font contains an exact semantic match. Garmin's web font exposes only broad parent glyphs for many specific sports, so those misleading matches use a precise Tabler activity icon instead—for example Yoga, Snowboarding, Snorkeling, Surfing, and Excursion. Name-derived Garmin `Other`/`Custom` fallbacks are also documented below and include activities Garmin does not provide as a specific type.

Classification follows this order:

1. A specific Garmin type wins, for example `walking`, `cycling`, or `lap_swimming`.
2. `driving` and `overland` become `excursion`; every swimming variant becomes `swimming`.
3. When the Garmin type is generic (`custom`, `other`, `uncategorized`, or `unknown`), the private activity name is inspected. For example, `Custom` + `Luxor AirBallon` becomes `hot_air_balloon`.
4. The private name, Garmin ID, route, and exact coordinates are never included in the public archive.

Name matching accepts common separator, spelling, and language variants, including `AirBalloon`, `AirBallon`, `sub-marine`, `snoerkeling`, and their canonical spellings. A specific Garmin type is never replaced only because its activity name resembles another type.

## Running, walking, and wheels

| Icon | Public type | Recognized type/name examples |
|---|---|---|
| <img src="docs/activity-icons/garmin-activity-running.svg" width="24" alt="Running icon"> | `running` | running, jogging |
| <img src="docs/activity-icons/garmin-activity-running.svg" width="24" alt="Trail running icon"> | `trail_running` | trail running |
| <img src="docs/activity-icons/garmin-activity-running.svg" width="24" alt="Treadmill running icon"> | `treadmill_running` | treadmill run |
| <img src="docs/activity-icons/garmin-activity-walking.svg" width="24" alt="Walking icon"> | `walking` | walking, walk |
| <img src="docs/activity-icons/garmin-activity-hiking.svg" width="24" alt="Hiking icon"> | `hiking` | hiking, trekking |
| <img src="docs/activity-icons/tabler-mountain.svg" width="24" alt="Mountaineering icon"> | `mountaineering` | mountaineering |
| <img src="docs/activity-icons/tabler-backpack.svg" width="24" alt="Rucking icon"> | `rucking` | rucking |
| <img src="docs/activity-icons/garmin-activity-cycling.svg" width="24" alt="Cycling icon"> | `cycling` | biking, cycling, BMX, cyclocross |
| <img src="docs/activity-icons/garmin-activity-cycling.svg" width="24" alt="Road cycling icon"> | `road_cycling` | road biking, road cycling |
| <img src="docs/activity-icons/garmin-activity-cycling.svg" width="24" alt="Gravel cycling icon"> | `gravel_cycling` | gravel cycling |
| <img src="docs/activity-icons/garmin-activity-cycling.svg" width="24" alt="Mountain biking icon"> | `mountain_biking` | mountain bike, MTB |
| <img src="docs/activity-icons/garmin-activity-cycling.svg" width="24" alt="Indoor cycling icon"> | `indoor_cycling` | indoor cycling, indoor bike |
| <img src="docs/activity-icons/garmin-activity-cycling.svg" width="24" alt="E-biking icon"> | `e_biking` | e-bike, ebike, electric bike |
| <img src="docs/activity-icons/garmin-activity-motorcycle.svg" width="24" alt="Scooter icon"> | `scooter` | scooter, kick scooter |

## Water and underwater

| Icon | Public type | Recognized type/name examples |
|---|---|---|
| <img src="docs/activity-icons/garmin-activity-swimming.svg" width="24" alt="Swimming icon"> | `swimming` | swimming, open-water, pool, lap swimming |
| <img src="docs/activity-icons/tabler-scuba-diving.svg" width="24" alt="Scuba diving icon"> | `scuba_diving` | scuba, scuba diving, tüplü dalış |
| <img src="docs/activity-icons/tabler-scuba-mask.svg" width="24" alt="Freediving icon"> | `freediving` | freediving, free diving, serbest dalış |
| <img src="docs/activity-icons/submarine.svg" width="24" alt="Submarine icon"> | `submarine` | submarine, sub-marine, submersible, denizaltı |
| <img src="docs/activity-icons/tabler-scuba-mask.svg" width="24" alt="Snorkeling icon"> | `snorkeling` | snorkeling, snoerkeling |
| <img src="docs/activity-icons/tabler-sailboat.svg" width="24" alt="Sailing icon"> | `sailing` | sailing, sail |
| <img src="docs/activity-icons/garmin-activity-marine.svg" width="24" alt="Boating icon"> | `boating` | boating, boat |
| <img src="docs/activity-icons/tabler-ferry.svg" width="24" alt="Ferry icon"> | `ferry` | ferry, feribot |
| <img src="docs/activity-icons/tabler-kayak.svg" width="24" alt="Kayaking icon"> | `kayaking` | kayaking, kayak |
| <img src="docs/activity-icons/tabler-kayak.svg" width="24" alt="Canoeing icon"> | `canoeing` | canoeing, canoe |
| <img src="docs/activity-icons/tabler-kayak.svg" width="24" alt="Paddling icon"> | `paddling` | paddling |
| <img src="docs/activity-icons/tabler-ripple.svg" width="24" alt="Stand-up paddling icon"> | `stand_up_paddling` | SUP, stand-up paddleboarding |
| <img src="docs/activity-icons/tabler-kayak.svg" width="24" alt="Rafting icon"> | `rafting` | rafting, whitewater rafting |
| <img src="docs/activity-icons/tabler-ripple.svg" width="24" alt="Surfing icon"> | `surfing` | surfing |
| <img src="docs/activity-icons/tabler-wind.svg" width="24" alt="Windsurfing icon"> | `windsurfing` | windsurfing |
| <img src="docs/activity-icons/tabler-wind.svg" width="24" alt="Kitesurfing icon"> | `kitesurfing` | kitesurfing |
| <img src="docs/activity-icons/tabler-ripple.svg" width="24" alt="Wakeboarding icon"> | `wakeboarding` | wakeboard, wakesurf |
| <img src="docs/activity-icons/tabler-ripple.svg" width="24" alt="Water skiing icon"> | `water_skiing` | water skiing, waterskiing |
| <img src="docs/activity-icons/tabler-jetski.svg" width="24" alt="Jet skiing icon"> | `jet_skiing` | jet ski, jetski |
| <img src="docs/activity-icons/tabler-kayak.svg" width="24" alt="Rowing icon"> | `rowing` | rowing, crew |
| <img src="docs/activity-icons/garmin-activity-fitness-equipment.svg" width="24" alt="Indoor rowing icon"> | `indoor_rowing` | indoor rowing |

## Air, travel, and motors

| Icon | Public type | Recognized type/name examples |
|---|---|---|
| <img src="docs/activity-icons/air-balloon.svg" width="24" alt="Hot-air balloon icon"> | `hot_air_balloon` | hot-air balloon, AirBalloon, AirBallon, hava balonu |
| <img src="docs/activity-icons/helicopter-tour.svg" width="24" alt="Helicopter tour icon"> | `helicopter_tour` | helicopter tour, helicopter ride, heli tour |
| <img src="docs/activity-icons/ziplining.svg" width="24" alt="Ziplining icon"> | `ziplining` | zipline, zip lining, canopy tour |
| <img src="docs/activity-icons/bungee-jumping.svg" width="24" alt="Bungee jumping icon"> | `bungee_jumping` | bungee jumping, bungy jump |
| <img src="docs/activity-icons/cliff-jumping.svg" width="24" alt="Cliff jumping icon"> | `cliff_jumping` | cliff jumping, coasteering |
| <img src="docs/activity-icons/sandboarding.svg" width="24" alt="Sandboarding icon"> | `sandboarding` | sandboarding, dune boarding |
| <img src="docs/activity-icons/dune-bashing.svg" width="24" alt="Dune bashing icon"> | `dune_bashing` | dune bashing, dune drive, desert 4x4 |
| <img src="docs/activity-icons/safari.svg" width="24" alt="Safari icon"> | `safari` | safari, game drive |
| <img src="docs/activity-icons/tabler-parachute.svg" width="24" alt="Paragliding icon"> | `paragliding` | paragliding, yamaç paraşütü |
| <img src="docs/activity-icons/tabler-parachute.svg" width="24" alt="Hang gliding icon"> | `hang_gliding` | hang gliding, deltaplane |
| <img src="docs/activity-icons/tabler-parachute.svg" width="24" alt="Skydiving icon"> | `skydiving` | skydiving, BASE jump, paraşüt |
| <img src="docs/activity-icons/tabler-plane-tilt.svg" width="24" alt="Flight icon"> | `flight` | flight, flying, uçuş |
| <img src="docs/activity-icons/tabler-camper.svg" width="24" alt="Excursion icon"> | `excursion` | driving, overland |
| <img src="docs/activity-icons/garmin-activity-motorcycle.svg" width="24" alt="Motorsport icon"> | `motorsport` | motorcycling, motocross, auto racing |
| <img src="docs/activity-icons/tabler-car-4wd.svg" width="24" alt="ATV icon"> | `atv` | ATV |
| <img src="docs/activity-icons/garmin-activity-motorcycle.svg" width="24" alt="Snowmobiling icon"> | `snowmobiling` | snowmobile, snowmobiling |

## Fitness and mind-body

| Icon | Public type | Recognized type/name examples |
|---|---|---|
| <img src="docs/activity-icons/tabler-barbell.svg" width="24" alt="Strength icon"> | `strength` | strength training, weight training, gym |
| <img src="docs/activity-icons/garmin-activity-fitness-equipment.svg" width="24" alt="Fitness icon"> | `fitness` | fitness |
| <img src="docs/activity-icons/tabler-heartbeat.svg" width="24" alt="Cardio icon"> | `cardio` | cardio, indoor training |
| <img src="docs/activity-icons/tabler-bolt.svg" width="24" alt="HIIT icon"> | `hiit` | HIIT |
| <img src="docs/activity-icons/tabler-stairs.svg" width="24" alt="Stair climbing icon"> | `stair_climbing` | stairs, stair climbing |
| <img src="docs/activity-icons/garmin-activity-elliptical.svg" width="24" alt="Elliptical icon"> | `elliptical` | elliptical |
| <img src="docs/activity-icons/garmin-activity-fitness-equipment.svg" width="24" alt="Boxing icon"> | `boxing` | boxing |
| <img src="docs/activity-icons/garmin-activity-fitness-equipment.svg" width="24" alt="Martial arts icon"> | `martial_arts` | karate, judo, taekwondo, kickboxing |
| <img src="docs/activity-icons/garmin-activities.svg" width="24" alt="Gymnastics icon"> | `gymnastics` | gymnastics |
| <img src="docs/activity-icons/garmin-activities.svg" width="24" alt="Dance icon"> | `dance` | dance |
| <img src="docs/activity-icons/garmin-activity-fitness-equipment.svg" width="24" alt="Jump rope icon"> | `jump_rope` | jump rope |
| <img src="docs/activity-icons/tabler-yoga.svg" width="24" alt="Yoga icon"> | `yoga` | yoga |
| <img src="docs/activity-icons/tabler-stretching.svg" width="24" alt="Pilates icon"> | `pilates` | pilates |
| <img src="docs/activity-icons/tabler-stretching.svg" width="24" alt="Mobility icon"> | `mobility` | mobility |
| <img src="docs/activity-icons/tabler-lungs.svg" width="24" alt="Breathwork icon"> | `breathwork` | breathwork, meditation |

## Snow, outdoor, and exploration

| Icon | Public type | Recognized type/name examples |
|---|---|---|
| <img src="docs/activity-icons/tabler-ski-jumping.svg" width="24" alt="Skiing icon"> | `skiing` | skiing, cross-country skiing |
| <img src="docs/activity-icons/tabler-snowboarding.svg" width="24" alt="Snowboarding icon"> | `snowboarding` | snowboarding |
| <img src="docs/activity-icons/tabler-snowflake.svg" width="24" alt="Snow sports icon"> | `snow_sports` | combined resort skiing/snowboarding |
| <img src="docs/activity-icons/garmin-activity-hiking.svg" width="24" alt="Snowshoeing icon"> | `snowshoeing` | snowshoeing |
| <img src="docs/activity-icons/dog-sledding.svg" width="24" alt="Dog sledding icon"> | `dog_sledding` | dog sledding, dog sleigh, husky sledding |
| <img src="docs/activity-icons/reindeer-sledding.svg" width="24" alt="Reindeer sledding icon"> | `reindeer_sledding` | reindeer sledding, reindeer sleigh ride |
| <img src="docs/activity-icons/sledding.svg" width="24" alt="Sledding icon"> | `sledding` | sledding, sleigh ride, tobogganing |
| <img src="docs/activity-icons/tabler-tent.svg" width="24" alt="Camping icon"> | `camping` | camping, kamp |
| <img src="docs/activity-icons/garmin-activity-hiking.svg" width="24" alt="Geocaching icon"> | `geocaching` | geocaching |
| <img src="docs/activity-icons/tabler-fish.svg" width="24" alt="Fishing icon"> | `fishing` | fishing, angling |
| <img src="docs/activity-icons/garmin-activity-hiking.svg" width="24" alt="Hunting icon"> | `hunting` | hunting |
| <img src="docs/activity-icons/garmin-activity-climbing.svg" width="24" alt="Climbing icon"> | `climbing` | climbing |
| <img src="docs/activity-icons/garmin-activity-climbing.svg" width="24" alt="Bouldering icon"> | `bouldering` | bouldering |
| <img src="docs/activity-icons/garmin-activity-climbing.svg" width="24" alt="Via ferrata icon"> | `via_ferrata` | via ferrata |
| <img src="docs/activity-icons/tabler-horse.svg" width="24" alt="Equestrian icon"> | `equestrian` | horse, equestrian |
| <img src="docs/activity-icons/tabler-horse.svg" width="24" alt="Horseback riding icon"> | `horseback_riding` | horseback riding |
| <img src="docs/activity-icons/camel.svg" width="24" alt="Camel riding icon"> | `camel_riding` | camel riding, camel trek, camel safari, dromedary, deve binme; also recognized from an Equestrian/Horseback Riding activity name |
| <img src="docs/activity-icons/tabler-ice-skating.svg" width="24" alt="Skating icon"> | `skating` | skating, ice skating, inline skating |

## Games and team sports

| Icon | Public type | Recognized type/name examples |
|---|---|---|
| <img src="docs/activity-icons/garmin-activity-golf.svg" width="24" alt="Golf icon"> | `golf` | golf |
| <img src="docs/activity-icons/garmin-activity-golf.svg" width="24" alt="Disc golf icon"> | `disc_golf` | disc golf, frisbee golf |
| <img src="docs/activity-icons/garmin-activity-other.svg" width="24" alt="Archery icon"> | `archery` | archery, okçuluk |
| <img src="docs/activity-icons/garmin-activity-other.svg" width="24" alt="Bowling icon"> | `bowling` | bowling |
| <img src="docs/activity-icons/tabler-ball-tennis.svg" width="24" alt="Racket sports icon"> | `racket` | generic racket/racquet sport |
| <img src="docs/activity-icons/tabler-ball-tennis.svg" width="24" alt="Tennis icon"> | `tennis` | tennis |
| <img src="docs/activity-icons/tabler-ping-pong.svg" width="24" alt="Table tennis icon"> | `table_tennis` | table tennis |
| <img src="docs/activity-icons/tabler-ball-tennis.svg" width="24" alt="Badminton icon"> | `badminton` | badminton |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Squash icon"> | `squash` | squash |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Pickleball icon"> | `pickleball` | pickleball |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Padel icon"> | `padel` | padel |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Team sports icon"> | `team_sport` | generic team sport |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Soccer icon"> | `soccer` | soccer, football |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="American football icon"> | `american_football` | American football, gridiron |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Rugby icon"> | `rugby` | rugby |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Hockey icon"> | `hockey` | hockey |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Cricket icon"> | `cricket` | cricket |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Lacrosse icon"> | `lacrosse` | lacrosse |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Handball icon"> | `handball` | handball |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Baseball icon"> | `baseball` | baseball, softball |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Basketball icon"> | `basketball` | basketball |
| <img src="docs/activity-icons/garmin-activity-multisport-people.svg" width="24" alt="Volleyball icon"> | `volleyball` | volleyball |
| <img src="docs/activity-icons/garmin-activity-multisport.svg" width="24" alt="Multisport icon"> | `multisport` | multisport, triathlon |
| <img src="docs/activity-icons/garmin-activity-uncategorized.svg" width="24" alt="Other activity icon"> | `other` | unmatched generic activity |

Garmin extraction provenance is recorded in `docs/activity-icons/GARMIN-SOURCE.md`. Precise semantic replacements and most documented name-derived fallbacks come from Tabler Icons 3.46.0 and retain the included MIT license in `docs/activity-icons/LICENSE-TABLER.txt`. The Camel icon comes from Hugeicons Free under the MIT license in `docs/activity-icons/LICENSE-HUGEICONS.txt`.
