/*
 * @Author: aFei
 * @Date: 2024-03-21 11:35:29
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2024-03-21 13:24:34
*/
import vueYearDensityPlus from "./index.vue";
const arr = [vueYearDensityPlus];
const comment = {
  install(Vue) {
    arr.forEach(item => {
      Vue.component('vueYearDensityPlus', item);
    })
  },
};
// 注入script方式vue中
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}
// 导出为全量
export default comment;