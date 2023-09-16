<template>
  <div class="card rounded-0">
    <div class="card-header inwards_card">
      <h6 style="color: white">
        <i class="fa fa-map-marker" style="padding-right: 10px"></i>Select from
        Tree
        <span v-if="refreshable">
          <i
            class="fa fa-refresh"
            id="refresh-stations"
            v-on:click="refreshStations"
            ref="refreshType"
          ></i>
        </span>
      </h6>
    </div>
    <div
      class="card-body jstree-container"
      style="max-height: 56vh; height: 56vh"
    >
      <div class="center text-sm inwards_label" v-if="loading">
        Stations with data will be displayed after selecting type and variable
        above...
      </div>
      <div v-else>
        <div id="jstree-div" style="font-size: 11px">
          <div id="jstree-sub-div" style="font-size: 11px"></div>
        </div>
      </div>
    </div>
    <div class="form-group" style="margin-right: 0.5rem">
      <div
        class="input-group form-control-sm"
        style="margin-left: 4px; margin-right: 10px"
      >
        <div class="input-group-prepend">
          <span
            class="input-group-text rounded-0 inwards_search"
            id="search-addon"
          >
            <font-awesome-icon icon="fa-solid fa-map-marked-alt" />
          </span>
        </div>
        <input
          type="text"
          class="form-control rounded-0 inwards_label"
          id="catchmentSearchInput"
          aria-describedby="search-addon"
          placeholder="Search"
        />
        <div class="input-group-append">
          <span
            class="input-group-text rounded-0 inwards_search"
            id="search-addon-append"
            style="cursor: pointer"
            role="button"
          >
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import 'jstree/dist/jstree.min.js'
import 'jstree/src/jstree.wholerow.js'
import 'jstree/src/jstree.types.js'
import 'jstree/src/jstree.search.js'
import 'jstree/dist/themes/default/style.css'

export default {
  data() {
    return {
      selectable: true,
      loading: true,
      refreshable: true,
    }
  },
  methods: {
    toggleMultipleNodes(nodes, selected) {
      for (let i = 0; i < nodes.length; i++) {
        this.toggleNode(nodes[i], selected)
      }
    },
    refreshStations() {
      this.loading = true
      this.$bus.$emit('refreshStations')
    },
    toggleNode(node, selected) {
      let nodeBehaviour = selected ? 'select_node' : 'deselect_node'
      //console.log("NOT A DIV")
      let $jsTreeDiv = $('#jstree-div')
      if (!$jsTreeDiv) {
        
        return false
      }
      $jsTreeDiv.jstree(nodeBehaviour, node)
      let nodes = $jsTreeDiv.jstree(true).get_node(node, true)
      if (nodes) {
        nodes.children('.jstree-anchor').focus()
      }
    },
    expandAll() {
    let $jsTreeDiv = $('#jstree-div')
      $jsTreeDiv.jstree('open_all')
    },
    createStationTree(jsonData, treeClicked, treeReady) {
      let jsTreePlugins = ['wholerow', 'types', 'search', 'checkbox'];



      this.loading = false
      let iconHydro = require('../../assets/river.svg')
      let iconStation = require('../../assets/vial.svg')
      let iconRQO = require('../../assets/rqo.svg')
      let iconTree = require('../../assets/iconfinder_layer_37228.png')
      setTimeout(function () {
        let $jsTreeDiv = $('#jstree-div')
        let $searchInputDiv = $('#catchmentSearchInput')
        $jsTreeDiv.on('changed.jstree', treeClicked).jstree({
          core: {
            data: jsonData,
          },
          search: {
            show_only_matches: true,
            show_only_matches_children: true,
          },
          plugins: jsTreePlugins,
          types: {
            layer: {
              icon: iconTree,
            },
            station: {
              icon: iconStation,
            },
            hydroStation: {
              icon: iconHydro,
            },
            rqoStation: {
              icon: iconRQO,
            },
          },
          checkbox: {
            three_state: false,
            cascade: 'down'
          },
        })
        $jsTreeDiv.on('ready.jstree', treeReady)
        let to = false
        $searchInputDiv.keyup(function () {
          if (to) {
            clearTimeout(to)
          }
          to = setTimeout(function () {
            let v = String($searchInputDiv.val()) // Ensure v is a string
            $jsTreeDiv.jstree(true).search(v)
          }, 250)
        })
      }, 100)
    },
  },
}
</script>