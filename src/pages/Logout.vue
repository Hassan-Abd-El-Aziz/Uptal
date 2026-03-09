<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-1 to-primary-2 flex items-center justify-center p-4"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <!-- خلفية متحركة -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- بطاقة تسجيل الخروج -->
    <div
      class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 hover:scale-105"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <!-- أيقونة الخروج -->
      <div class="flex justify-center mb-6">
        <div
          class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center animate-pulse"
        >
          <LogoutIcon class="w-12 h-12 text-warning" />
        </div>
      </div>

      <!-- عنوان الصفحة -->
      <h1 class="text-h3 text-center mb-2">{{ $t("logout.title") }}</h1>
      <p class="text-body-16 text-text-secondary text-center mb-8">
        {{ $t("logout.message") }}
      </p>

      <!-- معلومات المستخدم -->
      <div class="bg-gray-50 rounded-xl p-4 mb-8 flex items-center gap-4">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="w-16 h-16 rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h3 class="text-h6 font-bold">{{ user.name }}</h3>
          <p class="text-body-14 text-text-secondary">{{ user.email }}</p>
          <p class="text-body-12 text-text-secondary mt-1">
            {{ $t("logout.lastActive") }}: {{ user.lastActive }}
          </p>
        </div>
      </div>

      <!-- أزرار الإجراء -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          @click="confirmLogout"
          class="flex-1 bg-warning text-white py-4 rounded-xl font-medium transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
          :disabled="loading"
        >
          <ArrowRightOnRectangleIcon v-if="!loading" class="w-5 h-5" />
          <svg
            v-else
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ loading ? $t("logout.loggingOut") : $t("logout.confirm") }}
        </button>

        <button
          @click="cancelLogout"
          class="flex-1 bg-gray-100 text-text-primary py-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105"
          :disabled="loading"
        >
          {{ $t("logout.cancel") }}
        </button>
      </div>

      <!-- تحذير إضافي -->
      <p class="text-body-12 text-text-secondary text-center mt-6">
        {{ $t("logout.warning") }}
      </p>
    </div>

    <!-- نافذة تأكيد منبثقة -->
    <Transition name="modal">
      <div
        v-if="showConfirmModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- خلفية معتمة -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          @click="showConfirmModal = false"
        ></div>

        <!-- محتوى النافذة -->
        <div
          class="relative bg-white rounded-2xl max-w-sm w-full p-6 transform transition-all duration-300 scale-100"
          data-aos="zoom-in"
        >
          <div class="text-center">
            <!-- أيقونة تحذير -->
            <div
              class="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <ExclamationTriangleIcon class="w-10 h-10 text-yellow-500" />
            </div>

            <h3 class="text-h5 font-bold mb-2">
              {{ $t("logout.modalTitle") }}
            </h3>
            <p class="text-body-14 text-text-secondary mb-6">
              {{ $t("logout.modalMessage") }}
            </p>

            <div class="flex gap-3">
              <button
                @click="performLogout"
                class="flex-1 bg-warning text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-all"
              >
                {{ $t("logout.yesLogout") }}
              </button>
              <button
                @click="showConfirmModal = false"
                class="flex-1 bg-gray-100 text-text-primary py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                {{ $t("logout. stay") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <Toast
    v-if="showToast"
    :type="toastType"
    :title="toastTitle"
    :message="toastMessage"
  />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  ArrowLeftOnRectangleIcon as LogoutIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "../components/ui/Toast.vue";

export default {
  name: "Logout",
  components: {
    LogoutIcon,
    ArrowRightOnRectangleIcon,
    ExclamationTriangleIcon,
    Toast,
  },
  setup() {
    const router = useRouter();
    const { locale } = useI18n();
    const loading = ref(false);
    const showConfirmModal = ref(false);
    const showToast = ref(false);
    const toastType = ref("success");
    const toastTitle = ref("");
    const toastMessage = ref("");

    const performLogout = async () => {
      loading.value = true;
      showConfirmModal.value = false;

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // إظهار toast النجاح
        showToast.value = true;
        toastType.value = "success";
        toastTitle.value =
          locale.value === "ar" ? "تم تسجيل الخروج" : "Logged Out";
        toastMessage.value =
          locale.value === "ar"
            ? "تم تسجيل الخروج بنجاح"
            : "Successfully logged out";

        // الانتظار قليلاً ثم التوجيه
        setTimeout(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          sessionStorage.clear();
          router.push("/login");
        }, 1500);
      } catch (error) {
        // إظهار toast الخطأ
        showToast.value = true;
        toastType.value = "error";
        toastTitle.value = locale.value === "ar" ? "خطأ" : "Error";
        toastMessage.value =
          locale.value === "ar"
            ? "حدث خطأ أثناء تسجيل الخروج"
            : "An error occurred during logout";
      } finally {
        loading.value = false;
      }
    };

    // بيانات المستخدم (يمكن جلبها من store)
    const user = ref({
      name: "محمد علاء",
      email: "mohamed@uptal.com",
      avatar: "https://i.pravatar.cc/100?img=7",
      lastActive: new Date().toLocaleString(
        locale.value === "ar" ? "ar-EG" : "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
      ),
    });

    const confirmLogout = () => {
      showConfirmModal.value = true;
    };

    const cancelLogout = () => {
      // العودة إلى الصفحة السابقة
      router.back();
    };

    onMounted(() => {
      AOS.init({
        duration: 800,
        once: true,
        easing: "ease-in-out",
      });
    });

    return {
      user,
      loading,
      showConfirmModal,
      confirmLogout,
      performLogout,
      cancelLogout,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
    };
  },
};
</script>

<style scoped>
/* تأثيرات النافذة المنبثقة */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* تخصيص شريط التمرير */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
