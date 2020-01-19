<script>
  import Modal from "./Modal.svelte";
  import { storyStore } from "./services/stores";

  export let id = -1;
  export let text = "";
  let showModal = false;

  storyStore.subscribe(storyId => {
    if (storyId === undefined) {
      showModal = false;
    }

    if (storyId == id.toString()) {
      showModal = true;
    }
  });

  function onDragStart(e) {
    e.dataTransfer.setData(
      "application/sveltz",
      JSON.stringify({
        id: id
      })
    );

    console.log(`Dragging ${id}`);
  }

  function onShowModal() {
    window.location.hash = `#story/${id}`;
  }

  function onHideModal() {
    window.location.hash = `#story`;
  }
</script>

<style>
  div {
    border-radius: 2px;
    padding: 3px;
    font-size: 10px;
    display: inline-block;
  }

  li {
    background-color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    color: #222;

    text-indent: 0;
    list-style-type: none;
    display: block;
  }

  .modal {
    margin: 20px;
    font-size: 1em;
  }

  .id {
    background-color: #666;
    color: rgb(255, 255, 255);
    border-radius: 5px;
  }

  button {
    background-color: #444;
    color: white;
    border-radius: 5px;
    font-size: 10px;
  }
</style>

<li on:dragstart={onDragStart} draggable="true">
  <div class="id">{id}</div>
  <div class="text">{text}</div>
  <button on:click={onShowModal}>Show</button>
  {#if showModal}
    <Modal on:close={onHideModal}>
      <div class="modal">You are now looking at "{text} ({id})"</div>
    </Modal>
  {/if}
</li>
