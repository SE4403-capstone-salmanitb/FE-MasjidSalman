<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Form</p>
        </div>
        <div class="container">
          <form>
            <div class="card-container1">
              <div class="mb-3">
                <label for="id_program" class="form-label">Nama Program</label>
                <select
                  class="form-control"
                  v-model="formrka.nama_program"
                  @change="updateIdProgram"
                  required
                >
                  <option
                    v-for="program in programOptions"
                    :key="program.id"
                    :value="program.nama"
                  >
                    {{ program.nama }}
                  </option>
                </select>
              </div>
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: fit-content"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="programkegiatan" class="form-label"
                      >Nama program kegiatan</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="programkegiatan1"
                      v-model="formrka.nama"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="deskripsi" class="form-label">Deskripsi</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="deskripsi1"
                      v-model="formrka.deskripsi"
                      required
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="output" class="form-label">Output</label>
                    <input
                      type="text"
                      class="form-control"
                      id="output1"
                      v-model="formrka.output"
                      required
                    />
                  </div>
                  <div class="row">
                    <div class="mb-3">
                      <label for="tahun" class="form-label">Tahun</label>
                      <input
                        type="text"
                        class="form-control"
                        id="tahun1"
                        v-model="formrka.tahun"
                        style="width: 490px"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="id_program" class="form-label"
                        >ID Program</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="id_program1"
                        v-model="formrka.id_program"
                        style="width: 490px"
                        required
                        readonly
                      />
                    </div>
                  </div>
                  <div
                    class="tombol"
                    style="align-content: right; align-content: right"
                  >
                    <button
                      type="button"
                      class="btn hapus-btn"
                      style="
                        display: none;
                        background-color: #ff0000;
                        margin-right: 14px;
                      "
                    >
                      Hapus
                    </button>
                    <button
                      type="button"
                      class="btn tambah-btn"
                      style="align-content: right; align-content: right"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tombol1" style="margin-bottom: 272px">
              <button type="button" class="btn" @click="submitForm">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="isNotificationVisible" :class="notificationClass">
        <div class="row">
          <b-icon-check-circle
            v-if="notificationType === 'success'"
            style="
              margin-right: 12px;
              margin-left: 15px;
              margin-top: 14px;
              width: 30px;
              height: 30px;
            "
          ></b-icon-check-circle>
          <b-icon-exclamation-circle
            v-if="notificationType === 'error'"
            style="
              margin-right: 12px;
              margin-left: 15px;
              margin-top: 14px;
              width: 30px;
              height: 30px;
            "
          ></b-icon-exclamation-circle>
          <div class="notification-header">
            <p class="notification-title">{{ notificationMessage }}</p>
            <p class="notification-content">{{ notificationDetail }}</p>
          </div>
          <b-icon-x
            @click="closeNotification"
            style="
              margin-left: 47px;
              margin-right: 12px;
              margin-top: 14px;
              width: 30px;
              height: 30px;
            "
          ></b-icon-x>
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
      formrka: {
        nama_program: "",
        nama: "",
        deskripsi: "",
        output: "",
        tahun: "",
        id_program: "",
      },
      programOptions: [],
      showAddInput: false,
      newProgram: "",
      notificationMessage: "",
      notificationDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
    };
  },
  mounted() {
    // Attach event listener to the parent element for both Tambah and Hapus buttons
    const cardContainer = document.querySelector(".card-container1");
    cardContainer.addEventListener("click", this.handleButtonClick);

    // Fetch program options from the API
    this.fetchProgramOptions();
  },
  methods: {
    fetchProgramOptions() {
      axios
        .get("/api/program", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearer"),
          },
        })
        .then((response) => {
          this.programOptions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching program options:", error);
        });
    },
    handleButtonClick(event) {
      // Check if the clicked element is either "Tambah" or "Hapus" button
      if (event.target.classList.contains("tambah-btn")) {
        // Clone the existing card template
        const existingCard = document.querySelector(".card1");
        const newCard = existingCard.cloneNode(true);

        // Clear input values of the new card
        newCard
          .querySelectorAll("input")
          .forEach((input) => (input.value = ""));

        // Add the new card below the existing ones
        const cardContainer = document.querySelector(".card-container1");
        cardContainer.appendChild(newCard);

        // Show "Hapus" button only in duplicated containers
        const cardContainers = document.querySelectorAll(".card1");
        cardContainers.forEach((container) => {
          const hapusButton = container.querySelector(".hapus-btn");
          hapusButton.style.display =
            cardContainers.length > 1 ? "inline-block" : "none";
        });
      } else if (event.target.classList.contains("hapus-btn")) {
        // Remove the parent card when "Hapus" button is clicked
        event.target.closest(".card1").remove();

        // Hide "Hapus" button if there's only one container left
        const cardContainers = document.querySelectorAll(".card1");
        cardContainers.forEach((container) => {
          const hapusButton = container.querySelector(".hapus-btn");
          hapusButton.style.display =
            cardContainers.length > 1 ? "inline-block" : "none";
        });
      }
    },
    updateIdProgram() {
      const selectedProgram = this.programOptions.find(
        (program) => program.nama === this.formrka.nama_program
      );
      if (selectedProgram) {
        this.formrka.id_program = selectedProgram.id;
      } else {
        this.formrka.id_program = "";
      }
    },
    submitForm() {
      console.log("Form Data:", this.formrka);

      axios
        .post("/api/programKegiatanRKA", this.formrka, {
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
          window.location.href = "/penjrka";
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
    closeNotification() {
      this.isNotificationVisible = false;
    },
  },
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
};
</script>

<style>
.dropdown-with-addition {
  position: relative;
}

.dropdown-with-addition select {
  width: 490px;
  height: 38px;
}

.dropdown-with-addition input {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 16px); /* Sesuaikan dengan width form-control */
  height: 38px; /* Sesuaikan dengan tinggi form-control */
  margin-top: 38px; /* Sesuaikan dengan margin top form-control */
}

.form-control {
  background-color: white;
  overflow-y: auto;
}

/* Tetapkan width dan height dropdown */
.form-control#namabidangprogram1 {
  width: 1030px;
  height: 38px; /* Sesuaikan dengan tinggi form sebelumnya */
}

.form-control#sumberdana1 {
  width: 490px; /* Sesuaikan dengan width form sebelumnya */
  height: 38px; /* Sesuaikan dengan tinggi form sebelumnya */
}
.form-control#tahunkegiatan1 {
  width: 490px; /* Sesuaikan dengan width form sebelumnya */
  height: 38px; /* Sesuaikan dengan tinggi form sebelumnya */
}

.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card-container1 {
  overflow-y: auto;
  margin-top: 32px;
}

.form {
  margin-left: 16px;
  margin-right: 9px;
}

.form .mb-3 .form-label {
  margin-top: 12px;
}

.card-container1 .card1 {
  background-color: #d9d9d9;
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

form {
  margin-left: 45px;
  margin-top: 57px;
  margin-right: 36px;
}

.form-label {
  font-size: 16px;
  font-weight: 700;
}

.card1 .tombol {
  display: flex;
  margin-top: 14px;
  margin-right: 9px;
}

.card1 .tombol .btn {
  background-color: #967c55;
  font-size: 12px;
  font-weight: bold;
  height: 47px;
  width: 104px;
  color: white;
  margin-bottom: 19px;
}

.tombol1 {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}

.tombol1 .btn {
  background-color: #967c55;
  font-size: 16px;
  font-weight: bolder;
  height: 47px;
  width: 104px;
  color: white;
}

.form .row {
  margin-left: 0%;
}
</style>
