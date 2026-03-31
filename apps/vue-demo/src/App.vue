<template>
  <div class="app-layout">
    <nav class="sidebar">
      <h2>Vue Demo App</h2>
      <ul>
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path" active-class="active">{{
            item.label
          }}</router-link>
        </li>
      </ul>
    </nav>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { path: '/sl-accordion', label: 'sl-accordion' },
  { path: '/sl-breadcrumbs', label: 'sl-breadcrumbs' },
  { path: '/sl-button', label: 'sl-button' },
  { path: '/sl-button-bar', label: 'sl-button-bar' },
  { path: '/sl-callout', label: 'sl-callout' },
];
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  flex-shrink: 0;
  background: #f5f5f5;
  padding: 16px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.sidebar h2 {
  font-size: 11px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 2px;
}

.sidebar a {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.15s;
}

.sidebar a:hover {
  background: #e8e8e8;
}

.sidebar a.active {
  background: #e0eaff;
  color: #2c5be8;
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}
</style>
