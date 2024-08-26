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
              <div
                v-for="(kegiatan, index) in programKegiatanList"
                :key="index"
              >
                <div class="box-text" style="margin-bottom: 10px">
                  <p class="text-area">{{ kegiatan.nama }}</p>
                  <div class="additional-text">
                    <p class="total" style="margin-right: 12px">
                      Nilai Total :
                      {{ formatCurrency(calculateTotalNilai(kegiatan.id)) }}
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
                    v-for="judul in filteredJudulKegiatan(kegiatan.id)"
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
                      <table
                        class="tabel"
                        style="
                          word-wrap: break-word;
                          width: 75;
                          table-layout: fixed;
                        "
                      >
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
                          <tr
                            v-if="filteredItemKegiatan(judul.id).length === 0"
                          >
                            <td colspan="16" style="text-align: center">
                              Tidak ada data
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in filteredItemKegiatan(
                              judul.id
                            )"
                            :key="item.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.uraian"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.uraian }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_jan"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_jan === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_jan
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_feb"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_feb === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_feb
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_mar"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_mar === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_mar
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_apr"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_apr === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_apr
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_mei"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_mei === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_mei
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_jun"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_jun === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_jun
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_jul"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_jul === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_jul
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_aug"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_aug === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_aug
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_sep"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_sep === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_sep
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_oct"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_oct === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_oct
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_nov"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_nov === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_nov
                                  )
                                }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.dana_dec"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{
                                  formatCurrency(
                                    item.dana_dec === "1"
                                      ? item.nilai_satuan * item.quantity
                                      : item.dana_dec
                                  )
                                }}
                              </div>
                            </td>
                            <td>{{ formatCurrency(calculateTotal(item)) }}</td>
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
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(kegiatan, index) in programKegiatanList"
                :key="index"
              >
                <div class="box-text" style="margin-bottom: 10px">
                  <p class="text-area">{{ kegiatan.nama }}</p>
                  <div class="additional-text">
                    <p class="total" style="margin-right: 12px">
                      Nilai Total :
                      {{ formatCurrency(calculateTotalNilai(kegiatan.id)) }}
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
                    v-for="judul in filteredJudulKegiatan(kegiatan.id)"
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
                            <th style="width: 50px; text-align: center"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-if="filteredItemKegiatan(judul.id).length === 0"
                          >
                            <td colspan="11" style="text-align: center">
                              Tidak ada data
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in filteredItemKegiatan(
                              judul.id
                            )"
                            :key="item.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.uraian"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.uraian }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.nilai_satuan"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ formatCurrency(item.nilai_satuan) }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.quantity"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.quantity }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.quantity_unit"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.quantity_unit }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.frequency"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.frequency }}
                              </div>
                            </td>
                            <td>
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.frequency_unit"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.frequency_unit }}
                              </div>
                            </td>
                            <td>{{ item.quantity * item.frequency }}</td>
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
                              <div v-if="isEditing === item.id">
                                <input
                                  v-model="item.sumber_dana"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.sumber_dana }}
                              </div>
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
                  </div>
                </div>
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
                    @click="deleteRow(selectedItem)"
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
      isBulanActive: true,
      isAnggaranActive: false,
      filteredPrograms: [],
      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      programKegiatanList: [],
      judulKegiatanList: [],
      itemKegiatanList: [],
      confirmDelete: false,
      activeRow: null,
      isEditing: null, // Tambahkan state untuk melacak baris yang sedang diedit
    };
  },

  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchJudulKegiatanRKA();
  },
  methods: {
    showConfirmPopup(item) {
      this.selectedItem = item; // Menyimpan item yang dipilih untuk dihapus
      this.confirmDelete = true; // Menampilkan popup konfirmasi
    },
    closePopup() {
      this.confirmDelete = false;
    },
    toggleDropdown(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
    async deleteRow(item) {
      try {
        // Kirim permintaan DELETE ke server untuk menghapus data berdasarkan ID item
        await axios.delete(`/api/itemKegiatanRKA/${item.id}`);

        // Hapus item dari daftar itemKegiatanList di frontend
        this.itemKegiatanList = this.itemKegiatanList.filter(
          (i) => i.id !== item.id
        );

        // Tutup popup konfirmasi setelah penghapusan berhasil
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
        alert(`Gagal menghapus data: ${error.message}`);
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
        this.programKegiatanList = response.data
          .filter(
            (item) =>
              item.id_program === this.selectedProgram &&
              item.tahun === this.selectedYear // Filter berdasarkan tahun yang dipilih
          )
          .sort((a, b) => a.id - b.id);
      } catch (error) {
        console.error("Failed to fetch programKegiatanRKA:", error);
      }
    },
    async fetchJudulKegiatanRKA() {
      try {
        const response = await axios.get("/api/judulKegiatanRKA");
        this.judulKegiatanList = response.data;
      } catch (error) {
        console.error("Failed to fetch judulKegiatanRKA:", error);
      }
    },
    async fetchItemKegiatanRKA() {
      try {
        const response = await axios.get("/api/itemKegiatanRKA");
        this.itemKegiatanList = response.data.map((item) => ({
          ...item,
          isEditing: false,
        }));
      } catch (error) {
        console.error("Failed to fetch itemKegiatanRKA:", error);
      }
    },
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputanggaran" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    goToInputBulan() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputbulan" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    async downloadExcel() {
      try {
        const bulanData = [];
        const anggaranData = [];

        // Kumpulkan data untuk tampilan Bulan
        this.programKegiatanList.forEach((kegiatan) => {
          const judulKegiatan = this.filteredJudulKegiatan(kegiatan.id);
          judulKegiatan.forEach((judul) => {
            const items = this.filteredItemKegiatan(judul.id);
            items.forEach((item) => {
              bulanData.push({
                Program: kegiatan.nama,
                Judul: judul.nama,
                Uraian: item.uraian,
                Jan: this.formatCurrency(item.dana_jan),
                Feb: this.formatCurrency(item.dana_feb),
                Mar: this.formatCurrency(item.dana_mar),
                Apr: this.formatCurrency(item.dana_apr),
                Mei: this.formatCurrency(item.dana_mei),
                Jun: this.formatCurrency(item.dana_jun),
                Jul: this.formatCurrency(item.dana_jul),
                Agust: this.formatCurrency(item.dana_aug),
                Sep: this.formatCurrency(item.dana_sep),
                Okt: this.formatCurrency(item.dana_oct),
                Nov: this.formatCurrency(item.dana_nov),
                Des: this.formatCurrency(item.dana_dec),
                Total: this.formatCurrency(this.calculateTotal(item)),
              });
            });
          });
        });

        // Kumpulkan data untuk tampilan Anggaran
        this.programKegiatanList.forEach((kegiatan) => {
          const judulKegiatan = this.filteredJudulKegiatan(kegiatan.id);
          judulKegiatan.forEach((judul) => {
            const items = this.filteredItemKegiatan(judul.id);
            items.forEach((item) => {
              anggaranData.push({
                Program: kegiatan.nama,
                Judul: judul.nama,
                Uraian: item.uraian,
                "Nilai Satuan": this.formatCurrency(item.nilai_satuan),
                Qty: item.quantity,
                "Qty Unit": item.quantity_unit,
                Frq: item.frequency,
                "Frq Unit": item.frequency_unit,
                "Total Volume": item.quantity * item.frequency,
                "Nilai Total": this.formatCurrency(
                  item.quantity * item.frequency * item.nilai_satuan
                ),
                "Sumber Dana": item.sumber_dana,
              });
            });
          });
        });

        // Buat worksheet untuk setiap data
        const bulanWorksheet = XLSX.utils.json_to_sheet(bulanData);
        const anggaranWorksheet = XLSX.utils.json_to_sheet(anggaranData);

        // Buat workbook dan tambahkan kedua worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, bulanWorksheet, "Data Bulan");
        XLSX.utils.book_append_sheet(
          workbook,
          anggaranWorksheet,
          "Data Anggaran"
        );

        // Konversi workbook ke file Excel dan unduh
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        const dataBlob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });

        // Buat link untuk mendownload file
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = `Data_RKA_${this.selectedYear}.xlsx`;

        // Klik link untuk memulai download
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
      } catch (error) {
        console.error("Failed to download Excel file:", error);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    filteredJudulKegiatan(id_program_kegiatan_rka) {
      return this.judulKegiatanList
        .filter(
          (judul) => judul.id_program_kegiatan_rka === id_program_kegiatan_rka
        )
        .sort((a, b) => (a.id === 1 ? -1 : b.id === 1 ? 1 : a.id - b.id));
    },
    filteredItemKegiatan(id_judul_kegiatan) {
      return this.itemKegiatanList.filter(
        (item) => item.id_judul_kegiatan === id_judul_kegiatan
      );
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
      if (button === "bulan") {
        this.isBulanActive = true;
        this.isAnggaranActive = false;
      } else {
        this.isBulanActive = false;
        this.isAnggaranActive = true;
      }
    },
    toggleEdit(item) {
      if (this.isEditing === item.id) {
        // Simpan perubahan
        this.saveItemKegiatan(item);
      } else {
        // Masuk ke mode editing
        this.isEditing = item.id;
      }
    },
    async saveItemKegiatan(item) {
      try {
        // Kirim data yang diperbarui ke server
        await axios.put(`/api/itemKegiatanRKA/${item.id}`, {
          uraian: item.uraian,
          dana_jan: item.dana_jan,
          dana_feb: item.dana_feb,
          dana_mar: item.dana_mar,
          dana_apr: item.dana_apr,
          dana_mei: item.dana_mei,
          dana_jun: item.dana_jun,
          dana_jul: item.dana_jul,
          dana_aug: item.dana_aug,
          dana_sep: item.dana_sep,
          dana_oct: item.dana_oct,
          dana_nov: item.dana_nov,
          dana_dec: item.dana_dec,
          nilai_satuan: item.nilai_satuan,
          quantity: item.quantity,
          quantity_unit: item.quantity_unit,
          frequency: item.frequency,
          frequency_unit: item.frequency_unit,
          sumber_dana: item.sumber_dana,
        });
        // Keluar dari mode editing setelah penyimpanan berhasil
        this.isEditing = null;
        // Perbarui daftar item setelah penyimpanan
        this.fetchItemKegiatanRKA();
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    calculateTotalNilai(kegiatanId) {
      let total = 0;

      // Temukan semua judul kegiatan yang sesuai dengan kegiatanId
      const matchingJudulKegiatan = this.judulKegiatanList.filter(
        (judul) => judul.id_program_kegiatan_rka === kegiatanId
      );

      // Loop melalui setiap judul kegiatan dan tambahkan nilai total dari item-item yang sesuai
      matchingJudulKegiatan.forEach((judul) => {
        this.itemKegiatanList.forEach((item) => {
          if (item.id_judul_kegiatan === judul.id) {
            total += this.calculateTotal(item);
          }
        });
      });

      return total;
    },
    calculateTotal(item) {
      return (
        (item.dana_jan === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_feb === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_mar === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_apr === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_mei === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_jun === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_jul === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_aug === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_sep === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_oct === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_nov === "1" ? item.nilai_satuan * item.quantity : 0) +
        (item.dana_dec === "1" ? item.nilai_satuan * item.quantity : 0)
      );
    },
  },
  watch: {
    selectedProgram(newVal) {
      if (newVal === "Tambah Program") {
        this.navigateToInputProgram();
      } else {
        this.fetchProgramKegiatanRKA();
        this.fetchItemKegiatanRKA(); // Refresh item kegiatan saat program berubah
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
      this.fetchProgramKegiatanRKA(); // Refresh data saat tahun berubah
    },
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
