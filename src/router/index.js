import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/subpage/LoginView.vue";
import RegisterView from "../views/subpage/RegisterView.vue";
import LupaView from "../views/subpage/LupaView.vue";
import InputView from "../views/subpage/InputView.vue";
import InputkpiView from "../views/subpage/InputkpiView.vue";
import InputrkaView from "../views/subpage/InputrkaView.vue";
import InputanggaranView from "../views/subpage/InputanggaranView.vue";
import InputbulanView from "../views/subpage/InputbulanView.vue";

import ProfileView from "../views/mainpage/ProfileView.vue";
import KpiView from "../views/mainpage/KpiView.vue";
import ProgramView from "../views/mainpage/ProgramView.vue";
import RekapView from "../views/mainpage/RekapView.vue";
import PersetujuanView from "../views/mainpage/PersetujuanView.vue";
import PenjrkaView from "../views/mainpage/PenjrkaView.vue";
import RkaView from "../views/mainpage/RkaView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/lupa",
    name: "lupa",
    component: LupaView,
  },
  {
    path: "/input",
    name: "input",
    component: InputView,
  },
  {
    path: "/inputkpi",
    name: "inputkpi",
    component: InputkpiView,
  },
  {
    path: "/inputrka",
    name: "inputrka",
    component: InputrkaView,
  },
  {
    path: "/inputanggaran",
    name: "inputanggaran",
    component: InputanggaranView,
  },
  {
    path: "/inputbulan",
    name: "inputbulan",
    component: InputbulanView,
  },
  {
    path: "/persetujuan",
    name: "persetujuan",
    component: PersetujuanView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },

  {
    path: "/kpi",
    name: "kpi",
    component: KpiView,
  },
  {
    path: "/program",
    name: "program",
    component: ProgramView,
  },
  {
    path: "/rekap",
    name: "rekap",
    component: RekapView,
  },
  {
    path: "/penjrka",
    name: "penjrka",
    component: PenjrkaView,
  },
  {
    path: "/rka",
    name: "rka",
    component: RkaView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/ErrorNotFound.vue'),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
