<template>
  <div class="card rounded-0 box" v-bind:style="styleObject">
    <div class="card-header inwards_card">
   <div class="row">
    <div class="col-md-12">  
    <h6 style="color: white; margin-top: 10px; width: 70%; float: left;" class="chart-title">{{ chartTitle }}</h6>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="float: right;">
        <div class="btn-group mr-2" role="group" aria-label="First group">          
              <button type="button" class="btn inwards_button_group" data-container="body" data-toggle="popover" data-placement="top" :data-content="dataText" title="Ecosystem influences" data-html="true"><i class="fa fa-info" style="padding-right: 10px;"></i></button>      
            </div>
      </div>
    </div>
    </div>
    </div>
    <div class="card-body chart-container">
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>
      <section v-else style="height: 100%;">
        <div v-if='loading'><ring-loader :loading="loading" :color="color" :size="size" class="loading_disks"></ring-loader></div>
        <div v-else style="height: 100%">
          <div :id="chartDivId" style="height: 100%;"><ring-loader :loading="loading" :color="color" :size="size" class="loading_disks"></ring-loader></div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import stateStore from '../../store/state_handler';
import saveSvgAsPng from 'save-svg-as-png';
import { RingLoader } from 'vue-spinner/dist/vue-spinner.min.js';
import $ from 'jquery'; 
const { dialog } = require('electron').remote;
export default {
  components: {
    RingLoader
  },
  name: 'chart-container',
  data () {
    return {
      chartId: null,
      chartDivId: null,
      chartUrl: '',
      deletable: false,
      mounted: false,
      urlParameters: {
        stations: [],
        sd: '',
        ed: '',
        type: 0
      },
      color: '#177a98',
      height: '35px',
      width: '4px',
      margin: '2px',
      size: '100px',
      loading: false,
      radius: '2px',
      chartData: null,
      errored: false,
      stationsCoordinates: {},
      styleObject: {
        display: 'none'
      }
    };
  },
  mounted () {
    let self = this;
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      self.mounted = true;
    });
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  },
  methods: {
    removed () {
      // Called when item has been removed from store
    },
    removeFromStore () {
      const options = {
        type: 'question',
        buttons: ['Yes, please', 'No, thanks'],
        defaultId: 2,
        title: 'Remove a chart',
        message: 'Are you sure you want to delete this chart from your dashboard?'
      };

      dialog.showMessageBox(null, options, (response) => {
        if (response === 0) {
          this.removed(this.chartId);
        }
      });
    },
    addToStore () {
      let self = this;
      let stations = this.urlParameters['stations'];
      let chartStoreId = self.chartId + '-' + stations.join('-');
      self.$bus.$emit('addStationsToStore', stations, chartStoreId);
      stateStore.getState(
        stateStore.keys.selectedCharts,
        function (selectedCharts) {
          if (selectedCharts) {
            if (selectedCharts.hasOwnProperty(chartStoreId)) {
              dialog.showMessageBox(null, {
                type: 'warning',
                message: 'This chart has been already added to user dashboard',
                buttons: ['OK']
              });
              return;
            }
            selectedCharts[chartStoreId] = {
              'chartId': self.chartId,
              'chartStations': stations,
              'order': Object.keys(selectedCharts).length - 1
            };
          } else {
            selectedCharts = {};
            selectedCharts[chartStoreId] = {
              'chartId': self.chartId,
              'chartStations': stations,
              'order': 0
            };
          }
          dialog.showMessageBox(null, {
            type: 'info',
            message: 'Successfully added to user dashboard',
            buttons: ['OK']
          });
          stateStore.setState(stateStore.keys.selectedCharts, selectedCharts);
        }
      );
    },
    fetchChartData () {
      // Override this function get the chart data
      return false;
    },
    displayChart (stations, fishSite, sd, ed, species) {
      this.styleObject.display = 'block';
      this.urlParameters.stations = stations;
      this.urlParameters.fishSite = fishSite;
      this.urlParameters.sd = sd;
      this.urlParameters.ed = ed;
      this.urlParameters.species = species;
      this.chartId = this.chartId;
      // console.log(this.chartId);
      this.chartDivId = this.chartId.replace(/,/g, '-');
      this.fetchChartData();
    },
    savePNG () {
      saveSvgAsPng(document.getElementById(this.chartDivId), 'diagram.png');
    }
  }
};
</script>