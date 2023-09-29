<script>
import 'c3/c3.min.css'
import axios from 'axios'
import 'jquery/dist/jquery.min.js'
import Plotly from 'plotly.js-dist'
import ChartContainer from './ChartContainer'
require('promise.prototype.finally').shim()

export default {
  extends: ChartContainer,
  data() {
    return {
      chartTitle: 'Boxplot',
      chartId: 'wq-boxplot',
      baseUrl: 'https://inwards.award.org.za/app_json/wq_boxplot_iucma.php',
    }
  },
  methods: {
    fetchChartData() {
      console.log('Fetching...')
      let self = this
      this.loading = true
      const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`
      var variableTitle =
        this.urlParameters.variable + ' (' + this.urlParameters.unit + ')'
      console.log(url)
      axios
        .get(url)
        .then((response) => {
          let jsonData = response.data
          let boxData = []
          setTimeout(() => {
            let layout = {
              title: false,
              font: {
                family: 'Raleway, Calibri',
                size: 9,
              },
              yaxis: {
                title: variableTitle,
                autorange: true,
                showgrid: true,
                zeroline: true,
                gridwidth: 1,
                zerolinecolor: 'rgb(0, 0, 0)',
                zerolinewidth: 2,
                rangemode: 'nonnegative',
              },
              autosize: true,
              margin: {
                l: 40,
                r: 0,
                b: 20,
                t: 20,
                pad: 4,
              },
              paper_bgcolor: 'rgb(255, 255, 255)',
              plot_bgcolor: 'rgb(255, 255, 255)',
              showlegend: true,
              legend: {
                orientation: 'h',
              },
              modebar: {
                add: 'v1hovermode',
              },
            }
            var config = {
              showEditInChartStudio: true,
              plotlyServerURL: 'https://chart-studio.plotly.com',
              displaylogo: false,
              displayModeBar: true,
            }
            for (let variable in jsonData) {
              boxData.push(jsonData[variable])
            }
            document.getElementById(self.chartDivId).innerHTML = ''
            Plotly.newPlot(self.chartDivId, boxData, layout, config)
          }, 1000)
        })
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
