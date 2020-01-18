<script>
  import List from "./List.svelte";
  import { storiesStore } from "./store.js";
  import { readStories } from "./stories.service.js";
  import { storiesQuery } from "./stories.query.js";

  export let name;

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
<main>
  <nav class="app">{name}</nav>
  <div class="lists">
    {#each $storiesQuery as column (column.id)}
      <List {...column} />
    {/each}
  </div>
</main>
