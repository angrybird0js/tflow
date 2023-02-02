
// 파일 업로드 아직 구현안함, vue.js 이식 아직 안함
// tesnorflow, mobilenet은 위에 포함

// .env 파일은 node.js가 설치된 최상단에 위치시키고
// process.env.key 로 호출한다.

const dotenv = require("dotenv").config();

const mongoose = require('mongoose')
const USER = process.env.DB_USER
const PWD = process.env.DB_PASS
// const HOST = 'localhost:27017'
const HOST = process.env.DB_HOST
const DB = 'imgsensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
mongoose.set('useFindAndModify', false) // 6.0부터 자동으로 관리 
// mongoose.set('strictQuery', false) // 권장

// button.textContent = "Extract Tensor"
// const pick = document.getElementById('pick');


////////////////////////////////////////
// upload 구현, img 표시 

////////////////////////////////////////////////////////////////////////
// image 인식


// tensorflow.js 가져와야 동작함
const ts = require('@tensorflow/tfjs')
const mobinet = require('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0')


// vue로 이동함
// const prediction = async () => {
//     // webcam 
//     const mnet = await mobilenet.load();
//     const result = await mnet.classify(img);

//     img.print();
//     tf.dispose(img);
//     // cam.stop();

//     return [ result[0].className, result[0].probability ]
    
//     // rslt.innerHTML = "추측 : " + result[0].className + "확률 : " + result[0].probability;

// };

// prediction(); // vue 에서는 created, 또는 mounted

// button.addEventListener('click', () => { prediction(); });


/////////////////////////////////////////////////////////
// base64 변환

// 올린 파일을 대상으로 지정.
// 예측은 img, 저장은 input file
// var file = document.querySelector('#upFile');
// var pic_b64;

// // 정상 로드시 result에 인코딩 값을 저장하기
// var reader = new FileReader(file);
// reader.onload = function() {
//   pic_b64 = reader.result;
// }

// // 실패할 경우 에러 출력하기
// reader.onerror = function (error) {
//    console.log('Error');
// };

//////////////////////////////////////////////////////////////////////////////
// 저장 
export const dbapi = {
    savedb: async function saveDB(pict) {
        const spic = database.collection("save_pic");
        const Pict = { // 객체, 스키마
            content: pict,
        }
        const sav_pic = await Pict.save(); // 올라감
        console.log(spic);
        console.log(sav_pic);
        // await .close();
    
    },
    referdb: async function referDB() {
        const ref_db = database.collection("save_pic");
        const ref_pic = await pict.find();
        console.log(ref_db);
        console.log(ref_pic);
        // await .close();
    
    }
}



