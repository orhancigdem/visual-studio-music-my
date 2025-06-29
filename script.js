document.addEventListener('DOMContentLoaded', () => {
    // Interactive wave animation
    const waves = document.querySelectorAll('.wave');
    let isHovered = false;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const windowWidth = window.innerWidth;
        const position = (mouseX / windowWidth);

        waves.forEach((wave, index) => {
            const delay = index * 0.1;
            const scale = Math.sin((position * Math.PI) + delay) * 0.5 + 1;
            wave.style.transform = `scaleY(${scale})`;
            wave.style.backgroundColor = `hsl(${position * 360}, 100%, 50%)`;
        });
    });

    // Glitch effect intensity on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / maxScroll;

        const glitchText = document.querySelector('.glitch');
        const intensity = Math.min(scrollPercentage * 2, 1);
        
        glitchText.style.textShadow = `
            ${0.05 + intensity * 0.1}em 0 0 var(--accent-color),
            ${-0.05 - intensity * 0.1}em ${-0.025 - intensity * 0.05}em 0 var(--secondary-accent)
        `;
    });

    // Smooth section reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.description, .video-wrapper');
    sections.forEach(section => {
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Interactive floating nav
    const nav = document.querySelector('.floating-nav');
    
    nav.addEventListener('mousemove', (e) => {
        const rect = nav.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        nav.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height/2) / 10}deg)
            rotateY(${-(x - rect.width/2) / 10}deg)
        `;
    });

    nav.addEventListener('mouseleave', () => {
        nav.style.transform = 'none';
    });
});