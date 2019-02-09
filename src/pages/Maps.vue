<template>
  <main-layout>
    <!-- <div class="row"> -->
    <h4>Map View</h4>
    <p>Center is at {{ mapSettings.currentCenter }} and the zoom is: {{ mapSettings.currentZoom }}</p>
    <div class="row">
      <div class="col s12 m12 l12">
        <div class="maps-container">
          <l-map
            :zoom="mapSettings.zoom"
            :center="mapSettings.center"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
            <l-tile-layer :url="mapSettings.url" :attribution="mapSettings.attribution"/>
           <v-marker-cluster :options="clusterOptions" @clusterclick="clusterClick()">
            <l-marker
              :title="marker.station_name"
              v-for="marker in streams"
              :key="marker.id"
              :lat-lng="{'lat': marker.location.latitude, 'lng': marker.location.longitude}"
            >
              <l-tooltip>{{marker.station_name}}</l-tooltip>
              <l-popup>
                {{marker.station_name}}
                <br>
                <i class="material-icons left">waves</i>
                <b>{{marker.amount}} {{marker.units}},</b>
                {{marker.date_time | moment("from", "now") }}
              </l-popup>
            </l-marker>
           </v-marker-cluster>
          </l-map>
        </div>
      </div>
    </div>

    <!-- </div> -->
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import { L, LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
// import waterApi from "../data/waterApi";
//import _ from "lodash";
export default {
  name: "maps",
  methods: {
    track() {
      this.$ga.page("/maps");
      this.$ga.screenview({
        screenName: "maps"
      });
    },
    zoomUpdate(zoom) {
      this.mapSettings.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.mapSettings.currentCenter = center;
    },
    clusterClick() {
    }
  },
  data() {
    return {
      clusterOptions: {},
      mapSettings: {
        zoom: 7,
        center: L.latLng(38.989569403083166, -105.04268646240236),
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        mapOptions: {
          zoomSnap: 0.5
        },
        currentZoom: 7,
        currentCenter: L.latLng(38.989569403083166, -105.04268646240236)
      },

      streams: [],
      sampleData: []
    };
  },

  mounted() {
    // this.streams = _.filter(JSON.parse(this.$ls.get("streams"), "[]"), function(
    //   o
    // ) {
    //   return o.location && o.station_name.toLowerCase().indexOf("ditch") === -1;
    // });
  
  },

  components: {
    MainLayout,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    "v-marker-cluster": Vue2LeafletMarkerCluster

    // LTooltip
  }
};
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.maps-container {
  width: 100%;
  height: 500px;
}

.map-canvas {
  height: 350px;
}
</style>
