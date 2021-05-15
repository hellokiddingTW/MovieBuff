<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-3 pt-3">
          <div class="bookingCard">
            <img
              :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
              alt=""
            />
            <div>
              <div class="cardContent p-2">
                <h6>
                  Director
                  <p class="mt-2">
                    <span>{{ director }}</span>
                  </p>
                </h6>
                <h6>
                  Starring
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li
                        class="mt-1 breadcrumb-item"
                        v-for="actor in actors"
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
                <h6>
                  Genre
                  <p class="mt-2">
                    <span
                      class="m-1 badge badge-light text-dark"
                      v-for="genre in movie.genres"
                      :key="genre.id"
                      >{{ genre.name }}</span
                    >
                  </p>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9 bg-black pt-3">
          <div class="title d-flex justify-content-between">
            <h3 class="text-white font-weight-bold">
              {{ movie.original_title }}
            </h3>
            <div class="dropdown">
              <button
                class="btn btnDropdown dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ theater }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  class="dropdown-item"
                  type="button"
                  @click="theater = '威秀影城'"
                >
                  威秀影城
                </button>
                <button
                  class="dropdown-item"
                  type="button"
                  @click="theater = '秀泰影城'"
                >
                  秀泰影城
                </button>
                <button
                  class="dropdown-item"
                  type="button"
                  @click="theater = '美麗華影城'"
                >
                  美麗華影城
                </button>
              </div>
            </div>
            <!-- <select name="theater" class="">
              <option value="">選擇戲院</option>
              <option value="VieShow">威秀影城</option>
              <option value="ShowTime">秀泰影城</option>
              <option value="Miramar">美麗華影城</option>
            </select> -->
          </div>
          <div class="dateAndTime mt-3 row">
            <div class="clendar col-6 no-gutter">
              <div class="clendarDate dateText">
                <p class="dateText border-bottom border-dark py-2">
                  <span>{{ nowDay }}, </span><span>{{ nowMonth }} </span
                  ><span>{{ nowDate }}</span>
                </p>
                <ul class="d-flex p-0 mt-1 d-flex justify-content-around">
                  <li v-for="(day, index) in renderDay" :key="index">
                    <button
                      class="btn dateBtn flex-column-centerd font-weight-bold"
                      :class="{ active: index === selectedDate }"
                      @click="selectedDate = index"
                    >
                      <p>{{ day.day }}</p>
                      <p>{{ day.date }}</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="movieShowing col-6 dateText">
              <p class="dateText border-bottom border-dark py-2">
                <span>Show Time</span>
              </p>
              <ul class="d-flex p-0 mt-1 d-flex justify-content-between">
                <li v-for="(showing, index) in renderShowing" :key="index">
                  <button
                    class="btn dateBtn d-flex flex-column-centerd font-weight-bold"
                    :class="{ active: index === selectedTime }"
                    @click="selectedTime = index"
                  >
                    <p>{{ showing.view }}</p>
                    <p>{{ showing.time }}</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="theater container-fluid flex-column-centerd">
            <div class="screen w-100 my-3"></div>
            <p class="text-center text-white">S C R E E N</p>
            <div class="seatRow mt-4">
              <p class="rowNumber mr-2 text-left">A</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">A</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">B</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">B</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">C</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">C</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">D</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">D</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">E</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">E</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">F</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">F</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">G</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{
                  occupied: theater === '威秀影城' || theater === '秀泰影城',
                }"
              ></div>
              <div
                class="seat"
                :class="{
                  occupied: theater === '威秀影城' || theater === '秀泰影城',
                }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '威秀影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">G</p>
            </div>
            <div class="seatRow">
              <p class="rowNumber mr-2 text-left">H</p>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '秀泰影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div
                class="seat"
                :class="{ occupied: theater === '美麗華影城' }"
              ></div>
              <div class="seat"></div>
              <div class="seat"></div>
              <p class="rowNumber ml-2 text-right">H</p>
            </div>
            <div class="seatRow mt-4">
              <div class="seat active mx-2"></div>
              <p class="dateText mr-5">selected</p>
              <div class="seat mx-2"></div>
              <p class="dateText mr-5">Available</p>
              <div class="seat occupied mx-2"></div>
              <p class="dateText mr-5">Taken</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 



<script>
export default {
  data() {
    return {
      date: "",
      nowDate: "",
      nowDay: "",
      nowMonth: "",
      nowYear: "",
      selectedDate: "",
      selectedTime: "",
      theater: "請選擇戲院",
      movieId: null,
      movie: "",
      genreList: [],
      actors: "",
      director: "",
    };
  },
  methods: {
    getNowDate() {
      let date = new Date();
      let month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let dayList = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      this.nowYear = date.getFullYear();
      this.nowMonth = month[date.getMonth()];
      this.nowDate = date.getDate();
      this.nowDay = dayList[date.getDay()];
    },

    seatCliked() {
      let seatRow = document.querySelectorAll(".seatRow");
      seatRow.forEach((singleRow) => {
        singleRow.addEventListener("click", (e) => {
          if (
            e.target.classList.contains("seat") &&
            !e.target.classList.contains("occupied")
          ) {
            e.target.classList.toggle("active");
          }
        });
      });

      console.log(seatRow);
    },

    getMovieData() {
      let id = this.$route.params.id;
      this.movieId = id;
      console.log(id);
      if (this.movieId) {
        const api = `https://api.themoviedb.org/3/movie/${id}?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US`;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          this.movie = response.data;
        });
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=551d624345faddc0074c98e32cf2a66e&language=en-US`;
        this.$http.get(url).then((response) => {
          console.log(response.data);
          this.actors = response.data.cast.map((actor) => actor.name);
          this.actors = this.actors.slice(0, 4);
          response.data.crew.forEach((item) => {
            if ((item.job = "Director")) {
              this.director = item.name;
            }
          });
        });
      }
    },

    getCredit(id) {},

    handleDate() {
      //處理日期的func
    },
  },
  computed: {
    renderDay() {
      const arr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const nowDay = new Date().getDay(); // 2
      const nowDate = new Date().getDate();
      // [tue, wed, ...mon]
      let newArr = [...arr.slice(nowDay), ...arr.slice(0, nowDay)];
      let dateArr = [];
      newArr.forEach((day, index) => {
        dateArr.push({
          day,
          date: nowDate + index, // TODO: 處理月份
        });
      });
      return dateArr;
    },
    renderShowing() {
      const movieShowing = [
        "11:00",
        "13:00",
        "15:00",
        "17:00",
        "19:00",
        "21:00",
        "23:00",
      ];
      const screenView = ["2D", "2D", "3D", "2D", "2D", "2D", "3D"];
      let showingArr = [];
      movieShowing.forEach((showing, index) => {
        showingArr.push({
          time: showing,
          view: screenView[index],
        });
      });
      console.log(showingArr);
      return showingArr;
    },
  },
  mounted() {
    this.seatCliked();
  },
  created() {
    this.getNowDate();
    this.getMovieData();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  font-size: 12px;
}

ul {
  list-style: none;
}

button {
  &:focus {
    box-shadow: none;
  }
}

.bg-black {
  background: #000000cc;
}

.bookingCard {
  background: #000000cc;

  h6 {
    color: #fff;
  }
  img {
    width: 100%;
  }
  .cardContent {
    span {
      color: #c0c0c0;
      font-size: 10px;
    }
  }
}

.dateText {
  font-size: 0.875rem;
  color: #fff;
}
.dateBtn {
  color: #fff;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  &:hover {
    background: #ff1493;
    color: #000000b3;
  }
}
.btnDropdown {
  background-color: #000000cc;
  border-radius: 50px;
  border: 1px solid #ffffff;
  color: #fff;
  padding: 8px 24px;
  font-size: 14px;
}
.screen {
  width: 100%;
  height: 16px;
  border: 8px solid #fff;
  border-radius: 50% 50% 0 0/100% 100% 0 0;
  border-bottom: none;
}

.seatRow {
  display: flex;
  margin-top: 8px;
}

.rowNumber {
  color: #444451;
  font-size: 10px;
  height: 12px;
  width: 15px;
  text-align: center;
}
.seat {
  background-color: #444451;
  height: 15px;
  width: 18px;
  margin: 4px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &:hover {
    transform: scale(1.33, 1.33);
    cursor: pointer;
  }
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
}

.flex-column-centerd {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.active {
  background: #ff1493;
}

.occupied {
  background: #cc0000;
}

.seat:nth-of-type(6) {
  margin-right: 48px;
}

.seat:nth-last-of-type(6) {
  margin-left: 48px;
}
</style>