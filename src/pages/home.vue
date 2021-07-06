

<template>
  <div class="container text-white">
         <loading :active.sync="isLoading" 
        ></loading>
    <swipe class="my-swipe container" :speed="1000" :auto="5000" @change="onMovieChange">
      <h2>近期推薦電影</h2>
      <swipe-item
        class="slide mt-3"
        v-for="movie in popularMovie"
        :key="movie.id"
      >
        <div
          class="movieCarousel d-flex justify-content-between align-item-end"
          :style="{
            'background-image': `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
          }"
        >
          <div class="movieCard d-flex align-items-end p-4 w-100">
            <img
              @click="
                getMovieInfo(movie.id);
                getActor(movie.id);
              "
              class="cardImage mr-5"
              :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
              alt=""
            />
            <div class="justify-content-between">
              <h2 class="cardTitle">{{ movie.title }}</h2>
              <p class="movieScore m-0">
                觀眾評分：
                <span
                  v-if="movie.vote_average > 8"
                  class="material-icons text-warning"
                >
                  grade
                </span>
                {{ movie.vote_average }} / <span>10</span>
              </p>
            </div>
            <div
              class="playTrailer  ml-auto"
              @click="getTrailer(movie.id)"
              data-toggle="modal"
              data-target="#trailerModal"
            >
              <span class="material-icons"> play_circle_outline </span>
            </div>
          </div>
        </div>
      </swipe-item>
      <!-- <swipe-item class="slide2">2</swipe-item>
    <swipe-item class="slide3">3</swipe-item> -->
    </swipe>
    <VideoModal
      :videoProp="movie"
      :videoAdd="videoAddress"
      @clear-video-add="clearVideoAdd"
    />
    <Modal
      :movieProp="movie"
      @toggle-list="handleMoiveStatus"
      v-if="movie.id"
      :actorProp="actors"
    />
  </div>
</template>

<script>
import toggleMovieMixin from "../mixins/toggleMovieMixin";
import Modal from "../components/modal";
import VideoModal from "../components/videoModal";
import { getMovieStatus } from '../utils'

export default {
  components: {
    Modal,
    VideoModal,
  },
  mixins: [toggleMovieMixin],
  data() {
    return {
      popularMovie: [], 
      movie: {},
      trailers: [],
      actors: [],
      videoAddress: "",
      isLoading:false
    };
  },
  methods: {
    getPopular() {
      this.isLoading = true;
      const api = `https://api.themoviedb.org/3/movie/popular?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US&page=1`;
      this.$http.get(api).then((response) => {
        this.popularMovie = response.data.results;
        console.log(`popular:`, this.popularMovie);
         this.isLoading = false;
      });
    },
  
    async getMovieInfo(id) {
      this.isLoading = true;
      this.movie = this.popularMovie.find((movie) => movie.id === id);
      const statusArr = await getMovieStatus(this.$http, id)
      const arr = ['List', 'Fav', 'ToSee']
      arr.forEach((type, index) => {
        this.movie = {
          ...this.movie,
          [type]: statusArr[index]
        }
      })
      this.isLoading = false;
      $("#movieInfo").modal("show");
    },

    async handleMoiveStatus(payload) {
      try {
        const newMovie = await this.toggleToList({
          ...payload,
          movie: this.movie,
        });
        console.log(newMovie);
        this.movie = newMovie;
      } catch (err) {
        console.log("toggle movie error", err);
      }
    },

    getTrailer(id) {
      const api = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US`;
      this.$http.get(api).then((response) => {
        this.trailers = response.data.results;
        this.videoAddress = response.data.results[0].key;
        console.log(`trailer:`, this.trailers);
        console.log(`videoAddress`, this.videoAddress);
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

    clearVideoAdd() {
      console.log("aaa", this.videoAddress);
      this.videoAddress = "";
      console.log("bbb", this.videoAddress);
    },

    onMovieChange() {
      this.isActive = false
    },
  },

  created() {
    this.getPopular();
  },
};
</script>


<style lang="scss" scoped>
ul {
  list-style: none;
}
.my-swipe {
  height: 100vh;
  width: 990px;
  color: #fff;

  .movieCarousel {
    border-radius: 10px;
    background: center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 450px;
    position: relative;
    .menu {
      color: #fff;
      opacity: 0.6;
      position: fixed;
      span {
        font-size: 2.5rem;
      }
      &:hover {
        color: #000;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 300px;
      // background-color: #000000;
      left: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        transparent 70%,
        transparent 30%,
        black,
        black
      );
    }
   
    .movieCard {
      margin-bottom: -80px;
      z-index: 9999;
      img {
        &:hover {
          width: 200px;
          cursor: pointer;
        }
      }
      .cardTitle {
        font-size: 40px;
        font-weight: 2000;
        // background-color: #000000e6;
        width: 100%;
      }
      .movieScore {
        font-size: 32px;
        span {
          font-size: 24px;
        }
      }
      .cardContent {
        font-size: 20px;
      }
      .cardImage {
        width: 125px;
      }
    }
  }
}

.playTrailer {
  span {
    font-size: 4.75rem;
    &:hover {
      color: #ffd700;
      cursor: pointer;
    }
  }
}

.iconColor {
  color: white;
}

.clicked {
  color: #ff1493;
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
