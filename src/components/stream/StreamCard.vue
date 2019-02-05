<template>
  <div class="card small stream-card">
    <div class="card-content">
      <span class="card-title">
        <a
          class="waves-effect waves-light"
          v-bind:class="{ 'teal-text': !stream.isFavorite, 'text-darken-2': !stream.isFavorite}"
          v-on:click="saveToFavorites()"
        >
          <i
            v-bind:class="{'amber-text': stream.isFavorite, 'text-accent-4': stream.isFavorite}"
            class="material-icons small"
          >star</i>
        </a>
        {{stream.station_name}}
        <!-- <small class="truncate">{{stream.stationId}}</small> -->
      </span>
      <div class="card-info">
        <div>
          <i class="material-icons left">waves</i>
          <b>{{stream.amount}} {{stream.units}},</b>
          {{stream.date_time | moment("from", "now") }}
          <span
            v-if="stream.county"
          >in {{stream.county}} County</span>
        </div>
        <div v-if="hasLatAndLong">
          <weather v-if="stream.weather.main" v-bind:weather="stream.weather"></weather>

          <a class="btn-flat btn-large weather-button" v-else v-on:click.once="getWeather(stream)">
            <i class="material-icons left">wb_cloudy</i>Show Current Weather
          </a>
        </div>
        <div v-if="hasLatAndLong">
          <a
            class="btn-large btn-flat weather-button activator"
            v-on:click.once="getForecastClick(stream)"
          >
            <i class="material-icons left">filter_drama</i>Show 5 Day Forecast
          </a>
        </div>
        <div>
          <span v-if="stream.station_status">
            <i class="material-icons left">info</i>
            {{stream.station_status}}
          </span>
        </div>
        <div>
        <small>   <a
        v-if="stream.http_linkage"
        v-on:click="viewSourceClick()"
        v-bind:href="stream.http_linkage"
        class="browser-default"
        target="_blank">Source: {{stream.data_source}}</a><span v-else>Source: {{stream.data_source}}</span></small>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">
        5 Day Weather Forecast
        <i class="material-icons right">close</i>
      </span>
      <weather-forecast v-bind:forecast.sync="forecast"></weather-forecast>
    </div>
    <div class="card-action center">
      <a
        class="btn-small btn-flat waves-effect waves-light teal-text text-darken-2"
        v-on:click="getMapClick()"
        v-if="getMapLink(stream)"
        target="_blank"
        v-bind:href="getMapLink(stream)"
      >
        <i class="material-icons left">my_location</i>Map
      </a>
      
      <a
        v-on:click="viewFlowHistory()"
        class="btn-small btn-flat waves-effect waves-light teal-text text-darken-2"
      >
        <i class="material-icons left">show_chart</i>
        History Chart
      </a>
    </div>
  </div>
</template>

<script>
import WeatherForecast from "../weather/WeatherForecast.vue";
import Weather from "../weather/Weather.vue";
import weatherApi from "../../data/weatherApi.js";
import _ from "lodash";
const fb = require("../../data/firebaseConfig.js");
import StreamHistoryModal from "./StreamHistoryModal.vue";

export default {
  name: "stream-card",
  data: function() {
    return {
      error: null,
      flowData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "My First dataset",
             borderColor: '#249EBF',
           // pointBackgroundColor: 'white',
            //borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            fill: false,
            data: []
          }
        ]
      }
    };
  },

  components: {
    WeatherForecast,
    Weather,
    StreamHistoryModal
  },

  props: {
    stream: {
      required: true
    }
  },

  computed: {
    hasLatAndLong() {
      return (
        this.stream.location &&
        this.stream.location.latitude &&
        this.stream.location.longitude
      );
    },
    forecast() {
      if (this.stream.forecast && this.stream.forecast.list) {
        return this.stream.forecast;
      } else {
        //this.stream.forecast = {};
        return null;
      }
    }
  },

  methods: {
    saveToFavorites() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "saveFavorite",
        eventLabel: this.stream.station_name
      });
      let favorites = JSON.parse(this.$ls.get("favoriteStreams", "[]"));
      let self = this;
      if (_.includes(favorites, this.stream.stationId)) {
        this.stream.isFavorite = false;
        _.remove(favorites, function(s) {
          return s === self.stream.stationId;
        });
      } else {
        this.stream.isFavorite = true;
        favorites.push(this.stream.stationId);
      }

      this.$ls.set("favoriteStreams", JSON.stringify(favorites));
    },

    getMapClick() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getMap",
        eventLabel: this.stream.station_name
      });
    },
    viewSourceClick() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "viewSourceClick",
        eventLabel: this.stream.station_name
      });
    },

    viewFlowHistory() {
      var flowHistory = [];
      var self = this;
      fb.flowsCollection
        .where("stationId", "==", this.stream.stationId)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            flowHistory.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
          });

          self.flowData = _.orderBy(flowHistory, {'date_time': 'desc'});
          self.flowData = self.flowData.slice(1).slice(-40);
          self.chartData.labels = _.map(self.flowData, function (f) {
            var dt = new Date(f.date_time);

            return dt.toDateString();
          });



          self.chartData.datasets[0].label = "Cfs";
          self.chartData.datasets[0].data = _.map(self.flowData, function (f) {
             f.amount = _.toNumber(f.amount);
            if (_.isNumber(f.amount)) {
              return f.amount;
            } else {
              console.log('flow is not a number', f.amount);
            }
            return 0;
          });


          self.$modal.show(
            StreamHistoryModal,
            { chartjsData: self.chartData, currentStream: self.stream },
            { height: 'auto', width: '95%'
            },
            null,
            {
              name: "stream-chart-modal",
              resizable: true,
              adaptive: true,
              scrollable: true,
             // clickToClose: false
            }
          );

        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });

      this.$ga.event({
        eventCategory: "click",
        eventAction: "viewFlowHistory",
        eventLabel: this.stream.station_name
      });
    },
    getMapLink(stream) {
      if (
        stream.location &&
        stream.location.latitude &&
        stream.location.longitude
      ) {
        return (
          "https://www.google.com/maps/search/?api=1&query=" +
          stream.location.latitude.toString() +
          "," +
          stream.location.longitude.toString()
        );
      } else {
        return "";
      }
    },
    getForecastClick() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getForecast",
        eventLabel: this.stream.station_name
      });
      //  if (!this.stream.forecast.list) {
      weatherApi
        .getForecast(
          this.stream.location.latitude,
          this.stream.location.longitude
        )
        .then(response => {
          this.stream.forecast = response;
        })
        .catch(error => (this.error = error));
      //}
    },
    getWeather() {
      this.$ga.event({
        eventCategory: "click",
        eventAction: "getWeather",
        //eventAction: "getWeather",
        eventLabel: this.stream.station_name
      });
      // console.log(stream, 'get weather');

      weatherApi
        .getWeather(
          this.stream.location.latitude,
          this.stream.location.longitude
        )
        .then(response => {
          this.stream.weather = response.data;
        })
        .catch(error => (this.error = error));
    }
  }
};
</script>

<style>
.weather-button {
  padding: 0;
  line-height: 30px;
  /* height: 28px; */
  display: inline;
  color: #343434 !important;
}
.card.stream-card {
  height: 350px;
}
.card .card-content .card-info {
  overflow: auto;
}
.card .card-content div {
  margin: 0;
  float: left;
  display: block;
  width: 100%;
  /* line-break: normal; */
}
.card .card-title {
  font-size: 20px;
}
</style>
