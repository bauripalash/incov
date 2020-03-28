<script>
  let u_url = "https://api.covid19india.org/data.json";
  let o_url_states =
    "https://raw.githubusercontent.com/bauripalash/ncov-19-india/master/data/report.json";
  let o_url_trend =
    "https://bauripalash.github.io/ncov-19-india/data/trend.json";

  let infected_o = "WAIT";
  let infected_u = "WAIT";
  let r_o = "WAIT";
  let r_u = "WAIT";
  let d_u = "WAIT";
  let d_o = "WAIT";
  let iu_d = 0;
  let du_d = 0;
  let ru_d = 0;
  let su_d = 0;
  let its = "NADA";
  let pts = "NADA";
  //   let s_u = 0i;
  let s_o = "WAIT";
  let lup_o = 0;
  let lup_u = 0;
  import axios from "axios";

  axios.get(u_url).then(res => {
    infected_u = res.data["statewise"][0]["confirmed"];
    d_u = res.data["statewise"][0]["deaths"];
    r_u = res.data["statewise"][0]["recovered"];
    // s_u = res.data["statewise"].length - 1;
    lup_u = res.data["statewise"][0]["lastupdatedtime"];
    iu_d = res.data["key_values"][0]["confirmeddelta"];
    du_d = res.data["key_values"][0]["deceaseddelta"];
    ru_d = res.data["key_values"][0]["recovereddelta"];
    su_d = res.data["key_values"][0]["statesdelta"];
    if (
      res.data["tested"][res.data["tested"].length - 1][
        "totalindividualstested"
      ].length > 0
    ) {
      its =
        res.data["tested"][res.data["tested"].length - 1][
          "totalindividualstested"
        ];
    }
    if (
      res.data["tested"][res.data["tested"].length - 1]["totalpositivecases"]
        .length > 0
    ) {
      pts =
        res.data["tested"][res.data["tested"].length - 1]["totalpositivecases"];
    }
  });

  axios.get(o_url_states).then(res => {
    infected_o = res.data[res.data.length - 1]["total_effected"];
    r_o = res.data[res.data.length - 1]["total_cured"];
    d_o = res.data[res.data.length - 1]["total_death"];
    s_o = res.data[res.data.length - 1]["total_states"];
    lup_o = res.data[res.data.length - 1]["last_update"];
    // console.log(res);
  });
</script>

<style>
  .notification {
    background-color: #ffff !important;
  }
  .fieldset-i {
    background-color: #fff;
    border-radius: 6px;
    /* box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), */
    /* 0 0 0 1px rgba(10, 10, 10, 0.02); */
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    border: 1px solid red;
  }
  .fieldset-i > legend {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    padding: 0 5px;
    width: max-content;
    border: 0 none;
  }

  .fieldset-r {
    background-color: #fff;
    border-radius: 6px;
    /* box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), */
    /* 0 0 0 1px rgba(10, 10, 10, 0.02); */
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    border: 1px solid green;
  }
  .fieldset-r > legend {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    padding: 0 5px;
    width: max-content;
    border: 0 none;
  }

  .fieldset-s {
    background-color: #fff;
    border-radius: 6px;
    /* box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), */
    /* 0 0 0 1px rgba(10, 10, 10, 0.02); */
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    border: 1px solid blue;
  }
  .fieldset-s > legend {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    padding: 0 5px;
    width: max-content;
    border: 0 none;
  }
  .fieldset-t {
    background-color: #fff;
    border-radius: 6px;
    /* box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), */
    /* 0 0 0 1px rgba(10, 10, 10, 0.02); */
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    border: 1px solid black;
  }
  .fieldset-t > legend {
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

<div class="stats-main">
  <div class="container is-widescreen">
    <div class="notification">
      <h3
        class="is-size-4-fullhd has-text-weight-bold has-text-centered
        is-uppercase has-text-link">
        Coronavirus Report of India
      </h3>
      <!--  -->
      <fieldset class="fieldset-i">
        <legend class="has-text-danger">Infected:</legend>
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Official Data</p>
              <p class="title has-text-danger">{infected_o}</p>

            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Unofficial Data</p>
              <p class="title has-text-danger">{infected_u}</p>
              <p class="has-text-danger">[▲{iu_d}]</p>
            </div>
          </div>
        </div>
      </fieldset>
      <!--  -->
      <!--  -->
      <fieldset class="fieldset-i">
        <legend class="has-text-danger">Deaths:</legend>
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Official Data</p>
              <p class="title has-text-danger">{d_o}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Unofficial Data</p>
              <p class="title has-text-danger">{d_u}</p>
              <p class="has-text-danger">[▲{du_d}]</p>
            </div>
          </div>
        </div>
      </fieldset>
      <!--  -->
      <fieldset class="fieldset-r">
        <legend class="has-text-success">Recovered:</legend>
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Official Data</p>
              <p class="title has-text-success">{r_o}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Unofficial Data</p>
              <p class="title has-text-success">{r_u}</p>
              <p class="has-text-success">[▲{ru_d}]</p>
            </div>
          </div>
        </div>
      </fieldset>
      <!-- 
       -->
      <fieldset class="fieldset-s">
        <legend class="has-text-link">States:</legend>
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Official Data</p>
              <p class="title has-text-link">{s_o}</p>
              <p class="has-text-link">[▲{su_d}]</p>
            </div>
          </div>
          <!-- <div class="level-item has-text-centered">
            <div>
              <p class="heading">Unofficial Data</p>
              <p class="title has-text-link">{s_u}</p>
            </div>
          </div> -->
        </div>
      </fieldset>
      <!-- <h4 class="has-text-centered has-text-dark"> -->
      <fieldset class="fieldset-t">
        <legend class="has-text-dark">Total Tests Done:</legend>
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Individuals Tested</p>
              <p class="title has-text-dark">{its}+</p>
              <!-- <p class="has-text-link">[▲{su_d}]</p> -->
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Positive Tests</p>
              <p class="title has-text-dark">{pts}+</p>
            </div>
          </div>
          <!-- <div class="level-item has-text-centered">
            <div>
              <p class="heading">Unofficial Data</p>
              <p class="title has-text-link">{s_u}</p>
            </div>
          </div> -->
        </div>
      </fieldset>
      <!--  -->
      <br />
      <article class="message is-small is-warning">
        <div class="message-body has-text-centered">
          Official Data Updated :
          <strong>{lup_o}</strong>
          ▪️ Unofficial/Crowdsourced Data Updated :
          <strong>{lup_u}</strong>
          <br />
          <p class="has-text-link">Developed by , Palash Bauri</p>
        </div>
      </article>

      <!-- </h4> -->
    </div>
  </div>
</div>

<br />
<br />
