<template>
  <div class="container">
    <div class="d-flex justify-content-end">
      <select name="myList" v-model="mySelect" class="listInput">
        <option value="">選擇清單</option>
        <option value="List">Seen</option>
        <option value="Fav">Favorite</option>
        <option value="ToSee" selected>To Be Seen</option>
      </select>
    </div>
    <ul>
      <li v-for="item in showList" :key="item.id">
        <div class="listCard mt-5 p-4 d-flex">
          <div class="mr-4">
            <img
              :src="`https://image.tmdb.org/t/p/w200${item.poster_path}`"
              alt=""
            />
          </div>
          <div
            class="cardContent d-flex flex-column justify-content-between w-100"
          >
            <h3 class="w-100 mb-2">{{ item.name }}</h3>
            <div class="cardBody">
              <div class="d-flex mb-2">
                <div class="starRating d-inline-block mr-2">
                  <div class="empty_star fz-xl">★★★★★</div>
                  <div
                    class="full_star fz-xl"
                    :style="{ width: `${item.vote_average * 10}%` }"
                  >
                    ★★★★★
                  </div>
                </div>
                <span class="scoreStyle text-warning mr-2">{{
                  item.vote_average
                }}</span>
                <span class="scoreStyle">({{ item.vote_count }})人評價</span>
              </div>
              <p>{{ item.overview }}</p>
              <p>
                上映時間：<span>{{ item.release_date }}</span>
              </p>
            </div>
            <div class="cardFooter d-flex justify-content-end">
              <button
                href="#"
                class="d-inline mr-2 btn"
                title="已看過"
                v-if="mySelect === 'ToSee'"
                @click="addtoList(item, 'List')"
              >
                <span :class="['material-icons', 'iconDec', 'iconColor']">
                  list
                </span>
              </button>
              <button
                href="#"
                class="d-inline btn"
                title="加入最愛"
                v-if="mySelect === 'List' || mySelect === 'ToSee'"
                @click="addtoList(item, 'Fav'); isActive= !isActive"        
              >
                <span class="material-icons iconDec iconColor" :class="{clicked : isActive}"> favorite </span>
              </button>
              <button
                href="#"
                class="d-inline btn"
                title="從清單刪除"
                @click="delItem(item.movieID, mySelect)"
              >
                <span :class="['material-icons', 'iconDec', 'iconColor']">
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import toggleMovieMixin from "../mixins/toggleMovieMixin";

export default {
  mixins: [toggleMovieMixin],
  data() {
    return {
      showList: [],
      mySelect: "ToSee",
      movie: [],
      isActive:false,
      List:[],
      Fav:[],
      ToSee:[]
    };
  },
  watch: {
    mySelect: function () {
      this.getList();
    },
  },
  methods: {
    getList() {
      const api = `/movieBuff/${this.mySelect}`;
      this.$http.get(api).then((response) => {
        this.showList = response.data;
        console.log(response.data);
        console.log("showList", this.showList);
      });
    },

    async delItem(id, type) {
      console.log("1111");
      const api = `/movieBuff/${type}/${id}`;
      await this.$http.delete(api).then((response) => {
        console.log(response.data);
        this.getList();
      });
    },

    async addtoList(item, type) {
      console.log(item);
      const api = `/movieBuff/${type}/${item.movieID}`;
      const url = `/movieBuff/${type}`;
      const res = await this.$http.get(api);
      console.log("res", res);
      if (res.data) {
        alert("已在清單中");
        return
      } else {
        await this.$http.post(url, {
          name: item.name,
          movieID: item.movieID,
          poster_path: item.poster_path,
          overview: item.overview || "尚無資訊",
          release_date: item.release_date,
          vote_average: item.vote_average,
          vote_count: item.vote_count,
        });
        console.log("已加入清單");
        if (type === "List") {
          await this.delItem(item.movieID, "ToSee");
          this.getList();
        }
      }
    },

   async getAllList(){
      let urlArr = [
        `/movieBuff/List`,
        `/movieBuff/Fav`,
        `/movieBuff/ToSee`
    ]
    let newArr =  await Promise.all(urlArr.map(async (url) => {
        const res = await this.$http.get(url)
       return res.data
       
    }))
    console.log('NA' ,newArr)
    if(newArr){
      [this.List, this.Fav, this.ToSee] = newArr
    }
    
   
    
    }
    
  },
  computed: {
    // showingList(type) {
    //   if (this.mySelect === type) {
    //     const api = `/movieBuff/${type}`;
    //     this.$http.get(api).then((response) => {});
    //   }
    // },
  },
  created() {
    this.getList();
    this.getAllList()
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.listInput {
  text-align: center;
  text-align-last: center;
  width: 150px;
  padding: 6px;
  background-color: #000000cc;
  border-radius: 50px;
  color: white;
  appearance: none;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #ffffff;
}
.listCard {
  color: #ffffff;
  background-color: #00000080;
  width: 80%;
}

.starRating {
  position: relative;
  font-size: 0.75rem;
  .full_star {
    color: #ffd700;
    position: absolute;
    overflow: hidden;
    top: 0;
  }
}
.scoreStyle {
  font-size: 0.825rem;
}

.iconColor {
  color: #ffffff;
  &:hover {
    color: #ff1493;
  }
}

.clicked {
  color: #ff1493;
}
</style>