
export default {
  
  streamChartConfig: {
    getOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      };
    },

    getChartData() {
      return  {
        labels: [],
        datasets: [
          {
            label: "Cfs",
            borderColor: "#004d40",
            pointBackgroundColor: "rgba(0, 137, 123, 0.8)",
            //   //borderWidth: 1,
            pointBorderColor: "#004d40",

            backgroundColor: "rgba(0, 137, 123, 0.8)", //'#0F3053',
            fill: "start",
            //pointStyle: 'crossRot', //crossRot
            data: []
          }
        ]
      }
    }
  }


}