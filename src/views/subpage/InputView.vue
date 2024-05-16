<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Form Input</p>
        </div>
        <div class="container">
          <form>
            <div class="mb-3">
              <label for="namabidang" class="form-label"
                >Nama Bidang Program</label
              >
              <input
                type="bidang"
                class="form-control"
                id="namabidang1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="namaprogram" class="form-label"
                >Nama Program Kegiatan</label
              >
              <input type="program" class="form-control" id="namaprogram1" />
            </div>
            <div class="mb-3">
              <label for="judulkegiatan" class="form-label"
                >Judul Kegiatan</label
              >
              <input type="kegiatan" class="form-control" id="judulkegiatan1" />
            </div>
            <div class="mb-3">
              <label for="tahunkegiatan" class="form-label"
                >Tahun Kegiatan</label
              >
              <input type="tahun" class="form-control" id="tahunkegiatan1" />
            </div>
            <div class="card-container1">
              <div
                class="card1 mb-3"
                style="max-width: 1067px; max-height: 354"
              >
                <div class="form">
                  <div class="mb-3">
                    <label for="kebutuhan" class="form-label">Kebutuhan</label>
                    <input type="butuh" class="form-control" id="kebutuhan1" />
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label for="nilaisatuan" class="form-label"
                          >Nilai Satuan</label
                        >
                        <input
                          type="satuan"
                          class="form-control"
                          id="nilaisatuan1"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="qty" class="form-label">Qty</label>
                        <input
                          type="kuantitas"
                          class="form-control"
                          id="qty1"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="unit" class="form-label">Unit (Unt)</label>
                        <input type="unt" class="form-control" id="unit1" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="fren" class="form-label">Frekuensi</label>
                        <input type="frk" class="form-control" id="fren1" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="unit" class="form-label">Unit (Unt)</label>
                        <input type="unit1" class="form-control" id="unt1" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="volume" class="form-label">Volume</label>
                        <input
                          type="Volume"
                          class="form-control"
                          id="volume1"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="sumberdana" class="form-label"
                          >Sumber Dana</label
                        >
                        <input
                          type="dana"
                          class="form-control"
                          id="sumberdana1"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="sumberdana" class="form-label">Bulan</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input1"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label class="form-check-label" for="inlineCheckbox1"
                      >Januari</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineCheckbox2"
                      >Februari</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="option3"
                    />
                    <label class="form-check-label" for="inlineCheckbox3"
                      >Maret</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox4"
                      value="option4"
                    />
                    <label class="form-check-label" for="inlineCheckbox4"
                      >April</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox5"
                      value="option5"
                    />
                    <label class="form-check-label" for="inlineCheckbox5"
                      >Mei</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox6"
                      value="option6"
                    />
                    <label class="form-check-label" for="inlineCheckbox6"
                      >Juni</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox7"
                      value="option7"
                    />
                    <label class="form-check-label" for="inlineCheckbox7"
                      >Juli</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox8"
                      value="option8"
                    />
                    <label class="form-check-label" for="inlineCheckbox8"
                      >Agustus</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox9"
                      value="option9"
                    />
                    <label class="form-check-label" for="inlineCheckbox9"
                      >September</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox10"
                      value="option10"
                    />
                    <label class="form-check-label" for="inlineCheckbox10"
                      >Oktober</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox11"
                      value="option11"
                    />
                    <label class="form-check-label" for="inlineCheckbox11"
                      >November</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox12"
                      value="option12"
                    />
                    <label class="form-check-label" for="inlineCheckbox12"
                      >Desember</label
                    >
                  </div>
                </div>
                <div class="tombol">
                  <button type="button" class="btn tambah-btn">Tambah</button>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="deskripsisingkat" class="form-label"
                >Deskripsi singkat</label
              >
              <input
                type="deskripsi"
                class="form-control"
                id="deskripsisingkat1"
              />
            </div>
            <div class="mb-3">
              <label for="output" class="form-label">Output / Keluaran</label>
              <input type="keluaran" class="form-control" id="output1" />
            </div>
            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <input type="ket" class="form-control" id="keterangan1" />
            </div>
            <div class="tombol1">
              <button type="button" class="btn" @click="goToInputPage">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";

export default {
  mounted() {
    // Attach event listener to the parent element for both Tambah and Hapus buttons
    const cardContainer = document.querySelector(".card-container1");
    cardContainer.addEventListener("click", this.handleButtonClick);
  },
  methods: {
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
      } else if (event.target.classList.contains("hapus-btn")) {
        // Remove the parent card when "Hapus" button is clicked
        event.target.closest(".card1").remove();
      }
    },
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
  margin-top: 14px;
  margin-top: 88px;
}

.tombol1 .btn {
  background-color: #967c55;
  font-size: 16px;
  font-weight: bolder;
  height: 47px;
  width: 104px;
  color: white;
}
</style>
