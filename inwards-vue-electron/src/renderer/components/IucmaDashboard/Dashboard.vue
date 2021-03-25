<template>
  <div style="height: 100%;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100%;">
      <div class="row no-gutters" style="height: 100%;">
        <div class="col-md-4 no-float left-panel" style="background: #252526; padding-bottom: 50px; margin-right: 0px;">
          <div class="card rounded-0" style="margin-top: 5px; margin-bottom: 5px;">
            <div class="card-body">
              <button class="btn rounded-0 inwards_button" @click="backToMapSelect()" type="button">
                <i class="fa fa-chevron-left"></i>Back to Dashboard Selection
              </button>
            </div>
          </div>
          <MapDashboard ref="mapDashboard"/>

          <div class="v-space"></div>
          <div class="card rounded-0">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6" style="padding-right: 2px;">
                  <div class="form-group">
                    <label for="dateStart" style="padding-left: 8px;">Start Date:</label>
                    <input type="date" class="form-control" id="dateStart" style="margin-left: 4px;">
                  </div>
                </div>
                <div class="col-sm-6" style="padding-left: 2px;">
                  <div class="form-group">
                    <label for="dateEnd" style="padding-left: 8px;">End Date:</label>
                    <input type="date" class="form-control" id="dateEnd" style="margin-right: 10px;" @onload="setDates()">
                  </div>
                </div>
              </div>
   <label><b>Select Chart Components:</b></label> 

  <div class="row"> 
  <div class="col-md-12">
      <div class="form-check form-check-inline">
        <input name="chart_components" id="60th" type="checkbox"  checked="checked" class="form-check-input"> 
        <label for="60th" class="form-check-label">60th</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components" id="70th" type="checkbox" class="form-check-input"> 
        <label for="70th" class="form-check-label">70th</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components" id="80th" type="checkbox" class="form-check-input"> 
        <label for="80th" class="form-check-label">80th</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components" id="90th" type="checkbox" class="form-check-input"> 
        <label for="90th" class="form-check-label">90th</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components" id="99th" type="checkbox" class="form-check-input"> 
        <label for="99th" class="form-check-label">99th</label>
      </div>

      <div class="form-check form-check-inline">
        <input name="chart_components" id="critical" type="checkbox" class="form-check-input"> 
        <label for="critical" class="form-check-label">Critical</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components" id="veryHigh" type="checkbox" class="form-check-input"> 
        <label for="veryHigh" class="form-check-label">Very High Worry</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components" id="high" type="checkbox" class="form-check-input"> 
        <label for="high" class="form-check-label">High Worry</label>
      </div>

      <div class="form-check  form-check-inline">
        <input name="chart_components_2" id="inform" type="checkbox" class="form-check-input"> 
        <label for="inform" class="form-check-label">Inform</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components_2" id="medium" type="checkbox" class="form-check-input"> 
        <label for="medium" class="form-check-label">Medium Worry</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components_2" id="low" type="checkbox" class="form-check-input"> 
        <label for="low" class="form-check-label">Low Worry</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components_3" id="lastYear" type="checkbox" class="form-check-input"> 
        <label for="lastYear" class="form-check-label">Last Year Discharge</label>
      </div>
      <div class="form-check form-check-inline">
        <input name="chart_components_3" id="verifiedDischarge" type="checkbox" checked="checked" class="form-check-input"> 
        <label for="verifiedDischarge" class="form-check-label">Verified Discharge</label>
    </div>
      <div class="form-check form-check-inline">
        <input name="chart_components_3" id="iima" type="checkbox" class="form-check-input"> 
        <label for="iima" class="form-check-label">IIMA</label>
    </div>    
      <div class="form-check form-check-inline">
        <input name="chart_components_3" id="crimib" type="checkbox" class="form-check-input"> 
        <label for="crimib" class="form-check-label">CRMIB</label>
      </div>
  </div>  
</div>
                <div class="row">
                <div class="col-md-12">
                <button class="btn inwards_button" type="button" style="width: 100%" @click="updateCharts()">
                  <i class="fa fa-line-chart"></i>Update Dashboard
                </button>
                </div>
              </div>
            </div>
          </div>
          <div class="v-space"></div>
          <div class="card rounded-0" style="margin-top: 5px; margin-bottom: 5px;">
            <div class="card-body">
              <ComplianceTable ref="complianceTable"/>
            </div>
          </div>          
        </div>
        <div class="col-md-8 no-float right-panel" style="background: #1E1E1E; padding-bottom: 50px; padding-left: 10px; padding-right: 10px;">

          <div class="row no-gutters">
            <div class="col-md-12">
                  <CrocChart ref="crocComponent" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12" style="padding-left: 2px;">
                  <SabieChart ref="sabieComponent" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <ExeChart ref="exeterComponent" style="margin-top: 5px;"/>
              </div>              
            <div class="col-md-12">
              <SabieS3 ref="sabieS3Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <SabieS1 ref="sabieS1Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <CrocC2 ref="crocC2Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <CrocC3 ref="crocC3Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <CrocC4 ref="crocC4Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <CrocC5 ref="crocC5Component" style="margin-top: 5px;"/>
              </div>
             <div class="col-md-12">
              <CrocC7 ref="crocC7Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <MacmacS4 ref="macmacS4Component" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-12">
              <MariteS5 ref="mariteS5Component" style="margin-top: 5px;"/>
              </div>                                                                                  
              <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.grid {
  position: relative;
}
.muuri-container {
  overflow-y: auto;
  padding-top: 20px;
  margin-bottom: 20px;
}
.chartDivId.c3-line-[Reserve] {
  stroke-width: 5px;
}
.item {
  display: block;
  position: absolute;
  margin: 0;
  z-index: 1;
  width: 49%;
  min-height: 480px;
  padding-right: 0;
}
.item.muuri-item-dragging {
  z-index: 3;
}
.item.muuri-item-releasing {
  z-index: 2;
}
.item.muuri-item-hidden {
  z-index: 0;
}
.item-content {
  position: relative;
  width: 100%;
  height: 100%;
}
.right-panel {
    overflow-y: scroll;
}
.left-panel {
    overflow-y: scroll;
}
.c3-line-Reserve {
    stroke-width: 2px;
}
.c3-line-Observed {
    stroke-width: 2px;
}
.c3-line-Last_Year {
    stroke-width: 2px;
    stroke-dasharray: 5.5;
}
.c3-circle-Events {
    stroke-width: 15px;
    stroke: rgb(0, 0, 0);
}
</style>
<script>
  import axios from 'axios';
  import router from '@/router/index';
  import MapDashboard from './MapDashboard';
  import ComplianceTable from './ComplianceTable';
  import OperationalReserve from './OperationalReserve';
  import RiverLog from './RiverLog';
  import CrocChart from './CrocChart';
  import SabieChart from './SabieChart';
  import ExeChart from './ExeChart';
  import SabieS1 from './SabieS1';
  import SabieS3 from './SabieS3';
  import CrocC2 from './CrocC2';
  import CrocC3 from './CrocC3';
  import CrocC4 from './CrocC4';
  import CrocC5 from './CrocC5';
  import CrocC7 from './CrocC7';
  import MariteS5 from './MariteS5';
  import MacmacS4 from './MacmacS4';
  import StatusBar from '../StatusBar';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  import $ from 'jquery';
  import {Fill, Stroke, Style} from 'ol/style';
  import path from 'path';
  require('promise.prototype.finally').shim();
  const { app } = require('electron').remote;
  export default {

    components: {
      MapDashboard,
      ComplianceTable,
      CrocChart,
      SabieChart,
      ExeChart,
      CrocC2,
      CrocC3,
      CrocC4,
      CrocC5,
      CrocC7,
      SabieS3,
      SabieS1,
      MacmacS4,
      MariteS5,
      RiverLog,
      OperationalReserve,
      StatusBar
    },
    data () {
      return {
        stationsApi: 'https://inwards.award.org.za/app_json/iucma_stations.php',
        stationsCoordinates: {}, // To stored all stations with their coordinates
        stationsFeatures: {}, // To stored station features
        stationsRequest: null,
        selectedStations: [],
        selectedWMAs: []
      };
    },
    mounted () {
      document.getElementById('dateStart').setAttribute('value', '2019-10-01');
      document.getElementById('dateEnd').setAttribute('value', '2020-09-30');
      let self = this;
      this.mapDashboardRef = this.$refs.mapDashboard;
      let map = this.$refs.mapDashboard.map;
      this.mapDashboardRef.connectedToTree = false;
      let startDate = new Date();
      startDate = '2019-10-01';
      let endDate = this.formatDate(new Date());
      let critical = document.getElementById('critical').checked;
      let veryHigh = document.getElementById('veryHigh').checked;
      let high = document.getElementById('high').checked;
      let inform = document.getElementById('inform').checked;
      let medium = document.getElementById('medium').checked;
      let low = document.getElementById('low').checked;
      let lastYear = document.getElementById('lastYear').checked;
      let verifiedDischarge = document.getElementById('verifiedDischarge').checked;
      let crimib = document.getElementById('crimib').checked;
      let iima = document.getElementById('iima').checked;
      let sixTh = document.getElementById('60th').checked;
      let sevTh = document.getElementById('70th').checked;
      let eigTh = document.getElementById('80th').checked;
      let ninTh = document.getElementById('90th').checked;
      let nininTh = document.getElementById('99th').checked;
      this.$refs.crocComponent.displayChart('chartComponent-unverified-timeseries-X2H016FW', ['X2H016BFW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.sabieComponent.displayChart('chartComponent-unverified-timeseries-X3H021FW', ['X3H021BFW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.exeterComponent.displayChart('chartComponent-unverified-timeseries-X3H008FW', ['X3H008FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.sabieS1Component.displayChart('chartComponent-unverified-timeseries-X3H001FW', ['X3H001FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.sabieS3Component.displayChart('chartComponent-unverified-timeseries-X3H023FW', ['X3H023FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.macmacS4Component.displayChart('chartComponent-unverified-timeseries-X3H003FW', ['X3H003FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.mariteS5Component.displayChart('chartComponent-unverified-timeseries-X3H011FW', ['X3H011FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.crocC2Component.displayChart('chartComponent-unverified-timeseries-X2H070FW', ['X2H070FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.crocC3Component.displayChart('chartComponent-unverified-timeseries-X2H013FW', ['X2H013FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.crocC4Component.displayChart('chartComponent-unverified-timeseries-X2H032FW', ['X2H032FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.crocC7Component.displayChart('chartComponent-unverified-timeseries-X2H022FW', ['X2H022FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      this.$refs.crocC5Component.displayChart('chartComponent-unverified-timeseries-X2H097FW', ['X2H097FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
      let selectedWMAs = ['inkomati_usuthu'];
      self.mapDashboardRef.showSelectedWMA(selectedWMAs);
      self.addKnpLayer(map);
      self.addRiverLayer(map);
      self.fetchStations();
    },
    methods: {
      fetchStations () {
        let self = this;
        let wmaNames = ['inkomati_usuthu'];
        let fs = require('fs');
        let dir = path.join(app.getPath('userData'), '/stations');
        // TODO : Create an util class for file storage
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        // Cancel previous request if any
        if (this.stationsRequest) {
          this.stationsRequest.cancel('Canceling stations request');
          this.stationsRequest = null;
        }
        // Wrap wma name with single quotes, for api purposes
        wmaNames = wmaNames.sort();
        for (let i = 0; i < wmaNames.length; i++) {
          wmaNames[i] = `'${wmaNames[i]}'`;
        }
        let url = `${self.stationsApi}?wma=${wmaNames.join()}`;
        let stationFile = `${dir}/${url.hashCode()}.json`;
        // Check if online
        if (navigator.onLine) {
          let cancelToken = null;
          if (self.stationsRequest) {
            cancelToken = self.stationsRequest.token;
          }
          axios.get(url, { cancelToken: cancelToken }).then(response => {
            self.mapDashboardRef.loadStationsToMap(response.data);
            self.createCatchmentTree(response.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          if (fs.existsSync(stationFile)) {
            let jsonData = fs.readFileSync(stationFile, 'utf-8');
            let stationsData = JSON.parse(jsonData);
            self.mapDashboardRef.loadStationsToMap(stationsData);
          }
        }
      },
      showRiverLog () {
        this.$refs.logComponent.showLogModal();
      },
      showOperationalReserve () {
        this.$refs.operationalComponent.showOperationalModal();
      },
      addKnpLayer (map) {
        const knpJson = require('@/assets/knp.json');
        let knpLayer = new VectorLayer({
          source: new VectorSource({
            features: (new GeoJSON({
              defaultDataProjection: 'EPSG:4326'
            })).readFeatures(knpJson, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            })
          }),
          updateWhileAnimating: true,
          updateWhileInteracting: false
        });
        map.addLayer(knpLayer);
        let knpStyle = new Style({
          stroke: new Stroke({
            color: [51, 204, 51, 0.6],
            width: 1
          }),
          fill: new Fill({
            color: [51, 204, 51, 0.2]
          }),
          zIndex: 1
        });
        knpLayer.setStyle(knpStyle);
      },
      addRiverLayer (map) {
        const riverJson = require('@/assets/major_rivers.json');
        let riverLayer = new VectorLayer({
          source: new VectorSource({
            features: (new GeoJSON({
              defaultDataProjection: 'EPSG:4326'
            })).readFeatures(riverJson, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            })
          }),
          updateWhileAnimating: true,
          updateWhileInteracting: false
        });
        map.addLayer(riverLayer);
        let riverStyle = new Style({
          stroke: new Stroke({
            color: [59, 179, 208],
            width: 1
          }),
          fill: new Fill({
            color: [59, 179, 208]
          }),
          zIndex: 1
        });
        riverLayer.setStyle(riverStyle);
      },
      backToMapSelect () {
        router.push({ path: '/' });
      },
      updateCharts () {
        let dateStartString = $('#dateStart').val();
        let dateEndString = $('#dateEnd').val();
        let startDate = new Date(dateStartString);
        let endDate = new Date(dateEndString);
        let critical = document.getElementById('critical').checked;
        let veryHigh = document.getElementById('veryHigh').checked;
        let high = document.getElementById('high').checked;
        let inform = document.getElementById('inform').checked;
        let medium = document.getElementById('medium').checked;
        let low = document.getElementById('low').checked;
        let lastYear = document.getElementById('lastYear').checked;
        let verifiedDischarge = document.getElementById('verifiedDischarge').checked;
        let crimib = document.getElementById('crimib').checked;
        let iima = document.getElementById('iima').checked;
        let sixTh = document.getElementById('60th').checked;
        let sevTh = document.getElementById('70th').checked;
        let eigTh = document.getElementById('80th').checked;
        let ninTh = document.getElementById('90th').checked;
        let nininTh = document.getElementById('99th').checked;
        this.$refs.crocComponent.displayChart('chartComponent-unverified-timeseries-X2H016FW', ['X2H016BFW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.sabieComponent.displayChart('chartComponent-unverified-timeseries-X3H021FW', ['X3H021FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.exeterComponent.displayChart('chartComponent-unverified-timeseries-X3H008FW', ['X3H008FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.sabieS1Component.displayChart('chartComponent-unverified-timeseries-X3H001FW', ['X3H001FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.sabieS3Component.displayChart('chartComponent-unverified-timeseries-X3H023FW', ['X3H023FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.macmacS4Component.displayChart('chartComponent-unverified-timeseries-X3H003FW', ['X3H003FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.mariteS5Component.displayChart('chartComponent-unverified-timeseries-X3H011FW', ['X3H011FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.crocC2Component.displayChart('chartComponent-unverified-timeseries-X2H070FW', ['X2H070FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.crocC3Component.displayChart('chartComponent-unverified-timeseries-X2H013FW', ['X2H013FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.crocC4Component.displayChart('chartComponent-unverified-timeseries-X2H032FW', ['X2H032FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.crocC7Component.displayChart('chartComponent-unverified-timeseries-X2H022FW', ['X2H022FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.crocC5Component.displayChart('chartComponent-unverified-timeseries-X2H097FW', ['X2H097FW'], this.formatDate(startDate), this.formatDate(endDate), critical, veryHigh, high, medium, low, inform, lastYear, verifiedDischarge, iima, crimib, sixTh, sevTh, eigTh, ninTh, nininTh);
        this.$refs.complianceTable.updateTable();
      }
    }
  };
</script>