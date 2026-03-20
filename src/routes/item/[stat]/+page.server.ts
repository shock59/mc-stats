import getStats from "$lib/getStats.js";

const types = [
  "minecraft:mined",
  "minecraft:broken",
  "minecraft:crafted",
  "minecraft:used",
  "minecraft:picked_up",
  "minecraft:dropped",
];

export const load = async ({ params }) => {
  const stats = await getStats();

  const statName = `minecraft:${params.stat}`;
  return {
    statName,
    stats: stats.toSorted(
      (a, b) =>
        types
          .map((type) => b.data[type]?.[statName] ?? 0)
          .reduce((accumulator, currentValue) => accumulator + currentValue) -
          types
            .map((type) => a.data[type]?.[statName] ?? 0)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
            ) ||
        (a.username.toLowerCase() < b.username.toLowerCase()
          ? -1
          : a.username.toLowerCase() > b.username.toLowerCase()
            ? 1
            : 0),
    ),
  };
};
