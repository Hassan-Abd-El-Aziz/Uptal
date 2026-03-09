<template>
  <div
    class="min-h-screen bg-gray-50"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <Sidebar />

    <main
      class="transition-all duration-500"
      :class="[$i18n.locale === 'ar' ? 'mr-64' : 'ml-64', 'p-8']"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-8" data-aos="fade-down">
        <h1 class="text-h2">{{ $t("dashboard.title") }}</h1>
        <LanguageSwitcher />
      </div>

      <!-- Search -->
      <div class="mb-8" data-aos="fade-up" data-aos-delay="100">
        <input
          type="text"
          :placeholder="$t('dashboard.search')"
          class="w-full max-w-md px-4 py-3 rounded-lg border border-border-light focus:border-primary-2 focus:ring-1 focus:ring-primary-2 transition-all duration-300"
        />
      </div>

      <!-- Active Requests Section -->
      <section class="mb-12">
        <h2 class="text-h4 mb-6" data-aos="fade-right">
          {{ $t("dashboard.activeRequests") }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(request, index) in activeRequests"
            :key="index"
            class="card-base"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
          >
            <h3 class="text-h5 mb-3">{{ request.jobTitle }}</h3>
            <p class="text-body-14 text-text-secondary mb-2">
              {{ request.interviewer }}
            </p>
            <div class="flex justify-between items-center mt-4">
              <span
                class="badge"
                :class="
                  request.status === 'Overdue'
                    ? 'badge-warning'
                    : 'badge-success'
                "
              >
                {{ request.dueDate }}
              </span>
              <span class="text-body-12 text-text-secondary">{{
                request.status
              }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Upcoming/Overdue Section -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card-base" data-aos="fade-right">
          <h3 class="text-h5 mb-4">{{ $t("dashboard.upcoming") }}</h3>
          <div
            v-for="(item, index) in upcoming"
            :key="index"
            class="flex justify-between items-center py-3 border-b border-border-light last:border-0"
          >
            <span class="text-body-14">{{ item.title }}</span>
            <span class="text-body-12 text-text-secondary">{{
              item.time
            }}</span>
          </div>
        </div>

        <div class="card-base" data-aos="fade-left">
          <h3 class="text-h5 mb-4">{{ $t("dashboard.overdue") }}</h3>
          <div
            v-for="(item, index) in overdue"
            :key="index"
            class="flex justify-between items-center py-3 border-b border-border-light last:border-0"
          >
            <span class="text-body-14">{{ item.title }}</span>
            <span class="text-body-12 text-warning">{{ item.time }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    LanguageSwitcher,
  },
  data() {
    return {
      activeRequests: [
        {
          jobTitle: "Hiring Freelancer Full-Stack Developer",
          interviewer: "Ahmed Ismail - Senior Full Stack Engineer",
          dueDate: "25 Feb, 2024",
          status: "Active",
        },
        {
          jobTitle: "UI/UX Designer for Mobile App",
          interviewer: "Sarah Mohamed - Senior UI/UX Designer",
          dueDate: "28 Feb, 2024",
          status: "Active",
        },
        {
          jobTitle: "DevOps Engineer - Cloud Infrastructure",
          interviewer: "Omar Hassan - DevOps Specialist",
          dueDate: "01 Mar, 2024",
          status: "Overdue",
        },
      ],
      upcoming: [
        { title: "Technical Interview - Frontend", time: "25 Feb, 03:00pm" },
        { title: "System Design Discussion", time: "26 Feb, 10:00am" },
        { title: "Code Review Session", time: "27 Feb, 02:00pm" },
      ],
      overdue: [
        { title: "React Developer Assessment", time: "22 Feb, 11:00am" },
        { title: "Portfolio Review", time: "23 Feb, 04:00pm" },
      ],
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
