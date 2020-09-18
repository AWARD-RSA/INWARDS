<template>
  <div style="height: 100%;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100%;">
      <div class="row no-gutters" style="height: 100%;">
        <div class="col-md-4 no-float left-panel" style="background: #252526; padding-bottom: 50px; margin-right: 0px;">
          <div class="card rounded-0" style="margin-top: 5px; margin-bottom: 5px; width:100%">
            <div class="card-body">
              <button class="btn rounded-0 inwards_button" @click="backToMapSelect()" type="button">
                <i class="fa fa-chevron-left"></i>Back to Dashboard Selection
              </button>
            </div>
          </div>
         <div class="card rounded-0">
            <div class="card-body">
              <div class="row no-gutters">
                <div class="col-md-12">
                  <div class="form-group">
                  <label for="selVar" style="margin-left: 4px; margin-right: 10px;"><b>Select Sample Site Type:</b></label>
                  <select class="form-control rounded-0" style="margin-left: 4px; margin-right: 10px;" name="typeSelect" v-model="selectedType" @change="detectType()">
                    <option class="dropdown-item" v-for="type in types" v-bind:key="type.type" v-bind:value="type.type"> {{ type.type }} </option>
                  </select>
                </div>
                </div>
             </div>
            <div class="row no-gutters">
                <div class="col-md-12">
                  <div class="form-group">
                  <label for="selVar" style="margin-left: 4px; margin-right: 10px;"><b>Select Variable:</b></label>
                  <select class="form-control rounded-0" style="margin-left: 4px; margin-right: 10px;" name="variableSelect" v-model="selectedVariable" placeholder="Please Select Water Quality Variable">
                    <option class="dropdown-item" v-for="variable in variables" v-bind:key="variable.id" v-bind:value="[variable.mon_variable_abbr,variable.measure_unit_abbr]"> {{ variable.mon_variable_name }} </option>
                  </select>
                </div>
                </div>
             </div>
              <div class="row no-gutters">
                <div class="col-sm-6" style="padding-right: 2px;">
                  <div class="form-group">
                    <label style="margin-left: 4px; margin-right: 10px;"><b>Start Date:</b></label>
                    <input class="form-control" id="dateStart" style="margin-left: 4px;" placeholder='Start Date' onfocus="(this.type='date')">
                  </div>
                </div>
                <div class="col-sm-6" style="padding-left: 2px;">
                  <div class="form-group">
                    <label style="margin-left: 4px; margin-right: 10px;"><b>End Date:</b></label>
                    <input class="form-control" id="dateEnd" style="margin-right: 10px;" placeholder='End Date' onfocus="(this.type='date')">
                  </div>
                </div>
              </div>             
              </div>
            </div>
          <CatchmentTree ref="catchmentTree"/>
          <div class="card rounded-0">
            <div class="card-body">
              <div class="row no-gutters">
                <div class="col-md-12">
                <button class="btn inwards_button" type="button" style="width: 100%" @click="doAnalysis ()">
                  <i class="fa fa-line-chart"></i>Analyse
                </button>
                </div>
              </div>
            </div>

          </div>          
          <MapDashboard ref="mapDashboard"/>


        </div>
        <div class="col-md-8 no-float right-panel" style="background: #1E1E1E; padding-bottom: 50px; padding-left: 10px; padding-right: 10px;">
          <div class="row no-gutters">
            <div class="col-md-6">
                  <TimeseriesChart ref="timeseriesComponent" style="margin-top: 5px;"/>
              </div>
            <div class="col-md-6" style="padding-left: 2px;">
                  <BoxChart ref="boxComponent" style="margin-top: 5px;"/>
              </div>

            <div class="col-md-6">
                  <LoadChart ref="loadComponent" style="margin-top: 5px;"/>
              </div>
              <div class="col-md-6" style="padding-left: 2px;">
                  <DurationChart ref="durationComponent" style="margin-top: 5px;"/>
              </div>
              <br>
          </div>
        </div>
      </div>
    </div>
    <RiverLog ref="logComponent" style="margin-top: 5px;"/>
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
  import CatchmentTree from './CatchmentTree';
  import ComplianceTable from './ComplianceTable';
  import RiverLog from './RiverLog';
  import BoxChart from './BoxChart';
  import TimeseriesChart from './TimeseriesChart';
  import DurationChart from './DurationChart';
  import LoadChart from './LoadChart';
  import StatusBar from '../StatusBar';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  import {Fill, Stroke, Style} from 'ol/style';
  import $ from 'jquery';
  import path from 'path';
  import stateStore from '../../store/state_handler';
  require('promise.prototype.finally').shim();
  const { dialog, app } = require('electron').remote;
  export default {

    components: {
      MapDashboard,
      ComplianceTable,
      CatchmentTree,
      BoxChart,
      TimeseriesChart,
      DurationChart,
      LoadChart,
      RiverLog,
      StatusBar
    },
    data () {
      return {
        stationsApi: 'http://inwards.award.org.za/app_json/app_wq_stations.php',
        boxplotApi: 'http://inwards.award.org.za/app_json/wq_boxplot.php',
        stationsCoordinates: {}, // To stored all stations with their coordinates
        stationsFeatures: {}, // To stored station features
        stationsRequest: null,
        selectedStations: [],
        selectedWMAs: [],
        selectedType: '',
        types: [],
        selectedVariable: '',
        variableUnit: '',
        variables: []
      };
    },
    beforeMount () {
      this.loadVariables();
      this.loadTypes();
    },
    mounted () {
      let self = this;
      self.mapDashboardRef = self.$refs.mapDashboard;
      let map = this.$refs.mapDashboard.map;
      self.catchmentTreeRef = self.$refs.catchmentTree;
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
          self.mapDashboardRef.showSelectedWMA(selectedWMAs);
        }
      );
      self.addKnpLayer(map);
    },
    methods: {
      doAnalysis () {
        console.log(this.selectedVariable);
        console.log(this.selectedStations[0]);
        console.log(this.selectedType);
        console.log(this.variables);
        if (this.selectedStations.length === 0) {
          dialog.showMessageBox(null, {
            type: 'warning',
            message: 'Please select at least one station',
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

        this.$refs.boxComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.timeseriesComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.durationComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
        this.$refs.loadComponent.displayChart(this.selectedStations, this.selectedVariable[0], this.formatDate(dateStart), this.formatDate(dateEnd), this.selectedVariable[1]);
      },
      detectType () {
        console.log(this.selectedType);
        this.fetchStations();
      },
      loadTypes () {
        axios.get('http://inwards.award.org.za/app_json/wq_gauge_types.php').then(response => {
          this.types = response.data;
        }).catch(e => {
        });
      },
      loadVariables () {
        axios.get('http://inwards.award.org.za/app_json/variables.php').then(response => {
          this.variables = response.data;
        }).catch(e => {
        });
      },
      fetchStations () {
        let self = this;
        let wmaNames = Object.assign([], self.selectedWMAs);
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
        let url = `${self.stationsApi}?wma=${wmaNames.join()}&type=${this.selectedType}`;
        console.log(url);
        let stationFile = `${dir}/${url.hashCode()}.json`;
        console.log(stationFile);
        // Check if online
        if (navigator.onLine) {
          let cancelToken = null;
          if (self.stationsRequest) {
            cancelToken = self.stationsRequest.token;
          }
          axios.get(url, { cancelToken: cancelToken }).then(response => {
            self.mapDashboardRef.loadStationsToMap(response.data);
            fs.writeFileSync(stationFile, JSON.stringify(response.data));
            self.createCatchmentTree(response.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          if (fs.existsSync(stationFile)) {
            let jsonData = fs.readFileSync(stationFile, 'utf-8');
            let stationsData = JSON.parse(jsonData);
            self.mapDashboardRef.loadStationsToMap(stationsData);
            self.createCatchmentTree(stationsData);
          }
        }
        self.$bus.$on('stationSelectedFromMap', (station, isStationSelected) => {
          self.catchmentTreeRef.toggleNode(station, isStationSelected);
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
      showRiverLog () {
        this.$refs.logComponent.showLogModal();
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
      backToMapSelect () {
        router.push({ path: '/' });
      },
      createCatchmentTree (stationsData) {
        let self = this;
        // Start adding stations data to catchment
        let catchmentsData = self.mapDashboardRef.getCatchmentsData();
        for (let i = 0; i < stationsData.features.length; i++) {
          // let primary = stationsData.features[i]['properties']['primary'];
          let secondary = stationsData.features[i]['properties']['secondary'];
          let station = stationsData.features[i]['properties']['station'];
          let place = stationsData.features[i]['properties']['desc'];
          let latestReading = stationsData.features[i]['properties']['latest'];
          this.stationsFeatures[station] = stationsData.features[i];
          this.stationsCoordinates[station] = stationsData.features[i].geometry.coordinates;
          if (catchmentsData.hasOwnProperty(secondary)) {
            let stationName = '';
            if (latestReading != null) {
              stationName = station + ': ' + place + ': ' + latestReading.toString().slice(0, 10);
            } else {
              stationName = 'Problem with Station';
            }
            catchmentsData[secondary].push(stationName);
            catchmentsData[secondary].sort();
          }
        }
        console.log(catchmentsData);
        let treeData = self.generateTreeData(catchmentsData);
        this.catchmentTreeRef.createTree(treeData, this.onCatchmentTreeSelectedHandler, this.onTreeReady);
      },
      onTreeReady (event, data) {
        const self = this;
        stateStore.getState(
          stateStore.keys.selectedCatchments,
          function (selectedCatchments) {
            if (!selectedCatchments) {
              return false;
            }
            self.catchmentTreeRef.toggleMultipleNodes(selectedCatchments, true);
          }
        );
      },
      generateTreeData (dictionary) {
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
            c['children'] = self.generateTreeData(catchment);
          };
          treeData.push(c);
        });
        return treeData;
      },
      onCatchmentTreeSelectedHandler (event, data) {
        // On catchment tree clicked
        let i = [];
        let selected = '';
        let selectedCatchments = [];
        let _selectedStations = [];
        let selectedBits = [];
        let _unselectedStations = Object.assign([], this.selectedStations);
        for (i = 0; i < data.selected.length; i++) {
          selected = data.instance.get_node(data.selected[i]).text;
          selectedBits = selected.split(':');
          let type = data.instance.get_node(data.selected[i]).type;
          if (type === 'layer') {
            selectedCatchments.push(selectedBits[0]);
          } else if (type === 'station') {
            _selectedStations.push(selectedBits[0]);
            if (_unselectedStations.indexOf(selectedBits[0]) !== -1) _unselectedStations.splice(_unselectedStations.indexOf(selectedBits[0]), 1);
          }
        }
        this.mapDashboardRef.toggleSelectedStationsByStationNames(
          _selectedStations,
          _unselectedStations
        );
        this.selectedStations = _selectedStations;
        stateStore.setState(stateStore.keys.selectedCatchments, this.selectedStations);
        this.mapDashboardRef.selectCatchments(selectedCatchments);
      }
    }
  };
</script>