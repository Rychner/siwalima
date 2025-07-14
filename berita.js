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
                            <a class="text-none text-white mb-1" href="#">${teksJudul}</a>
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

function beritaPolitik()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=38&per_page=6&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritapolitik');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
        const date = new Date(post.date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const tanggal = date.toLocaleDateString('en-US', options);

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = `         
        <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                        <img class=" uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                    </div>
                    <a href=#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                    <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                        <div>
                            <div class="post-category hstack gap-narrow fw-semibold">
                                <a class="text-none hover:text-primary dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
                            </div>
                        </div>
                        <div class="sep d-none md:d-block">❘</div>
                        <div class="d-none md:d-block">
                            <div class="post-date hstack gap-narrow">
                                <span>${tanggal}</span>
                            </div>
                        </div>                                                                
                    </div>
                    <h3 class="post-title h6 lg:h5 fw-semibold m-0 text-truncate-2 mb-1">
                        <a class="text-none hover:text-primary duration-150" href="#">${judul}</a>
                    </h3>
                </div>
            </article>
        </div>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritapolitik').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaKriminal()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=36&per_page=3&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritakriminal');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
        const date = new Date(post.date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const tanggal = date.toLocaleDateString('en-US', options);

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = `         
        <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                        <img class=" uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                    </div>
                    <a href=#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                    <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                        <div>
                            <div class="post-category hstack gap-narrow fw-semibold">
                                <a class="text-none hover:text-primary dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
                            </div>
                        </div>
                        <div class="sep d-none md:d-block">❘</div>
                        <div class="d-none md:d-block">
                            <div class="post-date hstack gap-narrow">
                                <span>${tanggal}</span>
                            </div>
                        </div>                                                                
                    </div>
                    <h3 class="post-title h6 lg:h5 fw-semibold m-0 text-truncate-2 mb-1">
                        <a class="text-none hover:text-primary duration-150" href="#">${judul}</a>
                    </h3>
                </div>
            </article>
        </div>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritakriminal').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaKesehatan()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=32&per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritakesehatan');
    
        // Format tanggal (contoh: Jul 8, 2025)
        const formatTanggal = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };
    
        // Dapatkan URL gambar
        const getImage = (post) =>
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://html.themewant.com/news5/assets/images/common/img-fallback.png";
    
        // ========== POST PERTAMA ==========
        const post1 = data[0];
        const post1HTML = `                
            <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                    <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                        src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                        data-src="${getImage(post1)}"
                        alt="${post1.title.rendered}" data-uc-img="loading: lazy">
                </div>
                <a href="#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                    <div>
                    <div class="post-category hstack gap-narrow fw-semibold">
                        <a class="text-none hover:text-primary dark:text-primary duration-150" href="#">
                        ${post1._embedded["wp:term"]?.[0]?.[0]?.name || ""}
                        </a>
                    </div>
                    </div>
                    <div class="sep d-none md:d-block">❘</div>
                    <div class="d-none md:d-block">
                    <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post1.date)}</span>
                    </div>
                    </div>
                </div>
                <h3 class="post-title h6 xl:h5 m-0 text-truncate-2 mb-1">
                    <a class="text-none hover:text-primary duration-150" href="#">${post1.title.rendered}</a>
                </h3>
                </div>
            </article>
            </div>
        `;
    
        // ========== POST 2–4 ==========
        let postListHTML = '';
        data.slice(1).forEach(post => {
        postListHTML += `
            <div>
            <article class="post type-post panel">
                <div class="row child-cols g-2" data-uc-grid>
                <div>
                    <div class="post-header panel vstack justify-between gap-1">
                    <h3 class="post-title h6 m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="#">
                        ${post.title.rendered}
                        </a>
                    </h3>
                    <div class="post-meta fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60">
                        <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post.date)}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="post-media panel uc-transition-toggle overflow-hidden max-w-72px min-w-64px lg:min-w-72px">
                    <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-1x1">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                            data-src="${getImage(post)}"
                            alt="${post.title.rendered}" data-uc-img="loading: lazy">
                    </div>
                    <a href="#" class="position-cover"></a>
                    </div>
                </div>
                </div>
            </article>
            </div>
        `;
        });
    
        // Gabungkan semuanya dan masukkan ke DOM
        container.innerHTML = `
        ${post1HTML}
        ${postListHTML}
        </div> <!-- tutup block-content -->
        `;
    })
    .catch(err => {
        console.error("Gagal fetch berita kategori Kesehatan:", err);
        document.getElementById('beritakesehatan').innerHTML = "<p>Gagal memuat berita kategori Kesehatan.</p>";
    });
}

function beritaOlahraga()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=31&per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaolahraga');
    
        // Format tanggal (contoh: Jul 8, 2025)
        const formatTanggal = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };
    
        // Dapatkan URL gambar
        const getImage = (post) =>
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://html.themewant.com/news5/assets/images/common/img-fallback.png";
    
        // ========== POST PERTAMA ==========
        const post1 = data[0];
        const post1HTML = `                
            <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                    <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                        src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                        data-src="${getImage(post1)}"
                        alt="${post1.title.rendered}" data-uc-img="loading: lazy">
                </div>
                <a href="#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                    <div>
                    <div class="post-category hstack gap-narrow fw-semibold">
                        <a class="text-none hover:text-primary dark:text-primary duration-150" href="#">
                        ${post1._embedded["wp:term"]?.[0]?.[0]?.name || ""}
                        </a>
                    </div>
                    </div>
                    <div class="sep d-none md:d-block">❘</div>
                    <div class="d-none md:d-block">
                    <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post1.date)}</span>
                    </div>
                    </div>
                </div>
                <h3 class="post-title h6 xl:h5 m-0 text-truncate-2 mb-1">
                    <a class="text-none hover:text-primary duration-150" href="#">${post1.title.rendered}</a>
                </h3>
                </div>
            </article>
            </div>
        `;
    
        // ========== POST 2–4 ==========
        let postListHTML = '';
        data.slice(1).forEach(post => {
        postListHTML += `
            <div>
            <article class="post type-post panel">
                <div class="row child-cols g-2" data-uc-grid>
                <div>
                    <div class="post-header panel vstack justify-between gap-1">
                    <h3 class="post-title h6 m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="#">
                        ${post.title.rendered}
                        </a>
                    </h3>
                    <div class="post-meta fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60">
                        <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post.date)}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="post-media panel uc-transition-toggle overflow-hidden max-w-72px min-w-64px lg:min-w-72px">
                    <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-1x1">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                            data-src="${getImage(post)}"
                            alt="${post.title.rendered}" data-uc-img="loading: lazy">
                    </div>
                    <a href="#" class="position-cover"></a>
                    </div>
                </div>
                </div>
            </article>
            </div>
        `;
        });
    
        // Gabungkan semuanya dan masukkan ke DOM
        container.innerHTML = `
        ${post1HTML}
        ${postListHTML}
        </div> <!-- tutup block-content -->
        `;
    })
    .catch(err => {
        console.error("Gagal fetch berita kategori Kesehatan:", err);
        document.getElementById('beritaolahraga').innerHTML = "<p>Gagal memuat berita kategori Kesehatan.</p>";
    });
}

function beritaOpini()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=285&per_page=6&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaopini');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
        const date = new Date(post.date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const tanggal = date.toLocaleDateString('en-US', options);

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = `         
        <div>
            <article class="post type-post panel">
                <div class="row child-cols g-2">
                    <div class="col-auto">
                        <div class="post-media panel overflow-hidden w-72px">
                            <figure class="featured-image m-0 ratio ratio-1x1 rounded-circle uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                <img class=" uc-transition-scale-up uc-transition-opaque media-cover image uc-transition-scale-up uc-transition-opaque" src="${gambar}" data-src="${gambar}" alt="image" data-uc-img="loading: lazy">
                            </figure>
                            <a href="#" class="position-cover"></a>
                        </div>
                    </div>
                    <div>
                        <div class="post-header panel vstack gap-narrow">
                            <span class="fs-7 fw-medium opacity-50">${tanggal}</span>
                            <h3 class="post-title h6 m-0 text-truncate-3 hover:text-primary">
                                <a class="fs-6 xl:fs-5 text-none hover:text-primary duration-150" href="#">
                                    ${judul}
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritaopini').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaPendidikan()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=41&per_page=6&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritapendidikan');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
        const date = new Date(post.date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const tanggal = date.toLocaleDateString('en-US', options);

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = `         
        <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                        <img class=" uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                    </div>
                    <a href=#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                    <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                        <div>
                            <div class="post-category hstack gap-narrow fw-semibold">
                                <a class="text-none hover:text-primary dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
                            </div>
                        </div>
                        <div class="sep d-none md:d-block">❘</div>
                        <div class="d-none md:d-block">
                            <div class="post-date hstack gap-narrow">
                                <span>${tanggal}</span>
                            </div>
                        </div>                                                                
                    </div>
                    <h3 class="post-title h6 lg:h5 fw-semibold m-0 text-truncate-2 mb-1">
                        <a class="text-none hover:text-primary duration-150" href="#">${judul}</a>
                    </h3>
                </div>
            </article>
        </div>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritapendidikan').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaDaerah()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=37&per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritadaerah');
    
        // Format tanggal (contoh: Jul 8, 2025)
        const formatTanggal = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };
    
        // Dapatkan URL gambar
        const getImage = (post) =>
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://html.themewant.com/news5/assets/images/common/img-fallback.png";
    
        // ========== POST PERTAMA ==========
        const post1 = data[0];
        const post1HTML = `                
            <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                    <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                        src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                        data-src="${getImage(post1)}"
                        alt="${post1.title.rendered}" data-uc-img="loading: lazy">
                </div>
                <a href="#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                    <div>
                    <div class="post-category hstack gap-narrow fw-semibold">
                        <a class="text-none hover:text-primary dark:text-primary duration-150" href="#">
                        ${post1._embedded["wp:term"]?.[0]?.[0]?.name || ""}
                        </a>
                    </div>
                    </div>
                    <div class="sep d-none md:d-block">❘</div>
                    <div class="d-none md:d-block">
                    <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post1.date)}</span>
                    </div>
                    </div>
                </div>
                <h3 class="post-title h6 xl:h5 m-0 text-truncate-2 mb-1">
                    <a class="text-none hover:text-primary duration-150" href="#">${post1.title.rendered}</a>
                </h3>
                </div>
            </article>
            </div>
        `;
    
        // ========== POST 2–4 ==========
        let postListHTML = '';
        data.slice(1).forEach(post => {
        postListHTML += `
            <div>
            <article class="post type-post panel">
                <div class="row child-cols g-2" data-uc-grid>
                <div>
                    <div class="post-header panel vstack justify-between gap-1">
                    <h3 class="post-title h6 m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="#">
                        ${post.title.rendered}
                        </a>
                    </h3>
                    <div class="post-meta fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60">
                        <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post.date)}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="post-media panel uc-transition-toggle overflow-hidden max-w-72px min-w-64px lg:min-w-72px">
                    <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-1x1">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                            data-src="${getImage(post)}"
                            alt="${post.title.rendered}" data-uc-img="loading: lazy">
                    </div>
                    <a href="#" class="position-cover"></a>
                    </div>
                </div>
                </div>
            </article>
            </div>
        `;
        });
    
        // Gabungkan semuanya dan masukkan ke DOM
        container.innerHTML = `
        ${post1HTML}
        ${postListHTML}
        </div> <!-- tutup block-content -->
        `;
    })
    .catch(err => {
        console.error("Gagal fetch berita kategori Kesehatan:", err);
        document.getElementById('beritadaerah').innerHTML = "<p>Gagal memuat berita kategori Kesehatan.</p>";
    });
}

function beritaHukum()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=42&per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritahukum');
    
        // Format tanggal (contoh: Jul 8, 2025)
        const formatTanggal = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };
    
        // Dapatkan URL gambar
        const getImage = (post) =>
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://html.themewant.com/news5/assets/images/common/img-fallback.png";
    
        // ========== POST PERTAMA ==========
        const post1 = data[0];
        const post1HTML = `                
            <div>
            <article class="post type-post panel vstack gap-1 lg:gap-2">
                <div class="post-media panel uc-transition-toggle overflow-hidden">
                <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                    <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                        src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                        data-src="${getImage(post1)}"
                        alt="${post1.title.rendered}" data-uc-img="loading: lazy">
                </div>
                <a href="#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                    <div>
                    <div class="post-category hstack gap-narrow fw-semibold">
                        <a class="text-none hover:text-primary dark:text-primary duration-150" href="#">
                        ${post1._embedded["wp:term"]?.[0]?.[0]?.name || ""}
                        </a>
                    </div>
                    </div>
                    <div class="sep d-none md:d-block">❘</div>
                    <div class="d-none md:d-block">
                    <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post1.date)}</span>
                    </div>
                    </div>
                </div>
                <h3 class="post-title h6 xl:h5 m-0 text-truncate-2 mb-1">
                    <a class="text-none hover:text-primary duration-150" href="#">${post1.title.rendered}</a>
                </h3>
                </div>
            </article>
            </div>
        `;
    
        // ========== POST 2–4 ==========
        let postListHTML = '';
        data.slice(1).forEach(post => {
        postListHTML += `
            <div>
            <article class="post type-post panel">
                <div class="row child-cols g-2" data-uc-grid>
                <div>
                    <div class="post-header panel vstack justify-between gap-1">
                    <h3 class="post-title h6 m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="#">
                        ${post.title.rendered}
                        </a>
                    </h3>
                    <div class="post-meta fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60">
                        <div class="post-date hstack gap-narrow">
                        <span>${formatTanggal(post.date)}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="post-media panel uc-transition-toggle overflow-hidden max-w-72px min-w-64px lg:min-w-72px">
                    <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-1x1">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                            data-src="${getImage(post)}"
                            alt="${post.title.rendered}" data-uc-img="loading: lazy">
                    </div>
                    <a href="#" class="position-cover"></a>
                    </div>
                </div>
                </div>
            </article>
            </div>
        `;
        });
    
        // Gabungkan semuanya dan masukkan ke DOM
        container.innerHTML = `
        ${post1HTML}
        ${postListHTML}
        </div> <!-- tutup block-content -->
        `;
    })
    .catch(err => {
        console.error("Gagal fetch berita kategori Kesehatan:", err);
        document.getElementById('beritahukum').innerHTML = "<p>Gagal memuat berita kategori Kesehatan.</p>";
    });
}

// Fungsi inisialisasi yang akan dipanggil saat DOM sudah siap
function initApp() {
    swiperBerita();
    bannerKoran();
    beritaTerkini();
    beritaPolitik();
    beritaKriminal();
    beritaKesehatan();
    beritaOlahraga();
    beritaOpini();
    beritaPendidikan();
    beritaDaerah();
    beritaHukum();
}

// Jalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);