<template>
  <div class="filtro">
    <div class="input-group mb-3">
      <select
        v-model="tipoDeFiltro"
        class="custom-select"
        id="inputGroupSelect01"
      >
        <option value="null" disabled>Escolha o filtro</option>
        <option v-if="idType === 'movie'" value="now">Em cartaz</option>
        <option v-if="idType === 'movie'" value="upcoming">
          Próximas estreias
        </option>
        <option value="top">Melhores avaliações</option>
        <option value="popular">Mais populares</option>
        <option v-if="idType === 'tv'" value="onAir">Series no ar</option>
      </select>
      <div class="input-group-append">
        <button
          @click.prevent="filtrar"
          class="btn btn-outline-secondary"
          type="button"
        >
          Filtrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FiltrarItens',

  data () {
    return {
      tipoDeFiltro: null,
      response: []
    }
  },
  props: {
    idType: String
  },
  watch: {
    response () {
      this.$emit('filtroAtivado', this.response)
    }
  },
  methods: {
    filtrar () {
      switch (this.tipoDeFiltro) {
        case 'now':
          axios
            .get(
              `https://api.themoviedb.org/3/${this.idType}/now_playing?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`
            )
            .then((response) => {
              this.response = [
                {
                  id: 1,
                  name: 'Em cartaz',
                  movies: response.data
                }
              ]
            })
            .catch((error) => {
              console.log(error)
            })
          break
        case 'upcoming':
          axios
            .get(
              'https://api.themoviedb.org/3/movie/upcoming?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1'
            )
            .then((response) => {
              this.response = [
                {
                  id: 2,
                  name: 'Próximas Estreias',
                  movies: response.data
                }
              ]
            })
            .catch((error) => {
              console.log(error)
            })
          break
        case 'top':
          axios
            .get(
              `https://api.themoviedb.org/3/${this.idType}/top_rated?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`
            )
            .then((response) => {
              this.response = [
                {
                  id: 3,
                  name: 'Melhores Avaliações',
                  movies: response.data
                }
              ]
            })
            .catch((error) => {
              console.log(error)
            })
          break
        case 'popular':
          axios
            .get(
              `https://api.themoviedb.org/3/${this.idType}/popular?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`
            )
            .then((response) => {
              this.response = [
                {
                  id: 4,
                  name: 'Mais Populares',
                  movies: response.data
                }
              ]
            })
            .catch((error) => {
              console.log(error)
            })
          break
        case 'onAir':
          axios
            .get(
              `https://api.themoviedb.org/3/${this.idType}/on_the_air?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`
            )
            .then((response) => {
              this.response = [
                {
                  id: 5,
                  name: 'Series no ar',
                  movies: response.data
                }
              ]
            })
            .catch((error) => {
              console.log(error)
            })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filtro {
  width: 100%;
  max-width: 400px;
}
</style>
