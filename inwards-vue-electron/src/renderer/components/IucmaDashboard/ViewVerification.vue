<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="view-modal" style="height:800px;">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><img src="../../assets/iucma.png" style="width: 5%;">View corrected data</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ViewChart ref="viewComponent"/>
<!--             <div class="col-md-3">
             <table id="dischargeCompare"
                    data-toggle="table"
                    data-pagination="true"
                    data-search="true"
                    data-virtual-scroll="true"
                    data-show-columns="true"
                    data-height="600"
                    data-toolbar=".toolbar"
                    v-model="values"
                    >
                  <thead>
                      <tr>
                          <th data-field="date" data-editable="true">Date</th>
                          <th data-field="discharge">Probe discharge</th>
                          <th data-field="discharge_correction">Corrected discharge</th>
                          <th data-field="stage">Probe stage</th>
                          <th data-field="corrected_stage">Corrected stage</th>
                          <th data-field="correction_id">Correction id</th>
                      </tr>
                  </thead>
              </table>
            </div>
            <div class="col-md-9">
                
            </div> -->
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
    import $ from 'jquery';
    import ViewChart from './ViewChart'

    export default {
      components: {
        ViewChart
      },
      data () {
        return {
          values: []
        };
      },
      methods: {
        showCorrectedData (siteCode, startDate, endDate) {
          let logModal = $('#view-modal');
          logModal.modal({
            keyboard: true
          });
/*           $('#dischargeCompare').bootstrapTable();
          $('#dischargeCompare').on('click', '.inwards_button', function() {
                // Extract the row's ID from the button's data attribute and handle the edit logic.
                let rowId = $(this).data('data-row-id');
                console.log(rowId);
            
            }); */
            this.$refs.viewComponent.displayCorrection('viewComponent-view-timeseries-'+siteCode, siteCode, this.formatDate(startDate), this.formatDate(endDate));
        }
      }
    };
</script>
