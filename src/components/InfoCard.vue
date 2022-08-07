<template>
  <div class="app">
    <template v-if="details">
      <div class="card">
        <div class="card-info">
          <p>
            <strong>Orçamento</strong>
          </p>
          <p>{{ returnBudget }}</p>
        </div>
        <div class="card-info">
          <p>
            <strong>Rendimento</strong>
          </p>
          <p>{{ returnRevenue }}</p>
        </div>
        <div class="card-info">
          <p>
            <strong>Título Original</strong>
          </p>
          <p>Thor: Love and Thunder</p>
        </div>
        <div class="card-info">
          <p>
            <strong>Data de Lançamento</strong>
          </p>
          <p>{{ returnLaunchDate }}</p>
        </div>
      </div>
    </template>

    <template v-if="studios && studiosList">
      <div class="card">
        <div class="card-info" v-for="(item, idx) in studiosList" :key="idx">
          <img
            v-if="item.logo_path"
            :style="{
              /* eslint-disable */
              width: `84px`,
              height: '40px',
            }"
            :src="`https://image.tmdb.org/t/p/original${item.logo_path}`"
            :alt="item.name"
          />
          <p v-else>{{ item.name }}</p>
        </div>
      </div>
    </template>
    <!-- v-if="item.logo_path" -->
    <!-- <p v-else class="text-white">{{ item.name }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    budget: Number,
    revenue: Number,
    originalTitle: String,
    launchDate: String,
    studiosList: Array,
    details: Boolean,
    studios: Boolean
  },
  methods: {
    formatToUSD (number) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      })

      return formatter.format(number)
    }
  },
  computed: {
    returnBudget () {
      return this.formatToUSD(this.budget)
    },
    returnRevenue () {
      return this.formatToUSD(this.revenue)
    },
    returnLaunchDate () {
      return this.launchDate.split('-').reverse().join('/')
    }
  }
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
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  row-gap: 20px;

  .card-info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}

@media screen and (min-width: 900px) {
  .card {
    flex-direction: row !important;
    justify-content: space-evenly !important;
    align-items: center !important;

    .card-info {
      row-gap: 12px !important;
    }
  }
}
</style>
