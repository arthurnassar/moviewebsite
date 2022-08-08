<template>
  <div
    class="about"
    :style="{
      backgroundImage: returnBackground,
    }"
  >
    <main>
      <NavBar :noSearch="true" />

      <VideoContainer :site="site" :videoKey="videoKey"></VideoContainer>

      <section class="filme-info pure-white">
        <div class="filme-container" v-if="selectedMovie">
          <div class="title-info">
            <h1 v-if="selectedMovie.title">{{ selectedMovie.title }}</h1>
            <h1 v-else>{{ selectedMovie.name }}</h1>
            <StarRating
              v-if="selectedMovie.runtime"
              :voteAverage="selectedMovie.vote_average"
              :runTime="selectedMovie.runtime"
            ></StarRating>
            <StarRating
              v-else
              :voteAverage="selectedMovie.vote_average"
              :runTime="selectedMovie.episode_run_time[0]"
            ></StarRating>
          </div>

          <div class="overview">
            <p class="fs-12">{{ selectedMovie.overview }}</p>
            <template v-if="selectedMovie.tagline">
              <p class="text-right">
                <small>
                  <em> "{{ selectedMovie.tagline }}" </em>
                </small>
              </p>
            </template>
          </div>

          <InfoCard
            v-if="idType === 'tv'"
            :details="true"
            :status="selectedMovie.status"
            :seasons="returnSeason"
            :launchDate="selectedMovie.first_air_date"
            :originalTitle="selectedMovie.original_name"
          ></InfoCard>
          <InfoCard
            v-else
            :budget="selectedMovie.budget"
            :details="true"
            :launchDate="selectedMovie.release_date"
            :originalTitle="selectedMovie.original_title"
            :revenue="selectedMovie.revenue"
          ></InfoCard>
          <InfoCard
            :studios="true"
            :studiosList="selectedMovie.production_companies"
          ></InfoCard>
        </div>

        <template v-if="idType === 'movie'">
          <MoviesCarousel
            v-for="(crew, idx) in cast"
            :key="idx"
            :genreName="returnCrewTitlesUppercase[idx + 1]"
            :crew="crew"
          ></MoviesCarousel>
        </template>

        <template v-if="idType === 'tv'">
          <MoviesCarousel
            v-for="(crew, idx) in cast"
            :key="idx"
            :genreName="returnCrewTitlesUppercase[idx]"
            :crew="crew"
          ></MoviesCarousel>
        </template>

        <MoviesCarousel
          v-if="movies"
          :genreName="'Filmes recomendados'"
          :movies="movies"
        ></MoviesCarousel>

        <ReviewSection :reviews="reviews"></ReviewSection>
      </section>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router'
import axios from 'axios'
import StarRating from '@/components/StarRating.vue'
import VideoContainer from '@/components/VideoContainer.vue'
import MoviesCarousel from '@/components/MoviesCarousel.vue'
import InfoCard from '@/components/InfoCard.vue'
import ReviewSection from '@/components/ReviewSection.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    StarRating,
    VideoContainer,
    MoviesCarousel,
    InfoCard,
    ReviewSection
  },
  data () {
    return {
      idType: null,
      id: null,
      poster: '',
      selectedMovie: undefined,
      windowWidth: '',
      videoKey: null,
      cast: null,
      crewTitles: null,
      detailImage: null,
      site: '',
      movies: null,
      reviews: null
    }
  },
  watch: {
    id () {
      this.getDetail()
      this.getVideoKey()
      this.getCredits()
    }
  },
  computed: {
    returnSeason () {
      return this.selectedMovie.seasons[this.selectedMovie.seasons.length - 1]
        .name
    },
    returnCrewTitlesUppercase () {
      const result = this.crewTitles.map((item) => {
        const uppercaseLetter = item.split('').shift().toUpperCase()
        const titleUppercase =
          uppercaseLetter + item.split('').splice(1).join('')
        return titleUppercase
      })

      return result
    },
    returnBackground () {
      return ` linear-gradient(to bottom, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.76)),
    url(https://image.tmdb.org/t/p/original${this.poster})`
    }
  },
  methods: {
    getReviews () {
      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}/reviews?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`
        )
        .then(function (response) {
          self.reviews = response.data.results
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getRecommendations () {
      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}/recommendations?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`
        )
        .then(function (response) {
          const temp = [...response.data.results]
          self.movies = temp
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCredits () {
      const self = this
      const result = []
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}/credits?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR`
        )
        .then(function (response) {
          const crewTitles = Object.keys(response.data)
          self.crewTitles = crewTitles
          const { cast, crew } = response.data
          if (cast.length !== 0) {
            result.push(cast)
          }
          if (crew.length !== 0) {
            result.push(crew)
          }
          if (result.length !== 0) {
            self.cast = result
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getVideoKey () {
      const self = this
      let ok = false
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}/videos?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR`
        )
        .then(function (response) {
          const data = response.data.results
          let key = ''
          let site = ''
          data.forEach((item) => {
            if (!ok) {
              if (
                item.name.includes('Trailer') &&
                item.name.includes('Oficial') &&
                item.name.includes('Dublado') &&
                !item.name.includes('Teaser') &&
                !item.name.includes('Legendado')
              ) {
                key = item.key
                site = item.site
                ok = true
              }
            }
          })
          if (key !== '') {
            self.videoKey = key
            self.site = site
          } else {
            self.getVideosWithoutFilter()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getVideosWithoutFilter () {
      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}/videos?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91`
        )
        .then(function (response) {
          const data = response.data.results
          let key = ''
          let ok = false

          let site = ''
          data.forEach((item) => {
            if (!ok) {
              site = item.site
              key = item.key
              ok = true
            }
          })
          if (key !== '') {
            self.videoKey = key
            self.site = site
          } else {
            self.getMovieImages()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getMovieImages () {
      console.log('trying to get images without filter')

      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}/images?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91`
        )
        .then(function (response) {
          const data = response.data.backdrops
          let key = ''
          data.forEach((item) => {
            key = item.file_path
          })
          if (key !== '') {
            self.detailImage = key
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getDetail () {
      const self = this
      axios
        .get(
          `https://api.themoviedb.org/3/${this.idType}/${this.id}?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR`
        )
        .then(function (response) {
          self.selectedMovie = response.data
          if (self.windowWidth === 'mobile') {
            self.poster = response.data.poster_path
          } else if (self.windowWidth === 'desktop') {
            self.poster = response.data.backdrop_path
          }
        })
        .catch(function (error) {
          console.log(error)
        })
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
    updateWindowWidth () {
      if (window.innerWidth >= 600) {
        this.windowWidth = 'desktop'
      } else {
        this.windowWidth = 'mobile'
      }
    }
  },
  mounted () {
    if (this.$route.params.type) {
      this.idType = this.$route.params.type
      localStorage.setItem('idType', this.idType)
      console.log(this.$route.params.type)
    } else {
      this.idType = localStorage.getItem('idType')
    }

    this.id = this.$route.params.id
    this.updateWindowWidth()
    window.addEventListener('resize', this.updateWindowWidth)
    this.getRecommendations()
    this.getReviews()
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

    .filme-info {
      display: flex;
      flex-direction: column;
      max-height: 800px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .filme-container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        margin-top: 20px;
      }

      .title-info {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        align-items: center;
      }

      .overview {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
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
