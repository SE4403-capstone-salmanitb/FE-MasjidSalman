<template>
  <div class="sidebar">
    <div class="title">
      <h2>Salman ITB</h2>
    </div>
    <div class="row">
      <div class="user">
        <div class="foto">
          <img src="@/assets/profil.jpg" alt="Profile Picture" />
        </div>
      </div>
      <div class="nama">
        <p>Dewa arjuna</p>
      </div>
    </div>

    <div class="menu">
      <div class="item">
        <router-link class="nav-link" to="/profile"
          ><b-icon-person-fill style="margin-right: 26px"></b-icon-person-fill
          >Profile</router-link
        >
      </div>
      <div class="item">
        <a class="sub-btn"
          ><b-icon-people-fill style="margin-right: 26px"></b-icon-people-fill
          >Tahunan<b-icon-caret-right-fill
            class="dropdown"
          ></b-icon-caret-right-fill
        ></a>
        <div class="sub-menu">
          <router-link to="/penjrka" class="sub-item"
            >Penjelasan RKA</router-link
          >
          <router-link to="/rka" class="sub-item">RKA</router-link>
          <router-link to="kpi" class="sub-item">KPI</router-link>
        </div>
      </div>
      <div class="item">
        <a class="sub-btn2"
          ><div class="sub-item" style="padding-left: 40px">
            Laporan
            <b-icon-caret-right-fill
              class="dropdown2"
            ></b-icon-caret-right-fill>
          </div>
        </a>
        <div class="sub-menu2">
          <router-link to="/program" class="sub-item2">Program</router-link>
          <router-link to="/rekap" class="sub-item2">Rekap</router-link>
        </div>
      </div>

      <div class="item">
        <router-link
          class="nav-link"
          to="/persetujuan"
          style="padding-left: 72px"
          >Persetujuan</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  mounted() {
    $(document).ready(function () {
      $(".menu").on("click", ".sub-btn", function () {
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".dropdown").toggleClass("rotate");
      });
      $(".menu").on("click", ".sub-btn2", function () {
        $(this).next(".sub-menu2").slideToggle();
        $(this).find(".dropdown2").toggleClass("rotate");
      });
    });
  },
};
</script>

<style>
.title {
  color: #bdbdbd;
  font-size: 24px;
  margin-top: 26px;
  margin-left: 30px;
}

.foto img {
  width: 53px;
  height: 53px;
  border-radius: 50%;
  margin-left: 45px;
  margin-top: 29px;
}

.nama p {
  color: white;
  font-size: 20px;
  margin-top: 35px;
  margin-left: 9px;
}

.jabatan p {
  color: white;
}

.sidebar {
  background-color: #2b2b2b;
  width: 241px;
  height: 100vh;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
}

.sidebar .menu {
  width: 100%;
  margin-top: 47px;
}

.sidebar .menu .item {
  position: relative;
  cursor: pointer;
}

.menu .item a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: block;
  padding: 20px 30px;
}

.menu .item a:hover {
  background: #1e1e1e;
  transition: 0.3s ease;
}

.menu .item a .dropdown {
  margin-top: 0%;
  position: absolute;
  right: 0;
  margin-right: 20px;
  transition: 0.3 ease;
}

.menu .item .sub-menu {
  background: #262626;
  display: none;
}

.menu .item .sub-menu a {
  padding-left: 70px;
}

.menu .item a .dropdown1 {
  position: absolute;
  right: 0;
  margin-right: 20px;
  transition: 0.3 ease;
}

.menu .item .sub-menu1 {
  background: #262626;
  display: none;
}

.menu .item .sub-menu1 a {
  padding-left: 106px;
}

.menu .item a .dropdown2 {
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-top: 3px;
  transition: 0.3 ease;
}

.menu .item .sub-menu2 {
  background: #262626;
  display: none;
}

.menu .item .sub-menu2 a {
  padding-left: 106px;
}

.rotate {
  transform: rotate(90deg);
}
</style>
