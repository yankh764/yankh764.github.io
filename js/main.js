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
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('has-animated')) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                        entry.target.classList.add('has-animated');

                        if (entry.target.id === 'skills' && !entry.target.dataset.animated) {
                            animateSkillBars();
                            entry.target.dataset.animated = "true";
                        }
                    }, 50);
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

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const darkIcon = document.getElementById('darkIcon');
    const lightIcon = document.getElementById('lightIcon');

    if (!themeToggle || !darkIcon || !lightIcon) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        } else {
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    updateCopyrightYear();
    setupScrollToTop();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupTypewriterEffect();
    setupThemeToggle();
});
