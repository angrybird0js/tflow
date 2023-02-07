<template>
  <div id="plot2"></div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    tf1: function () {
      const data = [1, 5, 5, 5, 5, 10, -3, -3]
      // const id = document.getElementById()
      this.$tfvis.render.histogram(document.getElementById('plot1'), data, {
        width: 800
      })
      this.$tfvis.render.histogram(document.getElementById('plot2'), data, {
        maxBins: 2,
        width: 400
      })
    }
  }
}
</script>

<style>
canvas {
  width: 60% !important;
  display: inline !important;
}
</style>
