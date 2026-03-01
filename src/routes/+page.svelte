<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const stat = "minecraft:play_time";
  const format = formatTime;

  function formatTime(n: number) {
    return `${(n / 20 / 60 / 60).toFixed(2)} hrs`;
  }
</script>

<h1>Minecraft Stats</h1>

{#each data.stats.toSorted((a, b) => b.data["minecraft:custom"][stat] - a.data["minecraft:custom"][stat]) as player}
  <div class="player">
    <img
      src="https://minotar.net/helm/{player.uuid}/16"
      alt={player.username}
    />
    {player.username}
    <span class="right"
      >{format(player.data["minecraft:custom"][stat] ?? 0)}</span
    >
  </div>
{/each}

<style>
  h1 {
    margin-top: 0;
    font-size: xx-large;
  }

  div.player {
    margin: 0 -4px;
    padding: 4px;
    display: flex;
  }

  div.player:nth-child(odd) {
    background-color: #212121;
  }

  div.player img {
    margin-right: 4px;
    vertical-align: text-top;
    image-rendering: pixelated;
  }

  .right {
    margin-left: auto;
  }
</style>
