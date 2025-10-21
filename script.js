function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  page.classList.add('active');

  if (id === 'opening') resetForm();
}

function resetForm() {
  document.querySelectorAll('input, select').forEach(el => el.value = "");
  const hasil = document.getElementById('hasil');
  hasil.classList.add('hidden');
  hasil.classList.remove('show', 'result-low', 'result-medium', 'result-high');
  hasil.innerHTML = "";
  document.getElementById('saveGroup').classList.add('hidden');
}

// Tombol navigasi
document.getElementById('mulaiBtn').onclick = () => showPage('pemeriksaan');
document.getElementById('tipsBtn').onclick = () => showPage('tips');
document.getElementById('backHomeBtn').onclick = () => showPage('opening');
document.getElementById('backHomeTips').onclick = () => showPage('opening');

// Hitung Risiko
document.getElementById('hitungBtn').onclick = () => {
  const nama = document.getElementById('nama').value.trim();
  const usia = parseInt(document.getElementById('usia').value);
  const berat = parseFloat(document.getElementById('berat').value);
  const tinggi = parseFloat(document.getElementById('tinggi').value) / 100;
  const aktivitas = document.getElementById('aktivitas').value;
  const riwayat = document.getElementById('riwayat').value;

  if (!nama || !usia || !berat || !tinggi || !aktivitas || !riwayat) {
    alert('⚠️ Semua data wajib diisi sebelum menghitung risiko.');
    return;
  }

  // Hitung BMI
  const bmi = berat / (tinggi * tinggi);
  let skor = 0;

  // Skor BMI
  if (bmi >= 25) skor += 2;
  else if (bmi >= 23) skor += 1;

  // Skor usia
  if (usia >= 45) skor += 2;
  else if (usia >= 35) skor += 1;

  // Aktivitas
  if (aktivitas === "rendah") skor += 2;
  else if (aktivitas === "sedang") skor += 1;

  // Riwayat keluarga
  if (riwayat === "ada") skor += 2;

  // Tentukan risiko
  let kategori = "";
  let kelas = "";
  let saran = "";

  if (skor <= 2) {
    kategori = "Rendah";
    kelas = "result-low";
    saran = "Pertahankan pola hidup sehat dan tetap aktif 💪";
  } else if (skor <= 5) {
    kategori = "Sedang";
    kelas = "result-medium";
    saran = "Mulailah perhatikan pola makan dan rutin berolahraga 🏃‍♂️";
  } else {
    kategori = "Tinggi";
    kelas = "result-high";
    saran = "Segera konsultasikan ke dokter untuk pemeriksaan lebih lanjut 🩺";
  }

  // Tampilkan hasil
  const hasil = document.getElementById('hasil');
  hasil.innerHTML = `
    <h3>Hasil Pemeriksaan</h3>
    <p>Halo <b>${nama}</b> 👋</p>
    <p>BMI Anda: <b>${bmi.toFixed(1)}</b></p>
    <p><b>Risiko Anda: ${kategori}</b></p>
    <p>${saran}</p>
  `;
  hasil.className = `hasil show ${kelas}`;

  document.getElementById('saveGroup').classList.remove('hidden');
};

// Simpan dan hapus data
document.getElementById('saveBtn').onclick = () => {
  alert('✅ Data berhasil disimpan.');
  resetForm();
  showPage('opening');
};

document.getElementById('deleteBtn').onclick = () => {
  alert('🗑️ Data dihapus.');
  resetForm();
  showPage('opening');
};








































