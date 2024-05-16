<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>RENCANA KERJA & ANGGARAN / Tahunan / Penjelasan RKA</p>
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
              <button type="button" class="btn" @click="goToInputPage">
                Tambah
              </button>
              <div class="print">
                <button type="button" class="btn">
                  <b-icon-printer-fill></b-icon-printer-fill>
                </button>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <router-link to="#" class="col" @click="showPenjelasan"
                >Penjelasan</router-link
              >
              <router-link to="#" class="col" @click="showResume"
                >Resume</router-link
              >
            </div>
          </div>
          <!-- Tabel Penjelasan -->
          <table v-if="showPenjelasanTable">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Umur</th>
                <th>Alamat</th>
                <th>Agama</th>
              </tr>
            </thead>
            <tbody>
              <!-- Isi tabel penjelasan disini -->
              <tr>
                <td>John Doe</td>
                <td>25</td>
                <td>Jalan Jenderal Sudirman No. 123</td>
                <td>Islam</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>28</td>
                <td>Jalan MH Thamrin No. 456</td>
                <td>Kristen</td>
              </tr>
            </tbody>
          </table>
          <!-- Tabel Resume -->
          <table v-if="showResumeTable">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Kelas</th>
                <th>Hari</th>
                <th>Pakaian</th>
              </tr>
            </thead>
            <tbody>
              <!-- Isi tabel resume disini -->
              <tr>
                <td>2021001</td>
                <td>12A</td>
                <td>Senin</td>
                <td>Seragam Sekolah</td>
              </tr>
              <tr>
                <td>2021002</td>
                <td>10B</td>
                <td>Rabu</td>
                <td>Pakaian Bebas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";

export default {
  data() {
    return {
      options: [
        "PROGRAM KEPUSTAKAAN",
        "PROGRAM INTELEKTUALITAS",
        "PROGRAM EKOLITERASI",
        "SUPPORTING SYSTEM",
      ],
      selectedOptionIndex: null,
      showPenjelasanTable: false,
      showResumeTable: false,
    };
  },
  computed: {
    selectedOption() {
      return this.selectedOptionIndex !== null
        ? this.options[this.selectedOptionIndex]
        : "PROGRAM KEPUSTAKAAN";
    },
  },
  methods: {
    goToInputPage() {
      // Mengarahkan ke halaman input
      this.$router.push({ path: "/input" }); // Ganti '/input' dengan rute yang sesuai di aplikasi Anda
    },
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    // Metode untuk menampilkan tabel penjelasan
    showPenjelasan() {
      this.showPenjelasanTable = true;
      this.showResumeTable = false; // Sembunyikan tabel resume jika sedang ditampilkan
    },
    // Metode untuk menampilkan tabel resume
    showResume() {
      this.showResumeTable = true;
      this.showPenjelasanTable = false; // Sembunyikan tabel penjelasan jika sedang ditampilkan
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style>
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

.print {
  margin-left: 8px;
}

.print .btn {
  background-color: #967c55;
  height: 30px;
  width: 30px;
  align-content: center;
  color: white;
  display: flex; /* Menggunakan flexbox */
  justify-content: center; /* Untuk membuat konten berada di tengah */
  align-items: center; /* Untuk memusatkan vertikal jika diperlukan */
}

.container .row {
  height: 65px;
}

.row .col {
  height: 40px;
  width: 558px;
  font-size: 16px;
  font-weight: bold;
}
</style>
