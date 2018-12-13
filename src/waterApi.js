'use strict';

export default {
    urls: {

        coData: "https://data.colorado.gov/resource/a97x-8zfv.json?station_type=Stream&station_status=Active&$limit=10000",
        usgs: "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=co&parameterCd=00060,00065&siteType=ST&siteStatus=active",
        usgsBase: "https://waterservices.usgs.gov/nwis/dv/?format=json&siteType=ST&siteStatus=active", // usgs_station_id 06714215&'
        usgsByStationForYear: function () {
            return this.usgsBase + "&period=P52W&sites=";
        },

        usgsByStationFor30Days: function () {
            return this.urls.usgsBase + "&period=P30D&sites=";
        },

        codataForYear: function () {
            // var startDate = '2017-11-10T00:00:00.000';
            // var endDate = '2018-11-09T00:00:00.000';
            // //where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'
            return this.coData + "&station_name=";
        }
    }
}