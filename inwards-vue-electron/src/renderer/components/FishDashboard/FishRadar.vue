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
        chartTitle: 'Observations Radar Chart',
        chartId: 'fish-radar',
        baseUrl: 'https://inwards.award.org.za/app_json/fish_radar.php'
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
                size: 15
              },
              polar: {
                radialaxis: {
                  visible: true
                }
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