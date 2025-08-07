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
const images1 = ["https://siwalimanews.com/wp-content/uploads/2025/08/Bendera.jpg", "foto2.jpg", "foto3.jpg"];

const images2 = ["https://siwalimanews.com/wp-content/uploads/2025/08/Bendera1.jpg", "foto5.jpg", "foto6.jpg", "foto7.jpg"];

const images3 = ["https://siwalimanews.com/wp-content/uploads/2025/08/Bendera2.jpg", "foto9.jpg", "foto10.jpg"];

// Jalankan setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
const containers = document.querySelectorAll(".image-container");

tampilkanFoto(containers[0], images1);
tampilkanFoto(containers[1], images2);
tampilkanFoto(containers[2], images3);
});