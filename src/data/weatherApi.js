"use strict";
import axios from "axios";
import apiTokens from "../apiTokens";
var _groupBy = require('lodash/groupBy');

export default {
  weatherBase: "http://api.openweathermap.org/data/2.5/",
  appId: "&units=imperial&APPID=",
  getWeather: function(lat, lon) {
    return axios.get(this.getWeatherUrl(lat, lon));
  },
  getWeatherUrl: function(lat, lon) {
    //
    //return this.weatherBase + 'forecast?lat=' + lat + '&lon=' + lon + this.appId + appId;
    return (
      this.weatherBase +
      "weather?lat=" +
      lat +
      "&lon=" +
      lon +
      this.appId +
      apiTokens.openWeatherMap
    );
  },

  parseForecastData: function (data) {
    for (let i = 0; i < data.list.length; i++) {
      var weatherData = data.list[i];
      weatherData.groupByDate = weatherData.dt_txt.split(' ')[0];
      data.list[i] = weatherData;
    }
    var groupBy = _groupBy(data.list, 'groupByDate');

    data.forecastsByDay = groupBy;
    return data;
  },

  getForecast: function(lat, lon) {
    var promise = new Promise((resolve, reject) => {
      axios.get(
        this.weatherBase +
          "forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          this.appId +
          apiTokens.openWeatherMap
      ).then(response => {
        let retval = this.parseForecastData(response.data);
        resolve(retval);
      })
      .catch(error => {
        reject(error);
      });

    });
    return promise;
    // .then(response => { return response.json() })
  }
};
