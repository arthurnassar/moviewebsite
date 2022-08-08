<template>
  <section>
    <div class="genre my-5">
      <h2 class="genre-name">Avaliações</h2>
      <div class="underscore"></div>

      <div class="d-flex flex-column align-items-center mb-5">
        <p>Dê sua avaliação</p>
        <StarRating :rateStars="true"></StarRating>
      </div>
      <AvaliacaoCard :comentarios="reviews"></AvaliacaoCard>
    </div>
  </section>
</template>

<script>
import AvaliacaoCard from '@/components/AvalicaoCard.vue'
import StarRating from '@/components/StarRating.vue'

export default {
  data () {
    return {}
  },
  props: {
    reviews: Array
  },
  components: {
    AvaliacaoCard,
    StarRating
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.underscore {
  height: 1px;
  margin: 0;
  padding: 0;
  width: min(50%, 40px);
  margin-top: 5px;
  border-top: 3px solid #ff6b00;
}
</style>
