// ===== script.js =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. LOADING SCREEN ==========
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progress-fill');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 5;
        if (progressFill) progressFill.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
            }, 500);
        }
    }, 50);

    // ========== 2. TYPING ANIMATION ==========
    const typedElement = document.getElementById('typed-element');
    const words = ['Web Developer', 'IT Student', 'Network Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        if (!typedElement) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 200);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    typeEffect();

    // ========== 3. DARK / LIGHT MODE TOGGLE ==========
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // ========== 4. TAB NAVIGASI - PAKSA DENGAN INLINE STYLE ==========
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.section');
    
    console.log('Jumlah section:', sections.length);
    
    // Fungsi untuk menampilkan section tertentu dengan INLINE STYLE
    function showSection(sectionId) {
        console.log('Menampilkan:', sectionId);
        
        // SEMBUNYIKAN SEMUA SECTION DENGAN INLINE STYLE
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-section');
        });
        
        // TAMPILKAN SECTION YANG DIPILIH
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            // Jika home, pakai flex, sisanya block
            if (sectionId === 'home') {
                activeSection.style.display = 'flex';
            } else {
                activeSection.style.display = 'block';
            }
            activeSection.classList.add('active-section');
        } else {
            console.log('Section tidak ditemukan:', sectionId);
        }
        
        // Update active class di navbar
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Simpan ke localStorage
        localStorage.setItem('activeSection', sectionId);
        
        // Scroll ke atas
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Tambahkan event listener ke setiap menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Tutup hamburger menu
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Untuk tombol di hero section
    const heroButtons = document.querySelectorAll('[data-section]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Cek localStorage
    const lastSection = localStorage.getItem('activeSection');
    if (lastSection && document.getElementById(lastSection)) {
        showSection(lastSection);
    } else {
        showSection('home');
    }

    // ========== 5. HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
        });
    }

    // ========== 6. SCROLL REVEAL ==========
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // ========== 7. SKILLS PROGRESS BAR ==========
    function animateProgressBars() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(skillsSection);
    }

    // ========== 8. PARTICLE BACKGROUND ==========
    const canvas = document.getElementById('particle-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function initParticles() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(0, 243, 255, ${Math.random() * 0.5})`
                });
            }
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0 || p.x > width) p.speedX *= -1;
                if (p.y < 0 || p.y > height) p.speedY *= -1;
            });
            
            requestAnimationFrame(drawParticles);
        }
        
        window.addEventListener('resize', initParticles);
        initParticles();
        drawParticles();
    }

    // ========== 9. CARD 3D TILT EFFECT ==========
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    });

    // ========== 10. CERTIFICATE MODAL ==========
    const certImages = document.querySelectorAll('.cert-img');
    const certModal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    
    certImages.forEach(img => {
        img.addEventListener('click', () => {
            if (certModal && modalImg) {
                certModal.style.display = 'block';
                modalImg.src = img.src;
            }
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (certModal) certModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.style.display = 'none';
        }
    });

    // ========== 11. CUSTOM CURSOR ==========
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // ========== 12. DOWNLOAD CV ==========
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('CV akan diunduh (simulasi)');
        });
    }

    // ========== 13. GAME IFRAME LOAD HANDLER ==========
    const gameIframe = document.getElementById('game-iframe');
    
    if (gameIframe) {
        gameIframe.addEventListener('load', function() {
            console.log('Game QuickMath! siap dimainkan!');
        });
    }
    
});
