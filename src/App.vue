<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <el-container>
        <el-header class="bg-primary flex gap-4 justify-center items-center text-xl text-white">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/test">Test</RouterLink>
          <RouterLink to="/geolocation">geolocation</RouterLink>
        </el-header>
      </el-container>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
