// Menampilkan nama pengguna di pojok kiri atas
let volumeSlider;
const suaraBenar = new Audio("media/benar.mp3");
const suaraSalah = new Audio("media/salah.mp3");
const suaraSukses = new Audio("media/sukses.mp3");
const suaraGagal = new Audio("media/gagal.mp3");

function setVolumeAll(vol) {
  suaraBenar.volume = vol;
  suaraSalah.volume = vol;
  suaraSukses.volume = vol;
  suaraGagal.volume = vol;
}

function jedaAudioLainSaatMain(audio) {
  [suaraBenar, suaraSalah, suaraSukses, suaraGagal].forEach(aud => {
    if (aud !== audio && !aud.paused) {
      aud.pause();
      aud.currentTime = 0;
    }
  });
}

const soalLevel1 = [
  { pertanyaan: "Apa planet terbesar di tata surya?", pilihan: ["Bumi", "Mars", "Jupiter", "Venus"], jawaban: "Jupiter" },
  { pertanyaan: "Planet manakah yang paling dekat dengan matahari?", pilihan: ["Merkurius", "Venus", "Mars", "Saturnus"], jawaban: "Merkurius" },
  { pertanyaan: "Planet manakah yang dikenal memiliki cincin besar?", pilihan: ["Saturnus", "Uranus", "Neptunus", "Mars"], jawaban: "Saturnus" },
  { pertanyaan: "Planet manakah yang disebut sebagai planet merah?", pilihan: ["Venus", "Mars", "Jupiter", "Neptunus"], jawaban: "Mars" },
  { pertanyaan: "Berapakah jumlah planet di tata surya?", pilihan: ["7", "8", "9", "10"], jawaban: "8" },
  { pertanyaan: "Planet manakah yang memiliki rotasi paling cepat?", pilihan: ["Jupiter", "Saturnus", "Bumi", "Venus"], jawaban: "Jupiter" },
  { pertanyaan: "Planet manakah yang memiliki suhu terpanas?", pilihan: ["Merkurius", "Venus", "Mars", "Jupiter"], jawaban: "Venus" },
  { pertanyaan: "Planet manakah yang paling jauh dari matahari?", pilihan: ["Neptunus", "Uranus", "Saturnus", "Pluto"], jawaban: "Neptunus" },
  { pertanyaan: "Apa nama satelit alami Bumi?", pilihan: ["Phobos", "Deimos", "Europa", "Bulan"], jawaban: "Bulan" },
  { pertanyaan: "Planet manakah yang memiliki hari terpanjang?", pilihan: ["Venus", "Merkurius", "Mars", "Uranus"], jawaban: "Venus" }
];

let indexSoal = 0;
let skorLevel1 = 0;
let jawabanTerpilih = "";

const soalTeks = document.getElementById("soal-teks");
const nomorSoal = document.getElementById("nomor-soal");
const opsiContainer = document.querySelector(".opsi-jawaban");
const tombolNext = document.getElementById("next-button");

document.addEventListener("DOMContentLoaded", () => {
  const nama = localStorage.getItem("nama_pengguna");
  if (nama) {
    const label = document.getElementById("nama-pengguna-label");
    if (label) label.textContent = `Nama: ${nama}`;
  }

  tampilkanSoal();

  document.querySelector(".btn-information")?.addEventListener("click", () => {
    alert("Jawablah semua soal pengetahuan umum. Pilih jawaban yang benar. Setiap soal bernilai 10 poin.");
  });

  document.querySelector(".btn-profil")?.addEventListener("click", () => {
    const popup = document.getElementById("popup-profil");
    if (popup) popup.style.display = "flex";
  });

  document.getElementById("reset-nama-btn")?.addEventListener("click", () => {
    if (confirm("Yakin ingin mengganti nama pengguna?")) {
      const namaBaru = prompt("Masukkan nama baru:");
      if (namaBaru && namaBaru.trim() !== "") {
        localStorage.setItem("nama_pengguna", namaBaru.trim());
        const label = document.getElementById("nama-pengguna-label");
        if (label) label.textContent = `Nama: ${namaBaru.trim()}`;
      }
    }
  });

  volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      setVolumeAll(parseFloat(volumeSlider.value));
    });
    setVolumeAll(parseFloat(volumeSlider.value));
  }
});

function tampilkanSoal() {
  const soal = soalLevel1[indexSoal];
  soalTeks.textContent = soal.pertanyaan;
  nomorSoal.textContent = `Soal ${indexSoal + 1} dari ${soalLevel1.length}`;
  opsiContainer.innerHTML = "";
  jawabanTerpilih = "";

  soal.pilihan.forEach((opsi, i) => {
    const tombol = document.createElement("button");
    const abcd = ["A", "B", "C", "D"];
    tombol.textContent = `${abcd[i]}. ${opsi}`;
    tombol.dataset.jawaban = opsi;
    tombol.onclick = () => pilihJawaban(tombol, opsi);
    opsiContainer.appendChild(tombol);
  });
  tombolNext.disabled = true;
}

function pilihJawaban(button, pilihan) {
  document.querySelectorAll(".opsi-jawaban button").forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
  jawabanTerpilih = pilihan;
  tombolNext.disabled = false;
  suaraBenar.pause(); suaraBenar.currentTime = 0;
  suaraSalah.pause(); suaraSalah.currentTime = 0;
  suaraSukses.pause(); suaraSukses.currentTime = 0;
  suaraGagal.pause(); suaraGagal.currentTime = 0;
}

tombolNext.addEventListener("click", () => {
  const jawabanBenar = soalLevel1[indexSoal].jawaban;
  const semuaTombol = document.querySelectorAll(".opsi-jawaban button");

  semuaTombol.forEach((btn) => {
    const isi = btn.textContent.split(". ")[1];
    if (isi === jawabanBenar) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    } else if (isi === jawabanTerpilih) {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    }
    btn.disabled = true;
  });

  if (jawabanTerpilih === jawabanBenar) {
    jedaAudioLainSaatMain(suaraBenar);
    skorLevel1 += 10;
    suaraBenar.play();
  } else {
    jedaAudioLainSaatMain(suaraSalah);
    suaraSalah.play();
  }

  setTimeout(() => {
    indexSoal++;
    if (indexSoal < soalLevel1.length) {
      tampilkanSoal();
    } else {
      localStorage.setItem("skor_level1", skorLevel1);
      localStorage.setItem("level1_selesai", "true");
      const lulus = skorLevel1 >= 70;
      setTimeout(() => {
        jedaAudioLainSaatMain(lulus ? suaraSukses : suaraGagal);
        if (lulus) suaraSukses.play(); else suaraGagal.play();
      }, 500);

      document.body.innerHTML += `
        <div class="popup-overlay">
          <div class="popup-content">
            <h3>Level 1 Selesai!</h3>
            <p>Skor kamu: ${skorLevel1}</p>
            <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
              ${lulus ? '<button id="lanjut-button">Lanjut ke Menu Level</button>' : ''}
              <button id="ulangi-button">Ulangi Level</button>
            </div>
          </div>
        </div>
      `;
      if (lulus) {
        document.getElementById("lanjut-button").onclick = () => {
          window.location.href = "level.html";
        };
      }
      document.getElementById("ulangi-button").onclick = () => {
        window.location.reload();
      };
    }
  }, 1800);
});
