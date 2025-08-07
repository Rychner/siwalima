function swiperBerita()
{
    // Ganti data API dengan array foto lokal
    const dataLokal = [
        {
            id: 535892,
            judul: "Berita Pertama",
            gambar: [
                "featuregraphic.jpg",
                "featuregraphic.jpg",
                "featuregraphic.jpg"
            ],
            tanggal: "2025-08-05T14:10:00"
        },
    ];
    const container = document.getElementById('swiperberitafoto');
    if (!container) {
        console.error("Elemen #swiperberita tidak ditemukan!");
        return;
    }

    const thumbnails = [];
    

    dataLokal.forEach(post => {   
        post.gambar.forEach(gambarUrl => {   
            
    thumbnails.push(gambarUrl); 

    const item = document.createElement('div');                
    item.className = "swiper-slide";

    item.innerHTML = `    
    <article class="rounded-top-1 rounded-bottom-1 post type-post panel vstack gap-1 bg-dark">
        <div class="rounded-top-1 rounded-bottom-1 post-media panel uc-transition-toggle overflow-hidden position-relative hover:rounded-top-1 hover:rounded-bottom-1">
            <div class="featured-image rounded-top-1 rounded-bottom-1 bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                <img class="rounded-top-1 rounded-bottom-1 uc-transition-scale-up uc-transition-opaque media-cover image" src="${gambarUrl}" data-src="${gambarUrl}" alt="${post.judul}" data-uc-img="loading: lazy">
            </div>            
        </div>
    </article>                    
    `;

    container.appendChild(item);
        });
    });
    // Setelah semua slide dimasukkan, baru inisialisasi Swiper
    const swiper = new Swiper(".mySwiper", {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-nav.nav-next",
            prevEl: ".swiper-nav.nav-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                const thumb = thumbnails[index];
                return `
                <img src="${thumb}" class="${className}"/> 
                `;
            }
        }
    });

    // 🐞 Debugging: tampilkan index slide aktif saat berpindah
    swiper.on("slideChange", () => {
        console.log("Aktif slide:", swiper.activeIndex);
    });
    
    // ⚙️ Tambahan: paksa update tombol navigasi
    swiper.on("slideChange", () => {
        swiper.navigation.update();
    });
    console.log("Swiper berhasil di-render.");
}