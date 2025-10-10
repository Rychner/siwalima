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

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil judul
        const judul = post.title.rendered;
        
        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');                
        item.className = "swiper-slide";

        item.innerHTML = `
        <article class="rounded-t-lg gap-1">
            <div class="rounded-t-lg post-media">
                <a href="detail.html?id=${post.id}" class="position-cover">
                    <div class="bg-headline featured-image rounded-t-lg dark:bg-gray-800">
                        <img class="rounded-t-lg w-full" src="${gambar}" data-src="${gambar}" alt="${judul}" data-uc-img="loading: lazy">
                    </div>
                </a>
                <div class="bg-navbar-siwa w-full p-2 rounded-b-lg">
                    <span class="pt-1 text-white m-0 text-truncate-siwa-2 w-100">
                        <a class="judul text-xl text-white text-none" href="detail.html?id=${post.id}">${judul}</a>                                    
                    </span>
                    <div class="w-100">
                        <div class="w-100 text-white post-date text-sm gap-narrow">
                            <span class="mb-1">${formatTanggal(post.date)}</span>
                        </div>
                    </div> 
                </div>
                                
            </div>
        </article>                    
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
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=4&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini2');

        // Ambil tanggal (format: Mar 8, 2025)        
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

        data.slice(1).forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');        

        item.innerHTML = `        
        <article class="w-[43.7vw] snap-start rounded-lg overflow-x-hidden bg-white border">
            <img src="${gambar}" alt="Judul 1" class="w-full h-30 object-cover rounded-t-lg">
            <div class="p-3">
                <h3 class="text-base font-semibold text-gray-900 text-truncate-siwa-2">
                    ${judul}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    <span>${formatTanggal(post.date)}</span>
                </p>
            </div>
        </article>        
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data berita terkini 2-4", err);
        document.getElementById('beritaterkini2').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function flashNews() {
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=20&_embed")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('flashnews');

            let teks = "";
            data.forEach(post => {
                const judul = post.title.rendered;
                teks += ` &bull; <a class="text-xs text-none"href="detail.html?id=${post.id}">${judul}</a>`;
            });

        container.innerHTML = teks;
        })
        .catch(err => {
        console.error("Gagal fetch flashnews:", err);
        document.getElementById('flashnews').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaTerkini5()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=7&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini5');

        // Ambil tanggal (format: Mar 8, 2025)        
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

        data.slice(4).forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');        

        item.innerHTML = `        
        <article class="w-[43.7vw] snap-start rounded-lg overflow-x-hidden bg-white border">
            <img src="${gambar}" alt="Judul 1" class="w-full h-30 object-cover rounded-t-lg">
            <div class="p-3">
                <h3 class="text-base font-semibold text-gray-900 text-truncate-siwa-2">
                    ${judul}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    <span>${formatTanggal(post.date)}</span>
                </p>
            </div>
        </article>        
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data berita terkini 2-4", err);
        document.getElementById('beritaterkini5').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function bannerKoran()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/media?search=banner-1-HL&per_page=1")
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
        
        const date = new Date(post.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let tanggal = date.toLocaleDateString('id-ID', options);
        tanggal = tanggal.replace(',', '');

        const item = document.createElement('div');

        item.innerHTML = `                                                          
            <img class="w-full h-50" src="${gambar}" data-src="${gambar}" alt="bannerKoran" data-uc-img="loading: lazy" loading="lazy">                    
        `;

        container.appendChild(item);
        });
        console.log("Banner Koran berhasil di-render.");
    })
    .catch(err => {
        console.error("Gagal fetch data Banner Koran", err);
        document.getElementById('bannerKoran').innerHTML = "<p>Gagal memuat iklan.</p>";
    });
}

function beritaTerkini8()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=11&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini8');

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
    
        data.slice(7).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 8-12", err);
            document.getElementById('beritaterkini8').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaTerpopuler()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/get_data_pvc")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('beritaterpopuler');

            data.forEach((post, index) => {            
            //const jamTerbit = post.date.slice(11, 16);
            const nomor = index + 1;
            const item = document.createElement('div');
            item.innerHTML = `
            <article class="flex items-center gap-2 py-2">
                <div>
                    <div class="text-base py-2 w-[10vw] font-bold text-center text-white bg-blue-siwa border-bottom-siwa">${nomor}</div>
                </div>
                <div class="text-truncate-siwa-2 text-none w-full">
                    <a class="text-sm font-medium" href="detail.html?id=${post.post_id}">${post.title}</a>
                </div>
            </article>            
            `;
            container.appendChild(item);
            });
        })
    .catch(error => {
        document.getElementById('beritaterpopuler').innerHTML = '<p>Gagal memuat data berita.</p>';
        console.error('Terjadi kesalahan:', error);
    });
}

function beritaTerkini12()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=15&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini12');

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
    
        data.slice(11).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 12-15", err);
            document.getElementById('beritaterkini12').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaTopnews()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=48&per_page=5&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritatopnews');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
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

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = ` 
        <article class="w-[43.7vw] snap-start rounded-lg overflow-x-hidden bg-white border">
            <img src="${gambar}" alt="Judul 1" class="w-full h-30 object-cover rounded-t-lg">
            <div class="p-3">
                <h3 class="text-base font-semibold text-gray-900 text-truncate-siwa-2">
                    ${judul}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    <span>${formatTanggal(post.date)}</span>
                </p>
            </div>
        </article>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritatopnews').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaTerkini16()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=18&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini16');

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
    
        data.slice(15).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 16-18", err);
            document.getElementById('beritaterkini16').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaTerkini19()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=21&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini19');

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
    
        data.slice(18).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 19-21", err);
            document.getElementById('beritaterkini19').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaSuaraNetizen()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=285&per_page=5&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritasuaranetizen');

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
    
        data.forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-24 h-24 object-cover rounded-full">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita suara netizen", err);
            document.getElementById('beritasuaranetizen').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaTerkini22()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=24&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini22');

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
    
        data.slice(21).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 22-24", err);
            document.getElementById('beritaterkini22').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function videoYoutube()
{
    const API_KEY = "AIzaSyDYbJ8vmu0eG7C-MC1PVwAPxPA3I9DTcG0";
    const CHANNEL_ID = "UC6JOSeUGezJtcMT-x5FtkOA";
    

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("video-grid");
        const modal = document.getElementById("video-modal");
        const iframe = document.getElementById("modal-iframe");
        const closeBtn = document.getElementById("close-modal");       

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

        data.items.forEach(item => {
        if (item.id.kind === "youtube#video") {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const publishedAt = new Date(item.snippet.publishedAt);

            // Buat elemen article
            const article = document.createElement("div");
            article.className = "bg-white rounded-lg shadow overflow-hidden";

            // Isi HTML-nya
            article.innerHTML = `
            <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}" class="w-full h-40 object-cover">
            <div class="p-3">
                <h3 class="text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                    ${title}
                </h3>
                <p class="text-xs text-gray-500 mt-1">
                    <span>${formatTanggal(publishedAt)}</span>
                </p>
            </div>
            `;

            // Saat diklik tampilkan modal
            article.addEventListener("click", () => {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                modal.classList.remove("hidden");
                modal.classList.add("flex");
            });

            // Tambahkan ke kontainer
            container.appendChild(article);
        }
        });
         // Tutup modal dan hentikan video
        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
            iframe.src = "";
        });
    });   
}

function beritaTerkini25()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=28&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini25');

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
    
        data.slice(24).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 25-28", err);
            document.getElementById('beritaterkini25').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaOpiniKoran()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=285&per_page=5&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaopinikoran');

        data.forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
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

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = ` 
        <article class="w-[43.7vw] snap-start rounded-lg overflow-x-hidden bg-white border">
            <img src="${gambar}" alt="Judul 1" class="w-full h-30 object-cover rounded-t-lg">
            <div class="p-3">
                <h3 class="text-base font-semibold text-gray-900 text-truncate-siwa-2">
                    ${judul}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    <span>${formatTanggal(post.date)}</span>
                </p>
            </div>
        </article>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data berita opini koran", err);
        document.getElementById('beritaopinikoran').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaTerkini29()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=32&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini29');

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
    
        data.slice(28).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 29-32", err);
            document.getElementById('beritaterkini29').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaTerkini33()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=36&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini33');

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
    
        data.slice(32).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 33-50", err);
            document.getElementById('beritaterkini33').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function beritaTerkini37()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=42&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini37');

        data.slice(36).forEach(post => {
        // Ambil kategori pertama (jika ada)
        const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";

        // Ambil tanggal (format: Mar 8, 2025)
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

        // Ambil judul
        const judul = post.title.rendered;

        // Ambil featured image (jika ada)
        const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";

        const item = document.createElement('div');

        item.innerHTML = ` 
        <article class="w-[43.7vw] snap-start rounded-lg overflow-x-hidden bg-white border">
            <img src="${gambar}" alt="Judul 1" class="w-full h-30 object-cover rounded-t-lg">
            <div class="p-3">
                <h3 class="text-base font-semibold text-gray-900 text-truncate-siwa-2">
                    ${judul}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    <span>${formatTanggal(post.date)}</span>
                </p>
            </div>
        </article>
        `;

        container.appendChild(item);
        });
    })
    .catch(err => {
        console.error("Gagal fetch data:", err);
        document.getElementById('beritaterkini37').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function beritaTerkini43()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?per_page=50&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritaterkini43');

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
    
        data.slice(42).forEach(post => {
            // Ambil kategori pertama (jika ada)
            const kategori = post._embedded["wp:term"]?.[0]?.[0]?.name || "Tanpa Kategori";
    
            // Ambil judul
            const judul = post.title.rendered;
    
            // Ambil featured image (jika ada)
            const gambar = post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
    
            const item = document.createElement('div');        
    
            item.innerHTML = `        
            <article class="w-full flex items-center rounded-lg bg-white mb-2">
                <img src="${gambar}" alt="Judul 1" class="w-[40vw] h-30 object-cover rounded-lg">
                <div class="p-3">
                    <h3 class="w-full text-sm font-semibold text-gray-900 text-truncate-siwa-2">
                        ${judul}
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">
                        <span>${formatTanggal(post.date)}</span>
                    </p>
                </div>
            </article>        
            `;
    
            container.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Gagal fetch data berita terkini 43-50", err);
            document.getElementById('beritaterkini43').innerHTML = "<p>Gagal memuat berita.</p>";
        });
}

function detailBerita()
{
    
    document.addEventListener("DOMContentLoaded", function () {
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

            // ✅ Lanjutkan fetch "Baca Juga" setelah sisipkan iklan
            const kataPertama = judul.split(" ")[0]; // ambil keyword dari judul, misalnya
            fetch(`https://siwalimanews.com/wp-json/wp/v2/posts?search=${kataPertama}&exclude=${id}&per_page=1&_embed`)
            .then(res => res.json())
            .then(posts => {
                let bacaJugaHTML = "";
                if(posts.length > 0) {
                bacaJugaHTML = `<div class="mt-2 mb-2">
                    <div class='bg-gray-50 p-2 baca-juga'>Baca Juga:<br>
                        <a href='detail.html?id=${posts[0].id}' class="judul fs-3 text-none">${posts[0].title.rendered}</a>
                    </div>
                </div>
                `;
                }          

            const paragrafPerHalaman = 6;
            let halamanSekarang = 1;
            const totalHalaman = Math.ceil(paragrafAsli.length / paragrafPerHalaman);          

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
                    document.getElementById("iklan-panjang").scrollIntoView({ behavior: "smooth" });
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
                        // Scroll ke atas konten setelah btn di klik
                        document.getElementById("iklan-panjang").scrollIntoView({ behavior: "smooth" });
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
                    document.getElementById("iklan-panjang").scrollIntoView({ behavior: "smooth" });
                    if (halamanSekarang < totalHalaman) {
                    halamanSekarang++;
                    renderHalaman(halamanSekarang);
                    }
                });
                liNext.appendChild(nextBtn);
                ul.appendChild(liNext);

                pagination.appendChild(ul);
                }


            // ✅ Render template HTML awal
            const container = document.getElementById("detailberita");
            container.innerHTML = `
            <div class="post-header">                    
                <div class="panel vstack mx-auto gap-2 md:gap-3">
                    <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 md:d-flex z-1">
                        <div>
                            <div class="post-category hstack gap-narrow fw-semibold">
                                <a class="text-none hover:text-red dark:text-primary duration-150" href="tes.html">${kategori}</a>
                            </div>
                        </div>
                        <div class="sep md:d-block">❘</div>
                            <div class="md:d-block">
                                <div class="post-date hstack gap-narrow">
                                    <span>${tanggal} WIT</span>
                                </div>
                            </div>                                                                
                        </div>
                        <div class="h4 judul fw-bold sm:h2 lg:h2 xl:h2">
                            ${judul}
                        </div>
                        <figure class="featured-image m-0">
                            <figure
                                class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                <img class="media-cover image uc-transition-opaque"
                                    src="${gambar}"
                                    data-src="${gambar}"
                                    alt="${judul}"
                                    data-uc-img="loading: lazy">
                            </figure>
                        </figure>
                    </div>                                        
                </div> 
                <!-- Iklan 1 start -->
                <div class="mt-3">
                    <div class="section-inner panel" id="iklan-panjang">                                                    
                        <img class="text-dark dark:text-white" src="../iklanpanjang.png" data-src="../iklanpanjang.png" alt="iklanpanjang" data-uc-img="loading: lazy">
                        <a href=#" class="position-cover"></a>
                    </div>
                </div>
                <!-- Iklan 1 end -->
        <div class="panel position-relative mt-2 lg:mt-2 xl:mt-4">
            <div class="container">
                <div class="content-wrap row child-col-12 lg:child-cols g-4 lg:g-6">
                    <div class="max-w-lg">
                        <!-- Isi start -->
                        <div class="isi row panel fs-6 md:fs-5" data-uc-lightbox="animation: scale">
                            <div class="lg:col-9 lg:order-1 px-2 none-padding-left">
                                <div id="konten-berita"></div>
                                <div id="pagination-controls" class="mt-4 text-center"></div>                                                                                                                                                                                                                               
                            </div>
                            <div class="lg:col-3 lg:order-2 align-item-top none-padding-right">
                                <div class="iklanpanjangkebawah" data-uc-sticky="sel-target: .uc-navbar-container; cls-active: uc-navbar-sticky; cls-inactive: uc-navbar-transparent; end: !*;">                                                        
                                    <img src="../iklan_panjangkebawah_isiberita.jpg" data-src="../iklan_panjangkebawah_isiberita.jpg" alt="iklan_panjangkebawah_isiberita" data-uc-img="loading: lazy">                                                                                                             
                                </div>
                            </div>                                                    
                        </div>
                        <!-- Isi end -->
                        <!-- Tags & Share start -->
                        <div
                            class="post-footer panel vstack sm:hstack gap-3 justify-between border-top py-4 mt-2 xl:mt-5">
                            <ul class="nav-x gap-narrow text-primary">
                                <li><span class="text-black dark:text-white me-narrow">Tags:</span></li>
                                <li>
                                    <a href="#" class="uc-link gap-0 dark:text-white">Food <span
                                            class="text-black dark:text-white">,</span></a>
                                </li>
                                <li>
                                    <a href="#" class="uc-link gap-0 dark:text-white">Life Style <span
                                            class="text-black dark:text-white">,</span></a>
                                </li>
                                <li>
                                    <a href="#" class="uc-link gap-0 dark:text-white">Tech <span
                                            class="text-black dark:text-white">,</span></a>
                                </li>
                                <li><a href="#" class="uc-link gap-0 dark:text-white">Travel</a></li>
                            </ul>
                            <ul class="post-share-icons nav-x gap-narrow">
                                <li class="me-1"><span class="text-black dark:text-white">Share:</span></li>
                                <li>
                                    <a class="btn btn-md btn-outline-gray-100 p-0 w-32px lg:w-40px h-32px lg:h-40px text-dark dark:text-white dark:border-gray-600 hover:bg-primary hover:border-primary hover:text-white rounded-circle"
                                        href="#"><i class="unicon-logo-facebook icon-1"></i></a>
                                </li>
                                <li>
                                    <a class="btn btn-md btn-outline-gray-100 p-0 w-32px lg:w-40px h-32px lg:h-40px text-dark dark:text-white dark:border-gray-600 hover:bg-primary hover:border-primary hover:text-white rounded-circle"
                                        href="#"><i class="unicon-logo-x-filled icon-1"></i></a>
                                </li>
                                <li>
                                    <a class="btn btn-md btn-outline-gray-100 p-0 w-32px lg:w-40px h-32px lg:h-40px text-dark dark:text-white dark:border-gray-600 hover:bg-primary hover:border-primary hover:text-white rounded-circle"
                                        href="#"><i class="unicon-email icon-1"></i></a>
                                </li>
                                <li>
                                    <a class="btn btn-md btn-outline-gray-100 p-0 w-32px lg:w-40px h-32px lg:h-40px text-dark dark:text-white dark:border-gray-600 hover:bg-primary hover:border-primary hover:text-white rounded-circle"
                                        href="#"><i class="unicon-link icon-1"></i></a>
                                </li>
                            </ul>
                        </div>
                        <!-- Tags & Share end -->
                        <!-- Next & Previous Article start -->                                                
                        <div class="post-navigation panel vstack sm:hstack justify-between gap-2 mt-0 xl:mt-1">
                            <div class="new-post panel hstack w-100 sm:w-1/2">
                                <div class="panel hstack justify-center w-100px h-100px">
                                    <figure
                                        class="featured-image m-0 ratio ratio-1x1 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                        <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                            src="../assets/images/common/img-fallback.png"
                                            data-src="../assets/images/demo-two/posts/img-02.jpg"
                                            alt="Tech Innovations Reshaping the Retail Landscape: AI Payments"
                                            data-uc-img="loading: lazy">
                                        <a href="blog-details.html" class="position-cover"
                                            data-caption="Tech Innovations Reshaping the Retail Landscape: AI Payments"></a>
                                    </figure>
                                </div>
                                <div class="panel vstack justify-center px-2 gap-1 w-1/3">
                                    <span class="fs-7 opacity-60">Prev Article</span>
                                    <h6 class="h6 lg:h5 m-0">Tech Innovations Reshaping the Retail Landscape: AI
                                        Payments</h6>
                                </div>
                                <a href="blog-details.html" class="position-cover"></a>
                            </div>
                            <div class="new-post panel hstack w-100 sm:w-1/2">
                                <div class="panel vstack justify-center px-2 gap-1 w-1/3 text-end">
                                    <span class="fs-7 opacity-60">Next Article</span>
                                    <h6 class="h6 lg:h5 m-0">The Rise of AI-Powered Personal Assistants: How
                                        They Manage</h6>
                                </div>
                                <div class="panel hstack justify-center w-100px h-100px">
                                    <figure
                                        class="featured-image m-0 ratio ratio-1x1 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                        <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                            src="../assets/images/common/img-fallback.png"
                                            data-src="../assets/images/demo-two/posts/img-01.jpg"
                                            alt="The Rise of AI-Powered Personal Assistants: How They Manage"
                                            data-uc-img="loading: lazy">
                                        <a href="blog-details.html" class="position-cover"
                                            data-caption="The Rise of AI-Powered Personal Assistants: How They Manage"></a>
                                    </figure>
                                </div>
                                <a href="blog-details.html" class="position-cover"></a>
                            </div>
                        </div>
                        <!-- Next & Previous Article end -->
                        <!-- Berita Terkait start -->
                        <div class="post-related panel border-top pt-2 mt-8 xl:mt-9">
                            <div class="block-header panel gap-1 mb-2">
                                <h2 class="text-blue block-title h5 m-0 gap-1 d-inline-block border-bottom border-red border-md-5 pb-1 dark:text-blue">                                                    
                                    <span>BERITA TERKAIT</span>
                                </h2>
                            </div>
                            <div class="row child-cols-6 md:child-cols-4 gx-2 gy-4 sm:gx-3 sm:gy-6">
                                <div>
                                    <article class="post type-post panel vstack gap-2">
                                        <figure
                                            class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                                src="../assets/images/common/img-fallback.png"
                                                data-src="../assets/images/demo-two/posts/img-07.jpg"
                                                alt="The Art of Baking: From Classic Bread to Artisan Pastries"
                                                data-uc-img="loading: lazy">
                                            <a href="blog-details.html" class="position-cover"
                                                data-caption="The Art of Baking: From Classic Bread to Artisan Pastries"></a>
                                        </figure>
                                        <div class="post-header panel vstack gap-1">
                                            <h5 class="h6 md:h5 m-0">
                                                <a class="text-none" href="blog-details.html">The Art of Baking:
                                                    From Classic Bread to Artisan Pastries</a>
                                            </h5>
                                            <div class="post-date hstack gap-narrow fs-7 opacity-60">
                                                <span>Feb 28, 2025</span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div>
                                    <article class="post type-post panel vstack gap-2">
                                        <figure
                                            class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                                src="../assets/images/common/img-fallback.png"
                                                data-src="../assets/images/demo-two/posts/img-08.jpg"
                                                alt="AI and Marketing: Unlocking Customer Insights"
                                                data-uc-img="loading: lazy">
                                            <a href="blog-details.html" class="position-cover"
                                                data-caption="AI and Marketing: Unlocking Customer Insights"></a>
                                        </figure>
                                        <div class="post-header panel vstack gap-1">
                                            <h5 class="h6 md:h5 m-0">
                                                <a class="text-none" href="blog-details.html">AI and Marketing:
                                                    Unlocking Customer Insights</a>
                                            </h5>
                                            <div class="post-date hstack gap-narrow fs-7 opacity-60">
                                                <span>Feb 28, 2025</span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div>
                                    <article class="post type-post panel vstack gap-2">
                                        <figure
                                            class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                                src="../assets/images/common/img-fallback.png"
                                                data-src="../assets/images/demo-two/posts/img-09.jpg"
                                                alt="Hidden Gems: Underrated Travel Destinations Around the World"
                                                data-uc-img="loading: lazy">
                                            <a href="blog-details.html" class="position-cover"
                                                data-caption="Hidden Gems: Underrated Travel Destinations Around the World"></a>
                                        </figure>
                                        <div class="post-header panel vstack gap-1">
                                            <h5 class="h6 md:h5 m-0">
                                                <a class="text-none" href="blog-details.html">Hidden Gems:
                                                    Underrated Travel Destinations Around the World</a>
                                            </h5>
                                            <div class="post-date hstack gap-narrow fs-7 opacity-60">
                                                <span>Feb 28, 2025</span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div>
                                    <article class="post type-post panel vstack gap-2">
                                        <figure
                                            class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                                src="../assets/images/common/img-fallback.png"
                                                data-src="../assets/images/demo-two/posts/img-07.jpg"
                                                alt="The Art of Baking: From Classic Bread to Artisan Pastries"
                                                data-uc-img="loading: lazy">
                                            <a href="blog-details.html" class="position-cover"
                                                data-caption="The Art of Baking: From Classic Bread to Artisan Pastries"></a>
                                        </figure>
                                        <div class="post-header panel vstack gap-1">
                                            <h5 class="h6 md:h5 m-0">
                                                <a class="text-none" href="blog-details.html">The Art of Baking:
                                                    From Classic Bread to Artisan Pastries</a>
                                            </h5>
                                            <div class="post-date hstack gap-narrow fs-7 opacity-60">
                                                <span>Feb 28, 2025</span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div>
                                    <article class="post type-post panel vstack gap-2">
                                        <figure
                                            class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                                src="../assets/images/common/img-fallback.png"
                                                data-src="../assets/images/demo-two/posts/img-07.jpg"
                                                alt="The Art of Baking: From Classic Bread to Artisan Pastries"
                                                data-uc-img="loading: lazy">
                                            <a href="blog-details.html" class="position-cover"
                                                data-caption="The Art of Baking: From Classic Bread to Artisan Pastries"></a>
                                        </figure>
                                        <div class="post-header panel vstack gap-1">
                                            <h5 class="h6 md:h5 m-0">
                                                <a class="text-none" href="blog-details.html">The Art of Baking:
                                                    From Classic Bread to Artisan Pastries</a>
                                            </h5>
                                            <div class="post-date hstack gap-narrow fs-7 opacity-60">
                                                <span>Feb 28, 2025</span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div>
                                    <article class="post type-post panel vstack gap-2">
                                        <figure
                                            class="featured-image m-0 ratio ratio-4x3 rounded uc-transition-toggle overflow-hidden bg-gray-25 dark:bg-gray-800">
                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque"
                                                src="../assets/images/common/img-fallback.png"
                                                data-src="../assets/images/demo-two/posts/img-07.jpg"
                                                alt="The Art of Baking: From Classic Bread to Artisan Pastries"
                                                data-uc-img="loading: lazy">
                                            <a href="blog-details.html" class="position-cover"
                                                data-caption="The Art of Baking: From Classic Bread to Artisan Pastries"></a>
                                        </figure>
                                        <div class="post-header panel vstack gap-1">
                                            <h5 class="h6 md:h5 m-0">
                                                <a class="text-none" href="blog-details.html">The Art of Baking:
                                                    From Classic Bread to Artisan Pastries</a>
                                            </h5>
                                            <div class="post-date hstack gap-narrow fs-7 opacity-60">
                                                <span>Feb 28, 2025</span>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <!-- Berita Terkait end -->
                    </div>
                </div>
            </div>
        </div>            
        `;

        renderHalaman(halamanSekarang); 
        })
        .catch((error) => {
        console.error("Gagal memuat Baca Juga:", error);
        });
        })
    .catch((error) => {
    console.error("Terjadi kesalahan:", error);
    });
    });
}

function beritaCoba()
{
    fetch("https://siwalimanews.com/wp-json/wp/v2/posts?categories=25&per_page=7&_embed")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('beritavisi');
    
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
        const isi1 = post1.content.rendered;
        const potonganIsi1 = isi1.length > 100 ? isi1.slice(0, 150) + "..." : isi1;
        const post1HTML = `                
        <div>
            <article class="post type-post panel d-flex flex-row gap-3 align-items-start">
                <!-- Gambar di kiri -->
                <div class="post-media uc-transition-toggle overflow-hidden flex-shrink-0" style="width: 240px;">
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-4x3">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image w-100 h-100 object-cover" 
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" 
                            data-src="${getImage(post1)}" 
                            alt="${post1.title.rendered}" 
                            data-uc-img="loading: lazy">
                    </div>
                </div>

                <!-- Konten teks di kanan -->
                <div class="post-header panel vstack gap-1 flex-grow-1">                    
                    <h3 class="post-title h6 fw-semibold m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="detail.html?id=${post1.id}">${post1.title.rendered}</a>
                    </h3>
                    <p class="m-0">
                        ${potonganIsi1}
                    </p>
                </div>
            </article>
        </div>
        `;
    
        // ========== POST 2–4 ==========
        let postListHTML = '';
        data.slice(1).forEach(post => {

        const isi = post.content.rendered;
        const potonganIsi = isi.length > 100 ? isi.slice(0, 150) + "..." : isi;
        postListHTML += `
        <div>
            <article class="post type-post panel d-flex flex-row gap-3 align-items-start">
                <!-- Konten teks di kanan -->
                <div class="post-header panel vstack gap-1 flex-grow-1">                    
                    <h3 class="post-title h6 fw-semibold m-0 text-truncate-2">
                        <a class="text-none hover:text-primary duration-150" href="detail.html?id=${post.id}">${post.title.rendered}</a>
                    </h3>
                    <p class="m-0">
                        ${potonganIsi}
                    </p>
                </div>

                <!-- Gambar di kiri -->
                <div class="post-media uc-transition-toggle overflow-hidden flex-shrink-0" style="width: 240px;">
                    <div class="featured-image uc-transition-scale-up uc-transition-opaque bg-gray-25 dark:bg-gray-800 ratio ratio-4x3">
                        <img class="uc-transition-scale-up uc-transition-opaque media-cover image w-100 h-100 object-cover" 
                            src="https://html.themewant.com/news5/assets/images/common/img-fallback.png" 
                            data-src="${getImage(post)}" 
                            alt="${post.title.rendered}" 
                            data-uc-img="loading: lazy">
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
        console.error("Gagal fetch berita", err);
        document.getElementById('beritavisi').innerHTML = "<p>Gagal memuat berita.</p>";
    });
}

function rubrikVideo()
{    
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get("id");

    if (videoId) {
        setTimeout(() => {
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "500";
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; encrypted-media";
            iframe.allowFullscreen = true;

            const container = document.getElementById("video-youtube-detail");
            container.innerHTML = ""; // Kosongkan pesan "Memuat video..."
            container.appendChild(iframe);
        }, 3000); // ⏱️ 3000 ms = 3 detik
        } else {
        document.getElementById("video-youtube-detail").innerHTML = "<p>Video ID tidak ditemukan di URL.</p>";
        }
}

// Fungsi inisialisasi yang akan dipanggil saat DOM sudah siap
function initApp() {
    flashNews();
    swiperBerita();    
    beritaTerkini2();
    beritaTerkini5();
    bannerKoran();
    beritaTerkini8();
    beritaTerpopuler();
    beritaTerkini12();
    beritaTopnews();
    beritaTerkini16();
    beritaTerkini19();
    beritaSuaraNetizen();
    beritaTerkini22();
    videoYoutube();
    beritaTerkini25();
    beritaOpiniKoran();
    beritaTerkini29();
    beritaTerkini33();
    beritaTerkini37();
    beritaTerkini43();
    detailBerita();    
}

// Jalankan setelah halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);