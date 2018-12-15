<template>
 
<div class="streamTable-collection" >
     <div class="col s12 m12 l12 xl12">
        <table class="striped responsive-table">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>County</th>
              <th>Flow Amount</th>
              <th>Date Recorded</th>
              <th>History</th>
            </tr>
            <tr/>
          </thead>
          <tbody>
            <stream-table-collection-item :stream="stream" v-for="(stream) in streams" :key="stream.id">
            </stream-table-collection-item>
          </tbody>
        </table>
      </div>
</div>

</template>

<script>
import StreamTableCollectionItem from './StreamTableCollectionItem.vue'

export default {
  name: 'StreamTableCollection',
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
    StreamTableCollectionItem
  },

  


};
</script>

<style>

</style>
