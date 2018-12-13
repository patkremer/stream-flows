<template>
 
<tr>
  <!--   -->
  <td>
    {{stream.station_name}}
    <!-- <small class="truncate">{{stream.stationId}}</small> -->
  </td>
  <td>{{stream.county}}</td>
  <td>{{stream.amount}} {{stream.units}}</td>
  <td>{{stream.date_time | moment("MM-DD-YYYY, h:mm:ss a")}}</td>
  <td v-if="stream.station_name">
    <a v-if="stream.http_linkage" v-bind:href="stream.http_linkage" target="_blank" class="btn waves-effect waves-light teal darken-1">
            <i class="material-icons medium left">link</i>
            View Orginal Source
          </a>
  </td>
</tr>

</template>

<script>
//import StreamCollection from './components/StreamCollection.vue'

export default {
  name: 'StreamTableCollectionItem',
  data() {
    return {
        error: null
      };
  },

  props: {
    stream: {
      required: true
    }
  }

  


}
</script>

<style>

</style>
