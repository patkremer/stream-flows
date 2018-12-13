<template>
      <div class="card small grey lighten-5">
        <div class="card-content">
          <span class="card-title">
            {{stream.station_name}}
            <!-- <small class="truncate">{{stream.stationId}}</small> -->
          </span>
          <div class="s12">
            <i class="material-icons left">waves</i>
            <p>
              <b>{{stream.amount}} {{stream.units}}</b>
              {{stream.date_time | moment("from", "now") }}             <span v-if="stream.county">in {{stream.county}} County</span>
            </p>
            <br/>
            <i class="material-icons left">wb_cloudy</i>
            <p v-if="stream.weather.main">
              <b>{{stream.weather.main.temp}} &deg; F, {{stream.weather.wind.speed}} mph winds</b>
            </p>
             <a class="btn-flat" v-else v-on:click.once="getWeather(stream)" >Show Weather</a>
            
          </div>
         
          <!--  -->
          
        </div>
        <div class="card-action">
          <!-- <a
            v-on:click="getHistory(stream.usgs_station_id)"
            class="btn-floating waves-effect waves-light"
          >
            <i class="material-icons medium">history</i>
          </a> -->

          <!-- <br> -->
          <a class="btn waves-effect waves-light teal darken-2" v-if="getMapLink(stream)" target="_blank" v-bind:href="getMapLink(stream)"><i class="material-icons left">my_location</i>Map</a>

          <a v-if="stream.http_linkage" v-bind:href="stream.http_linkage" target="_blank" class="btn waves-effect waves-light teal darken-2">
            <i class="material-icons medium left">link</i>
            View Orginal Source
          </a>
        </div>
      </div>

</template>

<script>
//import StreamCollection from './components/StreamCollection.vue'
import weatherApi from '../weatherApi.js';
import apiTokens from '../apiTokens.js';

export default {
  name: 'stream-card-collection-item',
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
    getMapLink(stream) {
       
      if (stream.location && stream.location.latitude && stream.location.longitude) {
         return 'https://www.google.com/maps/search/?api=1&query=' + stream.location.latitude.toString() + ',' + stream.location.longitude.toString();
      } else {
        return '';
      }
    },
    getWeather() {
      this.$ga.event({
        eventCategory: 'click',
        eventAction: 'getWeather',
        eventLabel: this.stream.station_name,
      });
     // console.log(stream, 'get weather');
      fetch(weatherApi.getWeatherUrl(this.stream.location.latitude, this.stream.location.longitude, apiTokens.openWeatherMap), {
        mode: 'cors',
      })
      .then(response => response.json())
          .catch(error => (this.error = error))
          .then(response => {
            this.stream.weather = response;
            console.log('got weather', response);
          });
     },
  }

  


}
</script>

<style>

</style>
