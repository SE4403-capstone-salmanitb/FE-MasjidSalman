<template>
  <div class="profile">
    <Sidebar />
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
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Form Input</p>
        </div>
        <div class="container">
          <form>
            <div class="card-container1">
              <div class="mb-3">
                <label for="id_program" class="form-label"
                  >Nama Judul Kegiatan</label
                >
                <select
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
                    <label for="kebutuhan" class="form-label">Kebutuhan</label>
                    <input
                      type="text"
                      class="form-control"
                      id="kebutuhan1"
                      v-model="form.uraian"
                      required
                    />
                  </div>
                  <div class="row">
                    <div class="mb-3">
                      <label for="nilaisatuan" class="form-label"
                        >Nilai Satuan</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="nilaisatuan1"
                        v-model="form.nilai_satuan"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="qty" class="form-label">Qty</label>
                      <input
                        type="number"
                        class="form-control"
                        id="qty1"
                        v-model="form.quantity"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="unit" class="form-label">Unit (Unt)</label>
                      <input
                        type="text"
                        class="form-control"
                        id="unit1"
                        v-model="form.quantity_unit"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="fren" class="form-label">Frekuensi</label>
                      <input
                        type="number"
                        class="form-control"
                        id="fren1"
                        v-model="form.frequency"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="unit" class="form-label">Unit (Unt)</label>
                      <input
                        type="text"
                        class="form-control"
                        id="unt1"
                        v-model="form.frequency_unit"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="sumberdana" class="form-label"
                        >Sumber Dana</label
                      >
                      <select
                        class="form-control"
                        v-model="form.sumber_dana"
                        style="width: 304px"
                        required
                      >
                        <option value="" disabled>Pilih Sumber Dana</option>
                        <option value="Pusat">Pusat</option>
                        <option value="RAS">RAS</option>
                        <option value="Kepesertaan">Kepesertaan</option>
                        <option value="Pihak Ketiga">Pihak Ketiga</option>
                        <option value="Wakaf Salman">Wakaf Salman</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="sumberdana" class="form-label">Bulan</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input1"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                      v-model="form.dana_jan"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox1"
                      >Januari</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                      v-model="form.dana_feb"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox2"
                      >Februari</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="option3"
                      v-model="form.dana_mar"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                      >Maret</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox4"
                      value="option4"
                      v-model="form.dana_apr"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox4"
                      >April</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox5"
                      value="option5"
                      v-model="form.dana_mei"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox5"
                      >Mei</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox6"
                      value="option6"
                      v-model="form.dana_jun"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox6"
                      >Juni</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox7"
                      value="option7"
                      v-model="form.dana_jul"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox7"
                      >Juli</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox8"
                      value="option8"
                      v-model="form.dana_aug"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox8"
                      >Agustus</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox9"
                      value="option9"
                      v-model="form.dana_sep"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox9"
                      >September</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox10"
                      value="option10"
                      v-model="form.dana_oct"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox10"
                      >Oktober</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox11"
                      value="option11"
                      v-model="form.dana_nov"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox11"
                      >November</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox12"
                      value="option12"
                      v-model="form.dana_dec"
                      required
                    />
                    <label class="form-check-label" for="inlineCheckbox12"
                      >Desember</label
                    >
                  </div>
                  <div class="mb-3" style="margin-top: 20px">
                    <label for="judulkegiatan" class="form-label"
                      >ID Judul kegiatan</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="judulkegiatan1"
                      v-model="form.id_judul_kegiatan"
                      required
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div class="tombol-btn">
                <button
                  type="button"
                  class="btn tambah-btn"
                  @click="submitForm"
                >
                  Simpan
                </button>
              </div>
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
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
      form: {
        nama_program: "",
        nama: "",
        uraian: "",
        nilai_satuan: "",
        quantity: "",
        quantity_unit: "",
        frequency: "",
        frequency_unit: "",
        sumber_dana: "",
        dana_jan: 0,
        dana_feb: 0,
        dana_mar: 0,
        dana_apr: 0,
        dana_mei: 0,
        dana_jun: 0,
        dana_jul: 0,
        dana_aug: 0,
        dana_sep: 0,
        dana_oct: 0,
        dana_nov: 0,
        dana_dec: 0,
        id_judul_kegiatan: "",
        // Add more form fields here as needed
      },
      programOptions: [],
      showAddInput: false,
      newProgram: "",
    };
  },
  mounted() {
    this.fetchProgramOptions();
  },
  methods: {
    fetchProgramOptions() {
      axios
        .get("/api/judulKegiatanRKA", {
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
        (program) => program.nama === this.form.nama_program
      );
      if (selectedProgram) {
        this.form.id_judul_kegiatan = selectedProgram.id;
      } else {
        this.form.id_judul_kegiatan = "";
      }
    },
    submitForm() {
      // Convert boolean to integer for checkboxes
      Object.keys(this.form).forEach((key) => {
        if (typeof this.form[key] === "boolean") {
          this.form[key] = this.form[key] ? 1 : 0;
        }
      });
      // Log form data for debugging
      console.log("Form Data:", this.form);

      if (
        ![
          "Pusat",
          "RAS",
          "Kepesertaan",
          "Pihak Ketiga",
          "Wakaf Salman",
        ].includes(this.form.sumber_dana)
      ) {
        this.notificationMessage = "Gagal";
        this.notificationDetail = "Inputan pada sumber dana tidak sesuai";
        this.notificationType = "error";
        this.isNotificationVisible = true;
        setTimeout(() => {
          this.notificationMessage = "";
          this.notificationDetail = "";
          this.notificationType = "";
          this.isNotificationVisible = false;
        }, 10000); // Reset notification after 10 seconds
        return;
      }

      axios
        .post("/api/itemKegiatanRKA", this.form, {
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
          window.location.href = "/rka";
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
  margin-bottom: 25px;
}

.form .mb-3 .form-label {
  margin-top: 12px;
}

.card-container1 .card1 {
  background-color: #d9d9d9;
}

.card-container .card {
  background-color: white;
}

.row .mb-3 .form-control {
  width: 121px;
  margin-right: 18px;
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

.tombol-btn {
  display: flex;
  justify-content: end;
  margin-top: 32px;
  margin-right: 9px;
}

.tombol-btn .btn {
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
  margin-top: 14px;
  margin-top: 88px;
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
