<template>
  <div>
    <div v-if="forecast && forecast.forecastsByDay">
      <span data-badge-caption="In Beta" class="badge red white-text"></span>
      <p>City: {{forecast.city.name}} <small>[need to verify accuracy of the weather data]</small></p>
      <ul class="collapsible expandable" v-if="forecast && forecast.forecastsByDay">
        <li v-for="(day, key) in forecast.forecastsByDay" v-bind:key="key">
          <div class="collapsible-header"><weather v-bind:weather="meanWeather(day)" v-bind:show-icon="false" v-bind:show-date="true">
            {{getDay(key)}}
            </weather></div>
          <div class="collapsible-body slim-body"><span v-for="(f, index) in day" v-bind:key="f.dt">
            <weather v-if="index > 1 && index < 7" v-bind:show-icon="false" v-bind:weather="f" v-bind:show-date="true">
            {{getTime(f.dt_txt)}}
            </weather>
            </span>
            </div>
        </li>
        <!-- <li class="collection-item" v-for="(f) in forecast.list" v-bind:key="f.dt">
          
        </li> -->
      </ul>
    </div>

      <!-- <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">5 Day Weather Forecast<i class="material-icons right">close</i></span>
      <ui class="collection" v-if="stream.forecast && stream.forecast.list">
        <li class="collection-item" v-for="(f) in forcast.list" v-bind:key="f.dt">
           <b
            v-if="f.main"
          >

          {{f.main.temp}}&deg; F, {{f.weather[0].description}}, {{f.wind.speed}} mph winds
          <br/>
            High: {{f.main.temp_max}}&deg; F, Low: {{f.main.temp_min}}&deg; F
          </b>
        </li>
      </ui>
    </div> -->
  </div>
</template>

<script>
import Weather from './Weather';
import _ from 'lodash';
export default {
  name:'weather-forecast',
  props: {
    forecast: {
      required: true,
    }
  },

  methods: {
    getDay: function(day,) {
      return this.$moment(day, 'YYYY-MM-DD').calendar().split(' ')[0];
    },
    getTime: function(day,) {
      var time = this.$moment(day).calendar().split(' ');
      return time[1] + ' ' + time[2] + ' ' + time[3];
    },
    meanWeather: function (day) {
      var weather = day[0];

      var max = _.maxBy(day, function(o) {
        return o.main.temp;
      });
      var min =  _.minBy(day, function(o) {
        return o.main.temp;
      });
      var mean = _.meanBy(day, function(o) {
        return o.main.temp;
      });
      
      weather.main.temp = Math.floor(mean);
      weather.main.temp_max = max.main.temp;
      weather.main.temp_min = min.main.temp;
        
        //weather.main.temp_max
        //data.forecastsByDay[key]
      return weather;
    }
  },
  components: {
    Weather
  },
  updated: function () {
    var elems = document.querySelectorAll('.collapsible.expandable');
    // eslint-disable-next-line no-undef
    M.Collapsible.init(elems);
  }
}
</script>

<style>
.slim-body {
  padding: 1em;
}
</style>
