<template>
    <table class="table table-bordered table-striped table-hover" style="padding: 0; margin-bottom: 0;">
        <thead class="inwards_card">
            <tr style="color: white; font-size: 0.6rem; font-weight: lighter;">
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Date</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Outflow</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Estimate</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">RiverView(P230)</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Estimate</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">PumpStation(P106)</th>
                <th style="color: white; font-size: 0.6rem; font-weight: lighter;">Estimate</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="station in stations" v-bind:key="station.Station" style="font-size: 0.6rem;">
                <td>{{ station.observed_date }}</td>
                <td contenteditable='true'>{{ station.downstream_of_dam }}</td>
                <td>{{ station.downstream_interpolated }}</td>
                <td contenteditable='true'>{{ station.river_view }}</td>        
                <td>{{ station.river_view_interpolated }}</td>     
                <td contenteditable='true'>{{ station.pump_station }}</td>        
                <td>{{ station.pump_station_interpolated }}</td>         
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
  this.$http.get('https://uwasp.award.org.za/app_json/uwasp_dash/uwasp_paramters.php')
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