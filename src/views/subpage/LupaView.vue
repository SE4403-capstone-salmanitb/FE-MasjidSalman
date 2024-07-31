<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Lupa Password</h2>
      <p>Silahkan masukan email anda untuk dapat dikirim link reset password</p>
      <form @submit.prevent="onSubmit">
        <div class="input-container">
          <input
            v-model="email"
            style="background-color: #f5f5f5"
            type="email"
            placeholder="Email"
            autocomplete="username"
            required
          />
        </div>

        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Masuk</span>
        </button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div class="akun">
        Sudah punya akun? <router-link to="/">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "@/lib/axios"; // Sesuaikan path sesuai struktur proyek Anda

const email = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const onSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await axios.get("sanctum/csrf-cookie");
    try {
      const result = await axios.post("/forgot-password", {
        email: email.value,
      });
      if (result.status === 200) {
        successMessage.value =
          "Link reset password telah dikirim ke email Anda.";
      } else {
        throw new Error(result.data.message);
      }
    } catch (error) {
      console.error(
        "Error saat mengirim permintaan:",
        error.response?.data || error.message
      );
      errorMessage.value =
        error.response?.data.message ||
        "Gagal mengirim link reset password. Silakan coba lagi.";
    }
  } catch (error) {
    console.error("Error dengan CSRF atau jaringan:", error);
    errorMessage.value = "Kesalahan jaringan. Silakan coba lagi nanti.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.input-container {
  background: #f5f5f5;
  width: 100%;
  max-width: 532px;
  height: 67px;
  border-radius: 13px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.form-check {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form-check .form-check-label {
  font-size: 12px;
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
  width: 100%;
  max-width: 532px;
  height: 67px;
  border-radius: 13px;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 29px;
  font-size: 20px;
  font-weight: bold;
}

button:disabled {
  background-color: #967c55;
  opacity: 0.6;
  cursor: not-allowed;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/background.jpg");
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
  width: 100%;
  max-width: 630px;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
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

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
