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
              <button type="button" class="print-icon">
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
                    <p class="total">Nilai Total :</p>
                    <p class="nilai">3</p>
                    <div class="container-box">
                      <button type="button" class="btn">
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

                            <th style="width: 50px; text-align: center"></th>
                            <!-- Tambahkan kolom lain sesuai dengan data yang ada -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in filteredItemKegiatan(
                              judul.id
                            )"
                            :key="item.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <div v-if="item.isEditing">
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
                              <div v-if="item.isEditing">
                                <input
                                  v-model="item.dana_jan"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.dana_jan }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  v-model="item.dana_feb"
                                  type="number"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.dana_feb }}
                              </div>
                            </td>
                            <td style="text-align: center">
                              <button
                                type="button"
                                class="edit-btn"
                                @click="toggleEditMode(item)"
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
              <div
                v-for="(kegiatan, index) in programKegiatanList"
                :key="index"
              >
                <div class="box-text" style="margin-bottom: 10px">
                  <p class="text-area">{{ kegiatan.nama }}</p>
                  <div class="additional-text">
                    <p class="total">Nilai Total :</p>
                    <p class="nilai">3</p>
                    <div class="container-box">
                      <button type="button" class="btn">
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
                          <tr
                            v-for="(item, index) in filteredItemKegiatan(
                              judul.id
                            )"
                            :key="item.id"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>
                              <div v-if="item.isEditing">
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
                              <div v-if="item.isEditing">
                                <input
                                  v-model="item.nilai_satuan"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.nilai_satuan }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
                                <input
                                  v-model="item.quantity"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.quantity }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
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
                              <div v-if="item.isEditing">
                                <input
                                  v-model="item.frequency"
                                  type="text"
                                  style="width: 100%"
                                />
                              </div>
                              <div v-else>
                                {{ item.frequency }}
                              </div>
                            </td>
                            <td>
                              <div v-if="item.isEditing">
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
                            <td>
                              <div v-if="item.isEditing">
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

                            <td style="text-align: center">
                              <button
                                type="button"
                                class="edit-btn"
                                @click="toggleEdit(item)"
                              >
                                <b-icon
                                  :icon="
                                    isEditing ? 'save-fill' : 'pencil-square'
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
    };
  },
  mounted() {
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchJudulKegiatanRKA();
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
    async fetchProgramKegiatanRKA() {
      try {
        const response = await axios.get("/api/programKegiatanRKA");
        this.programKegiatanList = response.data
          .filter((item) => item.id_program === this.selectedProgram)
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
          isEditing: false, // Add an isEditing property to each item
        }));
      } catch (error) {
        console.error("Failed to fetch itemKegiatanRKA:", error);
      }
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
    toggleEditMode(item) {
      if (item.isEditing) {
        // Save changes when toggling off edit mode
        this.saveItemKegiatan(item);
      }
      item.isEditing = !item.isEditing;
    },
    async saveItemKegiatan(item) {
      console.log("Data yang dikirim:", {
        uraian: item.uraian,
        dana_jan: item.dana_jan,
        dana_feb: item.dana_feb,
      });
      try {
        await axios.put(`/api/itemKegiatanRKA/${item.id}`, {
          uraian: item.uraian,
          dana_jan: item.dana_jan,
          dana_feb: item.dana_feb,
          // Tambahkan field lain jika diperlukan
        });
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
  },
  watch: {
    selectedProgram(newVal) {
      if (newVal === "Tambah Program") {
        this.navigateToInputProgram();
      } else {
        this.fetchProgramKegiatanRKA();
        this.fetchItemKegiatanRKA(); // Panggil fungsi ini ketika program dipilih
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
