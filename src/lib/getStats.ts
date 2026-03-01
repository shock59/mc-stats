import { env } from "$env/dynamic/private";
import { readdir, readFile } from "node:fs/promises";

export default async function getStats() {
  const uuids = (await readdir(env.STATS_DIR)).map((filename) =>
    filename.substring(0, filename.length - 5),
  );

  const stats = await Promise.all(
    uuids.map(async (uuid) => {
      const response = await fetch(
        `https://playerdb.co/api/player/minecraft/${uuid}`,
      );
      const json = await response.json();
      const username = json.data.player.username as string;

      const file = await readFile(`./input/${uuid}.json`, "utf-8");
      const data = JSON.parse(file).stats as Record<
        string,
        Record<string, number>
      >;

      return { uuid, username, data };
    }),
  );

  return stats;
}
