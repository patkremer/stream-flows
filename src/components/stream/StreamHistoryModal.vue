<template>
  <!-- <modal name="stream-chart-modal" :min-width="400" :width="'600'" :min-height="500" :height="'500'" @before-open="beforeOpen" -->
         <!-- @before-close="beforeClose"> -->
         <div>
            <div slot="top-right">
             <a class="waves-effect waves-light right black-text"  v-on:click="$modal.hide('stream-chart-modal')">
               <i class="material-icons " >close</i>
            </a>
           </div>

           <div class="row">
             <div class="col">
             
                <div style="position: relative; height:40vh; width:80vw" >
                  <stream-history-chart :chart-data="data" v-if="isLoaded" />


                </div>
             </div>
            
          </div>
           

         </div>
          
    <!-- </modal> -->
</template>

<script>
import StreamHistoryChart from './StreamHistoryChart.vue'
import _ from "lodash";
export default {
  name: 'StreamHistoryModal',
  components: {
    StreamHistoryChart
  },
  props: ['chartjsData', 'currentStream'],
  data() {
    return {
     flowData: [],
     isLoaded: false,
     data: null
     // chartData: {}
     // currentStream: null,
    }
  },
  mounted() {
    console.log('modal mounted',this.chartjsData);
    
    this.data = this.chartjsData;
    this.isLoaded = true;
   // this.chartData = this.data;
    //  this.flowData = _.orderBy(this.flowData, {'date_time': 'desc'});

    //   this.chartData.labels = _.map(this.flowData, function (f) {
    //     return f.date_time;
    //   });

    //   this.chartData.datasets[0].label = this.currentStream.station_name;
    //   this.chartData.datasets[0].data = _.map(this.flowData, function (f) {
    //     f.flow = _.toNumber(f.flow);
    //     if (_.isNumber(f.flow)) {
    //       return f.flow;
    //     } else {
    //       console.log('flow is not a number', f.flow);
    //     }
    //     return 0;
    //   });
      this.isLoaded = true;
  },
  methods: {
    beforeOpen (event) {
      console.log(event);
     

      // Set the opening time of the modal
    },
    beforeClose (event) {
      console.log(event);
      this.flowData = null;
      this.currentStream = null;
      
    }
  }
}
</script>

<style>

</style>
