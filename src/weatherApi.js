'use strict';

export default {
    getWeatherUrl: function (lat, lon, appId) {
        return this.weatherBase + 'weather?lat=' + lat + '&lon=' + lon + this.appId + appId;
    },
    weatherBase: 'http://api.openweathermap.org/data/2.5/',
    appId: '&units=imperial&APPID=',

   
}