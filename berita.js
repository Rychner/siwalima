//listberitaterkini
function beritaTerkini()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=10")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('beritaterkini');
            data.forEach(post => {
            const jamTerbit = post.date.slice(11, 16);
            const item = document.createElement('div');
            item.innerHTML = `
            <div>
                <article class="post type-post panel d-flex gap-2">
                    <div>
                        <div class="fs-7 fw-bold text-center translate-y-narrow bg-gray-50 dark:bg-white dark:text-black min-w-48px">${jamTerbit}</div>
                    </div>
                    <h6 class="fs-6 lg:fs-7 xl:fs-6 fw-medium text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="#">${post.title.rendered}</a>
                    </h6>
                </article>
            </div>
            `;
            container.appendChild(item);
            });
        })
    .catch(error => {
        document.getElementById('berita').innerHTML = '<p>Gagal memuat data berita.</p>';
        console.error('Terjadi kesalahan:', error);
    });
}

function swiperBerita()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=10&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('swiperberita');
        if (!container) {
            console.error("Elemen #swiperberita tidak ditemukan!");
            return;
        }

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
        const date = new Date(post.date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const tanggal = date.toLocaleDateString('en-US', options);

        // Ambil judul
        const judul = post.title.rendered;
        const teksJudul = judul.slice(0,60) + '...';
        
        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');                
        item.className = "swiper-slide";

        item.innerHTML = `         
            <div>
                <article class="post type-post panel vstack gap-1 rounded" style="background-color: rgb(52, 52, 236);">                    
                    <div class="post-media panel uc-transition-toggle overflow-hidden">
                        <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                            <img class="uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                        </div>
                        <a href="#" class="position-cover"></a>
                    </div>
                    <div class="post-header panel vstack justify-content gap-1">
                        <h3 class="post-title px-1 h5 xl:h4 m-0 m-0 max-w-auto">
                            <a class="text-none text-white" href="#">${teksJudul}</a>
                        </h3>
                        <div class="post-meta px-1 mb-1 panel hstack justify-content gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                            <div>
                                <div class="post-category hstack gap-narrow fw-semibold">
                                    <a class="text-none text-white hover:text-white dark:text-white duration-150" href="blog-category.html">${kategori}</a>
                                </div>
                            </div>
                            <div class="sep d-none text-white md:d-block">❘</div>
                            <div class="d-none md:d-block">
                                <div class="post-date text-white hstack gap-narrow">
                                    <span>${tanggal}</span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </article>
            </div>
        `;

        container.appendChild(item);
        });
        console.log("Swiper berhasil di-render.");
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('swiperberita').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function bannerKoran()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/media?search=banner-1-HL-1107.jpg&per_page=1")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('bannerKoran');
        if (!container) {
            console.error("Elemen #bannerKoran tidak ditemukan!");
            return;
        }

        data.forEach(post => { 
        // Ambil featured image (jika ada)
        const gambar = post.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = `         
        <div>                                                    
            <img class="uc-transition-scale-up uc-transition-opaque image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="bannerKoran" data-uc-img="loading: lazy">
            <a href=#" class="position-cover"></a>
        </div>
        `;

        container.appendChild(item);
        });
        console.log("Banner Koran berhasil di-render.");
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('bannerKoran').innerHTML = "<p>Gagal memuat iklan.</p>";
    });
}

// Fungsi inisialisasi yang akan dipanggil saat DOM sudah siap
function initApp() {
    beritaTerkini();
    swiperBerita();
    bannerKoran();
}

// Jalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);