<template>
    <table class="table table-bordered table-striped table-hover" style="padding: 0; margin-bottom: 0;">
        <thead class="inwards_card">
            <tr style="color: white; font-size: 0.6rem; font-weight: lighter;">
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">ID</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">First Name</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Last Name</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Designation</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Sector</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">reason</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">email</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Registration Date</th>

            </tr>
        </thead>
        <tbody>
        <tr v-for="station in stations" v-bind:key="station.Station" style="font-size: 0.6rem;">
                <td>{{ station.id }}</td>
                <td>{{ station.first_name }}</td>
                <td>{{ station.last_name }}</td>
                <td>{{ station.designation }}</td>        
                <td>{{ station.sector }}</td>     
                <td>{{ station.reason }}</td>        
                <td>{{ station.email }}</td>         
                <td>{{ station.registration_date }}</td>         

        </tr>
        </tbody>
    </table>
</template>

<script type="text/javascript">
export default {
data () {
  return {
    stations: []
  };
},
created () {
  this.$http.get('https://uwasp.award.org.za/app_json/uwasp_dash/users.php')
    .then(
      response => {
        this.stations = response.data;
        console.log(this.stations);
      })
    .catch(function (error) {
      console.log(error);
    });
}
};
</script>