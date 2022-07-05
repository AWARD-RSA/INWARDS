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
        chartTitle: 'Outflow Right Canal (MCM)',
        chartId: 'outflow-right-timeseries',
        baseUrl: 'https://uwasp.award.org.za/app_json/uwasp_dash/dam_outflow_right.php'
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
                width: 220,
                height: 150,
                margin: { t: 25, b: 25, l: 25, r: 25 },
              xaxis: {
                zeroline: false, 
                visible: false,  
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
            Plotly.newPlot(self.chartDivId, boxData, layout, {displayModeBar: false});
          }, 1000);
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => { this.loading = false; });
      }
    }
  };
</script>