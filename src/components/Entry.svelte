<script>
  import { fade, slide } from 'svelte/transition';

  export let name;
  export let branch;
</script>

<li transition:fade={{ delay: 250, duration: 500 }} class="entry">
  <span class="branch">{branch}</span>
  <span class="name">{name}</span>
</li>

<style lang="scss">
  @use '../styles/app';

  .entry {
    // all: unset;
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 0.75rem;
    align-items: center;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    @include app.text('lg');
    padding: 0.75rem 0 0 3rem;

    .branch {
      // display: flex;
      // align-items: center;
      text-align: center;
      color: #28272e;
      background-color: #fff;
      border-radius: 50px;
      padding: 0.175rem 1rem;
      text-transform: uppercase;
    }
  }
</style>
