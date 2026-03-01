<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import Fuse from "fuse.js";

  let { data }: PageProps = $props();

  let query: string = $state("");
  let searchedStats: {
    id: string;
    name: string;
    crownUuid: string | undefined;
  }[] = $state([]);

  onMount(async () => {
    search();
  });

  function search() {
    if (query.trim() == "") {
      searchedStats = [...data.stats];
      return;
    }

    const fuse = new Fuse(data.stats, {
      threshold: 0.3,
      keys: ["name"],
    });

    searchedStats = fuse.search(query.trim()).map((result) => result.item);
  }
</script>

<input placeholder="Search statistics" bind:value={query} oninput={search} />

<br />
<br />

{#each searchedStats as stat}
  <a href="/{stat.id.replace('minecraft:', '')}">
    <div class="stat">
      {#if stat.crownUuid}
        <img
          src="https://minotar.net/helm/{stat.crownUuid}/16"
          alt={stat.crownUuid}
          class="head"
        />
      {:else}
        <div class="head"></div>
      {/if}
      {stat.name}
    </div></a
  >{/each}

<style>
  input {
    width: 100%;
    margin: 0 -8px;
    padding: 8px;
    color: inherit;
    background: #212121;
    font: inherit;
    border: none;
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  div.stat {
    margin: 0 -8px;
    padding: 8px;
    display: flex;
  }

  .head {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: text-top;
    image-rendering: pixelated;
  }

  a:not(.hidden):nth-child(odd) div.stat {
    background-color: #212121;
  }
</style>
