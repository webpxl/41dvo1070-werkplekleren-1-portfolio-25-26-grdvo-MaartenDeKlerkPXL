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

// 4.3 final 1.0 commit