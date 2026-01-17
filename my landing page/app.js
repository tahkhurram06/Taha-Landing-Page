// --- ACCORDION LOGIC (Keep as is) ---
document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.list-item').forEach(other => {
            other.classList.remove('active');
            other.querySelector('.toggle-button').textContent = '+';
        });
        if (!isActive) {
            item.classList.add('active');
            item.querySelector('.toggle-button').textContent = '-';
        }
    });
});

// --- INFINITE CAROUSEL LOGIC (Responsive Updated) ---
const track = document.getElementById('track');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 1;
let isTransitioning = false;
let autoPlayTimer;

function updateCarousel(animate = true) {
    if (cards.length === 0) return;

    // 1. Get Widths dynamically
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth; 
    
    // RESPONSIVE FIX: Check window width to adjust gap if needed
    // If screen is < 768px, use 20px gap, otherwise 30px
    const gap = window.innerWidth < 768 ? 20 : 30; 

    // 2. The Magic Math for Center Alignment
    const centerOffset = (containerWidth - cardWidth) / 2;
    const moveAmount = (currentIndex * (cardWidth + gap)) - centerOffset;

    // 3. Apply Style
    track.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
    track.style.transform = `translateX(-${moveAmount}px)`;

    // 4. Update Visual Classes
    const realIndex = parseInt(cards[currentIndex].getAttribute('data-real-index'));
    
    cards.forEach((c, i) => {
        c.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((d, i) => {
        d.classList.toggle('active', i === realIndex);
    });
}

// FIX: Make whole card clickable (Images/Text)
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;
        currentIndex = index;
        updateCarousel(true);
    });
});

track.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (currentIndex === cards.length - 1) { currentIndex = 1; updateCarousel(false); }
    if (currentIndex === 0) { currentIndex = cards.length - 2; updateCarousel(false); }
});

const moveNext = () => { if (!isTransitioning) { isTransitioning = true; currentIndex++; updateCarousel(true); } };
const movePrev = () => { if (!isTransitioning) { isTransitioning = true; currentIndex--; updateCarousel(true); } };

nextBtn.onclick = moveNext;
prevBtn.onclick = movePrev;

dots.forEach((dot, i) => {
    dot.onclick = (e) => {
        e.stopPropagation();
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = i + 1;
        updateCarousel(true);
    };
});

// Auto-Play & Resizing
const startAutoPlay = () => autoPlayTimer = setInterval(moveNext, 4500);
const stopAutoPlay = () => clearInterval(autoPlayTimer);

window.addEventListener('load', () => { updateCarousel(false); startAutoPlay(); });
track.parentElement.addEventListener('mouseenter', stopAutoPlay);
track.parentElement.addEventListener('mouseleave', startAutoPlay);

// RESPONSIVE FIX: Ensure layout recalculates on resize
window.addEventListener('resize', () => {
    setTimeout(() => updateCarousel(false), 100); 
});
  // Select hamburger and nav links
 // --- HAMBURGER MENU LOGIC ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  // Toggle the class on the MENU (to slide it in)
  navLinks.classList.toggle('active');
  
  // Toggle the class on the BUTTON (to turn lines into an X)
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
