import getStats from "$lib/getStats";

export const load = async ({ params }) => {
  const stats = await getStats();
  return { stats };
};
