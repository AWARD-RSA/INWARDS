<template>
  <div class="card rounded-0 box" v-bind:style="styleObject">
    <div class="card-header inwards_card">Site Risk Assesment </div>
    <div class="card-body chart-container">           
        <div class="row">
               <div class="col-sm-12">
                <table class="table">
                <thead>
				<tr style="font-size: 0.8rem;">
                      <th> Parameters</th>
                      <th>Station</th>
                  </tr>
              </thead>
              <tbody v-for="log in riskData" :key="log.id" style="font-size: 0.7rem;">
              <th style="font-size: 0.8rem;">
                    <tr><td>Site</td></tr>
                    <tr><td>Date</td></tr>
                    <tr><td>Conc water mg/l</td></tr>
                    <tr><td>Ingestion rate L</td></tr>
                    <tr><td>RfD mg/kg/d</td></tr>
                    <tr><td>Slope factor (β)</td></tr>
                    <tr><td>Exp duration ED (years)</td></tr>
                    <tr><td>Exp frequency EF (days/y)</td></tr>
                    <tr><td>Body weight BW (kg)</td></tr>
                    <tr><td>Av time days (days xED)</td></tr>
                    <tr><td>Lifetime Lft (years)</td></tr>
                    <tr><td>ADD (Avg Daily Dose)</td></tr>
                    <tr><td>LADD</td></tr>
                    <tr><td>Hazard quotient</td></tr>
                    <tr><td>Cancer risk</td></tr>
                  </th>
              <th>
                      <tr><td>{{ log.site }}</td></tr>
                      <tr><td>{{ log.date }}</td></tr>
                      <tr><td>{{ log.conc_observed }}</td></tr>
                      <tr><td>{{ log.ingestion_rate }}</td></tr>
                      <tr><td>{{ log.RfD }}</td></tr>
                      <tr><td>{{ log.slope_factor }}</td></tr>
                      <tr><td>{{ log.duration_ED_years }}</td></tr>
                      <tr><td>{{ log.frequency_EF_days }}</td></tr>
                      <tr><td>{{ log.Body_weight_BW }}</td></tr>
                      <tr><td>{{ log.average_time_xED }}</td></tr>
                      <tr><td>{{ log.lifetime_years }}</td></tr>
                      <tr><td>{{ log.avg_daily_dose }}</td></tr>
                      <tr><td>{{ log.LADD }}</td></tr>
                      <tr><td>{{ log.hazard_quotient }}</td></tr>
                      <tr><td>{{ log.cancer_risk }}</td></tr>
              </th>
            </tbody>
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
          riskData: [],
          station: ''
        };
      },
      methods: {
        showRiskTable (url_parameters) {
          this.$http.get('https://inwards.award.org.za/app_json/wq_dash/site_risk.php?'+url_parameters)
            .then(
              response => {
                this.riskData = response.data;
                console.log(this.riskData);
              })
            .catch(function (error) {
              console.log(error);
            });

        }
      }
    };
  </script>