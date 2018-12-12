<template>
 
<div class="stream-card-collection" >
   <stream-card-collection-item :stream="stream" v-for="(stream) in streams" :key="stream.id"></stream-card-collection-item>
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
