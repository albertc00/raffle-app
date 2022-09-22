<script>
  import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition';

  export let state = null;
</script>

<div in:fade out:fade>
  <div class="body">
    {#if state === 0}
      <slot name="loading" />
    {:else if state === 1}
      <slot name="body" />
    {:else}
      <h3>CROSS YOUR FINGERS 🤞</h3>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '../styles/app';
  h3 {
    color: #3a1d2f;
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    @include app.text('2xl');
  }
</style>
