<template>
  <div class="profile">
    <Sidebar />
    <div class="card-container">
      <div class="card mb-3" style="max-width: 1149px; max-height: fit-content">
        <div class="kepala">
          <p>profile</p>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              @change="changeImage"
              accept="image/*"
            />
            <img
              src="@/assets/profil.jpg"
              alt="Profile Picture"
              @click="openFileInput"
            />
          </div>
          <div class="col-6">
            <ul class="list-group">
              <li class="nama">Dewa Arjuna</li>
              <li class="role">Admin</li>
            </ul>
            <div class="identitas">
              <ul class="list-group list-group-horizontal-md">
                <li class="list-group-item">Nama:</li>
                <li class="list-group-item">Dewa Arjuna</li>
              </ul>
              <ul class="list-group list-group-horizontal-md">
                <li class="list-group-item">Email:</li>
                <li class="list-group-item">Dewa@gmail.com</li>
              </ul>
              <ul class="list-group list-group-horizontal-md">
                <li class="list-group-item">Status:</li>
                <li class="list-group-item">Admin</li>
              </ul>
            </div>
          </div>
          <div class="col">
            <div class="tombol">
              <button type="button" class="btn">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarView.vue";
export default {
  components: {
    Sidebar,
  },

  methods: {
    changeImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.$refs.image.src = reader.result; // Mengubah gambar dengan gambar yang dipilih dari galeri
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style>
.card-container {
  padding-left: 260px; /* Lebar sidebar + jarak antara sidebar dan kartu */
  padding-top: 33px;
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

.col img {
  margin-left: 24px;
  height: 218px;
  width: 219px;
}

.tombol {
  display: flex;
  justify-content: flex-end; /* Mengatur agar tombol berada di sebelah kanan */
  margin-right: 32px;
}

.tombol .btn {
  font-size: 16px;
  font-weight: 600;
  height: 35px;
  width: 110px;
}

.list-group .nama {
  font-weight: 600;
  list-style-type: none;
  font-size: 24px;
}

.list-group .role {
  font-weight: 600;
  list-style-type: none;
  font-size: 16px;
}

.row .col {
  margin-top: 28px;
}

.list-group .nama {
  margin-top: 28px;
}

.identitas {
  margin-top: 32px;
}

.identitas .list-group-item {
  background-color: white;
  border: none;
}
</style>
