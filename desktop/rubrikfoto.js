function tampilkanFoto(container, images) {
    // Cari elemen gambar & badge di dalam container ini
    const imgElement = container.querySelector(".main-image");
    const badgeText = container.querySelector(".photo-count span");

    // Set jumlah foto
    badgeText.textContent = images.length + " Foto";

    // Set gambar pertama
    imgElement.src = images[0];
}

// Array gambar masing-masing kolom
const images1 = ["../rubrik_foto/upacara_pthd.jpg", "../rubrik_foto/upacara_pthd_1.jpg"];

const images2 = ["../rubrik_foto/gegana_1.jpg", "../rubrik_foto/gegana_2.jpg", "../rubrik_foto/gegana_3.jpg", "../rubrik_foto/gegana_4.jpg", "../rubrik_foto/gegana_5.jpg"];

const images3 = ["../rubrik_foto/pangan_murah_1.jpg", "../rubrik_foto/pangan_murah_2.jpg", "../rubrik_foto/pangan_murah_3.jpg", "../rubrik_foto/pangan_murah_4.jpg"];

// Jalankan setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
const containers = document.querySelectorAll(".image-container");

tampilkanFoto(containers[0], images1);
tampilkanFoto(containers[1], images2);
tampilkanFoto(containers[2], images3);
});