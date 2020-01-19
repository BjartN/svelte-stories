<script>
  import Modal from "./Modal.svelte";
  import { storyStore } from "./services/stores";

  export let id = -1;
  export let text = "";
  export let createdBy = undefined;
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
        storyId: id
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
  li {
    background-color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
    color: #222;

    text-indent: 0;
    list-style-type: none;
    font-size: 10px;
    display: block;
  }

  div {
    border-radius: 2px;
    padding: 3px;
    font-size: 10px;
    display: inline-block;
  }

  .created-by {
    color: #bbb;
  }
  button {
    border-radius: 5px;
    margin: 0;
    height: 20px;
  }

  .modal {
    margin: 20px;
    font-size: 1em;
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }
</style>

<li on:dragstart={onDragStart} draggable="true">
  {text}
  <div class="footer">
    {#if createdBy}
      <div class="created-by">{id} {createdBy}</div>
    {:else}
      <div />
    {/if}
    <button on:click={onShowModal}>...</button>
  </div>
  {#if showModal}
    <Modal on:close={onHideModal}>
      <div class="modal">You are now looking at "{text} ({id})"</div>
    </Modal>
  {/if}
</li>
