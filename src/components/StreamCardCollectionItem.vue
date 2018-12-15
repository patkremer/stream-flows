<template>
  <div class="card small grey lighten-5 stream-card">
    <div class="card-content">
      <span class="card-title">
        {{stream.station_name}}
        <!-- <small class="truncate">{{stream.stationId}}</small> -->
      </span>
      <div class="card-info"> 
        <div>
          <i class="material-icons left">waves</i>
          <b>{{stream.amount}} {{stream.units}},</b>
          {{stream.date_time | moment("from", "now") }}
          <span v-if="stream.county">in {{stream.county}} County</span>
        </div>
        <div>
          <i class="material-icons left">wb_cloudy</i>
          <b
            v-if="stream.weather.main"
          >{{stream.weather.main.temp}}&deg; F, {{stream.weather.weather[0].description}}, {{stream.weather.wind.speed}} mph winds
          <br/>
            High: {{stream.weather.main.temp_max}}&deg; F, Low: {{stream.weather.main.temp_min}}&deg; F
          </b>
          <a class="btn-flat weather-button" v-else v-on:click.once="getWeather(stream)">Show Weather</a>
        </div>
         <div>  
          <span v-if="stream.station_status">
            <i class="material-icons left">info</i>
            {{stream.station_status}}
          </span>
        </div>
        <div>
          <small>Source: {{stream.data_source}}</small>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="card-action">
      <!-- <a
            v-on:click="getHistory(stream.usgs_station_id)"
            class="btn-floating waves-effect waves-light"
          >
            <i class="material-icons medium">history</i>
      </a>-->
      <!-- <br> -->
      <a
        class="btn waves-effect waves-light teal darken-2"
        v-on:click="getMapClick()"
        v-if="getMapLink(stream)"
        target="_blank"
        v-bind:href="getMapLink(stream)"
      >
        <i class="material-icons left">my_location</i>Map
      </a>
      
      <a
        v-if="stream.http_linkage"
        v-on:click="viewSourceClick()"
        v-bind:href="stream.http_linkage"
        target="_blank"
        class="btn waves-effect waves-light teal darken-2"
      >
        <i class="material-icons medium left">show_chart</i>
        Detail Graph
      </a>
    </div>
  </div>
</template>

<script>
//import StreamCollection from './components/StreamCollection.vue'
import weatherApi from "../weatherApi.js";
import apiTokens from "../apiTokens.js";

export default {
  name: "stream-card-collection-item",
  data: function() {
    return {
      error: null
    };
  },

  props: {
    stream: {
      required: true
    }
  },

  methods: {
    getMapClick() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getMap",
        eventLabel: this.stream.station_name
      });
    },
    viewSourceClick() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "viewSourceClick",
        eventLabel: this.stream.station_name
      });
    },
    getMapLink(stream) {
      if (
        stream.location &&
        stream.location.latitude &&
        stream.location.longitude
      ) {
        return (
          "https://www.google.com/maps/search/?api=1&query=" +
          stream.location.latitude.toString() +
          "," +
          stream.location.longitude.toString()
        );
      } else {
        return "";
      }
    },
    getWeather() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getWeather",
        //eventAction: "getWeather",
        eventLabel: this.stream.station_name
      });
      // console.log(stream, 'get weather');
      this.$http.get(
        weatherApi.getWeatherUrl(
          this.stream.location.latitude,
          this.stream.location.longitude,
          apiTokens.openWeatherMap
        ),
        {
          mode: "cors"
        }
      )
        .then(response => response.json())
        .catch(error => (this.error = error))
        .then(response => {
          this.stream.weather = response;
        });
    }
  }
};
</script>

<style>
.weather-button {
  padding: 0;
  line-height: 30px;
  height: 28px;
}
.card.stream-card {
  height: 325px;
}
.card .card-content .card-info {
  overflow: auto;    
}
.card .card-content div {
    margin: 0;
    float: left;
    display: block;
    width: 100%;
    /* line-break: normal; */
}
</style>
