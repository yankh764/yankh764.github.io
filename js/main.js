function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        bar.dataset.targetWidth = getComputedStyle(bar).width || bar.style.width;
        bar.style.width = '0';

        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = bar.dataset.targetWidth;
            }, 100);
        });
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
                // Add fade-in animation to visible sections
                entry.target.classList.add('fade-in');

                // Special handling for skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections for animation
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

function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    updateCopyrightYear();
    setupScrollToTop();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupTypewriterEffect();

    setTimeout(() => {
        if (isElementInViewport(document.getElementById('skills'))) {
            animateSkillBars();
        }
    }, 500);
});
