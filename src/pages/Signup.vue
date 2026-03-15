<template>
  <div class="relative flex items-center justify-center min-h-screen">
    <div
      class="absolute inset-0 flex items-center justify-center min-h-screen bg-[url('https://img.freepik.com/free-photo/remote-manager-reviews-cv-with-employees_482257-120581.jpg?t=st=1773173595~exp=1773177195~hmac=8f713e48799f7e022e004f02017ae6958cbd858e67c7b5d8893f49d91c73d0c3&w=1480')]"
    >
      <!-- طبقة التعتيم -->
      <div class="absolute inset-0 bg-black/30"></div>
      <div
        data-aos="zoom-in"
        data-aos-delay="600"
        class="relative flex flex-col m-4 space-y-4 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 h-[95%]"
      >
        <!-- right side -->
        <div class="flex flex-col justify-center p-8 md:p-8 mt-10 leading-none">
          <span class="mb-4 text-4xl text-primary-2 font-light text-center"
            ><span class="text-primary-1 font-bold">Up</span>tal</span
          >

          <h2 class="text-2xl mb-4 font-bold text-center">Sign up</h2>

          <span class="font-light text-gray-400 mb-4 text-center">
            Step 1/2</span
          >

          <div class="py-2">
            <span class="mb-2 text-md">Email</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              name="email"
              id="email"
              placeholder="Email:example@info.com"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              placeholder="Suggested Password: jod_dk5"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Confirm Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              placeholder="write your password here again"
            />
          </div>

          <button
            @click="login"
            class="w-full bg-primary-1 transition-colors duration-300 hover:cursor-pointer text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Next
          </button>

          <div class="flex flex-row items-center justify-center">
            <span class="bg-gray-300 h-0.5 w-24 mb-4"></span
            ><span class="mb-4 pl-4 pr-4 text-sm font-semibold text-gray-400"
              >OR Login With</span
            ><span class="bg-gray-300 h-0.5 w-24 mb-4"></span>
          </div>

          <div class="flex flex-row items-center justify-between">
            <button
              class="my-0 border border-gray-300 text-[12px] p-2 rounded-lg mb-15 hover:bg-primary-1 transition-colors duration-300 hover:cursor-pointer hover:text-white"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="img"
                class="w-6 h-6 inline mr-2"
              />
              Sign in with Google
            </button>
            <button
              class="my-0 border border-gray-300 text-[12px] p-2 rounded-lg mb-15 hover:bg-primary-1 transition-colors duration-300 hover:cursor-pointer hover:text-white"
            >
              <img
                class="w-6 h-6 inline"
                src="https://img.icons8.com/color/48/facebook.png"
                alt="facebook"
              />

              Sign in with Facbook
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
});

const router = useRouter();

const login = () => {
  router.push("/dashboard");
};
</script>
