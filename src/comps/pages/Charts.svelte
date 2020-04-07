<script>
  export let params = {};
  import IndiaChart from "./chartcomp/IndiaChart.svelte";
  import StateChart from "./chartcomp/StateChart.svelte";
  import { push , location  } from "svelte-spa-router";
  import { onMount } from 'svelte';

  const STATE_SHORT_CODES = {
    MH: "Maharashtra",
    TN: "Tamil Nadu",
    DL: "Delhi",
    TG: "Telangana",
    KL: "Kerala",
    RJ: "Rajasthan",
    UP: "Uttar Pradesh",
    AP: "Andhra Pradesh",
    MP: "Madhya Pradesh",
    KA: "Karnataka",
    GJ: "Gujarat",
    JK: "Jammu and Kashmir",
    HR: "Haryana",
    WB: "West Bengal",
    PB: "Punjab",
    OR: "Odisha",
    BR: "Bihar",
    UT: "Uttarakhand",
    AS: "Assam",
    CH: "Chandigarh",
    LA: "Ladakh",
    HP: "Himachal Pradesh",
    AN: "Andaman and Nicobar Islands",
    CT: "Chhattisgarh",
    GA: "Goa",
    PY: "Puducherry",
    JH: "Jharkhand",
    MN: "Manipur",
    MZ: "Mizoram",
    AR: "Arunachal Pradesh",
    DN: "Dadra and Nagar Haveli"
  };
  let selected;
  const selectedChange = () => {
    // console.log(selected);
    if (selected === "INDIA") {
      if (params.state) {
        push("/chart/");
      }
    } else {
      push("/chart/" + selected);
    }
  };
  onMount(()=>{
    if ($location.split("/").length === 3){
      // selected = $location.split("/")[2]
      push("/chart");
    }
  })
  // $: params.state , console.log(params.state);
//   $ : stateShortCode = function(){
//       return selected
//   }

//   $ : stateName = function(){
//       return STATE_SHORT_CODES[selected]
//   }
// console.log(selected, $location.split("/"))
</script>

<style>
  .notification {
    background-color: white;
  }
</style>

<div class="chartbox" id="chartbox">
  <div class="container is-widescreen">
    <div class="notification">
      <h3
        class="is-size-4-fullhd has-text-weight-bold has-text-centered
        is-uppercase has-text-link">
        Coronavirus Infection Graph India & States
      </h3>
      <h5 class="is-size-7-fullhd has-text-centered">
      (Select State From Below)
    </h5>
      <div style="margin:8px auto;" class="control is-expanded">
        <!-- <label style="display:inline-block;">Select State:</label> -->
        <div class="select is-fullwidth is-small is-rounded is-primary">

          <select bind:value={selected} on:change={() => selectedChange()}>
            <option value="INDIA">India</option>
            {#each Object.keys(STATE_SHORT_CODES) as state}
              <option value={state}>{STATE_SHORT_CODES[state]}</option>
            {/each}
          </select>
        </div>
      </div>
      <!-- <p>{params.state}</p> -->
      {#if params.state != null}
        <StateChart bind:selected/>
      {:else}
      <h3
        class="is-size-4-fullhd has-text-weight-bold has-text-centered
        is-uppercase has-text-link">
        INDIA
      </h3>
        <IndiaChart />
      {/if}

    </div>
  </div>
</div>
