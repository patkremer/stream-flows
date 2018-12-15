<template>
 
<div id="" >
    <pre v-if="error">
      {{error}}
    </pre>
    <stream-collection></stream-collection>
</div>

</template>

<script>
import StreamCollection from './components/stream/StreamCollection.vue'

export default {
  name: 'app-view',
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

</style>
