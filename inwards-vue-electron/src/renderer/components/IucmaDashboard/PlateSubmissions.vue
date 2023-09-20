<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="plate-modal" style="height:800px;">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><img  src="../../assets/iucma.png" style="width: 5%;">IUCMA Discharge Verification Log</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <table id="table"
                    data-toggle="table"
                    data-url="https://inwards.award.org.za/app_json/data_upload/plate_submissions.php"
                    data-pagination="true"
                    data-search="true"
                    data-virtual-scroll="true"
                    data-show-columns="true"
                    data-height="600"
                    data-toolbar=".toolbar"
                    >
                  <thead>
                      <tr>
                          <th data-field="id">ID</th>
                          <th data-field="date_submitted">Submitted</th>
                          <th data-field="date_taken">Taken</th>
                          <th data-field="station">Station</th>
                          <th data-field="stage_height">Stage</th>
                          <th data-field="discharge">Discharge</th>
                          <th data-field="image">Image</th>
                          <th data-field="attachments">Attachments</th>
                      </tr>
                  </thead>
              </table>
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
          let logModal = $('#plate-modal');
          logModal.modal({
            keyboard: true
          });
          $('#table').bootstrapTable();
        }
      }
    };
  </script>