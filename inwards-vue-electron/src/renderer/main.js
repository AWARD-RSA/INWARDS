import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
import vSelect from 'vue-select';
import $ from 'jquery';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/util.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import './static/css/font-awesome.min.css';
import 'vue-select/dist/vue-select.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import '@knight-lab/timelinejs/dist/css/timeline.css';
import Multiselect from 'vue-multiselect';
import './static/css/custom.css';
import '../utilities/helpers.js';
import { Titlebar, Color } from 'custom-electron-titlebar';
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import db from './datastore';
import sqlite from './sqlite';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBug, faFishFins, faMap, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
const { getCurrentWindow } = require('electron').remote;
library.add(faUserSecret);
library.add(faFishFins);
library.add(faMap);
library.add(faBug);
library.add(faUser);

Vue.component('font-awesome-icon', FontAwesomeIcon);
const path = require('path');
const isDev = process.env.NODE_ENV === 'development'
Vue.http = Vue.prototype.$http = axios;
Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = isDev
Vue.prototype.$db = db;
Vue.prototype.$ = $;
Vue.prototype.$bus = new Vue();
Vue.prototype.isLoggedIn = false;
Vue.component('v-select', vSelect);
Vue.component('multiselect', Multiselect);
// tslint:disable-next-line: no-unused-expression
/* eslint-disable no-new */
Vue.use(VueAxios, axios);
new Vue({
  el: '#app',
  vuetify,
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
    icon: path.join(__dirname, './assets', '/icon.png'),
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