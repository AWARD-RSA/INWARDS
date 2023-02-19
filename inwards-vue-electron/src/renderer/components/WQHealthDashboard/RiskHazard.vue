<template>
    <div class="modal rounded-0 fade modal_bottom" tabindex="-1" id="risk-modal" style="height:800px;">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content rounded-0">
          <div class="modal-header inwards_card">
            <h5 class="modal-title">Exposure Assessment </h5>
            <span class="button" data-dismiss="modal" aria-label="Close">Back</span>
          </div>
          <div class="modal-body">
             <div class="row">
                <div class="col-md-12" align="center"><img src="../../assets/risk.png" alt="" height="300" style="align: center;"></div>
          </div>
          <hr>
            <div class="col-md-12" align="center"><img src="../../assets/banner.png" alt="" style="align: center;"></div>
        </div>
      </div>
    </div>
    </div>
  </template>
  <script type="text/javascript">
    import $ from 'jquery';
    export default {
      data () {
        return {
          logs: []
        };
      },
      methods: {
        showNarativeTable () {
  /*         this.$http.get('https://inwards.award.org.za/app_json/knp_log.php')
            .then(
              response => {
                this.logs = response.data;
                console.log(this.logs);
              })
            .catch(function (error) {
              console.log(error);
            }); */
          let logModal = $('#risk-modal');
          logModal.modal({
            keyboard: true
          });
        }
      }
    };
  </script>