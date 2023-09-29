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
      chartTitle: 'Load Duration Curve',
      chartId: 'load-duration-curve',
      baseUrl: 'https://inwards.award.org.za/app_json/load_duration_iucma.php',
    }
  },
  methods: {
    fetchChartData() {
      console.log('Fetching...')
      let self = this
      this.loading = true
      const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`
      var variableTitle = this.urlParameters.variable + ' (tons/day)'
      if (this.urlParameters.variable === 'EC_Phys_Water') {
        variableTitle = 'TDS Calculated (tons/day)'
      }
      console.log(url)
      axios
        .get(url)
        .then((response) => {
          let jsonData = response.data
          let boxData = []
          setTimeout(() => {
            let layout = {
              shapes: [
                {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: 0,
                  y0: 0,
                  x1: 10,
                  y1: 100,
                  fillcolor: 'rgba(0, 38, 255, 0.3)',
                  opacity: 0.2,
                  line: {
                    width: 0,
                  },
                },
                {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: 10,
                  y0: 0,
                  x1: 40,
                  y1: 100,
                  fillcolor: 'rgba(0, 255, 33, 0.3)',
                  opacity: 0.2,
                  line: {
                    width: 0,
                  },
                },
                {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: 40,
                  y0: 0,
                  x1: 60,
                  y1: 100,
                  fillcolor: 'rgba(255, 216, 0, 0.3)',
                  opacity: 0.2,
                  line: {
                    width: 0,
                  },
                },
                {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: 60,
                  y0: 0,
                  x1: 90,
                  y1: 100,
                  fillcolor: 'rgba(255, 106, 0, 0.3)',
                  opacity: 0.2,
                  line: {
                    width: 0,
                  },
                },
                {
                  type: 'rect',
                  xref: 'x',
                  yref: 'paper',
                  x0: 90,
                  y0: 0,
                  x1: 100,
                  y1: 100,
                  fillcolor: 'rgba(255, 0, 0, 0.3',
                  opacity: 0.2,
                  line: {
                    width: 0,
                  },
                },
              ],
              title: false,
              font: {
                family: 'Raleway, Calibri',
                size: 9,
              },
              tickfont: {
                size: 0.1,
              },
              yaxis: {
                title: variableTitle,
                autorange: true,
                showgrid: true,
                zeroline: true,
                gridwidth: 1,
                zerolinecolor: 'rgb(0, 0, 0)',
                zerolinewidth: 2,
                type: 'log',
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
