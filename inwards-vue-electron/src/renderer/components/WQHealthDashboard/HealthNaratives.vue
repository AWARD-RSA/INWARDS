<template>
        <div >
          <div class="row no-gutters" v-for="log in healthNara" :key="log.id">
                <div class="col-md-6">
                    <h4>Overview</h4>
                    <p>{{ log.overview }}</p>                   
                </div>

                <div class="col-md-6">
                    <h4>Natural Sources</h4>
                    <p>{{log.source_natural}}</p>                     
                </div>
                <div class="col-md-6">
                    <h4>Other Sources</h4>
                    <p>{{log.source_other}}</p>                    
                </div>
                <div class="col-md-6">
                    <h4>Health Effects</h4>
                    <p>{{log.health_effects}}</p>                      
                </div>
                <div class="col-md-6">
                    <h4>Health Effects Chronic</h4>
                    <p>{{log.health_effect_chronic}}</p>                    
                </div>

                <div class="col-md-6">
                    <h4>Health Effects Acute</h4>
                    <p>{{log.health_effect_toxic_acute}}</p>                     
                </div>
                <div class="col-md-6">
                    <h4>Water Treatment Methods</h4>
                    <p>{{log.treatment}}</p>                    
                </div>
            </div>  
          </div>
      </template>
      <script type="text/javascript">
        import $ from 'jquery';
        export default {
          data () {
            return {
              healthNara: [],
              station: ''
            };
          },
          methods: {
            showNarativesTable () {
              this.$http.get('https://inwards.award.org.za/app_json/wq_dash/health/health_overview.php?variable=As_Diss_Water')
                .then(
                  response => {
                    this.healthNara = response.data;
                    console.log(this.healthNara);
                  })
                .catch(function (error) {
                  console.log(error);
                });
    
            }
          }
        };
      </script>