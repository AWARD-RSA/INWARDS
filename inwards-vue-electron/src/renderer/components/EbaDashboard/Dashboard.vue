<template>
  <div style="width: 100%; height: 100%; margin: 0; padding: 0; .embed-container {position: relative; padding-bottom: 50%; height: 0; max-width: 100%;} .embed-container iframe, .embed-container object, .embed-container iframe{position: absolute; top: 0; left: 0; width: 100%; height: 100%;} small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}">
    <StatusBar/>
    <Header/>
    <div class="row" style="height: 100%;">
                  <div class="col-md-12">
                      <div class="embed-container"><br><iframe width="100%" height="1000" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="GIZ EBA Crocodile River Catchment" src="//www.arcgis.com/apps/Embed/index.html?webmap=58e2590d70ce420d8d8e0967ac97421b&extent=29.9786,-26.0226,32.0069,-24.9678&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&details=true&legendlayers=true&active_panel=legend&basemap_toggle=true&alt_basemap=topo&disable_scroll=true&theme=light"></iframe></div>
                </div>
    </div>

    </div>
</template>
<script>
  import NavButtons from '@/components/NavButtons';
  import StatusBar from '../StatusBar';
  require('promise.prototype.finally').shim();
  export default {

    components: {
      NavButtons,
      StatusBar
    },
    data () {
      return {
      };
    },
    mounted () {
    },
    methods: {
    }
  };
</script>
