import getStats from "$lib/getStats";
import language from "$lib/language";

export const load = async ({ params }) => {
  const statData = await getStats();
  const stats = [
    ...new Set(
      statData.flatMap((player) =>
        Object.keys(player.stats["minecraft:custom"]),
      ),
    ),
  ]
    .map((stat) => {
      const sortedRanking = statData.toSorted(
        (a, b) =>
          (b.stats["minecraft:custom"][stat] ?? 0) -
          (a.stats["minecraft:custom"][stat] ?? 0),
      );
      const crownUuid =
        sortedRanking[0].stats["minecraft:custom"][stat] ==
        sortedRanking[1].stats["minecraft:custom"][stat]
          ? undefined
          : sortedRanking[0].uuid;

      return {
        id: stat,
        name: language[
          `stat.${stat.replace(":", ".")}` as keyof typeof language
        ],
        crownUuid,
      };
    })
    .toSorted((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  return { stats };
};
