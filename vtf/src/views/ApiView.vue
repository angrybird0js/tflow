<template>
  <div>공공API 코로나데이터</div>
  <button @click="test()">console 환경변수 테스트</button>
  <hr />
  <select name="sel" id="selbox" v-model="local">
    <option value="부산">부산</option>
    <option value="대전">대전</option>
    <option value="대구">대구</option>
    <option value="광주">광주</option>
    <option value="서울">서울</option>
  </select>
  <select name="sel2" id="selbox2" v-model="day">
    <option value="어제">어제</option>
    <option value="오늘">오늘</option>
  </select>
  <button @click="getCorona()">
    {{ day }} {{ local }}지역 코로나데이터 가져오기
  </button>
  <div>{{ corona }}</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      local: '부산',
      day: '어제',
      corona: ''
    }
  },
  methods: {
    getCorona: function () {}
  }
}
</script>

<style></style>
