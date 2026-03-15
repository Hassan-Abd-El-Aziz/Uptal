<template>
  <div class="h-screen flex">
    <!-- Chat Sidebar -->
    <div
      class="w-80 bg-white border-l border-border-light flex flex-col"
      data-aos="fade-left"
    >
      <!-- Search -->
      <div class="p-4 border-b border-border-light">
        <div class="relative">
          <MagnifyingGlassIcon
            class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            :placeholder="$t('chat.search')"
            class="w-full pl-10 pr-4 py-2 border border-border-light rounded-lg focus:border-primary-2 focus:ring-1 focus:ring-primary-2 transition-all"
          />
        </div>
      </div>

      <!-- Conversations List -->
      <div class="flex-1 overflow-y-auto">
        <div
          v-for="(conversation, index) in conversations"
          :key="conversation.id"
          @click="selectedConversation = conversation"
          class="p-4 cursor-pointer transition-all duration-300 hover:bg-gray-50"
          :class="
            selectedConversation?.id === conversation.id
              ? 'bg-primary-1 bg-opacity-5 border-r-4 border-primary-1'
              : ''
          "
          :data-aos="'fade-right'"
          :data-aos-delay="index * 50"
        >
          <div class="flex items-center gap-3">
            <div class="relative">
              <img
                :src="conversation.avatar"
                :alt="conversation.name"
                class="w-12 h-12 rounded-full"
              />
              <span
                class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                :class="
                  conversation.online ? 'bg-success' : 'bg-text-secondary'
                "
              ></span>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <h4 class="text-body-14 font-medium truncate">
                  {{ conversation.name }}
                </h4>
                <span class="text-body-12 text-text-secondary">{{
                  conversation.lastMessage.time
                }}</span>
              </div>
              <p class="text-body-12 text-text-secondary truncate">
                {{ conversation.lastMessage.text }}
              </p>
            </div>

            <div
              v-if="conversation.unread"
              class="w-5 h-5 bg-primary-1 text-white text-body-10 rounded-full flex items-center justify-center"
            >
              {{ conversation.unread }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col bg-white" data-aos="fade-right">
      <!-- Chat Header -->
      <div
        v-if="selectedConversation"
        class="p-4 border-b border-border-light flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <img
            :src="selectedConversation.avatar"
            :alt="selectedConversation.name"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <h3 class="text-h6">{{ selectedConversation.name }}</h3>
            <p
              class="text-body-12"
              :class="
                selectedConversation.online
                  ? 'text-success'
                  : 'text-text-secondary'
              "
            >
              {{
                selectedConversation.online
                  ? $t("chat.online")
                  : $t("chat.offline")
              }}
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="p-2 hover:bg-gray-100 rounded-full transition-all">
            <PhoneIcon class="w-5 h-5 text-primary-1" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full transition-all">
            <VideoCameraIcon class="w-5 h-5 text-primary-1" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full transition-all">
            <EllipsisVerticalIcon class="w-5 h-5 text-primary-1" />
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div
        class="flex-1 overflow-y-auto p-6 space-y-4"
        ref="messagesContainer"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.sender === 'me' ? 'justify-end' : 'justify-start'"
          data-aos="fade-up"
          data-aos-duration="300"
        >
          <div
            class="max-w-[70%]"
            :class="message.sender === 'me' ? 'order-1' : 'order-2'"
          >
            <div
              class="p-3 rounded-lg"
              :class="
                message.sender === 'me'
                  ? 'bg-primary-1 text-white'
                  : 'bg-gray-100 text-text-primary'
              "
            >
              <p class="text-body-14">{{ message.text }}</p>
            </div>
            <p class="text-body-10 text-text-secondary mt-1">
              {{ message.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="p-4 border-t border-border-light">
        <div class="flex items-center gap-3">
          <button class="p-2 hover:bg-gray-100 rounded-full transition-all">
            <PaperClipIcon class="w-5 h-5 text-primary-1" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full transition-all">
            <FaceSmileIcon class="w-5 h-5 text-primary-1" />
          </button>

          <input
            type="text"
            v-model="newMessage"
            :placeholder="$t('chat.typeMessage')"
            class="flex-1 px-4 py-2 border border-border-light rounded-lg focus:border-primary-2 focus:ring-1 focus:ring-primary-2 transition-all"
            @keyup.enter="sendMessage"
          />

          <button
            @click="sendMessage"
            class="p-2 bg-primary-1 text-white rounded-full hover:bg-primary-2 transition-all hover:scale-110"
          >
            <PaperAirplaneIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from "vue";
import {
  MagnifyingGlassIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  PaperClipIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Chat",
  components: {
    MagnifyingGlassIcon,
    PhoneIcon,
    VideoCameraIcon,
    EllipsisVerticalIcon,
    PaperClipIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
  },
  setup() {
    const selectedConversation = ref(null);
    const newMessage = ref("");
    const messagesContainer = ref(null);

    const conversations = ref([
      {
        id: 1,
        name: "أحمد إسماعيل",
        avatar: "https://i.pravatar.cc/100?img=1",
        online: true,
        unread: 2,
        lastMessage: {
          text: "مرحباً، هل يمكننا مناقشة التفاصيل؟",
          time: "10:30 ص",
        },
      },
      {
        id: 2,
        name: "سارة محمد",
        avatar: "https://i.pravatar.cc/100?img=2",
        online: false,
        unread: 0,
        lastMessage: {
          text: "شكراً لك على المقابلة",
          time: "أمس",
        },
      },
      {
        id: 3,
        name: "عمر حسن",
        avatar: "https://i.pravatar.cc/100?img=3",
        online: true,
        unread: 0,
        lastMessage: {
          text: "تم إرسال العرض",
          time: "أمس",
        },
      },
    ]);

    const messages = ref([
      {
        id: 1,
        sender: "other",
        text: "مرحباً، كيف يمكنني مساعدتك؟",
        time: "10:30 ص",
      },
      {
        id: 2,
        sender: "me",
        text: "أريد مناقشة تفاصيل المقابلة",
        time: "10:32 ص",
      },
    ]);

    const sendMessage = () => {
      if (!newMessage.value.trim()) return;

      messages.value.push({
        id: messages.value.length + 1,
        sender: "me",
        text: newMessage.value,
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      newMessage.value = "";

      // Scroll to bottom
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
        }
      });
    };

    watch(selectedConversation, () => {
      // Load conversation messages
      messages.value = [];
      // Scroll to bottom
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
        }
      });
    });

    return {
      selectedConversation,
      conversations,
      messages,
      newMessage,
      messagesContainer,
      sendMessage,
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
