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
        <div class="d-flex justify-content-end my-3 text-white">
          <p class="mx-4">Filtrar:</p>
          <button id="nota" class="filtro" @click="filtrar('nota')">
            Por notas
          </button>
          <button id="voto" class="filtro" @click="filtrar('voto')">
            Por votos
          </button>
          <button id="tudo" class="filtro" @click="filtrar('tudo')">
            Por notas mais votadas
          </button>
        </div>

        <D3Chart
          v-if="arrayData"
          :width="1000"
          :heigth="500"
          :arrayData="arrayData"
          :chartId="sentId"
        ></D3Chart>

        <div v-if="arrayData">
          <MoviesCarousel
            genreName="Mais votados"
            :topRated="true"
            :movies="arrayData"
          ></MoviesCarousel>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import D3Chart from '@/components/D3Chart.vue'
import axios from 'axios'
import MoviesCarousel from '@/components/MoviesCarousel.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    D3Chart,
    MoviesCarousel
  },
  data () {
    return {
      idType: 'selected',
      arrayData: null,
      filtro: ''
    }
  },
  methods: {
    filtrar (botao) {
      const todosBotoes = document.querySelectorAll('.filtro')
      todosBotoes.forEach((item) => {
        item.classList.remove('pressed')
      })
      const botaoClicado = document.querySelector(`#${botao}`)
      botaoClicado.classList.add('pressed')

      this.filtro = botao
    },
    handleArrayDataResponse (data) {
      const top10 = []
      for (let i = 0; i < 10; i++) {
        top10.push(data[i])
      }
      switch (this.filtro) {
        case 'tudo':
          this.arrayData = top10.sort((a, b) => {
            if (a.vote_average === b.vote_average) {
              return b.vote_count - a.vote_count
            }

            return b.vote_average - a.vote_averageW
          })
          console.log(this.arrayData)
          break
        case 'voto':
          this.arrayData = top10.sort((a, b) => b.vote_count - a.vote_count)
          break

        case 'nota':
          this.arrayData = top10
          break
      }
    },
    getTopRated () {
      if (this.filtro) {
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

        this.sentId = this.idType
      } else {
        alert('Por favor selecione o filtro desejado')
      }
    }
  }
}
</script>

<style lang="scss">
.about {
  background-size: contain;
  background-repeat: no-repeat;
  color: rgba(71, 71, 71, 0.52);
  padding: 0px max(10px, 5%);

  main {
    max-width: 1800px;
    margin: 0 auto;

    * {
      margin: 0;
    }

    button {
      border-radius: 5px;
    }

    button.pressed {
      box-shadow: inset 0px 03px 6px 0px rgba(255, 255, 255, 0.62);
      background-color: #5c5b5b !important;
      color: white;
    }

    button:active {
      background: rgba(255, 255, 255, 0.705);
    }
  }
}
</style>
