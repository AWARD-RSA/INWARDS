<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" ref="verificationsModal" style="height:800px;">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><img src="../../assets/iucma.png" style="width: 5%;">IUCMA Verification Submissions</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div ref="toolbar" id="toolbar">
                <button ref="button" @click="handleButtonClick" class="btn btn-secondary">View Correction</button>
            </div>
            <table ref="verificationTable" 
                    data-toggle="verificationTable" 
                    data-toolbar="#toolbar" 
                    data-height="460"
                    data-search="true"
                    data-click-to-select="true"
                    data-pagination="true"
                    data-virtual-scroll="true"
                    data-show-columns="true"
                    data-url="https://inwards.award.org.za/app_json/iucma_verification/verification_submissions.php"

                    >
                  <thead>
                      <tr>
                          <th data-field="state" data-checkbox="true"></th>
                          <th data-field="id" data-editable="true">id</th>
                          <th data-field="station" data-editable="true">Station</th>
                          <th data-field="station_id">Station ID</th>
                          <th data-field="date_of_verification" data-editable="true">Date of Verification</th>
                          <th data-field="verified_stage" data-editable="true">Verified Stage</th>
                          <th data-field="probe_stage">Probe Stage</th>
                          <th data-field="verified_discharge">Verified Discharge</th>
                          <th data-field="probe_discharge">Probe Discharge</th>
                          <th data-field="probe_date">Probe Date</th>
                          <th data-field="apply_start_date" data-editable="true">Apply Start</th>
                          <th data-field="apply_end_date" data-editable="true">Apply End</th>
                          <th data-field="simple_perc_correction" data-editable="true">Simple</th>
                          <th data-field="linear_loss" data-editable="true">Linear</th>
                          <th data-field="exponential_loss" data-editable="true">Exponential</th>
                          <th data-field="virtual_calibration" data-editable="true">Virtual</th>
                          <th data-field="submitted_by">Submitted By</th>
                          <th data-field="stage_variation">Stage Variation</th>
                          <th data-field="discharge_variation">Discharge Variation</th>
                      </tr>
                  </thead>
              </table>
          </div>
        </div>
      </div>
      <ViewVerification ref="viewVeriComponent"/>
    </div>
</template>

<script type="text/javascript">

    import $ from 'jquery';
    import ViewVerification from './ViewVerification';
    export default {
      components: {
        ViewVerification
      },
      data () {
        return {
          logs: [],
          selections: [],
          selected: []
        };
      },
      methods: {
            viewRecord() {
                const rawData = JSON.stringify($(this.$refs.verificationTable).bootstrapTable('getSelections'));

                const data = JSON.parse(rawData);

                if (data.length > 0) {
                    const firstEntry = data[0]; // assuming you want the first entry

                    const station = firstEntry.station;
                    const station_id = firstEntry.station_id;
                    const start_date = firstEntry.apply_start_date;
                    const end_date = firstEntry.apply_end_date;

                    console.log(station, station_id, start_date, end_date);
                    this.$refs.viewVeriComponent.showCorrectedData(station, start_date, end_date);
                // now you can use these variables for further processing...
                }
                
                // Further logic...
            },
            handleButtonClick() {
                this.selected = JSON.stringify($(this.$refs.verificationTable).bootstrapTable('getSelections'));
                this.viewRecord();
            },
            showVerificationsForm() {
                $(this.$refs.verificationsModal).modal({
                    keyboard: true
                });
                $(this.$refs.verificationTable).bootstrapTable();
            }
        }
    };
</script>
