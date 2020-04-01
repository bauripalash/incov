<script>
  let uu = "https://raw.githubusercontent.com/covid19india/api/master/data.json";

  import { onMount } from "svelte";
  import axios from "axios";
  import Chart from "chart.js";
  import "chart.js/dist/Chart.min.css";
  var downlink = "";
  var downtext = "";
  var loadingbtn;
  import { link } from "svelte-spa-router";
  window.chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };

  onMount(async () => {
    fetch(uu)
      .then(res => res.json())
      .then(res => buildchart(res));
  });

  function buildchart(res) {
    //   console.log(res);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var labels = Array();
    var death = Array();
    var ef = Array();
    var r = Array();
    var t_death = Array();
    var t_ef = Array();
    var t_r = Array();
    res["cases_time_series"].forEach(e => {
      death.push(e["totaldeceased"]);
      ef.push(e["totalconfirmed"]);
      r.push(e["totalrecovered"]);
      labels.push(e["date"]);
      t_death.push(e["dailydeceased"]);
      t_ef.push(e["dailyconfirmed"]);
      t_r.push(e["dailyrecovered"]);
    });
    death.push(res["statewise"][0]["deaths"]);
    ef.push(res["statewise"][0]["confirmed"]);
    r.push(res["statewise"][0]["recovered"]);
    t_death.push(res["statewise"][0]["delta"]["deaths"]);
    t_ef.push(res["statewise"][0]["delta"]["confirmed"]);
    t_r.push(res["statewise"][0]["delta"]["recovered"]);
    var today = new Date();
    labels.push(`${today.getDate()} ${months[today.getMonth()]}`);

    var config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "CONFIRMED",
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: ef,
            fill: false
          },
          {
            label: "RECOVERED",
            fill: false,
            backgroundColor: window.chartColors.green,
            borderColor: window.chartColors.green,
            data: r
          },
          {
            label: "DEATHS",
            fill: false,
            backgroundColor: window.chartColors.orange,
            borderColor: window.chartColors.orange,
            data: death
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "India's COVID-19 Totals Report (covid19.palashbauri.in)"
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
          text: "India's COVID-19 Daily Trend (covid19.palashbauri.in)"
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
    var ctx = document.getElementById("crd").getContext("2d");
    var progress = document.getElementById("animationProgress");
    window.myLine = new Chart(ctx, config);
    var ctx2 = document.getElementById("crd2").getContext("2d");
    window.myLine2 = new Chart(ctx2, t_config);
    // console.log(death);
  }
  //   var canvas = document.getElementById('crd');
</script>

<style>
  /* #crd{
    height: 100px;
    width: 100%;
}

@media only screen and (max-width: 768px) {
*/
  .notification {
    background-color: white;
  }
  canvas {
    margin: auto 0;
  }
  /* .cx {
    width: 80%;
    margin: 0 auto;
    height: 100px;
  } */

  /* @media (min-width: 600px) {
    canvas {
      margin: auto 0;
      height: 100rem;
      width: 100%;
    }
  } */
</style>

<div class="chartbox" id="chartbox">
  <div class="container is-widescreen">
    <div class="notification">
      <h3
        class="is-size-4-fullhd has-text-weight-bold has-text-centered
        is-uppercase has-text-link">
        Coronavirus Infection Graph India
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
      <hr>
      <div
        id="canvasWrapper"
        style="position: relative; height: 70vh ; max-width:800px;margin:0 auto;">
        <canvas id="crd2" style="">

          <!--  -->
        </canvas>
      </div>
      <a
        href="/chart"
        use:link
        bind:this={loadingbtn}
        class="button is-info is-light is-small is-fullwidth">
        Loading...(Please Refresh if taking long)
      </a>
      <!-- </div> -->
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</div>

<br />
<br />
