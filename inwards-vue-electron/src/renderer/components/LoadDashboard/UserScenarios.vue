<template>
    <div class="form-group form-control-sm">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text form-control-sm rounded-0 inwards_search">
                    <font-awesome-icon icon="fa-solid fa-project-diagram" style="color: rgb(241, 241, 241)" />
                </span>
            </div>

            <v-select 
                class="square-select" 
                v-model="selectedId" 
                :options="scenarios" 
                @input="onSelectChange"
                @change="onSelectChange" 
                label="label" 
                :style="{ width: selectedId ? '90%' : '40%' }" 
                :reduce="(scenario) => scenario.id"
            >
                <template #option="{ id, label }">
                    <div style="display: flex; justify-content: space-between;">
                        <span>{{ label }}</span>
                        <span>
                            <font-awesome-icon icon="fa-solid fa-trash" style="color: rgb(240, 9, 9)" @click.prevent="deleteScenario(id)"></font-awesome-icon>
                        </span>
                    </div>
                </template>
            </v-select>
            
            <input 
                v-if="!selectedId" 
                type="text"
                class="form-control rounded-0 inwards_label"
                v-model="newScenarioName" 
                placeholder="Enter new" 
                style="font-size: small;"
                :style="{ width: '40%' }" 
            />

            <div class="input-group-append" v-if="!selectedId">
                <span
                    class="input-group-text rounded-0 inwards_search"
                    id="upstream-addon-append"
                    style="cursor: pointer"
                    role="button"
                    @click="submit"
                >
                    <i class="fa fa-save"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<style>
.square-select .vs__dropdown-toggle {
    border-radius: 0;
}

.square-select .vs__dropdown-menu {
    border-radius: 0;
}

/* If you also want to square the individual dropdown options */
.square-select .vs__dropdown-option {
    border-radius: 0;
}
</style>
<script>
import axios from 'axios'
import stateStore from '../../store/state_handler'
export default {
  data() {
    return {
        selected: '',
        scenarios: [],
        selectedId: null,
        selectedItem: null,
        userCode: '',
        selectedProject: "",
        newScenarioName: "",
        lastOption: 0,
        isExistingScenarioSelected: false,
        scenarioData: []
    }
    },
  created() {
    stateStore.getState(
      stateStore.keys.loginStatus, (status) => {
        this.userCode = status['uniqueCode'];
      }
    );
  },
  beforeMount() {
      this.loadScenarios();
    },
    methods: {
      onSelectChange() {
         // Emit a custom event to the parent component (Dashboard.vue)
            this.$emit('select-changed', this.selectedId);
            //this.isExistingScenarioSelected = !!this.selectedId;
      },
      loadScenarios() {
            return new Promise((resolve, reject) => {
                fetch('https://inwards.award.org.za/app_json/load_dash/user_data/scenarios_fetch.php?userCode='+this.userCode)
                .then(response => response.json())
                .then(data => {
                    this.scenarios = data;  // Assuming data is the list of scenarios
                    resolve();
                })
                .catch(error => {
                    console.error('Error loading scenarios:', error);
                    reject(error);
                });
            });
        },
      scenarioSelected() {
            this.$emit('select-changed', this.selectedId);
      },
      deleteScenario(id) {
        if (window.confirm("Are you sure you want to delete the selected item?")) {
            const baseUrl = 'https://inwards.award.org.za/app_json/load_dash/user_data/delete_scenario.php';
            const queryParams = `?user_code=${encodeURIComponent(this.userCode)}&scenario_id=${encodeURIComponent(id)}`;
            const url = baseUrl + queryParams;

            fetch(url, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                // After deletion, you can refresh your list of scenarios or remove the deleted item from the list
                this.selectedId = null; // Clear the selection
                this.loadScenarios();
            })
            .catch(error => {
                console.error('Error:', error);
            });
          }
          
    },
      submit() {
        if (this.isExistingProjectSelected) {
          // Code to handle opening existing project

          console.log("Opening project:", this.selectedProject);
        } else {
          // Code to handle creating a new project
          this.sendGetRequest();
          console.log("Creating new project:", this.newProjectName);
        }
      },
        sendGetRequest() {
            const baseUrl = 'https://inwards.award.org.za/app_json/load_dash/user_data/create_scenario.php';
            const queryParams = `?user_code=${encodeURIComponent(this.userCode)}&label=${encodeURIComponent(this.newScenarioName)}`;
            const url = baseUrl + queryParams;

            fetch(url, {
                method: 'GET', 
            })
            .then(response => response.text())
            .then(data => {
                this.serverResponse = data;
                this.newScenarioName = '';
                return this.loadScenarios();
            })
            .then(() => {
                const lastOption = this.scenarios[this.scenarios.length-1]; // Fix: it should be length - 1 to get the last item
                this.selectedId = lastOption.id;
            })
            .catch(error => {
                console.error('Error:', error);
                this.serverResponse = 'Error occurred. See console for details.';
            });
        }

  },
}
</script>
