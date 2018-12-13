<template>
  <div class="streamCollection">
    <div class="row">
      <div class="col s12">Colorado Stream Flows
        <div class="switch">
          <label>
            Table Layout
            <input type="checkbox" v-model="layoutSetting">
            <span class="lever"></span>
            Grid Layout
          </label>
        </div>
      </div>
      <div class="col s12 input-field">
        <input v-model="search" id="stream_search" v-on:change="searchChanged($event)" class type="text" placeholder="Search">
        <label for="stream_search">Search Streams by name or county</label>
      </div>
    </div>

    <div class="row">
      <transition name="fade">
        <stream-card-collection v-if="layoutSetting" v-bind:streams.sync="pagedData"></stream-card-collection>
        <stream-table-collection v-else :streams="pagedData"></stream-table-collection>
      </transition>
    </div>

    <div class="row" v-if="streams.length > 0">
      <div class="col s3 m3 l2 xl2">
        <button
          class="btn-floating teal darken-2 waves-effect waves-light"
          type="button"
          v-bind:disabled="pageNumber==1"
          v-on:click="prevPage"
        >
          <i class="material-icons right">keyboard_arrow_left</i>
        </button>
        <button
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
        <label for="pageNumber">Page Number out of {{pageCount}}</label>
      </div>
    </div>
    <div v-else>
      <h3>Loading... Please wait</h3>
    </div>
  </div>
</template>

<script>
import waterApi from '../waterApi.js';
import apiTokens from '../apiTokens.js';
import _ from "lodash";
import StreamTableCollection from "./StreamTableCollection.vue";
import StreamCardCollection from "./StreamCardCollection.vue";


export default {
  name: "StreamCollection",
  data() {
    return {
      search: "",
      streams: [],
      pageNumber: 1,
      size: 10,
      error: null,
      layoutSetting: true
    };
  },

  components: {
    StreamTableCollection,
    StreamCardCollection
  },

  mounted() {
    this.fetchStreamData();
   
  },

  updated() {
    // eslint-disable-next-line no-undef
     M.updateTextFields();
  },

  computed: {
    searchData() {
      if (this.search.length > 1) {
      //  this.pageNumber = 1;
      }
    

      if (this.search) {
        var self = this;
        
        return _.orderBy(
          this.streams.filter(function(s) {
            if (s.station_name) {
              return s.station_name.toLowerCase().includes(self.search.toLowerCase()) || s.county.toLowerCase().includes(self.search.toLowerCase());
            }
          }),
          ["station_name", "county", "date_time"],
          ["asc", "asc", "desc"]
        );
      } else {
        return _.orderBy(
          this.streams.filter(function(s) {
            return s.flowAmount != 0;
          }),
          ["station_name", "county", "date_time"],
          ["asc", "asc", "desc"]
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
      if (this.search > 3) {
          this.$ga.event({
            eventCategory: 'searchQuery',
            eventAction: 'searchStreams',
            eventLabel: this.search,
          });
        }
    },
    track() {
      this.$ga.page('/');
      this.$ga.screenview({
        screenName: 'home',
      });
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
      let expireCache = this.$localStorage.get('streams-cache-expire-date', null);
      let cacheType = "default";
      if (expireCache) {
        expireCache = this.$moment(expireCache, 'YYYY-MM-DD HH:mm');
        let currentDate = this.$moment();
        if (currentDate.isSameOrAfter(expireCache)) {
          cacheType = "reload";
        }
      } else {
        cacheType = 'default'
        this.$localStorage.set("streams", '[]');
      }

      let data = JSON.parse(this.$localStorage.get("streams", '[]'));
      if (data.length > 0) {
        this.streams = data;
      } else {
        fetch(waterApi.urls.coData, {
          // method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: cacheType, // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "X-App-Token": apiTokens.codata.appToken
          }
        })
          .then(response => response.json())
          .catch(error => (this.error = error))
          .then(response => {
            // eslint-disable-next-line:no-console
            //response.data = JSON.parse(response.data);
            for (let index = 0; index < response.length; index++) {
              var s = response[index];
              s.id = index;
              s.weather = {};
              if (!s.county) {
                s.county = '';
              }
              if (s.amount && s.amount !== "-888.00") {
                // bad data, set to 0
                s.flowAmount = parseFloat(s.amount);
              } else {
                s.amount = "0.00";
                s.flowAmount = 0.0;
              }
              if (s.location && s.location.coordinates) {
                s.location.longitude = s.location.coordinates[0];
                s.location.latitude = s.location.coordinates[1];

              } else {
                  s.mapLink = '';
              }
              s.stationId = _.snakeCase(s.station_name);

              response[index] = s;
            }
            this.streams = response;
            this.$localStorage.set('streams-cache-expire-date', this.$moment().add(3, 'h').format('YYYY-MM-DD HH:mm'));
            //this.$localStorage.set("streams", JSON.stringify(this.streams));
          }); // parses response to JSON
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
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
}
</style>
