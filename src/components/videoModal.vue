<template>
  <div>
    <div
      class="modal fade "
      id="trailerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">

        <div class="modal-content pb-5">
          <div class="modal-header border-0 p-2">
              <h3 class="modal-title" id="exampleModalLabel">{{videoProp.title}}</h3>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <iframe width="900" height="506" :src="`https://www.youtube.com/embed/${videoAdd}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['videoProp', 'videoAdd'],
    mounted() {
      $("#trailerModal").on('hide.bs.modal', (e) => {
        console.log('hweiohw')
        this.$emit('clear-video-add')
      })
    },
    data(){
        return{}
    },
}
</script>

<style lang="scss" scoped>
    .modal-content {
  background-color: #000000b3;
  color: #ffffff;
}
</style>