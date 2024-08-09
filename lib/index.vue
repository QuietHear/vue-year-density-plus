/*
* @Author: aFei
* @Date: 2024-03-21 11:35:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2024-08-09 11:20:29
*/
<template>
  <div class="vue-year-density-plus">
    <div class="top-content">
      <div class="left-box">
        <div :class="[rowIndex % 2 === 0 ? 'hide' : '']" v-for="(row, rowIndex) in allData" :key="rowIndex">
          {{ i18n ? row.en : row.cn }}
        </div>
      </div>
      <div class="right-box">
        <div class="row else">
          <div class="month-item" v-for="(item, index) in monthList" :key="index">
            {{ i18n ? enMonth[item] : cnMonth[item] }}
          </div>
        </div>
        <div class="row" v-for="(row, rowIndex) in allData" :key="rowIndex">
          <div
            :class="['item', line.month ? 'default' : '', data[line.formatDay] > 6 ? 'lv-4' : data[line.formatDay] > 4 ? 'lv-3' : data[line.formatDay] > 2 ? 'lv-2' : data[line.formatDay] > 0 ? 'lv-1' : '']"
            @mouseenter="mouseenter($event, line)" @mouseleave="mouseleave" v-for="(line, lineIndex) in row.list"
            :key="lineIndex" @click="emit('dayClick', line)">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-des">
      <div class="tips">
        <slot name="tip">
          <p class="default-tip">
            {{ i18n ? 'Default tip' : '默认Tip' }}
          </p>
        </slot>
      </div>
      <div class="all-lv">
        {{ i18n ? 'Less' : '少' }}<div class="item default first"></div>
        <div class="item default lv-1"></div>
        <div class="item default lv-2"></div>
        <div class="item default lv-3"></div>
        <div class="item default lv-4"></div>{{ i18n ? 'More' : '多' }}
      </div>
    </div>
    <div class="more-msg" :style="{ left: popX + 5 + 'px', top: popY - 3 + 'px' }" v-if="pop">
      <slot name="default" :date="popMsg">
        {{ data[popMsg.formatDay] > 0 ? (data[popMsg.formatDay] + (i18n ? '' : '次')) : (i18n ? 'No' : '无') }} {{ i18n ?
          'contributions' : '贡献' }} {{
          i18n ? 'on' : '在' }} {{ i18n ?
          enMonthFul[popMsg.month - 1] : cnMonth[popMsg.month - 1] }} {{ i18n ? popMsg.dayEn + '.' : popMsg.day + '号。' }}
      </slot>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["getData", "dayClick"]);
const props = defineProps({
  // 开启国际化
  i18n: {
    type: Boolean,
    default: false,
  },
  // 周首日，1-7
  firstDay: {
    type: Number,
    default: 7,
    validator(value, props) {
      return value >= 1 && value <= 7;
    }
  },
  // 展示时间
  showTime: {
    type: String,
    default: null,
  },
  // 展示数据
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
// 判断是否为闰年
const checkLeapYear = (year) => {
  return year % 4 === 0
    ? year % 100 === 0
      ? year % 400 === 0
        ? true
        : false
      : true
    : false;
};
// 检测某年某月总天数
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
// 月列表
const monthList = ref([]);
const cnMonth = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const enMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const enMonthFul = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// 日列表
const allData = ref([]);
const cnDay = ["一", "二", "三", "四", "五", "六", "日"];
const enDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// 年模式
const yearModel = ref(false);
// 初始化
const init = () => {
  const timeStr = props.showTime || new Date().toGMTString();
  allData.value = [];
  monthList.value = [];
  for (let i = 0; i < 7; i++) {
    // 添加日标识
    const txtIndex = props.firstDay - 1 + i;
    allData.value.push({
      cn: cnDay[txtIndex > 6 ? txtIndex % 7 : txtIndex],
      en: enDay[txtIndex > 6 ? txtIndex % 7 : txtIndex],
      list: []
    });
  }
  // 开始年
  let beginYear = null;
  // 结束年
  let endYear = null;
  // 开始月
  let beginMonth = null;
  // 结束月
  let endMonth = null;
  // 开始日
  let beginDay = null;
  // 结束日
  let endDay = null;
  if (timeStr && timeStr.indexOf('-') === -1 && timeStr.indexOf('GMT') === -1) {
    yearModel.value = true;
    beginYear = parseInt(timeStr);
    beginMonth = 0;
    beginDay = 1;
    emit('getData', `${beginYear}-01-01`, `${beginYear}-12-31`);
  } else {
    yearModel.value = false;
    const end = new Date(timeStr);
    endYear = end.getFullYear();
    endMonth = end.getMonth();
    endDay = end.getDate();
    const now = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    beginYear = now.getFullYear() - 1;
    beginMonth = now.getMonth();
    beginDay = now.getDate();
  }
  // 开始天（周几）
  let beginZhou = new Date(beginYear + '-' + (beginMonth + 1) + '-' + beginDay).getDay();
  beginZhou = beginZhou === 0 ? 7 : beginZhou;
  // 差值
  const differ = beginZhou - props.firstDay;
  // 补值
  const repair = differ < 0 ? (7 + differ) : differ;
  // 间隔
  let space = 0;
  if (repair > 0) {
    // 补空数据
    if (yearModel.value) {
      monthList.value.push(beginMonth);
      for (let num = 0; num < repair; num++, space++) {
        allData.value[space].list.push({
          day: 0
        });
      }
    }
    // 补日期 
    else {
      const now = new Date(new Date(beginYear + '-' + (beginMonth + 1) + '-' + beginDay).getTime() - repair * 24 * 60 * 60 * 1000);
      beginYear = now.getFullYear();
      beginMonth = now.getMonth();
      beginDay = now.getDate();
    }
  }
  // 添加一天
  const addOneDay = (day) => {
    if (space === 0) {
      monthList.value.push(beginMonth);
    } else {
      if (monthList.value[monthList.value.length - 1] !== beginMonth) {
        monthList.value[monthList.value.length - 1] = beginMonth;
      }
    }
    allData.value[space].list.push({
      year: beginYear,
      month: beginMonth + 1,
      day: day + 1,
      dayEn: day + 1 + ((day + 1) === 1 || (day + 1) === 21 || (day + 1) === 31 ? 'st' : (day + 1) === 2 || (day + 1) === 22 ? 'nd' : (day + 1) === 3 || (day + 1) === 23 ? 'rd' : 'th'),
      formatDay: `${beginYear}-${beginMonth + 1 < 10 ? '0' : ''}${beginMonth + 1}-${day + 1 < 10 ? '0' : ''}${day + 1}`
    });
    space++;
    if (space === 7) {
      space = 0;
    }
  };
  if (yearModel.value) {
    for (let month = 0; month < 12; month++, beginMonth++) {
      if (beginMonth > 11) {
        beginMonth = 0;
        beginYear += 1;
      }
      for (let day = 0; day < checkDays(beginYear, beginMonth + 1); day++) {
        addOneDay(day);
      }
    }
  } else {
    emit('getData', `${beginYear}-${(beginMonth + 1) < 10 ? '0' : ''}${beginMonth + 1}-${beginDay < 10 ? '0' : ''}${beginDay}`, `${endYear}-${(endMonth + 1) < 10 ? '0' : ''}${endMonth + 1}-${endDay < 10 ? '0' : ''}${endDay}`);
    for (let month = 0; beginYear !== endYear || beginMonth < (endMonth + 1); month++, beginMonth++) {
      if (beginMonth > 11) {
        beginMonth = 0;
        beginYear += 1;
      }
      for (let day = month === 0 ? (beginDay - 1) : 0; day < (beginYear === endYear && beginMonth === endMonth ? endDay : checkDays(beginYear, beginMonth + 1)); day++) {
        addOneDay(day);
      }
    }
  }
  // 去重
  let checkIndex = 0;
  monthList.value.forEach((item, index) => {
    if (index > 0) {
      if (item === monthList.value[checkIndex]) {
        monthList.value[index] = null;
      } else {
        checkIndex = index;
      }
    }
  });
};
init();
watch(
  () => props.showTime,
  () => {
    init();
  }
);
const pop = ref(false);
const popMsg = ref({});
const popX = ref(0);
const popY = ref(0);
const mouseenter = (e, obj) => {
  if (obj.month) {
    const lin = e.target.getBoundingClientRect();
    popX.value = lin.x;
    popY.value = lin.y;
    popMsg.value = { ...obj };
    pop.value = true;
  }
};
const mouseleave = (e) => {
  pop.value = false;
  popMsg.value = {};
};
</script>
<style lang="scss">
@use "style/index.scss" as *;
</style>