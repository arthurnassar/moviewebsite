<template>
  <div
    class="
      wrapper
      d-flex
      flex-column
      my-4
      justify-content-center
      align-items-center
    "
    v-if="arrayData"
  >
    <div id="chartContainer" class="text-white">
      <div id="div_template"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

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
    chooseRenderedChart () {
      if (this.chartId === 'movie') {
        this.renderMovieChart()
      } else {
        this.renderSeriesChart()
      }
    },
    renderSeriesChart () {
      this.updateWindowWidth()
      this.updateWindowWidth()
      window.addEventListener('resize', this.updateWindowWidth)

      if (this.windowWidth === 'desktop') {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 500)
          .attr('viewBox', [0, 0, 1000, 500])

        const scaleY = d3.scaleLinear().domain([0, 10]).range([465, 35])

        const scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([35, 965])
          .padding(0.2)

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
              ['1??', '2??', '3??', '4??', '5??', '6??', '7??', '8??', '9??', '10??'][i]
          )

        /// ////////////////////////// RENDERIZANDO AS BARRAS //////////////////////////

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(0))
          .attr('height', (d) => 0)
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)
          .transition()
          .delay((d, i) => {
            return i * 50
          })
          .duration(800)
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('y', (d) => scaleY(d.vote_average))

        /// ///////////////////////// RENDERIZANDO AS ESCALAS ///////////////////////

        svg.append('g').attr('transform', 'translate(45, 0)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 465)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)

        /// ///////////////////////// TITULO DAS ESCALAS ////////////////////////////
        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0)
          .attr('x', -465 / 2)
          .attr('fill', 'white')
          .attr('dy', '1em')
          .attr('font-size', '20px')
          .style('text-anchor', 'middle')
          .text('Nota')

        svg
          .append('text')
          .attr('x', 500)
          .attr('y', 499)
          .attr('fill', 'white')
          .attr('font-size', '20px')
          .style('text-anchor', 'middle')
          .text('Posi????o')

        svg.node()
      } else {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 310)
          .attr('height', 200)
          .attr('viewBox', [0, 0, 310, 210])

        const scaleY = d3.scaleLinear().domain([0, 10]).range([170, 20])
        const scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([25, 300])
          .padding(0.2)

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
              ['1??', '2??', '3??', '4??', '5??', '6??', '7??', '8??', '9??', '10??'][i]
          )

        /// ////////////////////////// RENDERIZANDO AS BARRAS //////////////////////////

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(0))
          .attr('height', (d) => 0)
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)
          .transition()
          .delay((d, i) => {
            return i * 50
          })
          .duration(800)
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('y', (d) => scaleY(d.vote_average))

        /// //////////////////////// RENDERIZANDO AS ESCALAS ///////////////////////

        svg.append('g').attr('transform', 'translate(25, 0)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 170)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)

        /// //////////////////////// TITULO DAS ESCALAS //////////////////
        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', -13)
          .attr('x', -180 / 2)
          .attr('fill', 'white')
          .attr('dy', '1em')
          .attr('font-size', '16px')
          .style('text-anchor', 'middle')
          .text('Nota')

        svg
          .append('text')
          .attr('x', 150)
          .attr('y', 205)
          .attr('fill', 'white')
          .attr('font-size', '16px')
          .style('text-anchor', 'middle')
          .text('Posi????o')

        svg.node()
      }
    },
    renderMovieChart () {
      this.updateWindowWidth()
      this.updateWindowWidth()
      window.addEventListener('resize', this.updateWindowWidth)

      if (this.windowWidth === 'desktop') {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 500)
          .attr('viewBox', [0, 0, 1000, 500])
        const scaleY = d3.scaleLinear().domain([0, 10]).range([465, 35])
        const scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([35, 965])
          .padding(0.2)

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
              ['1??', '2??', '3??', '4??', '5??', '6??', '7??', '8??', '9??', '10??'][i]
          )

        /// ////////////////////////// RENDERIZANDO AS BARRAS //////////////////////////

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(0))
          .attr('height', (d) => 0)
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)
          .transition()
          .delay((d, i) => {
            return i * 50
          })
          .duration(800)
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('y', (d) => scaleY(d.vote_average))

        /// //////////////////////// RENDERIZANDO AS ESCALAS ///////////////////////

        svg.append('g').attr('transform', 'translate(45, 0)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 465)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)

        /// //////////////////////// TITULO DAS ESCALAS //////////////////

        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0)
          .attr('x', -465 / 2)
          .attr('fill', 'white')
          .attr('dy', '1em')
          .attr('font-size', '20px')
          .style('text-anchor', 'middle')
          .text('Nota')

        svg
          .append('text')
          .attr('x', 500)
          .attr('y', 499)
          .attr('fill', 'white')
          .attr('font-size', '20px')
          .style('text-anchor', 'middle')
          .text('Posi????o')

        svg.node()
      } else {
        const svg = d3
          .select('#chartContainer')
          .append('svg')
          .attr('width', 310)
          .attr('height', 200)
          .attr('viewBox', [0, 0, 310, 210])

        const scaleY = d3.scaleLinear().domain([0, 10]).range([170, 20])
        const scaleX = d3
          .scaleBand()
          .domain(d3.range(10))
          .range([25, 300])
          .padding(0.2)

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
          Tooltip.html(
            `Nome: ${d.title} <br> Nota: ${d.vote_average} <br> Votos: ${d.vote_count}`
          )
            .style('left', d3.pointer(event)[0] + 'px')
            .style('top', d3.pointer(event)[1] + 100 + 'px')
        }
        const mouseleave = function (d) {
          Tooltip.style('opacity', 0)
          d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

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
              ['1??', '2??', '3??', '4??', '5??', '6??', '7??', '8??', '9??', '10??'][i]
          )

        /// ////////////////////////// RENDERIZANDO AS BARRAS //////////////////////////

        svg
          .append('g')
          .attr('fill', '#FF6B00')
          .selectAll('rect')
          .data(this.arrayData)
          .join('rect')
          .attr('x', (d, i) => scaleX(i))
          .attr('y', (d) => scaleY(0))
          .attr('height', (d) => 0)
          .attr('width', (d) => scaleX.bandwidth())
          .attr('class', 'bars')
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseleave', mouseleave)
          .transition()
          .delay((d, i) => {
            return i * 50
          })
          .duration(800)
          .attr('height', (d) => scaleY(0) - scaleY(d.vote_average))
          .attr('y', (d) => scaleY(d.vote_average))

        /// //////////////////////// RENDERIZANDO AS ESCALAS ///////////////////////

        svg.append('g').attr('transform', 'translate(25, 0)').call(yAxis)

        svg
          .append('g')
          .attr('transform', 'translate(0, 170)')
          .attr('fill', '#FFFFFF')
          .call(xAxis)

        /// //////////////////////// TITULO DAS ESCALAS //////////////////
        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', -13)
          .attr('x', -180 / 2)
          .attr('fill', 'white')
          .attr('dy', '1em')
          .attr('font-size', '16px')
          .style('text-anchor', 'middle')
          .text('Nota')

        svg
          .append('text')
          .attr('x', 150)
          .attr('y', 205)
          .attr('fill', 'white')
          .attr('font-size', '16px')
          .style('text-anchor', 'middle')
          .text('Posi????o')

        svg.node()
      }
    },
    updateWindowWidth () {
      if (window.innerWidth >= 600) {
        this.windowWidth = 'desktop'
      } else {
        this.windowWidth = 'mobile'
      }
    },
    removeSvg () {
      d3.select('#chartContainer').select('svg').remove()
    }
  },
  updated () {
    this.removeSvg()
    this.chooseRenderedChart()
  },
  mounted () {
    this.chooseRenderedChart()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .bars {
    transition: all ease 2s;
  }
  .bars:hover {
    fill: #ff8b39;
  }
}
</style>
