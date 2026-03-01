<script lang="ts">
  import language from "$lib/language";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import Fuse from "fuse.js";

  let { data }: PageProps = $props();

  let query: string = $state("");
  let stats: { id: string; name: string }[] = $state([]);
  let searchedStats: { id: string; name: string }[] = $state([]);

  onMount(async () => {
    stats = [
      ...new Set(
        data.stats.flatMap((player) =>
          Object.keys(player.data["minecraft:custom"]),
        ),
      ),
    ]
      .map((stat) => ({
        id: stat,
        name: language[
          `stat.${stat.replace(":", ".")}` as keyof typeof language
        ],
      }))
      .toSorted((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    search();
  });

  function search() {
    if (query.trim() == "") {
      searchedStats = [...stats];
      return;
    }

    const fuse = new Fuse(stats, {
      threshold: 0.3,

      keys: ["name"],
    });

    console.log(fuse);

    searchedStats = fuse.search(query.trim()).map((result) => result.item);
  }
</script>

<input placeholder="Search statistics" bind:value={query} oninput={search} />

<br />
<br />

{#each searchedStats as stat}
  <a href="/{stat.id.replace('minecraft:', '')}">
    <div class="stat">
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

  a:not(.hidden):nth-child(odd) div.stat {
    background-color: #212121;
  }
</style>
