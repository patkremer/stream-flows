<template>
  <span>
    <span v-if="weather.main">
      <div v-if="showDate">
        <slot>{{weather.dt_txt | moment("calendar")}}
        </slot>
       <br></div>
      <div v-bind:class="{ 'weather-list-date': showDate }">
        <b>
          <i v-if="showIcon" class="material-icons left">wb_cloudy</i>
          {{weather.main.temp}}&deg; F, {{weather.weather[0].description}}, {{weather.wind.speed}} mph winds<br>
          High: {{weather.main.temp_max}}&deg; F, Low: {{weather.main.temp_min}}&deg; F
        </b>
      </div>
       <!-- <b>
        <i v-if="!showDate" class="material-icons left">wb_cloudy</i>
        {{weather.main.temp}}&deg; F, {{weather.weather[0].description}}, {{weather.wind.speed}} mph winds
        <br>
        High: {{weather.main.temp_max}}&deg; F, Low: {{weather.main.temp_min}}&deg; F
      </b> -->
    </span>
   
  </span>
</template>

<script>
export default {
  name: 'weather-day',
   props: {
    weather: {
      required: true,
    },
    showIcon: {
      required: false,
      default: function () {
        return true;
      }
    },
    showDate: {
      required: false,
      default: function () {
        return false;
      }
    }
  },
}
</script>

<style>

  .weather-list-date {
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 5px;
  };

</style>
