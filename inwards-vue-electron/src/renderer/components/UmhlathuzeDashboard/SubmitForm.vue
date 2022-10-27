<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="operational-modal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5><img class="modal-title" src="../../assets/uwasp_logo.png" style="width: 10%;">Gauge Plate Submission</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <div class="row">
                <div class="col-sm-6">                    
                    <h4>Guide to Submitting</h4>
                    <p>Please ensure that the photograph of the gauge plate shows the current water line against the gaugeplate clearly. In addition, please specify the meter segment that the water line represents.</p>
            </div>
            <div class="col-sm-6">
                <img src="../../assets/guide.png" width="30%" class="right">
            </div>
            </div>
            <hr>
            <div class="row" style="margin-top: 10px;">
            <div class="col-sm-6">
                    <img id="gaugeThumbnail" src="../../assets/upload.png" width="100%" @click="uploadImageFile ()">
            </div>
            <div class="col-sm-6">
                <div class="col-sm-12">
                        <h4>Submission Details:</h4>
                        <label>Date and Time of Photograph:</label>
                    </div>                
                  <div class="col-sm-12">
                    <div class="form-group">
                        <input type="datetime-local" name="to" value="2014-12-08T15:43:00" class="form-control" id="dateObserved">
                    </div>
                  </div>                   
                    <div class="col-sm-12">
                        <label>Select station:</label>
                    </div>
                    <div class="col-sm-12">
                    <div class="form-group">
                        <select class="custom-select" style="width:130px;" id="station">
                            <option>W1H009H3T</option>
                            <option>W1H028FW</option>
                            <option>W1H029H3T</option>
                            <option>W1H030H3T</option>
                            <option>W1H032H3T</option>
                            <option>W1R001FW</option>
                        </select>
                        </div>
                    
                  </div>
                  <div class="col-sm-12">
                        <label>Plate Segment:</label>
                    </div>
                    <div class="col-sm-12">
                    <div class="form-group">
                        <select class="custom-select" style="width:130px;" id="segment">
                            <option>1m</option>
                            <option>2m</option>
                            <option>3m</option>
                            <option>4m</option>
                            <option>5m</option>
                            <option>6m</option>    
                        </select>
                        </div>
                    
                         </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row" style="margin-top: 10px;">
                    <div class="col-md-2" align="left">
                    <label>Select Image</label>
                    </div>
                    <div class="col-md-4">
                        <input class="btn inwards_button btn-labeled" type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"/>
                    </div>
                    <div class="col-md-6">
                        <button class="btn inwards_button btn-labeled" v-on:click="submitForm()"><span class="btn-label"><i class="fa fa-file-image-o"></i></span>Upload Gauge Plate Reading<i class="fa fa-upload" style="padding-left: 10px;"></i></button>
                </div>
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
            fileURL: '',
            fileName: '',
            userCode: '',
            file:'',
            successAlert: false,
            errorAlert: false,
            uploadedImage:'',
        };
    },
    created () {
    stateStore.getState(
        stateStore.keys.loginStatus, (status) => {
            this.userCode = status['uniqueCode'];
            console.log(this.userCode);
        }
        );
    },   
    methods: {
        showSubmitForm () {

           
        let operationalModel = $('#operational-modal');
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
        //2014-12-08T15:43:00
        //2022-10-23T07:08:35
        //2022-10-23T7:5:47
        today = yyyy + '-' + mm + '-' + dd+'T'+H+':'+i+':'+s;

        console.log(today);
        document.getElementById('dateObserved').value = today;
        operationalModel.modal({
          keyboard: true
        });
      },
      submitServer(callback = null) {

        let dateObserved = $('#dateObserved').val();
        let station = $('#station').val();
        let segment = $('#segment').val();

        //let api = 'https://uwasp.award.org.za/app_json/uwasp_dash/stage.php?user_code=' + userCode + '&station=' + station + '&dateObserved=' + dateObserved + '&segment=' + segment;
       
        var bitmap = fs.createReadStream(this.fileURL);
        //const image =  fs.readFile(this.fileURL, 'utf8', function(err, data) {       if (err) throw err;     console.log(data); });
            // convert binary data to base64 encoded string
        //var base64str =  Buffer(bitmap).toString('base64');
       // console.log(base64str);
        
         let urlAPI = "https://uwasp.award.org.za/app_json/uwasp_dash/image.php";
        // `form-data` library gives us a similar API in Node.js to the `FormData` interface in the browser
        //var image = this.fileURL;
        //let image = remote.app.getPath('userData')+ this.fileName;
        console.log(remote.app.getPath('userData')+"\\"+this.fileName);
        var  formData = new FormData();
        

        formData.append('image', bitmap);
        let url = 'https://uwasp.award.org.za/app_json/uwasp_dash/image.php';
      //  axios.post(url, formData, {
            
          //  }).then(response => {
          ////      console.log(response.data);
         //       console.log('User states in server has been updated');
         //   if (callback) {
         //           callback();
        //    }
        //});     
        //$.get(api, function (data) {
        //  if (data === 'true') {
        //    dialog.showMessageBox(null, {
        //      type: 'info',
        //      message: 'Successfully Submitted Reserve!',
        //      buttons: ['OK']
        //    });
        //  } else {
        //    dialog.showMessageBox(null, {
        //      type: 'error',
        //      message: 'Failed to Submit!',
        //      buttons: ['OK']
        //    });
        //  }
       // });
      },
      onChangeFileUpload(){
        this.file = this.$refs.file.files[0];
        document.getElementById("gaugeThumbnail").src = this.file.path;
      },
      uploadImage (imageId) {    
            let dateObserved = $('#dateObserved').val();
            let station = $('#station').val();
            let segment = $('#segment').val();  
        let api = 'https://uwasp.award.org.za/app_json/uwasp_dash/stage.php?image_url='+imageId+'&user_code=' + this.userCode + '&station=' + station + '&date_taken=' + dateObserved + '&plate=' + segment;
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
    submitForm(){
            

            let userCodeglobal = this.userCode;
            let formData = new FormData();
            var imageURL = '';
            
            formData.append('file', this.file);


  
            this.axios.post('https://uwasp.award.org.za/app_json/uwasp_dash/image.php',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(
            
            function(data){
              //console.log(data.data.message);
              imageURL = data.data.message; 
              
            },
                   
            ).then(function(){

                //this.uploadImage(imageURL);
            
            let dateObserved = $('#dateObserved').val();
            let station = $('#station').val();
            let segment = $('#segment').val();  
            //console.log(userCodeglobal);
            let callApi = 'https://uwasp.award.org.za/app_json/uwasp_dash/stage.php?image_url='+imageURL+'&user_code=' + userCodeglobal + '&station=' + station + '&date_taken=' + dateObserved + '&plate=' + segment;
            //console.log('https://uwasp.award.org.za/app_json/uwasp_dash/stage.php?image_url='+imageURL+'&user_code=' + userCodeglobal + '&station=' + station + '&date_taken=' + dateObserved + '&plate=' + segment);
            $.get(callApi, function (data) {
                if (data === 'true') {
                dialog.showMessageBox(null, {
                    type: 'info',
                    message: 'Successfully Submited!',
                    buttons: ['OK']
                });
                $('#operational-modal').modal('hide');
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

            
            //uploadImage();

      },    
      base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer(bitmap).toString('base64');
      },
      uploadImageFile() {

        // opens a window to choose file
        dialog.showOpenDialog({properties: ['openFile']}).then(result => {

            // checks if window was closed
            if (result.canceled) {
                console.log("No file selected!")
            } else {

                // get first element in array which is path to file selected
                const filePath = result.filePaths[0];
                //document.getElementById("imageURL").value = filePath;
                document.getElementById("gaugeThumbnail").src = filePath;
                this.fileURL = result.filePaths[0];
                // get file name
                this.fileName = path.basename(filePath);

                  // Copy the chosen file to the application's data path
                fs.copyFile(filePath, (remote.app.getPath('userData') +"\\"+ this.fileName), (err) => {
                    if (err) throw err;
                    console.log('Image ' + this.fileName + ' stored.');

                    // At that point, store some information like the file name for later use
                });

            }
        });
        }
    }
  };
  </script>