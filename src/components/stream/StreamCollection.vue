<template>
  <div class="streamCollection">
    <div class="row remove-bottom-margin">
      <div class="col s12 m12">
            <svg class="left"
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              style="enable-background:new 0 0 1000 1000;"
              xml:space="preserve"
            >
              <path
                class="st0"
                d="M499.2,16c-9.5,16.2-13.7,35.7-5.2,55.8c6.2,14.7,17.9,26.8,30.2,39.7c10.9,11.3,22.1,23,30.6,37.3
	c25.6,43.3,17.4,80.4,0.9,113.5c86.1,15,156.6,75.4,185.8,155.7l229.8-79.5C904.5,150.3,725,15.6,514,15.6
	C509,15.6,504.1,15.8,499.2,16z"
              ></path>
              <path
                class="st0"
                d="M208.6,850.2l-2-3.5c-20.9-36.1-40.6-70.3-34.9-117.8c3.8-31.6,16.4-60.4,28.5-88.3
	c14.1-32.3,27.4-62.7,26.7-95.4c-0.5-27.7-14-52.5-28.3-78.8c-18.7-34.5-38.1-70.1-30-115.2c5.5-30.4,21.6-56.5,37.2-81.7
	c28.4-45.8,44.5-76,20.1-117.3c-5.4-9.1-12.7-17.4-20.7-25.8C97.6,215.5,29,350,29,500.6c0,160.2,77.7,302.2,197.4,390.5
	C222.3,877.5,216.4,863.8,208.6,850.2z"
              ></path>
              <path
                class="st0"
                d="M514,742.6c-3,0-5.9-0.1-8.8-0.2c-0.2,1.1-0.4,2.2-0.5,3.3c-4.4,36.8,11.1,63.8,30.8,97.8l2,3.5
	c25.9,45,34.2,92,25.4,136.1c189.2-19,346.3-146.6,408-319.6l-229-81.7C708.6,675.5,619.1,742.6,514,742.6z"
              ></path>
              <path
                class="st1"
                d="M555.6,262.4c-6.4,12.9-14,25.2-21.4,37.1c-14.7,23.7-28.5,46-32.9,70.4c-6.1,34,9.7,63.2,26.5,94.1
	c15.5,28.5,31.5,58,32.2,93.5c0.8,39.7-14.6,74.9-29.4,108.9c-11.3,25.8-21.9,50.3-25.6,75.9c2.9,0.1,5.9,0.2,8.8,0.2
	c133.6,0,241.9-108.3,241.9-241.9C755.9,381.2,669.4,282.1,555.6,262.4z"
              ></path>
              <path
                class="st2"
                d="M521,258.8c18.8-33.5,26-59.9,6-93.7c-6.6-11.1-16-21-26-31.4c-13.9-14.4-28.2-29.3-36.7-49.5
	c-9-21.4-9.2-44.3-1.7-65.9c-85.8,9.1-164.9,40.6-231.5,88.5c8.2,8.8,16.3,18.2,22.7,29.1c35.6,60.2,5.8,108.3-20.5,150.7
	c-14.7,23.7-28.5,46-32.9,70.4c-6.1,34,9.8,63.2,26.5,94.1c15.5,28.5,31.5,58,32.2,93.5c0.8,39.7-14.6,74.9-29.4,108.9
	c-11.7,26.9-22.8,52.3-26.1,79.2c-4.4,36.8,11.1,63.8,30.8,97.8l2,3.5c15.6,27.1,24.7,54.8,27.6,82.3c73,43.9,158.4,69.3,249.8,69.3
	c5.2,0,10.3-0.1,15.4-0.3c10.3-39,3.9-81.1-19.8-122.3l-2-3.5c-20.9-36.1-40.6-70.3-34.9-117.8c0.1-0.9,0.3-1.8,0.4-2.7
	c4.2-30.5,16.3-58.5,28.1-85.6c14.1-32.3,27.4-62.7,26.7-95.4c-0.5-27.7-14-52.5-28.3-78.8c-18.7-34.5-38.1-70.1-30-115.2
	c5.5-30.4,21.6-56.5,37.2-81.7C512,274.1,516.8,266.3,521,258.8"
              ></path>
            </svg><h3> Stream Flows</h3>
      </div>

      <div class="col s12 input-field">
        <i class="material-icons prefix">search</i>
        <input
          v-model="searchSettings.search"
          id="stream_search"
          v-on:change="searchChanged($event)"
          class
          type="text"
          placeholder="Search"
        >
        <label for="stream_search">Search Streams by name</label>
        <span class="helper-text">
         
          <span
            v-if="(searchSettings.showFavorites || searchSettings.regionId != ' ') && !searchSettings.showFilterOptions"
          >Filters Active</span>
          <button
            class="btn-flat btn-small waves-effect waves-light right"
            v-bind:class="{teal: (searchSettings.showFavorites || searchSettings.regionId != ' ')}"
            v-on:click="searchSettings.showFilterOptions = !searchSettings.showFilterOptions;"
          >
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
        <div class="row">
          <div class="col s12 m12">
            <label>
              <input type="checkbox" checked="checked" v-model="searchSettings.showFavorites">
              <span>Show Favorites (click or tap stars to favorite!)</span>
            </label>
          </div>
        </div>
        <div class="col s12 m12">
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

    <div class="row" id="streamCollections">
      <transition name="fade">
        <stream-card-collection v-bind:streams.sync="pagedData"></stream-card-collection>
        <!-- <stream-table-collection v-else :streams="pagedData"></stream-table-collection> -->
      </transition>
    </div>

    <div class="row" v-if="streams.length > 0">
      <div class="col s3 m3 l2 xl2">
        <button
          v-scroll-to="'#stream_search'"
          class="btn-floating teal darken-2 waves-effect waves-light"
          type="button"
          v-bind:disabled="pageNumber==1"
          v-on:click="prevPage"
        >
          <i class="material-icons right">keyboard_arrow_left</i>
        </button>
        <button
          v-scroll-to="'#stream_search'"
          class="btn-floating teal darken-2 waves-effect waves-light"
          type="button"
          v-bind:disabled="pageNumber >= pageCount"
          v-on:click="nextPage"
        >
          <i class="material-icons right">keyboard_arrow_right</i>
        </button>
      </div>
      <div class="input-field active col s2 m2 l1 xl1">
        <input
          v-model.number="size"
          id="page_size"
          class="validate"
          required
          min="1"
          max="500"
          type="number"
        >
        <label for="page_size">Page size</label>
      </div>
      <div class="input-field active col s3 m3 l3 xl3">
        <input
          v-model.number="pageNumber"
          id="pageNumber"
          class="validate"
          required
          min="1"
          v-bind:max="pageCount"
          type="number"
        >
        <label for="pageNumber">Page Number</label>
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
</template>

<script>
import waterApi from "../../data/waterApi.js";
import apiTokens from "../../apiTokens.js";
import _ from "lodash";
// import StreamTableCollection from "./StreamTableCollection.vue";
import StreamCardCollection from "./StreamCardCollection.vue";

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
        showFavorites: false,
        regionId: " ",
        showFilterOptions: true
      }
    };
  },

  components: {
    // StreamTableCollection,
    StreamCardCollection
  },

  mounted() {
    this.fetchStreamData();
    this.searchSettings = JSON.parse(
      this.$ls.get("searchSettings", JSON.stringify(this.searchSettings))
    );
  
  },

  updated() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    this.$ls.set("searchSettings", JSON.stringify(this.searchSettings));
    this.$ls.set("streams", JSON.stringify(this.streams));
  },

  beforeDestory() {
    this.$ls.set("searchSettings", JSON.stringify(this.searchSettings));
    this.$ls.set("streams", JSON.stringify(this.streams));
  },

  computed: {
    searchData() {
      if (this.searchSettings.search.length > 1) {
        //  this.pageNumber = 1;
      }
      var self = this;
      let today = this.$moment();
      let returnData = [];
      if (this.searchSettings.search) {
        returnData = this.streams.filter(function(s) {
          var include = !(today.diff(self.$moment(s.date_time), "days") > 30);
          if (self.searchSettings.showFavorites) {
            include = s.isFavorite;
          }
          var hasDiv = true;
          if (self.searchSettings.regionId != " ") {
            hasDiv = s.div == self.searchSettings.regionId;
          }
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
        });
      } else {
        returnData = this.streams.filter(function(s) {
          var include = !(today.diff(self.$moment(s.date_time), "days") > 30);

          if (self.searchSettings.showFavorites) {
            include = s.isFavorite;
          }

          if (self.searchSettings.regionId != " ") {
            return include && s.div == self.searchSettings.regionId;
          }
          return include;
        });
      }
      if (this.searchSettings.search) {
        return _.orderBy(
          returnData,
          ["station_status", "data_source", "date_time", "county"],
          ["asc", "asc", "desc", "desc"]
        );
      } else {
        return _.sortBy(
          _.orderBy(
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
        _.forEach(data, function(val) {
          if (favorites.length > 0 && _.includes(favorites, val.stationId)) {
            val.isFavorite = true;
          } else {
            val.isFavorite = false;
          }
        });
        this.streams = data;
      } else {
        waterApi.getCoRiverData().then(data => {
          var streamData = _.values(data);
          _.forEach(streamData, function(val) {
            if (favorites.length > 0 && _.includes(favorites, val.stationId)) {
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
              .add(2, "h")
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
