<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-md navbar-white px-5">
        <div class="flex-grow-1">
          <router-link class="navbar-brand text-center" href="#" to="/"
            ><h1 class="m-0 text-white bt"> <span class="mr-2">M O V I E</span> <span>B U F F</span></h1></router-link
          >
        </div>
        <div>
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link fz-4 text-white bt" href="#"
               to="/"
                >home <span class="sr-only">(current)</span></router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link fz-4 text-white bt"
                href="#"
                to="/upComimg"
                >UpComing</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link fz-4 text-white bt"
                href="#"
                to="/nowPlaying"
                >NowPlaying</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link fz-4 text-white bt"
                href="#"
                to="/listPage"
                >MyList</router-link
              >
            </li>
            <!-- <li class="nav-item">
              <router-link
                class="nav-link fz-4 text-white bt"
                href="#"
                to="/booking"
                >快速訂票</router-link
              >
            </li> -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>


<script>
import $ from "jquery";

export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
a{
  &:hover{text-decoration: none;}
}
</style>