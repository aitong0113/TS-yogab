<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="d-flex">
    <Sidebar />

    <div class="main-content d-flex flex-column">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
}
</style>
