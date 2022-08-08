<template>
  <div class="card" :style="{ backgroundImage: fullPathImage }">
    <div v-if="isLoading" class="vld-parent">
      <loading
        v-model:active="stillLoading"
        :can-cancel="false"
        :is-full-page="false"
        :width="100"
        :height="100"
        :opacity="0.8"
        :transition="'fade'"
      />
    </div>
    <template
      v-if="(castName || castCharacter || castDepartment) && !isLoading"
    >
      <p v-if="castName && castCharacter">
        {{ castName }} as {{ castCharacter }}
      </p>
      <p v-else>{{ castName }}</p>
      <p>{{ castDepartment }}</p>
    </template>
    <p v-if="movieName && !isLoading">{{ movieName }}</p>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'MovieCards ',
  data () {
    return {
      stillLoading: true
    }
  },
  components: {
    Loading
  },
  props: {
    poster: String,
    movieName: String,
    castName: String,
    castCharacter: String,
    castDepartment: String,
    isLoading: Boolean
  },
  watch: {
    isLoading () {
      if (this.isLoading === true) {
        this.stillLoading = true
      } else {
        this.stillLoading = false
      }
    }
  },
  computed: {
    fullPathImage () {
      return ` linear-gradient(to bottom, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url(https://image.tmdb.org/t/p/original${this.poster})`
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
  overflow: hidden;

  .vld-parent {
    width: 110%;
    height: 120%;
    margin-top: -10px;
    margin-bottom: -10px;
    margin-left: -10px;
    margin-right: -10px;
    border-radius: 15px;
  }

  &:hover {
    border: 3px solid #ff6b00;
  }
}
</style>
