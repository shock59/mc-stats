import { env } from "$env/dynamic/private";
import { readdir, readFile } from "node:fs/promises";

let cache: {
  updated: number;
  data: {
    uuid: string;
    username: string;
    stats: Record<string, Record<string, number>>;
    advancements: Record<string, { done: boolean }>;
  }[];
};

export default async function getStats() {
  if (cache && Date.now() - cache.updated < 30_000) {
    return cache.data;
  }

  const uuids = (await readdir(`${env.DIR}/stats`)).map((filename) =>
    filename.substring(0, filename.length - 5),
  );

  let stats = await Promise.all(
    uuids.map(async (uuid) => {
      const response = await fetch(
        `https://playerdb.co/api/player/minecraft/${uuid}`,
      );
      const json = await response.json();
      const username = json.data.player.username as string;

      const statsFile = await readFile(
        `${env.DIR}/stats/${uuid}.json`,
        "utf-8",
      );
      let stats = {
        ...(JSON.parse(statsFile).stats as Record<
          string,
          Record<string, number>
        >),
      };

      const advancementsFile = await readFile(
        `${env.DIR}/advancements/${uuid}.json`,
        "utf-8",
      );
      let advancements = JSON.parse(advancementsFile) as Record<
        string,
        { done: boolean }
      >;
      advancements = Object.keys(advancements)
        .filter(
          (advancement) =>
            !(
              advancement.startsWith("minecraft:recipes/") ||
              !advancement.startsWith("minecraft:") ||
              advancement.endsWith("/root") ||
              advancement == "DataVersion"
            ),
        )
        .reduce(
          (accumulator: Record<string, { done: boolean }>, advancement) => (
            (accumulator[advancement] = advancements[advancement]),
            accumulator
          ),
          {},
        );

      stats["minecraft:custom"]["minecraft:special_advancements"] =
        Object.values(advancements).filter(
          (advancement) => advancement.done,
        ).length;
      stats["minecraft:custom"]["minecraft:special_crowns"] = 0;

      return { uuid, username, stats, advancements };
    }),
  );

  for (const stat of [
    ...new Set(
      stats.flatMap((player) => Object.keys(player.stats["minecraft:custom"])),
    ),
  ]) {
    const sortedRanking = stats.toSorted(
      (a, b) =>
        (b.stats["minecraft:custom"][stat] ?? 0) -
        (a.stats["minecraft:custom"][stat] ?? 0),
    );
    if (
      sortedRanking[0].stats["minecraft:custom"][stat] ==
      sortedRanking[1].stats["minecraft:custom"][stat]
    )
      continue;

    sortedRanking[0].stats["minecraft:custom"]["minecraft:special_crowns"] += 1;
  }

  cache = {
    updated: Date.now(),
    data: stats,
  };
  return stats;
}
