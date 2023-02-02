<!-- <template>
  <input type="file" id="imgfile" name="imgfile" />
  <img src="../assets/logo.png" name="img" />

  <button name="predict" @click="prediction">인식처리</button>
  <label>추측: {{ pred }} </label> <label>확률: {{ rate }}</label>

  <button name="savbtn" @click="saveimg()">이미지 저장</button>
</template>

<script>
// import axios from 'axios'
// js 에서 임포트할 경우 해당 파일이 api로 export 해야함

// mobilenet이 인식되지 않으면 텐서플로우 불러들일것.
// import ts from '@tensorflow/tfjs'
import tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js'
import mobinet from 'https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0'
// @tensorflow-models/mobilenet
// import mongoose from 'mongoose'
import { dbapi } from '../component/mobilenet_img.js'

export default {
  data() {
    return {
      pred: '',
      rate: 0.0
    }
  },
  mounted() {
    prediction
  }, // end mounted

  methods: {
    // 버튼 클릭, 표시
    // predicator: function()
    prediction: async () => {
      // webcam
      const mnet = await mobinet.mobilenet.load()
      const result = await mnet.classify(img)

      img.print()
      tf.dispose(img)
      // cam.stop();

      pred = result[0].className
      rate = result[0].probability // 값 반환 대신 templete로 전송함

      // rslt.innerHTML = "추측 : " + result[0].className + "확률 : " + result[0].probability;
    }, // end prediction

    // base64 변환, db 저장,
    // async await
    saveimg: async () => {
      var reader = new FileReader(imgfile) //
      var pic_b64 = reader.result
      await dbapi.savedb(pic_b64) // base64 변환된 img
    }
  }
} // end export
</script> -->
