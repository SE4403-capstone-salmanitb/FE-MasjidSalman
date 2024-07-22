<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Persetujuan akun</p>
        </div>
        <div class="show-box">
          <p class="show-text">Show</p>
          <select
            @change="handleChange"
            v-model="itemsPerPage"
            style="margin-top: 18px"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th style="font-weight: bold">Name</th>
                <th style="font-weight: bold">Email</th>
                <th style="width: 170px; font-weight: bold">Tipe User</th>
                <th style="width: 170px; font-weight: bold">
                  Email Verifikasi
                </th>
                <th style="width: 50px; text-align: center; font-weight: bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="paginatedDataAkun.length === 0">
                <tr>
                  <td colspan="5" class="text-center">Data masih kosong</td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(account, index) in paginatedDataAkun" :key="index">
                  <td>{{ account.name }}</td>
                  <td>{{ account.email }}</td>
                  <td
                    :class="{
                      'admin-color': account.tipe_user === 'Admin',
                      'pengguna-color': account.tipe_user === 'Pengguna',
                    }"
                    style="text-align: center"
                  >
                    {{ account.tipe_user }}
                  </td>
                  <td
                    :class="{
                      'verified-color':
                        account.verification === 'Terverifikasi',
                      'not-verified-color':
                        account.verification === 'Tidak Terverifikasi',
                    }"
                    style="text-align: center"
                  >
                    {{ account.verification }}
                  </td>
                  <td style="text-align: center; position: relative">
                    <b-icon-three-dots-vertical
                      style="color: black"
                      @click="toggleActions(index)"
                    ></b-icon-three-dots-vertical>

                    <div
                      v-if="activeRow === index"
                      class="actions-dropdown"
                      style="width: max-content"
                    >
                      <button
                        @click="deleteUser(account, index)"
                        style="color: black"
                      >
                        Delete
                      </button>
                      <button
                        v-if="account.tipe_user === 'Pengguna'"
                        style="color: black"
                        @click="toggleAdminStatus(account.id)"
                      >
                        Jadikan Admin
                      </button>
                      <button
                        v-else
                        style="color: black"
                        @click="toggleAdminStatus(account.id)"
                      >
                        Jadikan Pengguna
                      </button>
                      <button
                        v-if="account.verification === 'Tidak Terverifikasi'"
                        style="color: black"
                        @click="sendVerificationLink(account.id)"
                      >
                        Link Verification
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="tombol1">
          <button
            type="button"
            class="btn"
            style="margin-bottom: 210px; margin-right: 14px"
            @click="showRegisterPopup"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
    <!-- Pop-up Konfirmasi -->
    <div v-if="confirmDelete !== null" class="confirmation-popup">
      <div class="confirmation-card">
        <b-icon-exclamation-circle-fill
          style="color: #f24e1e; width: 126px; height: 126px"
        ></b-icon-exclamation-circle-fill>
        <p style="font-size: 32px; font-weight: bold">
          Anda yakin menghapus akun?
        </p>
        <div class="confirmation-buttons">
          <button
            @click="deleteConfirmed"
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
            HAPUS
          </button>
          <button
            @click="cancelDelete"
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
    <!-- Pop-up Register -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="kartu-login">
        <b-icon-x
          style="width: 30px; height: 30px; margin-left: 550px"
          @click="closePopup"
        ></b-icon-x>
        <p class="regist">Registrasi</p>

        <div class="inputan">
          <input
            v-model="form.name"
            type="text"
            placeholder="Username"
            autocomplete="username"
            required
          />
        </div>
        <div class="inputan">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter your password"
            required
          />
          <b-icon-eye-fill
            style="
              width: 24px;
              height: 14px;
              margin-right: 23px;
              cursor: pointer;
              margin-top: 15px;
              padding-left: 32px;
            "
            @click="togglePasswordVisibility"
          ></b-icon-eye-fill>
        </div>
        <div class="inputan">
          <input
            v-model="form.password_confirmation"
            :type="showPassword ? 'text' : 'password'"
            id="password_confirmation"
            placeholder="Re-Enter your password"
            required
          />
          <b-icon-eye-fill
            style="
              width: 24px;
              height: 14px;
              margin-right: 23px;
              cursor: pointer;
              margin-top: 15px;
              padding-left: 32px;
            "
            @click="togglePasswordVisibility"
          ></b-icon-eye-fill>
        </div>
        <div class="inputan">
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="inputan">
          <input
            v-model="form.profile_picture"
            type="text"
            placeholder="Profile_picture"
            required
            readonly
          />
        </div>

        <div
          class="tombol-submit"
          type="submit"
          @click="store"
          style="margin-bottom: 80px"
        >
          Daftarkan
        </div>
        <!-- Error messages -->
        <div
          v-if="Object.keys(registerErrors).length > 0"
          class="error-messages"
        >
          <p
            v-for="(error, key) in registerErrors"
            :key="key"
            style="color: red; margin-top: 5px"
          >
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <!-- Pop-up Verification Link Sent -->
    <div v-if="showVerificationPopup" class="popup-overlay">
      <div class="verification-card">
        <b-icon-check-circle-fill
          style="color: #4caf50; width: 126px; height: 126px"
        ></b-icon-check-circle-fill>
        <p style="font-size: 32px; font-weight: bold">
          Link verifikasi telah dikirimkan ke email kamu.
        </p>
        <p style="font-size: 18px">
          Segera cek email dan klik tombol "Verifikasi Email" agar bisa
          melanjutkan proses pendaftaran akun anda.
        </p>
        <div class="verification-buttons">
          <button
            @click="resendVerificationLink"
            style="
              width: 259px;
              height: 47px;
              background-color: #967c55;
              color: white;
              font-size: 16px;
              font-weight: bolder;
              border-radiu: 8px;
              margin-bottom: 10px;
            "
          >
            Kirim Ulang Link
          </button>
        </div>
        <div class="verification-buttons">
          <button
            @click="closePopup"
            style="
              width: 259px;
              height: 47px;
              background-color: #967c55;
              color: white;
              font-size: 16px;
              font-weight: bolder;
              border-radius: 8px;
            "
          >
            Kembali
          </button>
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
      dataAkun: [],
      itemsPerPage: 5, // Default jumlah item per halaman
      activeRow: null, // To track which row's actions dropdown is open
      confirmDelete: null, // Untuk melacak pengguna yang akan dihapus
      showPopup: false, // Untuk menampilkan pop-up register
      showVerificationPopup: false, // Untuk menampilkan pop-up verifikasi
      form: {
        name: "",
        password: "",
        password_confirmation: "",
        email: "",
        profile_picture: "https://i.ibb.co.com/2qXwjX3/default-blue1.png",
      },
      showPassword: false, // Untuk toggle visibilitas password
      registerErrors: {}, // Untuk menyimpan pesan error
    };
  },

  components: {
    Sidebar,
  },

  computed: {
    paginatedDataAkun() {
      return this.dataAkun.slice(0, this.itemsPerPage);
    },
  },

  methods: {
    toggleActions(index) {
      if (this.activeRow === index) {
        this.activeRow = null; // Tutup dropdown jika sudah terbuka
      } else {
        this.activeRow = index; // Buka dropdown untuk baris yang diklik
      }
    },
    deleteUser(account, index) {
      // Tampilkan pop-up konfirmasi
      this.confirmDelete = {
        index: index,
        id: account.id,
      };
    },
    deleteConfirmed() {
      // Implementasikan logika untuk menghapus pengguna
      if (this.confirmDelete !== null) {
        const userId = this.confirmDelete.id;
        axios
          .get(`/verify-delete/${userId}`, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          })
          .then((response) => {
            console.log("Delete verified for user:", userId);
            // Implementasikan logika hapus di sini, misalnya memanggil API atau memodifikasi data secara langsung
            this.dataAkun.splice(this.confirmDelete.index, 1);
            this.confirmDelete = null; // Tutup pop-up konfirmasi
            console.log(response);
          })
          .catch((error) => {
            console.error("Error verifying delete:", error);
          });
      }
    },
    cancelDelete() {
      // Batalkan penghapusan
      this.confirmDelete = null;
    },
    handleChange() {
      // Implementasikan logika untuk menangani perubahan jumlah item per halaman
    },
    fetchDataFromApi() {
      // Contoh fungsi untuk mengambil data dari API dengan Axios
      axios
        .get("/user")
        .then((response) => {
          this.dataAkun = response.data.map((account) => ({
            ...account,
            tipe_user: account.is_admin === 1 ? "Admin" : "Pengguna",
            verification: account.email_verified_at
              ? "Terverifikasi"
              : "Tidak Terverifikasi",
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    showRegisterPopup() {
      this.showPopup = true;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    closePopup() {
      this.showPopup = false;
      this.showVerificationPopup = false;
    },
    store() {
      // Implementasi untuk menyimpan data register baru
      axios
        .post("/register", this.form, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearer"),
          },
        })
        .then((response) => {
          console.log("User registered successfully:", response.data);
          this.showPopup = false; // Tutup pop-up setelah submit
          this.showVerificationPopup = true; // Tampilkan pop-up verifikasi
          this.registerErrors = {}; // Clear previous errors
          // Optionally, refresh the account list or update the state
          this.fetchDataFromApi();
        })
        .catch((error) => {
          if (error.response) {
            this.registerErrors = error.response.data.errors; // Assign error messages
            console.log("Error registering user:", error.response.data);
          } else {
            console.log("Error registering user:", error.message);
          }
        });
    },
    resendVerificationLink() {
      // Implementasi untuk mengirim ulang link verifikasi
      console.log("Resending verification link to:", this.form.email);
      // Implementasikan logika kirim ulang link di sini, misalnya memanggil API
    },
    sendVerificationLink(userId) {
      // Implementasi untuk mengirim link verifikasi
      axios
        .post(
          `/email/verification-notification`,
          { user_id: userId },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(`Verification link sent to user ${userId} successfully`);
          // Optionally, refresh the account list or update the state
          this.fetchDataFromApi();
        })
        .catch((error) => {
          console.error(
            `Error sending verification link to user ${userId}:`,
            error
          );
        });
    },
    toggleAdminStatus(userId) {
      // API call to toggle admin status
      axios
        .post(
          `/user/${userId}/toggleAdmin`,
          {},
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          }
        )
        .then((response) => {
          console.log(`User ${userId} admin status toggled successfully`);
          // Optionally, refresh the account list or update the state
          this.fetchDataFromApi();
          console.log(response);
        })
        .catch((error) => {
          console.error(
            `Error toggling admin status for user ${userId}:`,
            error
          );
        });
    },
  },

  created() {
    // Panggil fungsi fetchDataFromApi pada saat komponen dibuat
    this.fetchDataFromApi();
  },
};
</script>

<style>
.error-messages {
  color: red;
  margin-top: 10px;
}

.verification-card {
  width: 850px;
  height: 500px;
  background-color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  align-content: center;
  align-items: center;
}

.regist {
  font-weight: bold;
  margin-top: 80px;

  font-size: 32px;
}

.inputan {
  padding: 10px 20px;
  margin-bottom: 18px;
  width: 532px;
  height: 67px;
  border-radius: 13px;
  background-color: #f5f5f5;
  display: flex;
}

.inputan input {
  background-color: #f5f5f5;
  border-style: none;
}

.tombol-submit {
  width: 532px;
  height: 67px;
  background-color: #967c55;
  border-radius: 13px;
  align-content: center;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}
.profile {
  position: relative;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.kartu-login {
  background-color: white;
  padding: 20px;
  width: 630px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirmation-card {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 594px;
  height: 350px;
  text-align: center;
  padding-top: 48px;
}

.confirmation-buttons {
  display: flex;
  margin-left: 31px;
  margin-top: 20px;
}

.confirmation-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirmation-buttons button:first-child {
  color: white;
}

.confirmation-buttons button:last-child {
  background-color: grey;
  color: white;
}

.actions-dropdown {
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
}
.actions-dropdown button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.actions-dropdown button:hover {
  background-color: #f9f9f9;
}

.card-container {
  padding-left: 260px;
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

.show-box {
  display: flex;
  align-items: center;
}

.show-text {
  font-weight: bold;
  font-size: 16;
  margin-left: 19px;
  margin-top: 30px;
  margin-right: 14px;
}

select {
  height: 30px;
  width: 70px;
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
  margin-top: 24px;
  margin-bottom: 16px;
  display: flex;
}

.text {
  color: black;
  font-weight: bold;
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
  width: 1110px;
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
  width: calc(100% / 4);
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

.hapus-btn {
  background-color: red;
  margin-left: 12px;
  margin-right: 7px;
}

.setuju-btn {
  background-color: blue;
  margin-right: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 20px;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 120px;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-menu p {
  margin: 0;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-menu p:hover {
  background-color: #f0f0f0;
}

/* Warna teks berdasarkan tipe pengguna */
.admin-color {
  color: #9e9fff;
}

.pengguna-color {
  color: #83d357;
}

/* Warna teks berdasarkan status verifikasi email */
.verified-color {
  color: #83d357;
}

.not-verified-color {
  color: #ff5d47;
}
</style>
