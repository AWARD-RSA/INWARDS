<script>
  import 'c3/c3.min.css';
  import c3 from 'c3';
  import {timeFormat} from 'd3-time-format';
  import axios from 'axios';
  import ChartContainer from './ChartContainer';
  require('promise.prototype.finally').shim();

  export default {
    extends: ChartContainer,
    data () {
      return {
        chartTitle: 'X3H021: Sabie River @ Kruger Gate Kruger National Park',
        chartId: 'unverified-timeseries',
        baseUrl: 'http://inwards.award.org.za/app_json/tpc_inwards.php'
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
        console.log('Fetching Unverified Chart...');
        const url = `${this.baseUrl}?${this.dictToUri(this.urlParameters)}`;
        axios.get(url).then(response => {
          let sabieData = response.data;
          self.chartUrl = url;
          setTimeout(() => {
            c3.generate({
              bindto: '#' + self.chartDivId,
              data: sabieData,
              zoom: {
                enabled: false,
                rescale: true,
                type: 'drag'
              },
              axis: {
                x: {
                  type: 'timeseries',
                  tick: {
                    fit: true,
                    format: function (x) {
                      var formatSeconds = timeFormat('%Y-%m-%d');
                      return formatSeconds(new Date(x * 1000));
                    },
                    count: 50,
                    rotate: -45
                  }
                },
                y: {
                  label: {
                    text: 'Discharge (cumecs)',
                    position: 'outer-middle'
                  },
                  min: 0,
                  padding: {top: 0, bottom: 0
                  }
                }
              },
              tooltip: {
                show: true
              },
              point: {
                show: false
              },
              legend: {
                hide: ['90th']
              },
              color: {
                pattern: [
                  'rgba(128,0,0, 1)', '#00FFFF', '#ADD8E6', '#ffffff',
                  'rgb(0,0,0)', '#3590ae',
                  'rgba(0, 38, 255, 1)', 'rgba(255, 0, 0, 1)', '#6b1135', '#9a0410', '#90cb9e', '#fecb9d',
                  '#5f9052', '#3d7d7f', '#8ca227', '#1a0333', '#907510']
              },
              line: {
                connectNull: false
              }
            });
          }, 1000);
        }).catch(error => {
          console.log(error);
          this.errored = true;
        }).finally(() => { this.loading = false; });
      }
    }
  };
</script>