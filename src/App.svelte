<script>
  import List from "./List.svelte";
  import { readStories } from "./stories.service.js";
  import { storiesQuery } from "./stories.query.js";
  import { Router } from "./router.js";
  import { pageStore } from "./stores";
  import { storyStore } from "./stores";

  export let name;

  let r = new Router();
  r.get("/", () => {
    console.log("Matched route main");
    pageStore.set("main");
  });
  r.get("/story", () => {
    console.log("Matched route story");
    pageStore.set("story");
    storyStore.set(undefined);
  });
  r.get("/story/{storyId}", p => {
    console.log(`Matched route story ${p.storyId}`);
    pageStore.set("story");
    storyStore.set(p.storyId);
  });
  r.get("/project", () => {
    console.log("Matched route story");
    pageStore.set("project");
  });

  let page_value;
  const unsubscribe = pageStore.subscribe(value => {
    page_value = value;
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

{#if page_value == 'main' || page_value == 'story'}
  <main>
    <nav class="app">{name}</nav>
    <div class="lists">
      {#each $storiesQuery as column (column.id)}
        <List {...column} />
      {/each}
    </div>
  </main>
{:else if page_value == 'project'}
  <p>Project</p>
{/if}
