<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Reset Password</h2>

      <form @submit.prevent="onSubmit">
        <div
          class="input-container"
          style="margin-top: 12px; margin-bottom: 15px"
        >
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password Baru"
            autocomplete="current-password"
            required
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
        <div
          class="input-container"
          style="margin-top: 12px; margin-bottom: 15px"
        >
          <input
            v-model="form.password_confirmation"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Konfirmasi Password"
            autocomplete="current-password"
            required
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

        <button
          type="button"
          :disabled="isLoading"
          @click="onSubmit"
          style="margin-bottom: 45px"
        >
          Masuk
        </button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
//import axios from "axios"; // Pastikan impor axios yang benar
import axios from "@/lib/axios";

export default {
  data() {
    return {
      form: {
        email: "",
        token: "",
        password: "",
        password_confirmation: "",
      },
      showPassword: false,
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async onSubmit() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.post("/reset-password", {
          email: this.$route.query.email,
          token: this.$route.params.token,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        });
        // Handle successful response here
        console.log(response.data);
        window.location.href = "/";
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred";
      } finally {
        this.isLoading = false;
      }
    },
  },
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
  background-color: #f5f5f5;
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
  margin-top: 25px;
  margin-bottom: 50px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
