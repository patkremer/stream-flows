<template>
  <main-layout>
    <div class="row">
      <div class="s12">
        <h2>Data Charts with River Data</h2>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
         <GChart class="large-chart"
            type="ScatterChart"
            :data="chartData"
            :options="chartOptions"
            :settings="{ packages: ['corechart']}"
          />
      </div>
      <div class="col s12">
         <GChart class="large-chart"
            type="ScatterChart"
            :data="byDivisionChartData"
            :options="byDivisionChartOptions"
            :settings="{ packages: ['corechart']}"
          />
      </div>
    </div>  
  </main-layout>
  
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import waterApi from '../data/waterApi';
import { GChart } from 'vue-google-charts';
import _ from "lodash";
//pie chart
export default {
  name: 'charts',
  data() {
    return {
      processedData: {},
      streams: [],
      byDivisionChartData: [
        ['Drainage', 'Number of Streams'],
      ],
      byDivisionChartOptions: {
         chart: {
          title: 'Number of Rivers Per Drainage',
        }
      },
      chartData: [
        ['County', 'Number of Streams'],

      ],
      chartOptions: {
         chart: {
          title: 'Number of Rivers Per County',
        }
      }
    }
  },
  mounted() {
    let wordtreeData = [
      ['Phrases'],

    ]
    this.streams = JSON.parse(this.$ls.get('streams'), '[]');
     _.forEach(this.streams, function (value) {
       if (value.county != 'Unknown') {
        wordtreeData.push([value.station_name + ', ' + value.county]);
       }
       value.drainage = waterApi.getWaterDrainage(value.div);
    });
    let drainageData = [
        ['Drainage', 'Number of Streams'],
      ];
    let byDrainage = _.groupBy(this.streams, function (a) {
      return a.drainage;
    });
    let self = this;
     _.forEach(byDrainage, function (value, key) {
       if (key == 'N/A') {
         console.log(value);
       }
        self.byDivisionChartData.push([key, value.length]);
    });
    //self.byDivisionChartData = drainageData;
    //this.chartData = wordtreeData;
    this.processedData = _.groupBy(this.streams, function (a) {
      return a.county;
    });
    let pieChartData = [
       ['County', 'Number of Streams']
    ];
    
   
    _.forEach(this.processedData, function (value, key) {
      if (key != 'Unknown') {

        pieChartData.push([key, value.length]);
      }
    });
    this.chartData = pieChartData;
   // _.includes({ 'a': 1, 'b': 2 }, 1);
// => true
  },
  components: {
    MainLayout,
    GChart
  }
}
</script>
// https://www.chartjs.org/samples/latest/charts/pie.html
//https://vue-chartjs.org/guide/#creating-your-first-chart
<style>
.large-chart {
  min-width: 900px;
  min-height: 800px;
}
</style>
