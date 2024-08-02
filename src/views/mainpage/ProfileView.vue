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
            <label class="change-profile-label" @click="showRegisterPopup"
              >Ubah Foto</label
            >
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
                Nama: <span style="color: #001aff">{{ userName }}</span>
              </p>
              <p>
                Email: <span style="color: #001aff">{{ userEmail }}</span>
              </p>
            </div>
          </div>
          <button class="logout-button" @click="logout">Logout</button>
          <button class="edit-button" @click="toggleActions(0)">Edit</button>
          <div
            v-if="activeRow === 0"
            class="actions-dropdowns"
            style="width: max-content"
          >
            <button style="color: black" @click="showEditEmailsPopup">
              Edit email
            </button>
            <button style="color: black" @click="showEditPasswordPopup">
              Edit password
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pop-up Edit Profile -->
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
          <!-- Error message for name -->
          <p v-if="formErrors.name" class="error-message">
            {{ formErrors.name }}
          </p>
        </div>
        <div class="inputan">
          <input type="file" @change="handleEditFileChange" />
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

    <!-- Pop-up Edit Password -->
    <div v-if="showPasswordPopup" class="popup-overlay">
      <div class="kartu-edit">
        <b-icon-x
          style="width: 30px; height: 30px; margin-left: 550px"
          @click="closePasswordPopup"
        ></b-icon-x>
        <p class="regist">Edit Password</p>
        <div class="inputan">
          <input
            v-model="userPassword.new_password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="new password"
            autocomplete="new-password"
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
          <!-- Error message for new password -->
          <p v-if="formErrors.new_password" class="error-message">
            {{ formErrors.new_password }}
          </p>
        </div>
        <div class="inputan">
          <input
            v-model="userPassword.old_password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="old password"
            autocomplete="old-password"
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
          <!-- Error message for old password -->
          <p v-if="formErrors.old_password" class="error-message">
            {{ formErrors.old_password }}
          </p>
        </div>
        <div class="inputan">
          <input
            v-model="userPassword.new_password_confirmation"
            :type="showPassword ? 'text' : 'password'"
            placeholder="new password confirmation"
            autocomplete="new-password-confirmation"
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
          <!-- Error message for new password confirmation -->
          <p v-if="formErrors.new_password_confirmation" class="error-message">
            {{ formErrors.new_password_confirmation }}
          </p>
        </div>
        <div
          class="tombol-submit"
          type="submit"
          style="margin-bottom: 80px"
          @click="submitPasswordForm"
        >
          Simpan
        </div>
      </div>
    </div>

    <!-- Pop-up Edit Email -->
    <div v-if="showEmailsPopup" class="popup-overlay">
      <div class="kartu-edit">
        <b-icon-x
          style="width: 30px; height: 30px; margin-left: 550px"
          @click="closeEmailsPopup"
        ></b-icon-x>
        <p class="regist">Edit Email</p>
        <div class="inputan">
          <input
            v-model="userEmails.new_email"
            type="email"
            placeholder="Email baru"
            autocomplete="new-email"
          />
          <!-- Error message for new email -->
          <p v-if="formErrors.new_email" class="error-message">
            {{ formErrors.new_email }}
          </p>
        </div>
        <div class="inputan">
          <input
            v-model="userEmails.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="password"
            autocomplete="password"
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
          <!-- Error message for password -->
          <p v-if="formErrors.email_password" class="error-message">
            {{ formErrors.email_password }}
          </p>
        </div>
        <div
          class="tombol-submit"
          type="submit"
          style="margin-bottom: 80px"
          @click="submitEmailsForm"
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
  computed: {
    notificationClass() {
      return {
        notification: this.isNotificationVisible,
        "notification-error": this.notificationType === "error",
        "notification-success": this.notificationType === "success",
      };
    },
  },
  data() {
    return {
      notificationMessage: "",
      notificationDetail: "",

      notificationType: "", // error, success
      isNotificationVisible: false,
      profilePicture: null,
      userName: "", // Menyimpan nama pengguna
      userEmail: "",
      userId: null, // Set userId sesuai dengan pengguna yang diinginkan
      showPopup: false, // Untuk menampilkan pop-up register
      showPasswordPopup: false, // Untuk menampilkan pop-up edit password
      showEmailsPopup: false, // Untuk menampilkan pop-up edit email
      user: {
        name: "",
        password: "",
        profile_picture_raw: null,
      },
      userPassword: {
        new_password: "",
        old_password: "",
        new_password_confirmation: "",
      },
      userEmails: {
        new_email: "",
        password: "",
      },
      showPassword: false, // Untuk toggle visibilitas password
      activeRow: null, // Track the currently active row
      formErrors: {
        // Object to hold form-specific errors
        name: "",
        new_email: "",
        email_password: "",
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
    };
  },
  created() {
    this.fetchProfileData();
  },
  methods: {
    toggleActions(index) {
      if (this.activeRow === index) {
        this.activeRow = null; // Tutup dropdown jika sudah terbuka
      } else {
        this.activeRow = index; // Buka dropdown untuk baris yang diklik
      }
    },
    fetchProfileData() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        this.profilePicture = user.profile_picture;
        this.userName = user.name; // Set nama pengguna
        this.userEmail = user.email; // Set email pengguna
      } else {
        console.error("User data is not available in session storage");
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    submitForm() {
      const formData = new FormData();
      formData.append("name", this.user.name);
      if (this.user.profile_picture_raw) {
        formData.append("profile_picture_raw", this.user.profile_picture_raw);
      }

      axios
        .post("/user", formData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);

          // Update session storage with the new user data
          const updatedUser = response.data;
          sessionStorage.setItem("user", JSON.stringify(updatedUser));

          // Update local state with the new user data
          this.userName = updatedUser.name;
          this.profilePicture = updatedUser.profile_picture;

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
          // window.location.href = "/profile";
          // Refresh profile data
          this.fetchProfileData();
          window.location.href = "/profile";
        })
        .catch((error) => {
          console.error("Error:", error.response.data);

          // Handle error, e.g., show error message below the input
          this.formErrors.name = error.response.data.errors.name || "";
        });
    },

    closeNotification() {
      this.isNotificationVisible = false;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Handle file upload or display logic here
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePicture = e.target.result;
        this.user.profile_picture_raw = file;
      };
      reader.readAsDataURL(file);
    },
    handleEditFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.user.profile_picture_raw = file;
    },

    showRegisterPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    showEditPasswordPopup() {
      this.showPasswordPopup = true;
    },
    closePasswordPopup() {
      this.showPasswordPopup = false;
    },
    showEditEmailsPopup() {
      this.showEmailsPopup = true;
    },
    closeEmailsPopup() {
      this.showEmailsPopup = false;
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
    submitPasswordForm() {
      axios
        .put(
          "/user/password",
          {
            old_password: this.userPassword.old_password,
            new_password: this.userPassword.new_password,
            new_password_confirmation:
              this.userPassword.new_password_confirmation,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          // Handle successful password change
          this.notificationMessage = "Berhasil";
          this.notificationDetail = "Password berhasil diubah";
          this.notificationType = "success";
          this.isNotificationVisible = true;
          setTimeout(() => {
            this.notificationMessage = "";
            this.notificationDetail = "";
            this.notificationType = "";
            this.isNotificationVisible = false;
          }, 10000);
          this.closePasswordPopup();
          try {
            axios.post("/logout");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("bearer");
            window.location.href = "/";
          } catch (error) {
            console.error("Error during logout:", error);
          } // Logout the user after password change
        })
        .catch((error) => {
          // Handle error in password change
          const errors = error.response.data.errors || {};
          this.formErrors.old_password = errors.old_password || "";
          this.formErrors.new_password = errors.new_password || "";
          this.formErrors.new_password_confirmation =
            errors.new_password_confirmation || "";
        });
    },
    submitEmailsForm() {
      axios
        .put(
          "/user/email",
          {
            new_email: this.userEmails.new_email,
            password: this.userEmails.password,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearer"),
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          // Handle successful email change
          this.notificationMessage = "Berhasil";
          this.notificationDetail = "Email berhasil diubah";
          this.notificationType = "success";
          this.isNotificationVisible = true;
          setTimeout(() => {
            this.notificationMessage = "";
            this.notificationDetail = "";
            this.notificationType = "";
            this.isNotificationVisible = false;
          }, 10000);
          this.closeEmailsPopup();
          try {
            axios.post("/logout");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("bearer");
            window.location.href = "/";
          } catch (error) {
            console.error("Error during logout:", error);
          } // Logout the user after email change
        })
        .catch((error) => {
          // Handle error in email change
          const errors = error.response.data.errors || {};
          this.formErrors.new_email = errors.new_email || "";
          this.formErrors.email_password = errors.password || "";
        });
    },
  },
};
</script>

<style>
.actions-dropdowns {
  position: absolute;

  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  top: 108px;
  right: 0;
  display: flex;
  flex-direction: column;
}
.actions-dropdowns button {
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.actions-dropdowns button:hover {
  background-color: #f9f9f9;
}
.profile-content {
  display: flex;
  position: relative;
}

.kartu-edit {
  background-color: white;
  border-radius: 23px;
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

.edit-button {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 68px; /* Adjust as needed */
  margin-right: 17px;
  background-color: gray;
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
