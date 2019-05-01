<template>
  <div class="streamCollection">
    <div class="row remove-bottom-margin white">
      <div class="col s12 input-field">
        <i class="material-icons prefix">search</i>
        <input
          v-model="searchSettings.search"
          id="stream_search"
          v-on:input="searchChanged($event)"
          type="text"
          placeholder="Search"
        >
        <label for="stream_search" class="active">Search Streams by name</label>
        <span class="helper-text">
          <span
            v-if="filtersActive"
          >Filters Active</span>
          
          <button
            class="btn-flat btn-small waves-effect waves-light right"
            v-bind:class="{teal: filtersActive}"
            v-on:click="searchSettings.showFilterOptions = !searchSettings.showFilterOptions;"
          >
            <span v-if="searchSettings.showFilterOptions">Hide</span>
            <span v-else>Show</span>
            Filter Settings
            <i
              v-show="!searchSettings.showFilterOptions"
              class="material-icons right"
            >expand_more</i>
            <i v-show="searchSettings.showFilterOptions" class="material-icons right">expand_less</i>
          </button>
        </span>
      </div>

      <div class="row" v-show="searchSettings.showFilterOptions">
        <div class="col s12 m12">
          <div class="switch">
            <label>
              Card View
              <input
                type="checkbox"
                checked="checked"
                v-model="searchSettings.showMapView"
              >
              <span class="lever"></span>
              Map View
            </label>
          </div>
          <p>
            <label>
              <input type="checkbox" checked="checked" v-model="searchSettings.showFavorites">
              <span>Show Favorites (click or tap stars to favorite!)</span>
            </label>&nbsp;
            <label>
              <input
                type="checkbox"
                checked="checked"
                v-model="searchSettings.hideStreamsWithZeroCfs"
              >
              <span>Hide Streams with 0 Cfs</span>
            </label>&nbsp;
            <label>
              <input
                type="checkbox"
                checked="checked"
                v-model="searchSettings.hideStreamsWithoutRecentUpdate"
              >
              <span>Hide Streams that haven't been updated recently</span>
            </label>&nbsp;
              <label>
              <input
                type="checkbox"
                checked="checked"
                v-model="searchSettings.showOnlyStreamsWithTemp"
              >
              <span>Show Streams with water temperature</span>
            </label>
          </p>
          <label>Filter By Drainage</label>
          <select class="browser-default" v-model="searchSettings.regionId">
            <option value=" " selected>None</option>
            <option value="1">South Platte</option>
            <option value="2">Arkansas</option>
            <option value="3">Rio Grande</option>
            <option value="4">Gunnison</option>
            <option value="5">Colorado</option>
            <option value="6">Yampa/White</option>
            <option value="7">San Jaun/Dolores</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="searchSettings.showMapView">
      <stream-map v-bind:streams.sync="searchData"></stream-map>
    </div>

    <div v-else id="collectionView">
      <div class="row" id="streamCollections">
        <transition name="fade">
          <stream-card-collection v-bind:streams.sync="pagedData"></stream-card-collection>
          <!-- <stream-table-collection v-else :streams="pagedData"></stream-table-collection> -->
        </transition>
      </div>

      <div class="row" v-if="streams.length > 0">
        <div class="col s3 m3 l2 xl2">
          <a
            href="#stream_search"
            class="btn-floating teal darken-2 waves-effect waves-light"
            v-bind:disabled="pageNumber==1"
            v-on:click="prevPage"
          >
            <i class="material-icons right">keyboard_arrow_left</i>
          </a>
          <a
            href="#stream_search"
            class="btn-floating teal darken-2 waves-effect waves-light"
            v-bind:disabled="pageNumber >= pageCount"
            v-on:click="nextPage"
          >
            <i class="material-icons right">keyboard_arrow_right</i>
          </a>
        </div>
        <div class="input-field col s2 m2 l1 xl1">
          <input
            v-model.number="size"
            id="page_size"
            class="validate"
            required
            min="1"
            max="500"
            type="number"
          >
          <label for="page_size" class="active">Page size</label>
        </div>
        <div class="input-field  col s3 m3 l3 xl3">
          <input
            v-model.number="pageNumber"
            id="pageNumber"
            class="validate"
            required
            min="1"
            v-bind:max="pageCount"
            type="number"
          >
          <label for="pageNumber" class="active">Page Number</label>
          <span class="helper-text">Out of {{pageCount}}</span>
        </div>
      </div>
      <div class="col s12" v-else>
        <h3>Loading... Please wait</h3>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import waterApi from "../../data/waterApi.js";
import apiTokens from "../../apiTokens.js";
var _orderBy = require('lodash/orderBy');
var _sortBy = require('lodash/sortBy');
var _values = require('lodash/values');
// import StreamTableCollection from "./StreamTableCollection.vue";
import StreamCardCollection from "./StreamCardCollection.vue";
import StreamMap from "./StreamMap.vue";
export default {
  name: "StreamCollection",
  data() {
    return {
      streams: [],
      pageNumber: 1,
      size: 10,
      error: null,
      searchSettings: {
        search: "",
        showMapView: false,
        showFavorites: false,
        regionId: " ",
        showFilterOptions: true,
        hideStreamsWithZeroCfs: false,
        hideStreamsWithoutUpdateInPast30Days: false,
        hideStreamsWithoutRecentUpdate: false,
        showOnlyStreamsWithTemp: false,
        size: 10,
      }
    };
  },

  components: {
    // StreamTableCollection,
    StreamCardCollection,
    StreamMap,
  },

  mounted() {
    this.fetchStreamData();
    this.searchSettings = JSON.parse(
      this.$ls.get("searchSettings", JSON.stringify(this.searchSettings))
    );
    if (this.searchSettings.size) {
      this.size = parseInt(this.searchSettings.size);
    }
    
  },

  updated() {
    this.searchSettings.size = this.size;
    this.$ls.set("searchSettings", JSON.stringify(this.searchSettings));
    this.$ls.set("streams", JSON.stringify(this.streams));
  },

  beforeDestory() {
    this.searchSettings.size = this.size;
    this.$ls.set("searchSettings", JSON.stringify(this.searchSettings));
    this.$ls.set("streams", JSON.stringify(this.streams));
  },

  computed: {
    filtersActive() {
      return (this.searchSettings.showFavorites || this.searchSettings.regionId != ' ' || this.searchSettings.hideStreamsWithZeroCfs || this.searchSettings.hideStreamsWithoutRecentUpdate) && !this.searchSettings.showFilterOptions;
    },
    searchData() {
      if (this.searchSettings.search.length > 1) {
        //  this.pageNumber = 1;
      }
      var self = this;
      let today = this.$moment();
      let returnData = [];
        returnData = this.streams.filter(function(s) {
          var include = true;

          if (self.searchSettings.showMapView && include) {
            include = s.location && s.location.latitude && s.location.longitude;
          }

          if (self.searchSettings.showFavorites && include) {
            include = s.isFavorite;
          }
          var hasDiv = true;
          if (self.searchSettings.regionId != " " && include) {
            hasDiv = s.div == self.searchSettings.regionId;
            include = s.div == self.searchSettings.regionId;
          }
           
          if (self.searchSettings.hideStreamsWithZeroCfs && include) {
            include = s.flowAmount && s.flowAmount > 0;
          }

          if (self.searchSettings.hideStreamsWithoutRecentUpdate && include) {
            include = !(today.diff(self.$moment(s.date_time), "days") > 30);
          }

          if (self.searchSettings.showOnlyStreamsWithTemp && include) {
            include =  s.temperature.value ? true : false;
          }

          if (self.searchSettings.search) {
            if (s.station_name) {
              if (!s.county) {
                s.county = "";
              }

              //|| s.county.toLowerCase().indexOf(self.search.toLowerCase()) != -1
              return (
                include &&
                (s.station_name
                  .toLowerCase()
                  .indexOf(self.searchSettings.search.toLowerCase()) != -1 &&
                  hasDiv)
              );
            }
          } else {
            return include;
          }
        });
    
      if (this.searchSettings.search) {
        return _orderBy(
          returnData,
          ["station_status", "data_source", "date_time", "county"],
          ["asc", "asc", "desc", "desc"]
        );
      } else {
        return _sortBy(
          _orderBy(
            returnData,
            ["station_status", "data_source", "date_time"],
            ["asc", "asc", "desc"]
          ),
          "station_name"
        );
      }
    },
    pagedData() {
      var start = this.pageNumber * this.size,
        end = start + this.size;

      if (this.pageNumber === 1) {
        start = 0;
        end = this.size;
      }

      return this.searchData.slice(start, end);
    },

    pageCount() {
      let l = this.searchData.length,
        s = this.size;
      if (s == l || s > l) {
        return Math.floor(l / s) + 1;
      }

      if (l % s == 0) {
        //'reminder is zero, just need to subtract 1 so theres not an extra page'
        return Math.floor(l / s) - 1;
      }

      return Math.floor(l / s);
    }
  },

  methods: {
    searchChanged() {
      if (this.searchSettings.search.length > 3) {
        this.$ga.event({
          eventCategory: "search",
          eventAction: "searchStreams",
          eventLabel: this.searchSettings.search
        });
      }
      this.pageNumber = 1;
    },

    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },

    getHistory(station) {
      fetch(waterApi.urls.codataForYear() + station, {
        // method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "X-App-Token": apiTokens.codata.appToken
        }
      })
        .then(response => response.json())
        .catch(error => (this.error = error));
      //  .then(response => console.log(response));
    },
    fetchStreamData() {
      let expireCache = this.$ls.get("streams-cache-expire-date", null);
      //let cacheType = "default";
      if (expireCache) {
        expireCache = this.$moment(expireCache, "YYYY-MM-DD HH:mm");
        let currentDate = this.$moment();
        if (currentDate.isSameOrAfter(expireCache)) {
          this.$ls.set("streams", "[]");
        }
      }
      const favorites = JSON.parse(this.$ls.get("favoriteStreams", "[]"));
      let data = JSON.parse(this.$ls.get("streams", "[]"));
      if (data.length > 0) {
        data.forEach(function(val) {
          if (favorites.length > 0 && favorites.indexOf(val.stationId) != -1) {
            val.isFavorite = true;
          } else {
            val.isFavorite = false;
          }
        });
        this.streams = data;
      } else {
        waterApi.getCoRiverData().then(data => {
          var streamData = _values(data);
          streamData.forEach(function(val) {
            if (favorites.length > 0 && favorites.indexOf(val.stationId) != -1) {
              val.isFavorite = true;
            } else {
              val.isFavorite = false;
            }
          });
          this.streams = streamData;
          this.$ls.set("streams", JSON.stringify(this.streams));
          this.$ls.set(
            "streams-cache-expire-date",
            this.$moment()
              .add(30, "m")
              .format("YYYY-MM-DD HH:mm")
          );
          // this.usgs = data;
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul.dropdown-content.select-dropdown li span {
  color: #212121 !important;
}
.remove-bottom-margin {
  margin-bottom: 0px;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
