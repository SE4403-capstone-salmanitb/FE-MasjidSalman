<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Login Masjid Salman ITB</h2>
      <p>
        Selamat datang kembali! Silakan masuk untuk mengakses akun Anda dan
        tetap terhubung dengan komunitas Masjid Salman ITB.
      </p>
      <form @submit.prevent="onSubmit">
        <div class="input-container">
          <input
            filled
            v-model="email"
            label="Email"
            type="email"
            :rules="[(val) => !!val || 'Field is required']"
            placeholder="email"
            autocomplete="username"
          />
        </div>
        <div class="input-container">
          <input
            filled
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            :rules="[(val) => !!val || 'Field is required']"
            autocomplete="current-password"
          />
          <b-icon-eye-fill
            style="
              width: 24px;
              height: 14px;
              margin-right: 23px;
              cursor: pointer;
            "
            @click="togglePasswordVisibility"
          ></b-icon-eye-fill>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="rememberMe"
            label="Remember me"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Remember Me
          </label>
        </div>
        <button type="submit" :loading="isLoading" label="Login" unelevated>
          Masuk
        </button>
      </form>
      <div class="akun">
        Tidak punya akun? <router-link to="/register">Daftar</router-link>
      </div>
      <div class="lupa">
        <router-link to="/lupa" style="color: red">Lupa Password</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "@/lib/axios";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  isLoading.value = true;
  const form = {
    email: email.value,
    password: password.value,
    remember: rememberMe.value,
  };

  try {
    await axios.get("sanctum/csrf-cookie");
    try {
      const result = await axios.post("/login", form);
      if (result.status !== 200) {
        throw new Error(result.data);
      }
      sessionStorage.setItem("user", JSON.stringify(result.data.user));
      sessionStorage.setItem(
        "bearer",
        JSON.stringify(result.data.access_token)
      );
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error making the request:", error.toJSON());
      // Tampilkan pesan error kepada pengguna
      // Misalnya, update state untuk menampilkan pesan error di UI
    }
  } catch (error) {
    console.error("Error with CSRF or network:", error);
    // Tampilkan pesan error umum atau khusus terkait CSRF/network
  }

  isLoading.value = false;
};

onMounted(() => {
  if (sessionStorage.getItem("bearer") != null) {
    window.location.href = "/profile";
  }
});
// export default {
//   data() {
//     return {
//       showPassword: false,
//       email: "",
//       password: "",
//     };
//   },
//   methods: {
//     togglePasswordVisibility() {
//       this.showPassword = !this.showPassword;
//     },
//     login() {
//       // Implementasi logika login di sini menggunakan data email dan password
//       // Misalnya, Anda dapat menggunakan Axios untuk mengirim permintaan ke backend
//       axios
//         .post("/api/login", { email: this.email, password: this.password })
//         .then((response) => {
//           // Cek jika respons dari backend adalah sukses atau tidak
//           if (response.data.success) {
//             // Jika sukses, Anda dapat melakukan sesuatu seperti redirect ke halaman utama
//             // atau menyimpan token akses di local storage
//             console.log("Login berhasil!");
//           } else {
//             // Jika respons menunjukkan login gagal, atur pesan kesalahan
//             this.loginError = response.data.message;
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           // Misalnya, tampilkan pesan kesalahan umum jika terjadi kesalahan saat mengirim permintaan
//           this.loginError =
//             "Terjadi kesalahan saat melakukan login. Silakan coba lagi.";
//           // Handle error di sini
//         });
//     },
//   },
// };
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container {
  background: #fff;
  width: 532px;
  height: 67px;
  border-radius: 13px;
  padding: 10px 20px;
  margin: 13px auto;
  display: flex;
  align-items: center;
}

.form-check {
  display: flex;
  align-items: center; /* Menyamakan tinggi */
  justify-content: flex-start; /* Memposisikan ke kiri */
}
.form-check .form-check-label {
  font-size: 12;
  font-weight: 600;
}

.input-container input {
  width: 100%;
  padding: 10px 0;
  border-radius: 15px;
  border: 0;
  outline: 0;
  font-size: 16px;
  color: black;
}

button {
  background-color: #967c55;
  width: 532px;
  height: 67px;
  border-radius: 13px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 29px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 13px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://picsum.photos/200/300/?blur");
  background-size: cover;
  z-index: -1;
}

h2 {
  font-size: 32px;
  margin-top: 48px;
  font-weight: bold;
}

p {
  font-size: 13px;
  font-weight: medium;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 22px;
}

.login-card {
  background-color: white;
  width: 630px;
  height: 599px;
  border-radius: 15px;
  padding: 20px;
  margin-left: 44px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.akun {
  margin-top: 22px;
  font-size: 16px;
  font-weight: 600;
}

.lupa {
  color: red;
  font-weight: 600;
  font-size: 16px;
  margin-top: 11px;
}
</style>
