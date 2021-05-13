<script>export default {
  methods: {
    async toggleToList({movie, id, type}) {
      console.log('movie',movie,'id',id,'type',type)
      if (!movie[type]) {
        const api = `/movieBuff/${type}`;
        await this.$http.post(api, {
            name: this.movie.original_title,
            movieID: id,
            poster_path:this.movie.poster_path,
            overview:this.movie.overview || "尚無資訊",
            release_date:this.movie.release_date,
            vote_average:this.movie.vote_average,
            vote_count:this.movie.vote_count,
          })
        console.log("已加入清單");
        return {
            ...movie,
            [type]: true,
        };
      } else {
        const api = `/movieBuff/${type}/${id}`;
        const response = await this.$http.delete(api)
        console.log(response.data.message);
        console.log(movie);
        return {
        ...movie,
        [type]: false,
        };
      }
    },
  }
};
</script>