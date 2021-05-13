<template>
  <div class="container mt-4">
    <h2 class="text-white">最近上映</h2>
    <div class="gallery">
      <div class="d-flex mt-4">
        <div v-for="item in nowList" :key="item.id" class="nowPlayCard mr-5">
          <div class="d-flex justify-content-end">
            <a
              href="#"
              class="menu p-2"
              @click.stop="(e) => handleActive(e, item.id)"
            >
              <span class="material-icons dropdownBtn"> pending </span>
              <ul
                class="p-0 dropdownMenu py-2 d-none"
                :class="{ 'd-block': item.id === activeId }"
              >
                <li
                  class="border-bottom"
                  @click="handleMoiveStatus({ id: activeId, type: 'List' })"
                >
                  <button href="#" class="d-inline mr-2 btn" title="新增至清單">
                    <span
                      class="material-icons iconColor align-bottom mr-2 font-weight-bold"
                      :class="{ clicked: movie.List }"
                    >
                      list
                    </span>
                    已看過
                  </button>
                </li>
                <li
                  class="border-bottom"
                  @click="handleMoiveStatus({ id: activeId, type: 'Fav' })"
                >
                  <button href="#" class="d-inline mr-2 btn" title="加入最愛">
                    <span
                      class="material-icons iconColor align-bottom mr-2 font-weight-bold"
                      :class="{ clicked: movie.Fav }"
                    >
                      favorite
                    </span>
                    加入最愛
                  </button>
                </li>
                <li @click="handleMoiveStatus({ id: activeId, type: 'ToSee' })">
                  <button
                    href="#"
                    class="d-inline mr-2 btn"
                    title="新增至待看清單"
                  >
                    <span
                      class="material-icons iconColor align-bottom mr-2 font-weight-bold"
                      :class="{ clicked: movie.ToSee }"
                    >
                      bookmark
                    </span>
                    加入待看
                  </button>
                </li>
              </ul>
            </a>
          </div>
          <a
            href="#"
            @click="
              getMovieInfo(item.id);
              getActor(item.id);
            "
          >
            <img
              :src="`https://image.tmdb.org/t/p/w200${item.poster_path}`"
              alt="#"
            />
          </a>
          <div class="cardContent mt-3">
            <h5 class="text-center font-weight-bolder title">
              {{ item.original_title }}
            </h5>
            <p>
              上映日期：<span>{{ item.release_date }}</span>
            </p>
            <p>
              評分：<span>{{ item.vote_average }}</span>
            </p>
            <div class="starRating d-inline-block">
              <div class="empty_star fz-xl">★★★★★</div>
              <div
                class="full_star fz-xl"
                :style="{ width: `${item.vote_average * 10}%` }"
              >
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      v-if="movie.genre_ids"
      :movieProp="movie"
      :actorProp="actors"
      @toggle-list="handleMoiveStatus"
    />
  </div>
</template>

<script>
/* global $ */
import Modal from "../components/modal";
import toggleMovieMixin from "../mixins/toggleMovieMixin";
import { getMovieStatus } from "../utils";

export default {
  components: {
    Modal,
  },
  mixins: [toggleMovieMixin],
  data() {
    return {
      nowList: [],
      movie: {},
      activeId: "",
      actors: [],
      // openId:null,
    };
  },

  methods: {
    getNowPlay() {
      const api = `https://api.themoviedb.org/3/movie/now_playing?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US&page=${this.page}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.nowList = response.data.results;
        this.totalPage = response.data.total_pages;
      });
    },
    async getMovieInfo(id) {
      this.movie = this.nowList.find((movie) => movie.id === id);
      const statusArr = await getMovieStatus(this.$http, id);
      const arr = ["List", "Fav", "ToSee"];
      arr.forEach((type, index) => {
        this.movie = {
          ...this.movie,
          [type]: statusArr[index],
        };
      });
      $("#movieInfo").modal("show");
    },

    async handleActive(e, id) {
      e.stopPropagation();
      if (this.activeId === id) {
        this.activeId = "";
      } else {
        this.movie = this.nowList.find((movie) => movie.id === id);
        const statusArr = await getMovieStatus(this.$http, id);
        const arr = ["List", "Fav", "ToSee"];
        arr.forEach((type, index) => {
          this.movie = {
            ...this.movie,
            [type]: statusArr[index],
          };
        });
        this.activeId = id;
      }

      document.addEventListener("click", () => {
        this.activeId = "";
      });
    },

    getActor(id) {
      const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.actors = response.data.cast.map((actor) => actor.name);
        this.actors = this.actors.slice(0, 4);
        console.log(this.actors);
      });
    },

    async handleMoiveStatus(payload) {
      try {
        const newMovie = await this.toggleToList({
          ...payload,
          movie: this.movie,
        });
        console.log("yyfufuy", newMovie);
        this.movie = newMovie;
      } catch (err) {
        console.log("toggle movie error", err);
      }
    },

    // toggleToList({id, type}) {
    //   if (!this.movie[type]) {
    //     const api = `/movieBuff/${type}`;
    //     this.$http
    //       .post(api, {
    //         name: this.movie.original_title,
    //         movieID: id,
    //       })
    //       .then((response) => {
    //         this.movie = {
    //           ...this.movie,
    //           [type]: true,
    //         };
    //         console.log("已加入清單");
    //       });
    //   } else {
    //     const api = `/movieBuff/${type}/${id}`;
    //     this.$http.delete(api).then((response) => {
    //       console.log(response.data.message);
    //       console.log(this.movie);
    //       this.movie = {
    //         ...this.movie,
    //         [type]: false,
    //       };
    //       this.apiID = null;
    //     });
    //   }
    // },
  },
  computed: {
    // hasMovie() {
    //   return Object.keys(this.movie).length
    // }
  },
  created() {
    this.getNowPlay();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
li {
  list-style: none;
}

.gallery {
  overflow: scroll;
}
p {
  margin: 0px;
}
.nowPlayCard {
  width: 500px;
  position: relative;
  img {
    width: 180px;
    border-radius: 10px;
  }

  .cardContent {
    h5 {
      font-size: 14px;
    }
    font-size: 14px;
    line-height: 1.1;
    p {
      color: grey;
      margin-bottom: 10px;
    }
  }
}
.menu {
  position: absolute;
  top: 0;
  right: 0px;
  .dropdownBtn {
    color: #ffffffb3;
    &:hover {
      opacity: 0.5;
    }
  }
  .dropdownMenu {
    width: 125px;
    background-color: #fff;
    border-radius: 10px;
    opacity: 0.9;
    position: absolute;
    top: 20;
    right: 10px;
    li {
      &:hover {
        background-color: #000000b3;
        button {
          color: #ffffff;
        }
      }
    }
    button {
      font-size: 12px;
      span {
        font-size: 16px;
      }
    }
  }
}

.clicked {
  color: #ff1493;
}

.title {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  font-size: 24px;
}
.starRating {
  position: relative;
  font-size: 1.5rem;
  .full_star {
    color: #ffd700;
    position: absolute;
    overflow: hidden;
    top: 0;
  }
}
</style>