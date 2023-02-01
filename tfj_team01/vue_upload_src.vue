<template>
  <div style="padding: 30px">
    <input type="file" accept="image/*" @change="fileChange" />
    <p>upload 이미지 :{{ file.name }} ({{ file.size }}) / {{ file.type }}</p>
  </div>
</template>
<script>
// 이미지가 표시되어야 mobilenet 에서 인식 가능하다.
export default {
  data() {
    return {
      file: ''
    }
  },
  methods: {
    fileChange: function (e) {
      console.log(e.target.files) //files는 배열로 들어온다.
      this.file = e.target.files[0]

      const file = e.target.files
      let validation = true
      let message = ''

      if (file.length > 1) {
        validation = false
        message = `파일은 한개만 등록 가능합니다.`
      }

      if (file[0].size > 1024 * 1024 * 2) {
        message = `${message}, 파일은 용량은 2MB 이하만 가능합니다.`
        validation = false
      }

      if (file[0].type.indexOf('image') < 0) {
        message = `${message}, 이미지 파일만 업로드 가능합니다.`
        validation = false
      }

      if (validation) {
        this.file = file
      } else {
        this.file = ''
        alert(message)
      }
    }
  }
}
</script>
