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
                  v-model="selectedBidang"
                  class="m-md-2"
                  style="width: fit-content; height: 38px"
                  @change="mergeData"
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

            <div class="box-text-kpi">
              <p class="text-area">{{ selectedOption }}</p>
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
                  <tr v-for="item in filteredData" :key="item.id">
                    <td>{{ item.program.displayId || "" }}</td>
                    <td>
                      <div v-if="item.isEditing">
                        <input
                          type="text"
                          v-model="item.program.nama"
                          class="form-control"
                          :disabled="
                            item.indikator === 'tidak ada data' &&
                            item.target === 'tidak ada data'
                          "
                        />
                      </div>
                      <div v-else>
                        {{ item.program.displayNama || "" }}
                      </div>
                    </td>
                    <td>
                      <div v-if="item.isEditing">
                        <input
                          type="text"
                          v-model="item.indikator"
                          class="form-control"
                          :disabled="item.indikator === 'tidak ada data'"
                        />
                      </div>
                      <div v-else>
                        {{ item.indikator }}
                      </div>
                    </td>
                    <td>
                      <div v-if="item.isEditing">
                        <input
                          type="text"
                          v-model="item.target"
                          class="form-control"
                          :disabled="item.target === 'tidak ada data'"
                        />
                      </div>
                      <div v-else>
                        {{ item.target }}
                      </div>
                    </td>
                    <td style="text-align: center">
                      <button
                        type="button"
                        class="edit-btn"
                        @click="toggleEdit(item)"
                        :disabled="
                          item.indikator === 'tidak ada data' &&
                          item.target === 'tidak ada data'
                        "
                      >
                        <b-icon
                          :icon="item.isEditing ? 'save-fill' : 'pencil-square'"
                        ></b-icon>
                      </button>
                    </td>
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
      programOptions: [],
      bidangOptions: [],
      selectedBidang: "",
      selectedOptionIndex: null,
      selectedProgramId: null,
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      indicators: [],
      programs: [],
      mergedData: [],
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
    filteredProgramOptions() {
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
    filteredData() {
      return this.mergedData.filter(
        (item) =>
          (this.selectedOptionIndex === null ||
            item.program.id_program ===
              this.programOptions[this.selectedOptionIndex].id) &&
          item.program.tahun === this.selectedYear
      );
    },
  },
  watch: {
    selectedBidang() {
      this.selectedOptionIndex = null; // Reset the selected option when bidang changes
      this.mergeData();
    },
  },
  methods: {
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
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data;
      } catch (error) {
        console.error("Error fetching program options:", error);
      }
    },
    fetchIndicators() {
      axios
        .get("/api/keyPerformanceIndicator")
        .then((response) => {
          this.indicators = response.data.map((item) => ({
            ...item,
            isEditing: false,
          }));
          console.log("KPI DATA:", this.indicators);
          this.fetchPrograms(); // Fetch programs after indicators
        })
        .catch((error) => {
          console.error("Error fetching indicators:", error);
        });
    },
    fetchPrograms() {
      axios
        .get("/api/programKegiatanKPI")
        .then((response) => {
          this.programs = response.data;
          console.log("Program DATA:", this.programs);
          this.mergeData(); // Merge data after fetching programs
        })
        .catch((error) => {
          console.error("Error fetching programs:", error);
        });
    },
    mergeData() {
      // Map indicators with corresponding programs
      let mergedData = this.indicators.map((indicator) => {
        const program = this.programs.find(
          (p) => p.id === indicator.id_program_kegiatan_kpi
        );
        return {
          ...indicator,
          program: program
            ? program
            : {
                id: "Unknown",
                nama: "Unknown",
                tahun: "Unknown",
                id_program: "Unknown",
              },
        };
      });

      // Add programs that do not have corresponding indicators
      this.programs.forEach((program) => {
        const indicatorExists = mergedData.some(
          (item) => item.program.id === program.id
        );
        if (!indicatorExists) {
          mergedData.push({
            id: null,
            indikator: "tidak ada data",
            target: "tidak ada data",
            program: {
              ...program,
            },
          });
        }
      });

      // Move item with id 1 to the top
      mergedData = mergedData.sort((a, b) => {
        if (a.program.id === 1) return -1;
        if (b.program.id === 1) return 1;
        return a.program.id - b.program.id;
      });

      // Blank out duplicate "Nama Kegiatan" and "No"
      let seenIds = new Set();
      let seenNames = new Set();
      mergedData = mergedData.map((item) => {
        const displayId = seenIds.has(item.program.id) ? "" : item.program.id;
        const displayNama = seenNames.has(item.program.nama)
          ? ""
          : item.program.nama;
        seenIds.add(item.program.id);
        seenNames.add(item.program.nama);

        return {
          ...item,
          program: {
            ...item.program,
            displayId,
            displayNama,
          },
        };
      });

      this.mergedData = mergedData;
    },

    toggleEdit(item) {
      if (item.isEditing) {
        this.saveIndicator(item);
        this.saveProgram(item.program);
      }
      item.isEditing = !item.isEditing;
    },
    saveIndicator(item) {
      axios
        .put(`/api/keyPerformanceIndicator/${item.id}`, {
          indikator: item.indikator,
          target: item.target,
        })
        .then((response) => {
          console.log("Indicator saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving indicator:", error);
        });
    },
    saveProgram(program) {
      axios
        .put(`/api/programKegiatanKPI/${program.id}`, {
          nama: program.nama,
        })
        .then((response) => {
          console.log("Program saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving program:", error);
        });
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
    goToInputPage() {
      this.$router.push({ path: "/input" });
    },
    downloadExcel() {
      const kpiData = this.filteredData.map((item, index) => ({
        No: index + 1,
        "Nama Kegiatan": item.program.nama,
        Indikator: item.indikator,
        Target: item.target,
      }));

      const wb = XLSX.utils.book_new();
      const kpiSheet = XLSX.utils.json_to_sheet(kpiData);

      // Auto-fit columns for kpiSheet
      const kpiCols = Object.keys(kpiData[0] || {}).map((key) => ({
        wch: Math.max(
          ...kpiData.map((item) =>
            item[key] ? item[key].toString().length : 0
          )
        ),
      }));
      kpiSheet["!cols"] = kpiCols;

      XLSX.utils.book_append_sheet(wb, kpiSheet, "KPI");

      const fileName = `KPI_${this.selectedYear}.xlsx`;
      XLSX.writeFile(wb, fileName);
    },
    navigateToInputProgram() {
      this.$router.push({ path: "/inputprogram" });
    },
  },
  mounted() {
    this.fetchProgramOptions();
    this.fetchIndicators();
    this.fetchBidangOptions();
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
