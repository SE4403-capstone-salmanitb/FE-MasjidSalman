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
                    <th>Nama Kegiatan</th>
                    <th>Indikator</th>
                    <th>Target</th>
                    <th style="text-align: center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredData.length === 0">
                    <td colspan="5" style="text-align: center">
                      Tidak ada data
                    </td>
                  </tr>
                  <tr v-for="(kpi, index) in filteredData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ kpi.nama }}</td>
                    <td>{{ kpi.indikator }}</td>
                    <td>{{ kpi.target }}</td>
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
                          @click="showConfirmDeletePopup(kpi)"
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
          <!-- Pop-up Konfirmasi Delete Data -->
          <div>
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
import * as XLSX from "xlsx";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      bidangOptions: [],
      programOptions: [],
      filteredPrograms: [],
      programKegiatanOptions: [],
      keyPerformanceIndicators: [],

      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),

      combinedData: [],
      isEditing: null, // Track which row is being edited
      activeRow: null,
      selectedKPI: null, // Properti untuk menyimpan KPI yang dipilih
      confirmDelete: false,
    };
  },
  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchAndCombineData();
  },
  methods: {
    toggleDropdown(index) {
      this.activeRow = this.activeRow === index ? null : index;
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

    async fetchProgramKegiatanKPI() {
      try {
        const response = await axios.get("/api/programKegiatanKPI");
        this.programKegiatanOptions = response.data;
      } catch (error) {
        console.error("Failed to fetch program kegiatan KPI:", error);
      }
    },
    async fetchAndCombineData() {
      try {
        const [programKegiatanResponse, keyPerformanceIndicatorResponse] =
          await Promise.all([
            axios.get("/api/programKegiatanKPI"),
            axios.get("/api/keyPerformanceIndicator"),
          ]);

        const programKegiatanOptions = programKegiatanResponse.data;
        const keyPerformanceIndicators = keyPerformanceIndicatorResponse.data;

        // Gabungkan data berdasarkan id_program_kegiatan_kpi
        this.combinedData = programKegiatanOptions
          .map((kegiatan) => {
            const relatedKPIs = keyPerformanceIndicators.filter(
              (kpi) => kpi.id_program_kegiatan_kpi === kegiatan.id
            );

            if (relatedKPIs.length > 0) {
              // Jika ada data KPI yang sesuai
              return relatedKPIs.map((kpi) => ({
                ...kegiatan,
                indikator: kpi.indikator,
                target: kpi.target,
              }));
            } else {
              // Jika tidak ada data KPI yang sesuai
              return {
                ...kegiatan,
                indikator: "",
                target: "",
              };
            }
          })
          .flat() // Menggunakan .flat() untuk meratakan array jika ada beberapa KPI
          .sort((a, b) => a.id - b.id); // Mengurutkan data berdasarkan ID secara ascending
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
    exportToExcel() {
      // Ambil data dari tabel yang difilter
      const dataToExport = this.filteredData.map((kpi, index) => ({
        No: index + 1,
        "Nama Kegiatan": kpi.nama,
        Indikator: kpi.indikator,
        Target: kpi.target,
      }));

      // Buat worksheet dari data
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Buat workbook baru dan tambahkan worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "KPI Data");

      // Generate file Excel dan trigger download
      XLSX.writeFile(workbook, `KPI_Data_${this.selectedYear}.xlsx`);
    },
    goToInputPage() {
      this.$router.push({ path: "/input" });
    },
    showConfirmDeletePopup(kpi) {
      this.selectedKPI = kpi; // Simpan KPI yang akan dihapus
      this.confirmDelete = true; // Tampilkan pop-up konfirmasi
    },
    closePopup() {
      this.confirmDelete = false;
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

    toggleEdit(item) {
      if (this.isEditing === item.id) {
        this.saveData(item);
      } else {
        this.isEditing = item.id;
      }
    },

    async deleteRow(kpi) {
      try {
        if (kpi.nama && kpi.indikator && kpi.target) {
          // Hapus data indikator dan target menggunakan API
          await axios.delete(`/api/keyPerformanceIndicator/${kpi.id}`);
          await axios.delete(`/api/programKegiatanKPI/${kpi.id}`);
        } else {
          if (kpi.nama) {
            await axios.delete(`/api/programKegiatanKPI/${kpi.id}`);
          }
          if (kpi.indikator || kpi.target) {
            await axios.delete(`/api/keyPerformanceIndicator/${kpi.id}`);
          }
        }

        // Perbarui data setelah penghapusan
        this.fetchAndCombineData();

        // Tutup pop-up konfirmasi setelah penghapusan berhasil
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
        alert(
          `Failed to delete the row: ${error.response?.status} - ${
            error.response?.data?.message || error.message
          }`
        );
      }
    },
    getIndicatorAndTarget(idKpi) {
      const kpi = this.keyPerformanceIndicators.find(
        (indicator) => indicator.id === idKpi
      );
      return kpi
        ? { indikator: kpi.indikator, target: kpi.target }
        : { indikator: "", target: "" };
    },
  },

  computed: {
    selectedProgramName() {
      const program = this.programOptions.find(
        (program) => program.id === this.selectedProgram
      );
      return program ? program.nama : "";
    },

    filteredKPI() {
      // Filter KPI berdasarkan selectedProgram dan urutkan berdasarkan ID
      return this.programKegiatanOptions
        .filter((kpi) => kpi.id_program === this.selectedProgram)
        .sort((a, b) => a.id - b.id); // Mengurutkan berdasarkan ID secara ascending
    },
    filteredData() {
      // Filter combinedData berdasarkan id_program dan selectedYear
      return this.combinedData.filter(
        (item) =>
          item.id_program === this.selectedProgram &&
          item.tahun === this.selectedYear // Pastikan tahun sesuai dengan yang dipilih
      );
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
