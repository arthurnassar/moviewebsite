<template>
  <div class="card" :style="{ backgroundImage: fullPathImage }">
    <p>{{ movieName }}</p>
  </div>
</template>

<script>
export default {
  name: 'MoviesCarousel',
  props: {
    poster: String,
    movieName: String
  },
  computed: {
    fullPathImage () {
      return `url(https://image.tmdb.org/t/p/original${this.poster})`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  background: grey;
  background-repeat: no-repeat;
  background-size: cover;
  width: 236px;
  height: 318px;
  border-radius: 15px;
  border: none;
  box-shadow: inset 0px -30px 28px -1px rgba(0, 0, 0, 1);
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  color: white;

  &:hover {
    border: 3px solid #ff6b00;
  }
}
</style>
