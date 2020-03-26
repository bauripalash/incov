<script>
  //   let u_url = "https://api.covid19india.org/data.json";
  import { onMount } from "svelte";
  let o_url_states =
    "https://raw.githubusercontent.com/bauripalash/ncov-19-india/master/data/report.json";
  let o_url_trend =
    "https://bauripalash.github.io/ncov-19-india/data/trend.json";
  // import SvelteTable from "svelte-table";
  import axios from "axios";

  var t_rows = [];
  var t_cols = [
    {
      key: "state",
      title: "State/UT"
    },
    {
      key: "effected",
      title: "Infected"
    },
    {
      key: "recovered",
      title: "Recovered"
    },
    {
      key: "death",
      title: "Deaths"
    }
  ];

  // function build_table(data) {
  //   console.log(data);
  // t_rows = data;
  // console.log(data);
  // }

  //   axios
  //     .get(o_url_states)
  //     .then(res => res.data)
  //     .then(res => {
  //       build_table(res.slice(0, res.length - 1));

  //     });
  onMount(async () => {
    var res = await axios.get(o_url_states).then(res => res.data);
    // t_rows = await res.slice(0 , res.length-1);
    t_rows = await Array.from(res.slice(0, res.length - 1));
    console.log(t_rows);
  });
  // fetch(o_url_states)
  //   .then(res => res.json())
  //   .then(res => (t_rows = res.slice(0, res.length - 1)));
  // console.log(t_rows);
</script>

<style>
  .notification {
    background-color: #ffff !important;
  }
</style>

<div class="table-main">
  <div class="container is-widescreen">
    <div class="notification" />
    <h3
      class="is-size-4-fullhd has-text-weight-bold has-text-centered
      is-uppercase has-text-link">
      State wise Report of India
    </h3>
    <div class="table-container">
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>State</th>
            <th>Infected</th>
            <th>Discharged</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {#each t_rows as s}
            <!-- <SvelteTable columns={t_cols} rows={t_rows} classNameTable="table" /> -->

            <tr>
              <td>{s.state}</td>
              <td>{s.effected}</td>
              <td>{s.recovered}</td>
              <td>{s.death}</td>
            </tr>
          {:else}
            <h2>Loading Table...</h2>
          {/each}
        </tbody>
      </table>
    </div>
    <div />
  </div>
</div>

<br />
<br />
