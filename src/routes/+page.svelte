<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h1>Minecraft Stats</h1>

<pre>{data.text}</pre>

<style>
  h1 {
    margin-top: 0;
    font-size: xx-large;
  }
</style>
