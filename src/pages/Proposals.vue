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
      <!-- Breadcrumb -->
      <div class="mb-6" data-aos="fade-down">
        <Breadcrumb :items="breadcrumbItems" />
      </div>

      <!-- Header -->
      <div class="flex justify-between items-center mb-8" data-aos="fade-down">
        <h1 class="text-h2">{{ $t("proposals.title") }}</h1>
        <LanguageSwitcher />
      </div>

      <!-- Proposals List -->
      <div class="space-y-6">
        <div
          v-for="(proposal, index) in proposals"
          :key="index"
          class="card-base hover:scale-[1.02] cursor-pointer"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <img
              :src="proposal.avatar"
              :alt="proposal.name"
              class="w-16 h-16 rounded-full"
            />

            <!-- Content -->
            <div class="flex-1">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-h5">{{ proposal.name }}</h3>
                  <p class="text-body-14 text-text-secondary">
                    {{ proposal.title }}
                  </p>
                </div>

                <!-- Meta Info -->
                <div class="text-right">
                  <p class="text-body-12 text-text-secondary">
                    {{ proposal.candidates }} {{ $t("proposals.candidates") }}
                  </p>
                  <p class="text-body-12 text-text-secondary">
                    {{ $t("proposals.lastUpdate") }}: {{ proposal.lastUpdate }}
                  </p>
                </div>
              </div>

              <!-- Description with Read More/Less -->
              <p class="text-body-14 mb-3">
                {{
                  proposal.expanded
                    ? proposal.fullDescription
                    : proposal.shortDescription
                }}
                <button
                  @click="proposal.expanded = !proposal.expanded"
                  class="text-primary-1 hover:text-primary-2 font-medium ml-2"
                >
                  {{
                    proposal.expanded
                      ? $t("proposals.readLess")
                      : $t("proposals.readMore")
                  }}
                </button>
              </p>

              <!-- Tags and Actions -->
              <div class="flex flex-wrap items-center gap-3 mt-4">
                <span class="badge badge-success"
                  >{{ proposal.days }} {{ $t("proposals.days") }}</span
                >
                <span class="badge badge-success"
                  >${{ proposal.price }}
                  {{ $t("proposals.perInterview") }}</span
                >
                <span class="badge"
                  >{{ proposal.hours }} {{ $t("proposals.hours") }}</span
                >

                <button class="btn-secondary text-sm py-2 px-4">
                  {{ $t("proposals.decline") }}
                </button>
                <button class="btn-primary text-sm py-2 px-4">
                  {{ $t("proposals.contact") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import Breadcrumb from "../components/ui/Breadcrumb.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Proposals",
  components: {
    Sidebar,
    LanguageSwitcher,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbItems: [
        { label: "Requests", path: "/" },
        { label: "New Request", path: "/proposals" },
        { label: "Create New Request" },
      ],
      proposals: [
        {
          avatar: "https://i.pravatar.cc/100?img=1",
          name: "Ahmed Ismail",
          title: "UI/UX Designer",
          candidates: 122,
          lastUpdate: "12 minutes",
          days: 24,
          price: 305,
          hours: "One",
          shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          fullDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          expanded: false,
        },
        {
          avatar: "https://i.pravatar.cc/100?img=2",
          name: "Sarah Mohamed",
          title: "Frontend Developer",
          candidates: 89,
          lastUpdate: "25 minutes",
          days: 15,
          price: 250,
          hours: "Two",
          shortDescription:
            "Ut enim ad minim veniam, quis nostrud exercitation...",
          fullDescription:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
          expanded: false,
        },
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
