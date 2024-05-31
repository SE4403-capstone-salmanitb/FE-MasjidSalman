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
            <div class="teks">Program</div>
            <div class="dropdown">
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
                  v-for="(option, index) in options"
                  :key="index"
                >
                  {{ option }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="tombol">
              <button type="button" class="btn">
                Filter<b-icon-funnel-fill></b-icon-funnel-fill>
              </button>
              <div class="print">
                <button type="button" class="btn">
                  <b-icon-printer-fill
                    style="width: 20px; height: 20px"
                  ></b-icon-printer-fill>
                </button>
              </div>
            </div>
          </div>
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
        <div class="box-text">
          <p class="text-area">{{ selectedOption }}</p>
          <div class="additional-text">
            <p class="total">Nilai Total : Rp</p>
            <p class="nilai">100.000.000</p>
            <div class="container-box">
              <button type="button" class="btn" @click="goToInputPage">
                <b-icon-plus></b-icon-plus>
              </button>
            </div>
          </div>
        </div>
        <div class="tabel-container1">
          <table class="tabel" v-if="!showResumeTable">
            <thead>
              <tr>
                <th style="width: 40px">No.</th>
                <!-- Set lebar kolom No. -->
                <th>Program-Kegiatan</th>
                <th>Deskripsi Singkat</th>
                <th>Output/Keluaran</th>
                <th>Nominal Anggaran</th>
                <th style="text-align: center"></th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="
                  programAnggaranByOption &&
                  programAnggaranByOption.length === 0
                "
              >
                <tr>
                  <td colspan="6" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr
                  v-for="(program, index) in programAnggaranByOption"
                  :key="index"
                >
                  <td>{{ program.no }}</td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.program
                    }}</template>
                    <input type="text" v-model="program.program" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.deskripsi
                    }}</template>
                    <input type="text" v-model="program.deskripsi" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.output
                    }}</template>
                    <input type="text" v-model="program.output" v-else />
                  </td>
                  <td>
                    <template v-if="!program.isEditing">{{
                      program.anggaran
                    }}</template>
                    <input type="text" v-model="program.anggaran" v-else />
                  </td>
                  <td style="text-align: center">
                    <!-- Tombol Edit -->
                    <button
                      type="button"
                      class="edit-btn"
                      @click="editProgram(program)"
                    >
                      <b-icon
                        :icon="
                          program.isEditing ? 'save-fill' : 'pencil-square'
                        "
                      ></b-icon>
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <table class="tabel resume-table" v-else>
            <thead>
              <tr>
                <th>No.</th>
                <th>Program-Kegiatan</th>
                <th>Pusat</th>
                <th>RAS</th>
                <th>Kepesertaan</th>
                <th>Pihak Ketiga</th>
                <th>Wakaf Salman</th>
                <th>Total Anggaran</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="
                  programResumeByOption && programResumeByOption.length === 0
                "
              >
                <tr>
                  <td colspan="8" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel saat tombol "Resume" diklik -->
                <tr
                  v-for="(program, index) in programResumeByOption"
                  :key="index"
                >
                  <td>{{ program.no }}</td>
                  <td>{{ program.program }}</td>
                  <td>{{ program.pusat }}</td>
                  <td>{{ program.ras }}</td>
                  <td>{{ program.kepesertaan }}</td>
                  <td>{{ program.pihakKetiga }}</td>
                  <td>{{ program.wakafSalman }}</td>
                  <td>{{ program.totalAnggaran }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "axios";

export default {
  data() {
    return {
      showResumeTable: false,
      // programResume: {
      //   "PROGRAM KEPUSTAKAAN": [
      //     {
      //       no: 1,
      //       program: "Pembangunan Perpustakaan",
      //       pusat: 50000000, // Rp 50.000.000
      //       ras: 10000000, // Rp 10.000.000
      //       kepesertaan: 25000000, // Rp 25.000.000
      //       pihakKetiga: 0, // Rp 0
      //       wakafSalman: 15000000, // Rp 15.000.000
      //       totalAnggaran: 500000000, // Rp 500.000.000
      //     },
      //     {
      //       no: 2,
      //       program: "Peningkatan Literasi",
      //       pusat: 30000000, // Rp 30.000.000
      //       ras: 0, // Rp 0
      //       kepesertaan: 80000000, // Rp 80.000.000
      //       pihakKetiga: 50000000, // Rp 50.000.000
      //       wakafSalman: 0, // Rp 0
      //       totalAnggaran: 300000000, // Rp 300.000.000
      //     },
      //     {
      //       no: 3,
      //       program: "Kampanye Lingkungan",
      //       pusat: 20000000, // Rp 20.000.000
      //       ras: 50000000, // Rp 50.000.000
      //       kepesertaan: 40000000, // Rp 40.000.000
      //       pihakKetiga: 0, // Rp 0
      //       wakafSalman: 20000000, // Rp 20.000.000
      //       totalAnggaran: 200000000, // Rp 200.000.000
      //     },
      //   ],
      //   "PROGRAM INTELEKTUALITAS": [
      //     // Data untuk opsi "PROGRAM INTELEKTUALITAS"
      //     {
      //       no: 1,
      //       program: "c",
      //       pusat: 50000000, // Rp 50.000.000
      //       ras: 10000000, // Rp 10.000.000
      //       kepesertaan: 25000000, // Rp 25.000.000
      //       pihakKetiga: 0, // Rp 0
      //       wakafSalman: 15000000, // Rp 15.000.000
      //       totalAnggaran: 500000000, // Rp 500.000.000
      //     },
      //     {
      //       no: 2,
      //       program: "b",
      //       pusat: 30000000, // Rp 30.000.000
      //       ras: 0, // Rp 0
      //       kepesertaan: 80000000, // Rp 80.000.000
      //       pihakKetiga: 50000000, // Rp 50.000.000
      //       wakafSalman: 0, // Rp 0
      //       totalAnggaran: 300000000, // Rp 300.000.000
      //     },
      //     {
      //       no: 3,
      //       program: "a",
      //       pusat: 20000000, // Rp 20.000.000
      //       ras: 50000000, // Rp 50.000.000
      //       kepesertaan: 40000000, // Rp 40.000.000
      //       pihakKetiga: 0, // Rp 0
      //       wakafSalman: 20000000, // Rp 20.000.000
      //       totalAnggaran: 200000000, // Rp 200.000.000
      //     },
      //   ],
      //   "PROGRAM EKOLITERASI": [
      //     // Data untuk opsi "PROGRAM EKOLITERASI"
      //     {
      //       no: 1,
      //       program: "diac",
      //       pusat: 50000000, // Rp 50.000.000
      //       ras: 10000000, // Rp 10.000.000
      //       kepesertaan: 25000000, // Rp 25.000.000
      //       pihakKetiga: 0, // Rp 0
      //       wakafSalman: 15000000, // Rp 15.000.000
      //       totalAnggaran: 500000000, // Rp 500.000.000
      //     },
      //     {
      //       no: 2,
      //       program: "aku",
      //       pusat: 30000000, // Rp 30.000.000
      //       ras: 0, // Rp 0
      //       kepesertaan: 80000000, // Rp 80.000.000
      //       pihakKetiga: 50000000, // Rp 50.000.000
      //       wakafSalman: 0, // Rp 0
      //       totalAnggaran: 300000000, // Rp 300.000.000
      //     },
      //     {
      //       no: 3,
      //       program: "kamu",
      //       pusat: 20000000, // Rp 20.000.000
      //       ras: 50000000, // Rp 50.000.000
      //       kepesertaan: 40000000, // Rp 40.000.000
      //       pihakKetiga: 0, // Rp 0
      //       wakafSalman: 20000000, // Rp 20.000.000
      //       totalAnggaran: 200000000, // Rp 200.000.000
      //     },
      //   ],
      //   "SUPPORTING SYSTEM": [
      //     // Data untuk opsi "SUPPORTING SYSTEM"
      //   ],
      // },

      // programAnggaran: {
      //   "PROGRAM KEPUSTAKAAN": [
      //     {
      //       no: 1,
      //       program: "Pembangunan Perpustakaan",
      //       deskripsi: "Membangun perpustakaan di setiap desa",
      //       output: "Jumlah perpustakaan yang dibangun",
      //       anggaran: "500.000.000",
      //       isEditing: false,
      //     },
      //     {
      //       no: 2,
      //       program: "Peningkatan Literasi",
      //       deskripsi: "Melakukan pelatihan literasi untuk masyarakat",
      //       output: "Jumlah peserta pelatihan",
      //       anggaran: "300.000.000",
      //       isEditing: false,
      //     },
      //     {
      //       no: 3,
      //       program: "Kampanye Lingkungan",
      //       deskripsi: "Mengadakan kampanye tentang pentingnya lingkungan",
      //       output: "Jumlah orang yang terlibat dalam kampanye",
      //       anggaran: "200.000.000",
      //       isEditing: false,
      //     },
      //   ],
      //   "PROGRAM INTELEKTUALITAS": [
      //     // Data untuk opsi "PROGRAM INTELEKTUALITAS"
      //     {
      //       no: 1,
      //       program: "c",
      //       deskripsi: "Membangun perpustakaan di setiap desa",
      //       output: "Jumlah perpustakaan yang dibangun",
      //       anggaran: "500.000.000",
      //       isEditing: false,
      //     },
      //     {
      //       no: 2,
      //       program: "b",
      //       deskripsi: "Melakukan pelatihan literasi untuk masyarakat",
      //       output: "Jumlah peserta pelatihan",
      //       anggaran: "300.000.000",
      //       isEditing: false,
      //     },
      //     {
      //       no: 3,
      //       program: "a",
      //       deskripsi: "Mengadakan kampanye tentang pentingnya lingkungan",
      //       output: "Jumlah orang yang terlibat dalam kampanye",
      //       anggaran: "200.000.000",
      //       isEditing: false,
      //     },
      //   ],
      //   "PROGRAM EKOLITERASI": [
      //     // Data untuk opsi "PROGRAM EKOLITERASI"
      //     {
      //       no: 1,
      //       program: "dia",
      //       deskripsi: "Membangun perpustakaan di setiap desa",
      //       output: "Jumlah perpustakaan yang dibangun",
      //       anggaran: "500.000.000",
      //       isEditing: false,
      //     },
      //     {
      //       no: 2,
      //       program: "kamu",
      //       deskripsi: "Melakukan pelatihan literasi untuk masyarakat",
      //       output: "Jumlah peserta pelatihan",
      //       anggaran: "300.000.000",
      //       isEditing: false,
      //     },
      //     {
      //       no: 3,
      //       program: "aku",
      //       deskripsi: "Mengadakan kampanye tentang pentingnya lingkungan",
      //       output: "Jumlah orang yang terlibat dalam kampanye",
      //       anggaran: "200.000.000",
      //       isEditing: false,
      //     },
      //   ],
      //   "SUPPORTING SYSTEM": [
      //     // Data untuk opsi "SUPPORTING SYSTEM"
      //   ],
      // },
      programResume: [],
      programAnggaran: [],
      options: [
        "PROGRAM KEPUSTAKAAN",
        "PROGRAM INTELEKTUALITAS",
        "PROGRAM EKOLITERASI",
        "SUPPORTING SYSTEM",
      ],
      selectedOptionIndex: null,
      isPenjelasanActive: true,
      isResumeActive: false,
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.options[this.selectedOptionIndex]
        : "PROGRAM KEPUSTAKAAN";
    },
    programAnggaranByOption() {
      return this.programAnggaran[this.selectedOption];
    },
    programResumeByOption() {
      return this.programResume[this.selectedOption];
    },
  },
  mounted() {
    // Panggil method untuk mendapatkan data program dari database
    this.fetchProgramData();
  },
  methods: {
    fetchProgramData() {
      // Ganti URL dengan endpoint API yang sesuai
      axios
        .get("/api/program")
        .then((response) => {
          this.programAnggaran = response.data.programAnggaran;
          this.programResume = response.data.programResume;
        })
        .catch((error) => {
          console.error("Gagal mengambil data program:", error);
        });
    },
    editProgram(program) {
      // Toggle isEditing saat tombol edit diklik
      program.isEditing = !program.isEditing;
      // Simpan perubahan ke database
      this.saveChanges(program);
      // Lakukan sesuatu dengan program yang diedit
      console.log("Editing program:", program);
    },
    saveChanges(program) {
      // Simpan perubahan ke database
      // Di sini Anda dapat menggunakan metode atau API yang sesuai untuk menyimpan perubahan ke database
      // Misalnya, Anda dapat menggunakan Axios untuk membuat permintaan HTTP ke API Anda
      // dengan payload yang berisi data yang diperbarui.
      // Contoh:
      axios
        .put("/api/program/" + program.id, program)
        .then((response) => {
          console.log("Perubahan disimpan:", response.data);
        })
        .catch((error) => {
          console.error("Gagal menyimpan perubahan:", error);
        });
    },
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/inputrka" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    toggleActive(button) {
      if (button === "penjelasan") {
        this.isPenjelasanActive = true;
        this.isResumeActive = false;
        this.showResumeTable = false;
      } else {
        this.isPenjelasanActive = false;
        this.isResumeActive = true;
        this.showResumeTable = true;
      }
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style>
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

.dropdown {
  margin-top: 14px;
  margin-bottom: 38px;
}

.dropdown .m-md-2 {
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
