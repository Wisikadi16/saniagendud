// 1. Digital Confetti
function fireDigitalConfetti() {
      const end = Date.now() + 1500;
      const colors = ['#ff4d94', '#ff80b3', '#ffffff', '#b9134f'];

      (function frame() {
            confetti({
                  particleCount: 3,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0, y: 0.8 },
                  colors: colors,
                  scalar: 1,
                  shapes: ['square'] // Square for pixel feel
            });
            confetti({
                  particleCount: 3,
                  angle: 120,
                  spread: 55,
                  origin: { x: 1, y: 0.8 },
                  colors: colors,
                  scalar: 1,
                  shapes: ['square']
            });

            if (Date.now() < end) {
                  requestAnimationFrame(frame);
            }
      }());
}

// 2. Screen Navigation Logic
const screens = document.querySelectorAll('.screen-item');
const startBtn = document.getElementById('startBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const toSecretBtn = document.getElementById('toSecretBtn');
const backToStartBtn = document.getElementById('backToStartBtn');
const backToLevelBtn = document.getElementById('backToLevelBtn');
const backToGalleryBtn = document.getElementById('backToGalleryBtn');
const bgMusic = document.getElementById('bgMusic');
let heartInterval; // Variable to store heart spawn interval

function showScreen(screenId) {
      screens.forEach(screen => {
            screen.classList.remove('active');
      });
      const target = document.getElementById(screenId);
      target.classList.add('active');

      // Auto-trigger confetti on Level Up screen
      if (screenId === 'level-up') {
            setTimeout(fireDigitalConfetti, 300);
      }

      // Floating hearts on secret screen
      if (heartInterval) clearInterval(heartInterval);
      if (screenId === 'secret') {
            spawnHearts();
      }
}

// 2.a Fake Loading Logic
console.log("Loading script initialized...");
const loadingBar = document.getElementById('loading-bar');
const loadingPct = document.getElementById('loading-percentage');
const loadingText = document.getElementById('loading-text');

const hints = [
      "Mempersiapkan dunia untuk player yang paling cantik...",
      "Mengumpulkan semua kenangan indah bersama...",
      "Menghitung seberapa besar cintaku padamu (Error: Terlalu Besar!)...",
      "Memastikan keamanan hati dari gangguan luar...",
      "Menyetel ulang ekspektasi masa depan yang lebih cerah...",
      "Memuat pelukan virtual... 100% Selesai."
];

function startLoading() {
      let progress = 0;
      let hintIndex = 0;

      showScreen('loading-screen');

      // Ganti teks tiap 3 detik
      const hintInterval = setInterval(() => {
            hintIndex = (hintIndex + 1) % hints.length;

            loadingText.style.animation = 'none';
            loadingText.offsetHeight;
            loadingText.style.animation = 'fadeIn 0.5s ease';

            loadingText.innerText = hints[hintIndex];
      }, 3000);

      // Nambah progress bar
      const progressInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 2;
            if (progress > 100) progress = 100;

            loadingBar.style.width = `${progress}%`;
            loadingPct.innerText = `${progress}%`;

            if (progress === 100) {
                  clearInterval(progressInterval);
                  clearInterval(hintInterval);
                  loadingText.innerText = "System Ready. Welcome Sania!";

                  setTimeout(() => {
                        showScreen('question-screen');
                  }, 1500);
            }
      }, 1000);
}

const codeOverlay = document.getElementById('code-overlay');
const codeText = document.getElementById('code-text');

function runHackerEffect() {
      codeOverlay.classList.add('active');
      codeText.innerHTML = ''; // Reset teks
      const chars = '01ABCDEFHIJKLMNOPQRSTUVWXYZ<>[]{}/\\|!@#$%^&*()_+-=';

      // 1. NGUKUR LAYAR OTOMATIS DAN AKURAT
      // Deteksi lebar asli font yang dirender browser
      const dummy = document.createElement('span');
      dummy.style.fontFamily = "'VT323', monospace";
      dummy.style.fontSize = "1.2rem";
      dummy.style.visibility = "hidden";
      dummy.style.position = "absolute";
      dummy.style.whiteSpace = "nowrap";
      dummy.textContent = "A";
      document.body.appendChild(dummy);

      const charW = dummy.getBoundingClientRect().width || 10;
      const charH = (dummy.getBoundingClientRect().height || 24) * 1.2;
      document.body.removeChild(dummy);

      // Hitung butuh berapa karakter buat penuhin layar (dikurangi padding 40px)
      const totalCols = Math.ceil((window.innerWidth - 40) / charW);
      const maxLines = Math.ceil((window.innerHeight - 40) / charH) + 5;

      // 2. NENTUIN TITIK TENGAH LAYAR
      const centerX = totalCols / 2;
      const centerY = maxLines / 2;

      // 3. SKALA UKURAN HATI (Merespon ukuran layar otomatis)
      const scaleX = totalCols / 4; // Biar proporsional sama lebar layar
      const scaleY = maxLines / 3;  // Biar proporsional sama tinggi layar

      let lineCount = 0;

      const interval = setInterval(() => {
            const lineDiv = document.createElement('div');

            let y = (centerY - lineCount) / scaleY;
            y += 0.2; // Digeser ke bawah (sebelumnya -0.3) biar nggak kepotong di atas

            for (let i = 0; i < totalCols; i++) {
                  let x = (i - centerX) / scaleX;

                  // RUMUS HATI (Heart Equation)
                  let heartEquation = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);

                  if (heartEquation <= 0) {
                        lineDiv.innerHTML += "&nbsp;";
                  } else {
                        lineDiv.innerHTML += chars.charAt(Math.floor(Math.random() * chars.length));
                  }
            }

            if (Math.random() > 0.90) lineDiv.className = 'glitch-text';

            codeText.appendChild(lineDiv);
            codeOverlay.scrollTop = codeOverlay.scrollHeight;

            lineCount++;
            if (lineCount > maxLines) {
                  clearInterval(interval);
                  setTimeout(() => {
                        codeOverlay.classList.remove('active');
                        showScreen('level-up');
                  }, 1000);
            }
      }, 40);
}



startBtn.addEventListener('click', () => {
      bgMusic.play();
      startLoading();
});

// Question Logic
const q1Btn = document.getElementById('q1-btn');
const q2Btn = document.getElementById('q2-btn');
const q3Btn = document.getElementById('q3-btn');
const q4Btn = document.getElementById('q4-btn');
const q5Btn = document.getElementById('q5-btn');
const q6Btn = document.getElementById('q6-btn');

function nextQuestion(currentId, nextId, inputId) {
      const inputVal = document.getElementById(inputId).value;
      if (!inputVal.trim()) {
            alert('Isi dulu ya sayang! 😉');
            return;
      }
      document.getElementById(currentId).classList.remove('active');
      document.getElementById(nextId).classList.add('active');
}

q1Btn.addEventListener('click', () => nextQuestion('q1-container', 'q2-container', 'q1-input'));
q2Btn.addEventListener('click', () => nextQuestion('q2-container', 'q3-container', 'q2-input'));
q3Btn.addEventListener('click', () => nextQuestion('q3-container', 'q4-container', 'q3-input'));
q4Btn.addEventListener('click', () => nextQuestion('q4-container', 'q5-container', 'q4-input'));
q5Btn.addEventListener('click', () => nextQuestion('q5-container', 'q6-container', 'q5-input'));

q6Btn.addEventListener('click', () => {
      const inputVal = document.getElementById('q6-input').value;
      if (!inputVal.trim()) {
            alert('Isi dulu ya sayang! 😉');
            return;
      }
      runHackerEffect();
});

const toCakeBtn = document.getElementById('toCakeBtn');

nextLevelBtn.addEventListener('click', () => {
      showScreen('gallery');
});

toCakeBtn.addEventListener('click', () => {
      showScreen('cake-screen');
});

function blowCandle() {
      const flame = document.getElementById('flame');
      const smoke = document.getElementById('smoke');

      flame.style.display = 'none';
      smoke.classList.add('active');

      // Auto transition ke secret setelah 2 detik
      setTimeout(() => {
            showScreen('secret');
      }, 2000);
}

backToStartBtn.addEventListener('click', () => {
      showScreen('start-screen');
});

backToLevelBtn.addEventListener('click', () => {
      showScreen('level-up');
});

backToGalleryBtn.addEventListener('click', () => {
      showScreen('gallery');
});

const backToGalleryBtn2 = document.getElementById('backToGalleryBtn2');
backToGalleryBtn2.addEventListener('click', () => {
      showScreen('gallery');
});

// 3. Image Modal
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');

function openModal(src, caption) {
      imageModal.classList.add('active');
      modalImg.src = src;
      modalCaption.textContent = caption;
}

function closeModal() {
      imageModal.classList.remove('active');
}

// 4. Misc Logic
// Close modals on Esc key
window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
            closeModal();
      }
});

// 5. Relationship Timer Logic
const startDate = new Date('2021-08-22T00:00:00+07:00'); // Tanggal Jadian: 22 Agustus 2021
const timerDisplay = document.getElementById('timer-display');

function updateTimer() {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      timerDisplay.innerText = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds...`;
}

// Jalankan timer tiap detik
setInterval(updateTimer, 1000);
updateTimer(); // Jalankan sekali di awal

// 6. Floating Hearts Logic
function spawnHearts() {
      const container = document.getElementById('floating-hearts');
      if (!container) return;

      heartInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('f-heart');
            heart.innerHTML = '❤️';

            // Random horizontal position
            heart.style.left = Math.random() * 100 + '%';

            // Random duration and size
            const duration = 3 + Math.random() * 5;
            const size = 0.8 + Math.random() * 1.5;

            heart.style.setProperty('--duration', duration + 's');
            heart.style.fontSize = size + 'rem';

            container.appendChild(heart);

            // Remove after animation ends
            setTimeout(() => {
                  heart.remove();
            }, duration * 1000);
      }, 500);
}

// Console Log Easter Egg
console.log("%cLEVEL UP! %cHAPPY BIRTHDAY SANIA!",
      "color: #ff4d94; font-size: 20px; font-weight: bold; font-family: monospace;",
      "color: #ffffff; font-size: 16px; font-family: monospace;"
);