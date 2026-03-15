<template>
  <div>
    <Sidebar :is-collapsed="isSidebarCollapsed" />
    <main
      class="min-h-screen bg-gray-50 transition-all duration-500"
      :class="{
        'mr-20': isSidebarCollapsed && $i18n.locale === 'ar',
        'mr-64': !isSidebarCollapsed && $i18n.locale === 'ar',
        'ml-20': isSidebarCollapsed && $i18n.locale !== 'ar',
        'ml-64': !isSidebarCollapsed && $i18n.locale !== 'ar',
      }"
    >
      <header class="p-4">
        <button @click="toggleSidebar" class="p-2 rounded-md hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>
      <slot />
    </main>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
  },
  data() {
    return {
      isSidebarCollapsed: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
