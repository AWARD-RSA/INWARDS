<template>
		<table class="table">
			<thead class="inwards_card">
				<tr style="color: white; font-size: 0.7rem;">
					<th> Station</th>
					<th> 60th (%)</th>
          <th> 70th (%)</th>
          <th> 80th (%)</th>
          <th> 90th (%)</th>
          <th> 99th (%)</th>
					<th> No Readings</th>
				</tr>
			</thead>
			<tr v-for="station in stations" v-bind:key="station.Station" style="font-size: 0.7rem;">
                     <td>{{ station.Station }}</td>
                    <td>{{ station.sixTh }}</td>
                    <td>{{ station.sevTh }}</td>
                    <td>{{ station.eigTh }}</td>
                    <td>{{ station.ninTh }}</td>
                    <td>{{ station.nininTh }}</td>
                    <td>{{ station.No_Readings }}</td>              
			</tr>
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
      let startDate = '2019-10-01';
      let endDate = '2020-09-30';
      console.log('http://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + startDate + '&ed=' + endDate);
      this.$http.get('http://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + startDate + '&ed=' + endDate)
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
        this.$http.get('http://inwards.award.org.za/app_json/iucma_compliance.php?sd=' + this.formatDate(startDate) + '&ed=' + this.formatDate(endDate))
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