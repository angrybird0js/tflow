const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')
const logger = require('morgan')

const app = express()
app.use(history())

require('dotenv').config()
const port = 3000
const _path = path.join(__dirname, './dist')
console.log(_path)

app.use('/', express.static(_path))
app.use(logger('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Photo = require('./photo.js')
const { url } = require('inspector')

app.use(
  express.json({
    limit: '50mb'
  })
)
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false
  })
)

// 작동하지 않음
// api export 해야할것으로 예상.
app.post('/mobinet', function (req, res) {
  // front 서버에서 post 방식으로 전송받음
  const A = req.body.name
  console.log(A)

  const main = async () => {
    const _data = {
      url: A
    }
    console.log('왔냐')
    console.log(req.body) // post 전송값을 다룰때 body
    console.log('왔냐2')
    const new_photo = new Photo(_data) // 스키마 사용
    const t = await new_photo.save() // db에 저장함
  }

  main()
})

app.listen(port, () => {
  console.log(port + '에서 서버동작 완료.')
})
