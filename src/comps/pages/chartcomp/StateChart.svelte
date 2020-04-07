<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import axios from "axios";
  import Chart from "chart.js";
  import "chart.js/dist/Chart.min.css";
  var downlink = "";
  var downtext = "";
  var loadingbtn;
  window.chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };
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
  //   export let stateShortCode;//="";
  //   export let stateName="";
  export let selected = "";

  let states_json =
    "https://raw.githubusercontent.com/bauripalash/ncov-19-india/master/data/trend.json";

  // onMount(async () => {
  //   fetch(states_json)
  //     .then(res => res.json())
  //     .then(res => buildchart(res));
  // });

  // afterUpdate(async () => {
  //   fetch(states_json)
  //     .then(res => res.json())
  //     .then(res => buildchart(res));
  // });

  // onDestroy(()=>{
  //   console.log("DES")
  // })

  $: selected, initChart();

  function initChart() {
    if (window.myLine) {
      // console.log("YES1");
      window.myLine.destroy();
    }
    if (window.myLine2) {
      // console.log("YES2");
      window.myLine2.destroy();
    }
    fetch(states_json)
      .then(res => res.json())
      .then(res => buildchart(res));
  }

  function buildchart(res) {
    var labels = Array.from(res["CONFIRMED"]["date"]);
    var death = Array(); //totals
    var ef = Array(); //""
    var r = Array(); //""
    var t_death = Array.from(res["DEATHS"][selected]); //Daily
    var t_ef = Array.from(res["CONFIRMED"][selected]); //""
    var t_r = Array.from(res["RECOVERED"][selected]); //""

    // total confirmed trend:
    for (let i = 0; i <= t_ef.length; i++) {
      ef.push(t_ef.slice(0, i).reduce((a, b) => a + b, 0));
      death.push(t_death.slice(0, i).reduce((a, b) => a + b, 0));
      r.push(t_r.slice(0, i).reduce((a, b) => a + b, 0));
    }

    // console.log(temps);
    var config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "CONFIRMED",
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: ef.slice(1),
            fill: false
          },
          {
            label: "RECOVERED",
            fill: false,
            backgroundColor: window.chartColors.green,
            borderColor: window.chartColors.green,
            data: r.slice(1)
          },
          {
            label: "DEATHS",
            fill: false,
            backgroundColor: window.chartColors.orange,
            borderColor: window.chartColors.orange,
            data: death.slice(1)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text:
            STATE_SHORT_CODES[selected] +
            "'s COVID-19 Totals (covid19.palashbauri.in)"
        },
        animation: {
          duration: 2000,
          onProgress: function(animation) {
            progress.value = animation.currentStep / animation.numSteps;
          },
          onComplete: function() {
            progress.style.display = "none";
            loadingbtn.style.display = "none";
            // document.getElementById("download_chart").innerText =
            //   "Download Graph";
            // downtext = "Download Graph";
            // const canvas = document.getElementById("crd");
            // var heightRatio = 2;
            // canvas.height = canvas.width * heightRatio;
            // downlink = canvas.toDataURL("image/jpg");
            // document.getElementById("download_chart").href = image;
          }
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "People"
              }
            }
          ]
        }
      }
    };
    var t_config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "DAILY CONFIRMED",
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: t_ef,
            fill: false
          },
          {
            label: "DAILY RECOVERED",
            fill: false,
            backgroundColor: window.chartColors.green,
            borderColor: window.chartColors.green,
            data: t_r
          },
          {
            label: "DAILY DEATHS",
            fill: false,
            backgroundColor: window.chartColors.orange,
            borderColor: window.chartColors.orange,
            data: t_death
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text:
            STATE_SHORT_CODES[selected] +
            "'s COVID-19 Daily Trend (covid19.palashbauri.in)"
        },
        animation: {
          duration: 2000,
          // onProgress: function(animation) {
          //   progress.value = animation.currentStep / animation.numSteps;
          // },
          onComplete: function() {
            // progress.style.display = "none";
            // loadingbtn.style.display = "none";
          }
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "People"
              }
            }
          ]
        }
      }
    };
    if (window.myLine) {
      // console.log("YES1");
      window.myLine.destroy();
    }
    if (window.myLine2) {
      // console.log("YES2");
      window.myLine2.destroy();
    }
    var ctx = document.getElementById("crd").getContext("2d");
    var progress = document.getElementById("animationProgress");
    // window.myLine.destroy();
    window.myLine = new Chart(ctx, config);
    var ctx2 = document.getElementById("crd2").getContext("2d");
    // window.myLine2.destroy();
    window.myLine2 = new Chart(ctx2, t_config);
  }
</script>

<style>
  .notification {
    background-color: white;
  }
  canvas {
    margin: auto 0;
  }
</style>

<!-- <div class="state" id="statebox">
  <div class="container is-widescreen">
    <div class="notification"> -->
<h3
  id="state_title"
  class="is-size-4-fullhd has-text-weight-bold has-text-centered is-uppercase
  has-text-link">
  {STATE_SHORT_CODES[selected]}
</h3>
<progress
  id="animationProgress"
  max="1"
  value="0"
  style="width: 100%;height:10px;" />
<!-- <div
        class="chart-containerx"
        style="height:40vh; width:80vw"> -->
<!-- <div class="cx"> -->
<div
  id="canvasWrapper"
  style="position: relative; height: 70vh ; max-width:800px;margin:0 auto;">
  <canvas id="crd" style="">

    <!--  -->
  </canvas>
</div>
<hr />
<div
  id="canvasWrapper"
  style="position: relative; height: 70vh ; max-width:800px;margin:0 auto;">
  <canvas id="crd2" style="">

    <!--  -->
  </canvas>
</div>
<p bind:this={loadingbtn} class="button is-info is-light is-small is-fullwidth">
  Loading...(Please Refresh if taking long)
</p>
<br>
<p style="color:gray" class="is-fullhd has-text-centered">(Data might be incomplete!)</p>
<br>
<!-- </div> -->
<!-- </div>
</div> -->

<br />
<br />
