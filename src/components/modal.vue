<template>
  <div>
    <div
      class="modal fade"
      id="movieInfo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 py-1 mr-1">
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-5">
                <img
                  :src="`https://image.tmdb.org/t/p/w300${movieProp.poster_path}`"
                  alt=""
                />
              </div>
              <div class="col-7 d-flex flex-column">
                <div>
                  <h2 class="mb-1">{{ movieProp.original_title }}</h2>
                  <ul
                    class="d-flex p-0 align-items-end mt-2"
                    v-if="socialNetwork !== null"
                  >
                    <li class="mr-1" v-if="socialNetwork.facebook_id">
                      <a
                        :href="`https://www.facebook.com//${socialNetwork.facebook_id}`"
                        class="socialIcons"
                        target="_blank"
                        ><img src="../assets/icons/facebookIcon.png" alt=""
                      /></a>
                    </li>
                    <li class="mr-1" v-if="socialNetwork.twitter_id">
                      <a
                        :href="`https://twitter.com/${socialNetwork.twitter_id}`"
                        class="socialIcons"
                        target="_blank"
                        ><img src="../assets/icons/twitterIcon.png" alt=""
                      /></a>
                    </li>
                    <li class="mr-1" v-if="socialNetwork.instagram_id">
                      <a
                        :href="`https://www.instagram.com/${socialNetwork.instagram_id}`"
                        class="socialIcons"
                        target="_blank"
                        ><img src="../assets/icons/instagramIcon.png" alt=""
                      /></a>
                    </li>
                    <li class="mr-1" v-if="socialNetwork.imdb_id">
                      <a
                        :href="`https://www.imdb.com/title/${socialNetwork.imdb_id}`"
                        class="socialIcons"
                        target="_blank"
                        ><img src="../assets/icons/imdbIcon.png" alt=""
                      /></a>
                    </li>
                  </ul>
                  <span class="font-italic font-weight-lighter">{{
                    this.movieProp.tagline
                  }}</span>
                  <p class="p-0">
                    片長：<span class="font-weight-bold"
                      >{{ movieProp.runtime || 113 }}分鐘</span
                    >
                  </p>
                  <p>
                    類型：<span
                      class="mr-2 badge badge-light"
                      v-for="genre in movieProp.genre_ids"
                      :key="genre"
                      >{{ changeGenre(genre) }}</span
                    >
                  </p>
                  <p>上映時間：{{ movieProp.release_date }}</p>
                </div>
                <div>
                  <div></div>
                  <h6>劇情簡介：</h6>
                  <p class="movieOverview">{{ movieProp.overview }}</p>
                  <h6 class="mt-3">
                    <p>
                      觀眾評分：<span
                        :class="{ goodToSee: movieProp.vote_average > 7 }"
                        >{{ movieProp.vote_average || "尚未上映" }}</span
                      ><span
                        class="material-icons ml-2 text-primary align-bottom"
                        v-if="movieProp.vote_average > 7.5"
                      >
                        recommend
                      </span>
                    </p>
                  </h6>
                  <h6>
                    主要演員：
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li
                          class="breadcrumb-item mt-2"
                          v-for="actor in actorProp"
                          :key="actor"
                        >
                          <span class="actorName">{{ actor }}</span>
                        </li>
                        <!-- <li class="breadcrumb-item active" aria-current="page">
                          Data
                        </li> -->
                      </ol>
                    </nav>
                  </h6>
                </div>
                <div class="mt-auto ml-auto">
                  <button href="#" class="d-inline mr-2 btn" title="新增至清單">
                    <span
                      :class="[
                        { clicked: movieProp.List },
                        'material-icons',
                        'iconDec',
                        'iconColor',
                      ]"
                      @click="emitToggleList(movieProp.id, 'List')"
                    >
                      list
                    </span>
                  </button>
                  <button href="#" class="d-inline mr-2 btn" title="加入最愛">
                    <span
                      class="material-icons iconDec iconColor"
                      :class="{ clicked: movieProp.Fav }"
                      @click="emitToggleList(movieProp.id, 'Fav')"
                    >
                      favorite
                    </span>
                  </button>
                  <button
                    href="#"
                    class="d-inline mr-2 btn"
                    title="新增至待看清單"
                  >
                    <span
                      class="material-icons iconDec iconColor"
                      :class="{ clicked: movieProp.ToSee }"
                      @click="emitToggleList(movieProp.id, 'ToSee')"
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="goBooking(movieProp.id)"
            >
              訂票去
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movieProp", "actorProp"],
  data() {
    return {
      genreList: [],
      socialNetwork: "",
    };
  },
  watch: {
    movieProp: function (newMovie, oldMovie) {
      if (newMovie.id === oldMovie.id) return;
      this.getSN(this.movieProp.id);
    },
  },
  methods: {
    emitToggleList(id, type) {
      //這裡用$emit的原因是因為要把在modal點的id和type傳到其他頁面的movie陣列資料中
      this.$emit("toggle-list", { id, type });
    },
    getGenre() {
      const api = `https://api.themoviedb.org/3/genre/movie/list?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US`;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        this.genreList = response.data.genres;
        console.log(this.genreList);
      });
    },
    changeGenre(num) {
      if (this.genreList.length) {
        let genres = this.genreList.find((genre) => genre.id === num);
        return genres.name;
      }
    },
    getSN(id) {
      const api = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=551d624345faddc0074c98e32cf2a66e`;
      this.$http.get(api).then((response) => {
        // if(response.data.id === this.socialNetwork.id){
        //   return
        // }
        this.socialNetwork = response.data;
        console.log("getSN", response.data);
      });
    },
    goBooking(movieId) {
      console.log("asacas", movieId);
      this.$router.push(`/booking/${movieId}`);
    },
    consoleFun() {
      console.log("111");
    },
  },
  created() {
    this.getGenre();
    this.getSN(this.movieProp.id);
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.goodToSee {
  color: red;
  font-size: 1.5rem;
}

.iconDec {
  border-radius: 10px;
  background-color: #000000;
}

.modal-content {
  background-color: #000000b3;
  color: #ffffff;
}
.movieOverview {
  color: #d3d3d3;
}
.modal-body {
  font-size: 16px;
}
.socialIcons {
  img {
    width: 24px;
    height: 24px;
  }
}

.iconColor {
  color: white;
  &:hover {
    color: #ff1493;
  }
}

.clicked {
  color: #ff1493;
}
.breadcrumb {
  background-color: transparent;
  padding: 0;
}
.actorName {
  font-size: 13px;
}

.playTrailer {
  span {
    font-size: 2.75rem;
    &:hover {
      color: #ffd700;
      cursor: pointer;
    }
  }
}
</style>