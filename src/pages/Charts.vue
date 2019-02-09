<template>
  <main-layout>
  
    <div class="row white">
      <div class="col s12">
         <!-- <GChart class="large-chart"
            type="ScatterChart"
            :data="chartData"
            :options="chartOptions"
            :settings="{ packages: ['scatter']}"
            :createChart="(el, google) => new google.charts.Scatter(el)"
          />
      </div>
     <div class="col s12">
         <GChart class="large-chart"
            type="BarChart"
            :data="byDivisionChartData"
            :options="byDivisionChartOptions"
            :settings="{ packages: ['bar']}"
            :createChart="(el, google) => new google.charts.Bar(el)"
          />
      </div> -->
      <!-- <div class="col s12">
         <GChart class="large-chart"
            type="BarChart"
            :data="totalDrainageCfsChartData"
            :options="totalDrainageCfsChartOptions"
            :settings="{ packages: ['bar']}"
             :createChart="(el, google) => new google.charts.Bar(el)"
          /> -->
      </div> 
    </div>  
  </main-layout>
  
</template> 

<script>
//import Vue from 'vue';
import MainLayout from "../layouts/Main.vue";
//import waterApi from '../data/waterApi';
//import _ from "lodash";
//pie chart
export default {
  name: 'charts',
  methods: {
    track() {
      this.$ga.page("/charts");
      this.$ga.screenview({
        screenName: "charts"
      });
    }
  },
  data() {
    return {
      processedData: {},
      streams: [],
      byDivisionChartData: [
        ['Drainage', 'Gauges'],
      ],
      byDivisionChartOptions: {
         bars: 'horizontal',
         chart: {
          title: 'Number of Stream Gauges Per Drainage',
          bars: 'horizontal'
        }
      },
      totalDrainageCfsChartData: [
        ['Drainage', 'cfs', 'gauges'],
      ],
      totalDrainageCfsChartOptions: {
         bars: 'horizontal',
         chart: {
          title: 'Total CFS and Gauges Per Drainage',
          bars: 'horizontal'
        },
         series: {
            0: { axis: 'cfs' }, // Bind series 0 to an axis named 'distance'.
            1: { axis: 'gauges' } // Bind series 1 to an axis named 'brightness'.
          },
          axes: {
            x: {
              cfs: {label: 'cfs', side: 'top'}, // Bottom x-axis.
              gauges: {label: 'gauges'} // Top x-axis.
            }
          }
      },
      chartData: [
        ['County', 'Gauges'],

      ],
      chartOptions: {

         chart: {
          title: 'Stream Gauges Per County',
          subtitle: '',
        }
      }
    }
  },
  mounted() {
    this.track();
    // let wordtreeData = [
    //   ['Phrases'],

    // ]
    // this.streams = JSON.parse(this.$ls.get('streams'), '[]');
    //  let today = Vue.moment();
    //  _.forEach(this.streams, function (value) {
    //    if (today.diff(Vue.moment(value.date_time),'days') > 10) {
    //       value.flowAmount = 0;
    //    }
    //    if (value.station_name == 'RIDGES BASIN DAM ON LAKE NIGHTHORSE NEAR DURANGO') {
    //      value.flowAmount = 0;
    //    }
    //    if (value.county != ' ' && value.county != '') {
    //     wordtreeData.push([value.station_name + ', ' + value.county]);
    //    } else {
    //      value.county = 'Unknown';
    //    }
    //    value.drainage = waterApi.getWaterDrainage(value.div);
    // });
    
    // let byDrainage = _.groupBy(this.streams, function (a) {
    //   return a.drainage;
    // });
    // let self = this;
    //  _.forEach(byDrainage, function (value, key) {
    //   //  if (key == 'N/A') {
    //   //    console.log(value);
    //   //  }
    //     if (key !== 'Unknown') {
    //       self.totalDrainageCfsChartData.push([key, _.sumBy(value, 'flowAmount'),value.length]);
    //       self.byDivisionChartData.push([key, value.length]);
    //     } 
        
    // });
    // //self.byDivisionChartData = drainageData;
    // //this.chartData = wordtreeData;
    // this.processedData = _.groupBy(this.streams, function (a) {
    //   return a.county;
    // });
    
   
    // _.forEach(this.processedData, function (value, key) {
    //   if (key != 'Unknown') {

    //      self.chartData.push([key, value.length]);
    //   }
    // });
   // _.includes({ 'a': 1, 'b': 2 }, 1);
// => true
  },
  components: {
    MainLayout,
  }
}
</script>
// https://www.chartjs.org/samples/latest/charts/pie.html
//https://vue-chartjs.org/guide/#creating-your-first-chart
<style>
.large-chart {
   min-height: 400px;
}
</style>

