// nama_pengguna.js

document.addEventListener("DOMContentLoaded", function () {
  const popupNama = document.getElementById("popup-nama");
  const inputNama = document.getElementById("input-nama");
  const btnSimpan = document.getElementById("btn-simpan-nama");

  // Jangan munculkan popup otomatis!
  // Hanya akan muncul ketika tombol .btn-pengetahuan diklik (diatur di script.js)

  // Simpan nama pengguna saat tombol diklik
  btnSimpan.addEventListener("click", function () {
    const nama = inputNama.value.trim();
    if (nama !== "") {
      localStorage.setItem("nama_pengguna", nama);
      popupNama.style.display = "none";
      window.location.href = "level.html";
    } else {
      alert("Nama tidak boleh kosong!");
    }
  });
});
