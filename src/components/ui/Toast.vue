<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm border-r-4"
      :class="[type === 'success' ? 'border-success' : 'border-warning']"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="type === 'success' ? 'bg-green-100' : 'bg-red-100'"
        >
          <component
            :is="icon"
            class="w-5 h-5"
            :class="type === 'success' ? 'text-success' : 'text-warning'"
          />
        </div>
        <div>
          <h4 class="text-body-14 font-medium">{{ title }}</h4>
          <p class="text-body-12 text-text-secondary">{{ message }}</p>
        </div>
        <button
          @click="visible = false"
          class="text-text-secondary hover:text-text-primary"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref } from "vue";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "Toast",
  components: {
    CheckCircleIcon,
    XCircleIcon,
    XMarkIcon,
  },
  props: {
    type: {
      type: String,
      default: "success",
    },
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const visible = ref(true);
    const icon = props.type === "success" ? "CheckCircleIcon" : "XCircleIcon";

    setTimeout(() => {
      visible.value = false;
    }, props.duration);

    return {
      visible,
      icon,
    };
  },
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
