<template>
  <div
    class="modal rounded-0 fade modal_center"
    tabindex="-1"
    ref="rqoModal"
    style="height: 800px"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <img src="../../assets/iucma.png" style="width: 5%" />IUCMA RQO
            Overview
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table
            ref="rqoOverviewTable"
            data-toggle="rqoOverviewTable"
            data-height="660"
            data-search="true"
            data-click-to-select="true"
            data-pagination="true"
            data-virtual-scroll="true"
            data-show-columns="true"
            data-url="https://inwards.award.org.za/app_json/iucma_wq/rqo_overview.php"
          >
            <thead>
              <tr>
                <th data-field="state" data-checkbox="true"></th>
                <th data-field="secondary">Catchment</th>
                <th data-field="id">ID</th>
                <th data-field="iua">IUA</th>
                <th data-field="ru">RU</th>
                <th data-field="ewr">EWR</th>
                <th data-field="target_ec" data-cell-style="cellStyle">
                  Target EC
                </th>
                <th data-field="sub_component">Sub Component</th>
                <th data-field="variables">Variables</th>
                <th data-field="narrative">Narrative</th>
                <th data-field="percentile_less">Percentile</th>
                <th data-field="limit_rqo">Limit RQO</th>
                <th data-field="source">Source</th>
                <th data-field="note">Note</th>
                <th data-field="numerical_rqo">Numerical RQO</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import $ from 'jquery'

export default {
  components: {},
  data() {
    return {
      logs: [],
      selections: [],
      selected: [],
    }
  },
  mounted() {
    $(this.$refs.rqoOverviewTable).bootstrapTable()
  },
  methods: {
    cellStyle(value, row, index) {
      let color
      switch (value) {
        case 'A':
          color = '#0000FF'
          break // Blue
        case 'A/B':
          color = '#4B0082'
          break // Indigo
        case 'B':
          color = '#8A2BE2'
          break // BlueViolet
        case 'B/C':
          color = '#9932CC'
          break // DarkOrchid
        case 'C':
          color = '#9400D3'
          break // DarkViolet
        case 'C/D':
          color = '#FF4500'
          break // OrangeRed
        case 'D':
          color = '#FF6347'
          break // Tomato
        case 'D/E':
          color = '#FF0000'
          break // Red
        case 'E':
          color = '#B22222'
          break // FireBrick
        case 'F':
          color = '#8B0000'
          break // DarkRed
        default:
          color = '#000000' // Default black color
      }
      return {
        css: {
          color: color,
        },
      }
      console.log(color)
    },
    showRQOOverview() {
      $(this.$refs.rqoModal).modal({
        keyboard: true,
      })
    },
  },
}
</script>
