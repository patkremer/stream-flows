<template>
  <div class="">
    <div class="col s12 md12 lg12 xl12">
      <div class="map-container">
          <l-map
            :zoom="mapSettings.zoom"
            :center="mapSettings.center"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
          <l-tile-layer :url="mapSettings.url" :attribution="mapSettings.attribution"/>
           <v-marker-cluster :options="clusterOptions" @clusterclick="clusterClick()">
            <l-marker
              :title="stream.station_name"
              v-for="stream in streams"
              :key="stream.id"
              
              :lat-lng="{'lat': stream.location.latitude, 'lng': stream.location.longitude}"
            >
              <l-popup>
                <!-- {{stream.station_name}}
                <br>
                <i class="material-icons left">waves</i>
                <b>{{stream.amount}} {{stream.units}},</b>
                {{stream.date_time | moment("from", "now") }} -->
                <div class="col s12 md6 lg3 xl4">
                  <stream-card v-bind:stream.sync="stream" class="remove-box-shadow"></stream-card>

                </div>

              </l-popup>
            </l-marker>
           </v-marker-cluster>
          </l-map>
        </div>
    </div>
  </div>
</template>

<script>
import StreamCard from "./StreamCard.vue";
import { L, LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
// import _ from "lodash";
export default {
  name: "stream-map",
  data() {
    return {
      error: null,
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
      }
    };
  },
  props: {
    streams: {
      required: true,
      default: []
    }
  },
  components: {
    StreamCard,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    "v-marker-cluster": Vue2LeafletMarkerCluster
  },

  mounted() {
    
  },

  methods: {
    
    zoomUpdate(zoom) {
      this.mapSettings.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.mapSettings.currentCenter = center;
    },
    clusterClick() {
    }
  }
};
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.map-container {
  width: 100%;
  height: 500px;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
@media (min-height: 200px) {
  .map-container {
    height: 500px;
  }
}

@media (min-height: 650px) {
  .map-container {
    height: 500px;
  }
}
@media (min-height: 800px) {
  .map-container {
    height: 600px;
  }
}
@media (min-height: 900px) {
  .map-container {
    height: 750px;
  }
}
@media (min-height: 1000px) {
  .map-container {
    height: 800px;
  }
}
@media (min-height: 1200px) {
  .map-container {
    height: 1000px;
  }
}
html, body {
  height: 100%;
}
.remove-box-shadow {
  box-shadow: none;
  background-color: white !important;
}
</style>
