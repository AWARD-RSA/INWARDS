<template>
  <div class="modal rounded-0 fade modal_bottom" tabindex="-1" id="log-modal" style="height:800px;">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content rounded-0">
        <div class="modal-header inwards_card">
          <h5 class="modal-title">Potential Risks and water treatment options for Arsenic</h5>
          <span class="button" data-dismiss="modal" aria-label="Close">Back</span>
        </div>
        <div class="modal-body">
           <div class="row">
              <div class="col-md-6" align="center"><img src="../../assets/arsenic.svg" alt="" height="300" style="align: center;"></div>
              <div class="col-md-6" align="center"><img src="../../assets/pop_map.png" alt="" height="300" style="align: center;"></div>
        </div>
        <div class="row">
             <div class="col-sm-12">
          <div class="form-group">
        <table class="table is-scrollable is-stripped is-bordered is-hoverable">
        <thead><tr><th title="Field #1">Constituent</th>
        <th title="Field #2">Risk</th>
        <th title="Field #3">Effect</th>
        <th title="Field #4">Treatment</th>
        </tr></thead>
        <tbody>
          <tr>
          <td>Arsenic </td>
          <td>health</td>
          <td>Carcinogenic, skin, lung and bladder.  The International Agency for Research on Cancer (IARC) has classified arsenic and arsenic compounds as carcinogenic to humans.Toxic effects = Neurological effects, memory, and intellectual function. Arsenic accumulates in the body during childhood and may induce neurobehavioral abnormalities during puberty, and neuro-behavioural changes as an adult. Foetal mortality and preterm birth increased as exposure to arsenic increased. It has also been associated with cardiovascular disease and diabetes.</td>
          <td>According to SOUTH AFRICAN WATER QUALITY GUIDELINES (DWA, 1996): "Arsenic is most effectively removed from water in its pentavalent form. Trivalent arsenic is first converted to the pentavalent form using an appropriate oxidising agent such as chlorine or potassium permanganate. Pentavalent arsenic is effectively removed from water using conventional coagulation and flocculation processes followed by settlement and filtration. Suitable coagulants include aluminium sulphate, ferric salts and lime. The process requires monitoring to ensure the arsenic is effectively removed. The process will also generate a watery sludge rich in arsenic, that may present disposal problems."</td>
          </tr>
        </tbody>
        </table>
        </div>
          </div>
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
        let logModal = $('#log-modal');
        logModal.modal({
          keyboard: true
        });
      }
    }
  };
</script>