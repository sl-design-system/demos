<template>
  <div id="app">
    <h1>Vue Router Demo</h1>
    <sl-breadcrumbs>
      <router-link to="/" slot="home">🏠 Custom home</router-link>
      <router-link to="/page-1">Page 1 with a very long name to it truncates</router-link>
      <router-link to="/page-2">Page 2 with a very long name to it truncates</router-link>
      <router-link to="/page-3">Page 3 with a very long name to it truncates</router-link>
    </sl-breadcrumbs>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style src="app.css" scoped>
a {
  color: yellow;
  text-decoration: none;
}
nav {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.router-links {
  margin: 20px 0;
}

.router-links a {
  display: inline-block;
  margin-right: 15px;
  padding: 8px 16px;
  color: #1976d2;
  text-decoration: none;
  border: 1px solid #1976d2;
  border-radius: 4px;
  transition: all 0.2s;
}

.router-links a:hover {
  background: #1976d2;
  color: white;
}

.router-links a.router-link-active {
  background: #1976d2;
  color: white;
  font-weight: bold;
}

.directive-examples {
  margin: 20px 0;
}

.directive-examples {
  margin: 20px 0;
  display: flex;
  gap: 15px;
}

.directive-examples span {
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 4px;
  transition: background 0.2s;
}

.directive-examples span:hover {
  background: #e0e0e0;
}
</style>
