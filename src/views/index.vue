/*
* @Author: aFei
* @Date: 2024-03-21 11:35:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2024-03-26 15:03:45
*/
<template>
  <div class="demo">
    <el-scrollbar>
      <div class="box">
        <div class="left">
          <vueYearDensityPlus :i18n="i18n" :showTime="time" :data="commitData" @getData="getData"
            @dayClick="dayClick" />
        </div>
        <div class="right">
          <el-button @click="i18n = !i18n">切换语言</el-button>
          <div>
            <p>年</p>
            <el-date-picker v-model="year" type="year" placeholder="请选择" @change="yearChange" value-format="YYYY" />
          </div>
          <div>
            <p>年月日</p>
            <el-date-picker v-model="day" placeholder="请选择" @change="dayChange" value-format="YYYY-M-D" />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import vueYearDensityPlus from "~/lib/index.vue";
const time = ref(null);
const i18n = ref(false);
const year = ref(null);
const yearChange = () => {
  if (year.value) {
    day.value = null;
    time.value = year.value;
  } else {
    time.value = null;
  }
};
const day = ref(null);
const dayChange = () => {
  if (day.value) {
    year.value = null;
    time.value = day.value;
  } else {
    time.value = null;
  }
};
const checkLeapYear = (year) => {
  return year % 4 === 0
    ? year % 100 === 0
      ? year % 400 === 0
        ? true
        : false
      : true
    : false;
};
const checkDays = (year, month) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 2:
      return checkLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
  }
};
let commitData = ref({});
const getData = (start, end) => {
  const startArr = start.split('-');
  const endArr = end.split('-');
  let startYear = parseInt(startArr[0]);
  let startMonth = parseInt(startArr[1]);
  let startDay = parseInt(startArr[2]);
  let endYear = parseInt(endArr[0]);
  let endMonth = parseInt(endArr[1]);
  let endDay = parseInt(endArr[2]);
  let obj = {};
  for (let i = 0; startYear !== endYear || startMonth < (endMonth + 1); i++, startMonth++) {
    if (startMonth > 12) {
      startMonth = 1;
      startYear += 1;
    }
    for (let y = (i === 0 ? (startDay - 1) : 0); y < (startYear === endYear && startMonth === endMonth ? endDay : checkDays(startYear, startMonth)); y++) {
      obj[`${startYear}-${startMonth < 10 ? '0' : ''}${startMonth}-${(y + 1) < 10 ? '0' : ''}${y + 1}`] = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 10);
    }
  }
  commitData.value = obj;
};
const dayClick = (obj) => {
  console.log(obj, 'obj');
};
</script>