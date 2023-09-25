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
        chartTitle: 'X2H097: Crocodile @ Esselen EWR C5',
        chartId: 'unverified-timeseries',
        baseUrl: 'https://inwards.award.org.za/app_json/iucma_reserve.php'
      };
    },
    methods: {
      fetchChartData () {
        //console.log('Fetching...');
        let self = this;
        this.loading = true;
        const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`;
        //console.log(url);
        axios.get(url).then(response => {
          let jsonData = response.data;
          let boxData = [];
          setTimeout(() => {
            let layout = {
              title: false,
              hovermode: 'compare',
              font: {
                family: 'Raleway, Calibri',
                size: 9
              },
              "xaxis": {"type": "date", "autorange": true, "showspikes": true},
              yaxis: {
                title: 'Discharge (cumecs)',
                autorange: true,
                showgrid: true,
                zeroline: true,
                gridwidth: 1,
                showspikes: true,
                zerolinecolor: 'rgb(0, 0, 0)',
                zerolinewidth: 2
              },
              margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
              },
              paper_bgcolor: 'rgb(255, 255, 255)',
              plot_bgcolor: 'rgb(255, 255, 255)',
              showlegend: true,
              hovermode: "x",
              legend: {
                orientation: 'h'
              },
              modebar: {
                add: 'v1hovermode'
              }
            };
            var config = {
                showEditInChartStudio: true,
                plotlyServerURL: "https://chart-studio.plotly.com",
                displaylogo: false,
                displayModeBar: true
            };
            for (let variable in jsonData) {
              boxData.push(jsonData[variable]);
            }
            document.getElementById(self.chartDivId).innerHTML = '';
            Plotly.newPlot(self.chartDivId, boxData, layout, config);
          }, 1000);
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => { this.loading = false; });
      }
    }
  };
</script>