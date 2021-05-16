<template>
  <div class="container test">
    <ul class="d-flex flex-wrap justify-content-around">
      <h2 class="text-white w-100">即將上映</h2>
      <li
        v-for="item in upComingMovies"
        :key="item.id"
        class="movieCard mt-5"
        v-if="item.poster_path"
      >
        <div>
          <img
            :src="`https://image.tmdb.org/t/p/w200${item.poster_path}`"
            alt=""
            @click="getMovieInfo(item.id); getActor(item.id)"
            class="mb-2"
          />
          <div>
            <h3 class="titleSize text-white m-0 font-weight-bold">
              {{ item.original_title }}
            </h3>
            <span class="text-white mt-2">{{ item.release_date }}</span>
          </div>
        </div>
      </li>
    </ul>

    <Modal
      :movieProp="movie"
      :actorProp="actors"
      v-if="movie.id"
      @toggle-list="handleMoiveStatus"
    />
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <a
          class="page-link mr-2"
          href="#"
          aria-label="Previous"
          @click="preTenPages"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
        <li class="page-item" :class="{ disabled: page <= 1 }">
          <a class="page-link" href="#" @click="prePage(page)">Previous</a>
        </li>
        <li
          class="page-item"
          :class="{ active: page == pageNumber }"
          v-for="pageNumber in 10"
          :key="pageNumber"
          v-if="pageNumber + showTotalPage < totalPage"
        >
          <a
            @click="pagiButton(pageNumber + showTotalPage)"
            class="page-link"
            href="#"
            >{{ pageNumber + showTotalPage }}</a
          >
        </li>
        <li class="page-item" :class="{ disabled: page >= totalPage - 1 }">
          <a class="page-link" href="#" @click="nextPage(page)">Next</a>
        </li>
        <a
          class="page-link ml-2"
          href="#"
          aria-label="Next"
          @click="nextTenPages"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </ul>
    </nav> -->
  </div>
</template>

<script>
import Modal from "../components/modal";
import toggleMovieMixin from "../mixins/toggleMovieMixin";
import { getMovieStatus } from '../utils'


export default {
  components: {
    Modal,
  },
  mixins: [toggleMovieMixin],
  data() {
    return {
      movies: [],
      actors:[],
      movie: {},
      page: 1,
      totalPage: 0,
      upComingMovies: [],
      num: 1,
    };
  },
  methods: {
    getMovies() {
      let vm = this;
      const api = `https://api.themoviedb.org/3/movie/upcoming?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US&page=${this.num}`;
      this.$http.get(api).then((response) => {
        this.movies = this.movies.concat(response.data.results);
        this.totalPage = response.data.total_pages;
        if (this.num < this.totalPage) {
          this.num++;
          this.getMovies();
        }
        this.upComingMovies = this.movies.filter(
          (movie) => new Date().getTime() < new Date(movie.release_date)
        );
        // console.log(this.upComingMovies)
        this.upComingMovies.sort(
          (a, b) => Date.parse(a.release_date) - Date.parse(b.release_date)
        );
      });
    },
  

 async getMovieInfo(id) {
      this.movie = this.movies.find((movie) => movie.id === id);
      const statusArr = await getMovieStatus(this.$http, id)
      const arr = ['List', 'Fav', 'ToSee']
      arr.forEach((type, index) => {
        this.movie = {
          ...this.movie,
          [type]: statusArr[index]
        }
      })
      console.log(this.movie)
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

      getActor(id) {
      const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.actors = response.data.cast.map((actor) => actor.name);
        this.actors = this.actors.slice(0, 4);
        console.log(this.actors);
      });
    },
    // pagiButton(num) {
    //   this.page = num;
    //   this.getMovies();
    // },
    // nextPage(nowPage) {
    //   this.page = nowPage + 1;
    //   this.getMovies();
    // },

    // nextTenPages() {
    //   this.page = Math.floor((this.page - 1) / 10) * 10 + 11;
    //   console.log("next", this.page);
    //   this.getMovies();
    // },
    // prePage(nowPage) {
    //   this.page = nowPage - 1;
    //   this.getMovies();
    // },

    // preTenPages() {
    //   if (this.page < 11) return;
    //   this.page = Math.floor((this.page - 1) / 10) * 10 - 9;
    //   console.log("pre", this.page);
    //   this.getMovies();
    // },
  },
  created() {
    this.getMovies();
  },
  computed: {
    showTotalPage() {
      // 2 0
      // 16 10
      return Math.floor((this.page - 1) / 10) * 10;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul {
  list-style: none;
}

span {
  font-size: 13px;
}

.titleSize {
  font-size: 1rem;
}

.page-item {
  border-radius: 10px;
}

.movieCard {
  width: 250px;
  img {
    display: block;
    width: 80%;
    height: 300px;
    &:hover {
      transform: scale(1.33, 1.33);
      cursor: pointer;
    }
  }
  h3 {
    width: 100%;
  }
}
</style>
