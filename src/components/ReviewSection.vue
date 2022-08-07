<template>
  <section>
    <div class="genre">
      <h2 class="genre-name">Avaliações</h2>
      <div class="underscore"></div>

      <div>
        <p>Dê sua avaliação</p>
        <StarRating :rateStars="true"></StarRating>
      </div>
      <AvaliacaoCard></AvaliacaoCard>
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
  components: {
    AvaliacaoCard,
    StarRating
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
