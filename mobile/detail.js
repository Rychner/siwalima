function detailBerita()
{  
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("detailberita").innerHTML = "<p>ID tidak ditemukan.</p>";
        return;
    }
    
    fetch(`https://siwalimanews.com/wp-json/wp/v2/posts/${id}?_embed`)
    .then((response) => response.json())
    .then((post) => {          
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
        const kategoriId = post._embedded["wp:term"]?.[0]?.[0]?.id;
        const date = new Date(post.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        let tanggal = date.toLocaleDateString('id-ID', options);
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
        const judul = post.title.rendered;

        // Ambil isi konten dan ubah kata jika diperlukan
        const isi = post.content.rendered.replace(/Siwalimanews/g, "Siwalima.id");
        // ✅ Gunakan tempDiv untuk memproses semua elemen HTML dari isi
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = isi;

        const semuaElemen = Array.from(tempDiv.children);
        const paragrafAsli = semuaElemen.filter(el => el.tagName.toLowerCase() === "p");

        const iklanbody1 = `<div class="mt-2 mb-2 d-flex justify-center">
            <div class='p-2 max-w-500px'>
                <img src="../iklan_body_isi_berita_1.jpg">
            </div>
        </div>
        `;
        
        const iklanbody2 = `<div class="mt-2 mb-2 d-flex justify-center">
            <div class='p-2 max-w-500px'>
                <img src="../iklan_body_isi_berita_2.jpg">
            </div>
        </div>
        `;

        // ✅ Render template HTML awal
        const container = document.getElementById("detailberita");
        container.innerHTML = `
        <article class="px-4">
            <p class="mt-2 text-xs">SIWALIMA.id > Berita</p>
            <div class="mt-4">
                <span class="text-xs font-bold">${kategori}</span>
                <span class="text-xs">|</span>
                <span class="text-xs">${tanggal} WIT</span>
            </div>
            <p class="text-2xl judul-detail">${judul}</p>
            <img class="mt-2 w-full h-50" src="${gambar}" alt="bannerKoran" loading="lazy" id="gambarArtikel">
            <div class="mt-2 text-base" id="konten-berita"></div>
            <div id="pagination-controls" class="mt-4 text-center"></div>            
        </article>
        `;

        // ✅ Lanjutkan fetch "Baca Juga" setelah sisipkan iklan
        const kataPertama = judul.split(" ")[0]; // ambil keyword dari judul, misalnya
        fetch(`https://siwalimanews.com/wp-json/wp/v2/posts?search=${kataPertama}&exclude=${id}&per_page=1&_embed`)
        .then(res => res.json())
        .then(posts => {
            let bacaJugaHTML = "";
            if(posts.length > 0) {
            bacaJugaHTML = `<div class="mt-2 mb-2">
                <div class='bg-gray-50 p-2 baca-juga'>Baca Juga:<br>
                    <a href='detail.html?id=${posts[0].id}' class="judul-detail text-sm text-none">${posts[0].title.rendered}</a>
                </div>
            </div>
            `;
            }          

        const paragrafPerHalaman = 6;
        let halamanSekarang = 1;
        const totalHalaman = Math.ceil(paragrafAsli.length / paragrafPerHalaman);
        console.log("Panjang paragraf:", paragrafAsli.length);
        console.log("Total halaman:", totalHalaman);
        console.log("Pagination div:", document.getElementById("pagination-controls"));          

        function renderHalaman(page) {
            const mulai = (page - 1) * paragrafPerHalaman;
            const akhir = mulai + paragrafPerHalaman;
            const paragrafHalaman = paragrafAsli.slice(mulai, akhir);

            let kontenHTML = "";

            for (let i = 0; i < paragrafHalaman.length; i++) {
                kontenHTML += paragrafHalaman[i].outerHTML;

                // Hanya pada halaman pertama dan setelah paragraf ke-3
                if (i === 0) {
                kontenHTML += iklanbody1;
                }

                // Hanya pada halaman pertama dan setelah paragraf ke-3
                if (i === 2) {                        
                kontenHTML += bacaJugaHTML;
                }

                // Hanya pada halaman pertama dan setelah paragraf ke-4
                if (i === 4) {
                kontenHTML += iklanbody2;
                }
            }
            document.getElementById("konten-berita").innerHTML = kontenHTML;
            /*  document.getElementById("pageInfo").innerText = `Halaman ${page} dari ${totalHalaman}`;
            document.getElementById("prevBtn").disabled = page === 1;
            document.getElementById("nextBtn").disabled = page === totalHalaman; */
            // Jalankan lozad setelah DOM diisi
            const observer = lozad(); 
            observer.observe();
            
            renderPagination();                
        }

        function renderPagination() {
            const pagination = document.getElementById("pagination-controls");
            pagination.innerHTML = "";

            // Jika hanya ada 1 halaman, tidak usah tampilkan pagination
            if (totalHalaman <= 1) {
                return; 
            }

            const ul = document.createElement("ul");
            ul.className = "pagination-list";

            // Tombol previous «
            const liPrev = document.createElement("li");
            liPrev.className = "page-item";
            const prevBtn = document.createElement("button");
            prevBtn.className = "page-link";
            prevBtn.innerHTML = "&laquo;";
            prevBtn.hidden = halamanSekarang === 1;
            prevBtn.addEventListener("click", () => {
                document.getElementById("gambarArtikel").scrollIntoView({ behavior: "smooth" });                
                if (halamanSekarang > 1) {
                    halamanSekarang--;
                    renderHalaman(halamanSekarang);
                }
            });
            liPrev.appendChild(prevBtn);
            ul.appendChild(liPrev);

            for (let i = 1; i <= totalHalaman; i++) {
                const li = document.createElement("li");
                li.className = "page-item";
                const btn = document.createElement("button");
                btn.className = `page-link ${halamanSekarang === i ? "active" : ""}`;
                btn.innerText = i;
                btn.addEventListener("click", () => {
                    document.getElementById("gambarArtikel").scrollIntoView({ behavior: "smooth" });
                    // Scroll ke atas konten setelah btn di klik                    
                    halamanSekarang = i;
                    renderHalaman(halamanSekarang);
                });
                li.appendChild(btn);
                ul.appendChild(li);
            }

            // Tombol next
            const liNext = document.createElement("li");
            liNext.className = "page-item";
            const nextBtn = document.createElement("button");
            nextBtn.className = "page-link";
            nextBtn.innerHTML = "&raquo;";
            nextBtn.hidden = halamanSekarang === totalHalaman;
            nextBtn.addEventListener("click", () => {
                document.getElementById("gambarArtikel").scrollIntoView({ behavior: "smooth" });
                if (halamanSekarang < totalHalaman) {
                halamanSekarang++;
                renderHalaman(halamanSekarang);
                }
            });
            liNext.appendChild(nextBtn);
            ul.appendChild(liNext);

            pagination.appendChild(ul);
            }

        renderHalaman(halamanSekarang);
    })
    .catch((error) => {
    console.error("Gagal memuat Baca Juga:", error);
    });
    })
    .catch((error) => {
    console.error("Terjadi kesalahan:", error);
    });    
}


// Fungsi inisialisasi yang akan dipanggil saat DOM sudah siap
function initApp() {    
    detailBerita();    
}

// Jalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);