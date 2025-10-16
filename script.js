const opening = document.getElementById('opening');
const mainApp = document.getElementById('mainApp');
const startBtn = document.getElementById('startBtn');
const hitungBtn = document.getElementById('hitungBtn');
const resetBtn = document.getElementById('resetBtn');
const hasil = document.getElementById('hasil');
const warning = document.getElementById('warning');
const notif = document.getElementById('notif');

startBtn.addEventListener('click', () => {
  opening.classList.add('fade-out');
  setTimeout(() => {
    opening.style.display = 'none';
    mainApp.classList.remove('hidden');
    mainApp.classList.add('fade-in');
  }, 600);
});

hitungBtn.addEventListener('click', () => {
  const nama = document.getElementById('nama').value.trim();
  const usia = parseInt(document.getElementById('usia').value);
  const berat = parseFloat(document.getElementById('berat').value);
  const tinggi = parseFloat(document.getElementById('tinggi').value) / 100;
  const aktivitas = document.getElementById('aktivitas').value;
  const riwayat = document.getElementById('riwayat').value;

  if (!nama || !usia || !berat || !tinggi || !aktivitas || !riwayat) {
    warning.classList.remove('hidden');
    hasil.classList.add('hidden');
    resetBtn.classList.add('hidden');
    return;
  } else {
    warning.classList.add('hidden');
  }

  const bmi = berat / (tinggi * tinggi);
  let skor = 0;

  if (usia >= 35 && usia < 50) skor += 1;
  if (usia >= 50) skor += 2;
  if (bmi >= 25 && bmi < 30) skor += 1;
  if (bmi >= 30) skor += 2;
  if (aktivitas === 'jarang') skor += 1;
  if (riwayat === 'ada') skor += 2;

  let risiko = '';
  let warna = '';

  if (skor <= 2) {
    risiko = 'Rendah';
    warna = '#4caf50';
  } else if (skor <= 4) {
    risiko = 'Sedang';
    warna = '#ff9800';
  } else {
    risiko = 'Tinggi';
    warna = '#f44336';
  }

  hasil.classList.remove('hidden');
  hasil.style.color = warna;
  hasil.innerHTML = `
    <h3>Hasil Pemeriksaan</h3>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Risiko Diabetes:</strong> ${risiko}</p>
    <p><small>(BMI Anda: ${bmi.toFixed(1)})</small></p>
  `;

  resetBtn.classList.remove('hidden');

  // Notifikasi sukses
  notif.classList.remove('hidden');
  notif.style.animation = 'slideDown 0.4s ease forwards';
  setTimeout(() => {
    notif.classList.add('hidden');
  }, 3000);
});

resetBtn.addEventListener('click', () => {
  document.querySelectorAll('input, select').forEach(el => el.value = '');
  hasil.classList.add('hidden');
  resetBtn.classList.add('hidden');
  warning.classList.add('hidden');
});










