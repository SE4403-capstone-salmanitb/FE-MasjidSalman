<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Laporan / Laporan Program</p>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="tahun">Bidang</div>
            <div class="tahun1">
              <div class="dropdown1" style="width: fit-content; height: 38px">
                <select
                  v-model="selectedBidang"
                  class="m-md-2"
                  style="width: fit-content; height: 38px"
                >
                  <option
                    v-for="bidang in bidangOptions"
                    :key="bidang.id"
                    :value="bidang.nama"
                  >
                    {{ bidang.nama }}
                  </option>
                </select>
              </div>
            </div>
            <div class="teks">Program</div>
            <div class="dropdown1">
              <b-dropdown
                id="dropdown-1"
                class="m-md-2"
                variant="outline"
                :text="selectedOption"
                v-model="selectedOptionIndex"
                dropup
              >
                <b-dropdown-item
                  @click="selectOption(index)"
                  v-for="(option, index) in filteredProgramOptions"
                  :key="index"
                >
                  {{ option.nama }}
                </b-dropdown-item>
                <b-dropdown-item @click="navigateToInputProgram">
                  Tambahkan Program
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="teks">Bulan</div>
            <div class="bulan1">
              <div class="dropdown1">
                <select
                  v-model="selectedMonth"
                  class="m-md-2"
                  style="width: 120px; height: 38px"
                >
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ month }}
                  </option>
                </select>
              </div>
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
          </div>
          <div class="kotak-deskripsi">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Data Program</p>
            </div>
            <div class="tombol-tambah" @click="goToInputLaporan">
              <b-icon-plus
                style="margin-bottom: 3px"
                @click="goToInputLaporan"
              ></b-icon-plus>
            </div>
          </div>

          <div class="kotak-deskripsi">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Deskripsi Pelaksanaan Kegiatan</p>
            </div>

            <div class="tombol-tambah" @click="goToInputDeskripsi">
              <b-icon-plus
                style="margin-bottom: 3px"
                @click="goToInputDeskripsi"
              ></b-icon-plus>
            </div>
          </div>

          <div v-for="program in filteredProgramKegiatan" :key="program.id">
            <div class="teks-pelaksanaan">
              <p>{{ program.nama }}</p>
            </div>
            <div class="table-container1">
              <table class="table">
                <thead>
                  <tr style="text-align: left">
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Nama
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Waktu
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Tempat
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Penyaluran
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredExecutionData(program.id).length === 0">
                    <td colspan="4">Tidak ada data</td>
                  </tr>
                  <tr
                    v-for="item in filteredExecutionData(program.id)"
                    :key="item.id"
                    style="text-align: left"
                  >
                    <td>{{ item.penjelasan }}</td>
                    <td>{{ item.waktu }}</td>
                    <td>{{ item.tempat }}</td>
                    <td>{{ item.penyaluran }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="kotak-deskripsi" style="margin-top: 24px">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Evaluasi Kegiatan</p>
            </div>
            <div class="tombol-tambah" @click="goToInputEvaluasi">
              <b-icon-plus
                style="margin-bottom: 3px"
                @click="goToInputEvaluasi"
              ></b-icon-plus>
            </div>
          </div>
          <div class="box-evaluasi">
            <p class="text-evaluasi">{{ selectedOption }}</p>
          </div>
          <div v-for="program in filteredProgramKegiatan" :key="program.id">
            <div class="teks-pelaksanaan" style="margin-top: 13px">
              <p>{{ program.nama }}</p>
            </div>
            <div class="table-container1">
              <table class="table">
                <thead>
                  <tr style="text-align: left">
                    <th style="font-weight: bold; width: 188px">Indikator</th>
                    <th style="font-weight: bold; width: 229px">
                      Target Indikator
                    </th>
                    <th style="font-weight: bold; width: 444px">Deskripsi</th>
                    <th style="font-weight: bold; width: 77px">Capaian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredKPIData(program.id).length === 0">
                    <td colspan="4">Tidak ada data</td>
                  </tr>
                  <tr
                    v-for="kpi in filteredKPIData(program.id)"
                    :key="kpi.id"
                    style="text-align: left"
                  >
                    <td>{{ kpi.target }}</td>
                    <td>{{ kpi.indikator }}</td>
                    <td>{{ getKPIDescription(kpi.id) }}</td>
                    <td>{{ getKPICapaian(kpi.id) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="kotak-deskripsi" style="margin-top: 24px">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Penerima Manfaat</p>
            </div>
            <div class="tombol-tambah" @click="goToInputPenerima">
              <b-icon-plus
                style="margin-bottom: 3px"
                @click="goToInputPenerima"
              ></b-icon-plus>
            </div>
          </div>
          <div class="box-evaluasi">
            <p class="text-evaluasi">{{ selectedOption }}</p>
          </div>
          <div
            v-if="filteredPenerimaManfaat.length > 0"
            class="table-container1"
          >
            <table class="tabel">
              <thead>
                <tr style="text-align: left">
                  <th style="font-weight: bold; width: 40px">No</th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    kategori
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Rutinitas
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Penyaluran
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Rencana
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Realisasi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredPenerimaManfaat.length === 0">
                  <td colspan="6">Tidak ada data</td>
                </tr>
                <tr
                  v-for="(item, index) in filteredPenerimaManfaat"
                  :key="item.id"
                  style="text-align: left"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.kategori }}</td>
                  <td>{{ item.tipe_rutinitas }}</td>
                  <td>{{ item.tipe_penyaluran }}</td>
                  <td>{{ item.rencana }}</td>
                  <td>{{ item.realisasi || "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="kotak-deskripsi" style="margin-top: 24px">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Penggunaan Dana</p>
            </div>
            <div class="tombol-tambah" @click="goToInputPengguna">
              <b-icon-plus
                style="margin-bottom: 3px"
                @click="goToInputPengguna"
              ></b-icon-plus>
            </div>
          </div>
          <div class="kotak-dana">
            <p class="dana" style="padding-top: 5px">
              Dana yang direncanakan : {{ formatCurrency(totalRencana) }}
            </p>
            <p class="dana">
              Dana yang digunakan : {{ formatCurrency(totalRealisasi) }}
            </p>
            <p class="dana">
              Saldo : {{ formatCurrency(totalRencana - totalRealisasi) }}
            </p>
          </div>
          <div class="table-container1">
            <table class="tabel">
              <thead>
                <tr style="text-align: left">
                  <th style="font-weight: bold; width: 40px">No</th>
                  <th style="font-weight: bold">kategori Pengeluaran</th>
                  <th style="font-weight: bold">Jumlah Realisasi</th>
                  <th style="font-weight: bold">Jumlah Rencana</th>
                  <th style="font-weight: bold">Sumber Dana</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="itemKegiatanRKA.length === 0">
                  <td colspan="5">Tidak ada data</td>
                </tr>
                <tr
                  v-for="item in itemKegiatanRKA"
                  :key="item.id"
                  style="text-align: left"
                >
                  <td>{{ item.id }}</td>
                  <td>{{ item.uraian }}</td>
                  <td>{{ formatCurrency(getRealisasi(item.id)) }}</td>
                  <td>{{ formatCurrency(item.nilai_satuan) }}</td>
                  <td>{{ item.sumber_dana }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
      programOptions: [],
      executionData: [],
      programKegiatan: [],
      kpiData: [],
      kpiDescriptions: {},
      kpiCapaian: {},
      penerimaManfaat: [],
      itemKegiatanRKA: [],
      alokasiDana: [],
      bidangOptions: [],
      selectedBidang: "",
      selectedOptionIndex: null,
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      years: this.generateYears(),
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    };
  },
  mounted() {
    this.fetchProgramOptions();
    this.fetchExecutionData();
    this.fetchProgramKegiatan();
    this.fetchKPIData();
    this.fetchKPIDescriptions();
    this.fetchKPICapaian();
    this.fetchPenerimaManfaat();
    this.fetchItemKegiatanRKA();
    this.fetchAlokasiDana();
    this.fetchBidangOptions();
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
    filteredProgramOptions() {
      if (!this.selectedBidang) return [];
      return this.programOptions.filter(
        (option) => option.id_bidang === this.selectedBidangId
      );
    },
    selectedBidangId() {
      const selectedBidang = this.bidangOptions.find(
        (bidang) => bidang.nama === this.selectedBidang
      );
      return selectedBidang ? selectedBidang.id : null;
    },
    filteredProgramKegiatan() {
      if (this.selectedOptionIndex === null) return [];
      const selectedProgramId =
        this.programOptions[this.selectedOptionIndex].id;
      return this.programKegiatan.filter((program) => {
        const programYear = new Date(program.updated_at).getFullYear();
        const programMonth = new Date(program.updated_at).getMonth() + 1;
        return (
          program.id_program === selectedProgramId &&
          programYear === this.selectedYear &&
          programMonth === this.selectedMonth
        );
      });
    },
    filteredPenerimaManfaat() {
      if (this.selectedOptionIndex === null) return [];
      const selectedProgramId =
        this.programOptions[this.selectedOptionIndex].id;
      return this.penerimaManfaat.filter((item) => {
        const itemYear = new Date(item.updated_at).getFullYear();
        const itemMonth = new Date(item.updated_at).getMonth() + 1;
        return (
          item.id_laporan_bulanan === selectedProgramId &&
          itemYear === this.selectedYear &&
          itemMonth === this.selectedMonth
        );
      });
    },
    totalRealisasi() {
      return this.alokasiDana.reduce((total, alokasi) => {
        return total + alokasi.jumlah_realisasi;
      }, 0);
    },
    totalRencana() {
      return this.itemKegiatanRKA.reduce((total, item) => {
        return total + item.nilai_satuan;
      }, 0);
    },
  },
  watch: {
    selectedBidang() {
      this.selectedOptionIndex = null; // Reset the selected option when bidang changes
    },
  },
  methods: {
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data;
        this.setInitialProgram();
      } catch (error) {
        console.error("Error fetching program options:", error);
      }
    },
    async fetchBidangOptions() {
      // New method to fetch bidang options
      try {
        const response = await axios.get("/api/bidang");
        this.bidangOptions = response.data; // Assuming response.data is an array of bidang options
        this.setDefaultSelectedBidang();
      } catch (error) {
        console.error("Error fetching bidang options:", error);
      }
    },
    setDefaultSelectedBidang() {
      const defaultBidang = this.bidangOptions.find(
        (option) => option.id === 1
      );
      if (defaultBidang) {
        this.selectedBidang = defaultBidang.nama;
      }
    },
    navigateToInputProgram() {
      this.$router.push({ path: "/inputprogram" });
    },
    async fetchExecutionData() {
      try {
        const response = await axios.get("/api/pelaksanaan");
        this.executionData = response.data;
      } catch (error) {
        console.error("Error fetching execution data:", error);
      }
    },
    async fetchProgramKegiatan() {
      try {
        const response = await axios.get("/api/programKegiatanKPI");
        this.programKegiatan = response.data;
        this.sortProgramKegiatan();
      } catch (error) {
        console.error("Error fetching program activity name:", error);
      }
    },
    async fetchKPIData() {
      try {
        const response = await axios.get("/api/keyPerformanceIndicator");
        this.kpiData = response.data;
      } catch (error) {
        console.error("Error fetching KPI data:", error);
      }
    },
    async fetchKPIDescriptions() {
      try {
        const response = await axios.get("/api/laporanKPIBulanan");
        const data = response.data;
        this.kpiDescriptions = data.reduce((acc, item) => {
          acc[item.id_kpi] = item.deskripsi;
          return acc;
        }, {});
      } catch (error) {
        console.error("Error fetching KPI descriptions:", error);
      }
    },
    async fetchKPICapaian() {
      try {
        const response = await axios.get("/api/laporanKPIBulanan");
        const data = response.data;
        this.kpiCapaian = data.reduce((acc, item) => {
          acc[item.id_kpi] = item.capaian;
          return acc;
        }, {});
      } catch (error) {
        console.error("Error fetching KPI capaian:", error);
      }
    },
    async fetchPenerimaManfaat() {
      try {
        const response = await axios.get("/api/penerimaManfaat");
        this.penerimaManfaat = response.data;
      } catch (error) {
        console.error("Error fetching penerima manfaat data:", error);
      }
    },
    async fetchItemKegiatanRKA() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA");
        this.itemKegiatanRKA = response.data;
        this.sortItemKegiatanRKA();
      } catch (error) {
        console.error("Error fetching item kegiatan RKA data:", error);
      }
    },
    async fetchAlokasiDana() {
      try {
        const response = await axios.get("/api/alokasiDana");
        this.alokasiDana = response.data;
      } catch (error) {
        console.error("Error fetching alokasi dana data:", error);
      }
    },
    sortProgramKegiatan() {
      this.programKegiatan.sort((a, b) => a.id - b.id);
    },
    sortItemKegiatanRKA() {
      this.itemKegiatanRKA.sort((a, b) => a.id - b.id);
    },
    setInitialProgram() {
      const programIndex = this.programOptions.findIndex(
        (program) => program.id === 1
      );
      if (programIndex !== -1) {
        this.selectedOptionIndex = programIndex;
      }
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
    filteredExecutionData(programId) {
      return this.executionData.filter(
        (item) => item.id_program_kegiatan_kpi === programId
      );
    },
    filteredKPIData(programId) {
      return this.kpiData.filter(
        (kpi) => kpi.id_program_kegiatan_kpi === programId
      );
    },
    getKPIDescription(kpiId) {
      return this.kpiDescriptions[kpiId] || "";
    },
    getKPICapaian(kpiId) {
      return this.kpiCapaian[kpiId] || "";
    },
    getRealisasi(itemId) {
      const alokasi = this.alokasiDana.find(
        (alokasi) => alokasi.id_item_rka === itemId
      );
      return alokasi ? alokasi.jumlah_realisasi : "";
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    goToInputDeskripsi() {
      this.$router.push({ path: "/inputdeskripsi" });
    },
    goToInputEvaluasi() {
      this.$router.push({ path: "/inputevaluasi" });
    },
    goToInputPenerima() {
      this.$router.push({ path: "/inputpenerima" });
    },
    goToInputPengguna() {
      this.$router.push({ path: "/inputpengguna" });
    },
    goToInputLaporan() {
      this.$router.push({ path: "/inputlaporan" });
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style>
.teks-pelaksanaan {
  text-align: left;
  font-weight: bold;
  font-size: 14;
  margin-left: 16px;
}

.kotak-deskripsi {
  display: flex;

  margin-left: 16px;
  margin-top: 15px;
  margin-bottom: 24px;
}

.kotak-teks {
  background-color: #967c55;
  width: 265px;
  text-align: left;
  align-content: center;
  align-items: center;
}

.teks-kegiatan {
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 8px;
}

.tombol-tambah {
  margin-left: 4px;
  margin-top: 6px;
  height: 31px;
  width: 31px;
  font-size: 24px;
  color: white;
  background-color: #967c55;
}

.box-evaluasi {
  width: 1100px;
  height: 40px;
  background-color: #d9d9d9;
  margin-left: 14px;
}

.text-evaluasi {
  padding-top: 10px;
  padding-left: 15px;
  text-align: left;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.kotak-dana {
  margin-left: 14px;
  width: 1100px;
  height: 120px;
  background-color: #d9d9d9;
  text-align: left;
}

.dana {
  margin-left: 12px;
  font-weight: bold;
}
</style>
