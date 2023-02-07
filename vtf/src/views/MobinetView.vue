<template>
  <h1>Drag & Drop</h1>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>

      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div class="img_c">
            <img id="preview-img" :src="generateURL(file)" />
            <p>
              {{ file.name }}
            </p>
            <button
              class="ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Remove file"
            >
              <b class="de1"></b>
            </button>
            <div>{{ analysis }}</div>
            <button @click="send()">DB저장</button>
            <button @click="A">분석</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'

export default {
  data() {
    return {
      isDragging: false,
      files: [],
      filesPreview: [],
      uploadImageIndex: 0,
      analysis: '',
      url: '',
      url_data: ''
    }
  },

  methods: {
    /*axios*/
    send: function () {
      axios({
        url: '/mobinet',
        method: 'post', // 전송방식을 post로 지정
        data: { name: this.url }
      }).then((res) => {
        console.log('ok', res)
        alert(res.data.message)
      })
    },

    onChange() {
      this.files = [...this.$refs.file.files]
    },
    dragover(e) {
      e.preventDefault()
      this.isDragging = true
    },
    dragleave() {
      this.isDragging = false
    },
    drop(e) {
      e.preventDefault()
      this.$refs.file.files = e.dataTransfer.files
      this.onChange()
      this.isDragging = false
    },
    generateURL(file) {
      const fileSrc = URL.createObjectURL(file)
      fetch(fileSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader()
          reader.onload = () => {
            const base64data = reader.result
            this.url_data = base64data
            console.log(this.url_data)
          }
          reader.readAsDataURL(blob)
        })
      // setTimeout(() => {
      //   URL.revokeObjectURL(fileSrc);
      // }, 1000);
      // return fileSrc;
    },
    remove(i) {
      this.files.splice(i, 1)
    },

    // 하단에 간단하게 표시되는 결과값
    A() {
      /*mobilenet*/
      mobilenet.load().then((model) => {
        const image = document.getElementById('preview-img')
        // Classify the image.
        model.classify(image).then((predictions) => {
          console.log(predictions)
          this.analysis = `예상 이름 : ${predictions[0].className},
              확률 : ${(predictions[0].probability * 100).toFixed(2)}%`
        })
      })

      /*base64*/
      // fetch(this.url)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     const reader = new FileReader();
      //     reader.onload = () => {
      //       const base64data = reader.result;
      //       this.url_data = base64data;
      //       console.log(this.url_data);
      //     };
      //     reader.readAsDataURL(blob);
      //   });

      //   axios({
      //     url: "/mobinet",
      //     method: "post", // 전송방식을 post로 지정
      //     data: { name: this.url },
      //   }).then((res) => {
      //     console.log("ok", res);
      //     alert(res.data.message);
      //   });
    }
  }
}
</script>

<style>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  margin-bottom: 700px;
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

#preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
