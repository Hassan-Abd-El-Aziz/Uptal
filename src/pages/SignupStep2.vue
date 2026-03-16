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
        <div class="flex flex-col justify-center p-8 md:p-8 mt-10 leading-none">
          <span class="mb-4 text-4xl text-primary-2 font-light text-center"
            ><span class="text-primary-1 font-bold">Up</span>tal</span
          >

          <h2 class="text-2xl mb-4 font-bold text-center">Sign up</h2>

          <span class="font-light text-gray-400 mb-4 text-center">
            Step 2/2</span
          >

          <div class="py-2">
            <span class="mb-2 text-md">Company Email</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              name="email"
              id="email"
              placeholder="Write Your  Company Email here...."
            />
          </div>
          <div class="py-2">
            <span class="mb-2 text-md">Company Name</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              name="email"
              id="email"
              placeholder="Write Your Company Name here...."
            />
          </div>
          <div class="py-2">
            <span class="mb-2 text-md">Title in the Company</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              name="email"
              id="email"
              placeholder="Write Your Title here...."
            />
          </div>
          <div class="py-2">
            <span class="mb-2 text-md">Company industry</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-300"
              name="email"
              id="email"
              placeholder="Write Company industry  here...."
            />
          </div>
          <div class="pb-10">
            <span class="mb-2 text-md">Company Employees Capacity</span>
            <select
              name=""
              id=""
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-gray-500"
            >
              <option>select</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="20">50</option>
              <option value="20">more than 50</option>
            </select>
          </div>
          <button
            @click="login"
            class="w-full bg-primary-1 transition-colors duration-300 hover:cursor-pointer text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Create account
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
</script>
