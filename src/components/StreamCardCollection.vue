<template>
 
<div class="stream-card-collection" >
  <div class="col s12 md5 lg3 xl3" v-for="(stream) in streams" :key="stream.id">
     <stream-card-collection-item v-bind:stream.sync="stream" ></stream-card-collection-item>
  </div>
</div>

</template>

<script>
import StreamCardCollectionItem from './StreamCardCollectionItem.vue'

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
    StreamCardCollectionItem
  },

  


}
</script>

<style>

</style>
