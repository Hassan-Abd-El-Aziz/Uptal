<template>
  <div class="p-8">
    <!-- Breadcrumb -->
    <div class="mb-6" data-aos="fade-down">
      <Breadcrumb :items="breadcrumbItems" />
    </div>

    <!-- Header -->
    <div class="flex justify-between items-center mb-8" data-aos="fade-down">
      <h1 class="text-h2">{{ $t("activeRequests.title") }}</h1>
      <LanguageSwitcher />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-8" data-aos="fade-up">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="selectedFilter = filter.value"
        class="px-4 py-2 rounded-lg transition-all duration-300"
        :class="
          selectedFilter === filter.value
            ? 'bg-primary-1 text-white'
            : 'bg-white border border-border-light hover:border-primary-1'
        "
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Active Requests Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(request, index) in filteredRequests"
        :key="request.id"
        class="card-base hover:scale-[1.02] cursor-pointer group"
        :data-aos="'fade-up'"
        :data-aos-delay="index * 100"
      >
        <!-- Job Type Badge -->
        <div class="flex justify-between items-start mb-4">
          <span
            class="badge"
            :class="
              request.type === 'Full-time' ? 'badge-success' : 'badge-warning'
            "
          >
            {{ request.type }}
          </span>
          <span class="text-body-12 text-text-secondary">{{
            request.postedDate
          }}</span>
        </div>

        <!-- Job Title -->
        <h3 class="text-h5 mb-2 group-hover:text-primary-1 transition-colors">
          {{ request.jobTitle }}
        </h3>

        <!-- Company -->
        <p class="text-body-14 text-text-secondary mb-4">
          {{ request.company }}
        </p>

        <!-- Interviewer Info -->
        <div class="flex items-center gap-3 mb-4">
          <img
            :src="request.interviewer.avatar"
            :alt="request.interviewer.name"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <p class="text-body-14 font-medium">
              {{ request.interviewer.name }}
            </p>
            <p class="text-body-12 text-text-secondary">
              {{ request.interviewer.title }}
            </p>
          </div>
        </div>

        <!-- Meta Info -->
        <div class="flex flex-wrap gap-3 mb-4">
          <span class="flex items-center text-body-12 text-text-secondary">
            <CalendarIcon class="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
            {{ request.date }}
          </span>
          <span class="flex items-center text-body-12 text-text-secondary">
            <ClockIcon class="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
            {{ request.time }}
          </span>
          <span class="flex items-center text-body-12 text-text-secondary">
            <CurrencyDollarIcon class="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
            ${{ request.budget }}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="flex justify-between text-body-12 mb-1">
            <span
              >{{ $t("activeRequests.applicants") }}:
              {{ request.applicants }}/{{ request.maxApplicants }}</span
            >
            <span
              >{{
                Math.round(
                  (request.applicants / request.maxApplicants) * 100,
                )
              }}%</span
            >
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-1 transition-all duration-500"
              :style="{
                width: `${(request.applicants / request.maxApplicants) * 100}%`,
              }"
            ></div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="flex-1 btn-primary text-sm py-2">
            {{ $t("activeRequests.viewDetails") }}
          </button>
          <button class="flex-1 btn-secondary text-sm py-2">
            {{ $t("activeRequests.edit") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 gap-2" data-aos="fade-up">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        class="w-10 h-10 rounded-lg transition-all duration-300"
        :class="
          currentPage === page
            ? 'bg-primary-1 text-white'
            : 'bg-white border border-border-light hover:border-primary-1'
        "
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import Breadcrumb from "../components/ui/Breadcrumb.vue";
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "ActiveRequests",
  components: {
    LanguageSwitcher,
    Breadcrumb,
    CalendarIcon,
    ClockIcon,
    CurrencyDollarIcon,
  },
  setup() {
    const selectedFilter = ref("all");
    const currentPage = ref(1);
    const itemsPerPage = 6;

    const filters = [
      { label: "الكل", value: "all" },
      { label: "قيد الانتظار", value: "pending" },
      { label: "قيد التنفيذ", value: "in-progress" },
      { label: "مكتملة", value: "completed" },
      { label: "ملغية", value: "cancelled" },
    ];

    const breadcrumbItems = [
      { label: "الرئيسية", path: "/" },
      { label: "الطلبات النشطة" },
    ];

    const requests = ref([
      {
        id: 1,
        jobTitle: "مطور Full-Stack",
        company: "شركة تك المحدودة",
        type: "Full-time",
        postedDate: "منذ يومين",
        date: "25 فبراير 2024",
        time: "03:00 مساءً",
        budget: 3500,
        applicants: 12,
        maxApplicants: 20,
        interviewer: {
          name: "أحمد إسماعيل",
          title: "كبير مهندسي البرمجيات",
          avatar: "https://i.pravatar.cc/100?img=1",
        },
      },
      {
        id: 2,
        jobTitle: "مصمم UI/UX",
        company: "استوديو التصميم الإبداعي",
        type: "Part-time",
        postedDate: "منذ 5 أيام",
        date: "28 فبراير 2024",
        time: "11:00 صباحاً",
        budget: 2500,
        applicants: 8,
        maxApplicants: 15,
        interviewer: {
          name: "سارة محمد",
          title: "مصممة تجربة مستخدم",
          avatar: "https://i.pravatar.cc/100?img=2",
        },
      },
      {
        id: 3,
        jobTitle: "مهندس DevOps",
        company: "حلول السحابة المتكاملة",
        type: "Full-time",
        postedDate: "منذ أسبوع",
        date: "1 مارس 2024",
        time: "02:00 مساءً",
        budget: 4000,
        applicants: 5,
        maxApplicants: 10,
        interviewer: {
          name: "عمر حسن",
          title: "متخصص DevOps",
          avatar: "https://i.pravatar.cc/100?img=3",
        },
      },
    ]);

    const filteredRequests = computed(() => {
      if (selectedFilter.value === "all") return requests.value;
      return requests.value.filter(
        (r) => r.type.toLowerCase() === selectedFilter.value,
      );
    });

    const totalPages = computed(() =>
      Math.ceil(requests.value.length / itemsPerPage),
    );

    return {
      selectedFilter,
      currentPage,
      totalPages,
      filters,
      breadcrumbItems,
      filteredRequests,
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
