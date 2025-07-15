// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Tombol profil di pojok kanan atas
  document.querySelector(".btn-profil")?.addEventListener("click", () => {
    document.getElementById("popup-profil").style.display = "flex";
  });

  // Tombol tutup profil
  document.getElementById("popup-close")?.addEventListener("click", () => {
    document.getElementById("popup-profil").style.display = "none";
  });

  // Tombol informasi
  document.querySelector(".btn-information")?.addEventListener("click", () => {
    alert("Game Pengetahuan Umum interaktif untuk siswa kelas 5 SD.\nJawaban bisa berupa pilihan ganda, isian, atau drag-and-drop.");
  });

  // Tombol utama "PENGETAHUAN UMUM" → munculkan popup input nama
  document.querySelector(".btn-pengetahuan")?.addEventListener("click", () => {
    document.getElementById("popup-nama").style.display = "flex";
  });

  // Tombol Ganti Nama
  document.getElementById("reset-nama-btn")?.addEventListener("click", () => {
    if (confirm("Yakin ingin mengganti nama pengguna?")) {
      localStorage.removeItem("nama_pengguna");
      location.reload();
    }
  });
});
