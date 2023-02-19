<template>
    <div class="container">
        <div class="row">
              <div class="col-md-6" align="center"><img src="../../assets/arsenic.svg" alt="" height="300" style="align: center;"></div>
              <div class="col-md-6" align="center"><img src="../../assets/pop_map.png" alt="" height="300" style="align: center;"></div>
        </div>         
          <div class="row">
                    <table>
                        <thead>
                            <tr>
                                <th>Constituent</th>
                                <th>Risk</th>
                                <th>Effect</th>
                                <th>Treatment</th>
                            </tr> 
                        </thead>
                        <tbody>
                            <tr style="height: 100px">
                                <td style="font-size: x-small;  white-space: normal;">Arsenic </td>
                                <td style="font-size: x-small;  white-space: normal;">health</td>
                                <td style="font-size: x-small;  white-space: normal;">Skin, lung and bladder. The International Agency for Research on Cancer (IARC) has classified arsenic and arsenic compounds as carcinogenic to humans.Toxic effects = Neurological effects, memory, and intellectual function. Arsenic accumulates in the body during childhood and may induce neurobehavioral abnormalities during puberty, and neuro-behavioural changes as an adult. Foetal mortality and preterm birth increased as exposure to arsenic increased. It has also been associated with cardiovascular disease and diabetes.</td>
                                <td style="font-size: x-small;  white-space: normal;">According to SOUTH AFRICAN WATER QUALITY GUIDELINES (DWA, 1996): "Arsenic is most effectively removed from water in its pentavalent form. Trivalent arsenic is first converted to the pentavalent form using an appropriate oxidising agent such as chlorine or potassium permanganate. Pentavalent arsenic is effectively removed from water using conventional coagulation and flocculation processes followed by settlement and filtration. Suitable coagulants include aluminium sulphate, ferric salts and lime. The process requires monitoring to ensure the arsenic is effectively removed. The process will also generate a watery sludge rich in arsenic, that may present disposal problems."</td>
                            </tr>
                        </tbody>
                    </table>
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
      }
    }
  };
</script>