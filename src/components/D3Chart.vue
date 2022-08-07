<template>
  <div
    class="wrapper d-flex justify-content-center align-items-center"
    v-if="arrayData"
  >
    <div id="chartContainer" class="text-white">
      <div id="div_template"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

// import { range } from 'd3'
// import { max } from 'd3-array'

export default {
  name: 'D3Chart',
  data () {
    return {
      windowWidth: '',
      tooltipPosition: 380
    }
  },
  props: {
    arrayData: Array,
    width: Number,
    heigth: Number,
    chartId: String
  },
  computed: {},
  methods: {
    renderSeriesChart () {
      this.updateWindowWidth()
      this.updateWindowWidth()
      window.addEventListener('resize', this.updateWindowWidth)

      let scaleY
      let scaleX

      if (this.windowWidth === 'desktop') {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 500)
          .attr('viewBox', [0, 0, 1000, 500])
        scaleY = d3.scaleLinear().domain([0, 10]).range([475, 25])
        scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([25, 975])
          .padding(0.2)

        console.log(scaleX(0))

        const Tooltip = d3
          .select('#div_template')
          .append('div')
          .style('opacity', 0)
          .attr('class', 'tooltip')
          .style('background-color', 'white')
          .style('color', 'black')
          .style('border', 'none')
          .style('border-radius', '5px')
          .style('padding', '5px')

        const mouseover = function (d) {
          Tooltip.style('opacity', 1)
          d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        const mousemove = function (event, d) {
          console.log()
          Tooltip.html(
            `Nome: ${d.name} <br> Nota: ${d.vote_average} <br> Votos: ${d.vote_count}`
          )
            .style('left', d3.pointer(event)[0] + window.innerWidth / 7 + 'px')
            .style('top', d3.pointer(event)[1] + 100 + 'px')
        }
        const mouseleave = function (d) {
          Tooltip.style('opacity', 0)
          d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(d.vote_average))
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)

        const yAxis = d3
          .axisLeft()
          .scale(scaleY)
          .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          .tickFormat((d, i) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][i])

        const xAxis = d3
          .axisBottom(scaleX)
          .ticks(10)
          .tickFormat(
            (d, i) =>
              ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'][i]
          )

        svg.append('g').attr('transform', 'translate(25, 10)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 475)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)
        svg.node()
      } else {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 310)
          .attr('height', 210)
          .attr('viewBox', [0, 0, 310, 210])
        scaleY = d3.scaleLinear().domain([0, 10]).range([190, 10])
        scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([10, 290])
          .padding(0.2)

        console.log(scaleX(0))

        const Tooltip = d3
          .select('#div_template')
          .append('div')
          .style('opacity', 0)
          .attr('class', 'tooltip')
          .style('background-color', 'white')
          .style('color', 'black')
          .style('border', 'none')
          .style('border-radius', '5px')
          .style('padding', '5px')

        const mouseover = function (d) {
          Tooltip.style('opacity', 1)
          d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        const mousemove = function (event, d) {
          console.log(d)
          Tooltip.html(
            `Nome: ${d.name} <br> Nota: ${d.vote_average} <br> Votos: ${d.vote_count}`
          )
            .style('left', d3.pointer(event)[0] + 'px')
            .style('top', d3.pointer(event)[1] + 'px')
        }
        const mouseleave = function (d) {
          Tooltip.style('opacity', 0)
          d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(d.vote_average))
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)

        const yAxis = d3
          .axisLeft()
          .scale(scaleY)
          .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          .tickFormat((d, i) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][i])

        const xAxis = d3
          .axisBottom(scaleX)
          .ticks(10)
          .tickFormat(
            (d, i) =>
              ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'][i]
          )

        svg.append('g').attr('transform', 'translate(10, 10)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 190)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)
        svg.node()
      }
    },
    renderMovieChart () {
      this.updateWindowWidth()
      this.updateWindowWidth()
      window.addEventListener('resize', this.updateWindowWidth)

      let scaleY
      let scaleX

      if (this.windowWidth === 'desktop') {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 500)
          .attr('viewBox', [0, 0, 1000, 500])
        scaleY = d3.scaleLinear().domain([0, 10]).range([475, 25])
        scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([25, 975])
          .padding(0.2)

        console.log(scaleX(0))

        const Tooltip = d3
          .select('#div_template')
          .append('div')
          .style('opacity', 0)
          .attr('class', 'tooltip')
          .style('background-color', 'white')
          .style('color', 'black')
          .style('border', 'none')
          .style('border-radius', '5px')
          .style('padding', '5px')

        const mouseover = function (d) {
          Tooltip.style('opacity', 1)
          d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        const mousemove = function (event, d) {
          console.log(d)
          Tooltip.html(
            `Nome: ${d.title} <br> Nota: ${d.vote_average} <br> Votos: ${d.vote_count}`
          )
            .style('left', d3.pointer(event)[0] + window.innerWidth / 7 + 'px')
            .style('top', d3.pointer(event)[1] + 100 + 'px')
        }
        const mouseleave = function (d) {
          Tooltip.style('opacity', 0)
          d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(d.vote_average))
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)

        const yAxis = d3
          .axisLeft()
          .scale(scaleY)
          .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          .tickFormat((d, i) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][i])

        const xAxis = d3
          .axisBottom(scaleX)
          .ticks(10)
          .tickFormat(
            (d, i) =>
              ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'][i]
          )

        svg.append('g').attr('transform', 'translate(25, 10)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 475)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)
        svg.node()
      } else {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 310)
          .attr('height', 210)
          .attr('viewBox', [0, 0, 310, 210])
        scaleY = d3.scaleLinear().domain([0, 10]).range([190, 10])
        scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([10, 290])
          .padding(0.2)

        console.log(scaleX(0))

        const Tooltip = d3
          .select('#div_template')
          .append('div')
          .style('opacity', 0)
          .attr('class', 'tooltip')
          .style('background-color', 'white')
          .style('color', 'black')
          .style('border', 'none')
          .style('border-radius', '5px')
          .style('padding', '5px')

        const mouseover = function (d) {
          Tooltip.style('opacity', 1)
          d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        const mousemove = function (event, d) {
          console.log(d)
          Tooltip.html(
            `Nome: ${d.title} <br> Nota: ${d.vote_average} <br> Votos: ${d.vote_count}`
          )
            .style('left', d3.pointer(event)[0] + 'px')
            .style('top', d3.pointer(event)[1] + 'px')
        }
        const mouseleave = function (d) {
          Tooltip.style('opacity', 0)
          d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(d.vote_average))
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)

        const yAxis = d3
          .axisLeft()
          .scale(scaleY)
          .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          .tickFormat((d, i) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][i])

        const xAxis = d3
          .axisBottom(scaleX)
          .ticks(10)
          .tickFormat(
            (d, i) =>
              ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'][i]
          )

        svg.append('g').attr('transform', 'translate(10, 10)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 190)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)
        svg.node()
      }
    },
    onMouseOut (event) {
      console.log(event.target)
    },
    onMouseOver (event) {
      console.log(event.target)
    },
    updateWindowWidth () {
      if (window.innerWidth >= 600) {
        this.windowWidth = 'desktop'
      } else {
        this.windowWidth = 'mobile'
      }
    }
  },
  updated () {
    d3.select('#chartContainer').select('svg').remove()

    if (this.chartId === 'movie') {
      this.renderMovieChart()
    } else {
      this.renderSeriesChart()
    }
  },
  mounted () {
    if (this.chartId === 'movie') {
      this.renderMovieChart()
    } else {
      this.renderSeriesChart()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .bars:hover {
    fill: #ff8b39;
  }
}
</style>
