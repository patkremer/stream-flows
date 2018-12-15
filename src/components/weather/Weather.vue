<template>
  <span>
    <b v-if="weather.main">
        <i class="material-icons left">wb_cloudy</i>
        {{weather.main.temp}}&deg; F, {{weather.weather[0].description}}, {{weather.wind.speed}} mph winds
        <br>
        High: {{weather.main.temp_max}}&deg; F, Low: {{weather.main.temp_min}}&deg; F
      </b>
  </span>
</template>

<script>
export default {
  name: 'weather',
   props: {
    weather: {
      required: true,
    }
  },
}
</script>

<style>

</style>
