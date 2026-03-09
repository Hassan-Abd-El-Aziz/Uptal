<template>
  <aside
    class="fixed left-0 top-0 h-screen bg-white border-r border-border-light transition-all duration-500 z-50"
    :class="[
      isCollapsed ? 'w-20' : 'w-64',
      $i18n.locale === 'ar' ? 'right-0 left-auto border-l border-r-0' : '',
    ]"
    @mouseenter="!isMobile && (isCollapsed = false)"
    @mouseleave="!isMobile && (isCollapsed = true)"
  >
    <!-- Logo -->
    <div
      class="h-20 flex items-center justify-center border-b border-border-light"
    >
      <h1
        class="text-h4 text-primary-1 font-bold"
        :class="{ 'text-2xl': isCollapsed }"
      >
        {{ isCollapsed ? "U" : "Uptal" }}
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-2" v-if="!isMobile">
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary-1 hover:text-white group"
        :class="{ 'justify-center': isCollapsed }"
        active-class="bg-primary-1 text-white"
      >
        <component
          :is="item.icon"
          class="w-5 h-5"
          :class="{
            'mr-3': !isCollapsed && $i18n.locale !== 'ar',
            'ml-3': !isCollapsed && $i18n.locale === 'ar',
          }"
        />
        <span v-if="!isCollapsed" class="text-body-14">{{
          $t(`navigation.${item.key}`)
        }}</span>
      </router-link>
    </nav>

    <!-- Mobile Bottom Navigation -->
    <nav
      v-else
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-border-light flex justify-around p-2"
    >
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center p-2 rounded-lg transition-all duration-300"
        active-class="text-primary-1"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-body-12 mt-1">{{
          $t(`navigation.${item.key}`)
        }}</span>
      </router-link>
    </nav>

    <!-- Profile Section -->
    <div
      v-if="!isMobile"
      class="absolute bottom-0 left-0 right-0 p-4 border-t border-border-light"
    >
      <div class="flex items-center" :class="{ 'justify-center': isCollapsed }">
        <img
          src="https://i.pravatar.cc/40?img=7"
          alt="Profile"
          class="w-10 h-10 rounded-full"
          :class="{
            'mr-3': !isCollapsed && $i18n.locale !== 'ar',
            'ml-3': !isCollapsed && $i18n.locale === 'ar',
          }"
        />
        <div v-if="!isCollapsed" class="flex-1">
          <p class="text-body-14 font-medium">Mohamed Alaa</p>
          <p class="text-body-12 text-text-secondary">mohamed@uptal.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ChatBubbleOvalLeftIcon as ChatIcon,
  Cog6ToothIcon as CogIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
} from "@heroicons/vue/24/outline";
import { useWindowSize } from "@vueuse/core";

export default {
  name: "Sidebar",
  components: {
    HomeIcon,
    DocumentTextIcon,
    CreditCardIcon,
    ChatIcon,
    CogIcon,
    LogoutIcon,
  },
  data() {
    return {
      isCollapsed: true,
      navigationItems: [
        { key: "home", path: "/", icon: "HomeIcon" },
        { key: "activeRequests", path: "/proposals", icon: "DocumentTextIcon" },
        { key: "payment", path: "/checkout", icon: "CreditCardIcon" },
        { key: "chat", path: "#", icon: "ChatIcon" },
        { key: "setting", path: "#", icon: "CogIcon" },
        { key: "logout", path: "#", icon: "LogoutIcon" },
      ],
    };
  },
  computed: {
    isMobile() {
      const { width } = useWindowSize();
      return width.value < 768;
    },
  },
};
</script>
