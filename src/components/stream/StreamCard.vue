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
          <span
            v-if="stream.county"
          >in {{stream.county}} County</span>
        </div>
        <div v-if="hasLatAndLong">
          <weather v-if="stream.weather.main" v-bind:weather="stream.weather"></weather>
          <!-- <b v-if="stream.weather.main">
            <i class="material-icons left">wb_cloudy</i>
            {{stream.weather.main.temp}}&deg; F, {{stream.weather.weather[0].description}}, {{stream.weather.wind.speed}} mph winds
            <br>
            High: {{stream.weather.main.temp_max}}&deg; F, Low: {{stream.weather.main.temp_min}}&deg; F
          </b> -->
          <a class="btn-flat btn-large weather-button" v-else v-on:click.once="getWeather(stream)">
            <i class="material-icons left">wb_cloudy</i>Show Current Weather
          </a>
        </div>
        <div v-if="hasLatAndLong">
          <a
            class="btn-large btn-flat weather-button activator"
            v-on:click.once="getForecastClick(stream)"
          >
            <i class="material-icons left">filter_drama</i>Show 5 Day Weather Forecast
          </a>
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
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">
        5 Day Weather Forecast
        <i class="material-icons right">close</i>
      </span>
      <weather-forecast v-bind:forecast.sync="forecast"></weather-forecast>
      <!-- <ul class="collection" v-if="forecast">
        <li class="collection-item" v-for="(f) in forecast.list" v-bind:key="f.dt">
           <b
            v-if="f.main"
          >

          {{f.main.temp}}&deg; F, {{f.weather[0].description}}, {{f.wind.speed}} mph winds
          <br/>
            High: {{f.main.temp_max}}&deg; F, Low: {{f.main.temp_min}}&deg; F
          </b>
        </li>
      </ul>-->
      <b v-if="stream.weather.main">
        <i class="material-icons left">wb_cloudy</i>
        {{stream.weather.main.temp}}&deg; F, {{stream.weather.weather[0].description}}, {{stream.weather.wind.speed}} mph winds
        <br>
        High: {{stream.weather.main.temp_max}}&deg; F, Low: {{stream.weather.main.temp_min}}&deg; F
      </b>
    </div>
    <div class="card-action center">
      <a
        class="btn-small btn-flat waves-effect waves-light teal-text text-darken-2"
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
        class="btn-small btn-flat waves-effect waves-light teal-text text-darken-2"
      >
        <i class="material-icons left">show_chart</i>
        Detail
      </a>
    </div>
  </div>
</template>

<script>
//import StreamCollection from './components/StreamCollection.vue'
import WeatherForecast from "../weather/WeatherForecast.vue";
import Weather from '../weather/Weather.vue';
import weatherApi from "../../data/weatherApi.js";
export default {
  name: "stream-card",
  data: function() {
    return {
      error: null
    };
  },

  components: {
    WeatherForecast,
    Weather
  },

  props: {
    stream: {
      required: true
    }
  },

  computed: {
    hasLatAndLong() {
      return this.stream.location &&
        this.stream.location.latitude &&
        this.stream.location.longitude;
    },
    forecast() {
      if (this.stream.forecast && this.stream.forecast.list) {
        return this.stream.forecast;
      } else {
        //this.stream.forecast = {};
        return null;
      }
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
    getForecastClick() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getForecast",
        eventLabel: this.stream.station_name
      });
    //  if (!this.stream.forecast.list) {
        weatherApi
          .getForecast(
            this.stream.location.latitude,
            this.stream.location.longitude
          )
          .then(response => {
            this.stream.forecast = response;
          })
          .catch(error => (this.error = error));
      //}
    },
    getWeather() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getWeather",
        //eventAction: "getWeather",
        eventLabel: this.stream.station_name
      });
      // console.log(stream, 'get weather');
     
      weatherApi
        .getWeather(
          this.stream.location.latitude,
          this.stream.location.longitude
        )
        .then(response => {
          this.stream.weather = response.data;
        })
        .catch(error => (this.error = error));
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
  height: 350px;
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
