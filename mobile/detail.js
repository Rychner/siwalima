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
        // 1️⃣ Ambil kategori (array)
        const kategori = post._embedded["wp:term"]?.[0] || [];
        // 2️⃣ Ambil tag (array)
        const tags = post._embedded["wp:term"]?.[1] || [];

        // Ubah ke HTML string
        const kategoriHTML = kategori.map(cat => `<a href="#" class="text-none hover:text-red dark:text-primary duration-150">${cat.name}</a>`).join(", ");
        const tagHTML = tags.map(tag => `<a href="#" class="bg-blue-800 border-tag-siwa p-2 text-white text-xs gap-0 dark:text-white"># ${tag.name}</a>`).join(" ");
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

        const iklanbody1 = `<div class="mt-2 mb-2 flex justify-center">
            <div class='p-2 max-w-500px'>
                <img src="../iklan_body_isi_berita_1.jpg">
            </div>
        </div>
        `;
        
        const iklanbody2 = `<div class="mt-2 mb-2 flex justify-center">
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
                <span class="text-xs font-bold">${kategoriHTML}</span>
                <span class="text-xs">|</span>
                <span class="text-xs">${tanggal} WIT</span>
            </div>
            <p class="text-2xl judul-detail">${judul}</p>
            <img class="mt-2 w-full h-50" src="${gambar}" alt="bannerKoran" loading="lazy" id="gambarArtikel">
            <div class="mt-2 text-base" id="konten-berita"></div>
            <div id="pagination-controls" class="mt-4 mb-2 text-center"></div>           
            <hr class="text-gray-800">
            <div class="text-black text-sm pt-2">Tags:</div>
            <div class="tags-container-siwa lowercase">${tagHTML}</div>            
        </article>
        `;

        let bacaJugaList = [];
    
        // ✅ Lanjutkan fetch "Baca Juga" setelah sisipkan iklan
        const kataPertama = judul.split(" ")[0]; // ambil keyword dari judul, misalnya
        fetch(`https://siwalimanews.com/wp-json/wp/v2/posts?search=${kataPertama}&exclude=${id}&per_page=50&_embed`)
        .then(res => res.json())
        .then(posts => {
            bacaJugaList = posts;                             

        const paragrafPerHalaman = 6;
        let halamanSekarang = 1;
        const totalHalaman = Math.ceil(paragrafAsli.length / paragrafPerHalaman);          

        function renderHalaman(page) {
            const mulai = (page - 1) * paragrafPerHalaman;
            const akhir = mulai + paragrafPerHalaman;
            const paragrafHalaman = paragrafAsli.slice(mulai, akhir);

            let kontenHTML = "";

            const bacaJugaPost1 = bacaJugaList[(page * 2 - 2) % bacaJugaList.length];
            const bacaJugaPost2 = bacaJugaList[(page * 2 - 1) % bacaJugaList.length];
            let bacaJugaHTML1 = "";
            let bacaJugaHTML2 = "";
            if(bacaJugaPost1) {
            bacaJugaHTML1 = `<div class="mt-2 mb-2">
                <div class='bg-gray-50 p-2 baca-juga'>Baca Juga:<br>
                    <a href='detail.html?id=${bacaJugaPost1.id}' class="judul-detail text-base text-none">${bacaJugaPost1.title.rendered}</a>
                </div>
            </div>
            `;
            }
            
            if(bacaJugaPost2) {
            bacaJugaHTML2 = `<div class="mt-2 mb-2">
                <div class='bg-gray-50 p-2 baca-juga'>Baca Juga:<br>
                    <a href='detail.html?id=${bacaJugaPost2.id}' class="judul-detail text-base text-none">${bacaJugaPost2.title.rendered}</a>
                </div>
            </div>
            `;
            } 

            for (let i = 0; i < paragrafHalaman.length; i++) {
                kontenHTML += paragrafHalaman[i].outerHTML;

                // Hanya pada halaman pertama dan setelah paragraf ke-3
                if (i === 0) {
                kontenHTML += iklanbody1;
                }

                // Hanya pada halaman pertama dan setelah paragraf ke-3
                if (i === 1) {                        
                kontenHTML += bacaJugaHTML1;
                }

                if (i === 3) {                        
                kontenHTML += bacaJugaHTML2;
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

function beritaTerkaitDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // 1️⃣ Ambil berita terakhir
    fetch(`https://siwalimanews.com/wp-json/wp/v2/posts/${id}?_embed`)
    .then(res => res.json())
    .then(latestPost => {
        if (!latestPost || !latestPost.id) return;

        const latestId = latestPost.id;

        // 2️⃣ Ambil kategori dari berita terakhir
        //const kategoriObj = latestPost._embedded["wp:term"]?.[0] || [];
        //const kategoriIds = kategoriObj.map(cat => cat.id); // array ID kategori

        const tagObj = latestPost._embedded["wp:term"]?.[1] || [];
        const tagIds = tagObj.map(tag => tag.id);

        const formatTanggal = (str) => {
            const date = new Date(str);            
            const now = new Date();
            
            const formatter = new Intl.DateTimeFormat('en-EN', {
                weekday: 'short',   // Tue
                year: 'numeric',    // 2025
                month: 'short',     // Aug
                day: '2-digit',     // 05
                hour: '2-digit',    // 14
                minute: '2-digit',  // 10
                second: '2-digit',  // 12
                hour12: false,      // <- ini untuk hilangkan AM/PM
                timeZone: 'Asia/Jayapura' // opsional, kalau mau pakai UTC+9
            });

            //console.log("📌 Waktu Postingan :", date);
            //console.log("📌 Waktu Sekarang  :", formatter.format(now));
            const waktuPengunjung = new Date(formatter.format(now));
            //console.log("📌 Waktu Pengunjung :", waktuPengunjung);
            
            const diffMs = waktuPengunjung - date;
            //console.log("📌 diffMs:", diffMs);
            
            const diffSeconds = Math.floor(diffMs / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffMinutes / 60);
            const diffDays = Math.floor(diffHours / 24);
            
            //console.log("📌 diffMin:", diffMinutes);
        
            if (diffMinutes < 1) {
                return 'baru saja';
            } else if (diffMinutes < 60) {
                return `${diffMinutes} menit lalu`;
            } else if (diffHours < 24) {
                return `${diffHours} jam lalu`;
            } else if (diffDays >= 1 && diffDays < 7) {
                return `${diffDays} hari lalu`;
            } else {
                const tanggal = date.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                const jam = date.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                return `${tanggal} ${jam} WIB`; 
                
            }
        };

        if (!tagIds.length) {
            console.warn("Berita terakhir tidak punya tags.");
            return;
        }

        // 3️⃣ Ambil berita lain dari kategori tsb (exclude berita terakhir)
        const tagParam = tagIds.join(",");
        const url = `https://siwalimanews.com/wp-json/wp/v2/posts?tags=${tagParam}&per_page=50&exclude=${latestId}&_embed`;

        return fetch(url)
            .then(res => res.json())
            .then(posts => {
                const container = document.getElementById('beritaterkaitdetail');
                container.innerHTML = ""; // reset konten

                if (!posts.length) {
                    container.innerHTML = "<p>Tidak ada berita terkait berdasarkan tag.</p>";
                    return;
                }

                // 🔀 Shuffle array (Fisher–Yates)
                for (let i = posts.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [posts[i], posts[j]] = [posts[j], posts[i]];
                }

                console.log(posts);

                // Ambil hanya 2 berita pertama setelah shuffle
                const randomPosts = posts.slice(0, 6);

                randomPosts.forEach(post => {
                    const judul = post.title.rendered;
                    const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

                    container.innerHTML += `
                    <div>
                        <article class="post type-post panel vstack gap-2">
                            <figure
                                class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                    src="${gambar}"
                                    data-src="${gambar}"
                                    alt="${judul}"
                                    data-uc-img="loading: lazy">
                                <a href="#" class="position-cover"
                                    data-caption="The Art of Baking: From Classic Bread to Artisan Pastries"></a>
                            </figure>
                            <div class="post-header panel vstack gap-1">
                                <h3 class="text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                                    <a class="text-none" href="#">${judul}</a>
                                </h3>
                                <div class="text-xs text-gray-500 mt-1">
                                    <span>${formatTanggal(post.date)}</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    `;                    
                });
            });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritaterkaitdetail').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

// Fungsi inisialisasi yang akan dipanggil saat DOM sudah siap
function initApp() {    
    detailBerita();
    beritaTerkaitDetail();        
}

// Jalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);