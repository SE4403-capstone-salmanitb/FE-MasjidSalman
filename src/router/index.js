import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/subpage/LoginView.vue";
import RegisterView from "../views/subpage/RegisterView.vue";
import LupaView from "../views/subpage/LupaView.vue";
import InputView from "../views/subpage/InputView.vue";
import PenjelasanView from "../views/subpage/PenjelasanView.vue";
import ResumeView from "../views/subpage/ResumeView.vue";
import ProfileView from "../views/mainpage/ProfileView.vue";
import BulanView from "../views/mainpage/BulanView.vue";
import KpiView from "../views/mainpage/KpiView.vue";
import ProgramView from "../views/mainpage/ProgramView.vue";
import RekapView from "../views/mainpage/RekapView.vue";
import AnggaranView from "../views/mainpage/AnggaranView.vue";
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
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/anggaran",
    name: "anggaran",
    component: AnggaranView,
  },
  {
    path: "/bulan",
    name: "bulan",
    component: BulanView,
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
    path: "/resume",
    name: "resume",
    component: ResumeView,
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
    path: "/penjelasan",
    name: "penjelasan",
    component: PenjelasanView,
  },
  {
    path: "/resume",
    name: "resume",
    component: ResumeView,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
