<template>
  <div class="w-32 h-32 border-2 border-dotted border-blue-500">
    <div v-if="images" class="w-full h-full flex items-center">
      <img :src="images" alt="image" />
    </div>
    <div
      v-else
      class="w-full h-full flex items-center justify-center cursor-pointer hover:bg-pink-100"
      @click="clickInputTag()"
    >
      <input
        ref="image"
        id="input"
        type="file"
        name="image"
        accept="image/*"
        multiple="multiple"
        class="hidden"
        @change="uploadImage()"
      />
      <svg
        class="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    images: ''
  }),
  methods: {
    uploadImage: function () {
      let form = new FormData()
      let image = this.$refs['image'].files[0]

      form.append('image', image)

      axios
        .post('/upload', form, {
          header: { 'Content-Type': 'multipart/form-data' }
        })
        .then(({ data }) => {
          this.images = data
        })
        .catch((err) => console.log(err))
    },
    clickInputTag: function () {
      this.$refs['image'].click()
    }
  }
}
</script>

<script>
import express from 'express'
import multer from 'multer'
let upload = multer({ dest: 'public/uploads/' })

import { uploadToStorage } from './apis/uploadToStorage'

export default (app, http) => {
  // ... 생략 ...

  app.post('/upload', upload.single('image'), (req, res) => {
    uploadToStorage(req.file)
      .then((response) => {
        res.send(response.Location)
      })
      .catch((err) => console.log(err))
  })
}
</script>

<script>
import AWS from 'aws-sdk'
import fs from 'fs'

AWS.config.region = 'ap-northeast-2'

let s3 = new AWS.S3()

async function uploadToStorage(file) {
  let path = file.path
  let name = file.originalname
  let type = file.mimetype
  let image = fs.createReadStream(path)

  let parameters = {
    Bucket: 'my-bucket-name',
    Key: name,
    ACL: 'public-read',
    Body: image,
    ContentType: type
  }

  return await s3
    .upload(parameters, function (err) {
      err ? console.log(err) : false
    })
    .promise()
}

export { uploadToStorage }
</script>
