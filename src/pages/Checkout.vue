<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8" data-aos="fade-down">
      <h1 class="text-h2">{{ $t("checkout.title") }}</h1>
      <LanguageSwitcher />
    </div>

    <!-- Checkout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div class="space-y-6" data-aos="fade-right">
        <!-- Booking Info -->
        <div class="card-base">
          <h2 class="text-h5 mb-4">{{ $t("checkout.bookingInfo") }}</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-text-secondary">Interviewer</span>
              <span class="font-medium">Ahmed Ismail</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Price</span>
              <span class="font-medium">$305.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Taxes</span>
              <span class="font-medium">$45.75</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">Total Hours</span>
              <span class="font-medium">2 hours</span>
            </div>
          </div>
        </div>

        <!-- Payment Channel -->
        <div class="card-base">
          <h2 class="text-h5 mb-4">{{ $t("checkout.paymentChannel") }}</h2>

          <!-- Payment Icons -->
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div
              v-for="method in paymentMethods"
              :key="method.name"
              class="p-3 border border-border-light rounded-lg text-center hover:border-primary-2 transition-all cursor-pointer"
              :class="{
                'border-primary-2 bg-primary-1 bg-opacity-5':
                  selectedMethod === method.name,
              }"
              @click="selectedMethod = method.name"
            >
              <img
                :src="method.icon"
                :alt="method.name"
                class="h-6 mx-auto mb-2"
              />
              <span class="text-body-12">{{ method.name }}</span>
            </div>
          </div>

          <!-- Credit Card Form -->
          <CreditCardInput v-model="cardDetails" />
        </div>
      </div>

      <!-- Right Column - Summary -->
      <div class="space-y-6" data-aos="fade-left">
        <div class="card-base sticky top-8">
          <h2 class="text-h5 mb-4">{{ $t("checkout.summary") }}</h2>

          <!-- User Details -->
          <div class="space-y-3 mb-6 pb-6 border-b border-border-light">
            <div>
              <p class="text-body-12 text-text-secondary">
                {{ $t("checkout.fullName") }}
              </p>
              <p class="text-body-14 font-medium">Mohamed Alaa</p>
            </div>
            <div>
              <p class="text-body-12 text-text-secondary">
                {{ $t("checkout.email") }}
              </p>
              <p class="text-body-14 font-medium">mohamed@uptal.com</p>
            </div>
            <div>
              <p class="text-body-12 text-text-secondary">
                {{ $t("checkout.billingAddress") }}
              </p>
              <p class="text-body-14 font-medium">
                123 Main St, Cairo, Egypt
              </p>
            </div>
          </div>

          <!-- Price Breakdown -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-text-secondary">{{
                $t("checkout.total")
              }}</span>
              <span>$305.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">{{
                $t("checkout.taxes")
              }}</span>
              <span>$45.75</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-secondary">{{
                $t("checkout.fees")
              }}</span>
              <span>$10.00</span>
            </div>
            <div class="flex justify-between text-success">
              <span>{{ $t("checkout.discount") }}</span>
              <span>-$20.00</span>
            </div>
            <div
              class="flex justify-between text-h6 pt-3 border-t border-border-light"
            >
              <span>{{ $t("checkout.totalPrice") }}</span>
              <span class="text-primary-1">$340.75</span>
            </div>
          </div>

          <!-- Place Order Button -->
          <button class="btn-primary w-full">
            {{ $t("checkout.placeOrder") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import CreditCardInput from "../components/ui/CreditCardInput.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Checkout",
  components: {
    LanguageSwitcher,
    CreditCardInput,
  },
  data() {
    return {
      selectedMethod: "Visa",
      cardDetails: {},
      paymentMethods: [
        {
          name: "Visa",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg",
        },
        {
          name: "Mastercard",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg",
        },
        {
          name: "Apple Pay",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
        },
        {
          name: "PayPal",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
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
