let data = JSON.parse(localStorage.getItem("santriData")) || [];
let editIndex = null;

// Simpan data ke localStorage
function simpanKeStorage() {
  localStorage.setItem("santriData", JSON.stringify(data));
}

function tambahCatatan() {
  const nama = document.getElementById("nama").value;
  const rawat = document.getElementById("rawat").value;
  if (!nama || !rawat) return;

  data.push({nama, rawat});
  simpanKeStorage(); // simpan ke localStorage
  renderList();

  document.getElementById("nama").value = "";
  document.getElementById("rawat").value = "";
}

function renderList() {
  const ul = document.getElementById("catatan");
  ul.innerHTML = "";

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "catatan-item";
    li.innerHTML = `
      <span><b>${item.nama}</b> - ${item.rawat}</span>
      <div>
        <button class="edit-btn" onclick="editData(${index})">Edit</button>
        <button class="delete-btn" onclick="hapusData(${index})">Hapus</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function hapusData(index) {
  data.splice(index, 1);
  simpanKeStorage(); // update localStorage
  renderList();
}

function editData(index) {
  editIndex = index;
  document.getElementById("editNama").value = data[index].nama;
  document.getElementById("editRawat").value = data[index].rawat;
  document.getElementById("editModal").style.display = "flex";
}

function simpanEdit() {
  const namaBaru = document.getElementById("editNama").value;
  const rawatBaru = document.getElementById("editRawat").value;
  if (!namaBaru || !rawatBaru) return;

  data[editIndex] = {nama: namaBaru, rawat: rawatBaru};
  simpanKeStorage(); // simpan hasil edit
  renderList();
  tutupModal();
}

function tutupModal() {
  document.getElementById("editModal").style.display = "none";
}

// Render daftar langsung saat halaman dibuka
renderList();
