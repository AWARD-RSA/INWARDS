    <template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="wq-modal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
                <div class="text-center">
                 IUCMA WQ DATA Submission
            <img class="rounded float-right" src="../../assets/iucma.png" style="width: 10%;"/>
        </div>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
        </div>
          <div class="modal-body">
            <div class="row">
                <div class="col-sm-6">                    
                    <h4>Guide to Submitting</h4>
                    <p>Please ensure that the photograph of the gauge plate shows the current water line against the gaugeplate clearly. In addition, please specify the meter segment that the water line represents.</p>
            </div>
      <form @submit.prevent="submitDatatoServer">
        <!-- Site Selector -->
        <div>
          <label for="site">Select Site:</label>
          
          <select v-model="selectedSite" required>
            <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.properties.iucma_id + ': ' + site.properties.desc }}</option>
          </select>
        </div>
  
        <!-- Date Picker 
        <div>
          <label for="date">Date:</label>
          <input type="date" v-model="date" required>
        </div>
        -->
        <div class="col-sm-12">
        <div class="col-sm-12">
         <h4>Submission Details:</h4>
         <label>Date of Sample:</label>
            </div>                
        <div class="col-sm-12">
            <div class="form-group">
                <input type="datetime-local" name="to" value="2014-12-08T15:43:00" class="form-control" id="date">
            </div>
        </div>  
        <!-- Dynamic Inputs for Water Quality Variables -->            
        
        <div class="col-sm-12" v-for="variable in variables" :key="variable.id">
          <label :for="variable.mon_variable_abbr">{{ variable.mon_variable_name }} ({{ variable.measure_unit_name }}):</label>
          <input class="form-control" type="number" :id="variable.mon_variable_abbr" v-model="data[variable.mon_variable_abbr]">
        </div>
        </div>
        <!-- Submit Button -->
        <button type="submit">Submit Data</button>
      </form>
      </div>
      </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        sites: [], // Will hold data from iucma_wq_sites
        variables: [], // Will hold data from dws_wq_variables
        selectedSite: '',
        date: '',
        data: {}, // Object to hold the water quality data inputs
      };
    },
    mounted() {
      this.fetchSites();
      this.fetchVariables();
    },
    methods: {
      submitData () {
        var today  = new Date();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var H = today.getHours();
        var i = today.getMinutes();
        var s = today.getSeconds();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        today = yyyy + '-' + mm + '-' + dd+'T'+H+':'+i+':'+s;
       // console.log(today);
        document.getElementById('date').value = today;
        let wqModal = $('#wq-modal');
        wqModal.modal({
          keyboard: true
      });
      },
      async fetchSites() {
        try {
          const response = await axios.get('https://inwards.award.org.za/app_json/iucma_wq/iucma_stations.php', {
            params: {
              wma: 'inkomati_usuthu',
              type: 'Rivers',
            },
          });
          this.sites = response.data.features; // Assuming the API returns GeoJSON
          console.log(this.sites)
          console.log("TEST")
        } catch (error) {
          console.error('Error fetching sites:', error);
        }
      },
      async fetchVariables() {
        try {
          // You need an API or endpoint to fetch variables similar to fetchSites
          const response = await axios.get('https://inwards.award.org.za/app_json/variables.php');
          this.variables = response.data;
        } catch (error) {
          console.error('Error fetching variables:', error);
        }
      },
      async submitDatatoServer() {
        const payload = {
          station_id: this.selectedSite,
          date: this.date,
          ...this.data,
        };
        try {
          await axios.post('https://inwards.award.org.za/app_json/iucma_wq/submit_data.php', payload);
          console.log('Data submitted successfully');
          // Optionally, clear the form or give the user feedback
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      },
    },
  };
  </script>
  