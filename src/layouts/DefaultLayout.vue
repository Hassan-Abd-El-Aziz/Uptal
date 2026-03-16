<template>
  <div>
    <Sidebar
      v-if="!isMobile || showSidebar"
      :is-collapsed="isSidebarCollapsed"
      :class="{ 'fixed z-50': isMobile }"
    />
    <main
      class="min-h-screen bg-gray-50 transition-all duration-500"
      :class="{
        'mr-20': !isMobile && isSidebarCollapsed && $i18n.locale === 'ar',
        'mr-64': !isMobile && !isSidebarCollapsed && $i18n.locale === 'ar',
        'ml-20': !isMobile && isSidebarCollapsed && $i18n.locale !== 'ar',
        'ml-64': !isMobile && !isSidebarCollapsed && $i18n.locale !== 'ar',
      }"
    >
      <header
        class="p-4 flex justify-between items-center border-b border-border-light"
      >
        <!-- Search Bar -->
        <div class="relative w-96 hidden md:block">
          <input
            type="text"
            :placeholder="$t('dashboard.search') || 'Search...'"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-gray-50 focus:bg-white focus:border-primary-1 focus:ring-1 focus:ring-primary-1 transition-all duration-300 outline-none rtl:pl-4 rtl:pr-10"
          />
          <MagnifyingGlassIcon
            class="w-5 h-5 text-gray-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3"
          />
        </div>
        <div v-if="!isMobile">
          <Breadcrumb />
        </div>
        <div v-if="isMobile">
          <h1 class="font-bold">
            <span class="text-primary-1 font-bold text-3xl">Up</span>
            <span class="text-primary-2 font-light text-2xl">tal</span>
          </h1>
        </div>

        <div class="flex items-center">
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="w-10 h-10 rounded-full"
            >
              <img
                src="https://i.pravatar.cc/40?img=7"
                alt="Profile"
                class="w-10 h-10 rounded-full"
              />
            </button>
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
            >
              <router-link
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Settings</router-link
              >
              <router-link
                to="/logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Logout</router-link
              >
            </div>
          </div>
          <button
            @click="toggleSidebar"
            class="p-2 rounded-md hover:bg-gray-200 ml-4"
          >
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
        </div>
      </header>
      <slot />
    </main>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Breadcrumb from "../components/ui/Breadcrumb.vue";
import { useWindowSize } from "@vueuse/core";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
    Breadcrumb,
    MagnifyingGlassIcon,
  },
  setup() {
    const { width } = useWindowSize();
    return { width };
  },
  data() {
    return {
      isSidebarCollapsed: false,
      showSidebar: false,
      showUserMenu: false,
    };
  },
  computed: {
    isMobile() {
      return this.width < 768;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.showSidebar = !this.showSidebar;
      } else {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
      }
    },
  },
  watch: {
    isMobile(newVal) {
      if (newVal) {
        this.isSidebarCollapsed = true;
        this.showSidebar = false;
      } else {
        this.isSidebarCollapsed = false;
      }
    },
  },
};
</script>
