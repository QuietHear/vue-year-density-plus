import { ref as g, watch as j, openBlock as d, createElementBlock as f, createElementVNode as h, Fragment as k, renderList as p, unref as c, normalizeClass as L, toDisplayString as v, renderSlot as z, createTextVNode as Y, normalizeStyle as q, createCommentVNode as H, createStaticVNode as K } from "vue";
const Q = { class: "vue-year-density-plus" }, U = { class: "top-content" }, _ = { class: "left-box" }, ee = { class: "right-box" }, te = { class: "row else" }, ae = ["onMouseenter", "onClick"], ne = { class: "bottom-des" }, le = { class: "tips" }, se = { class: "default-tip" }, oe = { class: "all-lv" }, ie = /* @__PURE__ */ K('<div class="item default first"></div><div class="item default lv-1"></div><div class="item default lv-2"></div><div class="item default lv-3"></div><div class="item default lv-4"></div>', 5), ce = {
  __name: "index",
  props: {
    // 开启国际化
    i18n: {
      type: Boolean,
      default: !1
    },
    // 周首日，1-7
    firstDay: {
      type: Number,
      default: 7
    },
    // 展示时间
    showTime: {
      type: String,
      default: null
    },
    // 展示数据
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["getData", "dayClick"],
  setup(l, { emit: x }) {
    const S = x, $ = l, G = (s) => s % 4 === 0 ? s % 100 === 0 ? s % 400 === 0 : !0 : !1, C = (s, a) => {
      switch (a) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
        case 2:
          return G(s) ? 29 : 28;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
      }
    }, u = g([]), E = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], I = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], P = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], M = g([]), R = ["一", "二", "三", "四", "五", "六", "日"], W = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], w = g(!1), J = () => {
      const s = $.showTime || (/* @__PURE__ */ new Date()).toGMTString();
      M.value = [], u.value = [];
      for (let e = 0; e < 7; e++) {
        const n = $.firstDay - 1 + e;
        M.value.push({
          cn: R[n > 6 ? n % 7 : n],
          en: W[n > 6 ? n % 7 : n],
          list: []
        });
      }
      let a = null, o = null, t = null, i = null, r = null, y = null;
      if (s && s.indexOf("-") === -1 && s.indexOf("GMT") === -1)
        w.value = !0, a = parseInt(s), t = 0, r = 1, S("getData", `${a}-01-01`, `${a}-12-31`);
      else {
        w.value = !1;
        const e = new Date(s);
        o = e.getFullYear(), i = e.getMonth(), y = e.getDate();
        const n = new Date(e.getTime() + 24 * 60 * 60 * 1e3);
        a = n.getFullYear() - 1, t = n.getMonth(), r = n.getDate();
      }
      let b = (/* @__PURE__ */ new Date(a + "-" + (t + 1) + "-" + r)).getDay();
      b = b === 0 ? 7 : b;
      const F = b - $.firstDay, N = F < 0 ? 7 + F : F;
      let D = 0;
      if (N > 0)
        if (w.value) {
          u.value.push(t);
          for (let e = 0; e < N; e++, D++)
            M.value[D].list.push({
              day: 0
            });
        } else {
          const e = new Date((/* @__PURE__ */ new Date(a + "-" + (t + 1) + "-" + r)).getTime() - N * 24 * 60 * 60 * 1e3);
          a = e.getFullYear(), t = e.getMonth(), r = e.getDate();
        }
      const A = (e) => {
        D === 0 ? u.value.push(t) : u.value[u.value.length - 1] !== t && (u.value[u.value.length - 1] = t), M.value[D].list.push({
          year: a,
          month: t + 1,
          day: e + 1,
          dayEn: e + 1 + (e + 1 === 1 || e + 1 === 21 || e + 1 === 31 ? "st" : e + 1 === 2 || e + 1 === 22 ? "nd" : e + 1 === 3 || e + 1 === 23 ? "rd" : "th"),
          formatDay: `${a}-${t + 1 < 10 ? "0" : ""}${t + 1}-${e + 1 < 10 ? "0" : ""}${e + 1}`
        }), D++, D === 7 && (D = 0);
      };
      if (w.value)
        for (let e = 0; e < 12; e++, t++) {
          t > 11 && (t = 0, a += 1);
          for (let n = 0; n < C(a, t + 1); n++)
            A(n);
        }
      else {
        S("getData", `${a}-${t + 1 < 10 ? "0" : ""}${t + 1}-${r < 10 ? "0" : ""}${r}`, `${o}-${i + 1 < 10 ? "0" : ""}${i + 1}-${y < 10 ? "0" : ""}${y}`);
        for (let e = 0; a !== o || t < i + 1; e++, t++) {
          t > 11 && (t = 0, a += 1);
          for (let n = e === 0 ? r - 1 : 0; n < (a === o && t === i ? y : C(a, t + 1)); n++)
            A(n);
        }
      }
      let B = 0;
      u.value.forEach((e, n) => {
        n > 0 && (e === u.value[B] ? u.value[n] = null : B = n);
      });
    };
    J(), j(
      () => $.showTime,
      () => {
        J();
      }
    );
    const T = g(!1), m = g({}), O = g(0), V = g(0), X = (s, a) => {
      if (a.month) {
        const o = s.target.getBoundingClientRect();
        O.value = o.x, V.value = o.y, m.value = { ...a }, T.value = !0;
      }
    }, Z = (s) => {
      T.value = !1, m.value = {};
    };
    return (s, a) => (d(), f("div", Q, [
      h("div", U, [
        h("div", _, [
          (d(!0), f(k, null, p(c(M), (o, t) => (d(), f("div", {
            class: L([t % 2 === 0 ? "hide" : ""]),
            key: t
          }, v(l.i18n ? o.en : o.cn), 3))), 128))
        ]),
        h("div", ee, [
          h("div", te, [
            (d(!0), f(k, null, p(c(u), (o, t) => (d(), f("div", {
              class: "month-item",
              key: t
            }, v(l.i18n ? I[o] : E[o]), 1))), 128))
          ]),
          (d(!0), f(k, null, p(c(M), (o, t) => (d(), f("div", {
            class: "row",
            key: t
          }, [
            (d(!0), f(k, null, p(o.list, (i, r) => (d(), f("div", {
              class: L(["item", i.month ? "default" : "", l.data[i.formatDay] > 6 ? "lv-4" : l.data[i.formatDay] > 4 ? "lv-3" : l.data[i.formatDay] > 2 ? "lv-2" : l.data[i.formatDay] > 0 ? "lv-1" : ""]),
              onMouseenter: (y) => X(y, i),
              onMouseleave: Z,
              key: r,
              onClick: (y) => S("dayClick", i)
            }, null, 42, ae))), 128))
          ]))), 128))
        ])
      ]),
      h("div", ne, [
        h("div", le, [
          z(s.$slots, "tip", {}, () => [
            h("p", se, v(l.i18n ? "Default tip" : "默认Tip"), 1)
          ])
        ]),
        h("div", oe, [
          Y(v(l.i18n ? "Less" : "少"), 1),
          ie,
          Y(v(l.i18n ? "More" : "多"), 1)
        ])
      ]),
      c(T) ? (d(), f("div", {
        key: 0,
        class: "more-msg",
        style: q({ left: c(O) + 5 + "px", top: c(V) - 3 + "px" })
      }, [
        z(s.$slots, "default", { date: c(m) }, () => [
          Y(v(l.data[c(m).formatDay] > 0 ? l.data[c(m).formatDay] + (l.i18n ? "" : "次") : l.i18n ? "No" : "无") + " " + v(l.i18n ? "contributions" : "贡献") + " " + v(l.i18n ? "on" : "在") + " " + v(l.i18n ? P[c(m).month - 1] : E[c(m).month - 1]) + " " + v(l.i18n ? c(m).dayEn + "." : c(m).day + "号。"), 1)
        ])
      ], 4)) : H("", !0)
    ]));
  }
}, ue = [ce], re = {
  install(l) {
    ue.forEach((x) => {
      l.component("vueYearDensityPlus", x);
    });
  }
};
typeof window < "u" && window.Vue && window.Vue.use(re);
export {
  re as default
};
