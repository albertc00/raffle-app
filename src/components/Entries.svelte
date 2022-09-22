<script>
  import { entries } from '../store/store';
  import Entry from './Entry.svelte';
  import { parseISO, getWeek } from 'date-fns';
  import { onMount } from 'svelte';

  export let data = [];

  const group = {};
  $: data.forEach((winner) => {
    const { date } = winner;
    const d = parseISO(date);
    const week = getWeek(d);

    if (!group[week]) {
      group[week] = [];
    }

    const _week = group[week].filter(({ name }) => name !== winner.name);

    group[week] = [..._week, winner];
  });

  $: weeks = Object.entries(group).map(([_, val]) => val);
  $: weeks.sort((a, b) => {
    const d1 = parseISO(a.date);
    const d2 = parseISO(b.date);

    return d1 - d2;
  });

  function getNumberWithOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
</script>

<div class="entries">
  {#each weeks as week, i (i)}
    <div class="winners">
      <h2>{getNumberWithOrdinal(i + 1)} Week Winners</h2>
      <ul class="entry">
        {#each week as { name, branch } (name)}
          <Entry {name} {branch} />
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style lang="scss">
  @use '../styles/app';

  .entries {
    // padding: 1.5rem 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    .winners {
      padding: 1rem 0;
      text-align: center;
      .entry {
        margin: 0;
      }

      h2 {
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        @include app.text('xl');
      }
    }

    ul {
      padding: 0;
      text-align: left;
    }
  }
</style>
