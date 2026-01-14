document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DARK MODE LOGICA ---
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const body = document.body;

    // Check bij laden: wat is de voorkeur?
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Sla keuze op en wissel icoon
            if (isDark) {
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // --- 3. MOBIEL MENU ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon?.classList.toggle('fa-bars');
            icon?.classList.toggle('fa-times');
        });
    }

    // --- 4. TYPING EFFECT (Optioneel) ---
    const heroTitleName = document.querySelector('.hero-title-name');
    if (heroTitleName) {
        const text = heroTitleName.textContent;
        heroTitleName.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitleName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 800);
    }
});

// --- PROJECT FILTERS LOGICA ---
const filterBtns = document.querySelectorAll('.filter-btn');
const yearFilter = document.getElementById('yearFilter');
const cards = document.querySelectorAll('.project-card');

function applyFilters() {
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    const activeYear = yearFilter.value;

    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardYear = card.dataset.year;

        const categoryMatch = (activeCategory === 'all' || cardCategory === activeCategory);
        const yearMatch = (activeYear === 'all' || cardYear === activeYear);

        if (categoryMatch && yearMatch) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
    });
});

if (yearFilter) {
    yearFilter.addEventListener('change', applyFilters);
}

    const favicon = document.getElementById('favicon');
    let angle = 0;
    let direction = 1;
    let waveCount = 0;
    const maxWaves = 6; // Hoeveel keer hij heen en weer gaat (3 volledige zwaaien)

    function animateFavicon() {
    // Verander de hoek (angle) voor een vloeiend effect
    angle += (2 * direction);

    // Maak de SVG met de huidige hoek
    const svg = `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 transform=%22rotate(${angle} 50 80)%22>👋</text></svg>`;
    favicon.href = `data:image/svg+xml,${svg}`;

    // Keer de richting om bij de uiterste punten
    if (angle >= 15 || angle <= -15) {
    direction *= -1;
    waveCount++;
}

    // Stop na een aantal zwaaien en wacht even
    if (waveCount >= maxWaves) {
    waveCount = 0;
    angle = 0; // Terug naar het midden
    // Zet het handje recht
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>`;

    setTimeout(startWaving, 4000); // Wacht 4 seconden voor de volgende zwaai
} else {
    requestAnimationFrame(animateFavicon);
}
}

    function startWaving() {
    requestAnimationFrame(animateFavicon);
}

    // Start de eerste keer
    startWaving();

// --- 5. CONTACT FORMULIER MET CONFETTI ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // We voorkomen even het herladen van de pagina om de confetti te zien
        // In een echte situatie stuur je hier je data naar een backend
        e.preventDefault();

        // Confetti afschieten!
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2563eb', '#06b6d4', '#ffffff'] // Blauw en cyaan uit jouw palet
        });

        // Toon een simpel bedankje (je kunt dit later vervangen door een mooie modal)
        setTimeout(() => {
            alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op. 👋');
            contactForm.reset(); // Maak het formulier weer leeg
        }, 500);
    });
}