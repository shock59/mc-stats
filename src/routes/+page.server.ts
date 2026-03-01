import getStats from "$lib/getStats";
import language from "$lib/language";

export const load = async ({ params }) => {
  const statData = await getStats();
  const stats = [
    ...new Set(
      statData.flatMap((player) =>
        Object.keys(player.data["minecraft:custom"]),
      ),
    ),
  ]
    .map((stat) => {
      const sortedRanking = statData.toSorted(
        (a, b) =>
          (b.data["minecraft:custom"][stat] ?? 0) -
          (a.data["minecraft:custom"][stat] ?? 0),
      );
      const crownUuid =
        sortedRanking[0].data["minecraft:custom"][stat] ==
        sortedRanking[1].data["minecraft:custom"][stat]
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
