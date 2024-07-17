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
                class="btn bulan-btn"
                :class="{ active: isBulanActive }"
                @click="toggleActive('bulan')"
              >
                Bulan
              </button>
              <button
                type="button"
                class="btn anggaran-btn"
                :class="{ active: isAnggaranActive }"
                @click="toggleActive('anggaran')"
              >
                Anggaran
              </button>
            </div>
            <div v-if="isBulanActive">
              <div v-for="program in filteredProgramKegiatan" :key="program.id">
                <div class="box-text" style="margin-bottom: 10px">
                  <p class="text-area">{{ program.nama }}</p>
                  <div class="additional-text">
                    <p class="total">Nilai Total :</p>
                    <p class="nilai">
                      {{ formatCurrency(totalNilaiByProgramId(program.id)) }}
                    </p>
                    <div class="container-box">
                      <button type="button" class="btn" @click="goToInputPage">
                        <b-icon-plus></b-icon-plus>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    v-for="judul in filteredJudulKegiatan(program.id)"
                    :key="judul.id"
                  >
                    <p class="text-kebutuhan">
                      {{ judul.nama }}
                      <b-icon
                        icon="plus-square"
                        style="color: #967c55"
                        @click="goToInputBulan"
                      ></b-icon>
                    </p>
                    <div class="table-container1">
                      <table class="tabel">
                        <thead>
                          <tr>
                            <th style="width: 40px; font-weight: bold">No</th>
                            <th style="width: 154px; font-weight: bold">
                              Uraian
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Jan
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Feb
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Mar
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Apr
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Mei
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Jun
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Jul
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Agust
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Sep
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Okt
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Nov
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Des
                            </th>
                            <th
                              style="
                                width: calc((100% - 40px) / 13);
                                font-weight: bold;
                              "
                            >
                              Total
                            </th>
                            <th style="width: 50px; text-align: center"></th>
                            <!-- Tambahkan kolom lain sesuai dengan data yang ada -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="filteredItems(judul.id).length === 0">
                            <td colspan="16" class="text-center">
                              Tidak ada data
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in filteredItems(judul.id)"
                            :key="item.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.uraian"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.uraian }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_jan"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_jan
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_feb"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_feb
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_mar"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_mar
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_apr"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_apr
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_mei"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_mei
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_jun"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_jun
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_jul"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_jul
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_aug"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_aug
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_sep"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_sep
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_oct"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_oct
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_nov"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_nov
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.dana_dec"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_dec
                                      ? item.nilai_satuan * item.quantity
                                      : 0
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              {{ calculateTotal(item) }}
                            </td>
                            <td style="text-align: center">
                              <button
                                type="button"
                                class="edit-btn"
                                @click="toggleEdit(item)"
                              >
                                <b-icon
                                  :icon="
                                    item.isEditing
                                      ? 'save-fill'
                                      : 'pencil-square'
                                  "
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
            <div v-else>
              <div v-for="program in filteredProgramKegiatan" :key="program.id">
                <div class="box-text" style="margin-bottom: 10px">
                  <p class="text-area">{{ program.nama }}</p>
                  <div class="additional-text">
                    <p class="total">Nilai Total :</p>
                    <p class="nilai">
                      {{ formatCurrency(totalNilaiByProgramId(program.id)) }}
                    </p>
                    <div class="container-box">
                      <button type="button" class="btn" @click="goToInputPage">
                        <b-icon-plus></b-icon-plus>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    v-for="judul in filteredJudulKegiatan(program.id)"
                    :key="judul.id"
                  >
                    <p class="text-kebutuhan">
                      {{ judul.nama }}
                      <b-icon
                        icon="plus-square"
                        style="color: #967c55"
                        @click="goToInputBulan"
                      ></b-icon>
                    </p>
                    <div class="table-container1">
                      <table class="tabel">
                        <thead>
                          <tr>
                            <th style="font-weight: bold; width: 40px">No</th>
                            <th style="font-weight: bold; width: 225px">
                              Uraian
                            </th>
                            <th style="font-weight: bold; width: 145px">
                              Nilai Satuan
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Qty
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Unt
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Frq
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Unt
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Vol
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Nilai Total
                            </th>
                            <th
                              style="
                                font-weight: bold;
                                width: calc((100% - 40px) / 12);
                              "
                            >
                              Sumber Dana
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-if="filteredItems(judul.id).length === 0">
                            <td colspan="15" class="text-center">
                              Tidak ada data
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in filteredItems(judul.id)"
                            :key="item.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.uraian"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.uraian }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.nilai_satuan"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ formatCurrency(item.nilai_satuan) }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.quantity"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.quantity }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.quantity_unit"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.quantity_unit }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.frequency"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.frequency }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.frequency_unit"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.frequency_unit }}
                              </div>
                            </td>
                            <td>
                              {{ item.quantity * item.frequency }}
                            </td>
                            <td>
                              {{
                                formatCurrency(
                                  item.quantity *
                                    item.frequency *
                                    item.nilai_satuan
                                )
                              }}
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  type="text"
                                  v-model="item.sumber_dana"
                                  class="form-control"
                                />
                              </div>
                              <div v-else>
                                {{ item.sumber_dana }}
                              </div>
                            </td>
                            <td style="text-align: center">
                              <button
                                type="button"
                                class="edit-btn"
                                @click="toggleEdit(item)"
                              >
                                <b-icon
                                  :icon="
                                    item.isEditing
                                      ? 'save-fill'
                                      : 'pencil-square'
                                  "
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
      itemKegiatan: [],
      judulKegiatan: [],
      programKegiatan: [],
      isBulanActive: true,
      isAnggaranActive: false,
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
    filteredProgramKegiatan() {
      if (this.selectedOptionIndex !== null) {
        const selectedProgram = this.programOptions[this.selectedOptionIndex];
        return this.programKegiatan.filter(
          (program) =>
            program.id_program === selectedProgram.id &&
            program.tahun === this.selectedYear
        );
      }
      return [];
    },
    programBulanByOption() {
      return this.programBulan[this.selectedOption];
    },
    programAnggaranByOption() {
      return this.programAnggaran[this.selectedOption];
    },
    filteredJudulKegiatan() {
      return (programId) => {
        return this.judulKegiatan.filter(
          (judul) => judul.id_program_kegiatan_rka === programId
        );
      };
    },
    totalNilaiByProgramId() {
      return (programId) => {
        return this.judulKegiatan
          .filter((judul) => judul.id_program_kegiatan_rka === programId)
          .reduce((total, judul) => {
            const items = this.itemKegiatan.filter(
              (item) => item.id_judul_kegiatan === judul.id
            );
            const totalNilai = items.reduce(
              (sum, item) =>
                sum + item.quantity * item.frequency * item.nilai_satuan,
              0
            );
            return total + totalNilai;
          }, 0);
      };
    },
  },

  methods: {
    async fetchBidangOptions() {
      try {
        const response = await axios.get("/api/bidang");
        this.bidangOptions = response.data;
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
    toggleActive(button) {
      if (button === "bulan") {
        this.isBulanActive = true;
        this.isAnggaranActive = false;
      } else {
        this.isBulanActive = false;
        this.isAnggaranActive = true;
      }
    },
    async fetchItemKegiatan() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA");
        this.itemKegiatan = response.data.map((item) => ({
          ...item,
          isEditing: false,
        }));
        this.sortItemKegiatan();
        console.log("Data item kegiatan:", this.itemKegiatan);
      } catch (error) {
        console.error("Error fetching item kegiatan:", error);
      }
    },
    async fetchJudulKegiatan() {
      try {
        const response = await axios.get("/api/judulKegiatanRKA");
        this.judulKegiatan = response.data;
        this.sortJudulKegiatan();
        console.log("Data judul kegiatan:", this.judulKegiatan);
      } catch (error) {
        console.error("Error fetching judul kegiatan:", error);
      }
    },
    async fetchProgramKegiatan() {
      try {
        const response = await axios.get("/api/programKegiatanRKA");
        this.programKegiatan = response.data;
        this.sortProgramKegiatan();
        console.log("Program Kegiatan kegiatan:", this.programKegiatan);
      } catch (error) {
        console.error("Error fetching program kegiatan:", error);
      }
    },
    sortItemKegiatan() {
      this.itemKegiatan.sort((a, b) => {
        if (a.id === 1) return -1;
        if (b.id === 1) return 1;
        return a.id - b.id;
      });
    },
    sortJudulKegiatan() {
      this.judulKegiatan.sort((a, b) => {
        if (a.id === 1) return -1;
        if (b.id === 1) return 1;
        return a.id - b.id;
      });
    },
    sortProgramKegiatan() {
      this.programKegiatan.sort((a, b) => {
        if (a.id === 1) return -1;
        if (b.id === 1) return 1;
        return a.id - b.id;
      });
    },
    filteredItems(idJudul) {
      return this.itemKegiatan.filter(
        (item) => item.id_judul_kegiatan === idJudul
      );
    },
    toggleEdit(item) {
      if (item.isEditing) {
        this.saveItem(item);
      }
      item.isEditing = !item.isEditing;
    },
    async saveItem(item) {
      try {
        await axios.put(`/api/itemKegiatanRKA/${item.id}`, {
          uraian: item.uraian,
          nilai_satuan: item.nilai_satuan,
          quantity: item.quantity,
          quantity_unit: item.quantity_unit,
          frequency: item.frequency,
          frequency_unit: item.frequency_unit,
          sumber_dana: item.sumber_dana,
        });
        console.log("Item updated successfully");
      } catch (error) {
        console.error("Error saving item:", error);
      }
    },
    navigateToInputProgram() {
      this.$router.push({ path: "/inputprogram" });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputanggaran" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    goToInputBulan() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputbulan" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    setInitialSelectedOption() {
      const initialOptionIndex = this.programOptions.findIndex(
        (option) => option.id === 1
      );
      if (initialOptionIndex !== -1) {
        this.selectedOptionIndex = initialOptionIndex;
      }
    },
    calculateTotal(item) {
      return item.dana_jan
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_feb
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_mar
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_apr
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_mei
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_jun
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_jul
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_aug
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_sep
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_oct
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_nov
        ? item.nilai_satuan * item.quantity
        : 0 + item.dana_dec;
    },
    downloadExcel() {
      const penjelasanData = [];
      const resumeData = [];

      // Mengambil data dari tabel penjelasan
      this.filteredProgramKegiatan.forEach((program) => {
        this.filteredJudulKegiatan(program.id).forEach((judul) => {
          this.filteredItems(judul.id).forEach((item, itemIndex) => {
            penjelasanData.push({
              No: itemIndex + 1,
              Uraian: item.uraian,
              Jan: item.dana_jan ? item.nilai_satuan * item.quantity : 0,
              Feb: item.dana_feb ? item.nilai_satuan * item.quantity : 0,
              Mar: item.dana_mar ? item.nilai_satuan * item.quantity : 0,
              Apr: item.dana_apr ? item.nilai_satuan * item.quantity : 0,
              Mei: item.dana_mei ? item.nilai_satuan * item.quantity : 0,
              Jun: item.dana_jun ? item.nilai_satuan * item.quantity : 0,
              Jul: item.dana_jul ? item.nilai_satuan * item.quantity : 0,
              Agust: item.dana_aug ? item.nilai_satuan * item.quantity : 0,
              Sep: item.dana_sep ? item.nilai_satuan * item.quantity : 0,
              Okt: item.dana_oct ? item.nilai_satuan * item.quantity : 0,
              Nov: item.dana_nov ? item.nilai_satuan * item.quantity : 0,
              Des: item.dana_dec ? item.nilai_satuan * item.quantity : 0,
              Total: this.calculateTotal(item),
            });
          });
        });
      });

      // Mengambil data dari tabel resume
      this.filteredProgramKegiatan.forEach((program) => {
        this.filteredJudulKegiatan(program.id).forEach((judul) => {
          this.filteredItems(judul.id).forEach((item, itemIndex) => {
            resumeData.push({
              No: itemIndex + 1,
              Uraian: item.uraian,
              "Nilai Satuan": this.formatCurrency(item.nilai_satuan),
              Qty: item.quantity,
              "Qty Unit": item.quantity_unit,
              Frq: item.frequency,
              "Frq Unit": item.frequency_unit,
              Vol: item.quantity * item.frequency,
              "Nilai Total": this.formatCurrency(
                item.quantity * item.frequency * item.nilai_satuan
              ),
              "Sumber Dana": item.sumber_dana,
            });
          });
        });
      });

      const wb = XLSX.utils.book_new();
      const penjelasanSheet = XLSX.utils.json_to_sheet(penjelasanData);
      const resumeSheet = XLSX.utils.json_to_sheet(resumeData);

      // Auto-fit columns for penjelasanSheet
      const penjelasanCols = Object.keys(penjelasanData[0] || {}).map(
        (key) => ({
          wch: Math.max(
            ...penjelasanData.map((item) =>
              item[key] ? item[key].toString().length : 0
            )
          ),
        })
      );
      penjelasanSheet["!cols"] = penjelasanCols;

      // Auto-fit columns for resumeSheet
      const resumeCols = Object.keys(resumeData[0] || {}).map((key) => ({
        wch: Math.max(
          ...resumeData.map((item) =>
            item[key] ? item[key].toString().length : 0
          )
        ),
      }));
      resumeSheet["!cols"] = resumeCols;

      XLSX.utils.book_append_sheet(wb, penjelasanSheet, "Penjelasan");
      XLSX.utils.book_append_sheet(wb, resumeSheet, "Resume");

      // Use the selected year in the file name
      const fileName = `RKA_${this.selectedYear}.xlsx`;

      XLSX.writeFile(wb, fileName);
    },
  },
  watch: {
    selectedYear() {
      this.fetchProgramKegiatan();
    },
    selectedBidang() {
      this.selectedOptionIndex = null; // Reset the selected option when bidang changes
    },
  },
  mounted() {
    this.fetchProgramOptions().then(() => {
      this.setInitialSelectedOption();
    });
    this.fetchItemKegiatan();
    this.fetchJudulKegiatan();
    this.fetchProgramKegiatan();
    this.fetchBidangOptions();
  },
};
</script>

<style>
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

.box-text {
  height: 40px;
  width: 1116px;
  background-color: #d9d9d9;
  margin-top: 21px; /* Jarak antara kotak dan teks */
  margin-right: 30px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between; /* Menempatkan elemen ke ujung kiri dan kanan */
}

.table-container1 {
  margin-left: 18px;
  margin-top: 8px;
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

.text-kebutuhan {
  text-align: left;
  margin-left: 15px;
  margin-top: 24px;
  margin-bottom: 0%;
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
