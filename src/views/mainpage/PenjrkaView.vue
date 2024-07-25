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
                  v-model="selectedBidang"
                  class="m-md-2"
                  style="width: fit-content; height: 38px"
                  @change="checkAndNavigate"
                >
                  <option
                    v-for="bidang in bidangOptions"
                    :key="bidang.id"
                    :value="bidang.nama"
                  >
                    {{ bidang.nama }}
                  </option>
                  <option value="Tambah Bidang">Tambah Bidang</option>
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
                  @change="combineData"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>

            <div class="print-tombol">
              <button type="button" class="acc" @click="showAccModal">
                ACC Data
              </button>
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
              <p class="text-area">{{ selectedOption }}</p>
              <div class="additional-text">
                <p class="total">Nilai Total :</p>
                <p class="nilai">{{ formatCurrency(totalAnggaranSum) }}</p>
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
                    v-for="(item, index) in filteredCombinedData"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      <div v-if="item.isEditing">
                        <input v-model="item.namaBuku" />
                      </div>
                      <div v-else>
                        {{ item.namaBuku || "Tidak ada data" }}
                      </div>
                    </td>
                    <td>
                      <div v-if="item.isEditing">
                        <input v-model="item.Deskripsi" />
                      </div>
                      <div v-else>
                        {{ item.Deskripsi || "Tidak ada data" }}
                      </div>
                    </td>
                    <td>
                      <div v-if="item.isEditing">
                        <input v-model="item.Output" />
                      </div>
                      <div v-else>
                        {{ item.Output || "Tidak ada data" }}
                      </div>
                    </td>

                    <td>
                      {{ formatCurrency(item.Anggaran) || "Tidak ada data" }}
                    </td>
                    <td style="text-align: center">
                      <button
                        type="button"
                        class="edit-btn"
                        @click="editProgram(item)"
                      >
                        <b-icon
                          :icon="item.isEditing ? 'save-fill' : 'pencil-square'"
                        ></b-icon>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredCombinedData.length === 0">
                    <td colspan="10">Tidak ada data</td>
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
                  <tr
                    v-for="(item, index) in filteredCombinedData"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.namaBuku || "Tidak ada data" }}</td>
                    <td>{{ formatCurrency(item.Pusat) }}</td>
                    <td>{{ formatCurrency(item.RAS) }}</td>
                    <td>{{ formatCurrency(item.Kepesertaan) }}</td>
                    <td>{{ formatCurrency(item.PihakKetiga) }}</td>
                    <td>{{ formatCurrency(item.WakafSalman) }}</td>
                    <td>{{ formatCurrency(item.TotalAnggaran) }}</td>
                  </tr>
                  <tr v-if="filteredCombinedData.length === 0">
                    <td colspan="8">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <b-modal
      id="acc-modal"
      ref="accModal"
      hide-footer
      title="Konfirmasi ACC Data"
    >
      <!-- <div class="icon-konfirmasi">
        <b-icon-exclamation-circle-fill
          font-scale="5"
          style="color: #967c55; margin-bottom: 25px"
        ></b-icon-exclamation-circle-fill>
      </div> -->

      <p class="teks-konfirmasi" style="margin-bottom: 15px">
        Apakah anda ingin melakukan acc pada data?
      </p>
      <p class="info" style="margin-bottom: 30px">
        Saat anda memilih ya, maka seluruh data tidak akan dapat diubah lagi!
      </p>
      <div class="tombol-konfirmasi">
        <b-button variant="secondary" @click="hideAccModal" style="width: 200px"
          >Tidak</b-button
        >
        <b-button
          style="background-color: #967c55; margin-left: 15px; width: 200px"
          @click="confirmAccData"
          >Ya</b-button
        >
      </div>
    </b-modal>
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
      programKegiatan: [],
      judulKegiatan: [],
      itemKegiatan: [],
      combinedData: [],
      programOptions: [],
      bidangOptions: [], // New data property for bidang options
      selectedOptionIndex: null,
      selectedYear: new Date().getFullYear(),
      selectedBidang: "", // New data property for selected bidang
      years: this.generateYears(),
      totalAnggaranSum: 0,
      isPenjelasanActive: true,
      isResumeActive: false,
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].nama
        : "PROGRAM KEPUSTAKAAN";
    },
    selectedProgramId() {
      return this.selectedOptionIndex !== null
        ? this.programOptions[this.selectedOptionIndex].id
        : null;
    },
    filteredCombinedData() {
      return this.combinedData.filter(
        (item) => item.tahun == this.selectedYear
      );
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
  },
  watch: {
    selectedOptionIndex() {
      this.combineData();
    },
    selectedBidang() {
      this.selectedOptionIndex = null; // Reset the selected option when bidang changes
      this.combineData();
    },
  },
  methods: {
    checkAndNavigate(event) {
      if (event.target.value === "Tambah Bidang") {
        this.navigateToInputBidang();
      }
    },
    navigateToInputBidang() {
      this.$router.push({ path: "/inputbidang" });
    },
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data; // Assuming response.data is an array of program options
        this.setDefaultSelectedOption();
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
    setDefaultSelectedOption() {
      const defaultIndex = this.programOptions.findIndex(
        (option) => option.id === 1
      );
      if (defaultIndex !== -1) {
        this.selectedOptionIndex = defaultIndex;
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
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    navigateToInputProgram() {
      this.$router.push({ path: "/inputprogram" });
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
    async fetchProgramKegiatan() {
      try {
        const response = await axios.get("/api/programKegiatanRKA");
        this.programKegiatan = response.data;
        this.combineData();
        console.log("Data Program kegiatan:", this.programKegiatan);
      } catch (error) {
        console.error("Error fetching program kegiatan:", error);
      }
    },
    async fetchJudulKegiatan() {
      try {
        const response = await axios.get("/api/judulKegiatanRKA");
        this.judulKegiatan = response.data;
        this.combineData();
        console.log("Data Judul kegiatan:", this.judulKegiatan);
      } catch (error) {
        console.error("Error fetching judul kegiatan:", error);
      }
    },
    async fetchItemKegiatan() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA");
        this.itemKegiatan = response.data;
        this.combineData();
        console.log("Data Item kegiatan:", this.itemKegiatan);
      } catch (error) {
        console.error("Error fetching item kegiatan:", error);
      }
    },
    combineData() {
      if (
        this.programKegiatan.length ||
        this.judulKegiatan.length ||
        this.itemKegiatan.length
      ) {
        const combinedArray = [];
        const anggaranMap = {};
        const addedNamaBuku = new Set();

        this.programKegiatan.forEach((program) => {
          if (
            !addedNamaBuku.has(program.nama) &&
            program.id_program === this.selectedProgramId
          ) {
            combinedArray.push({
              namaBuku: program.nama,
              Deskripsi: program.deskripsi,
              Output: program.output,
              tahun: program.tahun,
              Pusat: 0,
              RAS: 0,
              Kepesertaan: 0,
              PihakKetiga: 0,
              WakafSalman: 0,
              TotalAnggaran: 0,
              namaJudul: "Tidak ada data",
              namaUraian: "Tidak ada data",
              nilaiSatuan: "Tidak ada data",
              Quantity: "Tidak ada data",
              Frequency: "Tidak ada data",
              Volume: "Tidak ada data",
              SumberDana: "Tidak ada data",
              Total: 0,
              Anggaran: 0,
              programId: program.id,
              isEditing: false,
            });
            addedNamaBuku.add(program.nama);
          }
          anggaranMap[program.id] = 0;
        });

        this.itemKegiatan.forEach((item) => {
          const matchedJudul = this.judulKegiatan.find(
            (judul) => judul.id === item.id_judul_kegiatan
          );
          const matchedProgram = matchedJudul
            ? this.programKegiatan.find(
                (program) =>
                  program.id === matchedJudul.id_program_kegiatan_rka &&
                  program.id_program === this.selectedProgramId
              )
            : null;
          const total = item.quantity * item.frequency * item.nilai_satuan || 0;

          if (matchedProgram) {
            anggaranMap[matchedProgram.id] += total;
          }

          if (matchedProgram) {
            const programEntry = combinedArray.find(
              (entry) => entry.namaBuku === matchedProgram.nama
            );
            if (programEntry) {
              switch (item.sumber_dana) {
                case "Pusat":
                  programEntry.Pusat += total;
                  break;
                case "RAS":
                  programEntry.RAS += total;
                  break;
                case "Kepesertaan":
                  programEntry.Kepesertaan += total;
                  break;
                case "Pihak Ketiga":
                  programEntry.PihakKetiga += total;
                  break;
                case "Wakaf Salman":
                  programEntry.WakafSalman += total;
                  break;
              }
              programEntry.TotalAnggaran =
                programEntry.Pusat +
                programEntry.RAS +
                programEntry.Kepesertaan +
                programEntry.PihakKetiga +
                programEntry.WakafSalman;
            }
          }
        });

        combinedArray.forEach((item) => {
          if (item.programId) {
            item.Anggaran = anggaranMap[item.programId];
          }
        });

        // Sort the combinedArray by programId
        combinedArray.sort((a, b) => a.programId - b.programId);

        this.combinedData = combinedArray;
        this.totalAnggaranSum = combinedArray.reduce(
          (sum, item) => sum + item.TotalAnggaran,
          0
        );
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
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
    async editProgram(item) {
      if (item.isEditing) {
        try {
          // Save changes to the API
          await axios.put(`/api/programKegiatanRKA/${item.programId}`, {
            nama: item.namaBuku,
            deskripsi: item.Deskripsi,
            output: item.Output,
          });
          console.log("Data saved successfully");
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
      item.isEditing = !item.isEditing;
    },
    goToInputPage() {
      this.$router.push({ path: "/inputrka" });
    },
    downloadExcel() {
      const penjelasanData = this.filteredCombinedData.map((item, index) => ({
        No: index + 1,
        "Program-Kegiatan": item.namaBuku,
        "Deskripsi Singkat": item.Deskripsi,
        "Output/Keluaran": item.Output,
        "Nominal Anggaran": this.formatCurrency(item.Anggaran),
      }));

      const resumeData = this.filteredCombinedData.map((item, index) => ({
        No: index + 1,
        "Program-Kegiatan": item.namaBuku,
        Pusat: this.formatCurrency(item.Pusat),
        RAS: this.formatCurrency(item.RAS),
        Kepesertaan: this.formatCurrency(item.Kepesertaan),
        "Pihak Ketiga": this.formatCurrency(item.PihakKetiga),
        "Wakaf Salman": this.formatCurrency(item.WakafSalman),
        "Total Anggaran": this.formatCurrency(item.TotalAnggaran),
      }));

      // Adding total row to penjelasanData
      const penjelasanTotal = {
        No: "",
        "Program-Kegiatan": "",
        "Deskripsi Singkat": "",
        "Output/Keluaran": "Total",
        "Nominal Anggaran": this.formatCurrency(this.totalAnggaranSum),
      };
      penjelasanData.push(penjelasanTotal);

      // Adding total row to resumeData
      const resumeTotal = {
        No: "",
        "Program-Kegiatan": "Total",
        Pusat: this.formatCurrency(
          this.filteredCombinedData.reduce((sum, item) => sum + item.Pusat, 0)
        ),
        RAS: this.formatCurrency(
          this.filteredCombinedData.reduce((sum, item) => sum + item.RAS, 0)
        ),
        Kepesertaan: this.formatCurrency(
          this.filteredCombinedData.reduce(
            (sum, item) => sum + item.Kepesertaan,
            0
          )
        ),
        "Pihak Ketiga": this.formatCurrency(
          this.filteredCombinedData.reduce(
            (sum, item) => sum + item.PihakKetiga,
            0
          )
        ),
        "Wakaf Salman": this.formatCurrency(
          this.filteredCombinedData.reduce(
            (sum, item) => sum + item.WakafSalman,
            0
          )
        ),
        "Total Anggaran": this.formatCurrency(
          this.filteredCombinedData.reduce(
            (sum, item) => sum + item.TotalAnggaran,
            0
          )
        ),
      };
      resumeData.push(resumeTotal);

      const wb = XLSX.utils.book_new();
      const penjelasanSheet = XLSX.utils.json_to_sheet(penjelasanData);
      const resumeSheet = XLSX.utils.json_to_sheet(resumeData);

      // Auto-fit columns for penjelasanSheet
      const penjelasanCols = Object.keys(penjelasanData[0]).map((key) => ({
        wch: Math.max(
          ...penjelasanData.map((item) => item[key]?.toString().length || 0)
        ),
      }));
      penjelasanSheet["!cols"] = penjelasanCols;

      // Auto-fit columns for resumeSheet
      const resumeCols = Object.keys(resumeData[0]).map((key) => ({
        wch: Math.max(
          ...resumeData.map((item) => item[key]?.toString().length || 0)
        ),
      }));
      resumeSheet["!cols"] = resumeCols;

      XLSX.utils.book_append_sheet(wb, penjelasanSheet, "Penjelasan");
      XLSX.utils.book_append_sheet(wb, resumeSheet, "Resume");

      // Use the selected year in the file name
      const fileName = `Penjelasan_RKA_${this.selectedYear}.xlsx`;

      XLSX.writeFile(wb, fileName);
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
  mounted() {
    this.fetchProgramOptions();
    this.fetchBidangOptions(); // Fetch bidang options when component is mounted
    this.fetchProgramKegiatan();
    this.fetchJudulKegiatan();
    this.fetchItemKegiatan();
  },
};
</script>

<style>
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
