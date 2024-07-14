<template>
  <div class="profile">
    <div class="card1">
      <div class="card mb-3" style="max-width: 1381px; max-height: fit-content">
        <div class="kepala" style="width: 1381px">
          <p @click="goBack">
            <b-icon-arrow-left-circle-fill
              style="margin-right: 26px"
            ></b-icon-arrow-left-circle-fill>
            Laporan / Laporan Rekap
          </p>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th style="font-weight: bold">No</th>
                <th style="font-weight: bold">Program Kegiatan</th>
                <th style="font-weight: bold">Target</th>

                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Jan
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Feb
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Mar
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Apr
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Mei
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Jun
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Jul
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Agust
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Sep
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Okt
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Nov
                </th>
                <th style="width: calc((100% - 40px) / 13); font-weight: bold">
                  Des
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in combinedData" :key="index">
                <td>{{ item.no }}</td>
                <td>{{ item.program.displayName }}</td>
                <td>{{ item.target }}</td>

                <td>{{ item.jan }}</td>
                <td>{{ item.feb }}</td>
                <td>{{ item.mar }}</td>
                <td>{{ item.apr }}</td>
                <td>{{ item.mei }}</td>
                <td>{{ item.jun }}</td>
                <td>{{ item.jul }}</td>
                <td>{{ item.aug }}</td>
                <td>{{ item.sep }}</td>
                <td>{{ item.oct }}</td>
                <td>{{ item.nov }}</td>
                <td>{{ item.dec }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/lib/axios";

export default {
  data() {
    return {
      combinedData: [], // Array to store combined program and KPI data
    };
  },
  methods: {
    goBack() {
      // Fungsi ini akan mengarahkan pengguna kembali ke halaman sebelumnya
      this.$router.go(-1); // Menggunakan Vue Router untuk navigasi kembali
    },
    fetchPrograms() {
      // Fetch all required data and combine them
      axios
        .get("/api/programKegiatanKPI")
        .then((responseProgram) => {
          const programData = responseProgram.data;

          axios
            .get("/api/keyPerformanceIndicator")
            .then((responseKPI) => {
              const kpiData = responseKPI.data;

              axios
                .get("/api/laporanKPIBulanan")
                .then((responseLaporan) => {
                  const laporanData = responseLaporan.data;

                  axios
                    .get("/api/itemKegiatanRKA")
                    .then((responseItemKegiatan) => {
                      const itemKegiatanData = responseItemKegiatan.data;

                      let combinedData = [];
                      let displayedPrograms = new Set();
                      let noCounter = 1; // Initialize counter for "No" column

                      programData.forEach((program) => {
                        const relatedKPIs = kpiData.filter(
                          (kpi) => kpi.id_program_kegiatan_kpi === program.id
                        );

                        if (relatedKPIs.length) {
                          relatedKPIs.forEach((kpi) => {
                            const relatedLaporan = laporanData.find(
                              (laporan) => laporan.id_kpi === kpi.id
                            );

                            const relatedItemKegiatan = itemKegiatanData.find(
                              (item) => item.id === kpi.id
                            );

                            const isDuplicate = displayedPrograms.has(
                              program.id
                            );

                            const capaianValue = relatedLaporan
                              ? relatedLaporan.capaian
                              : "0";

                            combinedData.push({
                              no: isDuplicate ? "" : noCounter,
                              program: {
                                ...program,
                                displayName: isDuplicate ? "" : program.nama,
                              },
                              target: kpi.target,
                              capaian: capaianValue,
                              jan: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_jan === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              feb: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_feb === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              mar: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_mar === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              apr: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_apr === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              mei: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_mei === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              jun: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_jun === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              jul: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_jul === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              aug: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_aug === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              sep: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_sep === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              oct: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_oct === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              nov: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_nov === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                              dec: relatedItemKegiatan
                                ? relatedItemKegiatan.dana_dec === 1
                                  ? capaianValue
                                  : "0"
                                : "0",
                            });
                            if (!isDuplicate) {
                              displayedPrograms.add(program.id);
                              noCounter++; // Increment the counter for the first occurrence
                            }
                          });
                        } else {
                          const isDuplicate = displayedPrograms.has(program.id);
                          combinedData.push({
                            no: isDuplicate ? "" : noCounter,
                            program: {
                              ...program,
                              displayName: isDuplicate ? "" : program.nama,
                            },
                            target: "Tidak ada data",
                            capaian: "0",
                            jan: "0",
                            feb: "0",
                            mar: "0",
                            apr: "0",
                            mei: "0",
                            jun: "0",
                            jul: "0",
                            aug: "0",
                            sep: "0",
                            oct: "0",
                            nov: "0",
                            dec: "0",
                          });
                          if (!isDuplicate) {
                            displayedPrograms.add(program.id);
                            noCounter++; // Increment the counter for the first occurrence
                          }
                        }
                      });

                      // Sort combinedData by program.id
                      combinedData.sort((a, b) => a.program.id - b.program.id);

                      // Update numbering to start from 1 at the top
                      let currentNo = 1;
                      combinedData.forEach((item) => {
                        if (item.no !== "") {
                          item.no = currentNo++;
                        }
                      });

                      this.combinedData = combinedData;
                    })
                    .catch((error) => {
                      console.error(
                        "Error fetching Item Kegiatan RKA data:",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error("Error fetching Laporan KPI data:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching KPI data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching program data:", error);
        });
    },
  },
  mounted() {
    this.fetchPrograms(); // Fetch programs and KPI data when component is mounted
  },
};
</script>

<style>
.card1 {
  padding-left: 60px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
  overflow-y: auto;
}

.card1 .card {
  background-color: white;
}

.kepala {
  background-color: #967c55;
  height: 70px;
  width: 1381px;
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

.table-container {
  padding-left: 24px;
  padding-right: 17px;
  padding-top: 39px;
}

.table {
  width: calc(100% - 41px); /* 24px (padding kiri) + 17px (padding kanan) */
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  font-size: 12px;
  font-weight: 600;
}
</style>
