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
            <div class="row">
              <div class="mb-3" style="margin-left: 20px">
                <label for="namabidangprogram" class="form-label"
                  >Nama Bidang Program</label
                >
                <div class="dropdown-with-addition">
                  <select
                    class="form-control"
                    id="namabidangprogram1"
                    @change="handleProgramChange"
                    style="width: 750px; height: 38px"
                  >
                    <option value="">Pilih Bidang Program</option>
                    <option value="PROGRAM KEPUSTAKAAN">
                      PROGRAM KEPUSTAKAAN
                    </option>
                    <option value="PROGRAM INTELEKTUALITAS">
                      PROGRAM INTELEKTUALITAS
                    </option>
                    <option value="PROGRAM EKOLITERASI">
                      PROGRAM EKOLITERASI
                    </option>
                    <option value="SUPPORTING SYSTEM">SUPPORTING SYSTEM</option>
                    <option
                      value="__add__"
                      style="text-align: center; color: #5897fb"
                    >
                      ---Tambah program lain----
                    </option>
                  </select>
                  <input
                    v-if="showAddInput"
                    type="text"
                    class="form-control"
                    v-model="newProgram"
                    placeholder="Masukkan Bidang Program Baru"
                    style="width: 750px"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="tahunkegiatan" class="form-label"
                  >Tahun Kegiatan</label
                >
                <select
                  v-model="selectedYear"
                  class="form-control"
                  id="tahunkegiatan1"
                  style="width: 250px; margin-right: 20px"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
            <div class="card-container1">
              <div class="card1 mb-3" style="max-width: 1067px">
                <div
                  v-for="(entry, index) in formEntries"
                  :key="index"
                  class="form mb-3"
                  style="
                    background-color: #d9d9d9;
                    padding: 16px;
                    margin-bottom: 16px;
                  "
                >
                  <div class="row">
                    <div class="mb-3">
                      <label for="kpi" class="form-label">KPI</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="entry.kpi"
                        style="width: 410px; height: 47px"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="target" class="form-label">Target</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="entry.target"
                        style="width: 410px; height: 47px"
                      />
                    </div>
                    <div class="tombolhapus">
                      <button
                        type="button"
                        class="btn"
                        @click="removeEntry(index)"
                      >
                        <b-icon-trash font-scale="2"></b-icon-trash>
                      </button>
                    </div>
                    <div class="tomboltambah">
                      <button type="button" class="btn" @click="addEntry">
                        <b-icon-plus-lg font-scale="2"></b-icon-plus-lg>
                      </button>
                    </div>
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
      selectedYear: new Date().getFullYear(), // Mengatur tahun saat ini sebagai nilai awal
      years: this.generateYears(), // Menghasilkan daftar tahun
      showAddInput: false,
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
      newProgram: "",
      kpi: "",
      target: "",
      formEntries: [{ kpi: "", target: "" }], // Initial form entry
    };
  },
  methods: {
    handleProgramChange(event) {
      if (event.target.value === "__add__") {
        this.showAddInput = true;
      } else {
        this.showAddInput = false;
      }
    },
    addEntry() {
      this.formEntries.push({ kpi: "", target: "" });
    },
    removeEntry(index) {
      if (this.formEntries.length > 1) {
        this.formEntries.splice(index, 1);
      }
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (v, i) => currentYear - i);
    },
    saveEntries() {
      // Implement the save logic here
      console.log("Saving entries:", this.formEntries);
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
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
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

.form .row .tombolhapus {
  margin-top: 45px;
  margin-right: 16px;
}

.form .row .tombolhapus .btn {
  background-color: red;
  display: flex;
  justify-content: center;
  height: 47px;
  width: 47px;
  color: white;
}

.form .row .tomboltambah {
  margin-top: 45px;
}

.form .row .tomboltambah .btn {
  background-color: #967c55;
  display: flex;
  justify-content: center;
  height: 47px;
  width: 47px;
  color: white;
}
</style>
