/*
 * @Author: aFei
 * @Date: 2024-03-21 11:35:29
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2024-03-21 13:26:17
*/
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/src/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "asset/index.scss";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');