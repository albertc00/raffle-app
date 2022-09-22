<script>
  import { tick } from 'svelte';
  import { entries } from '../store/store.js';
  import Entries from './Entries.svelte';
  import { formatISO } from 'date-fns';

  $: winners = $entries.filter(({ date }) => date);

  let winner = '';

  let branches = [
    { id: 'ilo', name: 'Iloilo' },
    { id: 'dvo', name: 'Davao' },
    { id: 'iao', name: 'Siargao' },
  ];

  let branch = 'ilo';
  let entry = [];

  $: entry = $entries.filter(
    ({ branch: _branch, ticket }) => ticket && _branch === branch
  );

  function draw() {
    state = 'choosing';

    setTimeout(() => {
      winner = pick(entry);
      const _winner = { ...winner, ticket: 0, date: formatISO(new Date()) };

      const _e = $entries.filter(({ name }) => name !== _winner.name);
      $entries = [..._e, _winner];

      state = 'chosen';
    }, 2000);
  }

  function pick(arr) {
    let tickets = [];

    arr.forEach((item) => {
      const entries = new Array(item.ticket).fill(item);
      tickets.push(...entries);
    });

    for (let i = tickets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tickets[i], tickets[j]] = [tickets[i], tickets[j]];
    }

    return tickets[Math.floor(Math.random() * tickets.length)];
  }

  const names = [
    'Im Nayeon',
    'Yoo Jeongyeon',
    'Hirai Momo',
    'Minatozaki Sana',
    'Park Jihyo',
    'Myoui Mina',
    'Kim Dahyun',
    'Son Chaeyoung',
    'Chou Tzuyu',
  ];

  let timer;
  let choosing = names[0];
  let confetti = false;
  let state = 'ready';

  $: if (state === 'choosing') {
    timer = setInterval(async () => {
      await tick();
      choosing = names[Math.floor(Math.random() * names.length)];
    }, 70);
  } else if (state === 'chosen') {
    clearInterval(timer);
    confetti = true;

    setTimeout(() => {
      branches = branches.filter(({ id }) => id !== winner.branch);
      if (branches.length) {
        branch = branches[0].id;
      } else {
        branches = [{ id: 'none', name: 'None' }];
        branch = 'none';
      }

      confetti = false;
      state = 'ready';
    }, 5000);
  }
</script>

<div class="raffle-container">
  <div class="raffle top">
    <h1>Follow the Box</h1>
    <p class="tagline">Follow us, and BOX the CASH</p>

    <div class="control">
      <select
        class="branch"
        bind:value={branch}
        disabled={state !== 'ready' || winners.length === 3}
      >
        {#each branches as { id, name } (id)}
          <option value={id}>
            {name}
          </option>
        {/each}
      </select>
    </div>

    <div class="control">
      <button
        on:click={() => draw()}
        disabled={state !== 'ready' || winners.length === 3}>Draw Winner</button
      >
    </div>

    <div class="winner">
      <div class="winner-inner">
        {#if state === 'ready'}
          {#if branch !== 'none'}
            <div class="winner-text">
              Cross your fingers {branches.find(({ id }) => branch === id).name}
              🤞
            </div>
          {:else}
            <div class="winner-text">Congratulations to all winners! 🎉🎉</div>
          {/if}
        {:else if state === 'choosing'}
          <div class="winner-text">
            {choosing}
          </div>
        {:else if state === 'chosen'}
          <div class="winner-text">
            {winner.name}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="raffle bottom">
    <h2>Weekly Winners</h2>
    <Entries data={winners} />
  </div>

  {#if confetti}
    <div class="confetti">
      <lottie-player
        class="image"
        src="https://assets10.lottiefiles.com/packages/lf20_rovf9gzu.json"
        background="transparent"
        speed="1"
        style="width: 1000px; height: 800px;"
        loop
        autoplay
      />
    </div>
  {/if}
  <div class="ig-logo">
    <lottie-player
      class="image"
      src="https://assets5.lottiefiles.com/packages/lf20_miwpcyh5.json"
      background="transparent"
      speed="1"
      style="width: 250px; height: 150px;"
      loop
      autoplay
    />
  </div>
</div>

<style lang="scss">
  @use '../styles/app';
  .raffle-container {
    position: relative;

    .confetti {
      position: absolute;
      height: 30px;
      top: 10%;
      left: 50%;
      transform: translate(-50%, 10%);
      z-index: 9;
      pointer-events: none;
    }

    .ig-logo {
      position: absolute;
      height: 30px;
      top: -1%;
      left: 4%;
      transform: translate(-50%, 10%);
      z-index: 9;
      pointer-events: none;
    }
  }

  .raffle {
    &.top {
      height: 45vh;
      position: relative;

      background: linear-gradient(
        45deg,
        #405de6,
        #5851db,
        #833ab4,
        #c13584,
        #e1306c,
        #fd1d1d
      );

      img {
        z-index: -1;
        position: absolute;
        min-width: 100%;
        height: 200%;
      }

      .callbox {
        font-weight: bold;
        color: #fff;
        padding-top: 2.5rem;
      }

      .tagline {
        color: #fff;
        // color: #28272e;
        text-align: center;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        @include app.text('lg');
      }

      .control {
        .branch {
          all: unset;
          color: #fff;
          text-transform: uppercase;
          padding: 0 5px;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          @include app.text('base');
          text-align: center;
          border-bottom: 1px solid #fff;

          option {
            color: #222;
          }

          &:disabled {
            cursor: not-allowed;
            color: rgb(255, 255, 255, 0.5);
          }
        }

        display: flex;
        justify-content: center;
        padding: 1.5rem 0;

        button {
          font-family: 'Poppins', sans-serif;
          color: #262626;
          background-color: #fff;
          cursor: pointer;
          padding: 1.125rem 2.75rem;
          border-radius: 9999px;
          border: 0;
          display: block;
          text-align: center;
          font-weight: 500;
          @include app.text('lg');

          &:disabled {
            cursor: not-allowed;
            color: rgb(38, 38, 38, 0.5);
          }
        }
      }

      .winner {
        position: absolute;
        min-width: 40%;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;

        .winner-inner {
          padding: 1.5rem 5rem;
          border-radius: 9999px;
          border: 0;
          display: block;
          background-color: #fff;
          text-align: center;
          height: 2rem;
        }
      }
    }

    &.bottom {
      height: 55vh;
      background-color: #232228;

      .participants {
        padding-top: 5rem;
      }
    }

    h1,
    h2 {
      padding: 3rem 0 0;
      margin: 0;
      text-align: center;
      color: #ffff;
      margin: 0;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      @include app.text('4xl');
    }

    h1 {
      @include app.text('5xl');
    }

    h2 {
      padding-top: 6rem;
    }

    .winner-text {
      color: #3a1d2f;
      margin: 0;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      @include app.text('2xl');
    }
  }
</style>
