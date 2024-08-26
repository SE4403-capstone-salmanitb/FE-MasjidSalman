<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Laporan / Laporan Rekap</p>
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
                <div class="container-box"></div>
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
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>Mei</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Agust</th>
                    <th>Sep</th>
                    <th>Okt</th>
                    <th>Nov</th>
                    <th>Des</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredData.length === 0">
                    <td colspan="17" style="text-align: center">
                      Tidak ada data
                    </td>
                  </tr>
                  <tr v-for="(kpi, index) in filteredData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ kpi.nama }}</td>
                    <td>{{ kpi.indikator }}</td>
                    <td>{{ kpi.target }}</td>
                    <td>{{ kpi.capaianBulanan[1] }}</td>
                    <td>{{ kpi.capaianBulanan[2] }}</td>
                    <td>{{ kpi.capaianBulanan[3] }}</td>
                    <td>{{ kpi.capaianBulanan[4] }}</td>
                    <td>{{ kpi.capaianBulanan[5] }}</td>
                    <td>{{ kpi.capaianBulanan[6] }}</td>
                    <td>{{ kpi.capaianBulanan[7] }}</td>
                    <td>{{ kpi.capaianBulanan[8] }}</td>
                    <td>{{ kpi.capaianBulanan[9] }}</td>
                    <td>{{ kpi.capaianBulanan[10] }}</td>
                    <td>{{ kpi.capaianBulanan[11] }}</td>
                    <td>{{ kpi.capaianBulanan[12] }}</td>
                  </tr>
                </tbody>
              </table>
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
      laporanBulanan: [],

      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),

      combinedData: [],
      isEditing: null, // Track which row is being edited
      activeRow: null,
      selectedKPI: null, // Properti untuk menyimpan KPI yang dipilih
    };
  },
  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchLaporanBulanan();
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
        this.programKegiatanOptions = response.data.filter(
          (kegiatan) => kegiatan.tahun === this.selectedYear // Filter berdasarkan tahun yang dipilih
        );
      } catch (error) {
        console.error("Failed to fetch program kegiatan KPI:", error);
      }
    },

    async fetchLaporanBulanan() {
      try {
        const response = await axios.get("/api/laporanBulanan");
        this.laporanBulanan = response.data;
      } catch (error) {
        console.error("Failed to fetch laporan bulanan:", error);
      }
    },

    async fetchAndCombineData() {
      try {
        const [
          keyPerformanceIndicatorResponse,
          laporanKPIBulananResponse,
          laporanBulananResponse,
        ] = await Promise.all([
          axios.get("/api/keyPerformanceIndicator"),
          axios.get("/api/laporanKPIBulanan"),
          axios.get("/api/laporanBulanan"),
        ]);

        const keyPerformanceIndicators = keyPerformanceIndicatorResponse.data;
        const laporanKPIBulanan = laporanKPIBulananResponse.data;
        const laporanBulanan = laporanBulananResponse.data;

        // Gabungkan data
        this.combinedData = this.programKegiatanOptions
          .map((kegiatan) => {
            const relatedKPIs = keyPerformanceIndicators
              .filter((kpi) => kpi.id_program_kegiatan_kpi === kegiatan.id)
              .map((kpi) => {
                const laporanBulananKPI = laporanKPIBulanan.filter(
                  (laporan) => laporan.id_kpi === kpi.id
                );

                // Ambil capaian sesuai bulan
                let capaianBulanan = {
                  1: "0",
                  2: "0",
                  3: "0",
                  4: "0",
                  5: "0",
                  6: "0",
                  7: "0",
                  8: "0",
                  9: "0",
                  10: "0",
                  11: "0",
                  12: "0",
                };

                laporanBulananKPI.forEach((laporanKPI) => {
                  const laporanBulananItem = laporanBulanan.find(
                    (laporan) => laporan.id === laporanKPI.id_laporan_bulanan
                  );

                  if (laporanBulananItem) {
                    const bulan =
                      new Date(laporanBulananItem.bulan_laporan).getMonth() + 1;
                    capaianBulanan[bulan] = laporanKPI.capaian;
                  }
                });

                return {
                  ...kpi,
                  capaianBulanan,
                };
              });

            if (relatedKPIs.length > 0) {
              return relatedKPIs.map((kpi) => ({
                ...kegiatan,
                indikator: kpi.indikator,
                target: kpi.target,
                capaianBulanan: kpi.capaianBulanan,
              }));
            } else {
              return {
                ...kegiatan,
                indikator: "",
                target: "",
                capaianBulanan: {},
              };
            }
          })
          .flat();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
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
    exportToExcel() {
      // Ambil data dari tabel yang sudah difilter
      const dataToExport = this.filteredData.map((item, index) => ({
        No: index + 1,
        "Nama Kegiatan": item.nama,
        Indikator: item.indikator,
        Target: item.target,
        Jan: item.capaianBulanan[1],
        Feb: item.capaianBulanan[2],
        Mar: item.capaianBulanan[3],
        Apr: item.capaianBulanan[4],
        Mei: item.capaianBulanan[5],
        Jun: item.capaianBulanan[6],
        Jul: item.capaianBulanan[7],
        Agust: item.capaianBulanan[8],
        Sep: item.capaianBulanan[9],
        Okt: item.capaianBulanan[10],
        Nov: item.capaianBulanan[11],
        Des: item.capaianBulanan[12],
      }));

      // Buat worksheet dari data
      const ws = XLSX.utils.json_to_sheet(dataToExport);

      // Buat workbook dan tambahkan worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Laporan Rekap");

      // Simpan file Excel
      XLSX.writeFile(wb, "Laporan_Rekap.xlsx");
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
      // Filter combinedData berdasarkan id_program
      return this.combinedData.filter(
        (item) => item.id_program === this.selectedProgram
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
    selectedYear() {
      this.fetchProgramKegiatanKPI(); // Refresh data saat tahun berubah
      this.fetchAndCombineData(); // Kombinasi data lagi
    },
  },
};
</script>

<style>
.card1 {
  padding-left: 60px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card1 .card {
  background-color: white;
}

.kepala {
  background-color: #967c55;
  height: 70px;
  width: 1381px;
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

.table-container {
  padding-left: 24px;
  padding-right: 17px;
  padding-top: 39px;
}

.table {
  width: calc(100% - 41px); /* 24px (padding kiri) + 17px (padding kanan) */
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  font-size: 12px;
  font-weight: 600;
}
</style>
