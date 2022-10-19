<template>
  <div style="height: 100vh;">
    <StatusBar/>
    <div class="container-fluid" style="height: 100vh;;">
      <div class="row no-gutters" style="height: 100vh;">
      
      <!-- Column 1 -->
      
      <div class="col-md-4" style="height: 100vh;">
        
        <div style="padding: 10px; padding-right: 10px; background: none; border:1px solid white;  border:1px solid white; box-shadow: 1px 1px 5px white inset;">
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><div class="numberCircle">1</div></div>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">Input Discharge</h5></div>
        <div class="row no-gutters">
           <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width:100%;">
            <div class="card-body" style="width:100%;overflow:auto; max-height:250px;">
          <div class="row no-gutters">  
          <div class="col-md-12" style="padding: 1px; background: none;">

            <OverviewTable ref="overviewComponent"/>

        </div>
        </div>
        </div>
        </div>
        <button id="unverified" class="btn inwards_button btn-labeled text-left" style="width: 100%" @click="saveSelection()" type="button"><span class="btn-label"><i class="fa fa-line-chart" aria-hidden="true"></i></span>Submit Verified Discharge<i class="fa fa-chevron-right" style="padding-left: 10px;"></i></button>
        </div>
        </div>

          <!-- Rainfall -->
        <div style="padding: 10px; padding-right: 0px; background: none; padding-top: 0px; border:1px solid white;  border:1px solid white; box-shadow: 1px 1px 5px white inset;">
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><div class="numberCircle">2</div></div>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">Goedertrouw Dam Components</h5></div>
          <div class="row no-gutters">
          <div class="col-md-6">
           <div class="card rounded-0" style="width: 100%;" >
            <div class="card-body" style="width:100%">
              <RainLevel ref="rainComponent"/>
            </div>
          </div>         
          </div>
                
          <!-- Dam Level -->
           <div class="col-md-6">
          <div title="Observed dam volume (W1R001) as a %, color bands represent historical condition (i.e High, Moderatly High, Normal, Low, Very Low)" class="card rounded-0" style="width: 100%;">
            <div class="card-body" style="width:100%">
             <DamLevel ref="damComponent"/>
            </div>
          </div>         
          </div>
          </div>
          
          <!-- Canals -->
          <div class="row no-gutters">
            <!-- Left Canal -->
            <div class="col-md-6">
            <div title="Observed daily release from the left canal (W1H029) in million cubic meters per day, directional arrow represents change from day one to day 7" class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
              <div class="card-body">
                <DamOutflowLeft ref="leftComponent"/>
              </div>
            </div> 
            </div>

            <!-- Right Canal -->
            <div class="col-md-6">
              <div title="Observed daily release from the right canal (W1H030) in million cubic meters per day, directional arrow represents change from day one to day 7" class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
                <div class="card-body">
                  <DamOutflowRight ref="rightComponent"/>
                </div>
              </div>               
            </div>
          </div>

          <div class="row no-gutters">
            <!-- Left Canal -->
            <div class="col-md-6">
          <!-- Estimated Inflow -->
            <div title="Estimated inflow into dam (MCM/day), calculated using outflows (canals and downstream) and dam volume change" class="card rounded-0" style="width: 100%;">
            <div class="card-body">
              <DamInflow ref="inflowComponent"/>
            </div>
          </div>
            </div>

            <!-- Right Canal -->
            <div class="col-md-6">
              <div title="Observed outflow from dam at station W1H028" class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <DamOutflow ref="outflowComponent"/>
                </div>
              </div>               
            </div>
          </div>

          <!-- Outflow  
          <div class="row no-gutters" >
            <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
              <div class="card-body">
                <DamLevel ref="damComponent6"/>
              </div>
            </div> 
                            
          </div> -->   

        </div>
      </div>
    <div class="col-md-4">
              <!-- River View  -->
         <div style="padding: 10px; padding-right: 10px; background: none; border:1px solid white;  border:1px solid white; box-shadow: 1px 1px 5px white inset;">
      <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><div class="numberCircle">3</div></div>
      <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">Estimated Upper uMhlathuze Simplified Balance</h5><p style="color:white;">W1H009H3T	Mhlatuze at Riverview (P230)</p></div>
        <div class="row no-gutters">
          <div class="col-md-6">
        <!-- Estimated Loss Stewards Farm  -->
               <div title="Difference in volume of expected vs observed against reference of 0 representing perfect balance" class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <RiverViewLoss ref="riverviewlossComponent"/>
                </div>
            </div>  
          </div> 
             <div class="col-md-6">
              <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
               <div class="card-header inwards_card">7 Day Expected Water Use</div>
                <div class="card-body chart-container2">
                  <iframe src="https://uwasp.award.org.za/web_app/riverview_table.php" width="100%" height="150" style="-webkit-transform:scale(1);-moz-transform-scale(1);"></iframe>
                </div>
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
      <div style="padding: 10px; padding-right: 10px; background: none; padding-top: 0px; border:1px solid white;  border:1px solid white; box-shadow: 1px 1px 5px white inset;">
      <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><div class="numberCircle">4</div></div>
      <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 0px;"><h5 style="color:white;">Estimated Lower uMhlathuze Simplified Balance</h5><p style="color:white;">W1H032H3T	Mhlatuze at Pumpstation (P106)</p></div>
      

      <!-- Pump Station -->
        <div class="row no-gutters">
        <!-- Estimated Loss Pump Station  -->
        <div class="col-md-6">
              <div title="Difference in volume of expected vs observed against reference of 0 representing perfect balance" class="card rounded-0" style="width: 100%;">
                <div class="card-body">
                  <PumpStationLoss ref="pumplossComponent"/>
                </div>
              </div>
              </div>
              <div class="col-md-6">
              <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
               <div class="card-header inwards_card">7 Day Expected Water Use</div>
                <div class="card-body chart-container2">
                  <iframe src="https://uwasp.award.org.za/web_app/pumpstation_table.php" width="100%" height="150" style="-webkit-transform:scale(1);-moz-transform-scale(1);"></iframe>
                </div>
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
 
        </div>   
    <!-- Column 2  -->
    <div class="col-md-4" style="height: 100vh;">
        <!-- Sites Map  -->
        <div style="padding: 10px; padding-right: 10px; background: none; border:1px solid white;  border:1px solid white; box-shadow: 1px 1px 5px white inset;">
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px; margin-top: 5px;"><div class="numberCircle">5</div></div>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">uMhlathuze Estimated Simplified Balance</h5></div>
        <!-- Total Loss  -->
        <div class="row no-gutters" >
          <div title="Difference in volume of expected vs observed against reference of 0 representing perfect balance" class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
            <div class="card-body">
              <TotalLoss ref="totalComponent"/>
          </div>            
        </div>  
        </div>
        <div class="row h-100 justify-content-center align-items-center" style="margin-top: 5px;"><div class="numberCircle">6</div></div>
        <div class="row h-100 justify-content-center align-items-center" style="margin-bottom: 5px;"><h5 style="color:white;">Real-time Discharge Map</h5></div>        
        <div class="row no-gutters">
          <div class="card rounded-0" style="margin-top: 1px; margin-bottom: 1px; width: 100%;">
            <div class="card-body">
              <iframe src="https://uwasp.award.org.za/web_app/uwasp_map.php" width="100%" scrolling="no" height="500" style="-webkit-transform:scale(1);-moz-transform-scale(1);"></iframe>
            </div>
          </div>            
        </div>  
        </div>
         <!-- Stewards Farm  -->
         <div style="padding: 10px; padding-right: 0px; background: none; padding-top: 0px; display:none; border:1px solid white;  border:1px solid white; box-shadow: 1px 1px 5px white inset;">
        <div class="row no-gutters">
        <!-- Estimated Loss Stewards Farm  -->
        
              <div class="card rounded-0" style="width: 100%;">
                <div class="card-body" style="width: 100%;">
                  <StewardsFarmLoss ref="stewardslossComponent"/>
                </div>
              </div>   
            </div>  
             
            <!-- Stewards Farm Calcs  -->
            <div class="row no-gutters">
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
            </div>   
    <!-- Column 3  -->
   
    </div>
    <NavButtons/>
      </div>
    </div>
  </template>
<script>
  import axios from 'axios';
  import Header from '@/components/Header';
  import NavButtons from '@/components/NavButtons';
  import DamLevel from './DamLevel';
  import DamInflow from './DamInflow';
  import DamOutflow from './DamOutflow';
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
  import OverviewTable from './OverviewTable';
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
    Header,
    NavButtons,
    DamLevel,
    DamInflow,
    StewardsExpected,
    StewardsObserved,
    StewardsFarmLoss,
    DamOutflow,
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
    StatusBar,
    OverviewTable
},
    data () {
      return {
      };
    },
    mounted () {

      this.$refs.inflowComponent.displayChart('chartComponent-unverified-inflow');
      this.$refs.outflowComponent.displayChart('chartComponent-unverified-outflow');
      this.$refs.damComponent.displayChart('chartComponent-unverified-timeseries-W1R001FW');
      this.$refs.rainComponent.displayChart('chartComponent-unverified-timeseries-W1E001FW');
      this.$refs.leftComponent.displayChart('chartComponent-unverified-outflow-left');
      this.$refs.rightComponent.displayChart('chartComponent-unverified-outflow-right');
      this.$refs.totalComponent.displayChart('total-loss-dam');
      this.$refs.stewardslossComponent.displayChart('total-loss-stewards');
      this.$refs.stewardsobservedComponent.displayChart('observed-stewards');
      this.$refs.stewardsexpectedComponent.displayChart('expected-stewards');
      this.$refs.pumplossComponent.displayChart('loss-pump');
      this.$refs.pumpobservedComponent.displayChart('observed-pump');
      this.$refs.pumpexpectedComponent.displayChart('expected-pump');
      this.$refs.riverviewlossComponent.displayChart('loss-riverview');
      this.$refs.riverviewobservedComponent.displayChart('observed-riverview');
      this.$refs.riverviewexpectedComponent.displayChart('expected-riverview');
      

    },
    methods: {
      goToUserDefinedDashboard () {
        let self = this;
        let _selectedWMA = [];
        for (let id in self.selectedFeatures) {
          _selectedWMA.push(self.selectedFeatures[id].get('wma'));
        }
        stateStore.setState(stateStore.keys.selectedWMAs, _selectedWMA);
        router.push({ path: 'user-dashboard' });
      },
       goToUwaspDashboard () {
        router.push({ path: 'umhlathuze-dashboard' });
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
    }
  };
</script>
