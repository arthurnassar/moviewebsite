<template>
  <section>
    <div class="genre w-25">
      <h2 class="genre-name">{{ genreName }}</h2>
      <div class="underscore"></div>
    </div>
    <div id="wrapper">
      <div
        id="inner"
        @mousedown="slide($event)"
        @touchstart="slideMobile($event)"
      >
        <template v-if="movies">
          <MovieCards
            v-for="movie in movies"
            :key="movie.id"
            :poster="movie.poster_path"
            :movieName="movie.title"
            @mousedown="selectedMovie = movie"
          ></MovieCards>
        </template>
        <template v-else>
          <MovieCards
            class="loading"
            v-for="number in 10"
            :key="number"
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
    genreName: String
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
        console.log(innerSliderDiff)
        console.log(parseInt(innerSlider.style.right.split('px')[0]))
        console.log(innerSliderInitialPositionMobile - lastPosition)
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
    }
  },
  data () {
    return {
      selectedMovie: null,
      sliderPosition: undefined
    }
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
      width: min(50%, 40px);
      margin-top: 5px;
      border-top: 3px solid #ff6b00;
    }
  }
  #wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 15px;

    #inner {
      width: fit-content;
      display: flex;
      flex-direction: row;
      gap: 20px;
      position: relative;

      &.smooth {
        transition: all ease 1s;
      }

      MovieCards {
        &.loading {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        &.loading:after {
          content: " ";
          display: block;
          border-radius: 50%;
          width: 0;
          height: 0;
          margin: 8px;
          box-sizing: border-box;
          border: 32px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-hourglass 1.2s infinite;
        }
        @keyframes lds-hourglass {
          0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }
          50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          100% {
            transform: rotate(1800deg);
          }
        }
      }
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
</style>
