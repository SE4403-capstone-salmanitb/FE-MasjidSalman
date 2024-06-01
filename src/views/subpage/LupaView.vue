<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="login-card">
      <h2>Lupa Password</h2>
      <p>
        Silahkan masukkan email anda untuk dapat dikirim link reset password
      </p>
      <div class="input-container">
        <input v-model="email" type="text" id="email" placeholder="Email" />
      </div>
      <button @click="login">Masuk</button>
    </div>
  </div>
</template>

<script>
export default {};
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
  padding: 10px 20 px;
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
  height: 439px;
  border-radius: 15px;
  padding: 20px;
  margin-left: 44px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
