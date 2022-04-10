<template>
  <div style="height: 100%;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100%;">
      <div class="row" style="height: 100%;">
        <div class="col-md-4 no-float left-panel" style="background: #252526; padding-left: 8px; overflow: hidden;">
          <CatchmentTree ref="catchmentTree"/>
          <div class="v-space"></div>
          <MapDashboard ref="mapDashboard"/>
          <div class="v-space"></div>
        </div>
        <div class="col-md-8 no-float right-panel" style="background: #1E1E1E; padding-bottom: 50px; padding-left: 10px; padding-right: 10px; overflow: hidden;">
          <div class="grid row no-gutters"></div>
        </div>
      </div>
      <NavButtons/>
    </div>
  </div>
</template>
<script>
import stateStore from '../../store/state_handler';
import UnverifiedChart from '../UserDashboard/UnverifiedChart';
import UnverifiedDischargeDurationChart from '../Dashboard/DurationCurve';
import BoxChart from '../UserDashboard/BoxChart';
import MapDashboard from '../UserDashboard/MapDashboard';
import CatchmentTree from '../UserDashboard/CatchmentTree';
import StationImage from '../UserDashboard/Station';
import $ from 'jquery';
import Muuri from 'muuri';
import Vue from 'vue';
import StatusBar from '../StatusBar';
  import NavButtons from '../../components/NavButtons';
const { getCurrentWindow } = require('electron').remote;
export default Vue.extend({
  data () {
    return {
      charts: {
        'unverified-timeseries': UnverifiedChart,
        'unverified-discharge-duration-curve': UnverifiedDischargeDurationChart,
        'station': StationImage,
        'unverified-discharge-boxplot': BoxChart
      },
      currentCharts: {},
      grid: null,
      currentStations: {},
      stationsFromStoredCharts: [],
      selectedWMAs: []
    };
  },
  components: {
    MapDashboard,
    NavButtons,
    CatchmentTree,
    StatusBar
  },
  mounted () {
    this.mapDashboardRef = this.$refs.mapDashboard;
    this.catchmentTreeRef = this.$refs.catchmentTree;
    this.catchmentTreeRef.selectable = false;
    this.catchmentTreeRef.refreshable = false;
    this.mapDashboardRef.connectedToTree = false;
    this.getSelectedCharts();
  },
  methods: {
    getStations () {
      let self = this;
      let stationsChanged = false;
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
      stateStore.getState(
        stateStore.keys.selectedStations,
        function (selectedStations) {
          if (typeof selectedStations === 'undefined') {
            return false;
          }
          self.currentStations = Object.assign({}, selectedStations);
          let features = [];
          for (let key in selectedStations) {
            if (self.stationsFromStoredCharts.indexOf(key) === -1) {
              delete self.currentStations[key];
              stationsChanged = true;
            } else {
              features.push(selectedStations[key]['feature']);
            }
          }
          let featureCollection = {
            'type': 'FeatureCollection',
            'features': features
          };
          self.mapDashboardRef.loadStationsToMap(featureCollection);
          self.createCatchmentTree(featureCollection);
          if (stationsChanged) {
            stateStore.setState(stateStore.keys.selectedStations, self.currentStations, true).then(() => console.log('Ok'));
          }
        }
      );
    },
    getSelectedCharts () {
      let self = this;
      let $chartsContainer = $('.grid');
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate = this.formatDate(startDate);
      let endDate = this.formatDate(new Date());
      stateStore.getState(
        stateStore.keys.selectedCharts,
        function (selectedCharts) {
          self.currentCharts = Object.assign({}, selectedCharts);
          for (let key in selectedCharts) {
            let ref = `chartComponent-${key}`;
            let chartId = selectedCharts[key]['chartId'];
            if (!self.charts[chartId]) {
              continue;
            }
            let stations = selectedCharts[key]['chartStations'];
            if (stations.length < 1) {
              continue;
            }
            for (let s = 0; s < stations.length; s++) {
              if (self.stationsFromStoredCharts.indexOf(stations[s]) === -1) {
                self.stationsFromStoredCharts.push(stations[s]);
              }
            }
            let ChartComponent = Vue.extend(self.charts[chartId]);
            let chart = new ChartComponent({
              data: {
                chartId: ref
              }
            }).$mount();
            let itemDiv = $(`<div class="item col-md-6">`);
            let itemContentDiv = $(`<div class="item-content" data-key="${key}">`);
            itemDiv.html(itemContentDiv);
            $chartsContainer.append(itemDiv);
            itemContentDiv.html(chart.$el);
            chart.deletable = true;
            chart.displayChart(
              stations,
              startDate,
              endDate
            );
            chart.removed = self.itemRemoved;
          }
          self.getStations();
          // Make the grid draggable and sortable
          self.grid = new Muuri('.grid', {
            dragEnabled: true,
            itemDraggingClass: 'drag-item-btn',
            layoutOnInit: false,
            dragSortHeuristics: {
              sortInterval: 10,
              minDragDistance: 5,
              minBounceBackAngle: Math.PI / 2
            },
            sortData: {
              id: function (item, element) {
                // get sort id
                let key = element.children[0].dataset.key;
                let chartItem = self.currentCharts[key];
                if (typeof chartItem['order'] !== 'undefined') {
                  let order = parseInt(chartItem['order']);
                  return order;
                }
                return item._id;
              }
            },
            dragStartPredicate: function (item, event) {
              let target = $(event.target);
              if (target.hasClass('inwards_button_group') || target.parent().hasClass('inwards_button_group')) {
                return false;
              }
              if (target.hasClass('chart-title')) {
                return true;
              }
            }
          });
          // Sort the items before the initial layout
          // and do the initial layout
          self.grid.sort('id', {layout: 'instant'});
          self.grid.on('move', self.afterMoved);
        }
      );
    },
    afterMoved (data) {
      let grid = data.item.getGrid();
      let items = grid.getItems();
      for (let i = 0; i < items.length; i++) {
        let key = items[i].getElement().children[0].dataset.key;
        this.currentCharts[key]['order'] = i;
      }
      stateStore.setState(stateStore.keys.selectedCharts, this.currentCharts);
    },
    async itemRemoved (itemId) {
      itemId = itemId.replace('chartComponent-', '');
      console.log(itemId);
      let items = this.grid.getItems();
      for (let i = 0; i < items.length; i++) {
        let key = items[i].getElement().children[0].dataset.key;
        this.currentCharts[key]['order'] = i;
      }
      let currentChart = this.currentCharts[itemId];
      this.grid.remove(currentChart['order'], {removeElements: true});
      delete this.currentCharts[itemId];
      await stateStore.setState(stateStore.keys.selectedCharts, this.currentCharts);
      getCurrentWindow().reload();
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
    createCatchmentTree (stationsData) {
      // Start adding stations data to catchment
      let catchmentsData = {};
      for (let i = 0; i < stationsData.features.length; i++) {
        // let primary = stationsData.features[i]['properties']['primary'];
        let secondary = stationsData.features[i]['properties']['secondary'];
        let station = stationsData.features[i]['properties']['station'];
        let place = stationsData.features[i]['properties']['place']; 
        let latestReading = stationsData.features[i]['properties']['latest'];
        if (!catchmentsData[secondary]) {
          catchmentsData[secondary] = [];
        }
        if (catchmentsData[secondary]) {
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
      let treeData = this.generateTreeData(catchmentsData);
      this.catchmentTreeRef.createTree(treeData, null, this.onTreeReady);
    },
    onTreeReady (event, data) {
      this.catchmentTreeRef.expandAll();
    }
  }
});
</script>