<template>
  <div
    class="about"
    :style="{
      backgroundImage: returnBackground,
    }"
  >
    <main>
      <NavBar @filme-procurado="handleSearch($event)" />
      <section class="filme-info pure-white">
        <div v-if="selectedMovie">
          <div class="title-info">
            <p>{{ displayGenres }}</p>
            <h1>{{ selectedMovie.title }}</h1>
            <StarRating
              :voteAverage="selectedMovie.vote_average"
              :runTime="selectedMovie.runtime"
            ></StarRating>
          </div>

          <div class="overview">
            <p class="orange-light"><strong>overview</strong></p>
            <p class="fs-12">{{ selectedMovie.overview }}</p>
            <template v-if="selectedMovie.tagline">
              <p class="text-right">
                <small>
                  <em> "{{ selectedMovie.tagline }}" </em>
                </small>
              </p>
            </template>
          </div>

          <router-link
            class="orange-light fs-12"
            :to="{
              name: 'details',
              params: { type: 'movie', id: selectedMovie.id },
            }"
            ><u>Descubra mais ...</u></router-link
          >
        </div>

        <div class="movies-container">
          <MoviesCarousel
            @filme-selecionado="selecionarFilme($event)"
            v-for="movie in movies"
            :key="movie.id"
            :genreName="movie.name"
            :movies="movie.movies.results"
          ></MoviesCarousel>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import axios from 'axios'
import MoviesCarousel from '@/components/MoviesCarousel.vue'
import StarRating from '@/components/StarRating.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    MoviesCarousel,
    StarRating
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
    displayGenres () {
      if (this.selectedMovie.genres) {
        const genresList = this.selectedMovie.genres
        const result = genresList.map((item) => {
          return item.name
        })
        return result.join(', ')
      } else if (this.selectedMovie.genres_ids) {
        const genresList = this.selectedMovie.genres_ids
        const result = genresList.map((item) => {
          return item.name
        })
        return result.join(', ')
      } else {
        return ''
      }
    },

    returnBackground () {
      return ` linear-gradient(to bottom, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.76)),
    url(https://image.tmdb.org/t/p/original${this.poster})`
    }
  },
  watch: {
    genres () {
      this.getMoviesByGenre(this.genres, this.counter)
    }
  },
  methods: {
    handleSearch (event) {
      const movie = event[0].movies.results[0]
      if (event[0].movies.results.length !== 0) {
        this.movies = event
        this.selectedMovie = movie
        if (this.windowWidth === 'mobile') {
          this.poster = movie.poster_path
        } else if (this.windowWidth === 'desktop') {
          this.poster = movie.backdrop_path
        }
      }
    },
    selecionarFilme (event) {
      const id = event.id
      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR`
        )
        .then(function (response) {
          self.selectedMovie = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
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
      const temp = []
      const promise = new Promise(function (resolve, reject) {
        array.forEach((item) => {
          const id = item.id
          axios
            .get(
              `https://api.themoviedb.org/3/discover/movie?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`
            )
            .then(function (response) {
              temp.push({
                id: item.id,
                name: item.name,
                movies: response.data
              })
            })
            .then(function () {
              resolve(temp)
            })
            .catch(function (error) {
              console.log(error)
              reject(error)
            })
        })
      })
      promise.then((temp) => {
        console.log(temp)
        this.movies = temp
        const movie = this.movies[0].movies.results[0]
        this.selecionarFilme(movie)
        if (this.windowWidth === 'mobile') {
          this.poster = movie.poster_path
        } else if (this.windowWidth === 'desktop') {
          this.poster = movie.backdrop_path
        }
      })
    },
    updateWindowWidth () {
      if (window.innerWidth >= 600) {
        this.windowWidth = 'desktop'
        if (this.selectedMovie) {
          this.poster = this.selectedMovie.backdrop_path
        }
      } else {
        this.windowWidth = 'mobile'
        if (this.selectedMovie) {
          this.poster = this.selectedMovie.poster_path
        }
      }
    }
  },
  beforeCreate () {
    if (this.$route.query.approved === 'true') {
      this.$store.commit('setRequestToken', this.$route.query.request_token)
    }
  },
  mounted () {
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

    .filme-info {
      .title-info {
        .star-container {
          display: flex;
          flex-direction: row;
          gap: 5px;
          align-items: center;

          p {
            margin-left: 5px;
          }
        }
      }
    }

    .movies-container {
      height: 1000px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
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
