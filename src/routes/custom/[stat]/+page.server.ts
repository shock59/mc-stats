import getStats from "$lib/getStats.js";

const timeStats = [
  "minecraft:sneak_time",
  "minecraft:play_time",
  "minecraft:time_since_death",
  "minecraft:time_since_rest",
  "minecraft:total_world_time",
];
const healthStats = [
  "minecraft:damage_absorbed",
  "minecraft:damage_blocked_by_shield",
  "minecraft:damage_dealt",
  "minecraft:damage_dealt_absorbed",
  "minecraft:damage_dealt_resisted",
  "minecraft:damage_resisted",
  "minecraft:damage_taken",
];
const distanceStats = [
  "minecraft:climb_one_cm",
  "minecraft:crouch_one_cm",
  "minecraft:fall_one_cm",
  "minecraft:fly_one_cm",
  "minecraft:sprint_one_cm",
  "minecraft:swim_one_cm",
  "minecraft:walk_one_cm",
  "minecraft:walk_on_water_one_cm",
  "minecraft:walk_under_water_one_cm",
  "minecraft:boat_one_cm",
  "minecraft:aviate_one_cm",
  "minecraft:happy_ghast_one_cm",
  "minecraft:horse_one_cm",
  "minecraft:minecart_one_cm",
  "minecraft:nautilus_one_cm",
  "minecraft:pig_one_cm",
  "minecraft:strider_one_cm",
];

export const load = async ({ params }) => {
  const stats = await getStats();

  const statName = `minecraft:${params.stat}`;
  return {
    statName: statName,
    stats: stats.toSorted(
      (a, b) =>
        (b.stats["minecraft:custom"][statName] ?? 0) -
          (a.stats["minecraft:custom"][statName] ?? 0) ||
        (a.username.toLowerCase() < b.username.toLowerCase()
          ? -1
          : a.username.toLowerCase() > b.username.toLowerCase()
            ? 1
            : 0),
    ),
    type: timeStats.includes(statName)
      ? "time"
      : healthStats.includes(statName)
        ? "health"
        : distanceStats.includes(statName)
          ? "distance"
          : "number",
  };
};
