"use strict";
import axios from "axios";
import apiTokens from "../apiTokens";
const fb = require("./firebaseConfig.js");
var _snakeCase = require('lodash/trimEnd');
var _trimEnd = require('lodash/trimEnd');
var _orderBy = require('lodash/orderBy');
  /* <option value="1" >South Platte</option>
<option value="2" >Arkansas</option>
<option value="3" >Rio Grande</option>
<option value="4" >Gunnison</option>
<option value="5" >Colorado</option>
<option value="6" >Yampa/White</option>
<option value="7" >San Jaun/Dolores</option> */
export default {
  getWaterDrainage: function(div) {
    let name = "";

    switch (div) {
      case "1":
        name = "South Platte";
        break;
      case "2":
        name = "Arkansas";
        break;
      case "3":
        name = "Rio Grande";
        break;
      case "4":
        name = "Gunnison";
        break;
      case "5":
        name = "Colorado";
        break;
      case "6":
        name = "Yampa/White";
        break;
      case "7":
        name = "San Jaun/Dolores";
        break;
      default:
        name = "Unknown";
        break;
    }
    return name;
  },
  parseCoDataResponse: function(response, data) {
    //ar data = {};
    for (let index = 0; index < response.length; index++) {
      let s = response[index];

      s.id = index;
      s.weather = {};
      s.forecast = {};
      if (!s.county) {
        s.county = "";
      }
      s.stationId = _snakeCase(s.station_name);
      this.parseAmount(s);
      if (s.location && s.location.coordinates) {
        s.location.longitude = s.location.coordinates[0];
        s.location.latitude = s.location.coordinates[1];
      } else {
        s.mapLink = "";
      }

      this.checkDuplicatesAndAdd(data, s);

      //response[index] = s;
    }
    return data;
  },
  parseUsgsResponse: function(response, data) {
    let usgstimeseries = response.value.timeSeries;
    for (let index = 0; index < usgstimeseries.length; index++) {
      var s = usgstimeseries[index];
      var d = {};
      d.id = index + 1000;
      d.weather = {};
      d.forecast = {};
      d.usgs_station_id = s.sourceInfo.siteCode[0].value;
      d.station_name = _trimEnd(s.sourceInfo.siteName, ", CO");
      d.location = {};

      d.location.longitude = s.sourceInfo.geoLocation.geogLocation.longitude;
      d.location.latitude = s.sourceInfo.geoLocation.geogLocation.latitude;
      d.county = " ";
      d.units = "CFS";
      d.amount = s.values[0].value[0].value;
      d.date_time = s.values[0].value[0].dateTime;
      d.qualifiers = s.values[0].value[0].qualifiers.join(",");
      d.stationId = _snakeCase(d.station_name);
      d.fromUsgs = true;
      this.parseAmount(d);
      d.div = " ";
      d.http_linkage =
        "https://waterdata.usgs.gov/nwis/uv?" + d.usgs_station_id;
      d.data_source = "U.S. Geological Survey";
      //if (!d.qualifiers == "A") {
      this.checkDuplicatesAndAdd(data, d);

      // }
    }
    return data;
  },
  parseAmount(d) {
    // -999 and -888 are always negative
    if (
      d.amount &&
      !isNaN(Number(d.amount)) &&
      !(d.amount.indexOf("-999") != -1 || d.amount.indexOf("-888") != -1)
    ) {
      // bad data, set to 0
      d.flowAmount = Number(d.amount);
    } else {
      d.amount = "0.00";
      d.flowAmount = 0.0;
    }

    if (d.qualifiers) {
      if (d.qualifiers.indexOf("Ice") != -1) {
        d.amount = "Ice";
        d.units = "";
        d.flowAmount = 0.0;
      }
      if (d.qualifiers.indexOf("Ssn") != -1) {
        d.amount =
          d.amount == "Ice"
            ? d.amount + ", seasonally monitored"
            : "seasonally monitored";
        d.units = "";
        d.flowAmount = 0.0;
      }
    }
  },
  checkDuplicatesAndAdd: function(data, s) {
    // if the stationId exists in the dictionary, check to see if this qualifer has ice to overrite inactive data
    if (data[s.stationId]) {
      if (s.qualifiers && s.qualifiers.indexOf("Ice") != -1) {
        data[s.stationId].qualifiers = "Ice";
        data[s.stationId].amount = "Ice";
        data[s.stationId].units = "";
        data[s.stationId].flowAmount = 0;
        data[s.stationId].date_time = s.date_time;
      }
    } else {
      if (s.station_name.indexOf("ARF HEADGATE") === -1) {
        data[s.stationId] = s;
      }
    }
  },

  getChartDataFromFlowHistory(flowHistory, isMobileDevice) {
    var flowData = _orderBy(flowHistory, { date_time: "desc" });
    var chartData = {
      data: [],
      labels: []
    };
    //uncomment to only show recent history
    //if mobile or tablets only show 40 of the most recent record flows,
    //the chart doesn't look good if there's more
    if (isMobileDevice) {
      flowData = flowData.slice(1).slice(-40);
    } else if (flowData.length > 110) {
      flowData = flowData.slice(1).slice(-109);
    }

    chartData.labels = flowData.map(function(f) {
      var dt = new Date(f.date_time);
      return dt.toDateString();
    });

    chartData.data = flowData.map(function(f) {
      f.amount = Number(f.amount);
      if (!isNaN(f.amount)) {
        return f.amount;
      }
      return 0;
    });

    return chartData;
  },

  getFlowHistory(stream) {
    var promise = new Promise((resolve, reject) => {
      var flowHistory = [];

      fb.flowsCollection
        .where("stationId", "==", stream.stationId)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            flowHistory.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
          });
          resolve(flowHistory);
        })
        .catch(function(error) {
          reject(error);
          //  console.log("Error getting documents: ", error);
        });
    });
    
    return promise;
  },

  getCoRiverData: function() {
    let data = {};

    var promise = new Promise((resolve, reject) => {
      let header = this.urls.getCoDataHeader();

      let getCoData = axios.get(this.urls.coData, { headers: header });

      let getUsgsData = axios.get(this.urls.usgs);
      axios
        .all([getCoData, getUsgsData])
        .then(
          axios.spread(
            function(coData, usgsData) {
              // Both requests are now complete
              this.parseCoDataResponse(coData.data, data);
              this.parseUsgsResponse(usgsData.data, data);
              resolve(data);
            }.bind(this)
          )
        )
        .catch(error => {
          //console.log(error);

          reject(error);
        });
    });

    return promise;
  },
  urls: {
    codataBackup:
      "https://data.colorado.gov/resource/4yw9-a5y6.json?station_type=Stream&$limit=10000",
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
