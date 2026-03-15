<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8" data-aos="fade-down">
      <h1 class="text-h2">{{ $t("settings.title") }}</h1>
      <LanguageSwitcher />
    </div>

    <!-- Settings Navigation -->
    <div class="flex gap-8" data-aos="fade-up">
      <!-- Side Menu -->
      <div class="w-64 space-y-2">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeSection = section.id"
          class="w-full text-right px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3"
          :class="
            activeSection === section.id
              ? 'bg-primary-1 text-white'
              : 'hover:bg-gray-100'
          "
        >
          <component :is="section.icon" class="w-5 h-5" />
          <span>{{ section.label }}</span>
        </button>
      </div>

      <!-- Settings Content -->
      <div class="flex-1 card-base">
        <!-- Profile Section -->
        <div v-if="activeSection === 'profile'" class="space-y-6">
          <h3 class="text-h5">{{ $t("settings.profile") }}</h3>

          <!-- Avatar -->
          <div class="flex items-center gap-6">
            <img
              :src="profile.avatar"
              alt="Profile"
              class="w-24 h-24 rounded-full"
            />
            <div>
              <button class="btn-secondary text-sm py-2 px-4">
                {{ $t("settings.changeAvatar") }}
              </button>
              <p class="text-body-12 text-text-secondary mt-2">
                {{ $t("settings.avatarHint") }}
              </p>
            </div>
          </div>

          <!-- Form -->
          <div class="grid grid-cols-2 gap-6">
            <InputField
              v-model="profile.firstName"
              :label="$t('settings.firstName')"
              :placeholder="$t('settings.firstName')"
            />
            <InputField
              v-model="profile.lastName"
              :label="$t('settings.lastName')"
              :placeholder="$t('settings.lastName')"
            />
            <InputField
              v-model="profile.email"
              type="email"
              :label="$t('settings.email')"
              :placeholder="$t('settings.email')"
            />
            <InputField
              v-model="profile.phone"
              type="tel"
              :label="$t('settings.phone')"
              :placeholder="$t('settings.phone')"
            />
          </div>

          <div>
            <Textarea
              v-model="profile.bio"
              :label="$t('settings.bio')"
              :placeholder="$t('settings.bioPlaceholder')"
              rows="4"
            />
          </div>
        </div>

        <!-- Notifications Section -->
        <div v-if="activeSection === 'notifications'" class="space-y-6">
          <h3 class="text-h5">{{ $t("settings.notifications") }}</h3>

          <div class="space-y-4">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex items-center justify-between py-3 border-b border-border-light last:border-0"
            >
              <div>
                <p class="text-body-14 font-medium">
                  {{ notification.title }}
                </p>
                <p class="text-body-12 text-text-secondary">
                  {{ notification.description }}
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notification.enabled"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-1 transition-all"
                ></div>
                <div
                  class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Privacy Section -->
        <div v-if="activeSection === 'privacy'" class="space-y-6">
          <h3 class="text-h5">{{ $t("settings.privacy") }}</h3>

          <div class="space-y-4">
            <div
              v-for="setting in privacySettings"
              :key="setting.id"
              class="flex items-center justify-between py-3 border-b border-border-light last:border-0"
            >
              <div>
                <p class="text-body-14 font-medium">{{ setting.title }}</p>
                <p class="text-body-12 text-text-secondary">
                  {{ setting.description }}
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="setting.enabled"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-1 transition-all"
                ></div>
                <div
                  class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Security Section -->
        <div v-if="activeSection === 'security'" class="space-y-6">
          <h3 class="text-h5">{{ $t("settings.security") }}</h3>

          <div class="space-y-4">
            <InputField
              type="password"
              :label="$t('settings.currentPassword')"
              :placeholder="$t('settings.currentPassword')"
            />
            <InputField
              type="password"
              :label="$t('settings.newPassword')"
              :placeholder="$t('settings.newPassword')"
            />
            <InputField
              type="password"
              :label="$t('settings.confirmPassword')"
              :placeholder="$t('settings.confirmPassword')"
            />
          </div>

          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              id="twoFactor"
              v-model="twoFactorEnabled"
              class="rounded border-border-light text-primary-1 focus:ring-primary-1"
            />
            <label for="twoFactor" class="text-body-14">{{
              $t("settings.twoFactor")
            }}</label>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-8 flex justify-end">
          <button class="btn-primary px-8" @click="saveSettings">
            {{ $t("settings.save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import InputField from "../components/ui/InputField.vue";
import Textarea from "../components/ui/Textarea.vue";
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
} from "@heroicons/vue/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Settings",
  components: {
    LanguageSwitcher,
    InputField,
    Textarea,
    UserIcon,
    BellIcon,
    ShieldCheckIcon,
    KeyIcon,
  },
  setup() {
    const activeSection = ref("profile");
    const twoFactorEnabled = ref(false);

    const sections = [
      { id: "profile", label: "الملف الشخصي", icon: "UserIcon" },
      { id: "notifications", label: "الإشعارات", icon: "BellIcon" },
      { id: "privacy", label: "الخصوصية", icon: "ShieldCheckIcon" },
      { id: "security", label: "الأمان", icon: "KeyIcon" },
    ];

    const profile = ref({
      firstName: "محمد",
      lastName: "علاء",
      email: "mohamed@uptal.com",
      phone: "+201234567890",
      bio: "مطور واجهات أمامية بخبرة 5 سنوات",
      avatar: "https://i.pravatar.cc/100?img=7",
    });

    const notifications = ref([
      {
        id: 1,
        title: "إشعارات المقابلات",
        description: "تلقي إشعارات عند جدولة مقابلات جديدة",
        enabled: true,
      },
      {
        id: 2,
        title: "تحديثات المدفوعات",
        description: "إشعارات عند إجراء أي معاملة مالية",
        enabled: true,
      },
      {
        id: 3,
        title: "رسائل جديدة",
        description: "تنبيه عند استلام رسائل جديدة",
        enabled: false,
      },
      {
        id: 4,
        title: "تقييمات المقابلات",
        description: "إشعارات عند استلام تقييمات جديدة",
        enabled: true,
      },
    ]);

    const privacySettings = ref([
      {
        id: 1,
        title: "ظهور الملف الشخصي",
        description: "إظهار ملفك الشخصي للمقابلين",
        enabled: true,
      },
      {
        id: 2,
        title: "مشاركة الإحصائيات",
        description: "مشاركة إحصائيات أدائك مع المنصة",
        enabled: false,
      },
      {
        id: 3,
        title: "ظهور البريد الإلكتروني",
        description: "إظهار بريدك الإلكتروني للمستخدمين الآخرين",
        enabled: false,
      },
    ]);

    const saveSettings = () => {
      // Save settings logic
      console.log("Settings saved");
    };

    return {
      activeSection,
      sections,
      profile,
      notifications,
      privacySettings,
      twoFactorEnabled,
      saveSettings,
    };
  },
  mounted() {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  },
};
</script>
