<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / Penjelasan RKA</p>
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
              <button type="button" class="print-icon" @click="downloadExcel">
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
            <div class="pilihan">
              <button
                type="button"
                class="btn penjelasan-btn"
                :class="{ active: isPenjelasanActive }"
                @click="toggleActive('penjelasan')"
              >
                Penjelasan
              </button>
              <button
                type="button"
                class="btn resume-btn"
                :class="{ active: isResumeActive }"
                @click="toggleActive('resume')"
              >
                Resume
              </button>
            </div>
            <div class="text-box">
              <p class="text-area">{{ selectedProgramName }}</p>
              <div class="additional-text">
                <p class="total" style="margin-right: 5px">
                  Nilai Total : {{ formatCurrency(totalNominalAnggaran) }}
                </p>

                <div class="container-box">
                  <button type="button" class="btn" @click="goToInputPage">
                    <b-icon-plus></b-icon-plus>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-container1" v-if="isPenjelasanActive">
              <table class="tabel">
                <thead>
                  <tr>
                    <th style="width: 40px; font-weight: bold">No</th>
                    <th style="width: 180px; font-weight: bold">
                      Program-Kegiatan
                    </th>
                    <th style="width: 270px; font-weight: bold">
                      Deskripsi Singkat
                    </th>
                    <th style="width: 250px; font-weight: bold">
                      Output/Keluaran
                    </th>
                    <th style="width: 180px; font-weight: bold">
                      Nominal Anggaran
                    </th>
                    <th style="width: 50px; text-align: center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in filteredProgramKegiatanRKA"
                    :key="item.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      <input
                        v-if="isEditing === item.id"
                        v-model="item.nama"
                        type="text"
                      />
                      <span v-else>{{ item.nama }}</span>
                    </td>
                    <td>
                      <input
                        v-if="isEditing === item.id"
                        v-model="item.deskripsi"
                        type="text"
                      />
                      <span v-else>{{ item.deskripsi }}</span>
                    </td>
                    <td>
                      <input
                        v-if="isEditing === item.id"
                        v-model="item.output"
                        type="text"
                      />
                      <span v-else>{{ item.output }}</span>
                    </td>
                    <td>
                      {{ formatCurrency(calculateNominalAnggaran(item.id)) }}
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
                          @click="showConfirmPopup(item)"
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
                          @click="toggleEdit(item)"
                        >
                          {{ isEditing === item.id ? "Save" : "Edit" }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-container1" v-if="isResumeActive">
              <table class="tabel">
                <thead>
                  <tr>
                    <th style="font-weight: bold; width: 40px">No.</th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      Program-Kegiatan
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      Pusat
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      RAS
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      Kepesertaan
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      Pihak Ketiga
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      Wakaf Salman
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 7)">
                      Total Anggaran
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredResumeData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.programNama }}</td>
                    <td>{{ formatCurrency(item.pusat) }}</td>
                    <td>{{ formatCurrency(item.ras) }}</td>
                    <td>{{ formatCurrency(item.kepesertaan) }}</td>
                    <td>{{ formatCurrency(item.pihakKetiga) }}</td>
                    <td>{{ formatCurrency(item.wakafSalman) }}</td>
                    <td>{{ formatCurrency(item.totalAnggaran) }}</td>
                  </tr>
                </tbody>
              </table>
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
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";
import * as XLSX from "xlsx"; // Import the XLSX library

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
      programKegiatanRKA: [],
      itemKegiatanRKA: [],
      judulKegiatanRKA: [],
      filteredPrograms: [],
      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      isPenjelasanActive: true,
      isResumeActive: false,
      isEditing: null, // Track which row is being edited
      activeRow: null,
      confirmDelete: false,
    };
  },
  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchProgramKegiatanRKA();
    this.fetchItemKegiatanRKA();
    this.fetchJudulKegiatanRKA();
  },

  methods: {
    closeNotification() {
      this.isNotificationVisible = false;
      this.isNotificationDeleteVisible = false;
    },
    showConfirmPopup(kpi) {
      this.selectedKPI = kpi; // Menyimpan KPI yang dipilih
      this.confirmDelete = true; // Tampilkan pop-up konfirmasi
    },
    closePopup() {
      this.confirmDelete = false;
    },
    toggleDropdown(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
    async deleteRow(item) {
      try {
        // Panggil API untuk menghapus data berdasarkan ID item
        await axios
          .delete(`/api/programKegiatanRKA/${item.id}`)
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
            this.fetchProgramKegiatanRKA();
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

        // Perbarui data setelah penghapusan
        this.fetchProgramKegiatanRKA();

        // Tutup popup konfirmasi setelah penghapusan berhasil
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
        alert(
          `Gagal menghapus data: ${error.response?.status} - ${
            error.response?.data?.message || error.message
          }`
        );
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
    async fetchProgramKegiatanRKA() {
      try {
        const response = await axios.get("/api/programKegiatanRKA");
        this.programKegiatanRKA = response.data;
      } catch (error) {
        console.error("Failed to fetch program-kegiatan RKA:", error);
      }
    },
    async fetchItemKegiatanRKA() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA");
        this.itemKegiatanRKA = response.data;
      } catch (error) {
        console.error("Failed to fetch item-kegiatan RKA:", error);
      }
    },
    async fetchJudulKegiatanRKA() {
      try {
        const response = await axios.get("/api/judulKegiatanRKA");
        this.judulKegiatanRKA = response.data;
      } catch (error) {
        console.error("Failed to fetch judul-kegiatan RKA:", error);
      }
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
    toggleActive(button) {
      if (button === "penjelasan") {
        this.isPenjelasanActive = true;
        this.isResumeActive = false;
      } else {
        this.isPenjelasanActive = false;
        this.isResumeActive = true;
      }
    },
    toggleEdit(item) {
      if (this.isEditing === item.id) {
        this.saveData(item);
      } else {
        this.isEditing = item.id;
      }
    },
    async saveData(item) {
      try {
        await axios
          .put(`/api/programKegiatanRKA/${item.id}`, {
            nama: item.nama,
            deskripsi: item.deskripsi,
            output: item.output,
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
            this.fetchProgramKegiatanRKA();
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
        this.isEditing = null; // Stop editing
        this.fetchProgramKegiatanRKA();
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    calculateNominalAnggaran(id_program_kegiatan_rka) {
      const matchingJudulKegiatan = this.judulKegiatanRKA.filter(
        (judul) => judul.id_program_kegiatan_rka === id_program_kegiatan_rka
      );

      let total = 0;
      matchingJudulKegiatan.forEach((judul) => {
        const matchingItems = this.itemKegiatanRKA.filter(
          (item) => item.id_judul_kegiatan === judul.id
        );
        matchingItems.forEach((item) => {
          total += item.nilai_satuan * item.quantity * item.frequency;
        });
      });

      return total;
    },
    calculateResumeData() {
      const result = [];

      this.programKegiatanRKA.forEach((program) => {
        if (program.id_program === this.selectedProgram) {
          const programResume = {
            programNama: program.nama,
            pusat: 0,
            ras: 0,
            kepesertaan: 0,
            pihakKetiga: 0,
            wakafSalman: 0,
            totalAnggaran: 0,
            id: program.id,
          };

          const matchingJudulKegiatan = this.judulKegiatanRKA.filter(
            (judul) => judul.id_program_kegiatan_rka === program.id
          );

          matchingJudulKegiatan.forEach((judul) => {
            const matchingItems = this.itemKegiatanRKA.filter(
              (item) => item.id_judul_kegiatan === judul.id
            );

            matchingItems.forEach((item) => {
              const total = item.nilai_satuan * item.quantity * item.frequency;

              programResume.totalAnggaran += total;

              if (item.sumber_dana === "Pusat") {
                programResume.pusat += total;
              } else if (item.sumber_dana === "RAS") {
                programResume.ras += total;
              } else if (item.sumber_dana === "Kepesertaan") {
                programResume.kepesertaan += total;
              } else if (item.sumber_dana === "Pihak Ketiga") {
                programResume.pihakKetiga += total;
              } else if (item.sumber_dana === "Wakaf Salman") {
                programResume.wakafSalman += total;
              }
            });
          });

          result.push(programResume);
        }
      });

      result.sort((a, b) => {
        if (a.id === 1) return -1;
        if (b.id === 1) return 1;
        return 0;
      });

      return result;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    goToInputPage() {
      this.$router.push({ path: "/inputrka" });
    },
    downloadExcel() {
      const wb = XLSX.utils.book_new();

      // Add Penjelasan Sheet
      const penjelasanData = this.filteredProgramKegiatanRKA.map(
        (item, index) => ({
          No: index + 1,
          "Program-Kegiatan": item.nama,
          "Deskripsi Singkat": item.deskripsi,
          "Output/Keluaran": item.output,
          "Nominal Anggaran": this.calculateNominalAnggaran(item.id),
        })
      );
      const penjelasanWS = XLSX.utils.json_to_sheet(penjelasanData);
      XLSX.utils.book_append_sheet(wb, penjelasanWS, "Penjelasan");

      // Add Resume Sheet
      const resumeData = this.filteredResumeData.map((item, index) => ({
        No: index + 1,
        "Program-Kegiatan": item.programNama,
        Pusat: item.pusat,
        RAS: item.ras,
        Kepesertaan: item.kepesertaan,
        "Pihak Ketiga": item.pihakKetiga,
        "Wakaf Salman": item.wakafSalman,
        "Total Anggaran": item.totalAnggaran,
      }));
      const resumeWS = XLSX.utils.json_to_sheet(resumeData);
      XLSX.utils.book_append_sheet(wb, resumeWS, "Resume");

      // Generate the file name with the selected year
      const fileName = `RKA_${this.selectedYear}.xlsx`;

      // Trigger download
      XLSX.writeFile(wb, fileName);
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
    filteredProgramKegiatanRKA() {
      return this.programKegiatanRKA
        .filter(
          (item) =>
            item.id_program === this.selectedProgram &&
            item.tahun === this.selectedYear // Filter berdasarkan tahun yang dipilih
        )
        .sort((a, b) => a.id - b.id);
    },
    selectedProgramName() {
      const program = this.programOptions.find(
        (program) => program.id === this.selectedProgram
      );
      return program ? program.nama : "";
    },
    filteredResumeData() {
      return this.calculateResumeData().sort((a, b) => a.id - b.id);
    },
    totalNominalAnggaran() {
      return this.filteredProgramKegiatanRKA.reduce((total, item) => {
        return total + this.calculateNominalAnggaran(item.id);
      }, 0);
    },
  },

  watch: {
    selectedProgram(newVal) {
      if (newVal === "Tambah Program") {
        this.navigateToInputProgram();
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
.notification-edit,
.notification-delete {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: #f24e1e;
  padding: 15px;
  border-radius: 5px;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.print-icon {
  align-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  color: white;
}

.acc {
  align-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  width: fit-content;
  border-radius: 5px;
  color: white;
}

.icon-konfirmasi {
  text-align: center;
}

.teks-konfirmasi {
  padding-right: 34px;
  padding-left: 34px;
  text-align: center;
  font-size: 28px;
  font-weight: bolder;
}

.info {
  padding-right: 34px;
  padding-left: 34px;
  text-align: center;
  font-size: 14px;
  color: #9b9b9b;
  font-weight: 600;
}

.tombol-konfirmasi {
  text-align: center;
  margin-bottom: 40px;
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

.text-box {
  height: 40px;
  width: 1300px;
  background-color: #d9d9d9;
  margin-top: 21px; /* Jarak antara kotak dan teks */
  margin-right: 15px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between; /* Menempatkan elemen ke ujung kiri dan kanan */
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

.tabel-container1 {
  padding-top: 22px;
  padding-left: 18px;
  padding-bottom: 30px;
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

.tabel {
  margin-bottom: 10px;
}

.tabel th {
  background-color: #f2f2f2;
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

.dropdown1 select,
.b-dropdown {
  width: fit-content;
  height: 38px;
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
