<script>
  import "bulma/css/bulma.css";

  import Navigation from "./comps/Navigation.svelte";
  // import Stats from "./comps/pages/Stats.svelte";
  // import Maps from "./comps/pages/Maps.svelte";
  // import Charts from "./comps/pages/Charts.svelte";
  // import Faq from "./comps/pages/Faq.svelte";
  import routes from "./routes";
  import Router from "svelte-spa-router";

  // import GAnalytics from "ganalytics";

  // const ga = new GAnalytics("UA-99631053-10", { aid: 1 });
  // ga.send("pageview");
</script>

<style>

</style>

<main class="">
  <Navigation />
  <Router {routes} />
</main>
