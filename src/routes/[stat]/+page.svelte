<script lang="ts">
  import language from "$lib/language";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let format = $state((n: number) => n.toString());

  onMount(() => {
    if (data.type == "time") format = formatTime;
    if (data.type == "health") format = formatHealth;
    if (data.type == "distance") format = formatDistance;
  });

  function formatTime(n: number) {
    return n >= 1_728_000
      ? `${(n / 20 / 60 / 60 / 24).toFixed(2)} days`
      : `${(n / 20 / 60 / 60).toFixed(2)} hours`;
  }

  function formatHealth(n: number) {
    return n >= 20_000
      ? `${(n / 10 / 2 / 1000).toFixed(1)}k hearts`
      : `${(n / 10 / 2).toFixed(1)} hearts`;
  }

  function formatDistance(n: number) {
    return n >= 100_000
      ? `${(n / 100_000).toFixed(1)} km`
      : `${(n / 100).toFixed(1)} meters`;
  }
</script>

<h1>Minecraft Stats</h1>

<h2>
  {language[`stat.${data.statName.replace(":", ".")}` as keyof typeof language]}
</h2>

{#each data.stats as player}
  <div class="player">
    <img
      src="https://minotar.net/helm/{player.uuid}/16"
      alt={player.username}
    />
    {player.username}
    <span class="right"
      >{format(player.data["minecraft:custom"][data.statName] ?? 0)}</span
    >
  </div>
{/each}

<style>
  h1 {
    margin-top: 0;
    font-size: xx-large;
  }

  div.player {
    margin: 0 -8px;
    padding: 8px;
    display: flex;
  }

  div.player:nth-child(odd) {
    background-color: #212121;
  }

  div.player img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: text-top;
    image-rendering: pixelated;
  }

  .right {
    margin-left: auto;
  }
</style>
