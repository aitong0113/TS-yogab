<script setup lang="ts">
import { sidebarData } from '@/constants'
</script>

<template>
  <div class="sidebar d-flex flex-column">
    <h4 class="text-white text-center mb-5">植感生活</h4>
    <nav class="nav nav-pills flex-column">
      <RouterLink
      :key="sidebarItem.path"
        v-for="sidebarItem in sidebarData"
        :to="sidebarItem.path"
        activeClass="active"
        class="nav-link"
      >
        <i class="fas fa-box-open me-3" style="width: 1rem"></i>{{ sidebarItem.name }}
      </RouterLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  width: 250px;
  min-height: 100vh;
  background-color: #343a40;
  color: white;
  padding: 20px;
  transition: all 0.3s;
}

.sidebar .nav-link {
  color: #adb5bd;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
}

.sidebar .nav-link:hover,
.sidebar .nav-link.active {
  background-color: #495057;
  color: white;
}
</style>
