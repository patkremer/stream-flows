<template>
  <div class="streamCollection">
    <div class="row">
      <div class="col s12 m12">
        <h3>Stream Flows</h3>
      </div>
      <!-- <div class="col s12">
        <div class="switch col s4">
          <label>
            Table Layout
            <input type="checkbox" v-model="layoutSetting">
            <span class="lever"></span>
            Grid Layout
          </label>
        </div>
         
      </div> -->
      <div class="col s12 input-field">
        <i class="material-icons prefix">search</i>
        <input v-model="search" id="stream_search" v-on:change="searchChanged($event)" class type="text" placeholder="Search">
        <label for="stream_search">Search Streams by name</label>
      </div>
        <div class="col s12">
          <label>Filter By Drainage</label>
          <select class="browser-default"  v-model="regionId">
            <option value=" " >None</option>
            <option value="1" >South Platte</option>
            <option value="2" >Arkansas</option>
            <option value="3" >Rio Grande</option>
            <option value="4" >Gunnison</option>
            <option value="5" >Colorado</option>
            <option value="6" >Yampa/White</option>
            <option value="7" >San Jaun/Dolores</option>
          </select>
        </div>
      
     
    </div>

    <div class="row" id="streamCollections">
      <transition name="fade">
        <stream-card-collection v-if="layoutSetting" v-bind:streams.sync="pagedData"></stream-card-collection>
        <stream-table-collection v-else :streams="pagedData"></stream-table-collection>
      </transition>
    </div>

    <div class="row" v-if="streams.length > 0">
      <div class="col s3 m3 l2 xl2">
        <button v-scroll-to="'#stream_search'"
          class="btn-floating teal darken-2 waves-effect waves-light"
          type="button"
          v-bind:disabled="pageNumber==1"
          v-on:click="prevPage"
        >
          <i class="material-icons right">keyboard_arrow_left</i>
        </button>
        <button v-scroll-to="'#stream_search'"
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
import waterApi from '../../lib/waterApi.js';
import apiTokens from '../../apiTokens.js';
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
      layoutSetting: true, 
      regionId: ' '
    };
  },

  components: {
    StreamTableCollection,
    StreamCardCollection
  },

  mounted() {
    
    this.fetchStreamData();
    this.search = this.$ls.get('searchValue', '');
    this.regionId = this.$ls.get('searchRegion', ' ');
  },

  updated() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    this.$ls.set('searchValue', this.search);
    this.$ls.set('searchRegion', this.regionId);
  },

  computed: {
    searchData() {
      if (this.search.length > 1) {
      //  this.pageNumber = 1;
      }
      var self = this;
      let today = this.$moment();
      let returnData = [];
      if (this.search) {
        
          returnData = this.streams.filter(function(s) {
            var include =  !(self.$moment(s.date_time).diff(today, 'days') <= -120);
            var hasDiv = true;
            if (self.regionId != ' ') {
              hasDiv = s.div == self.regionId;
            } 
            if (s.station_name) {
              if (!s.county) {
                s.county = '';
              }
              //|| s.county.toLowerCase().indexOf(self.search.toLowerCase()) != -1 
              return include && (s.station_name.toLowerCase().indexOf(self.search.toLowerCase()) != -1 && hasDiv);
            }
          });
      } else {
          returnData = this.streams.filter(function(s) {

            var include =  !(self.$moment(s.date_time).diff(today, 'days') <= -120);

            if (self.regionId != ' ') {
              return include && s.div == self.regionId;
            }
            return include;
          });
      }
      if (this.search) {
        return  _.orderBy(returnData,
          [ 'station_status', "data_source", "date_time", 'county'],
          ["asc",'asc', "desc",'desc']
        );
      } else {
        return  _.sortBy(_.orderBy(returnData,
          [ 'station_status', "data_source", "date_time"],
          ["asc",'asc', "desc"]
        ), 'station_name');
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
      if (this.search.length > 3) {
        this.$ga.event({
          eventCategory: "search",
          eventAction: "searchStreams",
          eventLabel: this.search
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
      

      let expireCache = this.$ls.get('streams-cache-expire-date', null);
     //let cacheType = "default";
      if (expireCache) {
        expireCache = this.$moment(expireCache, 'YYYY-MM-DD HH:mm');
        let currentDate = this.$moment();
        if (currentDate.isSameOrAfter(expireCache)) {
          this.$ls.set("streams", '[]');
        }
      }

      let data = JSON.parse(this.$ls.get("streams", '[]'));
      if (data.length > 0) {
        this.streams = data;
    
      } else {
        waterApi.getCoRiverData()
        .then(data => {
          this.streams = _.values(data);
          this.$ls.set("streams", JSON.stringify(this.streams));
          this.$ls.set('streams-cache-expire-date', this.$moment().add(1, 'h').format('YYYY-MM-DD HH:mm'));
        // this.usgs = data;
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
