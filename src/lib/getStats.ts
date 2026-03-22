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

  const stats = await Promise.all(
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
      const stats = JSON.parse(statsFile).stats as Record<
        string,
        Record<string, number>
      >;

      const advancementsFile = await readFile(
        `${env.DIR}/advancements/${uuid}.json`,
        "utf-8",
      );
      const advancements = JSON.parse(advancementsFile) as Record<
        string,
        { done: boolean }
      >;

      return { uuid, username, stats, advancements };
    }),
  );

  cache = {
    updated: Date.now(),
    data: stats,
  };
  return stats;
}
