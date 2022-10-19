<script>
  import 'c3/c3.min.css';
  import axios from 'axios';
  import 'jquery/dist/jquery.min.js';
  import Plotly from 'plotly.js-dist';
  import $ from 'jquery';
  import ChartContainer from './ChartContainer';
  require('promise.prototype.finally').shim();

  export default {
    extends: ChartContainer,
    data () {
      return {
        chartTitle: 'Goedertrouw Dam Left Canal (W1H029FW)',
        chartId: 'unverified-timeseries',
        baseUrl: 'https://uwasp.award.org.za/app_json/plotly_timeseries.php'
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
        const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`;
        axios.get(url).then(response => {
          let jsonData = response.data;
          let boxData = [];
          setTimeout(() => {
            let layout = {
              title: false,
              font: {
                family: 'Raleway, Calibri',
                size: 9
              },
              yaxis: {
                title: 'Discharge (cumecs)',
                autorange: true,
                showgrid: true,
                zeroline: true,
                gridwidth: 1,
                zerolinecolor: 'rgb(0, 0, 0)',
                zerolinewidth: 2,
                rangemode: 'nonnegative'
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
              legend: {
                orientation: 'h'
              }
            };
            for (let variable in jsonData) {
              boxData.push(jsonData[variable]);
            }
            document.getElementById(self.chartDivId).innerHTML = '';
            let stations = this.urlParameters.stations;
            let chartTitle = $(this.$el).find('.chart-title');
            chartTitle.html('Gauging station:' + stations[0]);
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