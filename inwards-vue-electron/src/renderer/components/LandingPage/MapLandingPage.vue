<template>
  <div style="width: 100%; height: 100%; margin: 0; padding: 0;">
    <StatusBar/>
    <Header/>
    <div id="overlay">
      <div class="row" style="height: 100%;">
      <div class="col-md-12">
      <div class="card rounded-0">
        <div class="card-header inwards_card"><h6 style="color: white;"><i class="fa fa-map" style="padding-right: 10px;"></i>Your selected WMAs</h6></div>
        <div class="card-body">
          <div class="row justify-content-md-center" style="margin-top: 5px; margin-bottom: 5px;">
                  <div class="col-md-12"> 
                     <label class="custom-control wma-toggle custom-checkbox">
                      <input id="pongola_mtamvuna" type="checkbox" class="custom-control-input">uMhlathuze
                      <span class="custom-control-indicator"></span>
                  </label>
                  </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                  <div class="btn-group-vertical" style="width:100%">
                    <button id="home" class="btn inwards_button" style="width: 100%; display:none;" @click="goHome()" type="button">Home<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
                    <button id="unverified" class="btn inwards_button" style="width: 100%" @click="saveSelection()" type="button"><div><img src="@/assets/dws_site.jpg" alt="" style="height:100px;"></div>Unverified Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
                    <button id="userDash" class="btn inwards_button" style="width: 100%" @click="goToUserDefinedDashboard()" type="button">User Defined Dashboard<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>

                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="overlay-logos">
      <div class="container-fluid container-fluid-logo" style = "margin-top: 0; margin-bottom: 0; position: absolute; bottom: 0; ">
          <div class="grid grid-logo" style="margin-bottom: 2px;">
            <div><img src="@/assets/dws.png" alt=""></div>
            <div><img src="@/assets/award.svg" alt=""></div>
            <div><img src="@/assets/uwasp_logo.png" alt=""></div>
            <div><img src="@/assets/nbi_logo.jpg" alt=""></div>
            <div><img src="@/assets/wwf_logo.jpg" alt=""></div>
            <div><img src="@/assets/giz_logo.png" alt=""></div>
            <div><img src="@/assets/giz_imp.png" alt=""></div>
            <div><img src="@/assets/natres_logo.png" alt=""></div>
            <div><img src="@/assets/kartoza.png" alt=""></div>
            <div><img src="@/assets/usaid.png" alt=""></div>
            <div><img src="@/assets/jrs-logo.svg" alt=""></div>
          </div>
        </div>
    </div>
    <div class="map-container">
      <div class="container-fluid" style="height: 100%; width:100%">
        <div class="col-md-12" style="width: 100%; height: 100%; margin: 0; padding: 0;">
          <div id="map" style="width: 100%; height: 100%; position:fixed"></div>
          </div>
        </div>
      </div>
      <div class="reset-application-data-container" style="position: absolute; bottom: 0; margin-bottom: 50px; margin-left: 20px;">
        <div id='reset' style="display:none;" class="btn inwards_button" v-on:click="resetApplicationData">Reset application data</div>
      </div>
    </div>
</template>
<script>
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  import {Fill, Stroke, Style} from 'ol/style';
  import WmaJson from '@/assets/umhlatuze_catchment_dissolve.json';
  import Header from '@/components/Header';
  import $ from 'jquery';
  import stateStore from '../../store/state_handler';
  import router from '@/router/index';
  import StatusBar from '../StatusBar';

  export default {
    data () {
      return {
        selectedWMA: [],
        selectedFeatures: {}
      };
    },
    mounted () {
      let self = this;
      // Create a map
      let map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
      let vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: (new GeoJSON({
            defaultDataProjection: 'EPSG:4326'
          })).readFeatures(WmaJson, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          })
        }),
        updateWhileAnimating: true,
        updateWhileInteracting: true
      });
      // when we move the mouse over a feature, we can change its style to
      // highlight it temporarily
      let highlightStyle = new Style({
        stroke: new Stroke({
          color: [255, 0, 0, 0.6],
          width: 2
        }),
        fill: new Fill({
          color: [255, 0, 0, 0.2]
        }),
        zIndex: 1
      });
      let highlightedFeature = null;
      map.addLayer(vectorLayer);
      map.getView().fit(vectorLayer.getSource().getExtent());
      // Map on hover
      map.on('pointermove', function (e) {
        if (highlightedFeature !== null && !self.selectedFeatures.hasOwnProperty(highlightedFeature.ol_uid)) {
          highlightedFeature.setStyle(undefined);
          highlightedFeature = null;
        };
        map.forEachFeatureAtPixel(e.pixel, function (f) {
          if (!self.selectedFeatures.hasOwnProperty(f.ol_uid)) {
            highlightedFeature = f;
            f.setStyle(highlightStyle);
            return true;
          }
        });
      });
      // When map selected update the style
      let selectedStyle = new Style({
        stroke: new Stroke({
          color: [76, 175, 80, 0.6],
          width: 2
        }),
        fill: new Fill({
          color: [76, 175, 80, 0.2]
        }),
        zIndex: 1
      });
      document.getElementById('pongola_mtamvuna').addEventListener('change', function (element) {
        let check = document.getElementById('pongola_mtamvuna').checked;
        let features = vectorLayer.getSource().getFeatures();
        let feature = features[0];
        if (check === false) {
          delete self.selectedFeatures[feature.ol_uid];
          feature.setStyle(undefined);
        } else {
          self.selectedFeatures[feature.ol_uid] = feature;
          feature.setStyle(selectedStyle);
        }
      });
      // Check selected map from db
      stateStore.getState(
        stateStore.keys.selectedWMAs,
        function (selectedWMAs) {
          if (!selectedWMAs) {
            return;
          }
          let features = vectorLayer.getSource().getFeatures();
          for (let i = 0; i < features.length; i++) {
            let feature = features[i];
            if (selectedWMAs.indexOf(feature.get('wma')) !== -1) {
              feature.setStyle(selectedStyle);
              self.selectedFeatures[feature.ol_uid] = feature;
              document.getElementById(feature.get('wma')).checked = true;
            }
          }
          if (Object.keys(self.selectedFeatures).length > 0) {
            $('.save-selection').attr('disabled', false);
          }
        }
      );
      map.on('click', function (e) {
        // Check if there is a feature
        map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
          if (!self.selectedFeatures.hasOwnProperty(feature.ol_uid)) {
            let check = feature.values_.wma;
            document.getElementById(check).checked = true;
            self.selectedFeatures[feature.ol_uid] = feature;
            feature.setStyle(selectedStyle);
          } else {
            delete self.selectedFeatures[feature.ol_uid];
            feature.setStyle(undefined);
            let check = feature.values_.wma;
            document.getElementById(check).checked = false;
          }
          if (Object.keys(self.selectedFeatures).length > 0) {
            $('.save-selection').attr('disabled', false);
          } else {
            $('.save-selection').attr('disabled', true);
          }
          return true;
        });
      });
    },
    methods: {
      saveSelection () {
        let self = this;
        let _selectedWMA = [];
        for (let id in self.selectedFeatures) {
          _selectedWMA.push(self.selectedFeatures[id].get('wma'));
        }
        stateStore.setState(stateStore.keys.selectedWMAs, _selectedWMA);
        router.push({ path: 'dashboard' });
      },
      goToUserDefinedDashboard () {
        let self = this;
        let _selectedWMA = [];
        for (let id in self.selectedFeatures) {
          _selectedWMA.push(self.selectedFeatures[id].get('wma'));
        }
        stateStore.setState(stateStore.keys.selectedWMAs, _selectedWMA);
        router.push({ path: 'user-dashboard' });
      },
      goHome () {
        router.push({ path: '/' });
      },
      resetApplicationData (e) {
        stateStore.clearAll();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    components: {
      StatusBar,
      Header
    }
  };
</script>
