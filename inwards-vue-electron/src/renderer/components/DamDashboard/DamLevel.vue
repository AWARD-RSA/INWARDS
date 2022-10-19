<script>
  import 'c3/c3.min.css';
  import axios from 'axios';
  import 'jquery/dist/jquery.min.js';
  import Plotly from 'plotly.js-dist';
  import ChartContainer from './ChartContainer';
import { Console } from 'console';
  require('promise.prototype.finally').shim();
  export default {
    extends: ChartContainer,
    data () {
      return {
        chartTitle: 'Goedertrouw Dam Level',
        chartId: 'goedertrou-dam-level',
        baseUrl: 'https://uwasp.award.org.za/app_json/dam_weekly.php'
      };
    },
    methods: {
      fetchChartData () {
        console.log('Fetching...');
        let self = this;
        console.log(self);
        this.loading = true;
        const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`;
        axios.get(url).then(response => {
          let jsonData = response.data;
          console.log(jsonData);
          let boxData = [];
          setTimeout(() => {
            let layout = {
                autosize: false,
                width: 220,
                height: 150,
                margin: { t: 25, b: 25, l: 25, r: 25 }
            };
            for (let variable in jsonData) {
              console.log(variable);
              boxData.push(jsonData[variable]);
            }
            document.getElementById(self.chartDivId).innerHTML = '';
            Plotly.newPlot(self.chartDivId, boxData, layout);
          }, 1000);
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => { this.loading = false; });
      }
    }
  };
</script>