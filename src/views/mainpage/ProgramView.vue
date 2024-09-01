<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>Laporan / Program</p>
        </div>
        <div class="container text-center">
          <div class="row">
            <div class="tahun">Bidang</div>
            <div class="tahun1">
              <div class="dropdown1" style="width: fit-content; height: 38px">
                <select
                  class="m-md-2"
                  style="width: fit-content; height: 38px"
                  v-model="selectedBidang"
                >
                  <option
                    v-for="bidang in bidangOptions"
                    :key="bidang.id"
                    :value="bidang.id"
                  >
                    {{ bidang.nama }}
                  </option>
                  <option value="Tambah Bidang">Tambah Bidang</option>
                </select>
              </div>
            </div>
            <div class="teks">Program</div>
            <div class="dropdown1">
              <select
                v-model="selectedProgram"
                id="dropdown-1"
                class="m-md-2"
                variant="outline"
              >
                <option disabled value="">Pilih program</option>
                <option
                  v-for="program in filteredPrograms"
                  :key="program.id"
                  :value="program.id"
                >
                  {{ program.nama }}
                </option>
                <option value="Tambah Program">Tambahkan Program</option>
              </select>
            </div>
            <div class="teks">Bulan</div>
            <div class="bulan1">
              <div class="dropdown1">
                <select
                  v-model="selectedMonth"
                  class="m-md-2"
                  style="width: 120px; height: 38px"
                >
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ month }}
                  </option>
                </select>
              </div>
            </div>
            <div class="tahun">Tahun</div>
            <div class="tahun1">
              <div class="dropdown1">
                <select
                  v-model="selectedYear"
                  class="m-md-2"
                  style="width: 90px; height: 38px"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="print-tombol" style="text-align: start">
            <button
              type="button"
              class="acc"
              style="margin-right: 10px"
              @click="goToInputLaporan"
            >
              Data Program +
            </button>

            <button
              type="button"
              class="acc"
              @click="showAccModal"
              v-if="isAdmin"
            >
              ACC Data
            </button>

            <button type="button" class="print-icon" style="margin-left: 10px">
              <b-icon-file-earmark-spreadsheet-fill
                @click="downloadExcel"
                style="width: 20px; height: 20px"
              ></b-icon-file-earmark-spreadsheet-fill>
            </button>
          </div>
          <div class="penyusun">
            <div class="profile-susun">
              <img
                :src="profilePicture"
                alt="Profile Picture"
                v-if="profilePicture"
              />
            </div>

            <div class="nama-penyusun">
              <p
                style="
                  font-size: 16px;
                  font-weight: 700;
                  color: gray;
                  margin-top: 15px;
                  margin-bottom: 0%;
                  text-align: left;
                "
              >
                Disusun oleh :
              </p>
              <p style="text-align: left; margin-top: 0%">{{ penyusun }}</p>
            </div>
            <div class="profile-disetujui">
              <img
                :src="approvedProfilePicture"
                alt="Approved Profile Picture"
                v-if="approvedProfilePicture"
              />
            </div>

            <div class="nama-penyusun">
              <p
                style="
                  font-size: 16px;
                  font-weight: 700;
                  color: gray;
                  margin-top: 15px;
                  margin-bottom: 0%;
                  text-align: left;
                "
              >
                Disetujui oleh :
              </p>
              <p style="text-align: left; margin-top: 0%">
                {{ diperiksaOleh }}
              </p>
            </div>
          </div>
          <div class="kotak-deskripsi">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Deskripsi Pelaksanaan Kegiatan</p>
            </div>
            <div class="tombol-tambah" @click="goToInputDeskripsi">
              <b-icon-plus
                style="align-items: center, align-content: center. margin-top:15px;"
                @click="goToInputDeskripsi"
              ></b-icon-plus>
            </div>
          </div>
          <div v-for="(nama, index) in programKegiatanNames" :key="index">
            <div class="teks-pelaksanaan">
              <p>{{ nama }}</p>
            </div>
            <div class="table-container1">
              <table class="table">
                <thead>
                  <tr style="text-align: left">
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Nama
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Waktu
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Tempat
                    </th>
                    <th style="font-weight: bold; width: calc((100%) / 4)">
                      Penyaluran
                    </th>
                    <th style="width: 50px; text-align: center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      pelaksanaan, pelIndex
                    ) in filteredPelaksanaanDataByProgram(nama)"
                    :key="pelIndex"
                    style="text-align: left"
                  >
                    <td>
                      <input
                        v-if="isEditing === pelaksanaan.id"
                        v-model="pelaksanaan.penjelasan"
                        type="text"
                      />
                      <span v-else>{{ pelaksanaan.penjelasan }}</span>
                    </td>
                    <td>
                      <input
                        v-if="isEditing === pelaksanaan.id"
                        v-model="pelaksanaan.waktu"
                        type="text"
                      />
                      <span v-else>{{ pelaksanaan.waktu }}</span>
                    </td>
                    <td>
                      <input
                        v-if="isEditing === pelaksanaan.id"
                        v-model="pelaksanaan.tempat"
                        type="text"
                      />
                      <span v-else>{{ pelaksanaan.tempat }}</span>
                    </td>
                    <td>
                      <input
                        v-if="isEditing === pelaksanaan.id"
                        v-model="pelaksanaan.penyaluran"
                        type="text"
                      />
                      <span v-else>{{ pelaksanaan.penyaluran }}</span>
                    </td>
                    <td style="text-align: center; position: relative">
                      <b-icon-three-dots-vertical
                        style="color: black; cursor: pointer"
                        @click="toggleDropdown(pelIndex)"
                      ></b-icon-three-dots-vertical>

                      <!-- Dropdown for actions -->
                      <div
                        v-if="activeRow === pelIndex"
                        class="actions-dropdown"
                        style="
                          position: absolute;
                          background-color: white;
                          border: 1px solid #ccc;
                          padding: 5px;
                          border-radius: 3px;
                          z-index: 1000;
                        "
                      >
                        <button
                          style="
                            color: black;
                            background: none;
                            border: none;
                            cursor: pointer;
                          "
                          @click="showConfirmPopup(pelaksanaan)"
                        >
                          Delete
                        </button>
                        <button
                          style="
                            color: black;
                            background: none;
                            border: none;
                            cursor: pointer;
                          "
                          @click="toggleEdit(pelaksanaan)"
                        >
                          {{ isEditing === pelaksanaan.id ? "Save" : "Edit" }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="kotak-deskripsi" style="margin-top: 24px">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Evaluasi Kegiatan</p>
            </div>
            <div class="tombol-tambah" @click="goToInputEvaluasi">
              <b-icon-plus
                style="align-items: center, align-content: center. margin-top:15px;"
                @click="goToInputEvaluasi"
              ></b-icon-plus>
            </div>
          </div>
          <div class="box-evaluasi">
            <p class="text-evaluasi">{{ selectedProgramName }}</p>
          </div>
          <div v-for="(kpi, kpiIndex) in filteredLaporanKPIData" :key="kpi.id">
            <div class="teks-pelaksanaan">
              <p>{{ kpi.k_p_i.program_kegiatan.nama }}</p>
              <div class="table-container1" style="margin-left: 0%">
                <table class="table">
                  <thead>
                    <tr style="text-align: left">
                      <th style="font-weight: bold; width: 188px">Indikator</th>
                      <th style="font-weight: bold; width: 229px">
                        Target Indikator
                      </th>
                      <th style="font-weight: bold; width: 444px">Deskripsi</th>
                      <th style="font-weight: bold; width: 77px">Capaian</th>
                      <th style="width: 50px; text-align: center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in filteredLaporanKPIDataByKPI(kpi.k_p_i.id)"
                      :key="item.id"
                    >
                      <td>{{ item.k_p_i.indikator }}</td>
                      <td>{{ item.k_p_i.target }}</td>
                      <td>
                        <input
                          v-if="isEditing === item.id"
                          v-model="item.deskripsi"
                          type="text"
                        />
                        <span v-else>{{ item.deskripsi }}</span>
                      </td>
                      <td>
                        <input
                          v-if="isEditing === item.id"
                          v-model="item.capaian"
                          type="text"
                        />
                        <span v-else>{{ item.capaian }}</span>
                      </td>
                      <td style="text-align: center; position: relative">
                        <b-icon-three-dots-vertical
                          style="color: black; cursor: pointer"
                          @click="toggleDropdown(kpiIndex)"
                        ></b-icon-three-dots-vertical>

                        <!-- Dropdown for actions -->
                        <div
                          v-if="activeRow === kpiIndex"
                          class="actions-dropdown"
                          style="
                            position: absolute;
                            background-color: white;
                            border: 1px solid #ccc;
                            padding: 5px;
                            border-radius: 3px;
                            z-index: 1000;
                          "
                        >
                          <button
                            style="
                              color: black;
                              background: none;
                              border: none;
                              cursor: pointer;
                            "
                            @click="showConfirmEvaluasiPopup(kpi)"
                          >
                            Delete
                          </button>
                          <button
                            style="
                              color: black;
                              background: none;
                              border: none;
                              cursor: pointer;
                            "
                            @click="toggleEdits(item)"
                          >
                            {{ isEditing === item.id ? "Save" : "Edit" }}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="kotak-deskripsi" style="margin-top: 24px">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Penerima Manfaat</p>
            </div>
            <div class="tombol-tambah" @click="goToInputPenerima">
              <b-icon-plus
                style="align-items: center, align-content: center. margin-top:15px;"
                @click="goToInputPenerima"
              ></b-icon-plus>
            </div>
          </div>
          <div class="box-evaluasi">
            <p class="text-evaluasi">{{ selectedProgramName }}</p>
          </div>
          <div class="table-container1" style="margin-left: 0%">
            <table class="table">
              <thead>
                <tr style="text-align: left">
                  <th style="font-weight: bold; width: 40px">No</th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Kategori
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Rutinitas
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Penyaluran
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Rencana
                  </th>
                  <th style="font-weight: bold; width: calc((100%) / 5)">
                    Realisasi
                  </th>
                  <th style="width: 50px; text-align: center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredPenerimaManfaatData.length === 0">
                  <td colspan="7" style="text-align: center">Tidak ada data</td>
                </tr>
                <tr
                  v-for="(item, index) in filteredPenerimaManfaatData"
                  :key="item.id"
                  style="text-align: left"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <input
                      v-if="isEditing === item.id"
                      v-model="item.kategori"
                      type="text"
                    />
                    <span v-else>{{ item.kategori }}</span>
                  </td>
                  <td>
                    <input
                      v-if="isEditing === item.id"
                      v-model="item.tipe_rutinitas"
                      type="text"
                    />
                    <span v-else>{{ item.tipe_rutinitas }}</span>
                  </td>
                  <td>
                    <input
                      v-if="isEditing === item.id"
                      v-model="item.tipe_penyaluran"
                      type="text"
                    />
                    <span v-else>{{ item.tipe_penyaluran }}</span>
                  </td>
                  <td>
                    <input
                      v-if="isEditing === item.id"
                      v-model="item.rencana"
                      type="text"
                    />
                    <span v-else>{{ item.rencana }}</span>
                  </td>
                  <td>
                    <input
                      v-if="isEditing === item.id"
                      v-model="item.realisasi"
                      type="text"
                    />
                    <span v-else>{{ item.realisasi }}</span>
                  </td>
                  <td style="text-align: center; position: relative">
                    <b-icon-three-dots-vertical
                      style="color: black; cursor: pointer"
                      @click="toggleDropdownManfaat(index)"
                    ></b-icon-three-dots-vertical>

                    <!-- Dropdown for actions -->
                    <div
                      v-if="activeRow === index"
                      class="actions-dropdown"
                      style="
                        position: absolute;
                        background-color: white;
                        border: 1px solid #ccc;
                        padding: 5px;
                        border-radius: 3px;
                        z-index: 1000;
                      "
                    >
                      <button
                        style="
                          color: black;
                          background: none;
                          border: none;
                          cursor: pointer;
                        "
                        @click="showConfirmManfaatPopup(item)"
                      >
                        Delete
                      </button>
                      <button
                        style="
                          color: black;
                          background: none;
                          border: none;
                          cursor: pointer;
                        "
                        @click="toggleEditManfaat(item)"
                      >
                        {{ isEditing === item.id ? "Save" : "Edit" }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="kotak-deskripsi" style="margin-top: 24px">
            <div class="kotak-teks">
              <p class="teks-kegiatan">Penggunaan Dana</p>
            </div>
            <div class="tombol-tambah" @click="goToInputPengguna">
              <b-icon-plus
                style="align-items: center, align-content: center. margin-top:15px;"
                @click="goToInputPengguna"
              ></b-icon-plus>
            </div>
          </div>
          <div class="kotak-dana">
            <p class="dana" style="padding-top: 5px">
              Dana yang direncanakan: {{ formatCurrency(totalJumlahRencana) }}
            </p>
            <p class="dana">
              Dana yang digunakan : {{ formatCurrency(totalJumlahRealisasi) }}
            </p>
            <p class="dana">Saldo : {{ formatCurrency(saldo) }}</p>
          </div>
          <div class="table-container1" style="margin-left: 0%">
            <table class="table">
              <thead>
                <tr style="text-align: left">
                  <th style="font-weight: bold; width: 40px">No</th>
                  <th style="font-weight: bold">Kategori Pengeluaran</th>
                  <th style="font-weight: bold">Jumlah Realisasi</th>
                  <th style="font-weight: bold">Jumlah Rencana</th>
                  <th style="font-weight: bold">Sumber Dana</th>
                  <th style="width: 50px; text-align: center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredAlokasiDanaData.length === 0">
                  <td colspan="6" style="text-align: center">Tidak ada data</td>
                </tr>
                <tr
                  v-for="(item, index) in filteredAlokasiDanaData"
                  :key="item.id"
                  style="text-align: left"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.item_kegiatan_r_k_a.uraian }}</td>
                  <td>
                    <input
                      v-if="isEditing === item.id"
                      v-model="item.jumlah_realisasi"
                      type="number"
                    />
                    <span v-else>{{
                      formatCurrency(item.jumlah_realisasi)
                    }}</span>
                  </td>
                  <td>
                    {{ formatCurrency(item.item_kegiatan_r_k_a.nilai_satuan) }}
                  </td>
                  <td>{{ item.item_kegiatan_r_k_a.sumber_dana }}</td>
                  <td style="text-align: center; position: relative">
                    <b-icon-three-dots-vertical
                      style="color: black; cursor: pointer"
                      @click="toggleDropdownDana(index)"
                    ></b-icon-three-dots-vertical>

                    <!-- Dropdown for actions -->
                    <div
                      v-if="activeRow === index"
                      class="actions-dropdown"
                      style="
                        position: absolute;
                        background-color: white;
                        border: 1px solid #ccc;
                        padding: 5px;
                        border-radius: 3px;
                        z-index: 1000;
                      "
                    >
                      <button
                        style="
                          color: black;
                          background: none;
                          border: none;
                          cursor: pointer;
                        "
                        @click="showConfirmDanaPopup(item)"
                      >
                        Delete
                      </button>
                      <button
                        style="
                          color: black;
                          background: none;
                          border: none;
                          cursor: pointer;
                        "
                        @click="toggleEditDana(item)"
                      >
                        {{ isEditing === item.id ? "Save" : "Edit" }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pop-up Konfirmasi ACC Data-->
        <b-modal
          id="acc-modal"
          ref="accModal"
          hide-footer
          title="Konfirmasi ACC Data"
        >
          <p class="teks-konfirmasi" style="margin-bottom: 15px">
            Apakah anda ingin melakukan acc pada data?
          </p>
          <p class="info" style="margin-bottom: 30px">
            Saat anda memilih ya, maka seluruh data tidak akan dapat diubah
            lagi!
          </p>
          <div class="tombol-konfirmasi">
            <b-button
              variant="secondary"
              @click="hideAccModal"
              style="width: 200px"
              >Tidak</b-button
            >
            <b-button
              style="background-color: #967c55; margin-left: 15px; width: 200px"
              @click="confirmAccData"
              >Ya</b-button
            >
          </div>
        </b-modal>
        <!-- Pop-up Konfirmasi Delete Data Kegiatan-->
        <div v-if="confirmDelete" class="confirmation-popup">
          <div class="confirmation-card">
            <b-icon-exclamation-circle-fill
              style="color: #f24e1e; width: 126px; height: 126px"
            ></b-icon-exclamation-circle-fill>
            <p style="font-size: 32px; font-weight: bold">
              Anda yakin ingin menghapus data?
            </p>
            <div class="confirmation-buttons">
              <button
                @click="deleteRow(selectedItem)"
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
                @click="closePopup"
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
        <!-- Pop-up Konfirmasi Delete Data Evaluasi-->
        <div v-if="confirmDeleteEvaluasi" class="confirmation-popup">
          <div class="confirmation-card">
            <b-icon-exclamation-circle-fill
              style="color: #f24e1e; width: 126px; height: 126px"
            ></b-icon-exclamation-circle-fill>
            <p style="font-size: 32px; font-weight: bold">
              Anda yakin ingin menghapus data?
            </p>
            <div class="confirmation-buttons">
              <button
                @click="deleteRowEvaluasi(selectedItem)"
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
                @click="closePopup"
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
        <!-- Pop-up Konfirmasi Delete Data Manfaat-->
        <div v-if="confirmDeleteManfaat" class="confirmation-popup">
          <div class="confirmation-card">
            <b-icon-exclamation-circle-fill
              style="color: #f24e1e; width: 126px; height: 126px"
            ></b-icon-exclamation-circle-fill>
            <p style="font-size: 32px; font-weight: bold">
              Anda yakin ingin menghapus data?
            </p>
            <div class="confirmation-buttons">
              <button
                @click="deleteRowManfaat(selectedItem)"
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
                @click="closePopup"
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
        <!-- pop-up notifikasi edit -->
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
        <!-- pop-up notifikasi delete -->
        <div
          v-if="isNotificationDeleteVisible"
          :class="['notification-delete', notificationClass]"
        >
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
              <p class="notification-title">
                {{ notificationDeleteMessage }}
              </p>
              <p class="notification-content">
                {{ notificationDeleteDetail }}
              </p>
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

        <!-- Pop-up Konfirmasi Delete Data Dana-->
        <div v-if="confirmDeleteDana" class="confirmation-popup">
          <div class="confirmation-card">
            <b-icon-exclamation-circle-fill
              style="color: #f24e1e; width: 126px; height: 126px"
            ></b-icon-exclamation-circle-fill>
            <p style="font-size: 32px; font-weight: bold">
              Anda yakin ingin menghapus data?
            </p>
            <div class="confirmation-buttons">
              <button
                @click="deleteRowDana(selectedItem)"
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
                @click="closePopup"
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
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
import axios from "@/lib/axios";
import * as XLSX from "xlsx";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      notificationMessage: "",
      notificationDeleteMessage: "",
      notificationDetail: "",
      notificationDeleteDetail: "",
      notificationType: "", // error, success
      isNotificationVisible: false,
      isNotificationDeleteVisible: false,
      bidangOptions: [],
      programOptions: [],
      filteredPrograms: [],
      pelaksanaanData: [],
      laporanKPIData: [],
      penerimaManfaatData: [],
      alokasiDanaData: [],
      isAdmin: false,
      filteredPelaksanaanData: [], // Data pelaksanaan yang sudah difilter
      selectedBidang: "",
      selectedProgram: "",
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(),
      selectedMonth: new Date().getMonth() + 1,
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      userData: [], // Data pengguna
      laporanData: [], // Data laporan bulanan
      penyusun: "", // Nama penyusun yang akan ditampilkan
      diperiksaOleh: "", // Nama yang diperiksa yang akan ditampilkan
      profilePicture: "", // URL gambar profil penyusun yang akan ditampilkan
      approvedProfilePicture: "", // URL gambar profil dari diperiksa_oleh
      programKegiatanNames: [], // Array untuk menyimpan nama program_kegiatan yang sesuai
      activeRow: null, // To track the currently open dropdown
      isEditing: null, // Track which row is being edited
      confirmDelete: false, // To handle delete confirmation popup
      confirmDeleteEvaluasi: false,
      confirmDeleteManfaat: false,
      confirmDeleteDana: false,
      selectedItem: null, // To store the item being edited or deleted
    };
  },
  computed: {
    notificationClass() {
      return {
        notification: this.isNotificationVisible,
        notifications: this.isNotificationDeleteVisible,
        "notification-error": this.notificationType === "error",
        "notification-success": this.notificationType === "success",
      };
    },
    filteredAlokasiDanaData() {
      return this.alokasiDanaData.filter((item) => {
        // Temukan laporan bulanan yang sesuai dengan program, bulan, tahun, dan id_laporan_bulanan yang dipilih
        const laporan = this.laporanData.find((laporan) => {
          const laporanMonth = new Date(laporan.bulan_laporan).getMonth() + 1;
          const laporanYear = new Date(laporan.bulan_laporan).getFullYear();
          return (
            laporan.id === item.id_laporan_bulanan &&
            laporanMonth === this.selectedMonth &&
            laporanYear === this.selectedYear &&
            laporan.program_id === this.selectedProgram
          );
        });

        // Kembalikan item jika laporan bulanan cocok
        return laporan !== undefined;
      });
    },
    totalJumlahRencana() {
      return this.filteredAlokasiDanaData.reduce((total, item) => {
        return total + parseFloat(item.item_kegiatan_r_k_a.nilai_satuan || 0);
      }, 0);
    },
    // Properti untuk menghitung total jumlah realisasi
    totalJumlahRealisasi() {
      return this.filteredAlokasiDanaData.reduce((total, item) => {
        return total + parseFloat(item.jumlah_realisasi || 0); // Konversi ke angka dan jumlahkan
      }, 0);
    },
    // Properti untuk menghitung sisa saldo
    saldo() {
      return this.totalJumlahRencana - this.totalJumlahRealisasi;
    },
    filteredLaporanKPIData() {
      return this.laporanKPIData.filter((kpi) => {
        const laporanBulanan = this.laporanData.find((laporan) => {
          const laporanMonth = new Date(laporan.bulan_laporan).getMonth() + 1;
          const laporanYear = new Date(laporan.bulan_laporan).getFullYear();
          return (
            laporan.id === kpi.id_laporan_bulanan &&
            laporanMonth === this.selectedMonth &&
            laporanYear === this.selectedYear
          );
        });

        return (
          kpi.k_p_i &&
          kpi.k_p_i.program_kegiatan &&
          kpi.k_p_i.program_kegiatan.id_program === this.selectedProgram &&
          laporanBulanan // Pastikan laporan bulanan sesuai dengan bulan dan tahun yang dipilih
        );
      });
    },
    selectedProgramName() {
      const program = this.programOptions.find(
        (program) => program.id === this.selectedProgram
      );
      return program ? program.nama : "";
    },
    filteredPenerimaManfaatData() {
      return this.penerimaManfaatData.filter((item) => {
        // Temukan laporan bulanan yang sesuai dengan program, bulan, dan tahun yang dipilih
        const laporan = this.laporanData.find((laporan) => {
          const laporanMonth = new Date(laporan.bulan_laporan).getMonth() + 1;
          const laporanYear = new Date(laporan.bulan_laporan).getFullYear();
          return (
            laporan.program_id === this.selectedProgram &&
            laporanMonth === this.selectedMonth &&
            laporanYear === this.selectedYear
          );
        });

        // Kembalikan item jika id_laporan_bulanan cocok
        return laporan && item.id_laporan_bulanan === laporan.id;
      });
    },
  },
  mounted() {
    this.fetchUserAdmin();
    this.fetchLaporanKPIData();
    this.fetchBidangOptions();
    this.fetchProgramOptions();
    this.fetchPelaksanaanData();
    this.fetchAlokasiDanaData();
    this.fetchUserData(); // Panggil fetchUserData pada saat komponen dipasang
    this.fetchLaporanData(); // Panggil fetchLaporanData pada saat komponen dipasang
    this.fetchPenerimaManfaatData();
  },
  methods: {
    closeNotification() {
      this.isNotificationVisible = false;
      this.isNotificationDeleteVisible = false;
    },
    fetchUserAdmin() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        this.isAdmin = user.is_admin === 1; // Set status admin
      } else {
        console.error("User data is not available in session storage");
      }
    },
    showAccModal() {
      this.$refs.accModal.show();
    },
    hideAccModal() {
      this.$refs.accModal.hide();
    },
    async confirmAccData() {
      try {
        // Temukan laporan bulanan yang sedang aktif
        const laporan = this.laporanData.find((laporan) => {
          const laporanMonth = new Date(laporan.bulan_laporan).getMonth() + 1;
          const laporanYear = new Date(laporan.bulan_laporan).getFullYear();
          return (
            laporan.program_id === this.selectedProgram &&
            laporanMonth === this.selectedMonth &&
            laporanYear === this.selectedYear
          );
        });

        // Jika laporan ditemukan, lakukan verifikasi
        if (laporan && laporan.id) {
          const response = await axios.patch(
            `/api/laporanBulanan/verify/${laporan.id}`
          );
          console.log("ACC Data confirmed:", response.data);
        } else {
          console.error("Laporan tidak ditemukan atau ID tidak valid.");
        }

        this.hideAccModal(); // Sembunyikan modal setelah melakukan ACC
      } catch (error) {
        console.error("Gagal melakukan ACC data:", error);
      }
    },
    filteredLaporanKPIDataByKPI(kpiId) {
      // Mengambil hanya data KPI yang sesuai dengan id_kpi
      return this.laporanKPIData.filter(
        (item) => item.k_p_i && item.k_p_i.id === kpiId
      );
    },
    showConfirmPopup(item) {
      // Show confirmation popup for the selected item
      this.selectedItem = item; // Store the selected item for deletion
      this.confirmDelete = true; // Open the confirmation popup
    },
    showConfirmEvaluasiPopup(item) {
      // Show confirmation popup for the selected item
      this.selectedItem = item; // Store the selected item for deletion
      this.confirmDeleteEvaluasi = true; // Open the confirmation popup
    },
    showConfirmManfaatPopup(item) {
      // Show confirmation popup for the selected item
      this.selectedItem = item; // Store the selected item for deletion
      this.confirmDeleteManfaat = true; // Open the confirmation popup
    },
    showConfirmDanaPopup(item) {
      // Show confirmation popup for the selected item
      this.selectedItem = item; // Store the selected item for deletion
      this.confirmDeleteDana = true; // Open the confirmation popup
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    closePopup() {
      this.confirmDelete = false;
      this.confirmDeleteManfaat = false;
      this.confirmDeleteManfaat = false;
      this.confirmDeleteDana = false;
      this.activeRow = null;
    },
    toggleDropdown(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
    toggleDropdownManfaat(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
    toggleDropdownDana(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
    toggleEdit(item) {
      if (this.isEditing === item.id) {
        // If we are in editing mode, save the data
        this.saveData(item);
      } else {
        // If we are not in editing mode, enable it
        this.isEditing = item.id;
      }
    },
    toggleEdits(item) {
      if (this.isEditing === item.id) {
        // If we are in editing mode, save the data
        this.saveDatas(item);
      } else {
        // If we are not in editing mode, enable it
        this.isEditing = item.id;
      }
    },
    toggleEditManfaat(item) {
      if (this.isEditing === item.id) {
        // If we are in editing mode, save the data
        this.saveDataManfaat(item);
      } else {
        // If we are not in editing mode, enable it
        this.isEditing = item.id;
      }
    },
    toggleEditDana(item) {
      if (this.isEditing === item.id) {
        // If we are in editing mode, save the data
        this.saveDataDana(item);
      } else {
        // If we are not in editing mode, enable it
        this.isEditing = item.id;
      }
    },
    async fetchAlokasiDanaData() {
      try {
        const response = await axios.get("/api/alokasiDana");
        this.alokasiDanaData = response.data; // Simpan data dari API ke alokasiDanaData
      } catch (error) {
        console.error("Failed to fetch alokasi dana data:", error);
      }
    },
    async fetchPenerimaManfaatData() {
      try {
        const response = await axios.get("/api/penerimaManfaat");
        this.penerimaManfaatData = response.data; // Simpan data penerima manfaat dari API
      } catch (error) {
        console.error("Failed to fetch penerima manfaat data:", error);
      }
    },
    async fetchLaporanKPIData() {
      try {
        const response = await axios.get("/api/laporanKPIBulanan");
        this.laporanKPIData = response.data; // Simpan data KPI yang didapat dari API
      } catch (error) {
        console.error("Failed to fetch laporan KPI data:", error);
      }
    },
    async saveData(item) {
      try {
        // Simulate saving the data (make an API call here if needed)
        await axios
          .put(`/api/pelaksanaan/${item.id}`, {
            penjelasan: item.penjelasan,
            waktu: item.waktu,
            tempat: item.tempat,
            penyaluran: item.penyaluran,
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di Edit";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.fetchPelaksanaanData();
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal edit data " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });

        this.isEditing = null; // Stop editing after saving
        this.fetchPelaksanaanData(); // Refresh data after saving
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    async saveDatas(item) {
      try {
        // Simulate saving the data (make an API call here if needed)
        await axios
          .put(`/api/laporanKPIBulanan/${item.id}`, {
            capaian: item.capaian,
            deskripsi: item.deskripsi,
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di Edit";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.fetchLaporanKPIData();
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal edit data " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });
        this.isEditing = null; // Stop editing after saving
        this.fetchLaporanKPIData(); // Refresh data after saving
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    async saveDataManfaat(item) {
      try {
        // Simulate saving the data (make an API call here if needed)
        await axios
          .put(`/api/penerimaManfaat/${item.id}`, {
            kategori: item.kategori,
            tipe_rutinitas: item.tipe_rutinitas,
            tipe_penyaluran: item.tipe_penyaluran,
            rencana: item.rencana,
            realisasi: item.realisasi,
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di Edit";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.fetchPenerimaManfaatData();
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal edit data " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });
        this.isEditing = null; // Stop editing after saving
        this.fetchPenerimaManfaatData(); // Refresh data after saving
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    async saveDataDana(item) {
      try {
        // Simulate saving the data (make an API call here if needed)
        await axios
          .put(`/api/alokasiDana/${item.id}`, {
            jumlah_realisasi: item.jumlah_realisasi,
          })
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationMessage = "Berhasil";
            this.notificationDetail = "Data berhasil di Edit";
            this.notificationType = "success";
            this.isNotificationVisible = true;
            setTimeout(() => {
              this.notificationMessage = "";
              this.notificationDetail = "";
              this.notificationType = "";
              this.isNotificationVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.fetchAlokasiDanaData();
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationMessage = "Gagal";
            this.notificationDetail =
              "Gagal edit data " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationVisible = true;
            console.error("Error:", error.response.data);
          });
        this.isEditing = null; // Stop editing after saving
        this.fetchAlokasiDanaData(); // Refresh data after saving
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    },
    async deleteRow(item) {
      try {
        // Call the API to delete the data
        await axios
          .delete(`/api/pelaksanaan/${item.id}`)
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationDeleteMessage = "Berhasil";
            this.notificationDeleteDetail = "Data berhasil di hapus";
            this.notificationType = "success";
            this.isNotificationDeleteVisible = true;
            setTimeout(() => {
              this.notificationDeleteMessage = "";
              this.notificationDeleteDetail = "";
              this.notificationType = "";
              this.isNotificationDeleteVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.filteredPelaksanaanData = this.filteredPelaksanaanData.filter(
              (pelaksanaan) => pelaksanaan.id !== item.id
            );
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationDeleteMessage = "Gagal";
            this.notificationDeleteDetail =
              "Gagal menghapus data: " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationDeleteVisible = true;
            console.error("Error:", error.response.data);
          });

        // Remove the deleted item from the local data array (without refresh)
        this.filteredPelaksanaanData = this.filteredPelaksanaanData.filter(
          (pelaksanaan) => pelaksanaan.id !== item.id
        );

        // Close the confirmation popup after deletion
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
      }
    },
    async deleteRowEvaluasi(item) {
      try {
        // Call the API to delete the data
        await axios
          .delete(`/api/laporanKPIBulanan/${item.id}`)
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationDeleteMessage = "Berhasil";
            this.notificationDeleteDetail = "Data berhasil di hapus";
            this.notificationType = "success";
            this.isNotificationDeleteVisible = true;
            setTimeout(() => {
              this.notificationDeleteMessage = "";
              this.notificationDeleteDetail = "";
              this.notificationType = "";
              this.isNotificationDeleteVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.laporanKPIData = this.laporanKPIData.filter(
              (kpi) => kpi.id !== item.id
            );
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationDeleteMessage = "Gagal";
            this.notificationDeleteDetail =
              "Gagal menghapus data: " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationDeleteVisible = true;
            console.error("Error:", error.response.data);
          });

        // Remove the deleted item from the local data array (without refresh)
        this.laporanKPIData = this.laporanKPIData.filter(
          (kpi) => kpi.id !== item.id
        );
        // Close the confirmation popup after deletion
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
      }
    },
    async deleteRowManfaat(item) {
      try {
        // Call the API to delete the data
        await axios.delete(`/api/penerimaManfaat/${item.id}`);

        // Remove the deleted item from the local data array (without refresh)
        this.penerimaManfaatData = this.penerimaManfaatData.filter(
          (manfaat) => manfaat.id !== item.id
        );
        // Close the confirmation popup after deletion
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
      }
    },
    async deleteRowDana(item) {
      try {
        // Call the API to delete the data
        await axios
          .delete(`/api/alokasiDana/${item.id}`)
          .then(() => {
            // Handle successful response, e.g., show success message
            this.notificationDeleteMessage = "Berhasil";
            this.notificationDeleteDetail = "Data berhasil di hapus";
            this.notificationType = "success";
            this.isNotificationDeleteVisible = true;
            setTimeout(() => {
              this.notificationDeleteMessage = "";
              this.notificationDeleteDetail = "";
              this.notificationType = "";
              this.isNotificationDeleteVisible = false;
            }, 10000); // Reset notification after 10 seconds
            // Redirect to RKA page after successful submission
            this.alokasiDanaData = this.alokasiDanaData.filter(
              (dana) => dana.id !== item.id
            );
          })
          .catch((error) => {
            // Handle error, e.g., show error message
            this.notificationDeleteMessage = "Gagal";
            this.notificationDeleteDetail =
              "Gagal menghapus data: " + error.response.data.message;
            this.notificationType = "error";
            this.isNotificationDeleteVisible = true;
            console.error("Error:", error.response.data);
          });

        // Remove the deleted item from the local data array (without refresh)
        this.alokasiDanaData = this.alokasiDanaData.filter(
          (dana) => dana.id !== item.id
        );
        // Close the confirmation popup after deletion
        this.closePopup();
      } catch (error) {
        console.error("Failed to delete row:", error);
      }
    },

    async fetchBidangOptions() {
      try {
        const response = await axios.get("/api/bidang");
        this.bidangOptions = response.data;

        const defaultBidang = this.bidangOptions.find(
          (bidang) => bidang.id === 1
        );
        if (defaultBidang) {
          this.selectedBidang = defaultBidang.id;
        }
      } catch (error) {
        console.error("Failed to fetch bidang options:", error);
      }
    },
    async fetchProgramOptions() {
      try {
        const response = await axios.get("/api/program");
        this.programOptions = response.data;
        this.filterPrograms();
      } catch (error) {
        console.error("Failed to fetch program options:", error);
      }
    },
    async fetchPelaksanaanData() {
      try {
        const response = await axios.get("/api/pelaksanaan");
        this.pelaksanaanData = response.data; // Simpan data pelaksanaan
        this.filterPelaksanaanData(); // Panggil filterPelaksanaanData untuk memfilter berdasarkan selectedProgram dan id_laporan_bulanan
      } catch (error) {
        console.error("Failed to fetch pelaksanaan data:", error);
      }
    },
    async fetchUserData() {
      try {
        const response = await axios.get("/user");
        this.userData = response.data;
        this.matchPenyusun(); // Panggil matchPenyusun setelah mendapatkan data pengguna
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
    async fetchLaporanData() {
      try {
        const response = await axios.get("/api/laporanBulanan");
        this.laporanData = response.data;
        this.matchPenyusun(); // Panggil matchPenyusun setelah mendapatkan data laporan
        this.filterPelaksanaanData(); // Panggil filterPelaksanaanData setelah mendapatkan laporan
      } catch (error) {
        console.error("Failed to fetch laporan bulanan data:", error);
      }
    },
    downloadExcel() {
      // Membuat workbook baru
      const wb = XLSX.utils.book_new();

      // Menambahkan Sheet untuk Pelaksanaan Data
      const pelaksanaanSheet = XLSX.utils.json_to_sheet(
        this.filteredPelaksanaanData
      );
      XLSX.utils.book_append_sheet(wb, pelaksanaanSheet, "Pelaksanaan");

      // Menambahkan Sheet untuk Laporan KPI Data
      const kpiSheet = XLSX.utils.json_to_sheet(this.filteredLaporanKPIData);
      XLSX.utils.book_append_sheet(wb, kpiSheet, "Laporan KPI");

      // Menambahkan Sheet untuk Penerima Manfaat Data
      const penerimaSheet = XLSX.utils.json_to_sheet(
        this.filteredPenerimaManfaatData
      );
      XLSX.utils.book_append_sheet(wb, penerimaSheet, "Penerima Manfaat");

      // Menambahkan Sheet untuk Alokasi Dana Data
      const danaSheet = XLSX.utils.json_to_sheet(this.filteredAlokasiDanaData);
      XLSX.utils.book_append_sheet(wb, danaSheet, "Alokasi Dana");

      // Menyimpan workbook sebagai file Excel
      XLSX.writeFile(
        wb,
        `Data_${this.selectedMonth}_${this.selectedYear}.xlsx`
      );
    },
    matchPenyusun() {
      if (this.userData.length > 0 && this.laporanData.length > 0) {
        const laporan = this.laporanData.find((laporan) => {
          const laporanMonth = new Date(laporan.bulan_laporan).getMonth() + 1;
          const laporanYear = new Date(laporan.bulan_laporan).getFullYear();
          return (
            laporan.program_id === this.selectedProgram &&
            laporanMonth === this.selectedMonth &&
            laporanYear === this.selectedYear
          );
        });

        if (laporan) {
          const penyusun = this.userData.find(
            (user) => user.id === laporan.disusun_oleh
          );
          const diperiksaOleh = this.userData.find(
            (user) => user.id === laporan.diperiksa_oleh
          );

          if (penyusun) {
            this.penyusun = penyusun.name; // Simpan nama penyusun
            this.profilePicture = penyusun.profile_picture; // Simpan URL gambar profil penyusun
          } else {
            this.penyusun = "Tidak ditemukan"; // Atur pesan jika penyusun tidak ditemukan
            this.profilePicture = ""; // Kosongkan gambar profil jika tidak ditemukan
          }

          if (diperiksaOleh) {
            this.diperiksaOleh = diperiksaOleh.name; // Simpan nama yang diperiksa
            this.approvedProfilePicture = diperiksaOleh.profile_picture; // Simpan URL gambar profil dari diperiksa_oleh
          } else {
            this.diperiksaOleh = "Belum Disetujui"; // Atur pesan jika nama yang diperiksa tidak ditemukan
            this.approvedProfilePicture = ""; // Kosongkan gambar profil jika tidak ditemukan
          }

          // Filter data pelaksanaan berdasarkan id_laporan_bulanan
          this.filteredPelaksanaanData = this.pelaksanaanData.filter(
            (pelaksanaan) => pelaksanaan.id_laporan_bulanan === laporan.id
          );
        } else {
          this.penyusun = "Tidak ada laporan untuk bulan ini"; // Atur pesan jika tidak ada laporan untuk bulan yang dipilih
          this.diperiksaOleh = "Tidak ada laporan untuk bulan ini"; // Atur pesan jika tidak ada laporan untuk bulan yang dipilih
          this.profilePicture = ""; // Kosongkan gambar profil jika tidak ada laporan
          this.approvedProfilePicture = ""; // Kosongkan gambar profil jika tidak ada laporan

          // Kosongkan data pelaksanaan jika tidak ada laporan
          this.filteredPelaksanaanData = [];
        }
      }
    },
    goToInputDeskripsi() {
      this.$router.push({ path: "/inputdeskripsi" });
    },
    goToInputLaporan() {
      this.$router.push({ path: "/inputlaporan" });
    },
    goToInputEvaluasi() {
      this.$router.push({ path: "/inputevaluasi" });
    },
    goToInputPenerima() {
      this.$router.push({ path: "/inputpenerima" });
    },
    goToInputPengguna() {
      this.$router.push({ path: "/inputpengguna" });
    },
    filteredPelaksanaanDataByProgram(namaProgram) {
      return this.filteredPelaksanaanData.filter(
        (pelaksanaan) =>
          pelaksanaan.program_kegiatan &&
          pelaksanaan.program_kegiatan.nama === namaProgram
      );
    },
    filterPrograms() {
      // Filter program berdasarkan bidang yang dipilih
      const filtered = this.programOptions.filter(
        (program) => program.id_bidang === this.selectedBidang
      );

      // Menggunakan Set untuk menghapus duplikat berdasarkan nama program
      const uniquePrograms = Array.from(
        new Set(filtered.map((program) => program.nama))
      ).map((nama) => {
        return filtered.find((program) => program.nama === nama);
      });

      // Atur hasil yang telah difilter dan dihapus duplikatnya ke filteredPrograms
      this.filteredPrograms = uniquePrograms;
    },
    filterPelaksanaanData() {
      if (this.laporanData.length > 0 && this.pelaksanaanData.length > 0) {
        // Temukan laporan yang sesuai dengan program, bulan, dan tahun yang dipilih
        const laporan = this.laporanData.find((laporan) => {
          const laporanMonth = new Date(laporan.bulan_laporan).getMonth() + 1;
          const laporanYear = new Date(laporan.bulan_laporan).getFullYear();
          return (
            laporan.program_id === this.selectedProgram &&
            laporanMonth === this.selectedMonth &&
            laporanYear === this.selectedYear
          );
        });

        if (laporan) {
          // Filter data pelaksanaan berdasarkan id_laporan_bulanan yang cocok
          const programKegiatanNamesWithDuplicates = this.pelaksanaanData
            .filter(
              (pelaksanaan) =>
                pelaksanaan.id_laporan_bulanan === laporan.id &&
                pelaksanaan.program_kegiatan // Hanya tampilkan pelaksanaan yang memiliki program_kegiatan
            )
            .map((pelaksanaan) => pelaksanaan.program_kegiatan.nama);

          // Hapus duplikat dengan Set
          this.programKegiatanNames = [
            ...new Set(programKegiatanNamesWithDuplicates),
          ];
        } else {
          this.programKegiatanNames = []; // Kosongkan jika tidak ada kecocokan
        }
      }
    },
    navigateToInputProgram() {
      this.$router.push({ path: "/inputprogram" });
    },
    navigateToInputBidang() {
      this.$router.push({ path: "/inputbidang" });
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 3; i--) {
        years.push(i);
      }
      return years;
    },
  },
  watch: {
    selectedProgram(newVal) {
      if (newVal === "Tambah Program") {
        this.navigateToInputProgram();
      }
      this.filterPelaksanaanData(); // Filter data pelaksanaan setiap kali program dipilih
      this.matchPenyusun(); // Panggil matchPenyusun ketika program yang dipilih berubah
    },
    selectedBidang(newVal) {
      if (newVal === "Tambah Bidang") {
        this.navigateToInputBidang();
      } else {
        this.filterPrograms();
      }
    },
    selectedMonth() {
      this.matchPenyusun(); // Panggil matchPenyusun ketika bulan yang dipilih berubah
      this.filterPelaksanaanData(); // Update data ketika bulan berubah
    },
    selectedYear() {
      this.matchPenyusun(); // Panggil matchPenyusun ketika tahun yang dipilih berubah
      this.filterPelaksanaanData(); // Update data ketika tahun berubah
    },
  },
};
</script>

<style>
.penyusun {
  display: flex;
  align-content: center;
  align-items: center;
}

.profile-susun {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: gray;
  overflow: hidden;
  margin-right: 6px;
}

.profile-susun img {
  width: 50px;
  height: 50px;
  object-fit: cover; /* Menyesuaikan gambar sesuai ukuran elemen */
}

.profile-disetujui {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: gray;
  overflow: hidden;
  margin-right: 6px;
  margin-left: 15px;
}

.profile-disetujui img {
  width: 50px;
  height: 50px;
  object-fit: cover; /* Menyesuaikan gambar sesuai ukuran elemen */
}

.teks-pelaksanaan {
  text-align: left;
  font-weight: bold;
  font-size: 14;
}

.kotak-deskripsi {
  display: flex;

  margin-top: 15px;
  margin-bottom: 24px;
}

.kotak-teks {
  background-color: #967c55;
  width: 265px;
  text-align: left;
  align-content: center;
  align-items: center;
}

.teks-kegiatan {
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 8px;
}

.tombol-tambah {
  align-content: center;
  align-items: center;
  margin-left: 4px;
  height: 45px;
  width: 31px;
  font-size: 24px;
  color: white;
  background-color: #967c55;
}

.box-evaluasi {
  width: 1100px;
  height: 40px;
  background-color: #d9d9d9;
}

.text-evaluasi {
  padding-top: 10px;
  padding-left: 15px;
  text-align: left;
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.kotak-dana {
  width: 1100px;
  height: 120px;
  background-color: #d9d9d9;
  text-align: left;
}

.dana {
  margin-left: 12px;
  font-weight: bold;
}
</style>
