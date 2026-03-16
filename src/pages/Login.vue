<template>
  <div class="relative flex items-center justify-center min-h-screen">
    <div
      class="absolute inset-0 flex items-center justify-center min-h-screen bg-[url('https://img.freepik.com/free-photo/remote-manager-reviews-cv-with-employees_482257-120581.jpg?t=st=1773173595~exp=1773177195~hmac=8f713e48799f7e022e004f02017ae6958cbd858e67c7b5d8893f49d91c73d0c3&w=1480')]"
    >
      <!-- طبقة التعتيم -->
      <div class="absolute inset-0 bg-black/30"></div>
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        class="relative flex flex-col m-4 space-y-4 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 h-[95%]"
      >
        <!-- right side -->
        <div class="flex flex-col justify-center p-8 md:p-8 mt-5 leading-none">
          <span class="mb-4 text-4xl text-primary-2 font-light text-center"
            ><span class="text-primary-1 font-bold">Up</span>tal</span
          >

          <h2 class="text-2xl mb-4 font-bold text-center">
            Login To Your Account
          </h2>

          <span class="font-light text-gray-400 mb-4 text-center">
            Hi, Welcome Back For Us</span
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
              placeholder="Password: must be 8 characters or more"
            />
          </div>
          <div class="flex w-full justify-between py-2 pt-2 items-center">
            <div class="">
              <input type="checkbox" name="ch" id="ch" class="mr-2" />
              <span class="text-[12px] md:text-sm">Remember for 30 days</span>
            </div>
            <span
              class="font-bold text-[12px] md:text-sm text-primary-1 hover:cursor-pointer"
              >Forgot password?</span
            >
          </div>
          <button
            @click="login"
            class="w-full bg-primary-1 transition-colors duration-300 hover:cursor-pointer text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Login
          </button>
          <div class="text-center text-gray-400 mt-5 mb-8 text-sm">
            Dont'have an account?
            <span
              class="font-bold text-primary-2 hover:cursor-pointer text-sm"
              @click="signup"
            >
              Sign up
            </span>
          </div>
          <div class="flex flex-row items-center justify-center">
            <span class="bg-gray-300 h-0.5 w-24 mb-4"></span
            ><span class="mb-4 pl-4 pr-4 text-sm font-semibold text-gray-400"
              >OR Login With</span
            ><span class="bg-gray-300 h-0.5 w-24 mb-4"></span>
          </div>
          <button
            class="mx-auto my-0 w-[50%] border border-gray-300 text-md p-2 rounded-lg mb-15 hover:bg-primary-1 transition-colors duration-300 hover:cursor-pointer hover:text-white"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="img"
              class="w-6 h-6 inline mr-2"
            />
            Google
          </button>
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
const signup = () => {
  router.push("/signup");
};
</script>
