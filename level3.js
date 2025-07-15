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
    <p>Centang semua jawaban yang benar pada setiap soal.</p>
    <p>Setiap level berisi 10 soal.</p>
    <p>Nilai tiap level adalah 10 poin.</p>
    <p>Di akhir akan muncul skor akhir dan rata-rata.</p>
    <p>Nilai minimal 70 untuk bisa lanjut ke level berikutnya.</p>
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

  const soalChecklist = [
    {
      pertanyaan: "Manakah yang merupakan nilai-nilai Pancasila?",
      jawabanBenar: ["Gotong royong", "Toleransi", "Musyawarah"],
      pilihan: ["Gotong royong", "Toleransi", "Individualisme", "Musyawarah"]
    },
    {
      pertanyaan: "Contoh perilaku sila pertama Pancasila:",
      jawabanBenar: ["Berdoa sebelum belajar", "Menghormati agama lain"],
      pilihan: ["Berdoa sebelum belajar", "Bolos sekolah", "Menghormati agama lain", "Mengganggu ibadah"]
    },
    {
      pertanyaan: "Hak anak di sekolah:",
      jawabanBenar: ["Mendapat pelajaran", "Bermain di waktu istirahat"],
      pilihan: ["Mendapat pelajaran", "Membully teman", "Bermain di waktu istirahat", "Merusak fasilitas"]
    },
    {
      pertanyaan: "Kewajiban warga negara:",
      jawabanBenar: ["Membayar pajak", "Menjaga kebersihan lingkungan"],
      pilihan: ["Membayar pajak", "Melanggar hukum", "Menjaga kebersihan lingkungan", "Menghindari aturan"]
    },
    {
      pertanyaan: "Sikap terhadap perbedaan suku:",
      jawabanBenar: ["Menghargai perbedaan", "Tidak membeda-bedakan teman"],
      pilihan: ["Menghargai perbedaan", "Mengejek suku lain", "Tidak membeda-bedakan teman", "Memaksakan budaya sendiri"]
    },
    {
      pertanyaan: "Sikap demokratis ditunjukkan dengan:",
      jawabanBenar: ["Menghargai pendapat orang lain", "Musyawarah untuk mufakat"],
      pilihan: ["Menghargai pendapat orang lain", "Memaksakan kehendak", "Musyawarah untuk mufakat", "Menolak perbedaan"]
    },
    {
      pertanyaan: "Manfaat gotong royong:",
      jawabanBenar: ["Pekerjaan menjadi ringan", "Menjalin kebersamaan"],
      pilihan: ["Pekerjaan menjadi ringan", "Menghambat pekerjaan", "Menjalin kebersamaan", "Menambah beban"]
    },
    {
      pertanyaan: "Contoh sikap adil:",
      jawabanBenar: ["Membagi tugas secara merata", "Tidak pilih kasih"],
      pilihan: ["Membagi tugas secara merata", "Mengutamakan teman dekat", "Tidak pilih kasih", "Memberi hadiah terus"]
    },
    {
      pertanyaan: "Ciri warga negara yang baik:",
      jawabanBenar: ["Mematuhi hukum", "Menjaga persatuan"],
      pilihan: ["Mematuhi hukum", "Berbuat seenaknya", "Menjaga persatuan", "Membuat keributan"]
    },
    {
      pertanyaan: "Tujuan dibuatnya aturan:",
      jawabanBenar: ["Menjaga ketertiban", "Melindungi hak orang lain"],
      pilihan: ["Menjaga ketertiban", "Membuat orang takut", "Melindungi hak orang lain", "Mengendalikan semua orang"]
    }
  ];

  let indexSoal = 0;
  let skor = 0;

  const soalTeks = document.getElementById("soal-teks");
  const opsiChecklist = document.getElementById("opsi-checklist");
  const tombolNext = document.getElementById("next-button");
  const suaraBenar = new Audio("media/benar.mp3");
  const suaraSalah = new Audio("media/salah.mp3");
  const suaraSukses = new Audio("media/sukses.mp3");
  const suaraGagal = new Audio("media/gagal.mp3");

  function jedaAudioLainSaatMain(audio) {
    [suaraBenar, suaraSalah, suaraSukses, suaraGagal].forEach(aud => {
      if (aud !== audio && !aud.paused) {
        aud.pause();
        aud.currentTime = 0;
      }
    });
  }

  function tampilkanSoal() {
    const soal = soalChecklist[indexSoal];
    soalTeks.textContent = `Soal ${indexSoal + 1}: ${soal.pertanyaan}`;
    opsiChecklist.innerHTML = "";
    tombolNext.disabled = true;
    tombolNext.textContent = "Jawab";

    soal.pilihan.forEach((opsi) => {
      const label = document.createElement("label");
      label.className = "opsi-check-item";
      label.innerHTML = `<input type="checkbox" value="${opsi}"> ${opsi}`;
      opsiChecklist.appendChild(label);

      label.querySelector("input").addEventListener("change", () => {
        const adaTercentang = opsiChecklist.querySelectorAll("input:checked").length > 0;
        tombolNext.disabled = !adaTercentang;
      });
    });
  }

  tombolNext.addEventListener("click", () => {
    if (tombolNext.textContent === "Jawab") {
      const jawabanBenar = soalChecklist[indexSoal].jawabanBenar.map(j => j.toLowerCase());
      const semuaInput = Array.from(opsiChecklist.querySelectorAll("input"));
      semuaInput.forEach(input => {
        const label = input.parentElement;
        const nilai = input.value.toLowerCase();
        if (jawabanBenar.includes(nilai)) {
          label.style.backgroundColor = "#28a745";
          label.style.color = "white";
        } else if (input.checked) {
          label.style.backgroundColor = "crimson";
          label.style.color = "white";
        }
        input.disabled = true;
      });

      const jawabanUser = semuaInput.filter(cb => cb.checked).map(cb => cb.value.toLowerCase()).sort();
      const isBenar = JSON.stringify(jawabanBenar.sort()) === JSON.stringify(jawabanUser);
      jedaAudioLainSaatMain(isBenar ? suaraBenar : suaraSalah);
      if (isBenar) {
        skor += 10;
        suaraBenar.play();
      } else {
        suaraSalah.play();
      }

      tombolNext.textContent = indexSoal < soalChecklist.length - 1 ? "Soal Berikutnya" : "Selesai";
    } else {
      indexSoal++;
      if (indexSoal < soalChecklist.length) {
        tampilkanSoal();
      } else {
        localStorage.setItem("skor_level3", skor);
        localStorage.setItem("level3_selesai", skor >= 70 ? "true" : "false");
        const lulus = skor >= 70;
        setTimeout(() => {
          jedaAudioLainSaatMain(lulus ? suaraSukses : suaraGagal);
          if (lulus) suaraSukses.play(); else suaraGagal.play();

          const popup = document.createElement("div");
          popup.className = "popup-overlay";
          popup.innerHTML = `
            <div class="popup-content">
              <h3>Level 3 Selesai!</h3>
              <p>Skor kamu: ${skor}</p>
              <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
                ${lulus ? '<button onclick="window.location.href=\'level.html\'">Lanjut ke Menu Level</button>' : ''}
                <button onclick="window.location.reload()">Ulangi Level</button>
              </div>
            </div>
          `;
          document.body.appendChild(popup);
        }, 500);
      }
    }
  });

  tampilkanSoal();
});
