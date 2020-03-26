import { wrap } from "svelte-spa-router";
import Stats from "./comps/pages/Stats.svelte";
import Maps from "./comps/pages/Maps.svelte";
import Charts from "./comps/pages/Charts.svelte";
import Table from "./comps/pages/Table.svelte";
import Info from "./comps/pages/Info.svelte";
import Notfound from './comps/pages/Notfound.svelte';

const routes = {
  // Exact path
  "/": Stats,

  // Using named parameters, with last being optional
  "/map": Maps,

  // Wildcard parameter
  "/chart": Charts,

  // Catch-all
  // This is optional, but if present it must be the last
  "/table": Table,

  "/info": Info,

  "*" : Notfound
};

export default routes;
