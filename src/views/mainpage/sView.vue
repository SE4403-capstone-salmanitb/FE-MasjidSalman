<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Tahunan / RKA</p>
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
          <div
            class="print-tombol"
            style="text-align: start; margin-left: 15px"
          >
            <button
              type="button"
              style="margin-right: 10px"
              class="acc"
              @click="showAccModal"
            >
              Data Program
            </button>
            <button type="button" class="acc" @click="showAccModal">
              ACC Data
            </button>
            <button type="button" class="print-icon" style="margin-left: 10px">
              <b-icon-file-earmark-spreadsheet-fill
                style="width: 20px; height: 20px"
              ></b-icon-file-earmark-spreadsheet-fill>
            </button>
          </div>
          <div class="penyusun">
            <div class="profile-susun"></div>

            <div class="nama-penyusun">
              <p
                style="
                  font-size: 16px;
                  font-weight: 700;
                  color: gray;
                  margin-top: 15px;
                  margin-bottom: 0%;
                "
              >
                Disusun oleh :
              </p>
              <p style="text-align: left; margin-top: 0%">tes</p>
            </div>
          </div>

          <b-modal
            id="acc-modal"
            ref="accModal"
            hide-footer
            title="Konfirmasi ACC Data"
          >
            <p class="teks-konfirmasi" style="margin-bottom: 15px">
              Apakah anda ingin melakukan acc pada data?
            </p>
            <p class="info" style="margin-bottom: 30px">
              Saat anda memilih ya, maka seluruh data tidak akan dapat diubah
              lagi!
            </p>
            <div class="tombol-konfirmasi">
              <b-button
                variant="secondary"
                @click="hideAccModal"
                style="width: 200px"
                >Tidak</b-button
              >
              <b-button
                style="
                  background-color: #967c55;
                  margin-left: 15px;
                  width: 200px;
                "
                @click="confirmAccData"
                >Ya</b-button
              >
            </div>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      bidangOptions: [],
      programOptions: [],

      filteredPrograms: [],
      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      selectedMonth: new Date().getMonth() + 1,
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
    this.fetchBidangOptions();
    this.fetchProgramOptions();
  },
  methods: {
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
    showAccModal() {
      this.$refs.accModal.show();
    },
    hideAccModal() {
      this.$refs.accModal.hide();
    },
    confirmAccData() {
      // Handle the ACC Data confirmation logic here
      this.hideAccModal();
      // Add your logic to handle the ACC Data confirmation here
      console.log("ACC Data confirmed");
    },
  },
  computed: {
    selectedProgramName() {
      const program = this.programOptions.find(
        (program) => program.id === this.selectedProgram
      );
      return program ? program.nama : "";
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
.penyusun {
  display: flex;
  align-content: center;
  align-items: center;
  background-color: red;
}

.profile-susun {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: gray;

  margin-right: 6px;
  margin-left: 15px;
}
</style>
