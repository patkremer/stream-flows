<template>
  <a class="btn-flat btn-large weather-button" v-on:click.once="callback($event)">
      <i class="material-icons left"><slot name="icon">wb_cloudy</slot></i>
      <slot>
        Show Current Weather
      </slot>
    </a>
</template>

<script>
export default {
  name: 'weather-button',
  props: {
    
  },
  methods: {
    callback: function(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style>
.weather-button {
  padding: 0;
  line-height: 30px;
  /* height: 28px; */
  display: inline;
  color: #343434 !important;
}
</style>
