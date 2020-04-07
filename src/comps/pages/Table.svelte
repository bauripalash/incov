<script>
  //   let u_url = "https://api.covid19india.org/data.json";
  import { onMount } from "svelte";
  let o_url_states =
    "https://raw.githubusercontent.com/bauripalash/ncov-19-india/master/data/report.json";
  let o_url_trend =
    "https://bauripalash.github.io/ncov-19-india/data/trend.json";

  let dist_json =
    "https://raw.githubusercontent.com/covid19india/api/master/state_district_wise.json";
  let data_json =
    "https://raw.githubusercontent.com/covid19india/api/master/data.json";
  // import SvelteTable from "svelte-table";
  import axios from "axios";

  var t_rows = Array();
  var sd = Array();

  onMount(async () => {
    var res = await axios.get(data_json).then(res => res.data);
    var des = await axios.get(dist_json).then(res => res.data);

    t_rows = await Array.from(
      res["statewise"].slice(1).filter(function(x) {
        if (parseInt(x["confirmed"]) > 0) {
          return true;
        } else {
          return false;
        }
      })
    );

    t_rows.sort((a, b) => b["confirmed"] - a["confirmed"]);

    // console.log(Object.keys(t_rows));
    t_rows.forEach(element => {
      // sd[element["state"]] =0;
      // console.log(`${element["statecode"]} : "${element["state"]}"`)
      if (Object.keys(des).indexOf(element["state"]) >= 0) {
        // element["district"] = des[element["state"]]["districtData"][element["state"]]
        element["district"] = des[element["state"]]["districtData"];
      }
    });

    // console.log(t_rows);
    // var tstates = document.querySelectorAll(".tstate");
    // tstates.length;
    // for (var i=0; i <= tstates.length; i++){
    //   console.log(i);
    //   // if (tstates[i].nextSibling.classlist.contains("tdist")){
    //   //   tstates[i].addEventListener("click", function(e){
    //   //     console.log(e);
    //   //   });
    //   // }
    // }
  });

  function showDist(state) {
    // console.log(state);
    var t = document.querySelectorAll("[data-state='" + state + "']");
    for (var i = 0; i < t.length; i++) {
      t[i].classList.toggle("tdist");
    }
  }
</script>

<style>
  .notification {
    background-color: #ffff !important;
  }
  .level1 td:first-child {
    padding-left: 25px !important;
  }
  .tdist {
    visibility: collapse;
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
    <h4 class="is-size-5-fullhd has-text-centered">
      (Click on State name to view Districts, if available)
    </h4>
    <div class="table-container">
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>State</th>
            <th>
              <abbr title="Infected">Infected</abbr>
            </th>
            <th>
              <abbr title="Recovered">Rec.</abbr>
            </th>
            <th>
              <abbr title="Deaths">Dth.</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each t_rows as s}
            <!-- <SvelteTable columns={t_cols} rows={t_rows} classNameTable="table" /> -->

            <tr on:click={showDist(s.state)} class="tstate">
              <td>{s.state}</td>
              <td>
                {s.confirmed}
                {#if s.deltaconfirmed > 0}
                  <br />
                  <small class="has-text-danger">[▲{s.deltaconfirmed}]</small>
                {/if}
              </td>
              <td>
                {s.recovered}
                {#if s.deltarecovered > 0}
                  <br />
                  <small class="has-text-success">[▲{s.deltarecovered}]</small>
                {/if}
              </td>
              <td>
                {s.deaths}
                {#if s.deltadeaths > 0}
                  <br />
                  <small class="has-text-danger">[▲{s.deltadeaths}]</small>
                {/if}
              </td>
            </tr>
            {#if s.district != undefined}
              {#each Object.keys(s.district) as dist}
                <tr style="" data-state={s.state} class="level1 tdist">
                  <td>➤ &nbsp; {dist}</td>
                  <td colspan="3">
                    {s.district[dist].confirmed}
                    {#if s.district[dist].delta.confirmed > 0}
                      <small class="has-text-danger">
                        [▲{s.district[dist].delta.confirmed}]
                      </small>
                    {/if}
                  </td>
                </tr>
              {/each}
            {/if}
          {:else}
            <h2>
              Loading Table... (Please
              <strong>Refresh</strong>
              If Not Loaded Yet)
            </h2>
          {/each}
        </tbody>
      </table>
    </div>
    <div />
  </div>
</div>

<br />
<br />
