<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="verification-modal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
                <div class="text-center">
                    Discharge Verification
            <img class="rounded float-right" src="../../assets/iucma.png" style="width: 10%;"/>
        </div>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
        </div>
          <div class="modal-body">

            <div class="row">
               <div class="col-md-6">
                  <p class="divider-text"> 
                    <span class="bg-light">Calibration Type</span>
                  </p>
                    <div class="funkyradio" style="width: 100%;">
                    <div class="form-check form-check-inline funkyradio-primary" style="width: 100%;">
                        <input
                        name="chart_components"
                        id="virtual"
                        type="checkbox"
                        :checked="selected === 'virtual'"
                        @click="toggle('virtual')"
                        class="form-check-input"
                        />
                        <label for="virtual" class="form-check-label" style="width: 100%;">Virtual Calibration</label>
                    </div>
                    <div class="form-check form-check-inline funkyradio-primary" style="width: 100%;">
                        <input
                        name="chart_components"
                        id="calibration"
                        type="checkbox"
                        :checked="selected === 'calibration'"
                        @click="toggle('calibration')"
                        class="form-check-input"
                        />
                        <label for="calibration" class="form-check-label" style="width: 100%;">Station Level Calibration</label>
                    </div>
                </div>
                </div>
                <div class="col-md-6">                            
                  <p class="divider-text"> 
                    <span class="bg-light">Date of observation/calibration</span>
                  </p>
                    <div class="form-group">
                        <input type="datetime-local" name="to" value="2014-12-08T15:43:00" class="form-control form-control-sm rounded-0 inwards_label" id="dateObserved">
                    </div>
                </div>
            <div class="col-md-6">
                  <p class="divider-text"> 
                    <span class="bg-light">Select Station</span>
                  </p>
                <div class="form-group">
                    <multiselect :options="stations" v-model="selectedStations" :multiple="false" :max-height="300"></multiselect>
                </div>       
        </div>
        <div class="col-md-6">
                  <p class="divider-text"> 
                    <span class="bg-light">Enter Observed/Captured Stage Height<b>(m)</b></span>
                  </p>
                <div class="form-group">
                    <multiselect :options="gaugeHeights" v-model="selectedGaugeHeight" :multiple="false" @input="fetchDischarge()" :max-height="300"></multiselect>
                </div>
        </div>
            <div class="col-sm-12">
             <div class="row">
             <div class="col-sm-4">
                <p class="divider-text"> 
                    <span class="bg-light">Observed/calibrated Stage</span>
                  </p>
                <div class="form-group">
                    <input 
                    id="observedStage" 
                    type="text" 
                    class="form-control form-control-sm rounded-0 inwards_label"
                    :disabled="isDisabled"
                    v-model="observedStageValue"
                    >
                </div>
              </div>
              <div class="col-sm-4">
                <p class="divider-text"> 
                    <span class="bg-light">Stage according to probe</span>
                  </p>
               <div class="form-group">
                 <input type="text" class="form-control form-control-sm rounded-0 inwards_label" id="databaseStage" disabled>
                </div>
              </div>
              <div class="col-sm-4">
                <p class="divider-text"> 
                    <span class="bg-light">Stage variation</span>
                  </p>
               <div class="form-group">
                 <input type="text" class="form-control form-control-sm rounded-0 inwards_label" id="heightVariation" disabled>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-sm-4">
                <p class="divider-text"> 
                    <span class="bg-light">Observed/calibrated discharge</span>
                  </p>
                <div class="form-group">
                    <input 
                    id="dischargeEstimate" 
                    type="text" 
                    class="form-control form-control-sm rounded-0 inwards_label"
                    :disabled="isDisabled"
                    v-model="dischargeEstimateValue"
                    >
                </div>
              </div>
              <div class="col-sm-4">
                <p class="divider-text"> 
                    <span class="bg-light">Discharge according to probe</span>
                  </p>
                <div class="form-group">
                    <input 
                    id="dischargeProbe" 
                    type="text" 
                    class="form-control form-control-sm rounded-0 inwards_label"
                    :disabled="isDisabled"
                    v-model="dischargeProbeValue"
                    >
                </div>
              </div>
              <div class="col-sm-4">
                <p class="divider-text"> 
                    <span class="bg-light">Discharge variation</span>
                  </p>                
               <div class="form-group">
                 <input type="text" class="form-control form-control-sm rounded-0 inwards_label" id="dischargeVariation" disabled>
                </div>
              </div>
            </div>
            </div>             
            <div class="col-md-6">
                <p class="divider-text"> 
                    <span class="bg-light">Correction Start Date:</span>
                  </p>
                <div class="form-group">
                    <input
                    type="datetime-local"
                    name="to"
                    :value="currentDateTime"
                    @input="updateDateTime($event)"
                    class="form-control form-control-sm rounded-0 inwards_label"
                    id="startDate"
                    />
            </div> 
            </div>
                <div class="col-md-6">   
                    <p class="divider-text"> 
                    <span class="bg-light">Correction End Date:</span>
                  </p>
                    <div class="form-group">
                    <input type="datetime-local" name="to" value="2030-10-01T15:43:00" class="form-control form-control-sm rounded-0 inwards_label" id="endDate">
                </div>
                </div>
            <div class="col-md-12">
             <p class="divider-text"> 
               <span class="bg-light">Correction Methods</span>
             </p>
            </div>
            <div class="col-md-4">
                    <div class="funkyradio" style="width: 100%;">
                    <div class="form-check form-check-inline funkyradio-primary" style="width: 100%;">
                        <input
                        name="chart_components"
                        id="simpleCorrection"
                        type="checkbox"
                        :checked="selectedStats === 'simpleCorrection'"
                        @click="toggleStat('simpleCorrection')"
                        class="form-check-input"
                        />
                        <label for="simpleCorrection" class="form-check-label" style="width: 100%;">Simple Gain/Loss Correction (%)</label>
                    </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="funkyradio" style="width: 100%;">
                    <div class="form-check form-check-inline funkyradio-primary" style="width: 100%;">
                        <input
                        name="chart_components"
                        id="linearLoss"
                        type="checkbox"
                        :checked="selectedStats === 'linearLoss'"
                        @click="toggleStat('linearLoss')"
                        class="form-check-input"
                        />
                        <label for="linearLoss" class="form-check-label" style="width: 100%;">Linear Gain/Loss model</label>
                    </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="funkyradio" style="width: 100%;">
                    <div class="form-check form-check-inline funkyradio-primary" style="width: 100%;">
                        <input
                        name="chart_components"
                        id="exponentialLoss"
                        type="checkbox"
                        :checked="selectedStats === 'exponentialLoss'"
                        @click="toggleStat('exponentialLoss')"
                        class="form-check-input"
                        />
                        <label for="exponentialLoss" class="form-check-label" style="width: 100%;">Exponential Gain/Loss Correction</label>
                    </div>
                </div>
            </div>
            </div>
            <hr>
            <div class="modal-footer">
                <div class="btn inwards_button">Apply Correction</div>
            </div>
            </div>
            </div>          
            </div>
            </div>
  </template>
  <script>
  import $ from 'jquery';
  const { dialog } = require('electron').remote;
  const { remote } = require('electron');
  const path = require("path");
  import stateStore from '../../store/state_handler';
  export default {
    data: function() {
        return {
            stations: [],
            uploadPercentage: 0,
            selectedStations: "",
            gaugeHeights: [],
            selectedGaugeHeight: "",
            currentDateTime: "",
            fileURL: '',
            fileName: '',
            userCode: '',
            file:'',
            successAlert: false,
            errorAlert: false,
            uploadedImage:'',
            discharge: [],
            selected: 'virtual',
            selectedStats: 'simpleCorrection',
            isDisabled: true,
            dischargeEstimateValue: '',
            dischargeProbeValue: '',


        };
    },
    created () {
            // Get current date and time
    const now = new Date();
    // Convert to YYYY-MM-DDTHH:MM format
    const dateTime = now.toISOString().substring(0, 16);
    this.currentDateTime = dateTime;

    stateStore.getState(
        stateStore.keys.loginStatus, (status) => {
            this.userCode = status['uniqueCode'];
            console.log(this.userCode);
        }
        );
        this.$http.get('https://inwards.award.org.za/app_json/iucma_verification/stations_all.php')
        .then(
          response => {
            this.stations = response.data;
            //console.log(this.stations);
          })
        .catch(function (error) {
          console.log(error);
        });
        this.$http.get('https://inwards.award.org.za/app_json/gauge_heights.php')
        .then(
          response => {
            this.gaugeHeights = response.data;
            //console.log(this.stations);
          })
        .catch(function (error) {
          console.log(error);
        });
    },     
    methods: {
        showVerifyForm () {
        let operationalModel = $('#verification-modal');
        var today  = new Date();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var H = today.getHours();
        var i = today.getMinutes();
        var s = today.getSeconds();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        today = yyyy + '-' + mm + '-' + dd+'T'+H+':'+i+':'+s;
        console.log(today);
        document.getElementById('dateObserved').value = today;
        operationalModel.modal({
          keyboard: true
        });
      },
      toggle(option) {
      if (this.selected === option) {
        this.selected = ''; // deselect if the same box is clicked again
      } else {
        this.selected = option; // set the selected box
    }

    },
    toggleStat(option) {
        if (this.selectedStats === option) {
        this.selectedStats = ''; // deselect if the same box is clicked again
      } else {
        this.selectedStats = option; // set the selected box
      }

    },
      onChangeFileUpload(){
        this.file = this.$refs.file.files[0];
        document.getElementById("gaugeThumbnail").src = this.file.path;
      },
      updateDateTime(event) {
        this.currentDateTime = event.target.value;
      },
      uploadImage (imageId) {    
            let dateObserved = $('#dateObserved').val();
            let stationsAll = this.selectedStations;
            let stationSplit = stationsAll.split(':');
            let siteCode = stationSplit[0];
            console.log(siteCode);
            let segment = $('#segment').val();
            let height = this.selectedGaugeHeight;
            let discharge =   $('#dischargeEstimate').val();
            let api = 'https://inwards.award.org.za/app_json/upload_data/stage.php?image_url='+imageId+'&user_code=' + this.userCode + '&station=' + siteCode + '&date_taken=' + dateObserved + '&plate=' + segment + '&stage_height=' + height + '&discharge=' + discharge;
            $.get(api, function (dataAPI) {
                if (dataAPI === 'true') {
                dialog.showMessageBox(null, {
                    type: 'info',
                    message: 'Successfully Submited!',
                    buttons: ['OK']
                });
                
                } else {
                dialog.showMessageBox(null, {
                    type: 'info',
                    message: 'Failed to Submit Please Try Again or Contact Admin!',
                    buttons: ['OK']
                });
                }
            }); 
    },
    fetchDischarge(){
        let stationsAll = this.selectedStations;
        let stationSplit = stationsAll.split(':');
        let siteCode = stationSplit[0];
        let heightPlate = this.selectedGaugeHeight;
        //console.log('https://inwards.award.org.za/app_json/plate_convert.php?station='+siteCode+'&height='+heightPlate);
        this.$http.get('https://inwards.award.org.za/app_json/iucma_verification/plate_convert.php?station='+siteCode+'&height='+heightPlate)
        .then(
          response => {
            this.discharge = response.data;
            console.log(this.discharge);
            console.log(this.discharge[0].flow);
            this.dischargeEstimateValue = this.discharge[0].flow;
            //document.getElementById("dischargeEstimate").value = this.discharge[0].flow;
          })
        .catch(function (error) {
          console.log(error);
        });


    },
    submitVerify(){
            let userCodeglobal = this.userCode;
            let dateObserved = $('#dateObserved').val();
            let stationsAll = this.selectedStations;
            let stationSplit = stationsAll.split(':');
            let siteCode = stationSplit[0];
            console.log(siteCode);
            let segment = $('#segment').val();
            let height = this.selectedGaugeHeight;
            let dischargeEst = $('#dischargeEstimate').val(); 
            let formData = new FormData();

            const config = {
                //Choose upload
                onUploadProgress: event => {
                    this.imageUploadPercentage = Math.round(
                        (event.loaded * 100) / event.total
                    );
                },
            };
            var imageURL = '';        
            formData.append('file', this.file);
            this.axios.post('https://inwards.award.org.za/app_json/data_upload/image.php',
                formData,
                {
                  headers: {
                  'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                  this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                }.bind(this)       
               }

            ).then(
            function(data){
              imageURL = data.data.message; 
            },
            ).then(function(){
                let callApi = 'https://inwards.award.org.za/app_json/data_upload/stage.php?image_url='+imageURL+'&user_code=' + userCodeglobal + '&station=' + siteCode + '&date_taken=' + dateObserved + '&plate=' + segment + '&stage_height=' + height + '&discharge=' + dischargeEst;
                $.get(callApi, function (data) {
                    if (data === 'true') {
                    dialog.showMessageBox(null, {
                        type: 'info',
                        message: 'Successfully Submited!',
                        buttons: ['OK']
                    });
                    $('#verification-modal').modal('hide');
                    } else {
                    dialog.showMessageBox(null, {
                        type: 'info',
                        message: 'Failed to Submit Please Try Again or Contact Admin!',
                        buttons: ['OK']
                    });
                    }
                });               
            }           
            ).catch(function(){
                console.log('FAILURE!!');
            });
      }
    }
  };
  </script>