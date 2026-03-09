<template>
  <nav
    class="flex items-center space-x-2 text-body-14 rtl:space-x-reverse"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <template v-for="(item, index) in items" :key="index">
      <router-link
        v-if="item.path"
        :to="item.path"
        class="text-text-secondary hover:text-primary-1 transition-colors"
      >
        {{ item.label }}
      </router-link>
      <span v-else class="text-text-primary font-medium">
        {{ item.label }}
      </span>
      <span v-if="index < items.length - 1" class="text-text-secondary mx-2">
        {{ $i18n.locale === "ar" ? "/" : "/" }}
      </span>
    </template>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    items: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every((item) => typeof item.label === "string");
      },
    },
  },
};
</script>
