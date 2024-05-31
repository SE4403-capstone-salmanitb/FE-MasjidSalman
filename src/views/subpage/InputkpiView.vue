<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div v-if="isNotificationVisible" :class="notificationClass">
        <div class="row">
          <b-icon-check-circle
            v-if="notificationType === 'success'"
            style="
              margin-right: 12px;
              margin-left: 15px;
              margin-top: 14px;
              width: 30px;
              height: 30px;
            "
          ></b-icon-check-circle>
          <b-icon-exclamation-circle
            v-if="notificationType === 'error'"
            style="
              margin-right: 12px;
              margin-left: 15px;
              margin-top: 14px;
              width: 30px;
              height: 30px;
            "
          ></b-icon-exclamation-circle>
          <div class="notification-header">
            <p class="notification-title">{{ notificationMessage }}</p>
            <p class="notification-content">{{ notificationDetail }}</p>
          </div>
          <b-icon-x
            @click="closeNotification"
            style="
              margin-left: 47px;
              margin-right: 12px;
              margin-top: 14px;
              width: 30px;
              height: 30px;
            "
          ></b-icon-x>
        </div>
      </div>
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Form Input</p>
        </div>
        <div class="container">
          <form>
            <div class="mb-3">
              <label for="namaprogram" class="form-label"
                >Nama Program Kegiatan</label
              >
              <input type="program" class="form-control" id="namaprogram1" />
            </div>
            <div class="mb-3">
              <label for="tahunkegiatan" class="form-label"
                >Tahun Kegiatan</label
              >
              <select
                v-model="selectedYear"
                type="tahun"
                class="form-control"
                id="tahunkegiatan1"
                style="width: 1029px"
              >
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            <div class="card-container1">
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="kpi" class="form-label">KPI</label>
                    <input
                      type="kpi"
                      class="form-control"
                      id="kpi1"
                      v-model="kpi"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="target" class="form-label">Target</label>
                    <input
                      type="target"
                      class="form-control"
                      id="target1"
                      v-model="target"
                    />
                  </div>
                  <div class="tombol">
                    <button
                      type="button"
                      class="btn hapus-btn"
                      style="
                        display: none;
                        background-color: #ff0000;
                        margin-right: 14px;
                      "
                    >
                      Hapus
                    </button>
                    <button type="button" class="btn tambah-btn">Tambah</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tombol1">
              <button type="button" class="btn" @click="goToInputPage">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "axios";

export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
      kpi: "",
      target: "",
    };
  },
  mounted() {
    // Attach event listener to the parent element for both Tambah and Hapus buttons
    const cardContainer = document.querySelector(".card-container1");
    cardContainer.addEventListener("click", this.handleButtonClick);
  },
  methods: {
    handleButtonClick(event) {
      if (event.target.classList.contains("tambah-btn")) {
        const existingCard = document.querySelector(".card1");
        const newCard = existingCard.cloneNode(true);
        newCard
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));
        const cardContainer = document.querySelector(".card-container1");
        cardContainer.appendChild(newCard);
        const cardContainers = document.querySelectorAll(".card1");
        cardContainers.forEach((container) => {
          const hapusButton = container.querySelector(".hapus-btn");
          hapusButton.style.display =
            cardContainers.length > 1 ? "inline-block" : "none";
        });
      } else if (event.target.classList.contains("hapus-btn")) {
        event.target.closest(".card1").remove();
        const cardContainers = document.querySelectorAll(".card1");
        cardContainers.forEach((container) => {
          const hapusButton = container.querySelector(".hapus-btn");
          hapusButton.style.display =
            cardContainers.length > 1 ? "inline-block" : "none";
        });
      }
    },
    closeNotification() {
      this.isNotificationVisible = false;
    },
    goToInputPage() {
      axios
        .post("/url/untuk/menyimpan/data", {
          kpi: this.kpi,
          target: this.target,
        })
        .then(() => {
          this.notificationMessage = "Berhasil";
          this.notificationDetail = "Data berhasil di upload";
          this.notificationType = "success";
          this.isNotificationVisible = true;
          setTimeout(() => {
            this.notificationMessage = "";
            this.notificationDetail = "";
            this.notificationType = "";
          }, 3000); // Reset notifikasi setelah 3 detik
        })
        .catch(() => {
          this.notificationMessage = "Gagal";
          this.notificationDetail = "Gagal menginput data";
          this.notificationType = "error";
          this.isNotificationVisible = true;
        });
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
  },
  components: {
    Sidebar,
  },
  computed: {
    notificationClass() {
      return {
        notification: this.isNotificationVisible,
        "notification-error": this.notificationType === "error",
        "notification-success": this.notificationType === "success",
      };
    },
  },
};
</script>

<style>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 9999;
}

.notification-error {
  background-color: #f24e1e;
  color: white;
}

.notification-success {
  background-color: #b5f8c3;
  color: white;
}

.notification-title {
  margin-right: 10px;
  font-weight: bold;
  margin-bottom: 0;
}

.notification-content {
  align-items: center;
  margin-bottom: 5px;
}

.card-container {
  padding-left: 260px;
  padding-top: 33px;
  overflow-y: auto;
}

.card-container1 {
  overflow-y: auto;
  margin-top: 32px;
}

.form {
  margin-left: 16px;
  margin-right: 9px;
}

.form .mb-3 .form-label {
  margin-top: 12px;
}

.card-container1 .card1 {
  background-color: #d9d9d9;
  padding-left: 0%;
  padding-top: 0%;
}

.card-container .card {
  background-color: white;
}

.kepala {
  background-color: #967c55;
  height: 70px;
  width: 1149px;
}

.kepala p {
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-top: 18px;
  margin-left: 24px;
}

.teks {
  margin-left: 19px;
  margin-top: 30px;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

form {
  margin-left: 45px;
  margin-top: 57px;
  margin-right: 36px;
}

.form-label {
  font-size: 16px;
  font-weight: 700;
}

.card1 .tombol {
  display: flex;
  margin-top: 14px;
  margin-right: 9px;
}

.card1 .tombol .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 47px;
  width: 104px;
  color: white;
  margin-bottom: 19px;
}

.tombol1 {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}

.tombol1 .btn {
  background-color: #967c55;
  font-size: 16px;
  font-weight: bolder;
  height: 47px;
  width: 104px;
  color: white;
}
</style>
