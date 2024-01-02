<script>
import {Line} from "vue-chartjs"

export default {
    extends: Line,
    props: ["chartData", "options"],
    mounted() {
        this.renderChart(this.chartData, this.options); 
    }
}
</script>


<!-- <template>
    <div>
      <div v-if="chartType === 'line'">
        <line-chart :chart-data="chartData" :options="options"></line-chart>
      </div>
      <div v-else-if="chartType === 'polarArea'">
        <polar-area-chart :chart-data="chartData" :options="options"></polar-area-chart>
      </div>
    </div>
  </template>
  
  <script>
import { Line, PolarArea } from "chart.js";

  
  export default {
    props: ["chartType", "chartData", "options"],
    extends: {
      LineChart: Line,
      PolarAreaChart: PolarArea
    },
    watch: {
      chartType() {
        this.renderChart();
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        if (this.chartType === "line") {
          this.$refs.chart = new Line(this.chartData, this.options);
        } else if (this.chartType === "polarArea") {
          this.$refs.chart = new PolarArea(this.chartData, this.options);
        }
      }
    }
  };
  </script>
   -->