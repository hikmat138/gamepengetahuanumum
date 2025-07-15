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

  const popup = document.getElementById("popup-petunjuk");
  popup.style.display = "flex";
  popup.querySelector(".popup-content p").innerHTML = `
    <p>Jawablah setiap soal isian singkat dengan tepat.</p>
    <p>Soal berupa cerita matematika kelas 5.</p>
    <p>Setiap level berisi 10 soal.</p>
    <p>Nilai tiap level adalah 10 poin.</p>
    <p>Di akhir akan muncul skor akhir dan rata-rata.</p>
    <p>Level ini adalah level terakhir.</p>
  `;

  document.getElementById("tutup-petunjuk").addEventListener("click", () => {
    popup.style.display = "none";
  });

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

  document.querySelector(".btn-information").addEventListener("click", () => {
    alert("Game Pengetahuan Umum. Jawab semua soal dan dapatkan skor terbaikmu!");
  });

  document.querySelector(".btn-profil").addEventListener("click", () => {
    document.getElementById("popup-profil").style.display = "flex";
  });
  document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("popup-profil").style.display = "none";
  });

  const soalMTK = [
    { soal: "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 5 cm. Berapa cm² luasnya?", jawaban: "60" },
    { soal: "Jumlah siswa laki-laki 20 orang dan perempuan 15 orang. Berapa jumlah seluruh siswa?", jawaban: "35" },
    { soal: "Ibu membeli 3 kg gula. Setiap kg harganya Rp12.000. Berapa total yang harus dibayar?", jawaban: "36000" },
    { soal: "Hasil dari -5 + 8 adalah:", jawaban: "3" },
    { soal: "Keliling persegi dengan panjang sisi 9 cm adalah:", jawaban: "36" },
    { soal: "Suhu di kulkas adalah -4°C. Jika dinaikkan 6 derajat, menjadi:", jawaban: "2" },
    { soal: "Rata-rata dari 10, 20, dan 30 adalah:", jawaban: "20" },
    { soal: "Jumlah sudut pada bangun segitiga adalah:", jawaban: "180" },
    { soal: "Berat apel 1,5 kg. Jika dibeli 4 kg, berapa kali berat apel?", jawaban: "2.67" },
    { soal: "Jumlah hari dalam 3 minggu adalah:", jawaban: "21" }
  ];

  const suaraBenar = new Audio("media/benar.mp3");
  const suaraSalah = new Audio("media/salah.mp3");
  const suaraSukses = new Audio("media/sukses.mp3");
  const suaraGagal = new Audio("media/gagal.mp3");

  let indexSoal = 0;
  let skor = 0;

  const soalTeks = document.getElementById("soal-teks");
  const jawabanInput = document.getElementById("jawaban-input");
  const nomorSoal = document.getElementById("nomor-soal");
  const tombolNext = document.getElementById("next-button");

  const feedbackEl = document.createElement("div");
  feedbackEl.id = "feedback-jawaban";
  feedbackEl.style.marginTop = "10px";
  feedbackEl.style.fontSize = "16px";
  feedbackEl.style.fontWeight = "bold";
  feedbackEl.style.fontFamily = "Times New Roman";
  feedbackEl.style.color = "white";
  document.querySelector(".soal-wrapper").appendChild(feedbackEl);

  function tampilkanSoal() {
    const soal = soalMTK[indexSoal];
    nomorSoal.textContent = `Soal ${indexSoal + 1}`;
    soalTeks.textContent = soal.soal;
    jawabanInput.value = "";
    jawabanInput.disabled = false;
    jawabanInput.style.backgroundColor = "white";
    jawabanInput.style.color = "black";
    jawabanInput.focus();
    tombolNext.disabled = true;
    tombolNext.textContent = indexSoal < soalMTK.length - 1 ? "Jawab" : "Selesai";
    feedbackEl.textContent = "";
  }

  jawabanInput.addEventListener("input", () => {
    tombolNext.disabled = jawabanInput.value.trim() === "";
  });

  jawabanInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !tombolNext.disabled) {
      tombolNext.click();
    }
  });

  function playAudio(audio, callback) {
    audio.currentTime = 0;
    audio.play();
    audio.onended = () => {
      callback();
    };
  }

  tombolNext.addEventListener("click", () => {
    const userJawab = jawabanInput.value.trim().toLowerCase();
    const kunciJawaban = soalMTK[indexSoal].jawaban.toLowerCase();

    jawabanInput.disabled = true;

    const lanjut = () => {
      indexSoal++;
      if (indexSoal < soalMTK.length) {
        tampilkanSoal();
      } else {
        // Simpan skor level4
        localStorage.setItem("skor_level4", skor);

        // Ambil skor semua level
        const skor1 = parseInt(localStorage.getItem("skor_level1") || "0");
        const skor2 = parseInt(localStorage.getItem("skor_level2") || "0");
        const skor3 = parseInt(localStorage.getItem("skor_level3") || "0");
        const skor4 = skor;

        const total = skor1 + skor2 + skor3 + skor4;
        const rataRata = total / 4;

        const popup = document.createElement("div");
        popup.className = "popup-overlay";
        popup.innerHTML = `
          <div class="popup-content">
            <h3>Permainan Selesai!</h3>
            <p>Skor kamu: ${skor}/100</p>
            <p>Rata-rata: ${rataRata}</p>
            <a id="kirim-wa" target="_blank">Kirim ke WhatsApp</a>
            <br><br>
            <button id="keluar-index">Keluar ke Beranda</button>
          </div>
        `;
        document.body.appendChild(popup);

        const nama = localStorage.getItem("nama_pengguna") || "Siswa";
        const pesanWA = `Halo, saya ${nama}. Skor saya ${skor}/100. Rata-rata saya: ${rataRata}`;
        const linkWA = `https://wa.me/62859106919534?text=${encodeURIComponent(pesanWA)}`;
        document.getElementById("kirim-wa").href = linkWA;

        document.getElementById("keluar-index").addEventListener("click", () => {
          window.location.href = "index.html";
        });

        playAudio(suaraSukses, () => {});
      }
    };

    if (userJawab === kunciJawaban) {
      skor += 10;
      jawabanInput.style.backgroundColor = "#28a745";
      jawabanInput.style.color = "white";
      feedbackEl.textContent = "Jawaban benar";
      playAudio(suaraBenar, lanjut);
    } else {
      jawabanInput.style.backgroundColor = "crimson";
      jawabanInput.style.color = "white";
      feedbackEl.textContent = `Jawaban seharusnya: ${soalMTK[indexSoal].jawaban}`;
      playAudio(suaraSalah, lanjut);
    }
  });

  tampilkanSoal();
});
