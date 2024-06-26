import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table';
//import 'bootstrap-table/dist/bootstrap-table.min.css';
import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import vSelect from 'vue-select';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/util.js';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './static/css/font-awesome.min.css';
import 'vue-select/dist/vue-select.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@knight-lab/timelinejs/dist/css/timeline.css';
import './static/css/custom.css';
import '../utilities/helpers.js';
import { Titlebar, Color } from 'custom-electron-titlebar';
import App from './App.vue'
import router from './router/index';
import store from './store/index';
import db from './datastore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "jquery-ui/dist/jquery-ui.js";
import 'jquery-ui/ui/widgets/resizable.js';
import 'jquery-ui/ui/widgets/draggable.js';
import 'jquery-ui/themes/base/all.css';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { faBug, faFishFins, faMap, faUserSecret, faUser, faVial, faTint, faMapMarkedAlt, faWater, faSliders, faArrowUp, faArrowDown, faCircle, faRightLeft, faFile, faFolderOpen, faSave, faProjectDiagram, faCalculator, faFaucetDrip, faArrowUpFromWaterPump, faArrowUpFromGroundWater, faCube, faTrash, faRefresh, faChartLine, faMagnifyingGlassChart, faInfo } from '@fortawesome/free-solid-svg-icons';
const { getCurrentWindow } = require('electron');
const { ipcMain, dialog } = require('electron');
const { ipcRenderer } = require('electron');
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'


//import 'bootstrap-table/dist/bootstrap-table.min.js';
library.add(faUserSecret, faFishFins, faMap, faBug, faUser, faVial, faTint, faMapMarkedAlt, faWater, faSliders, faArrowUp, faArrowDown, faCircle, faRightLeft, faFile, faFolderOpen, faSave, faProjectDiagram, faCalculator, faFaucetDrip, faArrowUpFromWaterPump, faArrowUpFromGroundWater, faCube, faTrash, faRefresh, faChartLine, faMagnifyingGlassChart, faInfo);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const path = require('path');
const isDev = process.env.NODE_ENV === 'development'
Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)
Vue.http = Vue.prototype.$http = axios
Vue.use(VueKatex)
Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = isDev
Vue.prototype.$db = db
Vue.prototype.$ = $
Vue.prototype.$bus = new Vue()
Vue.prototype.isLoggedIn = false


// tslint:disable-next-line: no-unused-expression
/* eslint-disable no-new */
Vue.use(VueAxios, axios);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
if (window && window.process && window.process.type === 'renderer') {
  const { ipcRenderer } = require('electron')

  // handle menu event updates from main script
  ipcRenderer.on('change-view', (event, data) => {
    if (data.route) {
      router.push(data.route)
    }
  })
}
/* const titleBar = new Titlebar({
  backgroundColor: Color.fromHex('#3C3C3C'),
  icon: require('./assets/icon.png')
}); */
let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#3C3C3C"),
    itemBackgroundColor: Color.fromHex("#121212"),
    svgColor: Color.WHITE,
    icon: require('@/assets/icon.png'),
    //menu: null // = do not automatically use Menu.applicationMenu
  })

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})