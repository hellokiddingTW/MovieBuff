export const getMovieStatus = async (axios, id) => {
    let apiArr = [
        `/movieBuff/List/${id}`,
        `/movieBuff/Fav/${id}`,
        `/movieBuff/ToSee/${id}`
    ]

    return await Promise.all(apiArr.map(async (url) => {
        const res = await axios.get(url)
        console.log('res',res)
        if(res.data) {
            return true
        } else {
            return false
        }
    }))

    // const listapi = `/movieBuff/List/${id}`;
    //   this.$http.get(listapi).then((response) => {
    //     if (response.data) {
    //       this.movie = {
    //         ...this.movie,
    //         List: true,
    //       };
    //     } else {
    //       this.movie = {
    //         ...this.movie,
    //         List: false,
    //       };
    //     }
    //   });
    //   const favapi = `/movieBuff/Fav/${id}`;
    //   this.$http.get(favapi).then((response) => {
    //     if (response.data) {
    //       this.movie = {
    //         ...this.movie,
    //         Fav: true,
    //       };
    //     } else {
    //       this.movie = {
    //         ...this.movie,
    //         Fav: false,
    //       };
    //     }
    //   });
    //   const toSeeapi = `/movieBuff/ToSee/${id}`;
    //   this.$http.get(toSeeapi).then((response) => {
    //     if (response.data) {
    //       this.movie = {
    //         ...this.movie,
    //         ToSee: true,
    //       };
    //     } else {
    //       this.movie = {
    //         ...this.movie,
    //         ToSee: false,
    //       };
    //     }
}