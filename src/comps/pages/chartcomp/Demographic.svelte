<script>
  // All Unofficial Data props
  export let totalEffected = 0;
  export let totalDeaths = 0;
  export let totalRecovered = 0;
  export let totalStates = 0;
  export let deltaEffected = 0;
  export let deltaDeaths = 0;
  export let deltaRecovered = 0;
  // -------------------------

  let gender_chart;
  let gender_unknown = 0;

  let age_chart;
  let age_unknown = 0;

  let nation_chart;
  let nation_unknown = 0;

  const DEMOGRAPHIC_JSON =
    "https://bauripalash.github.io/ncov-19-india/data/demographic.json";

  import { onMount } from "svelte";
  import Chart from "chart.js";
  import "chart.js/dist/Chart.min.css";
  window.chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };

  function genColor(n) {
    var clist = ["#ffa726"];
    for (var x = 0; x <= n-1; x++) {
      for (var i = 0, col = ""; i < 6; i++) {
        col += ((Math.random() * 16) | 0).toString(16);
      }
      clist.push("#" + col);
    }
    return clist;
  }

  onMount(async () => {
    fetch(DEMOGRAPHIC_JSON)
      .then(res => res.json())
      .then(res => buildDGCharts(res));
  });

  function buildDGCharts(res) {
    buildGenderChart(res["GENDER"], totalEffected);
    buildAgeChart(res["AGE"], totalEffected);
    buildNationalityChart(res["NATIONALITY"]);
  }

  function buildGenderChart(MF_DATA, TOTAL_DATA) {
    gender_unknown = TOTAL_DATA - (MF_DATA["MALE"] + MF_DATA["FEMALE"]);
    let config = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [MF_DATA["FEMALE"], MF_DATA["MALE"]],
            backgroundColor: [window.chartColors.red, window.chartColors.blue],
            label: "Gender Data"
          }
        ],
        labels: ["Female", "Male"]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "GENDER CHART (covid19.palashbauri.in)"
        }
      }
    };
    var ctx = gender_chart.getContext("2d");
    window.gender_chart_pie = new Chart(ctx, config);
  }

  function buildAgeChart(AGE_DATA, TOTAL_DATA) {
    age_unknown =
      TOTAL_DATA - Object.values(AGE_DATA).reduce((a, b) => a + b, 0);
    let AgeChartData = {
      labels: Object.keys(AGE_DATA),
      datasets: [
        {
          label: "Age Distribution",
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: Object.values(AGE_DATA)
        }
      ]
    };
    let ctx = age_chart.getContext("2d");
    window.age_chart_pie = new Chart(ctx, {
      type: "bar",
      data: AgeChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "AGE DISTRIBUTION (covid19.palashbauri.in)"
        }
      }
    });
  }
  function buildNationalityChart(N_DATA) {
    nation_unknown =
      totalEffected - Object.values(N_DATA).reduce((a, b) => a + b, 0);
    let n_config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: Object.values(N_DATA),
            backgroundColor: genColor(Object.keys(N_DATA).length),
            label: "Nationality"
          }
        ],
        labels: Object.keys(N_DATA)
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "NATIONALITY DISTRIBUTION (covid19.palashbauri.in)"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
    var ctx = nation_chart.getContext("2d");
    window.nation_chart = new Chart(ctx, n_config);
  }
</script>

<style>
  canvas {
    margin: auto 0;
  }
  .card {
    background-color: #fff;
    border-radius: 6px;
    /* box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), */
    /* 0 0 0 1px rgba(10, 10, 10, 0.02); */
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    border: 1px solid blue;
    padding-bottom: 30px !important;
  }
  .card > legend {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    padding: 0 5px;
    width: max-content;
    border: 0 none;
  }
</style>

<div class="demographics">

  <div id="canvasWrapper" style="">

    <div class="card">
      <legend>Gender Chart</legend>
      <div style="height:60vh;" class="card-content">
        <canvas bind:this={gender_chart} id="gender_chart" style="">

          <!--  -->
        </canvas>
        <p>Gender Unknown of {gender_unknown} patients</p><br>
      </div>

    </div>
    <br />
    <div class="card">
      <legend>Age Distribution Chart</legend>
      <div style="height:60vh;" class="card-content">
        <canvas bind:this={age_chart} id="age_chart" style="">

          <!--  -->
        </canvas>
        <p>Age Unknown of {age_unknown} patients</p><br><br>
      </div>

    </div>
    <br />
    <div class="card">
      <legend>Nationality Distribution Chart</legend>
      <div style="height:60vh;" class="card-content">
        <canvas bind:this={nation_chart} id="age_chart" style="">

          <!--  -->
        </canvas>
        <p>Nationality Unknown of {nation_unknown} patients</p><br>
      </div>

    </div>
  </div>
</div>
