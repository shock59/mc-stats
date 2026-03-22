import getStats from "$lib/getStats.js";

export const load = async ({ params }) => {
  const stats = await getStats();

  const statName = `minecraft:${params.stat}`;

  console.log(statName);

  return {
    statName: statName,
    stats: stats.toSorted(
      (a, b) =>
        ((b.advancements[statName]?.done ?? false) ? 1 : 0) -
          ((a.advancements[statName]?.done ?? false) ? 1 : 0) ||
        (a.username.toLowerCase() < b.username.toLowerCase()
          ? -1
          : a.username.toLowerCase() > b.username.toLowerCase()
            ? 1
            : 0),
    ),
  };
};
