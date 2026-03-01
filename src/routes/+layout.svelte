<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>Minecraft Stats</title>

  <style>
    @font-face {
      font-family: "Minecraft Seven";
      src: url("https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/fonts/Minecraft-Seven_v2.woff2")
        format("woff2");
    }

    body {
      width: 100vw;
      min-height: 100vh;
      margin: 0;
      background: #121212;
    }

    main {
      max-width: 500px;
      min-height: calc(100vh - 32px);
      margin: 0 auto;
      padding: 16px 22px;
      color: #d0d0d0;
      background: #1a1a1a;
      font-family: "Minecraft Seven", sans-serif;
      font-size: 16px;
    }
  </style>
</svelte:head>

<main>
  {@render children()}
</main>
