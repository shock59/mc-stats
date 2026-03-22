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
      overflow-x: hidden;
    }
  </style>
</svelte:head>

<div id="container">
  <nav>
    <a href="/custom">General</a>
    <a href="/item">Items</a>
    <a href="/mob">Mobs</a>
    <a href="/advancement">Advancements</a>
  </nav>

  <main>
    {@render children()}
  </main>

  <footer>
    <span
      >Made by <a href="https://samv.me/" target="_blank">Shock59</a> for
      <a href="https://rayne.page/" target="_blank">Rayne</a></span
    >
  </footer>
</div>

<style>
  #container {
    max-width: 500px;
    min-height: calc(100vh - 32px);
    margin: 0 auto;
    padding: 16px 22px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    color: #d0d0d0;
    background: #1a1a1a;
    font-family: "Minecraft Seven", sans-serif;
    font-size: 16px;
  }

  nav {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
  }

  nav a {
    margin: 0 16px;
    text-decoration: none;
    color: inherit;
  }

  footer {
    margin-top: 16px;
    padding-top: auto;
    text-align: center;
    font-size: 14px;
  }

  footer span {
    opacity: 0.5;
    transition: 200ms opacity;
  }

  footer span:hover {
    opacity: inherit;
  }

  footer a {
    text-decoration: none;
    color: inherit;
    transition: 200ms color;
  }

  footer span:hover a {
    color: #5398ff;
  }

  nav a:hover,
  footer a:hover {
    text-decoration: underline;
  }
</style>
