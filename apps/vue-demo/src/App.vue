<template>
  <div class="app-layout">
    <a href="#main" class="skip-link">Skip to main content</a>
    <nav
      class="sidebar"
      :class="{ collapsed: navCollapsed }"
      aria-label="Main navigation"
      id="app-sidebar"
    >
      <button
        class="sidebar-toggle"
        aria-controls="app-sidebar"
        @click="navCollapsed = !navCollapsed"
        :aria-expanded="!navCollapsed"
        title="Toggle navigation"
      >
        <span aria-hidden="true">☰</span>
        <span class="visually-hidden">{{
          navCollapsed ? 'Expand navigation' : 'Collapse navigation'
        }}</span>
      </button>
      <h2>Vue Demo App</h2>
      <ul class="sidebar-list">
        <li v-for="item in navItems" :key="item.path">
          <router-link :to="item.path" active-class="active"
            ><span class="label">{{ item.label }}</span></router-link
          >
        </li>
      </ul>
    </nav>
    <main id="main" class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const navCollapsed = ref(false);

const navItems = [
  { path: '/sl-accordion', label: 'sl-accordion' },
  { path: '/sl-breadcrumbs', label: 'sl-breadcrumbs' },
  { path: '/sl-button', label: 'sl-button' },
  { path: '/sl-button-bar', label: 'sl-button-bar' },
  { path: '/sl-callout', label: 'sl-callout' },
  { path: '/sl-checkbox', label: 'sl-checkbox' },
  { path: '/sl-combobox', label: 'sl-combobox' },
  { path: '/sl-dialog', label: 'sl-dialog' },
  { path: '/sl-form-field', label: 'sl-form-field' },
  { path: '/sl-form', label: 'sl-form' },
  { path: '/sl-inline-message', label: 'sl-inline-message' },
  { path: '/sl-menu', label: 'sl-menu' },
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
  color: #333;
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

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.3s ease-in-out;
}

.skip-link:focus {
  top: 0;
}

/* collapsed sidebar styles */
.sidebar.collapsed {
  width: 56px;
  padding-left: 8px;
  padding-right: 8px;
}

.sidebar-title {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.sidebar .label {
  display: inline-block;
  margin-left: 8px;
}

.sidebar.collapsed .label {
  display: none;
}

.sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-bottom: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
}

.sidebar-toggle:focus {
  outline: 2px solid #2c5be8;
  outline-offset: 2px;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.sidebar-list.collapsed {
  display: none;
}

.sidebar.collapsed .sidebar-list {
  display: none;
}
</style>
