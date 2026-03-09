import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Proposals from "../pages/Proposals.vue";
import Checkout from "../pages/Checkout.vue";
import ActiveRequests from "../pages/ActiveRequests.vue";
import Payment from "../pages/Payment.vue";
import Chat from "../pages/Chat.vue";
import Settings from "../pages/Settings.vue";
import Logout from "../pages/Logout.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/proposals",
    name: "Proposals",
    component: Proposals,
  },
  {
    path: "/active-requests",
    name: "ActiveRequests",
    component: ActiveRequests,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
