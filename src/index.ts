import { readdir, readFile } from "fs/promises";

const stat: {
  name: [string, string];
  formatter: (n: number) => string;
} = {
  //   name: ["custom", "deaths"],
  //   formatter: (n: number) => `${n}`,
  // };
  name: ["custom", "play_time"],
  formatter: (n: number) => `${(n / 20 / 60 / 60).toFixed(2)} hrs`,
};

const uuids = (await readdir("./input")).map((filename) =>
  filename.substring(0, filename.length - 5)
);

const stats = await Promise.all(
  uuids.map(async (uuid) => {
    const response = await fetch(
      `https://playerdb.co/api/player/minecraft/${uuid}`
    );
    const json = await response.json();
    const username = json.data.player.username as string;

    const file = await readFile(`./input/${uuid}.json`, "utf-8");
    const data = JSON.parse(file).stats as Record<
      string,
      Record<string, number>
    >;

    return { uuid, username, data };
  })
);

console.log(
  stats
    .map((s) => {
      const number =
        s.data[`minecraft:${stat.name[0]}`][`minecraft:${stat.name[1]}`] ?? 0;
      return {
        value: number,
        message: `${s.username}: ${stat.formatter(number)}`,
      };
    })
    .toSorted((a, b) => b.value - a.value)
    .map((o) => o.message)
    .join("\n")
);
