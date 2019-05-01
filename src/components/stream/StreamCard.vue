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
        
          <span v-if="stream.temperature.value">
            , <b>water temperature {{stream.temperature.fahrenheit}}&#176;F</b>
          </span>
          <span
          v-else
        ><span v-if="stream.county && stream.county != ' '">in {{stream.county}} County</span></span>
        </div>
        <div v-if="hasLatAndLong">
          <weather-day v-if="stream.weather.main" v-bind:weather="stream.weather"></weather-day>
          <weather-button v-else v-on:click.once="getWeather"></weather-button>
          <div>
            <weather-button v-on:click.once="getForecastClick" class="activator">Show 5 Day Forecast
              <template v-slot:icon>filter_drama</template>
            </weather-button>
          </div>
        </div>
        <div>
          <span v-if="stream.station_status">
            <i class="material-icons left">info</i>
            {{stream.station_status}}
          </span>
        </div>
        <div>
          <small>
            <a
              v-if="stream.http_linkage"
              v-on:click="viewSourceClick()"
              v-bind:href="stream.http_linkage"
              class="browser-default"
              target="_blank"
            >Source: {{stream.data_source}}</a>
            <span v-else>Source: {{stream.data_source}}</span>
          </small>
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
      <flat-link-button
        v-if="getMapLink"
        v-bind:href="getMapLink"
        v-on:click="getMapClick"
        target="_blank"
      >Map
        <template v-slot:icon>my_location</template>
      </flat-link-button>

      <flat-link-button v-on:click="viewFlowHistory">Chart
        <template v-slot:icon>show_chart</template>
      </flat-link-button>
    </div>
  </div>
</template>

<script>
import WeatherForecast from "../weather/WeatherForecast.vue";
import WeatherDay from "../weather/WeatherDay.vue";
import WeatherButton from "../weather/WeatherButton.vue";
import FlatLinkButton from "../ui/FlatLinkButton.vue";
import StreamHistoryModal from "./StreamHistoryModal.vue";
import waterApi from "../../data/waterApi";
import chartDefaultConfig from "../../data/chartDefaultConfig";
import weatherApi from "../../data/weatherApi.js";


export default {
  name: "stream-card",
  data: function() {
    return {
      error: null,
      flowData: [],
      chartOptions: {},
      chartData: {}
    };
  },

  components: {
    WeatherForecast,
    WeatherDay,
    WeatherButton,
    FlatLinkButton
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
    },
    getMapLink() {
      if (
        this.stream.location &&
        this.stream.location.latitude &&
        this.stream.location.longitude
      ) {
        return (
          "https://www.google.com/maps/search/?api=1&query=" +
          this.stream.location.latitude.toString() +
          "," +
          this.stream.location.longitude.toString()
        );
      } else {
        return "";
      }
    }
  },

  methods: {
    saveToFavorites() {
      this.trackClick("saveFavorite_" + this.stream.station_name);

      let favorites = JSON.parse(this.$ls.get("favoriteStreams", "[]"));
      var index = favorites.indexOf(this.stream.stationId);
      if (index > -1) {
        this.stream.isFavorite = false;
        favorites.splice(index, 1);
      } else {
        this.stream.isFavorite = true;
        favorites.push(this.stream.stationId);
      }

      this.$ls.set("favoriteStreams", JSON.stringify(favorites));
    },

    trackClick(action) {
      this.$ga.event({
        eventCategory: "click",
        eventAction: action,
        eventLabel: this.stream.station_name
      });
    },
    getMapClick() {
      this.trackClick("getMap_" + this.stream.station_name);
    },
    viewSourceClick() {
      this.trackClick("viewSourceClick_" + this.stream.station_name);
    },

    viewFlowHistory(e) {
      e.preventDefault();
      this.trackClick("viewFlowHistory_" + this.stream.station_name);

      var flowHistory = [];
      var self = this;
      waterApi
        .getFlowHistory(this.stream)
        .then(data => {
          flowHistory = data;

          var _chartData = waterApi.getChartDataFromFlowHistory(
            flowHistory,
            self.$mobileDeviceAndTabletCheck()
          );

          self.chartOptions = chartDefaultConfig.streamChartConfig.getOptions();
          self.chartData = chartDefaultConfig.streamChartConfig.getChartData();

          self.chartData.labels = _chartData.labels;

          self.chartData.datasets[0].data = _chartData.data;

          // Show modal and pass in chart data
          self.$modal.show(
            StreamHistoryModal,
            {
              chartjsData: self.chartData,
              chartOptions: self.chartOptions,
              currentStream: self.stream
            },
            { height: "auto", width: "95%" },
            null,
            {
              name: "stream-chart-modal",
              resizable: true,
              adaptive: true,
              scrollable: true
              // clickToClose: false
            }
          );
        })
        .catch(function(error) {
          this.error = error;
        });
    },

    getForecastClick() {
      this.trackClick("getForecast_" + this.stream.station_name);

      weatherApi
        .getForecast(
          this.stream.location.latitude,
          this.stream.location.longitude
        )
        .then(response => {
          this.stream.forecast = response;
        })
        .catch(error => (this.error = error));
    },
    getWeather() {
      this.trackClick("getWeather_" + this.stream.station_name);

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
