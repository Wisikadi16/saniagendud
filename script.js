// Data Teks Typewriter
const ucapan = "Selamat ulang tahun ya! Terima kasih sudah jadi orang yang luar biasa. Semoga hari ini seindah senyummu, dan tahun ini bawa banyak kebahagiaan buat kamu. Ada banyak hal yang pengen aku sampein, tapi biarkan halaman ini yang bercerita...";
let i = 0;
const speed = 50; // Kecepatan ketik (ms)

// Elemen DOM
const openBtn = document.getElementById('openBtn');
const openingScreen = document.getElementById('opening');
const mainScreen = document.getElementById('main');
const closingScreen = document.getElementById('closing');
const bgMusic = document.getElementById('bgMusic');
const typewriterText = document.getElementById('typewriter-text');

// 1. Event Buka Hadiah
openBtn.addEventListener('click', () => {
    // Memutar musik
    bgMusic.play();

    // Transisi Layar
    openingScreen.classList.remove('active');
    setTimeout(() => {
        openingScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        // Memberi sedikit waktu sebelum fade in
        setTimeout(() => {
            mainScreen.classList.add('active');
            fireConfetti();
            typeWriter();
            startSlideshow();
        }, 100);
    }, 1500);
});

// 2. Efek Confetti (Menggunakan Canvas-Confetti)
function fireConfetti() {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#e5989b', '#b5838d', '#ffcdb2']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#e5989b', '#b5838d', '#ffcdb2']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// 3. Animasi Typewriter
function typeWriter() {
    if (i < ucapan.length) {
        typewriterText.innerHTML += ucapan.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // Tambahkan cursor berkedip di akhir
        typewriterText.innerHTML += '<span class="cursor"></span>';
    }
}

// 4. Slideshow Otomatis
let slideIndex = 0;
function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    
    setInterval(() => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }, 3000); // Ganti foto setiap 3 detik
}

// 5. Galeri Popup
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');

function openModal(imageSrc, caption) {
    imageModal.style.display = "flex";
    modalImg.src = imageSrc;
    modalCaption.innerHTML = caption;
}

function closeModal() {
    imageModal.style.display = "none";
}

// 6. Pesan Rahasia & Transisi Penutup
const secretBtn = document.getElementById('secretBtn');
const secretModal = document.getElementById('secretModal');
const toClosingBtn = document.getElementById('toClosingBtn');

secretBtn.addEventListener('click', () => {
    secretModal.style.display = "flex";
});

function closeSecret() {
    secretModal.style.display = "none";
}

// Transisi ke Layar Penutup
toClosingBtn.addEventListener('click', () => {
    closeSecret();
    mainScreen.classList.remove('active');
    
    setTimeout(() => {
        mainScreen.style.display = 'none';
        closingScreen.style.display = 'flex';
        setTimeout(() => {
            closingScreen.classList.add('active');
        }, 100);
    }, 1500);
});