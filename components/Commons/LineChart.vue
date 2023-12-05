<!-- <script>
import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    props: {
        label: {
            type: String
        },
        chartData: {
            type: Array
        },
        options: {
            type: Object
        }
    },
    mounted() {
        const totals = this.chartData.map(d => d.total).reverse();

        this.renderChart({
            labels: "teda",
            datasets:[{
                label: this.label,
                data: totals
            }]
        })
    }, 
    methods: {

    }
}
</script> -->