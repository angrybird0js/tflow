

// .env 파일은 node.js가 설치된 최상단에 위치시키고
// process.env.key 로 호출한다.

const dotenv = require("dotenv").config();

const mongoose = require('mongoose')
const USER = process.env.DB_USER
const PWD = process.env.DB_PASS
// const HOST = 'localhost:27017'
const HOST = process.env.DB_HOST
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
// mongoose.set('useFindAndModify', false) // 6.0부터 자동으로 관리 
// mongoose.set('strictQuery', false) // 권장
// mongoose.connect(mongodbURL, { useNewUrlParser: true })
//     .then(() => console.log('접속에 성공함'))
//     .catch((err) => console.error(err))

// const Photo = require('./photo.js')

// module.exports = { mongoose, Photo }



// mongodb 의 함수들을 사용할수 있다.
// async const t await fn 



// <input type="file" id="myFile" />

var file = document.querySelector('#myFile');
var pic_b64;

// 정상 로드시 result에 인코딩 값을 저장하기
var reader = new FileReader(file);
reader.onload = function() {
  pic_b64 = reader.result;
}

// 실패할 경우 에러 출력하기
reader.onerror = function (error) {
   console.log('Error');
};

// 저장 

async function saveDB(pict) {
    const spic = database.collection("save_pic");
    const Pict = {
        content: pict,
    }
    const sav_pic = await Pict.save(); 
    console.log(spic);
    console.log(sav_pic);
    // await .close();

}

async function referDB() {
    const ref_db = database.collection("save_pic");
    const ref_pic = await pict.find(); // $eq 생략, 전부 조회 
    console.log(ref_db);
    console.log(ref_pic);
    // await .close();

}