<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Persetujuan akun</p>
        </div>
        <div class="container text-center">
          <div class="box">
            <p class="text">Akun perlu disetujui</p>
          </div>
        </div>
        <div class="tabel-container">
          <table class="tabel">
            <thead>
              <tr>
                <th>nama</th>
                <th>email</th>
                <th>tanggal permintaan</th>
                <th style="text-align: center">persetujuan</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programAkun.length === 0">
                <tr>
                  <td colspan="4" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programAkun" :key="index">
                  <td>{{ program.nama }}</td>
                  <td>{{ program.email }}</td>
                  <td>{{ program.tanggal_permintaan }}</td>
                  <td style="text-align: center">
                    <!-- Tombol Hapus -->
                    <button class="hapus-btn" @click="hapusProgramakun(index)">
                      Hapus
                    </button>
                    <!-- Tombol Setuju -->
                    <button class="setuju-btn" @click="setujuiProgram(index)">
                      Setuju
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="container text-center">
          <div class="box">
            <p class="text">Akun aktif</p>
          </div>
        </div>
        <div class="tabel-container">
          <table class="tabel">
            <thead>
              <tr>
                <th>nama</th>
                <th>email</th>
                <th>terdaftar</th>
                <th style="text-align: center">tindakan</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="programTerdaftar.length === 0">
                <tr>
                  <td colspan="4" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <!-- Isi tabel dapat diperoleh dari data program yang dipilih -->
                <tr v-for="(program, index) in programTerdaftar" :key="index">
                  <td>{{ program.nama }}</td>
                  <td>{{ program.email }}</td>
                  <td>{{ program.terdaftar }}</td>
                  <td style="text-align: center">
                    <button
                      class="hapus-btn"
                      @click="hapusProgramterdaftar(index)"
                    >
                      Hapus
                    </button>
                  </td>
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
      programAkun: [
        // {
        //   nama: "a",
        //   email: "john.doe@example.com",
        //   tanggal_permintaan: "2024-05-27",
        // },
        // {
        //   nama: "b",
        //   email: "john.doe@example.com",
        //   tanggal_permintaan: "2024-05-27",
        // },
        // {
        //   nama: "c",
        //   email: "john.doe@example.com",
        //   tanggal_permintaan: "2024-05-27",
        // },
        // {
        //   nama: "d",
        //   email: "john.doe@example.com",
        //   tanggal_permintaan: "2024-05-27",
        // },
      ],
      programTerdaftar: [
        // {
        //   nama: "1",
        //   email: "john.doe@example.com",
        //   terdaftar: "2024-05-27",
        // },
        // {
        //   nama: "2",
        //   email: "john.doe@example.com",
        //   terdaftar: "2024-05-27",
        // },
        // {
        //   nama: "3",
        //   email: "john.doe@example.com",
        //   terdaftar: "2024-05-27",
        // },
        // {
        //   nama: "4",
        //   email: "john.doe@example.com",
        //   terdaftar: "2024-05-27",
        // },
      ],
    };
  },
  created() {
    // Ketika komponen dimuat, lakukan permintaan HTTP untuk mengambil data program dari server
    axios
      .get("/api/programAkun")
      .then((response) => {
        // Isi array programAkun dengan data yang diterima dari server
        this.programAkun = response.data;
      })
      .catch((error) => {
        console.error("Gagal mengambil data program:", error);
      });
    axios
      .get("/api/programTerdaftar")
      .then((response) => {
        // Isi array programTerdaftar dengan data yang diterima dari server
        this.programTerdaftar = response.data;
      })
      .catch((error) => {
        console.error("Gagal mengambil data program terdaftar:", error);
      });
  },
  methods: {
    hapusProgramakun(index) {
      const program = this.programAkun[index];

      // Lakukan permintaan HTTP DELETE ke endpoint API untuk menghapus data
      axios
        .delete(`/api/program/${program.id}`)
        .then(() => {
          // Jika penghapusan berhasil, hapus data dari array programAkun secara lokal
          this.programAkun.splice(index, 1);
        })
        .catch((error) => {
          // Tangani kesalahan jika penghapusan gagal
          console.error("Gagal menghapus program:", error);
        });
    },
    hapusProgramterdaftar(index) {
      const program = this.programTerdaftar[index];

      // Lakukan permintaan HTTP DELETE ke endpoint API untuk menghapus data
      axios
        .delete(`/api/program/${program.id}`)
        .then(() => {
          // Jika penghapusan berhasil, hapus data dari array programAkun secara lokal
          this.programTerdaftar.splice(index, 1);
        })
        .catch((error) => {
          // Tangani kesalahan jika penghapusan gagal
          console.error("Gagal menghapus program:", error);
        });
    },
    setujuiProgram(index) {
      const program = this.programAkun[index];

      // Lakukan permintaan HTTP DELETE ke endpoint API untuk menghapus data dari tabel "akun disetujui"
      axios
        .delete(`/api/akunDisetujui/${program.id}`)
        .then(() => {
          // Jika penghapusan berhasil, lakukan permintaan HTTP POST ke endpoint API untuk memindahkan data ke tabel "akun aktif"
          axios
            .post(`/api/akunAktif`, program)
            .then(() => {
              // Jika pemindahan berhasil, hapus data dari array programAkun secara lokal
              this.programAkun.splice(index, 1);
            })
            .catch((error) => {
              console.error(
                'Gagal memindahkan data ke tabel "akun aktif":',
                error
              );
            });
        })
        .catch((error) => {
          // Tangani kesalahan jika penghapusan dari tabel "akun disetujui" gagal
          console.error(
            'Gagal menghapus data dari tabel "akun disetujui":',
            error
          );
        });
    },
    // Metode untuk menghapus program
    // hapusProgramakun(index) {
    //   // Hapus program dari array programAkun berdasarkan indeks
    //   this.programAkun.splice(index, 1);
    // },
    // hapusProgramterdaftar(index) {
    //   // Hapus program dari array programAkun berdasarkan indeks
    //   this.programTerdaftar.splice(index, 1);
    // },
    // setujuiProgram(index) {
    //   // Pindahkan program dari array programAkun ke programTerdaftar berdasarkan indeks
    //   this.programTerdaftar.push(this.programAkun[index]);
    //   // Hapus program dari array programAkun berdasarkan indeks
    //   this.programAkun.splice(index, 1);
    // },
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

.card .kepala {
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

.box {
  height: 40px;
  width: 1108px;
  background-color: #d9d9d9;
  margin-top: 24px; /* Jarak antara kotak dan teks */

  margin-bottom: 16px;
  display: flex;
}

.text {
  color: black; /* Warna teks di dalam kotak */
  font-weight: bold; /* Ketebalan teks di dalam kotak */
  text-align: start;
  margin-top: 8px;
  margin-left: 15px;
}

.tabel-container {
  padding-left: 18px;
  padding-top: 22px;
  padding-bottom: 30px;
}

.tabel {
  width: 1110px; /* 24px (padding kiri) + 17px (padding kanan) */
  border-collapse: collapse;
}

.tabel th,
.tabel td {
  border: 1px solid #cccccc;
  padding: 8px;
  font-size: 12px;
}

.tabel th {
  background-color: #c2c2c2;
  font-size: 12px;
  font-weight: 600;
  width: calc(100% / 4); /* Menggunakan 4 karena ada 4 kolom */
}

.hapus-btn,
.setuju-btn {
  width: 67px;
  height: 26px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

/* Gaya tombol Hapus */
.hapus-btn {
  background-color: red;
  margin-left: 12px;
  margin-right: 7px;
}

/* Gaya tombol Setuju */
.setuju-btn {
  background-color: blue;
  margin-right: 12px;
}
</style>
