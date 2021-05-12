<template>
  <div>
    <div class="bg-banner" />
    <div style="position: relative; zindex: 10">
      <Navbar/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar";
// import UpComing from "./upComing";

export default {
  components: {
    Navbar,
    // NowPlaying,
    // UpComing,
  },
  data() {
    return {
      recommendMovie:[],
    };
  },
  methods:{

  },
   created(){
  }
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bg-banner {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: url("../assets/2001.jpg") center center no-repeat;
  background-size: cover;
}

</style>
