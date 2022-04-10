<template>
  <div class="component">
    <LoginComponent/>
    <DatabaseLoaderComponent ref="databaseLoaderComponent"/>
    <div class="status-bar">
      <div class="row">
        <div class="col-10 status">
          <p></p>
        </div>
        <div class="col-2">
          <div class="pull-right">
            <div class="online" style="color: white;">Online<img class="bullet-icon" src="../assets/bullet-green.png" alt="Online"></div>
            <div class="offline" style="color: white;">Offline<img class="bullet-icon" src="../assets/bullet-red.png" alt="Offline"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .status-bar {
    position: fixed;
    z-index: 999;
    bottom: 0;
    height: 20px;
    background-color: #3C3C3C;
    font-size: 10pt;
    width: 100%;
    padding-right: 25px;
    padding-left: 20px;
  }
  .offline {
    display: none;
  }
  .bullet-icon {
    margin-bottom: 1px;
  }
</style>
<script>
import $ from 'jquery';
import LoginComponent from './LoginComponent';
import DatabaseLoaderComponent from './DatabaseLoaderComponent';
import {dbReady} from '../sqlite/index';
export default {
  mounted () {
    if (!dbReady) {
      this.$refs.databaseLoaderComponent.showModal();
    }
  },
  components: {
    LoginComponent,
    DatabaseLoaderComponent
  },
  methods: {
    checkOnline () {
      let self = this;
      (async () => {
        let _isOnline = navigator.onLine;
        if (_isOnline) {
          $('.online').show();
          $('.offline').hide();
        } else {
          $('.online').hide();
          $('.offline').show();
        }
        setTimeout(function () {
          self.checkOnline();
        }, 5000);
      })();
    }
  }
};
</script>