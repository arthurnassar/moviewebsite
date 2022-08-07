<template>
  <div class="home">
    <input id="email" type="text" v-model="email" />
    <input id="password" type="password" v-model="password" />
    <button :disabled="!email && password" @click="authenticateUser">
      Login
    </button>
    <button @click="logInAsGuest">Log in as guest</button>
    <button @click="logInWithTMDB">Log in with TMDB</button>
    <button @click="refreshToken">Token Inválido?</button>
  </div>
</template>

<script>
// import router from '@/router'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    refreshToken () {
      localStorage.clear()
      this.$router.go()
    },
    authenticateUser () {
      // if (this.email && this.password) {
      //   this.$router.push({ path: '/' })
      // }
    },
    logInAsGuest () {
      this.$store.dispatch('createGuest')
    },
    logInWithTMDB () {
      this.$store.dispatch('logInWithTMDB')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
