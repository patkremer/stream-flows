<template>
  <!-- <modal name="stream-chart-modal" :min-width="400" :width="'600'" :min-height="500" :height="'500'" @before-open="beforeOpen" -->
         <!-- @before-close="beforeClose"> -->
         <div>
            <!-- <div slot="top-right">
             <a class="waves-effect waves-light right black-text"  v-on:click="$modal.hide('stream-chart-modal')">
               <i class="material-icons " >close</i>
            </a>
           </div> -->

           <div class="row">
             <div class="col">
              <p class="truncate">{{currentStream.station_name}}</p>
               
                <div style="position: relative; min-height:350px; width:89vw" >
                  <stream-history-chart :chart-data="data" :options="chartOptions" v-if="isLoaded" />

                </div>
             </div>
            
          </div>
           

         </div>
          
    <!-- </modal> -->
</template>

<script>
import StreamHistoryChart from './StreamHistoryChart.vue'
export default {
  name: 'StreamHistoryModal',
  components: {
    StreamHistoryChart
  },
  props: ['chartjsData', 'chartOptions','currentStream'],
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
    this.data = this.chartjsData;
    this.isLoaded = true;
  
  },
 
}
</script>

<style>

</style>
