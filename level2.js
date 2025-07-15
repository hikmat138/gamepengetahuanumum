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

const soalLevel2 = [
  { pertanyaan: "Indonesia disebut negara agraris karena sebagian besar penduduknya bekerja di bidang ?", jawaban: "pertanian" },
  { pertanyaan: "Nelayan adalah contoh pekerjaan manusia yang tinggal di daerah?", jawaban: "Pantai" },
  { pertanyaan: "Apa nama presiden pertama Indonesia?", jawaban: "Soekarno" },
  { pertanyaan: "Kegiatan ekonomi yang menghasilkan barang disebut kegiatan?", jawaban: " produksi" },
  { pertanyaan: "Laut, sungai, dan hutan adalah contoh sumber daya alam yang ada di ...", jawaban: "lingkungan sekitar" },
  { pertanyaan: "Indonesia disebut negara maritim karena memiliki wilayah laut yang sangat ...", jawaban: "luas" },
  { pertanyaan: "Kegiatan menjual hasil pertanian di pasar termasuk dalam kegiatan ekonomi berupa ...", jawaban: "distribusi" },
  { pertanyaan: "Apa nama provinsi paling timur Indonesia?", jawaban: "Papua" },
  { pertanyaan: "Orang yang membuat barang seperti meja, kursi, dan lemari disebut ...", jawaban: "Pengrajin" },
  { pertanyaan: " Kegiatan membeli barang dari produsen dan menjualnya kembali disebut ...", jawaban: "perdagangan" }
];

let indexSoal = 0;
let skorLevel2 = 0;

const soalTeks = document.getElementById("soal-teks");
const nomorSoal = document.getElementById("nomor-soal");
const inputJawaban = document.getElementById("jawaban-input");
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
  const soal = soalLevel2[indexSoal];
  soalTeks.textContent = soal.pertanyaan;
  nomorSoal.textContent = `Soal ${indexSoal + 1} dari ${soalLevel2.length}`;
  inputJawaban.value = "";
  inputJawaban.disabled = false;
  inputJawaban.style.backgroundColor = "white";
  inputJawaban.style.color = "black";
  feedbackEl.textContent = "";
  tombolNext.disabled = true;
  inputJawaban.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  const nama = localStorage.getItem("nama_pengguna");
  if (nama) {
    const label = document.getElementById("nama-pengguna-label");
    if (label) label.textContent = `Nama: ${nama}`;
  }

  tampilkanSoal();

  document.querySelector(".btn-information")?.addEventListener("click", () => {
    alert("Jawablah semua soal IPS. Ketik jawaban yang benar. Setiap soal bernilai 10 poin.");
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

inputJawaban.addEventListener("input", () => {
  tombolNext.disabled = inputJawaban.value.trim() === "";
});

inputJawaban.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !tombolNext.disabled) {
    tombolNext.click();
  }
});

tombolNext.addEventListener("click", () => {
  const jawabanBenar = soalLevel2[indexSoal].jawaban.toLowerCase();
  const jawabanUser = inputJawaban.value.trim().toLowerCase();
  inputJawaban.disabled = true;

  const lanjut = () => {
    indexSoal++;
    if (indexSoal < soalLevel2.length) {
      tampilkanSoal();
    } else {
      localStorage.setItem("skor_level2", skorLevel2);
      localStorage.setItem("level2_selesai", "true");
      const lulus = skorLevel2 >= 70;
      setTimeout(() => {
        jedaAudioLainSaatMain(lulus ? suaraSukses : suaraGagal);
        if (lulus) suaraSukses.play(); else suaraGagal.play();

        const popup = document.createElement("div");
        popup.className = "popup-overlay";
        popup.innerHTML = `
          <div class="popup-content">
            <h3>Level 2 Selesai!</h3>
            <p>Skor kamu: ${skorLevel2}</p>
            <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
              ${lulus ? '<button onclick="window.location.href=\'level.html\'">Lanjut ke Menu Level</button>' : ''}
              <button onclick="window.location.reload()">Ulangi Level</button>
            </div>
          </div>
        `;
        document.body.appendChild(popup);
      }, 500);
    }
  };

  if (jawabanUser === jawabanBenar) {
    jedaAudioLainSaatMain(suaraBenar);
    skorLevel2 += 10;
    inputJawaban.style.backgroundColor = "green";
    inputJawaban.style.color = "white";
    feedbackEl.textContent = "Jawaban benar";
    suaraBenar.play();
    suaraBenar.onended = lanjut;
  } else {
    jedaAudioLainSaatMain(suaraSalah);
    inputJawaban.style.backgroundColor = "crimson";
    inputJawaban.style.color = "white";
    feedbackEl.textContent = `Jawaban seharusnya: ${soalLevel2[indexSoal].jawaban}`;
    suaraSalah.play();
    suaraSalah.onended = lanjut;
  }
});
