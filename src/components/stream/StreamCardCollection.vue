<template>
 
<div class="stream-card-collection" >
  <div class="col s12 md6 lg3 xl4" v-for="(stream) in streams" :key="stream.id">
     <stream-card v-bind:stream.sync="stream" ></stream-card>
  </div>
</div>

</template>

<script>
import StreamCard from './StreamCard.vue'

export default {
  name: 'stream-card-collection',
  data() {
    return {
        error: null
      };
  },
  props: {
      streams: {
        required: true, 
        default: []
      }
  },
  components: {
    StreamCard
  },

  


}
</script>

<style>

</style>
