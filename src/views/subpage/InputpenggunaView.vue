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
                <label for="id_program" class="form-label">Kode Program</label>
                <select
                  style="width: 100%"
                  class="form-control"
                  v-model="form.kode"
                  @change="updateIdLaporanBulanan"
                  required
                >
                  <option value="" disabled>Pilih Kode Program</option>
                  <option
                    v-for="program in LaporanBulanan"
                    :key="program.id"
                    :value="program.kode"
                  >
                    {{ program.kode }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="id_program" class="form-label"
                  >Nama Kegiatan RKA</label
                >
                <select
                  style="width: 100%"
                  class="form-control"
                  v-model="form.uraian"
                  @change="updateIdKegiatanRKA"
                  required
                >
                  <option value="" disabled>Pilih Kegiatan RKA</option>
                  <option
                    v-for="program in KegiatanRKA"
                    :key="program.id"
                    :value="program.uraian"
                  >
                    {{ program.uraian }}
                  </option>
                </select>
              </div>

              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="jumlahrealisasi" class="form-label"
                      >Jumlah Realisasi</label
                    >
                    <input
                      placeholder="639250"
                      type="text"
                      class="form-control"
                      id="jumlahrealisasi1"
                      v-model="form.jumlah_realisasi"
                      style="width: 100%"
                      required
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3">
                      <label for="idlaporanbulanan" class="form-label"
                        >ID Laporan Bulanan</label
                      >
                      <input
                        placeholder="1"
                        type="text"
                        class="form-control"
                        id="idlaporanbulanan1"
                        style="width: 490px"
                        v-model="form.id_laporan_bulanan"
                        required
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label for="idkegiatanrka" class="form-label"
                        >ID Kegiatan RKA</label
                      >
                      <input
                        placeholder="1"
                        type="text"
                        class="form-control"
                        id="idkegiatanrka1"
                        style="width: 490px"
                        v-model="form.id_item_rka"
                        required
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div class="tombol">
                  <button
                    type="button"
                    class="btn tambah-btn"
                    style="margin-left: 14px"
                    @click="submitForms"
                  >
                    Tambah
                  </button>
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
        kode: "",
        uraian: "",
        jumlah_realisasi: "",
        id_item_rka: "",
        id_laporan_bulanan: "",
      },
      LaporanBulanan: [],
      KegiatanRKA: [],
      showAddInput: false,
      newProgram: "",
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
    };
  },
  mounted() {
    this.fetchLaporanBulanan();
    this.fetchKegiatanRKA();
  },
  methods: {
    fetchLaporanBulanan() {
      axios
        .get("/api/laporanBulanan")
        .then((response) => {
          this.LaporanBulanan = response.data;

          var user = JSON.parse(sessionStorage.getItem("user"));

          this.LaporanBulanan = this.LaporanBulanan.filter(
            (laporan) => laporan.disusun_oleh === user.id
          );
        })
        .catch((error) => {
          console.error("Error fetching Laporan Bulanan:", error);
        });
    },
    fetchKegiatanRKA() {
      axios
        .get("/api/itemKegiatanRKA")
        .then((response) => {
          console.log("API Response:", response.data); // Log response data
          this.KegiatanRKA = response.data;
        })
        .catch((error) => {
          console.error("Error fetching Laporan Bulanan:", error);
        });
    },
    updateIdLaporanBulanan() {
      const selectedProgram = this.LaporanBulanan.find(
        (program) => program.kode === this.form.kode
      );
      console.log("Selected Program:", selectedProgram); // Log selected program
      if (selectedProgram) {
        this.form.id_laporan_bulanan = selectedProgram.id;
      }
    },
    updateIdKegiatanRKA() {
      const selectedProgram = this.KegiatanRKA.find(
        (program) => program.uraian === this.form.uraian
      );
      console.log("Selected Program:", selectedProgram); // Log selected program
      if (selectedProgram) {
        this.form.id_item_rka = selectedProgram.id;
      }
    },
    submitForm() {
      console.log("Form Data:", this.form);

      axios
        .post("/api/alokasiDana", this.form, {
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
    },
    submitForms() {
      console.log("Form Data:", this.form);

      axios
        .post("/api/alokasiDana", this.form, {
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
          window.location.href = "/inputpengguna";
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
