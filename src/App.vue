/*
 * @Author: aFei
 * @Date: 2024-03-21 11:35:29
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2024-03-21 13:26:13
*/
<template>
  <el-config-provider :locale="zh">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import zh from "element-plus/dist/locale/zh-cn.mjs";
</script>