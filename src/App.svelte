<script>
  import "bulma/css/bulma.css";

  import Navigation from "./comps/Navigation.svelte";
  // import Stats from "./comps/pages/Stats.svelte";
  // import Maps from "./comps/pages/Maps.svelte";
  // import Charts from "./comps/pages/Charts.svelte";
  // import Faq from "./comps/pages/Faq.svelte";
  import routes from './routes'
  import Router from 'svelte-spa-router'
</script>

<style>

</style>

<main class="">
  <Navigation />
  <Router {routes}/>
</main>
