<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Laporan / Rekap</p>
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
                  <tr v-for="(kpi, index) in filteredKPIData" :key="kpi.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ getProgramKegiatanName(kpi.id_program_kegiatan_kpi) }}
                    </td>
                    <td>
                      {{ kpi.indikator }}
                    </td>
                    <td>
                      {{ kpi.target }}
                    </td>
                    <td>{{ getLaporanBulanan(kpi.id, 1) }}</td>
                    <!-- Jan, id_laporan_bulanan: 1 -->
                    <td>{{ getLaporanBulanan(kpi.id, 2) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 3) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 4) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 5) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 6) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 7) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 8) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 9) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 10) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 11) }}</td>
                    <td>{{ getLaporanBulanan(kpi.id, 12) }}</td>
                    <!-- Feb, id_laporan_bulanan: 2 -->
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
import * as XLSX from "xlsx"; // Import SheetJS library

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      bidangOptions: [],
      programOptions: [],
      filteredPrograms: [],
      laporanKPIBulanan: [],
      kpiData: [], // Untuk menyimpan data KPI
      programKegiatanKPI: [], // Untuk menyimpan data dari /api/programKegiatanKPI

      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),

      selectedKPI: null, // Menyimpan KPI yang dipilih untuk konfirmasi hapus
    };
  },
  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchLaporanKPIBulanan();
    this.fetchKPIData(); // Panggil metode ini ketika komponen dimuat
    this.fetchProgramKegiatanKPI(); // Panggil metode ini untuk mengambil data programKegiatanKPI
  },
  methods: {
    getLaporanBulanan(kpiId, laporanBulananId) {
      if (!this.laporanKPIBulanan || this.laporanKPIBulanan.length === 0) {
        return "-"; // Jika datanya belum tersedia, kembalikan "-"
      }

      const laporan = this.laporanKPIBulanan.find(
        (laporan) =>
          laporan.id_kpi === kpiId &&
          laporan.id_laporan_bulanan === laporanBulananId
      );
      return laporan ? laporan.capaian : "-"; // Tampilkan "-" jika tidak ada data
    },
    async fetchLaporanKPIBulanan() {
      try {
        const response = await axios.get("/api/laporanKPIBulanan");
        this.laporanKPIBulanan = response.data;
      } catch (error) {
        console.error("Failed to fetch Laporan KPI Bulanan data:", error);
      }
    },

    exportToExcel() {
      // Filter data KPI sesuai dengan program dan tahun yang dipilih
      const filteredData = this.filteredKPIData.map((kpi, index) => {
        return {
          No: index + 1,
          Nama: this.getProgramKegiatanName(kpi.id_program_kegiatan_kpi),
          Indikator: kpi.indikator,
          Target: kpi.target,
          Jan: this.getLaporanBulanan(kpi.id, 1),
          Feb: this.getLaporanBulanan(kpi.id, 2),
          Mar: this.getLaporanBulanan(kpi.id, 3),
          Apr: this.getLaporanBulanan(kpi.id, 4),
          Mei: this.getLaporanBulanan(kpi.id, 5),
          Jun: this.getLaporanBulanan(kpi.id, 6),
          Jul: this.getLaporanBulanan(kpi.id, 7),
          Aug: this.getLaporanBulanan(kpi.id, 8),
          Sep: this.getLaporanBulanan(kpi.id, 9),
          Okt: this.getLaporanBulanan(kpi.id, 10),
          Nov: this.getLaporanBulanan(kpi.id, 11),
          Des: this.getLaporanBulanan(kpi.id, 12),
        };
      });

      // Buat worksheet dan workbook
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data KPI");

      // Ekspor workbook ke file Excel
      const fileName = `Data_KPI_${this.selectedProgramName}_${this.selectedYear}.xlsx`;
      XLSX.writeFile(workbook, fileName);
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
