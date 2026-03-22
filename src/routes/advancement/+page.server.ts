import getStats from "$lib/getStats";
import language from "$lib/language";

export const load = async ({ params }) => {
  const statData = await getStats();
  const stats = [
    ...new Set(statData.flatMap((player) => Object.keys(player.advancements))),
  ]
    .map((stat) => {
      return {
        id: stat,
        name:
          language[
            `advancements.${stat.replace("minecraft:", "").replace("/", ".")}.title` as keyof typeof language
          ] || stat,
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
