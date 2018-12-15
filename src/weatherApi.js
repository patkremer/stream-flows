'use strict';
import Vue from "vue";
import apiTokens from "./apiTokens";


export default {
    getWeatherUrl: function (lat, lon) {
        //
        //return this.weatherBase + 'forecast?lat=' + lat + '&lon=' + lon + this.appId + appId;
        return this.weatherBase + 'weather?lat=' + lat + '&lon=' + lon + this.appId + apiTokens.openWeatherMap;
    },

    getForecast: function(lat, lon) {
        return Vue.http.get(this.weatherBase + 'forecast?lat=' + lat + '&lon=' + lon + this.appId + apiTokens.openWeatherMap)
            .then(response => { return response.json() });
    },
    weatherBase: 'http://api.openweathermap.org/data/2.5/',
    appId: '&units=imperial&APPID=',

   
}