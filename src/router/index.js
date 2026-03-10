import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Proposals from "../pages/Proposals.vue";
import Checkout from "../pages/Checkout.vue";
import ActiveRequests from "../pages/ActiveRequests.vue";
import Payment from "../pages/Payment.vue";
import Chat from "../pages/Chat.vue";
import Settings from "../pages/Settings.vue";
import Logout from "../pages/Logout.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/proposals",
    name: "Proposals",
    component: Proposals,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/active-requests",
    name: "ActiveRequests",
    component: ActiveRequests,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: { layout: "DefaultLayout" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
