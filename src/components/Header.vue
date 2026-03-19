<template>
  <header
    class="flex items-center justify-between bg-white px-8 py-4 border-b border-border-light z-40 relative"
  >
 

    <!-- Right Side Actions & Profile -->
    <div class="flex items-center gap-6 ml-auto rtl:ml-0 rtl:mr-auto">
      <!-- Notification Bell -->
      <button
        class="relative p-2 text-gray-500 hover:text-primary-1 hover:bg-gray-100 rounded-full transition-all duration-300"
      >
        <BellIcon class="w-6 h-6" />
        <span
          class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
        ></span>
      </button>

      <div class="h-8 w-px bg-border-light mx-2 hidden md:block"></div>

      <!-- User Profile Dropdown -->
      <div class="relative" ref="dropdownRef">
        <button
          @click="isOpen = !isOpen"
          class="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-xl transition-all duration-300 group"
        >
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-primary-1 transition-colors"
          />
          <div class="hidden md:block text-left rtl:text-right">
            <p
              class="text-sm font-bold text-gray-900 group-hover:text-primary-1 transition-colors"
            >
              {{ user.name }}
            </p>
            <p class="text-xs text-gray-500">{{ user.role }}</p>
          </div>
          <!-- السهم الذي يتغير اتجاهه -->
          <ChevronDownIcon
            class="w-4 h-4 text-gray-400 group-hover:text-primary-1 transition-transform duration-300"
            :class="{ 'rotate-180': isOpen }"
          />
        </button>

        <!-- Dropdown Menu -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0 -translate-y-2"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-95 opacity-0 -translate-y-2"
        >
          <div
            v-if="isOpen"
            class="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
          >
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="text-sm font-semibold text-gray-900">{{ user.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
            </div>

            <div class="py-1">
              <router-link
                to="/settings"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-1"
                @click="isOpen = false"
              >
                <UserIcon class="w-4 h-4" />
                {{ $t("settings.profile") || "Profile" }}
              </router-link>
            </div>

            <div class="py-1 border-t border-gray-100">
              <button
                @click="$router.push('/logout')"
                class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <ArrowRightOnRectangleIcon class="w-4 h-4" />
                {{ $t("navigation.logout") || "Logout" }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const dropdownRef = ref(null);

const user = ref({
  name: "Mohamed Alaa",
  role: "Admin",
  email: "mohamed@uptal.com",
  avatar: "https://i.pravatar.cc/100?img=7",
});

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>
