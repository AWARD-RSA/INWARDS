<template>
  <div class="modal rounded-0 fade modal_center" tabindex="-1" id="operational-modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img class="modal-title" src="@/assets/knp.png" style="width: 20%;">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="password" class="form-control rounded-0" id="operationalCode" placeholder="Enter code">
          </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <input type="date" class="form-control" id="operationalStart">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <input placeholder="Station" type="text" class="form-control" id="stationAdd">
                  </div>
                </div>
              </div>
            <div class="row">
             <div class="col-sm-12">
            <div class="form-group">
               <input placeholder="Entry Label" type="text" class="form-control" id="labelAdd">
            </div>
            </div>
            </div>
            <div class="row">
             <div class="col-sm-12">
             <textarea placeholder="Management Issue" style="width: 100%;" rows="4" cols="50" name="comment" id="mgProblems"></textarea>
             </div>
            <div class="col-sm-12">
            <div class="form-group">
               <input placeholder="Management Options" type="text" class="form-control" id="mgOptions">
            </div>
            </div>
             <div class="col-sm-12">
             <textarea  placeholder="Management Actions" style="width: 100%;" rows="4" cols="50" name="comment" id="mgActions"></textarea>
            </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <input placeholder="Result" type="text" class="form-control" id="resultAdd">
                </div>
                </div>
              </div>
            </div>
          <button id="submitReserve" type="submit" class="btn rounded-0 inwards_button" @click="submit ()">Submit</button>
          <button class="btn rounded-0 inwards_button" type="button" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</template>
<script>
import $ from 'jquery';
const { dialog } = require('electron').remote;
export default {
  methods: {
    showOperationalModal () {
      let operationalModel = $('#operational-modal');
      document.getElementById('operationalStart').valueAsDate = new Date();
      operationalModel.modal({
        keyboard: true
      });
    },
    submit (e) {
      let verifyCode = $('#operationalCode').val();
      let station = $('#stationAdd').val();
      let dateStartString = $('#operationalStart').val();
      console.log(dateStartString);
      let dateStart = new Date(dateStartString);
      let labelAdd = $('#labelAdd').val();
      let MgProblems = $('#mgProblems').val();
      let MgOptions = $('#mgOptions').val();
      let MgActions = $('#mgActions').val();
      let ResultAdd = $('#resultAdd').val();
      let api = 'https://inwards.award.org.za/app_json/operational_reserve.php?code=' + verifyCode + '&station=' + station + '&sd=' + this.formatDate(dateStart) + '&label=' + labelAdd + '&mg_problems' + MgProblems + '&mg_options=' + MgOptions + '&mg_actions=' + MgActions + '&result=' + ResultAdd;
      console.log(api);
      $.get(api, function (data) {
        if (data === 'true') {
          dialog.showMessageBox(null, {
            type: 'info',
            message: 'Successfully Submitted Reserve!',
            buttons: ['OK']
          });
        } else {
          dialog.showMessageBox(null, {
            type: 'error',
            message: 'Failed to Submit!',
            buttons: ['OK']
          });
        }
      });
    }
  }
};
</script>