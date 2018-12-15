"use strict";
import axios from "axios";
import apiTokens from "../apiTokens";

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

  getForecast: function(lat, lon) {
    return axios.get(
      this.weatherBase +
        "forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        this.appId +
        apiTokens.openWeatherMap
    );
    // .then(response => { return response.json() })
  }
};
