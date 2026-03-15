<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8" data-aos="fade-down">
      <h1 class="text-h2">{{ $t("payment.title") }}</h1>
      <LanguageSwitcher />
    </div>

    <!-- Balance Card -->
    <div
      class="card-base bg-gradient-to-r from-primary-1 to-primary-2 text-white mb-8"
      data-aos="fade-up"
    >
      <div class="flex justify-between items-center">
        <div>
          <p class="text-body-14 opacity-90 mb-2">
            {{ $t("payment.currentBalance") }}
          </p>
          <h2 class="text-h3">$12,450.00</h2>
          <p class="text-body-12 opacity-75 mt-2">
            {{ $t("payment.nextPayout") }}: 15 مارس 2024
          </p>
        </div>
        <button
          class="bg-white text-primary-1 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
        >
          {{ $t("payment.withdraw") }}
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="card-base text-center hover:scale-105 cursor-pointer"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <PlusIcon class="w-8 h-8 text-primary-1 mx-auto mb-3" />
        <h3 class="text-h6 mb-1">{{ $t("payment.addFunds") }}</h3>
        <p class="text-body-12 text-text-secondary">
          {{ $t("payment.addFundsDesc") }}
        </p>
      </div>

      <div
        class="card-base text-center hover:scale-105 cursor-pointer"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <ArrowPathIcon class="w-8 h-8 text-primary-1 mx-auto mb-3" />
        <h3 class="text-h6 mb-1">{{ $t("payment.transfer") }}</h3>
        <p class="text-body-12 text-text-secondary">
          {{ $t("payment.transferDesc") }}
        </p>
      </div>

      <div
        class="card-base text-center hover:scale-105 cursor-pointer"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <DocumentTextIcon class="w-8 h-8 text-primary-1 mx-auto mb-3" />
        <h3 class="text-h6 mb-1">{{ $t("payment.invoices") }}</h3>
        <p class="text-body-12 text-text-secondary">
          {{ $t("payment.invoicesDesc") }}
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-6 border-b border-border-light" data-aos="fade-up">
      <div class="flex gap-6">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="selectedTab = tab.value"
          class="pb-3 px-1 transition-all duration-300"
          :class="
            selectedTab === tab.value
              ? 'border-b-2 border-primary-1 text-primary-1'
              : 'text-text-secondary hover:text-primary-1'
          "
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="space-y-4" data-aos="fade-up">
      <div
        v-for="(transaction, index) in transactions"
        :key="transaction.id"
        class="card-base hover:bg-gray-50 transition-all"
        :data-aos="'fade-up'"
        :data-aos-delay="index * 50"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Icon -->
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center"
              :class="
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              "
            >
              <ArrowDownIcon
                v-if="transaction.type === 'income'"
                class="w-6 h-6 text-success"
              />
              <ArrowUpIcon v-else class="w-6 h-6 text-warning" />
            </div>

            <!-- Details -->
            <div>
              <h4 class="text-h6 mb-1">{{ transaction.description }}</h4>
              <p class="text-body-12 text-text-secondary">
                {{ transaction.date }}
              </p>
            </div>
          </div>

          <!-- Amount -->
          <div class="text-right">
            <p
              class="text-h6"
              :class="
                transaction.type === 'income'
                  ? 'text-success'
                  : 'text-warning'
              "
            >
              {{ transaction.type === "income" ? "+" : "-" }}${{
                transaction.amount
              }}
            </p>
            <p class="text-body-12 text-text-secondary">
              {{ transaction.status }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import {
  PlusIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/vue/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Payment",
  components: {
    LanguageSwitcher,
    PlusIcon,
    ArrowPathIcon,
    DocumentTextIcon,
    ArrowDownIcon,
    ArrowUpIcon,
  },
  setup() {
    const selectedTab = ref("all");

    const tabs = [
      { label: "الكل", value: "all" },
      { label: "دخل", value: "income" },
      { label: "مصروفات", value: "expense" },
      { label: "معلقة", value: "pending" },
    ];

    const transactions = ref([
      {
        id: 1,
        type: "income",
        description: "مقابلة - تطوير Full-Stack",
        date: "10 مارس 2024 - 02:30 مساءً",
        amount: 350.0,
        status: "مكتمل",
      },
      {
        id: 2,
        type: "expense",
        description: "سحب إلى البنك",
        date: "8 مارس 2024 - 10:15 صباحاً",
        amount: 500.0,
        status: "قيد المعالجة",
      },
      {
        id: 3,
        type: "income",
        description: "مقابلة - تصميم UI/UX",
        date: "5 مارس 2024 - 04:00 مساءً",
        amount: 250.0,
        status: "مكتمل",
      },
      {
        id: 4,
        type: "expense",
        description: "رسوم منصة",
        date: "1 مارس 2024 - 12:00 صباحاً",
        amount: 15.0,
        status: "مخصوم",
      },
    ]);

    return {
      selectedTab,
      tabs,
      transactions,
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
