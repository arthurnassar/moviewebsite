import { createStore } from 'vuex'
import axios from 'axios'
import domain from '@/helpers/helpers'
import router from '@/router'

export default createStore({
  state: {
    isAuthenticated: false,
    authType: '',
    requestToken: '',
    sessionId: ''
  },
  getters: {
  },
  mutations: {
    logOut (state) {
      state.isAuthenticated = false
      state.authType = ''
      state.requestToken = ''
      state.sessionId = ''
      localStorage.removeItem('is_authenticated')
      localStorage.removeItem('auth_type')
      localStorage.removeItem('request_token')
      localStorage.removeItem('session_id')
    },
    setRequestToken (_state, token) {
      this.state.requestToken = token
    },
    setGuestSessionId (_state, sessionId) {
      this.state.sessionId = sessionId
      this.state.isAuthenticated = true
      this.state.authType = 'guest'

      if (!localStorage.getItem('session_id')) {
        localStorage.setItem('session_id', sessionId)
      }
      if (!localStorage.getItem('is_authenticated')) {
        localStorage.setItem('is_authenticated', true)
      }
      if (!localStorage.getItem('auth_type')) {
        localStorage.setItem('auth_type', 'guest')
      }
    },
    setLoginSession (_state, sessionId) {
      this.state.sessionId = sessionId
      this.state.isAuthenticated = true
      this.state.authType = 'user'

      if (!localStorage.getItem('session_id')) {
        localStorage.setItem('session_id', sessionId)
      }
      if (!localStorage.getItem('is_authenticated')) {
        localStorage.setItem('is_authenticated', true)
      }
      if (!localStorage.getItem('auth_type')) {
        localStorage.setItem('auth_type', 'user')
      }
    }
  },
  actions: {
    async getRequestToken ({ commit }) {
      await axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91')
        .then(function (response) {
          commit('setRequestToken', response.data.request_token)
          localStorage.setItem('request_token', response.data.request_token)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async createGuest ({ commit }) {
      await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91')
        .then(function (response) {
          commit('setGuestSessionId', response.data.guest_session_id)
        })
        .then(function () {
          router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async logInWithTMDB ({ state, commit }) {
      await axios.post('https://api.themoviedb.org/3/authentication/session/new?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91', {
        request_token: state.requestToken
      })
        .then(function (response) {
          commit('setLoginSession', response.data.session_id)
        })
        .catch(function (_error) {
          window.location.href = `https://www.themoviedb.org/authenticate/${state.requestToken}?redirect_to=${domain}`
        })
    }
  },
  modules: {
  }
})
