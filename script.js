/**
 * Maarten de Klerk - Portfolio Script 2025
 * Dit bestand bevat alle logica voor navigatie, animaties, filters en contact.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. MOBIEL MENU ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Sluit menu bij klik op link
        const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // --- 3. SMOOTH SCROLL VOOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 4. PROJECT FILTERS (VOOR PROJECTS.HTML) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const yearFilter = document.getElementById('yearFilter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 || yearFilter) {
        const filterProjects = () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';
            const activeYear = yearFilter ? yearFilter.value : 'all';

            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const cardYear = card.dataset.year;

                const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
                const yearMatch = activeYear === 'all' || cardYear === activeYear;

                if (categoryMatch && yearMatch) {
                    card.classList.remove('hidden');
                    card.style.display = "flex";
                    setTimeout(() => { card.style.opacity = "1"; }, 10);
                } else {
                    card.classList.add('hidden');
                    card.style.display = "none";
                    card.style.opacity = "0";
                }
            });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProjects();
            });
        });

        if (yearFilter) {
            yearFilter.addEventListener('change', filterProjects);
        }
    }

    // --- 5. CONTACT FORMULIER (MAILTO) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Portfolio Bericht van ${name}`);
            const body = encodeURIComponent(`Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`);

            window.location.href = `mailto:maarten.deklerk@student.pxl.be?subject=${subject}&body=${body}`;

            alert('Je mail-applicatie wordt nu geopend om het bericht te verzenden.');
            contactForm.reset();
        });
    }

    // --- 6. ANIMATIES BIJ SCROLLEN ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Stat nummer animatie
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    animateValue(statNumber);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .skill-card, .project-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    function animateValue(obj) {
        obj.classList.add('animated');
        const end = parseInt(obj.textContent);
        let start = 0;
        const duration = 2000;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.floor(progress * end) + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- 7. TYPING EFFECT HERO ---
    const heroTitleName = document.querySelector('.hero-title-name');
    if (heroTitleName) {
        const text = heroTitleName.textContent;
        heroTitleName.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitleName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 800);
    }

    // --- 8. ACTIVE LINK HIGHLIGHTER ---
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

});

console.log('%c👋 Developer: Maarten de Klerk | maarten.deklerk@student.pxl.be', 'color: #3b82f6; font-weight: bold;');