<script lang="ts">
  import language from "$lib/language";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h2>
  {language[
    `advancements.${data.statName.replace("minecraft:", "").replace("/", ".")}.title` as keyof typeof language
  ] || data.statName.replace("minecraft:", "")}
</h2>

<p>
  {language[
    `advancements.${data.statName.replace("minecraft:", "").replace("/", ".")}.description` as keyof typeof language
  ]}
</p>

{#each data.stats as player}
  <div
    class="player {(player.advancements[data.statName]?.done ?? false)
      ? ''
      : 'gray'}"
  >
    <img
      src="https://minotar.net/helm/{player.uuid}/16"
      alt={player.username}
    />
    <span>{player.username}</span>
    <span class="right"
      >{(player.advancements[data.statName]?.done ?? false)
        ? "Obtained"
        : "Not obtained"}</span
    >
  </div>
{/each}

<style>
  h2 {
    margin: 0;
    font-size: x-large;
  }

  p {
    margin-top: 8px;
    font-style: italic;
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

  div.player.gray * {
    opacity: 0.5;
  }

  .right {
    margin-left: auto;
  }
</style>
