<script>
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import statesData from "../../in_states.js";
  const REPORT_URL = "https://api.covid19india.org/data.json"; //Data Source
  import axios from "axios";
  var smap; // The Map Leaflet Object
  var gj; // The GeoJSON Layer
  var infobox;

  var eStateList = Array();
  var eCountList = Array();
  var dList = Array();
  var rList = Array();
  var totalInfected;

  const zoomTo = e => {
    smap.fitBounds(e.target.getBounds());
    showInfo(e);
  };
  const showInfo = e => {
    // console.log(e);
    gj.resetStyle();
    let layer = e.target;

    layer.setStyle({
      weight: 1,
      opacity: 1,
      color: "blue",
      fillColor: "red",
      // dashArray: '',
      fillOpacity: 1
    });
    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //     layer.bringToFront();
    // }
    infobox.update(layer.feature.properties);
    //   console.log(infobox);
  };

  const resetInfo = e => {
    gj.resetStyle(e.target);
  };

  const oef = (f, l) => {
    // console.log(f , l);
    l.on({
      mouseover: showInfo,
      mouseout: resetInfo,
      click: zoomTo
    });
  };

  const mapstyle = s => {
    let e = 0;
    if (eStateList.indexOf(s.properties["STATE"]) >= 0) {
      if (s.properties["STATE"] == "Jammu and Kashmir") {
        e =
          eCountList[eStateList.indexOf(s.properties["STATE"])] +
          eCountList[eStateList.indexOf("Ladakh")];
      } else {
        e = eCountList[eStateList.indexOf(s.properties["STATE"])];
      }
    }
    //   console.log(s.properties["STATE"]);
    // console.log(e / totalInfected);
    return {
      weight: 1,
      opacity: 0.2,
      color: "black",
      fillOpacity: (e / totalInfected) * 5,
      fillColor: "#cc0000"
    };
  };
  onMount(() => {
    var res = axios
      .get(REPORT_URL)
      .then(res => res.data)
      .then(res => {
        buildmap(res);
      });

    // fetch(REPORT_URL)
    //   .then(res => res.data)
    //   .then(res => buildmap(res));
  });
  const buildmap = res => {
    console.log(res);
    res["statewise"].slice(1).forEach(e => {
      eStateList.push(e["state"]);
      eCountList.push(e["confirmed"]);
      dList.push(e["deaths"]);
      rList.push(e["recovered"]);
    });
    // console.log(eStateList);
    totalInfected = res["statewise"][0]["confirmed"];
    smap = L.map("smap").setView([22.5, 82], 3);
    L.tileLayer(
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      {
        attribution: "Map tiles by Carto(CC3.0) | Data by OpenStreetMap",
        subdomains: ["a", "b", "c"],
        maxZoom: 6,
        minZoom: 4
        // tileSize: 512,
        // zoomOffset: -1
      }
    ).addTo(smap);
    infobox = L.control();

    infobox.onAdd = function(map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    infobox.update = function(props) {
      if (props) {
        if (eStateList.indexOf(props["STATE"]) >= 0) {
          let sd = res["statewise"].slice(1)[
            eStateList.indexOf(props["STATE"])
          ];
          // console.log(sd);
          let e = props["STATE"] == "Jammu and Kashmir" ? parseInt(sd["confirmed"]) + parseInt(res["statewise"].slice(1)[eStateList.indexOf("Ladakh")]["confirmed"]) : sd["confirmed"] ;
          let d = props["STATE"] == "Jammu and Kashmir" ? parseInt(sd["deaths"]) + parseInt(res["statewise"].slice(1)[eStateList.indexOf("Ladakh")]["deaths"]) : sd["deaths"];
          let c = props["STATE"] == "Jammu and Kashmir" ? parseInt(sd["recovered"]) + parseInt(res["statewise"].slice(1)[eStateList.indexOf("Ladakh")]["recovered"]) : sd["recovered"];

          status = `<div style="padding: 6px 8px;font: 14px/16px Arial, Helvetica, sans-serif;background: white;background: rgba(255, 255, 255, 0.8);box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);border-radius: 5px;"><h4 style="margin: 0 0 5px;color: black;font-weight:bold;">${props["STATE"]=="Jammu and Kashmir" ? "J&K and Ladakh" : props["STATE"]}</h4>`;
          status += `<div class="infos"><strong>Effected: </strong><span style="color:red">${e}</span><br>`;
          status += `<strong>Deaths: </strong><span style="color:red">${d}</span><br>`;
          status += `<strong>Recovered: </strong><span style="color:green">${c}</span><br></div></div>`;
        } else {
          status = `<div style="padding: 6px 8px;font: 14px/16px Arial, Helvetica, sans-serif;background: white;background: rgba(255, 255, 255, 0.8);box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);border-radius: 5px;"><h4 style="margin: 0 0 5px;color: black; font-weight:bold;">${props["STATE"]}</h4><br>No Confirmed Cases!</div>`;
        }
      } else {
        let status = "<h4>Statewise COVID-19 Data</h4>" + "Hover over a state";
      }
      this._div.innerHTML = status;
    };

    infobox.addTo(smap);
    gj = L.geoJson(statesData, {
      style: mapstyle,
      onEachFeature: oef
    }).addTo(smap);
  };
</script>

<style>
  #smap {
    height: 80vh;
    width: 80vw;
    margin: 0 auto;
  }
  .notification {
    background-color: #ffff;
  }
</style>

<div class="map_holder" id="map_holder">
  <div class="container is-widescreen">
    <div class="notification">
      <h3
        class="is-size-4-fullhd has-text-weight-bold has-text-centered
        is-uppercase has-text-link">
        Coronavirus Infection Map India
      </h3>
      <!--  -->
      <div id="smap" />
    </div>
  </div>
</div>
<br />
<br />
