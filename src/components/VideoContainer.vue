<template>
  <div id="wrapper">
    <div
      v-if="site == 'YouTube'"
      @click="playAndPauseVideo"
      id="video-container"
    >
      <iframe
        id="youtube"
        width="100%"
        height="100%"
        :src="`https://www.youtube.com/embed/${videoKey}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div
      v-else-if="site === 'Vimeo'"
      @click="playAndPauseVideo"
      id="vimeo-container"
    >
      <iframe
        id="iframe"
        src=""
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MoviesCarousel',
  props: {
    poster: String,
    movieName: String,
    videoKey: String,
    site: String
  },
  watch: {
    site () {
      const self = this
      if (this.site === 'Vimeo') {
        console.log('getting vimeo embed')
        axios
          .get(
            `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${this.videoKey}&width=480&height=360`
          )
          .then(function (response) {
            self.handleVimeoVideo(response.data.html)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  computed: {
    fullPathImage () {
      return `url(https://image.tmdb.org/t/p/original${this.poster})`
    }
  },
  methods: {
    handleVimeoVideo (video) {
      const iframe = document.querySelector('#iframe')
      console.log(video)
      const iframeSeparatedHTML = video.split('"')

      const src = iframeSeparatedHTML[1]

      iframe.src = src
      this.setCardHeight()
    },
    setCardHeight () {
      if (this.site === 'YouTube') {
        const container = document.querySelector('#video-container')
        const wrapper = document.querySelector('#wrapper')
        const containerWidth = container.offsetWidth
        const idealHeight = containerWidth / 1.8
        wrapper.style.height = `${idealHeight}px`
        setTimeout(() => {
          container.style.height = `${idealHeight}px`
        }, 1000)
      } else if (this.site === 'Vimeo') {
        const container = document.querySelector('#vimeo-container')
        const wrapper = document.querySelector('#wrapper')
        const containerWidth = container.offsetWidth
        const idealHeight = containerWidth / 1.8
        wrapper.style.height = `${idealHeight}px`
        setTimeout(() => {
          container.style.height = `${idealHeight}px`
        }, 1000)
      }
    }
  },
  mounted () {
    this.setCardHeight()
  },
  updated () {
    this.setCardHeight()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#video-container {
  margin: 0 auto;
  max-width: 1200px;
  overflow: hidden;
  height: 0.1px;
  width: 100%;
  border-radius: 15px;
  background-color: transparent;
  transition: all ease 2s;

  iframe {
    border-radius: 15px;
  }
}
</style>
