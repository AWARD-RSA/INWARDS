
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
          <nav>
         <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#tabs-1" role="tab" aria-controls="nav-home" aria-selected="true" style="text-align: center;">Select <img src="@/assets/fbis_icon.png" height="11"> FBIS Fish Site</a>
            <a class="nav-item nav-link" data-toggle="tab" href="#tabs-2" role="tab" aria-controls="nav-profile" aria-selected="false">Select Hydrological Sites</a>
          </div>
          </nav>
          <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
            <div class="tab-pane fade show active" id="tabs-1" role="tabpanel">
              <BioTree ref="bioTree"/>
            </div>
            <div class="tab-pane fade" id="tabs-2" role="tabpanel">
              <HydroTree ref="hydroTree"/>
            </div>
          </div>
          <div class="v-space"></div>
           <MapDashboard ref="mapDashboard"/>                
          <div class="v-space"></div>

          <div class="card rounded-0">

            <div class="card-body">  
                    <div class="row no-gutters">
                <div class="col-md-12">
                 <multiselect placeholder="Select Species" :options="fishSpecies" v-model="selectedSpecies" :multiple="true"></multiselect>
                </div>
                    </div>
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
              </div>
          <div class="v-space"></div>
          <div class="card rounded-0">
            <div class="card-body">              
              <div class="row">
                <div class="col-md-12">
                <button class="btn inwards_button" type="button" style="width: 100%" @click="doAnalysis()">
                  <i class="fa fa-line-chart"></i>View Analysis
                </button>
                </div>
              </div>
            </div>
          </div>
          </div>
            </div>
        <div class="col-md-8 no-float right-panel" style="background: #1E1E1E; padding-bottom: 50px; padding-left: 10px; padding-right: 10px;">

          <div class="row no-gutters">
            <div class="col-md-6">
                  <SiteOverview ref="siteComponent" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-6" style="padding-left: 2px;">
                  <FishDuration ref="durationComponent" style="margin-top: 5px;"/>
              </div>

            <div class="col-md-6">
                  <FishTimeseries ref="timeseriesComponent" style="margin-top: 5px;"/>
              </div>
             <div class="col-md-6" style="padding-left: 2px;">
                  <FishRadar ref="radarComponent" style="margin-top: 5px;"/>
              </div>
              <div class="col-md-6" style="padding-left: 2px;">
                  <LowFlowTimeseries ref="lowComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <HighFlowTimeseries ref="highComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <ZeroFlows ref="zeroComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <BaseFlowIndex ref="baseComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <JulianMax ref="julianmaxComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <JulianMin ref="julianminComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <HighPulse ref="highpulseComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <HighFlowDuration ref="highdurationComponent" style="margin-top: 5px;"/>
              </div>
               <div class="col-md-6" style="padding-left: 2px;">
                  <ExtremeLowPulses ref="extremepulsesComponent" style="margin-top: 5px;"/>
              </div>
              <div class="col-md-6" style="padding-left: 2px;">
                  <FishBox ref="boxComponent" style="margin-top: 5px;"/>
              </div>
              <br>
          </div>
           <grid-loader :loading="loading" :color="color" :size="size" class="loading_disks"></grid-loader>     
        </div>
      </div>
  </div>
  </div>
</template>
<style>
  .v-space {
    height: 10px;
  }
  .jstree-container {
    max-height: 200px;
    height: 200px;
    overflow-y: auto;
  }
  .grid {
  position: relative;
  }
  .muuri-container {
    overflow-y: auto;
    padding-top: 20px;
    margin-bottom: 20px;
  }
  .chartDivId.c3-line-[Discharge] {
    stroke-width: 0.5px;
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
  import Header from '@/components/Header';
  import router from '@/router/index';
  import StatusBar from '../StatusBar';
  import MapDashboard from './MapDashboard';
  import SiteOverview from './SiteOverview';
  import FishBox from './FishBox';
  import FishRadar from './FishRadar';
  import FishDuration from './FishDuration';
  import FishTimeseries from './FishTimeseries';
  import LowFlowTimeseries from './LowFlowTimeseries';
  import HighFlowTimeseries from './HighFlowTimeseries';
  import ZeroFlows from './ZeroFlows';
  import HighPulse from './HighPulse';
  import ExtremeLowPulses from './ExtremeLowPulses';
  import HighFlowDuration from './HighFlowDuration';
  import JulianMax from './JulianMax';
  import JulianMin from './JulianMin';
  import BaseFlowIndex from './BaseFlowIndex';
  import BioTree from './BioTree';
  import HydroTree from './HydroTree';
  import stateStore from '../../store/state_handler';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import Multiselect from 'vue-multiselect';
  import GeoJSON from 'ol/format/GeoJSON';
  import {Fill, Stroke, Style} from 'ol/style';
  import { GridLoader } from 'vue-spinner/dist/vue-spinner.min.js';
  import $ from 'jquery';
  import path from 'path';
  const { dialog, app } = require('electron').remote;
  require('promise.prototype.finally').shim();
  
  export default {
    data () {
      return {
        fishAPI: 'https://inwards.award.org.za/app_json/fish_sites.php',
        verifiedAPI: 'https://inwards.award.org.za/app_json/verified_stations.php',
        stationsCoordinates: {}, // To stored all stations with their coordinates
        stationsFeatures: {}, // To stored station features
        stationsRequest: null,
        selectedBioStations: [],
        selectedHydroStations: [],
        selectedSpecies: null,
        selectedWMAs: [],
        fishSelected: [],
        fishSpecies: [],
        color: '#177a98',
        height: '35px',
        width: '4px',
        margin: '2px',
        size: '40px',
        loading: true,
        radius: '2px'
      };
    },
    mounted () {
      let self = this;
      self.mapDashboardRef = self.$refs.mapDashboard;
      self.bioTreeRef = self.$refs.bioTree;
      self.hydroTreeRef = self.$refs.hydroTree;
      stateStore.getState(
        stateStore.keys.selectedWMAs,
        function (selectedWMAs) {
          if (!selectedWMAs) {
            return false;
          }
          if (selectedWMAs.length === 0) {
            return false;
          }
          self.selectedWMAs = selectedWMAs;
          // console.log(selectedWMAs);
          self.mapDashboardRef.showSelectedWMA(selectedWMAs);
          self.fetchStations();
        }
      );
      self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
        self.bioTreeRef.toggleNode(station, isStationSelected);
      });
      self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
        self.hydroTreeRef.toggleNode(station, isStationSelected);
      });
      self.$bus.$on('refreshStations', () => {
        self.fetchStations();
      });
      self.$bus.$on('addStationsToStore', (stations, chartStoredId) => {
        self.addStationsToStore(stations, chartStoredId);
      });
      let map = this.$refs.mapDashboard.map;
      self.addKnpLayer(map);
      var startDate = new Date();
      startDate.setDate(startDate.getDate() - 14);
      var dd = startDate.getDate();
      var mm = startDate.getMonth() + 1;
      var yyyy = startDate.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      startDate = yyyy + '-' + mm + '-' + dd;
      document.getElementById('dateStart').setAttribute('value', startDate);
      this.bioTreeRef.refreshStations();
      this.hydroTreeRef.refreshStations();
      self.fetchStations();
      this.loading = false;
    },
    components: {
      Header,
      MapDashboard,
      GridLoader,
      BioTree,
      HydroTree,
      Multiselect,
      SiteOverview,
      StatusBar,
      FishTimeseries,
      HighPulse,
      ZeroFlows,
      JulianMax,
      JulianMin,
      HighFlowDuration,
      ExtremeLowPulses,
      BaseFlowIndex,
      LowFlowTimeseries,
      HighFlowTimeseries,
      FishBox,
      FishDuration,
      FishRadar
    },
    methods: {
      backToMapSelect () {
        router.push({ path: '/' });
      },
      showSelectMap () {
        this.$refs.selectComponent.showLogModal();
      },
      loadSpecies (fishSelected) {
        // console.log('http://inwards.award.org.za/app_json/fish_species.php?site=' + fishSelected);
        axios.get('http://inwards.award.org.za/app_json/fish_species.php?site=' + fishSelected).then(response => {
          this.fishSpecies = response.data;
        }).catch(e => {
        });
      },
      doAnalysis () {
        // console.log(this.selectedSpecies);
        // console.log(this.selectedBioStations[0]);
        // console.log(this.selectedHydroStations[0]);
        if (this.selectedBioStations.length === 0) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'Please select at least one fish site',
            buttons: ['OK']
          });
          return;
        }
        let dateStartString = $('#dateStart').val();
        let dateEndString = $('#dateEnd').val();
        if (!dateStartString || !dateEndString) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'Missing start date / end date',
            buttons: ['OK']
          });
          return;
        }
        let dateStart = new Date(dateStartString);
        let dateEnd = new Date(dateEndString);
        if (dateStart > dateEnd) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'End date should be after start date',
            buttons: ['OK']
          });
          return;
        }
        this.loading = true;
        this.$refs.siteComponent.siteTable(this.selectedBioStations);
        // this.$refs.boxComponent.displayChart(this.selectedBioStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.timeseriesComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        // this.$refs.durationComponent.displayChart(this.selectedBioStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.durationComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.radarComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.lowComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.highComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.zeroComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.baseComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.julianmaxComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.julianminComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.highpulseComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.highdurationComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.$refs.extremepulsesComponent.displayChart(this.selectedHydroStations, this.selectedBioStations, this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedSpecies);
        this.loading = false;
      },
      fetchStations () {
        let self = this;
        let wmaNames = Object.assign([], self.selectedWMAs);
        // console.log(self.selectedWMAs);
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
        // console.log(wmaNames[0]);
        let bioUrl = `${self.fishAPI}?wma=${wmaNames.join()}`;

        // console.log(url);
        let bioFile = `${dir}/${bioUrl.hashCode()}.json`;
        // console.log(bioFile);
        // Check if online
        if (navigator.onLine) {
          let cancelToken = null;
          if (self.stationsRequest) {
            cancelToken = self.stationsRequest.token;
          }
          axios.get(bioUrl, { cancelToken: cancelToken }).then(response => {
            self.mapDashboardRef.loadBioStationsToMap(response.data);
            fs.writeFileSync(bioFile, JSON.stringify(response.data));
            self.createBioTree(response.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          if (fs.existsSync(bioFile)) {
            let jsonData = fs.readFileSync(bioFile, 'utf-8');
            let stationsData = JSON.parse(jsonData);
            self.mapDashboardRef.loadBioStationsToMap(stationsData);
            self.createBioTree(stationsData);
          }
        }
        let hydroUrl = `${self.verifiedAPI}?wma=${wmaNames.join()}`;

        // console.log(url);
        let hydroFile = `${dir}/${hydroUrl.hashCode()}.json`;
        // console.log(bioFile);
        // Check if online
        if (navigator.onLine) {
          let cancelToken = null;
          if (self.stationsRequest) {
            cancelToken = self.stationsRequest.token;
          }
          axios.get(hydroUrl, { cancelToken: cancelToken }).then(response => {
            self.mapDashboardRef.loadHydroStationsToMap(response.data);
            fs.writeFileSync(hydroFile, JSON.stringify(response.data));
            self.createHydroTree(response.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          if (fs.existsSync(hydroFile)) {
            let jsonData = fs.readFileSync(hydroFile, 'utf-8');
            let stationsData = JSON.parse(jsonData);
            self.mapDashboardRef.loadHydroStationsToMap(stationsData);
            self.createHydroTree(stationsData);
          }
        }
        self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
          self.hydroTreeRef.toggleNode(station, isStationSelected);
        });
        self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
          self.bioTreeRef.toggleNode(station, isStationSelected);
        });
        self.$bus.$on('refreshStations', () => {
          self.fetchStations();
        });
        self.$bus.$on('addStationsToStore', (stations, chartStoredId) => {
          self.addStationsToStore(stations, chartStoredId);
        });
        stateStore.getState(
          stateStore.keys.dateEnd,
          function (dateEnd) {
            if (!dateEnd) {
              var endDate = new Date();
              var dd = endDate.getDate();
              var mm = endDate.getMonth() + 1;
              var yyyy = endDate.getFullYear();
              if (dd < 10) {
                dd = '0' + dd;
              }
              if (mm < 10) {
                mm = '0' + mm;
              }
              dateEnd = yyyy + '-' + mm + '-' + dd;
            }
            document.getElementById('dateEnd').setAttribute('value', dateEnd);
          }
        );
        document.getElementById('dateEnd').onchange = function () {
          stateStore.setState(
            stateStore.keys.dateEnd,
            this.value
          );
        };
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 18250);
        var dd = startDate.getDate();
        var mm = startDate.getMonth() + 1;
        var yyyy = startDate.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        startDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById('dateStart').setAttribute('value', startDate);
      },
      addStationsToStore (stations, chartStoredId) {
        let self = this;
        stateStore.getState(
          stateStore.keys.selectedBioStations,
          function (selectedBioStations) {
            if (!selectedBioStations || typeof selectedBioStations === 'undefined') {
              selectedBioStations = {};
            }
            for (let i = 0; i < stations.length; i++) {
              if (!selectedBioStations[stations[i]]) {
                selectedBioStations[stations[i]] = {
                  'feature': self.stationsFeatures[stations[i]],
                  'stationCoord': self.stationsCoordinates[stations[i]],
                  'chartStored': [chartStoredId]
                };
              } else {
                if (selectedBioStations[stations[i]]['chartStored'].indexOf(chartStoredId) < 0) {
                  selectedBioStations[stations[i]]['chartStored'].push(chartStoredId);
                }
              }
            }
            stateStore.setState(
              stateStore.keys.selectedBioStations,
              selectedBioStations
            );
          }
        );
      },
      addHydroStationsToStore (stations, chartStoredId) {
        let self = this;
        stateStore.getState(
          stateStore.keys.selectedHydroStations,
          function (selectedHydroStations) {
            if (!selectedHydroStations || typeof selectedHydroStations === 'undefined') {
              selectedHydroStations = {};
            }
            for (let i = 0; i < stations.length; i++) {
              if (!selectedHydroStations[stations[i]]) {
                selectedHydroStations[stations[i]] = {
                  'feature': self.stationsFeatures[stations[i]],
                  'stationCoord': self.stationsCoordinates[stations[i]],
                  'chartStored': [chartStoredId]
                };
              } else {
                if (selectedHydroStations[stations[i]]['chartStored'].indexOf(chartStoredId) < 0) {
                  selectedHydroStations[stations[i]]['chartStored'].push(chartStoredId);
                }
              }
            }
            stateStore.setState(
              stateStore.keys.selectedHydroStations,
              selectedHydroStations
            );
          }
        );
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
      createBioTree (stationsData) {
        let self = this;
        // Start adding stations data to catchment
        let bioData = self.mapDashboardRef.getCatchmentsData();
        for (let i = 0; i < stationsData.features.length; i++) {
          // let primary = stationsData.features[i]['properties']['primary'];
          let secondary = stationsData.features[i]['properties']['secondary'];
          let station = stationsData.features[i]['properties']['station'];
          let place = stationsData.features[i]['properties']['site'];

          this.stationsFeatures[station] = stationsData.features[i];
          this.stationsCoordinates[station] = stationsData.features[i].geometry.coordinates;

          if (bioData.hasOwnProperty(secondary)) {
            let stationName = station + ': ' + place;
            bioData[secondary].push(stationName);
            bioData[secondary].sort();
          }
        }
        // console.log(catchmentsData);
        let treeData = self.generateBioTreeData(bioData);
        this.bioTreeRef.createTree(treeData, this.onBioTreeSelectedHandler, this.onBioTreeReady);
      },
      onBioTreeReady (event, data) {
        const self = this;
        stateStore.getState(
          stateStore.keys.selectedBio,
          function (selectedBio) {
            if (!selectedBio) {
              return false;
            }
            self.bioTreeRef.toggleMultipleNodes(selectedBio, true);
          }
        );
      },
      generateBioTreeData (dictionary) {
        let treeData = [];
        let self = this;
        $.each(dictionary, function (key, catchment) {
          let hasChildren = false;
          if (typeof catchment === 'object' || catchment instanceof Array) {
            hasChildren = true;
          }
          let c = {
            text: hasChildren ? key : catchment,
            id: hasChildren ? key : catchment,
            type: hasChildren ? 'layer' : 'station'
          };
          if (hasChildren) {
            c['children'] = self.generateBioTreeData(catchment);
          };
          treeData.push(c);
        });
        return treeData;
      },
      onBioTreeSelectedHandler (event, data) {
        // On catchment tree clicked
        let i = [];
        let selected = '';
        let selectedBio = [];
        let _selectedBioStations = [];
        let selectedBits = [];
        let _unselectedBioStations = Object.assign([], this.selectedBioStations);
        // console.log(_unselectedBioStations);
        for (i = 0; i < data.selected.length; i++) {
          selected = data.instance.get_node(data.selected[i]).text;
          selectedBits = selected.split(':');
          let type = data.instance.get_node(data.selected[i]).type;
          if (type === 'layer') {
            selectedBio.push(selectedBits[0]);
          } else if (type === 'station') {
            _selectedBioStations.push(selectedBits[0]);
            if (_unselectedBioStations.indexOf(selectedBits[0]) !== -1) _unselectedBioStations.splice(_unselectedBioStations.indexOf(selectedBits[0]), 1);
          }
        }
        this.mapDashboardRef.toggleSelectedBioStationsByStationNames(
          _selectedBioStations,
          _unselectedBioStations
        );
        this.selectedBioStations = _selectedBioStations;
        stateStore.setState(stateStore.keys.selectedBio, this.selectedBioStations);
        this.mapDashboardRef.selectBio(selectedBio);
        this.loadSpecies(_selectedBioStations);
      },
      createHydroTree (stationsData) {
        let self = this;
        // Start adding stations data to catchment
        let hydroData = self.mapDashboardRef.getCatchmentsData();
        for (let i = 0; i < stationsData.features.length; i++) {
          // let primary = stationsData.features[i]['properties']['primary'];
          let secondary = stationsData.features[i]['properties']['secondary'];
          let station = stationsData.features[i]['properties']['station'];
          let place = stationsData.features[i]['properties']['place'];

          this.stationsFeatures[station] = stationsData.features[i];
          this.stationsCoordinates[station] = stationsData.features[i].geometry.coordinates;

          if (hydroData.hasOwnProperty(secondary)) {
            let stationName = station + ': ' + place;
            hydroData[secondary].push(stationName);
            hydroData[secondary].sort();
          }
        }
        // console.log(catchmentsData);
        let treeData = self.generateHydroTreeData(hydroData);
        this.hydroTreeRef.createTree(treeData, this.onHydroTreeSelectedHandler, this.onHydroTreeReady);
      },
      onHydroTreeReady (event, data) {
        const self = this;
        stateStore.getState(
          stateStore.keys.selectedHydro,
          function (selectedHydro) {
            if (!selectedHydro) {
              return false;
            }
            self.hydroTreeRef.toggleMultipleNodes(selectedHydro, true);
          }
        );
      },
      generateHydroTreeData (dictionary) {
        let treeData = [];
        let self = this;
        $.each(dictionary, function (key, catchment) {
          let hasChildren = false;
          if (typeof catchment === 'object' || catchment instanceof Array) {
            hasChildren = true;
          }
          let c = {
            text: hasChildren ? key : catchment,
            id: hasChildren ? key : catchment,
            type: hasChildren ? 'layer' : 'station'
          };
          if (hasChildren) {
            c['children'] = self.generateHydroTreeData(catchment);
          };
          treeData.push(c);
        });
        return treeData;
      },
      onHydroTreeSelectedHandler (event, data) {
        // On catchment tree clicked
        let i = [];
        let selected = '';
        let selectedHydro = [];
        let _selectedHydroStations = [];
        let selectedBits = [];
        let _unselectedHydroStations = Object.assign([], this.selectedHydroStations);
        // console.log(_unselectedHydroStations);
        for (i = 0; i < data.selected.length; i++) {
          selected = data.instance.get_node(data.selected[i]).text;
          selectedBits = selected.split(':');
          let type = data.instance.get_node(data.selected[i]).type;
          if (type === 'layer') {
            selectedHydro.push(selectedBits[0]);
          } else if (type === 'station') {
            _selectedHydroStations.push(selectedBits[0]);
            if (_unselectedHydroStations.indexOf(selectedBits[0]) !== -1) _unselectedHydroStations.splice(_unselectedHydroStations.indexOf(selectedBits[0]), 1);
          }
        }
        this.mapDashboardRef.toggleSelectedHydroStationsByStationNames(
          _selectedHydroStations,
          _unselectedHydroStations
        );
        this.selectedHydroStations = _selectedHydroStations;
        stateStore.setState(stateStore.keys.selectedHydro, this.selectedHydroStations);
        this.mapDashboardRef.selectHydro(selectedHydro);
        this.loadSpecies(_selectedHydroStations);
      }
    }
  };
</script>