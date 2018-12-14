"use strict";
import Vue from "vue";
import apiTokens from "./apiTokens";
import _ from "lodash";

export default {
  parseCoDataResponse: function(response, data) {
    //ar data = {};
    for (let index = 0; index < response.length; index++) {
      let s = response[index];

      s.id = index;
      s.weather = {};
      if (!s.county) {
        s.county = "";
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
        s.mapLink = "";
      }
      s.stationId = _.snakeCase(s.station_name);

      this.checkduplicates(data, s);

      //response[index] = s;
    }
    return data;
  },

  checkduplicates: function(data, s) {
    
    if (data[s.stationId]) {
      if (s.qualifiers && s.qualifiers.indexOf("Ice") != -1) {
        s.amount = "Ice";
        s.units = "";
        s.flowAmount = 0.0;
        data[s.stationId].qualifiers = "Ice";
        data[s.stationId].amount = "Ice";
        data[s.stationId].units = "";
        data[s.stationId].flowAmount = 0;
        data[s.stationId].date_time = s.date_time;
      }
      //   if (!data[s.stationId].duplicates) {

      //     data[s.stationId].duplicates = [];
      //   }
      //   if (s.fromUsgs && data[s.stationId].div && !s.div) {
      //       s.div = data[s.stationId].div;
      //   }
      //   data[s.stationId].duplicates.push(s);
    } else {
      if (s.qualifiers && s.qualifiers.indexOf("Ice") != -1) {
        s.amount = "Ice";
        s.units = "";
        s.flowAmount = 0.0;
      }

      if (s.amount.indexOf('-999')  != -1 || s.amount.indexOf('-888')  != -1) {
        s.amount = 'Ice or Inactive';
        s.units = "";
        s.flowAmount = 0.0;
      }

      data[s.stationId] = s;
    }
  },

  parseUsgsResponse: function(response, data) {
    let usgstimeseries = response.value.timeSeries;
    for (let index = 0; index < usgstimeseries.length; index++) {
      var s = usgstimeseries[index];
      var d = {};
      d.id = index + 1000;
      d.weather = {};
      d.usgs_station_id = s.sourceInfo.siteCode[0].value;
      d.station_name = _.trimEnd(s.sourceInfo.siteName, ", CO");
      d.location = {};

      d.location.longitude = s.sourceInfo.geoLocation.geogLocation.longitude;
      d.location.latitude = s.sourceInfo.geoLocation.geogLocation.latitude;

      d.units = "CFS";
      d.amount = s.values[0].value[0].value;
      d.date_time = s.values[0].value[0].dateTime;
      d.qualifiers = s.values[0].value[0].qualifiers.join(",");
      d.stationId = _.snakeCase(d.station_name);
      d.fromUsgs = true;
      if (d.amount) {
        // bad data, set to 0
        d.flowAmount = parseFloat(s.amount);
      } else {
        d.amount = "0.00";
        d.flowAmount = 0.0;
      }
      d.div = " ";
      d.http_linkage =
        "https://waterdata.usgs.gov/nwis/uv?" + d.usgs_station_id;
      d.data_source = "U.S. Geological Survey";
      //if (!d.qualifiers == "A") {
      this.checkduplicates(data, d);

      // }
    }
    return data;
  },
  getCoRiverData: function() {
    let data = [];

    var promise = new Promise((resolve, reject) => {
      let header = this.urls.getCoDataHeader();
      let coData = Vue.http
        .get(this.urls.coData, { headers: header })
        .then(response => {
          return response.json();
        });

      let usgsData = Vue.http.get(this.urls.usgs).then(response => {
        return response.json();
      });

      Promise.all([coData, usgsData])
        .then(responses => {
          data = this.parseCoDataResponse(responses[0], data);
          data = this.parseUsgsResponse(responses[1], data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
          //console.error(error);
        });
    });

    return promise;
  },
  urls: {
    coData:
      "https://data.colorado.gov/resource/a97x-8zfv.json?station_type=Stream&$limit=10000",
    usgs:
      "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=co&parameterCd=00060,00065&siteType=ST&siteStatus=active",
    usgsBase:
      "https://waterservices.usgs.gov/nwis/dv/?format=json&siteType=ST&siteStatus=active", // usgs_station_id 06714215&'
    usgsByStationForYear: function() {
      return this.usgsBase + "&period=P52W&sites=";
    },

    usgsByStationFor30Days: function() {
      return this.urls.usgsBase + "&period=P30D&sites=";
    },

    codataForYear: function() {
      // var startDate = '2017-11-10T00:00:00.000';
      // var endDate = '2018-11-09T00:00:00.000';
      // //where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'
      return this.coData + "&station_name=";
    },
    getCoDataHeader: function() {
      return { "X-App-Token": apiTokens.codata.appToken };
    }
  }
};
