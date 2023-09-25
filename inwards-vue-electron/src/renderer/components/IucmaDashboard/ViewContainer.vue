<template>
  <div class="card rounded-0 box" v-bind:style="styleObject">
    <div class="card-header inwards_card">
    </div>
    <div class="card-body view-container">
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>
      <section v-else style="height: 100%;">
        <div v-if='loading'>Loading...</div>
        <div v-else style="height: 100%">
          <div :id="chartDivId" style="height: 100%;">Loading...</div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import stateStore from '../../store/state_handler';
const { dialog } = require('electron').remote;
export default {
  name: 'view-container',
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
      chartData: null,
      errored: false,
      loading: true,
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
  },
  methods: {
    viewCorrectionChart () {
      // Override this function get the chart data
      return false;
    },
    displayCorrection (id, station, start_date, end_date) {
      this.styleObject.display = 'block';
      this.urlParameters.station = station;
      this.urlParameters.start_date = start_date;
      this.urlParameters.end_date = end_date;
      this.chartId = this.chartId;
      this.chartDivId = station;
      this.viewCorrectionChart();
    }
  }
};
</script>