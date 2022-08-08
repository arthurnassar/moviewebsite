<template>
  <section>
    <div v-if="movies" class="genre">
      <template v-if="movies.length > 0">
        <h2 class="genre-name">{{ genreName }}</h2>
        <div class="underscore"></div>
      </template>
    </div>
    <div v-else-if="crew" class="genre">
      <template v-if="crew.length > 0">
        <h2 class="genre-name">{{ genreName }}</h2>
        <div class="underscore"></div>
      </template>
    </div>
    <div id="wrapper">
      <div
        id="inner"
        @mousedown="slide($event)"
        @touchstart="slideMobile($event)"
      >
        <template v-if="movies && !topRated">
          <MovieCards
            :isLoading="isLoading"
            v-for="movie in renderedMovies"
            :key="movie.id"
            :poster="movie.poster_path"
            :movieName="movie.title"
            @mousedown="selectedMovie = movie"
          ></MovieCards>
        </template>
        <template v-if="movies && topRated">
          <MovieCards
            :isLoading="isLoading"
            v-for="movie in movies"
            :key="movie.id"
            :poster="movie.poster_path"
            :movieName="movie.title"
            @mousedown="selectedMovie = movie"
          ></MovieCards>
        </template>
        <template v-else-if="crew">
          <MovieCards
            :isLoading="isLoading"
            v-for="member in crew"
            :key="member.id"
            :poster="member.profile_path"
            :castCharacter="member.character"
            :castName="member.name"
            :castDepartment="member.known_for_department"
          ></MovieCards>
        </template>
      </div>
      <div class="fadeEffect"></div>
    </div>
  </section>
</template>

<script>
import MovieCards from '@/components/MovieCards.vue'
export default {
  props: {
    movies: Array,
    genreName: String,
    crew: Array,
    isLoading: Boolean,
    topRated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedMovie: null,
      sliderPosition: undefined,
      renderedMovies: [],
      counter: 8
    }
  },
  components: {
    MovieCards
  },
  methods: {
    slide (event) {
      const innerSlider = event.currentTarget
      const wrapperSlider = event.currentTarget.parentNode
      if (!innerSlider.style.right) {
        innerSlider.style.right = '0px'
      }
      const firstClick = event.clientX
      const innerSliderInitialPosition =
        event.clientX + parseInt(innerSlider.style.right.split('px')[0])
      window.onmouseup = (e) => {
        if (firstClick === e.clientX) {
          this.$emit('filmeSelecionado', this.selectedMovie)
        }
        if (innerSlider.offsetLeft > 52) {
          innerSlider.classList.add('smooth')
          innerSlider.style.right = '0px'
          setTimeout(() => {
            innerSlider.classList.remove('smooth')
          }, 1000)
        }
        if (
          innerSlider.offsetLeft <
          wrapperSlider.offsetWidth - innerSlider.offsetWidth - 52
        ) {
          this.loadMovies()
          innerSlider.classList.add('smooth')
          innerSlider.style.right = `${
            innerSlider.offsetWidth - wrapperSlider.offsetWidth
          }px`
          setTimeout(() => {
            innerSlider.classList.remove('smooth')
          }, 1000)
        }
        window.onmousemove = () => {}
      }
      window.onmousemove = (e) => {
        if (
          innerSlider.offsetLeft < 52 &&
          Math.abs(innerSlider.offsetLeft) <
            innerSlider.offsetWidth - wrapperSlider.offsetWidth + 52
        ) {
          const innerSliderDiff = innerSliderInitialPosition - e.clientX
          innerSlider.style.right = `${innerSliderDiff}px`
        }
      }
    },
    slideMobile (event) {
      const innerSlider = event.currentTarget
      const wrapperSlider = event.currentTarget.parentNode
      if (!innerSlider.style.right) {
        innerSlider.style.right = '0px'
      }
      const innerSliderInitialPosition = parseInt(
        innerSlider.style.right.split('px')[0]
      )

      const touches = []
      event.currentTarget.addEventListener('touchmove', (e) => {
        touches.push(e.touches[0].clientX)
        const innerSliderInitialPositionMobile = touches[0]
        const lastPosition = touches[touches.length - 1]
        const innerSliderDiff =
          innerSliderInitialPosition +
          (innerSliderInitialPositionMobile - lastPosition)
        innerSlider.style.right = `${innerSliderDiff}px`
      })
      event.currentTarget.addEventListener('touchend', (e) => {
        if (innerSlider.offsetLeft > 28) {
          innerSlider.classList.add('smooth')
          innerSlider.style.right = '0px'
          setTimeout(() => {
            innerSlider.classList.remove('smooth')
          }, 1000)
        }
        if (
          innerSlider.offsetLeft <
          wrapperSlider.offsetWidth - innerSlider.offsetWidth - 52
        ) {
          innerSlider.classList.add('smooth')
          innerSlider.style.right = `${
            innerSlider.offsetWidth - wrapperSlider.offsetWidth
          }px`
          setTimeout(() => {
            innerSlider.classList.remove('smooth')
          }, 1000)
        }
      })
    },
    loadMovies () {
      const temp = []
      for (let i = 0; i < this.counter; i++) {
        temp.push(this.movies[i])
      }
      this.renderedMovies = temp
      if (this.counter < 16) {
        this.counter += 8
      } else if (this.counter >= 6 && this.counter < 20) {
        const addNum = 20 - this.counter
        this.counter += addNum
      }
    }
  },
  mounted () {
    this.loadMovies()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .genre {
    &-name {
      color: white;
    }
    .underscore {
      height: 1px;
      margin: 0;
      padding: 0;
      width: min(50%, 40px);
      margin-top: 5px;
      border-top: 3px solid #ff6b00;
    }
  }
  #wrapper {
    position: relative;
    overflow: hidden !important;
    border-radius: 15px;
    width: 100% !important;
    max-width: 1800px !important;

    #inner {
      width: fit-content;
      display: flex;
      flex-direction: row;
      gap: 20px;
      position: relative;

      &.smooth {
        transition: all ease 1s;
      }

      .fadeEffect {
        pointer-events: none;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(9, 9, 121, 0) 50%,
          rgba(0, 0, 0, 0.6) 70%,
          rgba(0, 0, 0, 0.9) 90%
        );
        width: 300px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
