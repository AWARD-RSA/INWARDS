<template>
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
          <tr>
              <th scope="col"> Station</th>
              <th scope="col"> 60th (%)</th>
              <th scope="col">70th (%)</th>
              <th scope="col">80th (%)</th>
              <th scope="col">90th (%)</th>
              <th scope="col">99th (%)</th>
              <th scope="col"># Obs</th>
          </tr>
      </thead>
      <tbody>
      <tr v-for="station in stations" v-bind:key="station.Station">
              <th scope="row">{{ station.Station }}</th>
              <td>{{ station.sixTh }}</td>
              <td>{{ station.sevTh }}</td>
              <td>{{ station.eigTh }}</td>
              <td>{{ station.ninTh }}</td>
              <td>{{ station.nininTh }}</td>
              <td>{{ station.No_Readings }}</td>
      </tr>
  </tbody>
  </table>
</template>

<script type="text/javascript">
  import $ from 'jquery';
  export default {
    data () {
      return {
        stations: []
      };
    },
    created () {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let hydrologicalStartDate = new Date(`${year}-10-01`);
      let lastHydrologicalStartDate = new Date(`${year - 1}-10-01`);
      if (currentDate < hydrologicalStartDate) {
        hydrologicalStartDate = lastHydrologicalStartDate;
      }
      let startDate = `${hydrologicalStartDate.getFullYear()}-${String(hydrologicalStartDate.getMonth() + 1).padStart(2, '0')}-${String(hydrologicalStartDate.getDate()).padStart(2, '0')}`;
      let endDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
     
      console.log('https://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + startDate + '&ed=' + endDate);
      this.$http.get('https://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + startDate + '&ed=' + endDate)
        .then(
          response => {
            this.stations = response.data;
            console.log(this.stations);
          })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      updateTable () {
        let dateStartString = $('#dateStart').val();
        let dateEndString = $('#dateEnd').val();
        let startDate = new Date(dateStartString);
        let endDate = new Date(dateEndString);
        // console.log('http://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + this.formatDate(startDate) + '&ed=' + this.formatDate(endDate));
        this.$http.get('https://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + this.formatDate(startDate) + '&ed=' + this.formatDate(endDate))
          .then(
            response => {
              this.stations = response.data;
              console.log(this.stations);
            })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
</script>