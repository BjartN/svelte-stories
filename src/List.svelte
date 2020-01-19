<script>
  import Task from "./Task.svelte";
  import { moveStore } from "./services/stores";
  export let id = -1;
  export let color = "green";
  export let title = "Default";
  export let tasks = [];

  let dragOver = false;

  function onDrop(e) {
    e.preventDefault();
    dragOver = false;

    let d = JSON.parse(e.dataTransfer.getData("application/sveltz"));

    //console.log(`Dropped on ${id}. Story is ${d.storyId}`);

    $moveStore = { storyId: d.storyId, columnId: id };
  }

  function onDragOver(e) {
    e.preventDefault();

    if (!dragOver) dragOver = true;
    //console.log(`Dragged over ${id}`);
  }

  function onDragLeave(e) {
    e.preventDefault();
    dragOver = false;
    //console.log(`Dragged exit ${id}`);
  }
</script>

<style>
  .list {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 200px;
    padding: 0;
    margin: 20px;
    background-color: #ccc;
  }

  .highlight {
    background-color: #999;
  }

  header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    color: #333;
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
  }

  ul {
    padding: 0;
    margin: 0;
    text-indent: 0;

    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: calc(100% - 100px);
  }

  ul::-webkit-scrollbar {
    width: 4px;
  }

  ul::-webkit-scrollbar-track {
    background: #444;
  }

  ul::-webkit-scrollbar-thumb {
    background: #666;
  }

  footer {
    color: #555;
    padding: 10px;
  }
</style>

<div
  class:highlight={dragOver}
  class="list"
  on:dragenter={e => {
    e.stopPropagation();
    e.preventDefault();
  }}
  on:drop={onDrop}
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}>

  <header style="background-color:{color}; height:40px;">{title}</header>
  <ul>
    {#each tasks as task (task.id)}
      <Task {...task} />
    {/each}
  </ul>
  <footer>Add a story...</footer>
</div>
