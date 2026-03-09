<template>
  <button
    @click="toggleLanguage"
    class="px-3 py-1 rounded-lg border border-border-light hover:border-primary-1 transition-all duration-300"
  >
    {{ $i18n.locale === "en" ? "AR" : "EN" }}
  </button>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "LanguageSwitcher",
  setup() {
    const { locale } = useI18n();

    const toggleLanguage = () => {
      const newLocale = locale.value === "en" ? "ar" : "en";
      locale.value = newLocale;
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
    };

    return {
      toggleLanguage,
    };
  },
};
</script>
