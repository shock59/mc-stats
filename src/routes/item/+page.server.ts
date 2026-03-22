import getStats from "$lib/getStats";
import language from "$lib/language";

const filter = [
  "minecraft:mined",
  "minecraft:broken",
  "minecraft:crafted",
  "minecraft:used",
  "minecraft:picked_up",
  "minecraft:dropped",
];

export const load = async ({ params }) => {
  const statData = await getStats();
  const stats = [
    ...new Set(
      statData
        .map((player) =>
          Object.keys(player.stats)
            .filter((key) => filter.includes(key))
            .map((key) => Object.keys(player.stats[key])),
        )
        .flat(2),
    ),
  ]
    .map((stat) => ({
      id: stat,
      name:
        language[`item.${stat.replace(":", ".")}` as keyof typeof language] ??
        language[`block.${stat.replace(":", ".")}` as keyof typeof language] ??
        stat.replace("minecraft:", ""),
    }))
    // .map((stat) => {
    //   const sortedRanking = statData.toSorted(
    //     (a, b) =>
    //       (b.data["minecraft:custom"][stat] ?? 0) -
    //       (a.data["minecraft:custom"][stat] ?? 0),
    //   );
    //   const crownUuid =
    //     sortedRanking[0].data["minecraft:custom"][stat] ==
    //     sortedRanking[1].data["minecraft:custom"][stat]
    //       ? undefined
    //       : sortedRanking[0].uuid;

    //   return {
    //     id: stat,
    //     name: language[
    //       `stat.${stat.replace(":", ".")}` as keyof typeof language
    //     ],
    //     crownUuid,
    //   };
    // })
    .toSorted((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

  return { stats };
};
