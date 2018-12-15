<template>
  <div>
      <ui class="collection">
        <li class="collection-item" v-for="(weather) in forecast.list" v-bind:key="weather.dt">
           <b
            v-if="weather.main"
          >
          <i class="material-icons left">wb_cloudy</i>

          {{weather.main.temp}}&deg; F, {{weather.weather[0].description}}, {{weather.wind.speed}} mph winds
          <br/>
            High: {{weather.main.temp_max}}&deg; F, Low: {{weather.main.temp_min}}&deg; F
          </b>
        </li>
      </ui>
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
export default {
  name:'weather-forecast',
  props: {
    forecast: {
      required: true,
    }
  },
}
</script>

<style>

</style>
