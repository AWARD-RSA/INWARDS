<template>
  <div>
    <StatusBar />
    <Header />
    <div class="row" style="height: 100%">
      <div class="col-md-12">
        <div class="embed-container">
          <iframe
            width="100vw"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            title="GIZ EBA Crocodile River Catchment"
            src="https://eba.award.org.za"
          ></iframe>
        </div>
      </div>
    </div>
    <NavButtons />
  </div>
</template>
<script>
import NavButtons from '../../components/NavButtons'
import StatusBar from '../StatusBar'
require('promise.prototype.finally').shim()
export default {
  components: {
    NavButtons,
    StatusBar,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>
<style>
.embed-container {
  position: relative;
  padding-top: 50%;
  height: 80vh;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
small {
  position: absolute;
  z-index: 40;
  bottom: 0;
  margin-bottom: -15px;
}
</style>
