import { openBlock as t, createElementBlock as n } from "vue";
const s = { class: "" }, c = {
  __name: "index",
  props: {},
  emits: [],
  setup(o, { expose: e, emit: _ }) {
    return e({}), (a, m) => (t(), n("div", s, " 1 "));
  }
}, i = [c], r = {
  install(o) {
    i.forEach((e) => {
      o.component("vueYearDensityPlus", e);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(r);
export {
  r as default
};
