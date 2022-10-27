<template>
    <table class="table table-bordered table-striped table-hover" style="padding: 0; margin-bottom: 0;">
        <thead class="inwards_card">
            <tr style="color: white; font-size: 0.6rem; font-weight: lighter;">
                <th style="color: white; font-size: 0.8rem; font-weight: lighter;">Date</th>
                <th style="color: white; font-size: 0.8rem; font-weight: lighter;">Outflow</th>
                <th style="color: white; font-size: 0.8rem; font-weight: lighter;">RiverView(P230)</th>
                <th style="color: white; font-size: 0.8rem; font-weight: lighter;">PumpStation(P106)</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="station in stations" v-bind:key="station.Station" style="font-size: 0.7rem;">
                <td >{{ station.observed_date }}</td>
                <td v-if="station.downstream_interpolated === 'false'" style="background-color:rgba(92, 184, 92, 0.4);">{{ station.downstream_of_dam }}</td>
                <td v-else style="background-color:darksalmon;">{{ station.downstream_of_dam }}</td>

                <td v-if="station.river_view_interpolated === 'false'" style="background-color:rgba(92, 184, 92, 0.4);">{{ station.river_view }}</td>
                <td v-else style="background-color:darksalmon;">{{ station.river_view }}</td>


                <td v-if="station.pump_station_interpolated === 'false'" style="background-color:rgba(92, 184, 92, 0.4);">{{ station.pump_station }}</td>
                <td v-else style="background-color:darksalmon;">{{ station.pump_station }}</td>
    
        </tr>
        <tr>
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