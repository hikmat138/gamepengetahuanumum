// Menampilkan nama pengguna di pojok kiri atas
window.addEventListener("DOMContentLoaded", () => {
  const nama = localStorage.getItem("nama_pengguna");
  if (nama) {
    const label = document.getElementById("nama-pengguna-label");
    label.textContent = `Nama: ${nama}`;
    label.style.color = "#fff";
    label.style.fontSize = "24px";
    label.style.fontWeight = "bold";
  }

  // Tampilkan popup petunjuk saat halaman dimuat pertama kali
  const popup = document.getElementById("popup-petunjuk");
  popup.style.display = "flex";

  const petunjukText = popup.querySelector(".popup-content p");
  petunjukText.innerHTML = `
    <p>Jawablah setiap soal sesuai kemampuanmu.</p>
    <p>Setiap level berisi 10 soal.</p>
    <p>Nilai tiap level adalah 10 poin.</p>
    <p>Di akhir akan muncul skor akhir dan rata-rata.</p>
    <p>Tidak ada remedial, kerjakan dengan sungguh-sungguh!</p>
  `;

  document.getElementById("tutup-petunjuk").addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Tombol Ganti Nama
  document.querySelector(".btn-reset-nama").addEventListener("click", () => {
    if (confirm("Yakin ingin mengganti nama pengguna?")) {
      localStorage.removeItem("nama_pengguna");
      const namaBaru = prompt("Masukkan nama baru:");
      if (namaBaru && namaBaru.trim() !== "") {
        localStorage.setItem("nama_pengguna", namaBaru.trim());
        document.getElementById("nama-pengguna-label").textContent = `Nama: ${namaBaru.trim()}`;
      }
    }
  });

  // Tombol Info
  document.querySelector(".btn-information").addEventListener("click", () => {
    alert("Game Pengetahuan Umum. Jawab semua soal dan dapatkan skor terbaikmu!");
  });

  // Tombol Profil (menggunakan elemen popup-profil yang sudah ada di HTML)
  document.querySelector(".btn-profil").addEventListener("click", () => {
    document.getElementById("popup-profil").style.display = "flex";
  });

  document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("popup-profil").style.display = "none";
  });

  // Tombol level (navigasi manual)
  const tombolLevel1 = document.getElementById("level1");
  const tombolLevel2 = document.getElementById("level2");
  const tombolLevel3 = document.getElementById("level3");
  const tombolLevel4 = document.getElementById("level4");

  tombolLevel1.addEventListener("click", () => {
    window.location.href = "level1.html";
  });
  tombolLevel2.addEventListener("click", () => {
    window.location.href = "level2.html";
  });
  tombolLevel3.addEventListener("click", () => {
    window.location.href = "level3.html";
  });
  tombolLevel4.addEventListener("click", () => {
    window.location.href = "level4.html";
  });

  // Aktifkan tombol level berikutnya jika level sebelumnya sudah selesai
  if (localStorage.getItem("level1_selesai") === "true") {
    tombolLevel2.disabled = false;
  }
  if (localStorage.getItem("level2_selesai") === "true") {
    tombolLevel3.disabled = false;
  }
  if (localStorage.getItem("level3_selesai") === "true") {
    tombolLevel4.disabled = false;
  }
});
