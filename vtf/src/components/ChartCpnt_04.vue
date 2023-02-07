<template>
  <div>ex4 예제</div>
  <button @click="tf1()">히트맵</button>
  <div id="plot1"></div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    tf1: function () {
      const data = {
        values: [
          [1, 0, 0],
          [0, 0.3, 0.7],
          [0, 0.7, 0.3] // heatmap 에 전달되는 값은 ㅈ우첩된 자바스크립트 배열 또는 2D tf.tensor
        ],
        xTickLabels: ['Apple', 'Orange', 'Tangerline'], // xLabel와 다른것 주의, x축에 따라놓인 개별 행의 라벨들
        yTickLabels: ['Apple', 'Orange', 'Tangerline']
      }
      const option = {
        width: 500,
        height: 300,
        xLabel: 'Actual Fruit',
        yLabel: 'Recognized Fruit',
        colorMap: 'blues' // 그외 greyscale , viridis
      }
      this.$tfvis.render.heatmap(document.getElementById('plot1'), data, option)
    }
  }
}
</script>

<style></style>
