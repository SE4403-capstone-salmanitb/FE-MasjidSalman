<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div
        class="card mb-3"
        style="max-width: 1149px; max-height: fit-content; position: relative"
      >
        <div class="kepala">
          <p>Profile</p>
        </div>
        <div class="profile-content">
          <div class="profile-picture">
            <label class="change-profile-label" @click="showRegisterPopup">
              Ubah Foto
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleFileChange"
            />
            <img
              :src="profilePicture"
              alt="Profile Picture"
              v-if="profilePicture"
            />
            <p v-else>Loading...</p>
          </div>
          <div class="profile-name">
            <p>{{ userName }}</p>
            <div class="info-user">
              <p style="margin-top: 71px">
                Nama:
                <span style="color: #001aff">{{ userName }}</span>
              </p>
              <p>
                Email: <span style="color: #001aff">{{ userEmail }}</span>
              </p>
            </div>
          </div>
          <button class="logout-button" @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <!-- Pop-up Edit -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="kartu-edit">
        <b-icon-x
          style="width: 30px; height: 30px; margin-left: 550px"
          @click="closePopup"
        ></b-icon-x>
        <p class="regist">Edit Profile</p>

        <div class="inputan">
          <input
            v-model="user.name"
            type="text"
            placeholder="name"
            autocomplete="name"
          />
        </div>
        <div class="inputan">
          <input
            v-model="user.profile_picture"
            type="text"
            placeholder="Masukkan URL foto Profile"
          />
        </div>

        <div
          class="tombol-submit"
          type="submit"
          style="margin-bottom: 80px"
          @click="submitForm"
        >
          Simpan
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
      profilePicture: null,
      userName: "", // Menyimpan nama pengguna
      userEmail: "",
      userId: null, // Set userId sesuai dengan pengguna yang diinginkan
      showPopup: false, // Untuk menampilkan pop-up register
      user: {
        name: "",
        profile_picture: "",
      },
      showPassword: false, // Untuk toggle visibilitas password
    };
  },
  created() {
    this.fetchUserId();
  },
  methods: {
    async fetchUserId() {
      try {
        // Simulating fetching user ID from an authentication service
        // Replace this with actual logic to fetch the user ID
        const userId = await this.getUserIdFromAuthService();
        this.userId = userId;
        this.fetchProfileData();
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    },
    async getUserIdFromAuthService() {
      // Simulate an async call to fetch user ID
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2); // Example user ID
        }, 1000);
      });
    },
    async fetchProfileData() {
      if (!this.userId) {
        console.error("User ID is not provided");
        return;
      }

      try {
        const response = await axios.get("/user");
        console.log("API Response:", response.data); // Debugging log

        // Cari pengguna berdasarkan userId
        const user = response.data.find((user) => user.id === this.userId);

        if (user) {
          this.profilePicture = user.profile_picture;
          this.userName = user.name; // Set nama pengguna
          this.userEmail = user.email; // Set email pengguna
          if (!this.profilePicture) {
            console.error("Profile picture URL is not available");
          }
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    },
    submitForm() {
      console.log("Form Data:", this.user);

      axios
        .put("/user", this.user, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearer"),
          },
        })
        .then(() => {
          // Handle successful response, e.g., show success message
          this.notificationMessage = "Berhasil";
          this.notificationDetail = "Data berhasil di upload";
          this.notificationType = "success";
          this.isNotificationVisible = true;
          setTimeout(() => {
            this.notificationMessage = "";
            this.notificationDetail = "";
            this.notificationType = "";
            this.isNotificationVisible = false;
          }, 10000); // Reset notification after 10 seconds
          // Redirect to RKA page after successful submission
          window.location.href = "/test";
        })
        .catch((error) => {
          // Handle error, e.g., show error message
          this.notificationMessage = "Gagal";
          this.notificationDetail =
            "Gagal menginput data: " + error.response.data.message;
          this.notificationType = "error";
          this.isNotificationVisible = true;
          console.error("Error:", error.response.data);
        });
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Handle file upload or display logic here
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePicture = e.target.result;
        this.uploadProfilePicture(file);
      };
      reader.readAsDataURL(file);
    },
    handleEditFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.user.profile_picture = file;
    },

    showRegisterPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },

    async logout() {
      try {
        await axios.post("/logout");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("bearer");
        window.location.href = "/";
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
};
</script>

<style>
.profile-content {
  display: flex;
  position: relative;
}

.kartu-edit {
  background-color: white;
  padding: 20px;
  width: 630px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logout-button {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 28px; /* Adjust as needed */
  margin-right: 17px;
}

.profile-picture {
  position: relative;
}

.profile-picture img {
  width: 219px;
  height: 219px;
  object-fit: cover; /* Ensure the image covers the entire element */
  border-radius: 0; /* Remove border-radius to make it square */
  margin-left: 24px;
  margin-top: 28px;
  margin-bottom: 383px;
}

.profile-name {
  margin-top: 28px;
  margin-left: 30px;

  font-size: 24px;
  font-weight: 600;
}

.info-user p {
  font-size: 16px;
  margin-left: 64px;
  font-weight: bold;
}

button {
  width: 110px;
  height: 35px;
  background-color: #ff0000;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-style: none;
}

.change-profile-label {
  position: absolute;
  margin-top: 210px;
  margin-left: 24px;
  width: 218px;
  height: 37px;
  background-color: rgba(23, 23, 23, 0.7);
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  line-height: 37px;
  cursor: pointer;
}
</style>
