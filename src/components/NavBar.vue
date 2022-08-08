<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand orange-light" href="/">MOVIER</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <img
          src="https://www.clipartmax.com/png/full/36-365828_navbar-toggle-icon-menu-hamburger-png-white.png"
          alt="hamburguer menu"
          style="width: 30px; heigth: 30px"
        />
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li v-if="!noSearch">
            <form
              @submit.prevent="submitSearchedValue($event)"
              class="form-inline my-2 my-lg-0"
            >
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn my-2 my-sm-0" type="submit">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9008 12.2956L12.2997 12.8967L17.403 18L18.0041 17.3989L12.9008 12.2956Z"
                    stroke="#FDFDFD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.80066 14.6013C11.5566 14.6013 14.6013 11.5566 14.6013 7.80066C14.6013 4.04476 11.5566 1 7.80066 1C4.04476 1 1 4.04476 1 7.80066C1 11.5566 4.04476 14.6013 7.80066 14.6013Z"
                    stroke="#FDFDFD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </form>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/"> Filmes </router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/series"> Séries </router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/status"> Status </router-link>
          </li>
          <li class="nav-item active logout-item">
            <a
              class="btn"
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0041 9.5C5.36733 9.5 1.60413 13.084 1.60413 17.5C1.62093 17.5 18.4041 17.5 18.4041 17.5C18.4041 13.084 14.6409 9.5 10.0041 9.5Z"
                  stroke="#FDFDFD"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0041 9.5C12.3237 9.5 14.2041 7.70914 14.2041 5.5C14.2041 3.29086 12.3237 1.5 10.0041 1.5C7.68454 1.5 5.80414 3.29086 5.80414 5.5C5.80414 7.70914 7.68454 9.5 10.0041 9.5Z"
                  stroke="#FDFDFD"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <div class="collapse" id="collapseExample">
              <button @click="logOut" class="white w-">LOGOUT</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'

export default {
  name: 'NavBar',
  props: {
    noSearch: Boolean,
    idType: String
  },
  data () {
    return {
      searchedMovies: null
    }
  },
  watch: {
    searchedMovies () {
      this.$emit('filmeProcurado', this.searchedMovies)
    }
  },
  methods: {
    submitSearchedValue (event) {
      const searchedValue = event.target.elements[0].value
      const uppercaseLetter = searchedValue.split('').shift().toUpperCase()
      const searchedValueUpperCase =
        uppercaseLetter + searchedValue.split('').splice(1).join('')
      if (searchedValue) {
        if (this.idType === 'tv') {
          const self = this
          axios
            .get(
              `https://api.themoviedb.org/3/search/tv?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&query=${searchedValue}&page=1&include_adult=false`
            )
            .then(function (response) {
              self.searchedMovies = [
                {
                  id: 'searched',
                  name: `${searchedValueUpperCase}`,
                  movies: response.data
                }
              ]
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          const self = this
          axios
            .get(
              `https://api.themoviedb.org/3/search/movie?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&query=${searchedValue}&page=1&include_adult=false`
            )
            .then(function (response) {
              self.searchedMovies = [
                {
                  id: 'searched',
                  name: `${searchedValueUpperCase}`,
                  movies: response.data
                }
              ]
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    },
    logOut () {
      this.$store.commit('logOut')

      router.push('login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}

nav {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background: transparent;
  padding: 30px 0;
  align-items: center;

  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.orange {
    border: none;
    background: #ff6b00;
    box-shadow: 0px 4px 50px #ff6b00;
    border-radius: 10px;
    padding: 10px 20px;
  }
  button.white {
    border: none;
    background: #ffffff;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 10px 20px;
  }

  #navbarSupportedContent {
    width: 10px;
    justify-content: flex-end !important;
    ul {
      margin: 0 !important;
      li {
        form {
          flex-wrap: nowrap;
        }

        #collapseExample {
          position: relative;
        }
      }
    }
  }
  a {
    color: white;

    &.router-link-exact-active {
      font-weight: 700;
    }
  }
}

.navbar-collapse.collapse.show {
  .navbar-nav.mr-auto {
    background: black;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
