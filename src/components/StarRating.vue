<template>
  <div v-if="!rateStars" class="star-container">
    <span id="1" class="fa fa-star rate"></span>
    <span id="2" class="fa fa-star rate"></span>
    <span id="3" class="fa fa-star rate"></span>
    <span id="4" class="fa fa-star rate"></span>
    <span id="5" class="fa fa-star rate"></span>
    <span id="5" class="fa fa-star rate"></span>
    <span id="5" class="fa fa-star rate"></span>
    <span id="5" class="fa fa-star rate"></span>
    <span id="5" class="fa fa-star rate"></span>
    <span id="5" class="fa fa-star rate"></span>
    <p>{{ voteAverage.toFixed(1) }}</p>
    <p v-if="runTime">
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.8228 8.5004C15.8228 12.545 12.5445 15.8233 8.49986 15.8233C4.45523 15.8233 1.17694 12.545 1.17694 8.5004C1.17694 4.45577 4.45523 1.17748 8.49986 1.17748C12.5445 1.17748 15.8228 4.45577 15.8228 8.5004Z"
          stroke="#FDFDFD"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.2165 10.8298L8.23196 9.04934V5.21214"
          stroke="#FDFDFD"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {{ getRunTime }}
    </p>
  </div>
  <div v-else class="vote-container">
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="1"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="2"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="3"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="4"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="5"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="6"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="7"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="8"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="9"
      class="fa fa-star vote"
    ></span>
    <span
      @click="sendVote"
      @mousemove="handleMouseOver($event)"
      id="10"
      class="fa fa-star vote"
    ></span>
    <!-- <p>{{ voteAverage.toFixed(1) }}</p> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StarRating',
  data () {
    return {
      voteRate: 0,
      voteClicked: false
    }
  },
  props: {
    voteAverage: Number,
    runTime: Number,
    rateStars: Boolean
  },
  watch: {
    voteAverage () {
      this.fillStars()
    }
  },
  methods: {
    sendVote () {
      if (!this.voteClicked) {
        this.voteClicked = true
        const id = this.$route.params.id
        let idType = localStorage.getItem('idType')
        if (this.$route.params.type) {
          idType = this.$route.params.type
        }
        const value = {
          value: this.voteRate
        }
        const typeOfUser = this.$store.state.authType
        const sessionId = this.$store.state.sessionId
        const guestVote = `https://api.themoviedb.org/3/${idType}/${id}/rating?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&guest_session_id=${sessionId}`
        const userVote = `https://api.themoviedb.org/3/${idType}/${id}/rating?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&session_id=${sessionId}`

        if (typeOfUser === 'guest') {
          axios
            .post(guestVote, value)
            .then((response) => {
              if (response.data.success) {
                this.fillStars()
                alert('Seu voto foi enviado ou atualizado com sucesso')
              }
            })
            .catch((e) => console.log(e))
        } else {
          axios
            .post(userVote, value)
            .then((response) => {
              if (response.data.success) {
                alert('Seu voto foi enviado ou atualizado com sucesso')
              }
            })
            .catch((e) => console.log(e))
        }
      }
    },
    emptyStars () {
      const stars = document.querySelectorAll('.rate')
      stars.forEach((item) => {
        item.classList.remove('half')
        item.classList.remove('full')
        item.classList.remove('none')
      })
    },
    fillStars () {
      this.emptyStars()
      let rating = this.voteAverage
      const stars = document.querySelectorAll('.rate')
      stars.forEach((item) => {
        if (rating >= 1) {
          item.classList.add('full')
        } else if (rating > 0 && rating < 1) {
          item.classList.add('half')
        } else {
          item.classList.add('none')
        }
        rating--
      })
    },
    fillVoteStars (voteRate, lastVoteRate) {
      if (voteRate < lastVoteRate) {
        this.emptyStars()
      }
      const stars = document.querySelectorAll('.vote')
      stars.forEach((item) => {
        if (voteRate >= 1) {
          item.classList.remove('half')
          item.classList.remove('full')
          item.classList.remove('none')
          item.classList.add('full')
        } else if (voteRate > 0 && voteRate < 1) {
          item.classList.remove('half')
          item.classList.remove('full')
          item.classList.remove('none')
          item.classList.add('half')
        } else {
          item.classList.remove('half')
          item.classList.remove('full')
          item.classList.remove('none')
          item.classList.add('none')
        }
        voteRate--
      })
    },
    handleMouseOver (event) {
      const mouseCurrentPosition = event.offsetX
      const starId = event.target.id
      if (mouseCurrentPosition <= 7) {
        const valorMouse = 0.5
        const lastVoteRate = this.voteRate
        const voteRate = starId - 1 + valorMouse
        this.voteRate = voteRate
        if (!this.voteClicked) {
          this.fillVoteStars(voteRate, lastVoteRate)
        }
      } else {
        const valorMouse = 1
        const lastVoteRate = this.voteRate
        const voteRate = starId - 1 + valorMouse
        this.voteRate = voteRate
        if (!this.voteClicked) {
          this.fillVoteStars(voteRate, lastVoteRate)
        }
      }
    }
  },
  computed: {
    getRunTime () {
      const hours = this.runTime / 60
      return `${Math.floor(hours)}h ${this.runTime % 60}m`
    }
  },

  mounted () {
    this.fillStars()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.star-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;

  .fa-star.rate.full {
    text-shadow: 0px 3px 12px #ff6b00;

    background: #ff6b00;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .fa-star.rate.half {
    text-shadow: 0px 3px 12px #ff6b00;

    background: linear-gradient(
      90deg,
      rgba(255, 107, 0, 1) 50%,
      rgba(255, 255, 255, 0) 50%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .fa-star.rate.none {
    display: none;
  }

  p {
    margin-left: 5px;
  }
}

.vote-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;

  .fa-star.vote.full {
    text-shadow: 0px 3px 12px #ff6b00;

    background: #ff6b00;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .fa-star.vote.half {
    text-shadow: 0px 3px 12px #ff6b00;

    background: linear-gradient(
      90deg,
      rgba(255, 107, 0, 1) 52%,
      rgb(255, 255, 255) 47%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin-left: 5px;
  }
}
</style>
