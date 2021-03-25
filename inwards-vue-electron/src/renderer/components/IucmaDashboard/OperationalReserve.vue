<template>
  <div class="modal rounded-0 fade modal_center" tabindex="-1" id="operational-modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img class="modal-title" src="@/assets/iucma.jpg" style="width: 100%;">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <h5 class="modal-title"><b>Email Verification</b></h5>

            <input type="email" class="form-control rounded-0" id="operationalEmail" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Start Date:</label>
                    <input type="date" class="form-control" id="operationalStart">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>End Date:</label>
                    <input type="date" class="form-control" id="operationalEnd">
                  </div>
                </div>
              </div>
            <div class="row">
             <div class="col-sm-6">
            <div class="form-group">
            <label for="dischargeValue">Select Station</label>
              <select class="form-control rounded-0" id="operationalStations">
                    <option id="X2H016" class="dropdown-item" value="X2H016"> X2H016 </option>
                    <option id="X3H021" class="dropdown-item" value="X3H021"> X3H021 </option>
              </select>
            </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="dischargeValue">Enter Operational Reserve (cumecs)</label>
                <input type="text" class="form-control rounded-0" id="dischargeValue" placeholder="Operational Reserve" style="margin-right: 10px;">
            </div>
            </div>
            </div>
          <button id="submitReserve" type="submit" class="btn rounded-0 inwards_button" @click="submit ()">Submit</button>
          <button class="btn rounded-0 inwards_button" type="button" data-dismiss="modal">Close</button>
        </div>
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
      operationalModel.modal({
        keyboard: true
      });
    },
    submit (e) {
      let verifyEmail = $('#operationalEmail').val();
      var stations = document.getElementById('operationalStations');
      var stationSelected = stations.options[stations.selectedIndex].value;
      console.log(stationSelected);
      let dateStartString = $('#operationalStart').val();
      console.log(dateStartString);
      let dateEndString = $('#operationalEnd').val();
      let dateStart = new Date(dateStartString);
      let dateEnd = new Date(dateEndString);
      let discharge = $('#dischargeValue').val();
      let api = 'https://inwards.award.org.za/app_json/operational_reserve.php?email=' + verifyEmail + '&station=' + stationSelected + '&sd=' + this.formatDate(dateStart) + '&ed=' + this.formatDate(dateEnd) + '&discharge=' + discharge;
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