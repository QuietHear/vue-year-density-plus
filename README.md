# 年密度组件（vue3版）
***vue3版本***

## 预览
	clone项目后npm run preview即可

## 安装
	npm i vue-year-density-plus

## 使用
	import vueYearDensityPlus from "vue-year-density-plus";
	import "vue-year-density-plus/index.css";
	
	app.use(vueYearDensityPlus);


## 0. 可改动样式变量
* ` --default-bg`：#ebedf0(黑夜模式:#c5c8cd);-->小方块默认背景色

* `--act-1-bg`：#9be9a8(黑夜模式:#89a78e);-->1级小方块背景色

* `--act-2-bg`：#40c463(黑夜模式:#567d60);-->2级小方块背景色

* `--act-3-bg`：#30a14e(黑夜模式:#3f734c);-->3级小方块背景色

* `--act-4-bg`：#216e39(黑夜模式:#298747);-->4级小方块背景色

* `--border-color`：rgba(27, 31, 35, 0.06)(黑夜模式:rgba(15, 28, 41, 0.06));-->小方块边框颜色

* `--more-bg`：#303133(黑夜模式:#E5EAF3);-->浮窗背景色

* `--more-color`：#fff(黑夜模式:#141414);-->浮窗默认字体颜色

* `--font-color`：rgb(31, 35, 40)(黑夜模式:rgb(241, 243, 245));-->组件默认字体颜色


## 1. 参数
* `i18n`：开启国际化-->Boolean;非必传;默认*false*

* `firstDay`：周首日，只能是1-7-->Number;非必传;默认*7*

* `showTime`：展示时间，可以是年也可以是某一天（必须是-间隔）-->String;非必传;默认*null*

* `data`：展示数据，键值名必须是YYYY-DD-MM格式-->Object;非必传;默认*{}*
>
	例如：{"2024-03-21":5}
>

* `@getData`：当showTime改变时，向父级索要（更新data即可）指定日期范围内的数据-->第一个参数返回开始日期，第二个参数返回结束日期

* `@dayClick`：点击某一天的格子-->第一个参数返回选中天的详情数据

## 2. 插槽
* `default`：替换默认展示的浮窗内容
>
	date:返回当前展示天的详细信息（与dayClick相同）
>

* `tip`：替换默认左下角的提示信息


## 更多vue3组件
[**自定义右键菜单**](https://github.com/QuietHear/vue-diy-rightmenu-plus '右键新窗口浏览') | [**可拖拽菜单**](https://github.com/QuietHear/vue-drag-menu-plus '右键新窗口浏览') | [**echarts组件**](https://github.com/QuietHear/vue-echarts-block-plus '右键新窗口浏览') | [**基于el-menu的菜单组件**](https://github.com/QuietHear/vue-ele-nav-plus '右键新窗口浏览') | [**面包屑组件**](https://github.com/QuietHear/vue-permission-breads-plus '右键新窗口浏览') | [**滑动拼图**](https://github.com/QuietHear/vue-puzzle-slider-plus '右键新窗口浏览') | [**工作日历**](https://github.com/QuietHear/vue-shop-calendar-plus '右键新窗口浏览') | [**多页签组件**](https://github.com/QuietHear/vue-tabs-plus '右键新窗口浏览') | [**wangEditor**](https://github.com/QuietHear/vue-wangEditor-block-plus '右键新窗口浏览') | ***年密度组件***