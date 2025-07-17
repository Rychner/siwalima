//Section 1 start
function beritaTerkini()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=8")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('beritaterkini');
            data.forEach((post, index) => {            
            //const jamTerbit = post.date.slice(11, 16);
            const nomor = index + 1;
            const item = document.createElement('div');
            item.innerHTML = `
            <div>
                <article class="post type-post panel d-flex gap-2">
                    <div>
                        <div class="fs-2 fw-bold text-center text-red translate-y-narrow bg-gray-50 dark:bg-white dark:text-red min-w-48px">${nomor}</div>
                    </div>
                    <h6 class="fs-6 px-1 lg:fs-3 xl:fs-3 fw-medium text-truncate-2 bg-gray-50">
                        <a class="fw-bold text-none hover:text-red duration-150" href="#">${post.title.rendered}</a>
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
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=1&_embed")
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
                <article class="post type-post panel vstack gap-1 rounded bg-dark">                    
                    <div class="post-media panel uc-transition-toggle overflow-hidden">
                        <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                            <img class="uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                        </div>
                        <a href="#" class="position-cover"></a>
                    </div>
                    <div class="post-header panel vstack justify-content gap-1">
                        <h3 class="post-title px-1 h5 xl:h4 m-0 max-w-auto">
                            <a class="text-none text-white hover:text-red" href="#">${teksJudul}</a>
                        </h3>
                        <div class="post-meta px-1 mb-1 panel hstack justify-content gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                            <div>
                                <div class="post-category hstack gap-narrow fw-semibold">
                                    <a class="text-none text-white hover:text-red dark:text-white duration-150" href="blog-category.html">${kategori}</a>
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

function beritaTerkini2()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=7&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini2');

        data.slice(1).forEach(post => {
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
                                <a class="text-none hover:text-red dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
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
                        <a class="text-none hover:text-red duration-150" href="#">${judul}</a>
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
        document.getElementById('beritaterkini2').innerHTML = "<p>Gagal memuat berita.</p>";
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
                                <a class="text-none hover:text-red dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
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
                        <a class="text-none hover:text-red duration-150" href="#">${judul}</a>
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

function beritaTopnews()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=48&per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritatopnews');

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
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-21x9">
                        <img class=" uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                    </div>
                    <a href=#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                    <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                        <div>
                            <div class="post-category hstack gap-narrow fw-semibold">
                                <a class="text-white text-none hover:text-white dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
                            </div>
                        </div>
                        <div class="text-white sep d-none md:d-block">❘</div>
                        <div class="d-none md:d-block">
                            <div class="text-white post-date hstack gap-narrow">
                                <span>${tanggal}</span>
                            </div>
                        </div>                                                                
                    </div>                    
                    <h3 class="post-title h6 lg:h5 fw-semibold m-0 text-truncate-2 mb-1">
                        <a class="text-none text-white hover:text-white duration-150" href="#">${judul}</a>
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
        document.getElementById('beritatopnews').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}
//Section 1 end

//Section 2 start
function beritaKriminal()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=36&per_page=6&_embed")
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
                                <a class="text-none hover:text-red dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
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
                        <a class="text-none hover:text-red duration-150" href="#">${judul}</a>
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
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=32&per_page=5&_embed")
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
                        <a class="text-none hover:text-red dark:text-primary duration-150" href="#">
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
                    <a class="text-none hover:text-red duration-150" href="#">${post1.title.rendered}</a>
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
                        <a class="text-none hover:text-red duration-150" href="#">
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
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=31&per_page=5&_embed")
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
                        <a class="text-none hover:text-red dark:text-primary duration-150" href="#">
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
                    <a class="text-none hover:text-red duration-150" href="#">${post1.title.rendered}</a>
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
                    <a class="text-none hover:text-red duration-150" href="#">
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
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=285&per_page=8&_embed")
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
            <article class="post type-post panel d-flex flex-column items-center text-center">
                <div class="col-auto">
                    <div class="post-media panel uc-transition-toggle overflow-hidden max-w-72px min-w-64px lg:min-w-72px">
                        <div class="justify-center featured-image m-0 ratio ratio-1x1 rounded-circle uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800"">
                            <img class="uc-transition-scale-up uc-transition-opaque media-cover image"
                                src="https://html.themewant.com/news5/assets/images/common/img-fallback.png"
                                data-src="${gambar}"
                                alt="${judul}" data-uc-img="loading: lazy">
                        </div>
                        <a href="#" class="position-cover"></a>
                    </div>
                </div>
                <div class="row child-cols g-2" data-uc-grid>                    
                    <div class="post-header panel vstack justify-between gap-1">
                        <h3 class="post-title h6 m-0 text-truncate-2">
                            <a class="text-none hover:text-red duration-150" href="#">
                            ${judul}
                            </a>
                        </h3>
                        <div class="post-meta fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 w-100 text-center">
                            <div class="post-date justify-content-center w-100">
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
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritaopini').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}
//Section 2 end

//Section 3 start
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
//Section 3 end

//Section 4 start
function beritaVisi()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=25&per_page=7&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritavisi');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
        const date = new Date(post.date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const tanggal = date.toLocaleDateString('en-US', options);

        // Ambil judul dan isi
        const judul = post.title.rendered;
        const isi = post.content.rendered;
        const potonganIsi = isi.length > 100 ? isi.slice(0, 125) + "..." : isi;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = `         
        <div>
            <article class="post type-post panel d-flex flex-row gap-3 align-items-start">
                <!-- Gambar di kiri -->
                <div class="post-media uc-transition-toggle overflow-hidden flex-shrink-0" style="width: 240px;">
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image w-100 h-100 object-cover" 
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" 
                            data-src="${gambar}" 
                            alt="${judul}" 
                            data-uc-img="loading: lazy">
                    </div>
                </div>

                <!-- Konten teks di kanan -->
                <div class="post-header panel vstack gap-1 flex-grow-1">
                    <div class="post-meta fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60">                        
                        <div class="post-date text-muted" style="font-size: 0.9rem;">${tanggal}</div>
                    </div>
                    <h3 class="post-title h6 fw-semibold m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="#">${judul}</a>
                    </h3>
                    <p class="m-0">
                        ${potonganIsi}
                    </p>
                </div>
            </article>
        </div>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritavisi').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaCovid()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=52&per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritacovid');

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
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-21x9">
                        <img class=" uc-transition-scale-up uc-transition-opaque media-cover image" src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" data-src="${gambar}" alt="The Rise of AI-Powered Personal Assistants: How They Manage" data-uc-img="loading: lazy">
                    </div>
                    <a href=#" class="position-cover"></a>
                </div>
                <div class="post-header panel vstack gap-1">
                    <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                        <div>
                            <div class="post-category hstack gap-narrow fw-semibold">
                                <a class="text-white text-none hover:text-white dark:text-primary duration-150" href="blog-category.html">${kategori}</a>
                            </div>
                        </div>
                        <div class="text-white sep d-none md:d-block">❘</div>
                        <div class="d-none md:d-block">
                            <div class="text-white post-date hstack gap-narrow">
                                <span>${tanggal}</span>
                            </div>
                        </div>                                                                
                    </div>                    
                    <h3 class="post-title h6 lg:h5 fw-semibold m-0 text-truncate-2 mb-1">
                        <a class="text-none text-white hover:text-white duration-150" href="#">${judul}</a>
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
        document.getElementById('beritacovid').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}
//Section 4 end

//Section 5 start
function beritaPemerintahan()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=43&per_page=6&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritapemerintahan');

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
        document.getElementById('beritapemerintahan').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaDaerah()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=37&per_page=3&_embed")
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
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=42&per_page=3&_embed")
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
//Section 5 end

// Fungsi inisialisasi yang akan dipanggil saat DOM sudah siap
function initApp() {
    swiperBerita();
    beritaTerkini2();
    bannerKoran();
    beritaTerkini();
    beritaPolitik();
    beritaTopnews();
    beritaKriminal();
    beritaKesehatan();
    beritaOlahraga();
    beritaOpini();
    beritaPendidikan();
    beritaDaerah();
    beritaHukum();
    beritaPemerintahan();
    beritaVisi();
    beritaCovid();
}

// Jalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);