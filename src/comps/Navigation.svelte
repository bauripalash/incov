<script>
  import "bulma/css/bulma.css";
  import Icon from "svelte-awesome";
  import {
    faChartPie,
    faMapMarkedAlt,
    faSearchPlus,
    faChartLine,
    faTable
  } from "@fortawesome/free-solid-svg-icons";
  import { link, push, pop, location } from "svelte-spa-router";
  $: BottomActive = str => {
    if ($location == str) {
      return "is-active";
    } else {
      return "";
    }
  };

  $: isHome = () => {
    // console.log($location);
    if ($location != "/info") {
      return "active";
    } else {
      return "";
    }
  };
  $: isInfo = () => {
    // console.log($location);
    if ($location == "/info") {
      return "active";
    } else {
      return "";
    }
  };
</script>

<style>
  header ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    /* border: 1px solid #e7e7e7; */
    background-color: #ffffff;
  }

  header li {
    float: left;
  }

  header li a {
    display: block;
    color: #666;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  header li a:hover:not(.active) {
    background-color: #ddd;
  }

  header li a.active {
    color: white;
    background-color: hsl(204, 86%, 53%);
  }
  nav a {
    text-decoration: none;
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
</style>

<header>
  <ul>
    <li>
      <a class={isHome()} on:click={() => push('/')}>Home</a>
    </li>
    <li>
      <a class={isInfo()} on:click={() => push('/info')}>Info</a>
    </li>
  </ul>
</header>

<nav class="navbar is-info is-fixed-bottom" style="z-index:99999 !important;">
  <div class="navbar-brand ">
    <a
      on:click={() => push('/')}
      class="navbar-item is-expanded is-tab {BottomActive('/')} is-block
      has-text-centered">
      <Icon data={faChartPie} />
      <p class="is-size-7">Stats</p>
    </a>
    <a
      on:click={() => push('/table')}
      class="navbar-item is-expanded is-tab {BottomActive('/table')} is-block
      has-text-centered">
      <Icon data={faTable} />
      <p class="is-size-7">Table</p>
    </a>
    <a
      on:click={() => push('/map')}
      class="navbar-item is-expanded is-tab {BottomActive('/map')} is-block
      has-text-centered">
      <Icon data={faMapMarkedAlt} />
      <p class="is-size-7">Map</p>
    </a>
    <a
      on:click={() => push('/chart')}
      class="navbar-item is-expanded is-tab {BottomActive('/chart')} is-block
      has-text-centered">
      <Icon data={faChartLine} />
      <p class="is-size-7">Chart</p>
    </a>

  </div>
</nav>
