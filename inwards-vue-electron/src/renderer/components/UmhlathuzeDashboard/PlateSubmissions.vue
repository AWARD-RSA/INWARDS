<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="log-modal" style="height:800px;">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><img  src="../../assets/uwasp_logo.png" style="width: 5%;">UWASP Flow Verification Drive</h5>
          </div>
          <div class="modal-body">
           <div class="row">
               <div class="col-sm-12">
            <div class="form-group">
              <table class="table">
              <thead class="inwards_card">
                  <tr style="color: white; font-size: 0.8rem; font-weight: lighter;">
                      <th style="color: white; font-size: 0.8rem; font-weight: lighter;"> Submitted</th>
                      <th style="color: white; font-size: 0.8rem; font-weight: lighter;"> Taken</th>
                      <th style="color: white; font-size: 0.8rem; font-weight: lighter;"> Station</th>
                      <th style="color: white; font-size: 0.8rem; font-weight: lighter;"> Segment</th>
                      <th style="color: white; font-size: 0.8rem; font-weight: lighter;"> Image</th>
                      <th style="color: white; font-size: 0.8rem; font-weight: lighter;"> Attachments</th>
                  </tr>
              </thead>
              <tr v-for="log in logs" :key="log" style="font-size: 0.7rem;">
                      <td>{{ log.date_submitted }}</td>
                      <td>{{ log.date_taken }}</td>
                      <td>{{ log.station }}</td>
                      <td>{{ log.plate }}</td>
                      <td><img :src="log.image" width="150px"></td>
                      <td><a :href="log.attachments" download :style="log.hidden"><i class="fa fa-download fa-6"></i>Download</a></td>
                      
              </tr>
          </table>
            </div>
            </div>
          </div>
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
        showPlatesForm () {
          this.$http.get('https://uwasp.award.org.za/app_json/uwasp_dash/plate_submissions.php')
            .then(
              response => {
                this.logs = response.data;
                console.log(this.logs);
              })
            .catch(function (error) {
              console.log(error);
            });
          let logModal = $('#log-modal');
          logModal.modal({
            keyboard: true
          });
        }
      }
    };
  </script>