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
  { pertanyaan: "Benda di bawah ini yang dapat ditarik oleh magnet adalah ...", pilihan: ["Karet gelang", "Pensil kayu", " Penghapus", "Paku besi"], jawaban: "Paku besi" },
  { pertanyaan: "Kutub magnet yang berbeda jenis jika didekatkan akan ...", pilihan: ["Saling tolak-menolak", "Saling tarik-menarik", "Tidak bereaksi", "Melekat secara permanen"], jawaban: "Saling tarik-menarik" },
  { pertanyaan: "Hubungan antara makhluk hidup dan lingkungan tempat tinggalnya disebut ...", pilihan: ["Habitat", "Komunitas", "Ekosistem", " Populasi"], jawaban: "Ekosistem" },
  { pertanyaan: "Contoh interaksi antar makhluk hidup dalam ekosistem adalah ...", pilihan: ["Air mengalir ke sungai", "Tanaman tumbuh subur karena pupuk", "Burung memakan ulat di pohon", "Batu menghalangi aliran air"], jawaban: "Burung memakan ulat di pohon" },
  { pertanyaan: "Makhluk hidup yang bertugas sebagai pengurai dalam jaring-jaring makanan adalah ...", pilihan: ["Rumput", "Kambing", "Elang", "Jamur"], jawaban: "Jamur" },
  { pertanyaan: "Dalam jaring-jaring makanan, hewan pemakan tumbuhan disebut ...", pilihan: ["Karnivora", "Herbivora", "Omnivora", "Predator"], jawaban: "Herbivora" },
  { pertanyaan: "Organ utama pada sistem pernapasan manusia adalah ...", pilihan: ["Jantung", "Usus", "Paru-paru", "Lambung"], jawaban: "Paru-paru" },
  { pertanyaan: "Fungsi hidung dalam sistem pernapasan adalah untuk ...", pilihan: ["Mengatur detak jantung", "Mencerna makanan", "Menyaring udara yang masuk", "Menyerap oksigen ke darah"], jawaban: "Menyaring udara yang masuk" },
  { pertanyaan: "Proses pencernaan makanan dimulai dari ...", pilihan: ["Usus Besar", "Lambung", "Mulut", "Kerongkongan"], jawaban: "Mulut" },
  { pertanyaan: "Enzim dalam air ludah berfungsi untuk ...", pilihan: ["Menghaluskan makanan secara mekanis", " Menghancurkan makanan dengan asam", "Memecah makanan secara kimia", "Menyaring racun dari makanan"], jawaban: "Memecah makanan secara kimia" }
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
