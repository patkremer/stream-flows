<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false});
  }
}
</script>
