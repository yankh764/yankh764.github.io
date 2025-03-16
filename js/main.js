function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active');

            const spans = menuButton.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = menuButton.classList.contains('active')
                    ? 'rotate(45deg) translate(5px, 5px)'
                    : '';
                spans[1].style.opacity = menuButton.classList.contains('active')
                    ? '0'
                    : '1';
                spans[2].style.transform = menuButton.classList.contains('active')
                    ? 'rotate(-45deg) translate(7px, -6px)'
                    : '';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuButton.classList.remove('active');

                // Reset hamburger icon state
                const spans = menuButton.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = '';
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 &&
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target) &&
                navLinks.classList.contains('active')) {

                navLinks.classList.remove('active');
                menuButton.classList.remove('active');

                const spans = menuButton.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = '';
                }
            }
        });
    }
}

function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        if (bar.dataset.animated === "true") return;

        bar.dataset.targetWidth = getComputedStyle(bar).width || bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.width = bar.dataset.targetWidth;
            bar.dataset.animated = "true";
        }, 1000);
    });
}

function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    };

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('has-animated')) {
                    entry.target.classList.add('fade-in');
                    entry.target.classList.add('has-animated');

                    if (entry.target.id === 'skills' && !entry.target.dataset.animated) {
                        animateSkillBars();
                        entry.target.dataset.animated = "true";
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function setupTypewriterEffect() {
    const headerElement = document.querySelector('.typewriter h1');
    if (!headerElement) return;

    headerElement.style.overflow = 'hidden';
    headerElement.style.borderRight = '3px solid var(--secondary)';
    headerElement.style.whiteSpace = 'nowrap';
    headerElement.style.margin = '0 auto';
    headerElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
}

function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    updateCopyrightYear();
    setupScrollToTop();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupTypewriterEffect();
    setupMobileMenu();
});
