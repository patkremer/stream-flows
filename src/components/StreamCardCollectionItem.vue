<template>
  <div class="col s6 md5 lg3 xl3" >
      <div class="card small grey lighten-5">
        <div class="card-content">
          <span class="card-title">
            {{stream.station_name}}
            <!-- <small class="truncate">{{stream.stationId}}</small> -->
          </span>
          <p class="left-align"><i class="material-icons">waves</i>
             Current Flows:
            {{stream.amount}} {{stream.units}}
            <br>
            {{stream.date_time | moment("from", "now") }} in {{stream.county}} County
          </p>
        </div>
        <div class="card-action">
          <!-- <a
            v-on:click="getHistory(stream.usgs_station_id)"
            class="btn-floating waves-effect waves-light"
          >
            <i class="material-icons medium">history</i>
          </a> -->

          <!-- <br> -->
          <a class="btn waves-effect waves-light" v-if="getMapLink(stream)" target="_blank" v-bind:href="getMapLink(stream)"><i class="material-icons left">my_location</i>Map</a>

          <a v-if="stream.http_linkage" v-bind:href="stream.http_linkage" target="_blank" class="btn waves-effect waves-light">
            <i class="material-icons medium left">link</i>
            View Orginal Source
          </a>
        </div>
      </div>
    </div>

</template>

<script>
//import StreamCollection from './components/StreamCollection.vue'

export default {
  name: 'stream-card-collection-item',
  data: function() {
    return {
        error: null
      };
  },

  props: {
    stream: {
      required: true
    }
  },

  methods: {
    getMapLink(stream) {
      if (stream.location && stream.location.latitude && stream.location.longitude) {
         return 'https://www.google.com/maps/search/?api=1&query=' + stream.location.latitude.toString() + ',' + stream.location.longitude.toString();
      } else {
        return '';
      }
      
      
    }
  }

  


}
</script>

<style>

</style>
