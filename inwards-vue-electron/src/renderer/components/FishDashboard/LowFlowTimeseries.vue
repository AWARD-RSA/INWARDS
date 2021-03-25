<script>
  import 'c3/c3.min.css';
  import axios from 'axios';
  import 'jquery/dist/jquery.min.js';
  import Plotly from 'plotly.js-dist';
  import ChartContainer from './ChartContainer';
  require('promise.prototype.finally').shim();

  export default {
    extends: ChartContainer,
    data () {
      return {
        chartTitle: 'Magnitude and duration of annual extreme river conditions: Low Flow Indicators',
        chartId: 'low-flow-timeseries',
        baseUrl: 'https://inwards.award.org.za/app_json/IHA_days.php'
      };
    },
    methods: {
      fetchChartData () {
        let self = this;
        this.loading = true;
        if (!self.mounted) {
          setTimeout(function () {
            self.fetchChartData();
          }, 1000);
          return;
        }
        // console.log('Fetching Unverified Chart...');
        const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`;
        // console.log(url);
        axios.get(url).then(response => {
          let jsonData = response.data;
          // console.log(jsonData);
          let boxData = [];
          setTimeout(() => {
            let layout = {
              title: false,
              font: {
                family: 'Raleway, Calibri',
                size: 9
              },
              xaxis: {
                showspikes: true,
                spikemode: 'toaxis'
              },
              yaxis: {
                title: 'Discharge (cumecs)',
                autorange: true,
                showgrid: true,
                zeroline: true,
                gridwidth: 1,
                zerolinecolor: 'rgb(0, 0, 0)',
                zerolinewidth: 2,
                rangemode: 'nonnegative',
                showspikes: true,
                spikemode: 'toaxis'
              },
              margin: {
                l: 40,
                r: 0,
                b: 20,
                t: 20,
                pad: 4
              },
              paper_bgcolor: 'rgb(255, 255, 255)',
              plot_bgcolor: 'rgb(255, 255, 255)',
              showlegend: true,
              legend: {
                orientation: 'h'
              }
            };
            for (let variable in jsonData) {
              boxData.push(jsonData[variable]);
            }
            document.getElementById(self.chartDivId).innerHTML = '';
            Plotly.newPlot(self.chartDivId, boxData, layout, {displayModeBar: true});
          }, 1000);
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => { this.loading = false; });
      }
    }
  };
</script>