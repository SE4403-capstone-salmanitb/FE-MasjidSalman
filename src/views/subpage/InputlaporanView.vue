<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Form Input</p>
        </div>
        <div class="container">
          <form @submit.prevent="submitForm">
            <div class="card-container1">
              <div class="mb-3">
                <label for="id_program" class="form-label">Nama Program</label>
                <select
                  class="form-control"
                  v-model="formjudul.nama"
                  @change="updateIdProgram"
                  required
                >
                  <option value="" disabled>Pilih Program</option>
                  <option
                    v-for="program in programOptions"
                    :key="program.id"
                    :value="program.nama"
                  >
                    {{ program.nama }}
                  </option>
                </select>
                <div v-if="errors.nama" class="text-danger">
                  {{ errors.nama }}
                </div>
              </div>
              <div
                class="card1 mb-3"
                style="max-width: 1067px; height: fit-content"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="kode" class="form-label">Kode</label>
                    <input
                      placeholder="64416"
                      type="text"
                      class="form-control"
                      id="kode1"
                      v-model="formjudul.kode"
                      required
                    />
                    <div v-if="errors.kode" class="text-danger">
                      {{ errors.kode }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="program_id" class="form-label"
                      >ID Program</label
                    >
                    <input
                      placeholder="1"
                      type="text"
                      class="form-control"
                      id="program_id1"
                      v-model="formjudul.program_id"
                      required
                      readonly
                    />
                    <div v-if="errors.program_id" class="text-danger">
                      {{ errors.program_id }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="bulanlaporan" class="form-label"
                      >Bulan Laporan</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="bulanlaporan1"
                      v-model="formjudul.bulan_laporan"
                      required
                    />
                    <div v-if="errors.bulan_laporan" class="text-danger">
                      {{ errors.bulan_laporan }}
                    </div>
                  </div>
                  <p style="color: gray">
                    ( Note: Harap pilih tanggal 01 untuk tiap bulan)
                  </p>
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
                    <button
                      type="button"
                      class="btn tambah-btn"
                      @click="SubmitForm"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tombol1">
              <button type="submit" class="btn" style="margin-bottom: 210px">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";

export default {
  data() {
    return {
      formjudul: {
        nama: "",
        kode: "",
        program_id: "",
        disusun_oleh: "",
        bulan_laporan: "",
      },
      programOptions: [],
      errors: {},
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
    };
  },
  mounted() {
    this.fetchProgramOptions();
  },
  methods: {
    fetchProgramOptions() {
      axios
        .get("/api/program", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearer"),
          },
        })
        .then((response) => {
          this.programOptions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching program options:", error);
        });
    },
    updateIdProgram() {
      const selectedProgram = this.programOptions.find(
        (program) => program.nama === this.formjudul.nama
      );
      if (selectedProgram) {
        this.formjudul.program_id = selectedProgram.id;
      } else {
        this.formjudul.program_id = "";
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.formjudul.nama) {
        this.errors.nama = "Nama Program is required.";
      }
      if (!this.formjudul.kode) {
        this.errors.kode = "Kode is required.";
      }
      if (!this.formjudul.program_id) {
        this.errors.program_id = "ID Program is required.";
      }
      if (!this.formjudul.bulan_laporan) {
        this.errors.bulan_laporan = "Bulan Laporan is required.";
      }
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.formjudul.disusun_oleh = sessionStorage.getItem("user_id");

        axios
          .post("/api/laporanBulanan", this.formjudul, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di upload";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            window.location.href = "/program";
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal menginput data: " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });
      }
    },
    SubmitForm() {
      if (this.validateForm()) {
        this.formjudul.disusun_oleh = sessionStorage.getItem("user_id");

        axios
          .post("/api/laporanBulanan", this.formjudul, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di upload";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal menginput data: " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });
      }
    },
    closeNotification() {
      this.isNotificationVisible = false;
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
.text-danger {
  color: red;
}
</style>
