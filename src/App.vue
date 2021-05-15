<template>
  <div id="app">
    <!-- <router-view/> -->
    <DashBoard />
  </div>
</template>

<script>
import DashBoard from './pages/dashboard'

export default {
  name: 'App',
  components: {
    DashBoard
  }
}

</script>

<style lang='scss'>
@import "./assets/all";
@import '../node_modules/vue-swipe/dist/vue-swipe.css';


</style>
