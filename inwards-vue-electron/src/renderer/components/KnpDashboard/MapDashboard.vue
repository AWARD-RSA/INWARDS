<template>
    <div>
      <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content" class="ol-popup-content"></div>
      </div>
      <template v-for="(child) in popups">
        <component :is="child" :key="child.name" :ref="child.id"></component>
      </template>
      <div class="card rounded-0">
        <div class="card-header inwards_card"><h6 style="color: white;"><i class="fa fa-map" style="padding-right: 10px;"></i>Map</h6></div>
        <div class="card-body">
          <div id="dashboard-map"></div>
        </div>
      </div>
    </div>
</template>
<style>
  .ol-popup {
    opacity: 0.7;
    font-weight: bold;
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -40px;
    min-width: 75px;
  }
  .card-body {
    padding: 0
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 38px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 38px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
  .ol-popup-content {
    font-size: 12px;
  }
  .ol-popup-content p {
    max-width: 90px;;
    margin-bottom: 0 !important;
  } 
  #dashboard-map {
    width: 100%;
    height: 350px;
  }
</style>
<script>
  /* eslint-disable no-unused-vars */
  import Vue from 'vue';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import {transform} from 'ol/proj';
  import {Group as LayerGroup, Tile as TileLayer} from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
  import Overlay from 'ol/Overlay';
  import * as Extent from 'ol/extent';
  export default {
    data () {
      return {
        popups: [],
        keys: {
          selected: 'selected',
          station: 'station'
        },
        selectedStyle: new Style({
          stroke: new Stroke({
            color: [51, 204, 51, 0.4],
            width: 4
          }),
          fill: new Fill({
            color: [51, 204, 51, 0.1]
          }),
          zIndex: 1
        }),
        connectedToTree: true,
        selectedFeatures: [],
        featureDict: {},
        selectedWMA: [],
        selectedStations: [],
        defaultExtent: null,
        map: null,
        layerGroup: new LayerGroup({
          layers: []
        }),
        stationsSelectedStyle: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({color: [51, 204, 51, 0.8]}),
            stroke: new Stroke({color: 'green', width: 1})
          })
        }),
        stationsDefaultStyle: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({color: 'rgba(255,0,0,0.5)'}),
            stroke: new Stroke({color: 'red', width: 1})
          })
        }),
        stationsVectorLayer: new VectorLayer({
          source: new VectorSource(),
          style: function (feature) {
            return new Style({
              image: new CircleStyle({
                radius: 5,
                fill: new Fill({color: 'rgba(255,0,0,0.5)'}),
                stroke: new Stroke({color: 'red', width: 1})
              })
            });
          }
        })
      };
    },
    mounted () {
      let container = document.getElementById('popup');
      let closer = document.getElementById('popup-closer');
      let self = this;
      /**
      * Add a click handler to hide the popup.
      * @return {boolean} Don't follow the href.
      */
      closer.onclick = function () {
        self.overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
      /**
       * Create an overlay to anchor the popup the map
       */
      this.overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 20
        }
      });

      this.map = new Map({
        target: 'dashboard-map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
              
            })
          })
        ],
        overlays: [this.overlay],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
      this.map.addLayer(this.layerGroup);
      this.stationsVectorLayer.setZIndex(0);
      this.map.addLayer(this.stationsVectorLayer);
      this.stationsVectorLayer.setZIndex(3);
      this.map.on('click', this._mapClicked);
    },
    methods: {
      _mapClicked (e) {
        // Clicked map event handler
        this.selectStation(e.pixel);
      },
      showSelectedWMA (data) {
        this.defaultExtent = Extent.createEmpty();
        for (let i = 0; i < data.length; i++) {
          let wmaJsonFile = `wma_merge.json`;
          let vectorLayer = new VectorLayer({
            source: new VectorSource({
              features: (new GeoJSON({
                defaultDataProjection: 'EPSG:4326'
              })).readFeatures(require(`../../assets/${wmaJsonFile}`), {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
              })
            }),
            style: function (feature) {
            return new Style({
              image: new CircleStyle({
                radius: 5,
                fill: new Fill({color: 'rgba(255,0,0,0.5)'}),
                stroke: new Stroke({color: 'red', width: 1})
                })
              });
            },
            updateWhileAnimating: true,
            updateWhileInteracting: true
          });
          Extent.extend(this.defaultExtent, vectorLayer.getSource().getExtent());
          this.layerGroup.getLayers().push(vectorLayer);
        }
        this.map.getView().fit(this.defaultExtent);
      },
      loadStationsToMap (stationsGeoJSONData) {
        this.stationsVectorLayer.setSource(new VectorSource({
          features: (new GeoJSON({
            defaultDataProjection: 'EPSG:4326'
          })).readFeatures(stationsGeoJSONData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          })
        }));
      },
      selectStation (pixel) {
        // Select and style stations from map based on ol.pixel
        let content = document.getElementById('popup-content');
        let self = this;
        self.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
          let station = feature.get(self.keys.station);
          let isStationSelected = feature.get(self.keys.selected);
          if (!isStationSelected) {
            feature.set(self.keys.selected, true);
            feature.setStyle(self.stationsSelectedStyle);
            self.selectedStations.push(station);
            content.innerHTML = `<p>${station.split(' ')[0]}</p>`;
            self.overlay.setPosition(feature.getGeometry().getCoordinates());
          } else {
            feature.set(self.keys.selected, false);
            feature.setStyle(self.stationsDefaultStyle);
            const index = self.selectedStations.indexOf(station);
            if (index > -1) {
              self.selectedStations.splice(index, 1);
            }
          }
          self.$bus.$emit('stationSelectedFromMap', station, !isStationSelected);
          return true;
        });
      }
    }
  };
</script>