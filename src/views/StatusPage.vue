<template>
  <div class="about">
    <main>
      <NavBar :noSearch="true" />
      <section class="status">
        <div class="input-group">
          <select
            v-model="idType"
            class="custom-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
          >
            <option disabled value="selected">
              Escolha o tipo de pesquisa...
            </option>
            <option value="movie">Filme</option>
            <option value="tv">Série</option>
          </select>
          <div class="input-group-append">
            <button
              @click="getTopRated"
              class="btn btn-outline-secondary"
              type="button"
            >
              Button
            </button>
          </div>
        </div>
        <D3Chart
          v-if="arrayData"
          :width="1000"
          :heigth="500"
          :arrayData="arrayData"
          :chartId="idType"
        ></D3Chart>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import D3Chart from '@/components/D3Chart.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    D3Chart
  },
  data () {
    return {
      idType: 'selected',
      arrayData: null
    }
  },
  methods: {
    handleArrayDataResponse (data) {
      const top10 = []
      let teste = 10
      for (let i = 0; i < 10; i++) {
        if (data[i].vote_average * 10 > data[i + 1].vote_average * 10) {
          teste--
        }
        data[i].finalNumber = teste
        top10.push(data[i])
      }
      this.arrayData = top10
    },
    getTopRated () {
      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/top_rated?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&page=1`
        )
        .then(function (response) {
          self.handleArrayDataResponse(response.data.results)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
</style>
