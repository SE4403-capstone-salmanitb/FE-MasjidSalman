<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / KPI</p>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="tahun">Bidang</div>
            <div class="tahun1">
              <div class="dropdown1" style="width: fit-content; height: 38px">
                <select
                  class="m-md-2"
                  style="width: fit-content; height: 38px"
                  v-model="selectedBidang"
                >
                  <option
                    v-for="bidang in bidangOptions"
                    :key="bidang.id"
                    :value="bidang.id"
                  >
                    {{ bidang.nama }}
                  </option>
                  <option value="Tambah Bidang">Tambah Bidang</option>
                </select>
              </div>
            </div>
            <div class="teks">Program</div>
            <div class="dropdown1">
              <select
                v-model="selectedProgram"
                id="dropdown-1"
                class="m-md-2"
                variant="outline"
              >
                <option disabled value="">Pilih program</option>
                <option
                  v-for="program in filteredPrograms"
                  :key="program.id"
                  :value="program.id"
                >
                  {{ program.nama }}
                </option>
                <option value="Tambah Program">Tambahkan Program</option>
              </select>
            </div>

            <div class="print-tombol">
              <button type="button" class="print-icon" @click="exportToExcel">
                <b-icon-file-earmark-spreadsheet-fill
                  style="width: 20px; height: 20px"
                ></b-icon-file-earmark-spreadsheet-fill>
              </button>
            </div>

            <div class="tahun">Tahun</div>
            <div class="tahun1">
              <div class="dropdown1">
                <select
                  v-model="selectedYear"
                  class="m-md-2"
                  style="width: 90px; height: 38px"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>

            <div class="box-text-kpi">
              <p class="text-area">{{ selectedProgramName }}</p>
              <div class="additional-text">
                <div class="container-box">
                  <button type="button" class="btn" @click="goToInputPage">
                    <b-icon-plus></b-icon-plus>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-kpi">
              <table class="table table-fixed-width">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Indikator</th>
                    <th>Target</th>
                    <th style="text-align: center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(kpi, index) in filteredKPIData" :key="kpi.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ getProgramKegiatanName(kpi.id_program_kegiatan_kpi) }}
                    </td>
                    <td>
                      <input
                        v-if="isEditing === kpi.id"
                        v-model="kpi.indikator"
                        type="text"
                      />
                      <span v-else>{{ kpi.indikator }}</span>
                    </td>
                    <td>
                      <input
                        v-if="isEditing === kpi.id"
                        v-model="kpi.target"
                        type="text"
                      />
                      <span v-else>{{ kpi.target }}</span>
                    </td>
                    <td style="text-align: center; position: relative">
                      <b-icon-three-dots-vertical
                        style="color: black; cursor: pointer"
                        @click="toggleDropdown(index)"
                      ></b-icon-three-dots-vertical>

                      <!-- Dropdown for actions -->
                      <div
                        v-if="activeRow === index"
                        class="actions-dropdown"
                        style="
                          position: absolute;
                          background-color: white;
                          border: 1px solid #ccc;
                          padding: 5px;
                          border-radius: 3px;
                          z-index: 1000;
                        "
                      >
                        <button
                          style="
                            color: black;
                            background: none;
                            border: none;
                            cursor: pointer;
                          "
                          @click="showConfirmPopup(kpi)"
                        >
                          Delete
                        </button>
                        <button
                          style="
                            color: black;
                            background: none;
                            border: none;
                            cursor: pointer;
                          "
                          @click="toggleEdit(kpi)"
                        >
                          {{ isEditing === kpi.id ? "Save" : "Edit" }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- pop-up notifikasi edit -->
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
          <!-- pop-up notifikasi delete -->
          <div
            v-if="isNotificationDeleteVisible"
            :class="['notification-delete', notificationClass]"
          >
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
                <p class="notification-title">
                  {{ notificationDeleteMessage }}
                </p>
                <p class="notification-content">
                  {{ notificationDeleteDetail }}
                </p>
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

          <!-- Pop-up Konfirmasi Delete Data -->
          <div v-if="confirmDelete" class="confirmation-popup">
            <div class="confirmation-card">
              <b-icon-exclamation-circle-fill
                style="color: #f24e1e; width: 126px; height: 126px"
              ></b-icon-exclamation-circle-fill>
              <p style="font-size: 32px; font-weight: bold">
                Anda yakin ingin menghapus data?
              </p>
              <div class="confirmation-buttons">
                <button
                  @click="deleteRow(selectedKPI)"
                  style="
                    width: 259px;
                    height: 47px;
                    background-color: #967c55;
                    color: white;
                    margin-right: 14px;
                    font-size: 16px;
                    font-weight: bolder;
                  "
                >
                  Hapus
                </button>
                <button
                  @click="closePopup"
                  style="
                    width: 259px;
                    height: 47px;
                    background-color: #a4a4a3;
                    color: black;
                    font-size: 16px;
                    font-weight: bolder;
                  "
                >
                  BATAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";
import * as XLSX from "xlsx"; // Import SheetJS library

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      notificationMessage: "",
      notificationDeleteMessage: "",
      notificationDetail: "",
      notificationDeleteDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
      isNotificationDeleteVisible: false,
      bidangOptions: [],
      programOptions: [],
      filteredPrograms: [],
      kpiData: [], // Untuk menyimpan data KPI
      programKegiatanKPI: [], // Untuk menyimpan data dari /api/programKegiatanKPI

      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),

      isEditing: null, // Track which row is being edited
      activeRow: null,
      confirmDelete: false,
      selectedKPI: null, // Menyimpan KPI yang dipilih untuk konfirmasi hapus
    };
  },
  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchKPIData(); // Panggil metode ini ketika komponen dimuat
    this.fetchProgramKegiatanKPI(); // Panggil metode ini untuk mengambil data programKegiatanKPI
  },
  methods: {
    exportToExcel() {
      // Filter data KPI sesuai dengan program dan tahun yang dipilih
      const filteredData = this.filteredKPIData.map((kpi, index) => ({
        No: index + 1,
        Nama: this.getProgramKegiatanName(kpi.id_program_kegiatan_kpi),
        Indikator: kpi.indikator,
        Target: kpi.target,
      }));

      // Buat worksheet dan workbook
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data KPI");

      // Ekspor workbook ke file Excel
      const fileName = `Data_KPI_${this.selectedProgramName}_${this.selectedYear}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    },

    closeNotification() {
      this.isNotificationVisible = false;
      this.isNotificationDeleteVisible = false;
    },

    toggleDropdown(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
    showConfirmPopup(kpi) {
      this.selectedKPI = kpi; // Menyimpan KPI yang dipilih
      this.confirmDelete = true; // Tampilkan pop-up konfirmasi
    },
    closePopup() {
      this.confirmDelete = false;
      this.selectedKPI = null;
    },
    async deleteRow(kpi) {
      try {
        // Kirim permintaan DELETE ke server
        await axios
          .delete(`/api/keyPerformanceIndicator/${kpi.id}`)
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationDeleteMessage = "Berhasil";
            this.notificationDeleteDetail = "Data berhasil di hapus";
            this.notificationType = "success";
            this.isNotificationDeleteVisible = true;
            setTimeout(() => {
              this.notificationDeleteMessage = "";
              this.notificationDeleteDetail = "";
              this.notificationType = "";
              this.isNotificationDeleteVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.kpiData = this.kpiData.filter((item) => item.id !== kpi.id);
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationDeleteMessage = "Gagal";
            this.notificationDeleteDetail =
              "Gagal menghapus data: " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationDeleteVisible = true;
            console.error("Error:", error.response.data);
          });

        // Hapus data dari tampilan lokal setelah penghapusan berhasil
        this.kpiData = this.kpiData.filter((item) => item.id !== kpi.id);

        // Tutup popup konfirmasi
        this.confirmDelete = false;
        this.selectedKPI = null;
      } catch (error) {
        console.error("Failed to delete data:", error);
        // Tambahkan penanganan kesalahan jika perlu
      }
    },
    toggleEdit(kpi) {
      // Mengganti item dengan kpi
      if (this.isEditing === kpi.id) {
        this.saveData(kpi); // Panggil metode untuk menyimpan data yang diedit
      } else {
        this.isEditing = kpi.id;
      }
    },
    async saveData(kpi) {
      try {
        // Lakukan update data ke server
        await axios
          .put(`/api/keyPerformanceIndicator/${kpi.id}`, {
            indikator: kpi.indikator,
            target: kpi.target,
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di Edit";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.fetchKPIData();
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal edit data " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });
        this.isEditing = null; // Keluar dari mode edit setelah menyimpan
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    async fetchBidangOptions() {
      try {
        const response = await axios.get("/api/bidang");
        this.bidangOptions = response.data;
        const defaultBidang = this.bidangOptions.find(
          (bidang) => bidang.id === 1
        );
        if (defaultBidang) {
          this.selectedBidang = defaultBidang.id;
        }
      } catch (error) {
        console.error("Failed to fetch bidang options:", error);
      }
    },

    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data;
        this.filterPrograms();
      } catch (error) {
        console.error("Failed to fetch program options:", error);
      }
    },

    async fetchKPIData() {
      try {
        const response = await axios.get("/api/keyPerformanceIndicator");
        this.kpiData = response.data; // Simpan data KPI yang diambil dari API
      } catch (error) {
        console.error("Failed to fetch KPI data:", error);
      }
    },

    async fetchProgramKegiatanKPI() {
      try {
        const response = await axios.get("/api/programKegiatanKPI");
        this.programKegiatanKPI = response.data; // Simpan data dari API programKegiatanKPI
      } catch (error) {
        console.error("Failed to fetch Program Kegiatan KPI data:", error);
      }
    },

    goToInputPage() {
      this.$router.push({ path: "/input" });
    },

    filterPrograms() {
      this.filteredPrograms = this.programOptions.filter(
        (program) => program.id_bidang === this.selectedBidang
      );
    },

    navigateToInputProgram() {
      this.$router.push({ path: "/inputprogram" });
    },

    navigateToInputBidang() {
      this.$router.push({ path: "/inputbidang" });
    },

    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },

    getProgramKegiatanName(id) {
      const programKegiatan = this.programKegiatanKPI.find(
        (item) => item.id === id
      );
      return programKegiatan ? programKegiatan.nama : "";
    },
  },

  computed: {
    notificationClass() {
      return {
        notification: this.isNotificationVisible,
        notifications: this.isNotificationDeleteVisible,
        "notification-error": this.notificationType === "error",
        "notification-success": this.notificationType === "success",
      };
    },
    selectedProgramName() {
      const program = this.programOptions.find(
        (program) => program.id === this.selectedProgram
      );
      return program ? program.nama : "";
    },

    filteredKPIData() {
      return this.kpiData.filter((kpi) => {
        const programKegiatan = this.programKegiatanKPI.find(
          (item) => item.id === kpi.id_program_kegiatan_kpi
        );
        return (
          programKegiatan &&
          programKegiatan.id_program === this.selectedProgram &&
          programKegiatan.tahun === this.selectedYear
        );
      });
    },
  },

  watch: {
    selectedProgram(newVal) {
      if (newVal === "Tambah Program") {
        this.navigateToInputProgram();
      } else {
        this.fetchKPIData(); // Ambil data KPI setiap kali program berubah
      }
    },
    selectedBidang(newVal) {
      if (newVal === "Tambah Bidang") {
        this.navigateToInputBidang();
      } else {
        this.filterPrograms();
      }
    },
  },
};
</script>

<style>
input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.dropdown {
  width: auto; /* Atur lebar dropdown agar menyesuaikan dengan panjang teks */
  min-width: 270px; /* Lebar minimum dropdown */
}

.dropdown1 .dropdown-menu {
  width: 100%; /* Menyesuaikan lebar menu dropdown dengan lebar dropdown */
  max-height: 300px; /* Atur tinggi maksimum dropdown jika terdapat banyak opsi */
  overflow-y: auto; /* Aktifkan scroll jika terdapat banyak opsi */
  font-size: 12px;
}

.dropdown .dropdown-menu .dropdown-item {
  white-space: normal; /* Biarkan teks panjang memanjang */
  font-size: 12px;
}

.box-text-kpi {
  height: 40px;
  width: 1120px;
  background-color: #d9d9d9;
  margin-top: 21px; /* Jarak antara kotak dan teks */
  margin-right: 30px;
  margin-left: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between; /* Menempatkan elemen ke ujung kiri dan kanan */
}

.table-kpi {
  width: 1095px; /* Set the width of the table container */
  margin-left: 15px;
}

.table-fixed-width {
  width: 100%; /* Ensure the table takes up the full width of the container */
}

.resume-table th,
.resume-table td {
  width: auto;
}

.resume-table th:nth-child(1),
.resume-table td:nth-child(1) {
  width: 40px; /* Misalnya lebar kolom No. adalah 50px */
}

.total {
  color: black;
  font-weight: bold;
  margin-top: 8px;
}

.additional-text {
  display: flex;
  margin-right: 6px;
}

.nilai {
  color: black;
  font-weight: bold;
  margin-top: 8px;
  margin-right: 13px; /* Adjust margin-right as needed */
}

.container-box .btn {
  display: flex;
  border-radius: 4px;
  margin-top: 5px;
}

.container-box .btn {
  background-color: #967c55;
  justify-content: center; /* Menengahkan secara horizontal */
  align-items: center; /* Menengahkan secara vertikal */
  color: white;
  height: 31px;
  width: 31px;
}

.container-box .btn:hover {
  color: white;
}

.edit-btn {
  height: 31px;
  width: 31px;
  background-color: #967c55;
  color: white;
  border-radius: 4px;
  border: none;
}

.text-area {
  color: black; /* Warna teks di dalam kotak */
  font-weight: bold; /* Ketebalan teks di dalam kotak */
  text-align: start;
  margin-top: 8px;
  margin-left: 13px;
}

.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
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

.dropdown1 {
  margin-top: 14px;
  margin-bottom: 38px;
}

.dropdown1 .m-md-2 {
  border: 1px solid black;
  background-color: white;
}

.tombol {
  display: flex;
  margin-top: 27px;
  margin-left: 5px;
}

.tahun {
  margin-top: 30px;
  margin-left: 15px;
  font-weight: bold;
}

.tombol .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  width: 75px;
  color: white;
}

.tombol .btn:hover {
  color: white;
}

.print .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  width: 30px;
  color: white;
}

.pilihan {
  margin-left: 15px;
}

.pilihan .btn {
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  width: 558px;
  color: white;
  border-radius: 0%;
}

.pilihan .btn.active {
  background-color: #967c55;
  color: white;
}

.pilihan .btn:not(active) {
  background-color: #d9d9d9;
  color: black;
}
</style>
