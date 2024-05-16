<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Login Masjid Salman ITB</h2>
      <p>
        Selamat datang kembali! Silakan masuk untuk mengakses akun Anda dan
        tetap terhubung dengan komunitas Masjid Salman ITB.
      </p>
      <form action="#" method="post" @click="getting">
        <div class="input-container">
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div class="input-container">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter your password"
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
      </form>
      <button @click="login">Masuk</button>
      <div class="akun">
        Tidak punya akun? <router-link to="/register">Daftar</router-link>
      </div>
      <div class="lupa">
        <router-link to="/lupa" style="color: red">Lupa Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showPassword: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // Implement your login logic here
      axios
        .post("/api/login", this.form)
        .then((response) => {
          if (response.status === 200) {
            // Login successful, redirect to profile page
            this.$router.push("/profile");
          } else {
            // Handle other statuses, such as 401 for unauthorized
            // You might want to display an error message to the user
            console.error("Login failed");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          // Handle error, display error message to user
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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
  margin-top: 39px;
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
  background-image: url("E:\Materi\TA\Website\salmanitb\src\assets\background.jpg");
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
