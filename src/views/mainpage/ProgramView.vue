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
            <div class="dropdown1" style="width: fit-content; height: 38px">
              <select
                v-model="selectedOptionIndex"
                class="m-md-2"
                style="width: fit-content; height: 38px"
              >
                <option
                  v-for="(option, index) in filteredProgramOptions"
                  :key="index"
                  :value="index"
                >
                  {{ option.nama }}
                </option>
              </select>
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
          <div v-for="kegiatan in uniqueProgramKegiatan" :key="kegiatan.id">
            <div class="teks-pelaksanaan">
              <p>{{ kegiatan.program_kegiatan.nama }}</p>
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
                  <tr
                    v-for="detail in kegiatanDetails(kegiatan)"
                    :key="detail.id"
                    style="text-align: left"
                  >
                    <td>{{ detail.penjelasan }}</td>
                    <td>{{ detail.waktu }}</td>
                    <td>{{ detail.tempat }}</td>
                    <td>{{ detail.penyaluran }}</td>
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
          <div v-for="kpi in uniqueKPIBulanan" :key="kpi.id">
            <div class="teks-pelaksanaan">
              <p>{{ kpi.k_p_i.program_kegiatan.nama }}</p>
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
                  <tr v-for="detail in kpiDetails(kpi)" :key="detail.id">
                    <td>{{ detail.k_p_i.indikator }}</td>
                    <td>{{ detail.k_p_i.target }}</td>
                    <td>{{ detail.deskripsi }}</td>
                    <td>{{ detail.capaian }}</td>
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
          <div class="table-container1">
            <table class="table">
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
                  <td colspan="6" style="text-align: center">Tidak ada data</td>
                </tr>
                <tr
                  v-for="(penerima, index) in filteredPenerimaManfaat"
                  :key="penerima.id"
                  style="text-align: left"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ penerima.kategori }}</td>
                  <td>{{ penerima.tipe_rutinitas }}</td>
                  <td>{{ penerima.tipe_penyaluran }}</td>
                  <td>{{ penerima.rencana }}</td>
                  <td>{{ penerima.realisasi }}</td>
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
              Dana yang direncanakan: {{ formatCurrency(totalJumlahRencana) }}
            </p>
            <p class="dana">
              Dana yang digunakan : {{ formatCurrency(totalDanaDigunakan) }}
            </p>
            <p class="dana">
              Saldo :
              {{ formatCurrency(totalJumlahRencana - totalDanaDigunakan) }}
            </p>
          </div>
          <div class="table-container1">
            <table class="table">
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
                <tr v-if="filteredAlokasiDana.length === 0">
                  <td colspan="5" style="text-align: center">Tidak ada data</td>
                </tr>
                <tr
                  v-for="(alokasi, index) in filteredAlokasiDana"
                  :key="alokasi.id"
                  style="text-align: left"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ alokasi.item_kegiatan_r_k_a.uraian }}</td>
                  <td>{{ formatCurrency(alokasi.jumlah_realisasi) }}</td>
                  <td>
                    {{
                      formatCurrency(alokasi.item_kegiatan_r_k_a.nilai_satuan)
                    }}
                  </td>
                  <td>{{ alokasi.item_kegiatan_r_k_a.sumber_dana }}</td>
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
      bidangOptions: [],
      programKegiatan: [],
      laporanBulanan: [],
      kpiBulanan: [],
      penerimaManfaat: [],
      alokasiDana: [],
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
    this.fetchProgramKegiatan();
    this.fetchBidangOptions();
    this.fetchLaporanBulanan();
    this.fetchKPIBulanan();
    this.fetchPenerimaManfaat();
    this.fetchAlokasiDana();
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
      if (
        this.selectedOptionIndex === null ||
        !this.programOptions[this.selectedOptionIndex]
      )
        return [];
      const selectedProgramId =
        this.programOptions[this.selectedOptionIndex].id;
      return this.programKegiatan.filter(
        (kegiatan) =>
          kegiatan.program_kegiatan.id_program === selectedProgramId &&
          kegiatan.program_kegiatan.tahun === this.selectedYear &&
          this.isMatchingLaporanBulanan(kegiatan.id_laporan_bulanan)
      );
    },
    filteredKPIBulanan() {
      if (
        this.selectedOptionIndex === null ||
        !this.programOptions[this.selectedOptionIndex]
      )
        return [];
      const selectedProgramId =
        this.programOptions[this.selectedOptionIndex].id;
      return this.kpiBulanan.filter(
        (kpi) =>
          kpi.k_p_i.program_kegiatan.id_program === selectedProgramId &&
          kpi.k_p_i.program_kegiatan.tahun === this.selectedYear &&
          this.isMatchingLaporanBulanan(kpi.id_laporan_bulanan)
      );
    },
    filteredPenerimaManfaat() {
      return this.penerimaManfaat.filter(
        (penerima) =>
          this.isMatchingLaporanBulanan(penerima.id_laporan_bulanan) &&
          new Date(penerima.created_at).getFullYear() === this.selectedYear
      );
    },
    filteredAlokasiDana() {
      return this.alokasiDana.filter(
        (alokasi) =>
          this.isMatchingLaporanBulanan(alokasi.id_laporan_bulanan) &&
          new Date(alokasi.created_at).getFullYear() === this.selectedYear
      );
    },
    uniqueProgramKegiatan() {
      const seenNames = new Set();
      return this.filteredProgramKegiatan.filter((kegiatan) => {
        const name = kegiatan.program_kegiatan.nama;
        if (seenNames.has(name)) {
          return false;
        } else {
          seenNames.add(name);
          return true;
        }
      });
    },
    uniqueKPIBulanan() {
      const seenNames = new Set();
      return this.filteredKPIBulanan.filter((kpi) => {
        const name = kpi.k_p_i.program_kegiatan.nama;
        if (seenNames.has(name)) {
          return false;
        } else {
          seenNames.add(name);
          return true;
        }
      });
    },
    totalJumlahRencana() {
      return this.filteredAlokasiDana.reduce((total, alokasi) => {
        return total + alokasi.item_kegiatan_r_k_a.nilai_satuan;
      }, 0);
    },
    totalDanaDigunakan() {
      return this.filteredAlokasiDana.reduce((total, alokasi) => {
        return total + alokasi.jumlah_realisasi;
      }, 0);
    },
  },
  watch: {
    selectedBidang() {
      this.selectedOptionIndex = this.getDefaultProgramIndex(); // Reset the selected option when bidang changes
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
      try {
        const response = await axios.get("/api/bidang");
        this.bidangOptions = response.data; // Assuming response.data is an array of bidang options
        this.setDefaultSelectedBidang();
      } catch (error) {
        console.error("Error fetching bidang options:", error);
      }
    },
    async fetchLaporanBulanan() {
      try {
        const response = await axios.get("/api/laporanBulanan");
        this.laporanBulanan = response.data;
      } catch (error) {
        console.error("Error fetching laporan bulanan data:", error);
      }
    },
    async fetchProgramKegiatan() {
      try {
        const response = await axios.get("/api/pelaksanaan");
        this.programKegiatan = response.data;
      } catch (error) {
        console.error("Error fetching program activity data:", error);
      }
    },
    async fetchKPIBulanan() {
      try {
        const response = await axios.get("/api/laporanKPIBulanan");
        this.kpiBulanan = response.data;
      } catch (error) {
        console.error("Error fetching KPI Bulanan data:", error);
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
    async fetchAlokasiDana() {
      try {
        const response = await axios.get("/api/alokasiDana");
        this.alokasiDana = response.data;
      } catch (error) {
        console.error("Error fetching alokasi dana data:", error);
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
    setInitialProgram() {
      this.selectedOptionIndex = this.getDefaultProgramIndex();
    },
    getDefaultProgramIndex() {
      return this.programOptions.findIndex((program) => program.id === 1);
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
    goToInputDeskripsi() {
      this.$router.push({ path: "/inputdeskripsi" });
    },
    goToInputLaporan() {
      this.$router.push({ path: "/inputlaporan" });
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
    kegiatanDetails(kegiatan) {
      return this.programKegiatan.filter(
        (detail) =>
          detail.program_kegiatan.id === kegiatan.program_kegiatan.id &&
          detail.id_program_kegiatan_kpi === kegiatan.id_program_kegiatan_kpi
      );
    },
    kpiDetails(kpi) {
      return this.kpiBulanan.filter((detail) => detail.id === kpi.id);
    },
    isMatchingLaporanBulanan(idLaporanBulanan) {
      const laporanBulanan = this.laporanBulanan.find(
        (laporan) => laporan.id === idLaporanBulanan
      );
      if (!laporanBulanan) return false;
      const bulanLaporan =
        new Date(laporanBulanan.bulan_laporan).getMonth() + 1;
      return bulanLaporan === this.selectedMonth;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
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
