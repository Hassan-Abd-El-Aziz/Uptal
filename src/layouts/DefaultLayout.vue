<template>
  <div>
    <Sidebar />
    <main
      :class="[
        $i18n.locale === 'ar' ? 'mr-64' : 'ml-64',
        'min-h-screen bg-gray-50',
      ]"
    >
      <router-view />
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
};
</script>
