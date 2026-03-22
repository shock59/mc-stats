<script lang="ts">
  import language from "$lib/language";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const types = [
    "minecraft:mined",
    "minecraft:broken",
    "minecraft:crafted",
    "minecraft:used",
    "minecraft:picked_up",
    "minecraft:dropped",
  ];

  function format(number: number) {
    return number >= 10_000 ? `${Math.floor(number / 1_000)}k` : `${number}`;
  }
</script>

<h2>
  {language[
    `item.${data.statName.replace(":", ".")}` as keyof typeof language
  ] ??
    language[
      `block.${data.statName.replace(":", ".")}` as keyof typeof language
    ] ??
    data.statName.replace("minecraft:", "")}
</h2>

<div class="player">
  <div></div>
  <div></div>

  {#each types as type}
    <span class="right"
      ><img
        src="/images/{type.replace('minecraft:', '')}.png"
        class="symbol"
        alt={type.replace("minecraft:", "").replace("_", " ")}
        title={type.replace("minecraft:", "").replace("_", " ")}
      /></span
    >
  {/each}
</div>
{#each data.stats as player}
  <div
    class="player {types
      .map((type) => player.stats[type]?.[data.statName] ?? 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue) == 0
      ? 'gray'
      : ''}"
  >
    <img
      class="head"
      src="https://minotar.net/helm/{player.uuid}/16"
      alt={player.username}
    />
    <span>{player.username}</span>
    {#each types as type}
      <span class="right"
        >{format(player.stats[type]?.[data.statName] ?? 0)}</span
      >
    {/each}
  </div>
{/each}

<style>
  h2 {
    margin-top: 0;
    font-size: x-large;
  }

  div.player {
    margin: 0 -8px;
    padding: 8px;
    display: flex;
  }

  div.player:nth-child(odd) {
    background-color: #212121;
  }

  .head {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: text-top;
    image-rendering: pixelated;
  }

  .symbol {
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
  }

  div.player.gray * {
    opacity: 0.5;
  }

  .right {
    width: 40px;
    margin-left: 8px;
    text-align: center;
  }

  .right:nth-child(3) {
    margin-left: auto;
  }
</style>
