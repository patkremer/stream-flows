<template>
 
<div id="app" >
    <pre v-if="error">
      {{error}}
    </pre>
    <stream-collection></stream-collection>
</div>

</template>

<script>
import StreamCollection from './components/StreamCollection.vue'

export default {
  name: 'app',
  data: function() {
    return {
        error: null
      };
  },
  components: {
    StreamCollection
  },

  


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 10px;
  /* padding-left: 20px;
  padding-right: 20px; */
}
</style>
