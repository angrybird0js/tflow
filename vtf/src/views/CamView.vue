<template>
  <div>
    <div id="display"></div>
    <button @click="main()">스샷 분석</button>
    <button @click="alog()">디버거</button>
    <div>{{ result }}</div>
    <div>{{ trans }}</div>
  </div>
</template>

<script>
// import * as tf from '@tensorflow/tfjs'
// import * as mobilenet from '@tensorflow-models/mobilenet'
import tf from '@tensorflow/tfjs'
// import mobilenet from '@tensorflow-models/mobilenet'
import mobilenet from 'mobilenet'

const VideoElement = document.createElement('video') // 캠 태그 생성
export default {
  name: 'app',
  data() {
    return {
      result: '스샷을 찍어 이미지를 분석을 시작하시오.',
      trans: ''
    }
  },
  methods: {
    alog: function () {
      console.log(tf)
    },
    main: async function () {
      this.result = '이미지 분석중...'
      this.trans = '번역중...'
      const display = document.getElementById('display')
      display.appendChild(VideoElement) // 캠태그 부착
      VideoElement.width = 400 // 캠 사이즈 조절
      VideoElement.height = 400
      const cam = await tf.data.webcam(VideoElement)
      const net = await mobilenet.load() // 위아래 바꾸면 동작 안함
      const img = await cam.capture()
      const cresult = await net.classify(img)
      img.print()
      tf.dispose(img)
      this.result =
        '분석결과:' +
        cresult[0].className +
        '(' +
        (cresult[0].probability * 100).toFixed(2) +
        '%)'
    }
  }
}
</script>

<style></style>
