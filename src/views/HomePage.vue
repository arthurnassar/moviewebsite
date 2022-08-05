<template>
  <div
    class="about"
    :style="{
      backgroundImage: returnBackground,
    }"
  >
    <main>
      <NavBar />
      <section class="filme-info pure-white">
        <div v-show="selectedMovie">
          <div>
            <p>categorias</p>
            <h1>Titulo</h1>
            <span> AVALIACAO ***** duracao</span>
          </div>

          <div class="overview">
            <p class="orange-light">overview</p>
            <p>DESCRICAO DO FILME OU SERIE</p>
            <p>alguma frase se tiver alinhada a direita</p>
          </div>

          <router-link class="orange-light fs-12" to=""
            >Descubra mais LINK PARA O SITE DE DETALHES</router-link
          >
        </div>
        <template v-if="genres && !movies">
          <MoviesCarousel
            v-for="genre in genres"
            :key="genre.id"
            :genreName="genre.name"
          ></MoviesCarousel>
        </template>
        <template v-else-if="movies">
          <MoviesCarousel
            @filme-selecionado="selecionarFilme($event)"
            v-for="movie in movies"
            :key="movie.id"
            :genreName="movie.name"
            :movies="movie.movies.results"
          ></MoviesCarousel>
        </template>
        <template v-else>
          <p class="text-white">CARREGANDO</p>
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import axios from 'axios'
import MoviesCarousel from '@/components/MoviesCarousel.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    MoviesCarousel
  },
  data () {
    return {
      poster: '',
      genres: null,
      movies: [],
      selectedMovie: undefined,
      windowWidth: ''
    }
  },
  computed: {
    returnBackground () {
      return ` linear-gradient(to bottom, rgba(71, 71, 71, 0.76), rgba(71, 71, 71, 0.76)),
    url(https://image.tmdb.org/t/p/original${this.poster})`
    }
  },
  watch: {
    genres () {
      this.getMoviesByGenre(this.genres)
    }
  },
  methods: {
    selecionarFilme (event) {
      this.selectedMovie = event
      if (this.windowWidth === 'mobile') {
        this.poster = event.poster_path
      } else if (this.windowWidth === 'desktop') {
        this.poster = event.backdrop_path
      }
    },
    logOut () {
      this.$store.commit('logOut')

      router.push('login')
    },
    getGenres () {
      const self = this
      axios
        .get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR'
        )
        .then(function (response) {
          self.genres = response.data.genres
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getMoviesByGenre (array) {
      array.forEach((item) => {
        const id = item.id
        const self = this

        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`
          )
          .then(function (response) {
            self.movies.push({
              id: item.id,
              name: item.name,
              movies: response.data
            })
            self.selectedMovie = response.data.results[0]
            if (self.windowWidth === 'mobile') {
              self.poster = response.data.results[0].poster_path
            } else if (self.windowWidth === 'desktop') {
              self.poster = response.data.results[0].backdrop_path
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
    updateWindowWidth () {
      if (window.innerWidth >= 600) {
        this.windowWidth = 'desktop'
      } else {
        this.windowWidth = 'mobile'
      }
    }
  },
  mounted () {
    if (this.$route.query.approved === 'true') {
      this.$store.commit('setRequestToken', this.$route.query.request_token)
      this.$store.dispatch('logInWithTMDB')
    }

    this.updateWindowWidth()
    window.addEventListener('resize', this.updateWindowWidth)

    this.getGenres()
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
    min-height: 100vh;

    * {
      margin: 0;
    }

    .navbar {
      margin-bottom: min(5%, 200px);
      & .collapse {
        position: absolute;
        z-index: 1;
        right: 0;
        width: 200px !important;
        top: 100px;

        .logout-item {
          div#collapseExample {
            position: relative !important;
            top: 0 !important;
            width: 100px !important;
          }
        }
      }
      & .collapsing {
        position: absolute;
        z-index: 1;
        right: 0;
        width: 200px !important;
        top: 100px;
      }
    }
  }
}

@media screen and (min-width: 990px) {
  main {
    .navbar {
      .collapse {
        position: initial !important;
      }
      .collapsing {
        position: initial !important;
      }
    }
  }
}
</style>
