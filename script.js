// 1. Intersection Observer for Scroll Reveals
const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
            if (entry.isIntersecting) {
                  entry.target.classList.add('active');

                  // Trigger specific animations based on section ID
                  if (entry.target.id === 'birthday-wish') {
                        fireSubtleConfetti();
                  }
            }
      });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Audio & Start Button
const bgMusic = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
      bgMusic.play();
      document.getElementById('birthday-wish').scrollIntoView({ behavior: 'smooth' });
});

// 3. Subtle Confetti
function fireSubtleConfetti() {
      const end = Date.now() + 1000;
      const colors = ['#d63031', '#fab1a0', '#ffeaa7'];

      (function frame() {
            confetti({
                  particleCount: 2,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0, y: 0.8 },
                  colors: colors,
                  scalar: 0.8
            });
            confetti({
                  particleCount: 2,
                  angle: 120,
                  spread: 55,
                  origin: { x: 1, y: 0.8 },
                  colors: colors,
                  scalar: 0.8
            });

            if (Date.now() < end) {
                  requestAnimationFrame(frame);
            }
      }());
}

// 4. Slideshow
let slideIndex = 0;
function startSlideshow() {
      const slides = document.querySelectorAll('.slide');
      if (slides.length === 0) return;

      setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add('active');
      }, 4000);
}
startSlideshow();

// 5. Image Modal
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');

function openModal(src, caption) {
      imageModal.classList.add('active');
      modalImg.src = src;
      modalCaption.textContent = caption;
      document.body.style.overflow = 'hidden';
}

function closeModal() {
      imageModal.classList.remove('active');
      document.body.style.overflow = 'auto';
}

// 6. Secret Message Modal
const secretModal = document.getElementById('secretModal');
const viewSecretBtn = document.getElementById('viewSecretBtn');

viewSecretBtn.addEventListener('click', () => {
      secretModal.classList.add('active');
      document.body.style.overflow = 'hidden';
});

function closeSecret() {
      secretModal.classList.remove('active');
      document.body.style.overflow = 'auto';
}

// Close modals on Esc key
window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
            closeModal();
            closeSecret();
      }
});