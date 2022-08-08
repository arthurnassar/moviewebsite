<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
#app {
  background: #0d0d0d;
  padding-bottom: 20px;
  overflow-y: scroll;
  height: 100vh;
  NavBar {
    position: static;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
