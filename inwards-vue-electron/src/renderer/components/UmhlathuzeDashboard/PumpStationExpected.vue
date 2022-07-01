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
        chartTitle: 'Pump Station Expected Discharge (cumecs)',
        chartId: 'pump-expected-timeseries',
        baseUrl: 'https://uwasp.award.org.za/app_json/uwasp_dash/pump_expected.php'
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
          console.log(jsonData);
          let boxData = [];
          setTimeout(() => {
            let layout = {
              autosize: true,            
              margin: { t: 25, r: 25, l: 25, b: 25 },
              xaxis: { 
                tickmode: "linear",
                tick0: '2022-06-01',
                dtick: 30 * 24 * 60 * 60 * 1000
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