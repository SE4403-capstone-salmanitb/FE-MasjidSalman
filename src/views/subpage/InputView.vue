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
            <div class="card-container1">
              <div class="mb-3">
                <label for="id_program" class="form-label">Nama Program</label>
                <select
                  style="width: 100%"
                  class="form-control"
                  v-model="form.nama_program"
                  @change="updateIdProgram"
                  required
                >
                  <option
                    v-for="program in programOptions"
                    :key="program.id"
                    :value="program.nama"
                  >
                    {{ program.nama }}
                  </option>
                </select>
              </div>
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="indikator" class="form-label"
                      >Nama Kegiatan</label
                    >
                    <input
                      type="string"
                      class="form-control"
                      id="indikator1"
                      style="width: 100%"
                      v-model="form.nama"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="target" class="form-label">Tahun</label>
                    <input
                      type="string"
                      class="form-control"
                      id="target1"
                      v-model="form.tahun"
                      style="width: 100%"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="idkpi" class="form-label">ID Program</label>
                    <input
                      type="string"
                      class="form-control"
                      id="idkpi1"
                      style="width: 100%"
                      v-model="form.id_program"
                      required
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="tombol1" style="margin-bottom: 50px">
              <button type="button" class="btn" @click="submitForms">
                Simpan
              </button>
            </div>
            <div class="card-container1">
              <div class="mb-3">
                <label for="id_program" class="form-label"
                  >Nama Program Kegiatan KPI</label
                >
                <select
                  style="width: 100%"
                  class="form-control"
                  v-model="form.nama_program_kpi"
                  @change="updateIdProgramKpi"
                  required
                >
                  <option
                    v-for="program in programKegiatanOptions"
                    :key="program.id"
                    :value="program.nama"
                  >
                    {{ program.nama }}
                  </option>
                </select>
              </div>
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="indikator" class="form-label"
                      >Key Performance</label
                    >
                    <input
                      type="string"
                      class="form-control"
                      id="indikator1"
                      style="width: 100%"
                      v-model="form.indikator"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="target" class="form-label">Target</label>
                    <input
                      type="string"
                      class="form-control"
                      id="target1"
                      v-model="form.target"
                      style="width: 100%"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="idkpi" class="form-label">ID_KPI</label>
                    <input
                      type="string"
                      class="form-control"
                      id="idkpi1"
                      style="width: 100%"
                      v-model="form.id_program_kegiatan_kpi"
                      required
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="tombol1" style="margin-bottom: 204px">
              <button type="button" class="btn" @click="submitForm">
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
import axios from "@/lib/axios";

export default {
  data() {
    return {
      form: {
        nama_program: "",
        nama_program_kpi: "",
        nama: "",
        indikator: "",
        target: "",
        id_program: "",
        id_program_kegiatan_kpi: "",
      },
      programOptions: [],
      programKegiatanOptions: [],
      showAddInput: false,
      newProgram: "",
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
    };
  },
  mounted() {
    this.fetchProgramOptions();
    this.fetchProgramKegiatanOptions();
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
    fetchProgramKegiatanOptions() {
      axios
        .get("/api/programKegiatanKPI", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearer"),
          },
        })
        .then((response) => {
          this.programKegiatanOptions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching program kegiatan options:", error);
        });
    },
    updateIdProgram() {
      const selectedProgram = this.programOptions.find(
        (program) => program.nama === this.form.nama_program
      );
      if (selectedProgram) {
        this.form.id_program = selectedProgram.id;
      } else {
        this.form.id_program = "";
      }
    },
    updateIdProgramKpi() {
      const selectedProgram = this.programKegiatanOptions.find(
        (program) => program.nama === this.form.nama_program_kpi
      );
      if (selectedProgram) {
        this.form.id_program_kegiatan_kpi = selectedProgram.id;
      } else {
        this.form.id_program_kegiatan_kpi = "";
      }
    },
    submitForms() {
      console.log("Form Data:", this.form);

      axios
        .post("/api/programKegiatanKPI", this.form, {
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
          window.location.href = "/input";
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
    },
    submitForm() {
      console.log("Form Data:", this.form);

      axios
        .post("/api/keyPerformanceIndicator", this.form, {
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
          window.location.href = "/kpi";
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

.row .mb-3 .form-control {
  width: 1043px;
  margin-right: 18px;
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
