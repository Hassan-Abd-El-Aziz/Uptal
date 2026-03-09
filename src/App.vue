<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "App",
  setup() {
    const { locale } = useI18n();

    // Set initial direction
    document.documentElement.dir = locale.value === "ar" ? "rtl" : "ltr";

    return {
      locale,
    };
  },
};
</script>
