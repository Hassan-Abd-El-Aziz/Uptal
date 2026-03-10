<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    EmptyLayout,
  },
  setup() {
    const { locale } = useI18n();
    const route = useRoute();

    // Set initial direction
    document.documentElement.dir = locale.value === "ar" ? "rtl" : "ltr";

    const layout = computed(() => {
      return route.meta.layout || "EmptyLayout";
    });

    return {
      locale,
      layout,
    };
  },
};
</script>
