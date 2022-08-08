<template>
  <div class="comentarios-container">
    <div v-for="comentario in comentarios" :key="comentario.id" class="card">
      <!-- <img
        :src="comentario.author_details.avatar_path.splice(1)"
        alt="avatar"
      /> -->
      <div class="d-flex flex-column">
        <p>
          <strong>Usuario {{ comentario.author }} comentou:</strong>
        </p>
        <p>{{ comentario.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    comentarios: Array
  },
  components: {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  background: #5a595981;
  width: 100%;
  max-width: 901px;
  margin: 10px auto;
  border: none;
  box-shadow: inset 0px 0px 28px 2px rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  padding: 30px 10px;
  color: white;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  row-gap: 20px;
}
</style>
