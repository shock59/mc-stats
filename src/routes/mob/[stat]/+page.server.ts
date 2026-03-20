import getStats from "$lib/getStats.js";

export const load = async ({ params }) => {
  const stats = await getStats();

  const statName = `minecraft:${params.stat}`;
  return {
    statName,
    stats: stats.toSorted(
      (a, b) =>
        (b.data["minecraft:killed"]?.[statName] ?? 0) -
          (a.data["minecraft:killed"]?.[statName] ?? 0) ||
        (b.data["minecraft:killed_by"]?.[statName] ?? 0) -
          (a.data["minecraft:killed_by"]?.[statName] ?? 0) ||
        (a.username.toLowerCase() < b.username.toLowerCase()
          ? -1
          : a.username.toLowerCase() > b.username.toLowerCase()
            ? 1
            : 0),
    ),
  };
};
