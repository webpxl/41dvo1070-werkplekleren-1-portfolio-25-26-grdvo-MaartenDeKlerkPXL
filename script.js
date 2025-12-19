// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Toggle icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                const bar = entry.target.querySelector('.skill-bar');
                if (bar) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 100);
                }
            }

            // Fade in elements
            if (entry.target.classList.contains('fade-in-on-scroll')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add visible class to trigger animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
    animateOnScroll.observe(el);
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Haal de waarden uit het formulier
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Formatteer de mail inhoud
    const subject = encodeURIComponent(`Portfolio Contact: Bericht van ${name}`);
    const body = encodeURIComponent(`Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`);

    // Open de mail client van de gebruiker
    window.location.href = `mailto:maarten.deklerk@student.pxl.be?subject=${subject}&body=${body}`;

    // Optionele succesmelding
    contactForm.reset();
});


// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Animate numbers in stat cards
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observe stat cards for number animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const targetValue = parseInt(statNumber.textContent);
                statNumber.textContent = '0+';
                animateValue(statNumber, 0, targetValue, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add typing effect to hero title (optional)
const heroTitleName = document.querySelector('.hero-title-name');
if (heroTitleName) {
    const text = heroTitleName.textContent;
    heroTitleName.textContent = '';
    let i = 0;

    setTimeout(() => {
        const typeWriter = () => {
            if (i < text.length) {
                heroTitleName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }, 800);
}

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add cursor effect (optional)
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #a855f7; font-weight: bold;');
console.log('%cInterested in the code? Let\'s connect!', 'font-size: 14px; color: #ec4899;');
console.log('%cEmail: maarten.deklerk@student.pxl.be', 'font-size: 12px; color: #6b7280;');


// Filter Functionaliteit
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const yearFilter = document.getElementById('yearFilter');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects() {
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        const activeYear = yearFilter ? yearFilter.value : 'all';

        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardYear = card.dataset.year;

            const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
            const yearMatch = activeYear === 'all' || cardYear === activeYear;

            if (categoryMatch && yearMatch) {
                card.classList.remove('hidden');
                // Optioneel: voeg een fade-in animatie toe
                card.style.opacity = "0";
                setTimeout(() => { card.style.opacity = "1"; }, 10);
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Luister naar categorie knoppen
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });

    // Luister naar jaar dropdown
    if (yearFilter) {
        yearFilter.addEventListener('change', filterProjects);
    }
});