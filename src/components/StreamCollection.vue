<template>
  <div class="streamCollection center">
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
        <input v-model="search" id="stream_search" class type="text" placeholder="Search">
        <label for="stream_search">Search Streams</label>
      </div>
    </div>

    <div class="row">
      <transition name="fade">
        <stream-card-collection v-if="layoutSetting" :streams="searchData"></stream-card-collection>
        <stream-table-collection v-else :streams="searchData"></stream-table-collection>
      </transition>
    </div>

    <div class="row">
      <div class="col s3 m3 l2 xl2">
        <button
          class="btn-floating blue darken-4 waves-effect waves-light"
          type="button"
          v-bind:disabled="pageNumber==1"
          v-on:click="prevPage"
        >
          <i class="material-icons right">keyboard_arrow_left</i>
        </button>
        <button
          class="btn-floating blue darken-4 waves-effect waves-light"
          type="button"
          v-bind:disabled="pageNumber >= pageCount -1"
          v-on:click="nextPage"
        >
          <i class="material-icons right">keyboard_arrow_right</i>
        </button>
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
        <label for="page_size">Page size</label>
      </div>
      <div class="input-field col s3 m3 l3 xl3">
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
  </div>
</template>

<script>
import _ from "lodash";
import StreamTableCollection from "./StreamTableCollection.vue";
import StreamCardCollection from "./StreamCardCollection.vue";

const urls = {
  tokens: {
    coDataAppToken: "7ck7cEsIPEeGNrewi8AgCKJnM"
  },
  coData:
    "https://data.colorado.gov/resource/a97x-8zfv.json?station_type=Stream&$limit=10000&$where=amount > 0.01",
  usgs:
    "https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&stateCd=co&parameterCd=00060,00065&siteType=ST&siteStatus=active",
  usgsBase:
    "https://waterservices.usgs.gov/nwis/dv/?format=json&siteType=ST&siteStatus=active", // usgs_station_id 06714215&'
  usgsByStationForYear: function() {
    return this.usgsBase + "&period=P52W&sites=";
  },

  usgsByStationFor30Days: function() {
    return urls.usgsBase + "&period=P30D&sites=";
  },

  codataForYear: function() {
    // var startDate = '2017-11-10T00:00:00.000';
    // var endDate = '2018-11-09T00:00:00.000';
    // //where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'
    return this.coData + "&station_name=";
  }
};

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
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },

  computed: {
    searchData() {
      if (this.search.length > 1) {
        //this.pageNumber = 1;
      }

      var start = this.pageNumber * this.size,
        end = start + this.size;

      if (this.pageNumber === 1) {
        start = 0;
        end = this.size;
      }

      if (this.search) {
        var self = this;
        return _.orderBy(
          this.streams.filter(function(s) {
            if (s.station_name) {
              return _.includes(
                s.station_name.toLowerCase(),
                self.search.toLowerCase()
              );
            }
            
          }),
          ["amount", "station_name"],
          ["desc", "asc"]
        ).slice(start, end);
      } else {
        return _.orderBy(
          this.streams,
          ["amount", "station_name"],
          ["desc", "asc"]
        ).slice(start, end);
      }
    },
    pageCount() {
      let l = this.streams.length,
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
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    getHistory(station) {
      fetch(urls.codataForYear() + station, {
        // method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "X-App-Token": urls.tokens.coDataAppToken
        }
      })
        .then(response => response.json())
        .catch(error => (this.error = error));
      //  .then(response => console.log(response));
    },
    fetchStreamData() {
      let data = this.$localStorage.get("streams", null);
      if (data) {
        this.streams = JSON.parse(data);
      } else {
        fetch(urls.coData, {
          // method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "X-App-Token": urls.tokens.coDataAppToken
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
            this.$localStorage.set("streams", JSON.stringify(this.streams));
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
