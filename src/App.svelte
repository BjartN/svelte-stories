<script>
  import List from "./List.svelte";
  import { readStories } from "./stories.service.js";
  import { storiesQuery } from "./stories.query.js";
  import { Router } from "./router.js";
  import { storyStore } from "./stores";

  export let name;
  let page;

  let r = new Router();
  r.get("/", () => {
    page = "root";
  });
  r.get("/story", () => {
    page = "story";
    storyStore.set(undefined);
  });
  r.get("/story/{storyId}", p => {
    page = "story";
    storyStore.set(p.storyId);
  });
  r.get("/project", () => {
    page = "project";
  });

  r.init();

  readStories();
</script>

<style>
  .app {
    margin: 0px;
    padding: 0px;
  }

  main {
    font-size: 14px;

    height: 98vh;
    display: grid;
    grid-template-rows: 40px 1fr;

    /* design */
    color: white;
    background-color: #555;
  }

  .app {
    color: #eb5f25;
    padding: 4px 10px;
    background-color: #333;
    font-size: 1.5em;
  }

  .lists {
    display: flex;
    flex: 0 0 auto;

    max-height: 94vh;
  }
</style>

<svelte:options immutable />
<svelte:window on:hashchange={e => r.onRouteChanged(e)} />
<main>
  <nav class="app">{name}</nav>
  {#if page == 'root' || page == 'story'}
    <div class="lists">
      {#each $storiesQuery as column (column.id)}
        <List {...column} />
      {/each}
    </div>
  {:else if page == 'project'}
    <p>Project</p>
  {/if}
</main>
