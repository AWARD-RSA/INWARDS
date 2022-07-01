<template>
  <div style="height: 100%;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100%;">
      <div class="row no-gutters" style="height: 100%;">
      <!-- Column 1 -->
      <div class="col-md-4">

          <!-- Rainfall -->
          <div class="row no-gutters">
           <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%; display: inline; float: none;" >
            <div class="card-body" style="width:100%">
              <RainLevel ref="rainComponent"/>
            </div>
          </div>         
          </div>
          <!-- Estimated Inflow -->
          <div class="row no-gutters">
            <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
            <div class="card-body">
              <DamInflow ref="inflowComponent"/>
            </div>
          </div>          
          </div>
          <!-- Dam Level -->
          <div class="row no-gutters">
             <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
            <div class="card-body">
             <DamLevel ref="damComponent"/>
            </div>
          </div>         
          </div>
          <!-- Canals -->
          <div class="row no-gutters" >
            <!-- Left Canal -->
            <div class="col-md-6">
            <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
              <div class="card-body">
                <DamOutflowLeft ref="leftComponent"/>
              </div>
            </div> 

            </div>

            <!-- Right Canal -->
            <div class="col-md-6">
              <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
                <div class="card-body">
                  <DamOutflowRight ref="rightComponent"/>
                </div>
              </div>               
            </div>
          </div>

          <!-- Outflow  -->
          <div class="row no-gutters" >
            <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
              <div class="card-body">
                <DamLevel ref="damComponent6"/>
              </div>
            </div>           
          </div>

      </div>
    <!-- Column 2  -->
    <div class="col-md-4">
        <!-- Sites Map  -->

        <div class="row no-gutters" >
          <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
            <div class="card-body">
              <img style="width: 100%;" src="@/assets/sites.png">
            </div>
          </div>            
        </div>  
        <!-- Total Loss  -->
        <div class="row no-gutters" >
          <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
            <div class="card-body">
              <TotalLoss ref="totalComponent"/>
            </div>
          </div>            
        </div>  
                          <div class="row no-gutters">
           <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width:100%;">
            <div class="card-body" style="width:100%">
          <div class="row">  
          <div class="col-md-6">
          <div class="form-inline">
            <div class="form-group">
              <label class="datepicker" for="dateStart" style="padding-left: 0px;">Start Date:</label>
              <input type="date" class="form-control datepicker" id="dateStart" style="margin-left: 4px; width: 65%">
            </div>
          </div>
          </div>
          <div class="col-md-6">
          <div class="form-inline" style="padding-left: 0px;">
            <div class="form-group">
              <label class="datepicker" for="dateEnd" style="padding-right: 4px;">End Date:</label>
              <input type="date" class="form-control datepicker" id="dateEnd" style="margin-right: 2px; width: 65%;" @onload="setDates()">
            </div>
          </div>
          </div>
          <div class="col-md-12">
             <button class="btn inwards_button" type="button" style="width: 100%" @click="updateCharts()">
            <i class="fa fa-line-chart"></i>Update Dashboard
          </button>
        </div>
        </div>
        </div>
        </div>
        </div>
         <!-- Stewards Farm  -->
        <div class="row no-gutters" >
        <!-- Estimated Loss Stewards Farm  -->
              <div class="col-md-12">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <StewardsFarmLoss ref="stewardslossComponent"/>
                </div>
                </div>
              </div>                
            </div>    


            <!-- Stewards Farm Calcs  -->
            <div class="row no-gutters" >
               <!-- Stewards Observed  -->
              <div class="col-md-6">
              <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
                <div class="card-body">
                    <StewardsObserved ref="stewardsobservedComponent"/>
                  </div>
                </div> 
               </div>
               <!-- Stewards Expected  -->
                <div class="col-md-6">
                <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
                  <div class="card-body">
                   <StewardsExpected ref="stewardsexpectedComponent"/>
                  </div>
                </div> 
                </div>
            </div>             
        </div>  
    <!-- Column 3  -->
    <div class="col-md-4">

         <!-- Pump Station -->
        <div class="row no-gutters" >
        <!-- Estimated Loss Pump Station  -->
            <div class="row no-gutters" >
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <PumpStationLoss ref="pumplossComponent"/>
                </div>
              </div>                 
            </div>    
            <!-- Pump Station Calcs  -->
            <div class="row no-gutters" >
               <!-- Pump Station Observed  -->
               <div class="col-md-6">
                <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
                  <div class="card-body">
                    <PumpStationObserved ref="pumpobservedComponent"/>
                  </div>
                </div> 
               </div>
               <!-- Pump Station Expected  -->
               <div class="col-md-6">
                <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
                  <div class="card-body">
                   <PumpStationExpected ref="pumpexpectedComponent"/>
                  </div>
                </div> 
               </div>
            </div>             
        </div> 
         <!-- River View  -->
        <div class="row no-gutters" >
        <!-- Estimated Loss Stewards Farm  -->
            <div class="row no-gutters" >
               <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <RiverViewLoss ref="riverviewlossComponent"/>
                </div>
              </div>              
            </div>    
            <!-- River View  -->
            <div class="row no-gutters" >
               <!-- River View  -->
               <div class="col-md-6">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <RiverViewObserved ref="riverviewobservedComponent"/>
                </div>
              </div>
               </div>
               <!-- River View  -->
               <div class="col-md-6">
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <RiverViewExpected ref="riverviewexpectedComponent"/>
                </div>
              </div>
               </div>

            </div>             
        </div>  
    </div>
      </div>
    </div>
  </div>
  </template>
<script>
  import axios from 'axios';
  import NavButtons from '../../components/NavButtons';
  import DamLevel from './DamLevel';
  import DamInflow from './DamInflow';
  import TotalLoss from './TotalLoss';
  import StewardsExpected from './StewardsExpected';
  import StewardsObserved from './StewardsObserved';
  import StewardsFarmLoss from './StewardsFarmLoss';
  import PumpStationExpected from './PumpStationExpected';
  import PumpStationLoss from './PumpStationLoss';
  import PumpStationObserved from './PumpStationObserved'; 
  import RiverViewExpected from './RiverViewExpected';
  import RiverViewLoss from './RiverViewLoss';
  import RiverViewObserved from './RiverViewObserved'; 
  import RainLevel from './RainLevel';
  import DamOutflowRight from './DamOutflowRight';
  import DamOutflowLeft from './DamOutflowLeft';
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
      NavButtons,
      DamLevel,
      DamInflow,
      StewardsExpected,
      StewardsObserved,
      StewardsFarmLoss,
      PumpStationExpected,
      PumpStationLoss,
      PumpStationObserved,
      RiverViewExpected,
      RiverViewLoss,
      RiverViewObserved,
      DamOutflowLeft,
      TotalLoss,
      DamOutflowRight,
      RainLevel,
      StatusBar
    },
    data () {
      return {
      };
    },
    mounted () {
      document.getElementById('dateStart').setAttribute('value', '2020-10-01');
      document.getElementById('dateEnd').setAttribute('value', '2022-09-30');
      let self = this;
      let startDate = new Date();
      startDate = '2019-10-01';
      let endDate = this.formatDate(new Date());
      this.$refs.inflowComponent.displayChart('chartComponent-unverified-inflow', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.damComponent.displayChart('chartComponent-unverified-timeseries-X2H016FW', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.rainComponent.displayChart('chartComponent-unverified-timeseries-X2H018FW', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.leftComponent.displayChart('chartComponent-unverified-outflow-left', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.rightComponent.displayChart('chartComponent-unverified-outflow-right', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.totalComponent.displayChart('total-loss-dam', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.stewardslossComponent.displayChart('total-loss-stewards', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.stewardsobservedComponent.displayChart('observed-stewards', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.stewardsexpectedComponent.displayChart('expected-stewards', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.pumplossComponent.displayChart('loss-pump', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.pumpobservedComponent.displayChart('observed-pump', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.pumpexpectedComponent.displayChart('expected-pump', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.riverviewlossComponent.displayChart('loss-riverview', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.riverviewobservedComponent.displayChart('observed-riverview', this.formatDate(dateStart), this.formatDate(dateEnd));
      this.$refs.riverviewexpectedComponent.displayChart('expected-riverview', this.formatDate(dateStart), this.formatDate(dateEnd));

    },
    methods: {
      updateCharts () {
        let dateStartString = $('#dateStart').val();
        let dateEndString = $('#dateEnd').val();
        let startDate = new Date(dateStartString);
        let endDate = new Date(dateEndString);
        this.$refs.complianceTable.updateTable();
      }
    }
  };
</script>
