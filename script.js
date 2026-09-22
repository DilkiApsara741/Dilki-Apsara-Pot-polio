/* ==========================================================================
   DILKI APSARA - PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       01. THEME TOGGLE (DARK / LIGHT MODE)
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        htmlElement.setAttribute('data-theme', 'light');
    }

    // Toggle theme handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }


    /* ----------------------------------------------------------------------
       02. MOBILE MENU DRAWER TOGGLE
       ---------------------------------------------------------------------- */
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggleBtn.classList.toggle('active');
        });

        // Close mobile menu when nav link clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggleBtn.classList.remove('active');
            });
        });
    }


    /* ----------------------------------------------------------------------
       03. NAVBAR SCROLL SHADOW & ACTIVE LINK SPY
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active Section Scroll Spy
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();


    /* ----------------------------------------------------------------------
       04. HERO SECTION TYPING ANIMATION
       ---------------------------------------------------------------------- */
    const typingTextElement = document.getElementById('typing-text');
    const roles = [
        "AI Development",
        "E-Commerce Website Development",
        "UI/UX Development",
        "Frontend Development",
        "Backend Development",
        "Full-Stack Web Development"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 2200;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentDelay = 500;
        }

        setTimeout(typeEffect, currentDelay);
    }

    typeEffect();


    /* ----------------------------------------------------------------------
       05. PROJECT CATEGORY FILTERING
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* ----------------------------------------------------------------------
       06. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ----------------------------------------------------------------------
       07. COPY CODE BUTTON IN DEVELOPER WINDOW
       ---------------------------------------------------------------------- */
    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeContent = `const developer = {
  name: "Dilki Apsara",
  role: "Full-Stack Web Developer",
  passion: "Web Development",
  status: "Always Learning 🚀",
  skills: ["HTML", "CSS", "JS", "PHP", "MySQL"]
};`;
            navigator.clipboard.writeText(codeContent).then(() => {
                showToast('Code copied to clipboard! 📋');
                copyCodeBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i>';
                setTimeout(() => {
                    copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
            });
        });
    }


    /* ----------------------------------------------------------------------
       08. CONTACT FORM SUBMISSION HANDLER
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('user-name');
            const emailInput = document.getElementById('user-email');
            
            if (nameInput.value.trim() && emailInput.value.trim()) {
                showToast(`Thank you, ${nameInput.value.trim()}! Message sent successfully 🚀`);
                contactForm.reset();
            }
        });
    }


    /* ----------------------------------------------------------------------
       09. TOAST NOTIFICATION UTILITY
       ---------------------------------------------------------------------- */
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMsg) return;

        toastMsg.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }


    /* ----------------------------------------------------------------------
       10. PROJECT DETAILS & DEMO MODAL HANDLER
       ---------------------------------------------------------------------- */
    const demoModal = document.getElementById('demo-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body-content');
    const demoBtns = document.querySelectorAll('.demo-modal-btn');

    // Structured Project Information Dictionary
    const projectData = {
        indoplant: {
            title: "INDOPLANT",
            category: "Plant & Flower E-Commerce Website",
            image: "Screenshot 2026-09-19 110143.png",
            fallbackImage: "images/indoplant.jpg",
            description: "A complete responsive e-commerce web application featuring product search, category filtering, dynamic add-to-cart functionality and price calculations.",
            features: [
                "Product Search & Real-time Filter",
                "Dynamic Add-to-Cart",
                "Price Calculation",
                "Plant Care Tips",
                "Category Badges",
                "Responsive Layout"
            ],
            tech: ["HTML5", "CSS3", "JavaScript"]
        },
        flowerShop: {
            title: "Online Flower Shop",
            category: "Online Flower Shop",
            image: "Screenshot 2026-07-25 215020.png",
            fallbackImage: "images/flower-shop.jpg",
            description: "A modern and responsive online flower shop website designed to showcase a variety of flowers and plants with an interactive and user-friendly shopping experience.",
            features: [
                "Product Browsing",
                "Search & Filtering",
                "Product Details",
                "Add to Cart",
                "Responsive Design"
            ],
            tech: ["HTML5", "CSS3", "JavaScript"]
        },
        sweetShop: {
            title: "Sweet Shop",
            category: "Sweet Shop Website",
            image: "Screenshot 2026-09-19 195735.png",
            fallbackImage: "images/sweet-shop.jpg",
            description: "A modern and responsive sweet shop website designed to showcase a variety of delicious sweets and desserts with a clean and attractive user interface.",
            features: [
                "Product Browsing",
                "Category Filtering",
                "Product Details",
                "Interactive Shopping Experience",
                "Responsive Design"
            ],
            tech: ["HTML5", "CSS3", "JavaScript"]
        }
    };

    demoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectData[projectKey];

            if (data && modalBody && demoModal) {
                modalBody.innerHTML = `
                    <div style="text-align: left;">
                        <div class="modal-project-img-wrapper">
                            <img src="${data.image}" alt="${data.title}" class="modal-project-img" onerror="this.src='${data.fallbackImage}'">
                        </div>
                        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-main); font-weight: 600;">${data.category.toUpperCase()}</span>
                        <h2 style="font-size: 1.8rem; margin: 0.3rem 0 0.8rem 0;">${data.title}</h2>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.description}</p>
                        
                        <h4 style="font-size: 1rem; margin-bottom: 0.6rem;">Key Features:</h4>
                        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                            ${data.features.map(f => `<li style="margin-bottom: 0.3rem;">${f}</li>`).join('')}
                        </ul>

                        <h4 style="font-size: 1rem; margin-bottom: 0.6rem;">Technologies Used:</h4>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
                            ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>

                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <a href="https://github.com/DilkiApsara741" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                                <i class="fa-brands fa-github"></i> View GitHub Repository
                            </a>
                            <button onclick="document.getElementById('demo-modal').classList.remove('active')" class="btn btn-outline btn-sm">
                                Close Details
                            </button>
                        </div>
                    </div>
                `;
                demoModal.classList.add('active');
            }
        });
    });

    if (modalCloseBtn && demoModal) {
        modalCloseBtn.addEventListener('click', () => {
            demoModal.classList.remove('active');
        });
    }


    /* ----------------------------------------------------------------------
       11. CERTIFICATES MODAL HANDLER
       ---------------------------------------------------------------------- */
    const certModal = document.getElementById('cert-modal');
    const certModalCloseBtn = document.getElementById('cert-modal-close-btn');
    const certModalBody = document.getElementById('cert-modal-body-content');
    const certBtns = document.querySelectorAll('.cert-modal-btn');

    const certificateData = {
        cert1: {
            title: "[Certificate Name 01]",
            org: "[Organization / University]",
            year: "[Year]",
            image: "images/certificates/certificate1.jpg",
            desc: "Specialized certification demonstrating technical mastery in web technologies, frontend interfaces, or computer science concepts."
        },
        cert2: {
            title: "[Certificate Name 02]",
            org: "[Organization / University]",
            year: "[Year]",
            image: "images/certificates/certificate2.jpg",
            desc: "Professional achievement certificate validating web development skills, problem solving, or full-stack software development."
        },
        cert3: {
            title: "[Certificate Name 03]",
            org: "[Organization / University]",
            year: "[Year]",
            image: "images/certificates/certificate3.jpg",
            desc: "Technical training accomplishment certifying backend logic, relational database management, or IT fundamentals."
        }
    };

    certBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certKey = btn.getAttribute('data-cert');
            const data = certificateData[certKey];

            if (data && certModalBody && certModal) {
                certModalBody.innerHTML = `
                    <div style="text-align: center;">
                        <span class="cert-badge" style="margin-bottom: 0.8rem; display: inline-block;">${data.year}</span>
                        <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem;">${data.title}</h2>
                        <p style="color: var(--cyan-main); font-weight: 600; margin-bottom: 1.5rem;">${data.org}</p>
                        
                        <div class="modal-project-img-wrapper" style="height: 220px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2);">
                            <img src="${data.image}" alt="${data.title}" class="modal-project-img" onerror="this.parentElement.innerHTML='<div class=\\'cert-placeholder\\'><i class=\\'fa-solid fa-award\\'></i><span>Certificate Document Placeholder</span></div>'">
                        </div>

                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.desc}</p>
                        
                        <button onclick="document.getElementById('cert-modal').classList.remove('active')" class="btn btn-primary btn-sm">
                            Close Preview
                        </button>
                    </div>
                `;
                certModal.classList.add('active');
            }
        });
    });

    if (certModalCloseBtn && certModal) {
        certModalCloseBtn.addEventListener('click', () => {
            certModal.classList.remove('active');
        });
    }


    /* ----------------------------------------------------------------------
       12. CV MODAL HANDLER
       ---------------------------------------------------------------------- */
    const cvBtn = document.getElementById('cv-btn');
    const cvModal = document.getElementById('cv-modal');
    const cvModalCloseBtn = document.getElementById('cv-modal-close-btn');
    const closeCvModalBtn = document.getElementById('close-cv-modal-btn');
    const downloadCvAction = document.getElementById('download-cv-action');

    if (cvBtn && cvModal) {
        cvBtn.addEventListener('click', () => {
            cvModal.classList.add('active');
        });
    }

    [cvModalCloseBtn, closeCvModalBtn].forEach(btn => {
        if (btn && cvModal) {
            btn.addEventListener('click', () => {
                cvModal.classList.remove('active');
            });
        }
    });

    if (downloadCvAction) {
        downloadCvAction.addEventListener('click', () => {
            showToast('Downloading Dilki Apsara CV... 📄');
            setTimeout(() => {
                if (cvModal) cvModal.classList.remove('active');
            }, 1000);
        });
    }

    // Backdrop click close for all modals
    window.addEventListener('click', (e) => {
        if (e.target === demoModal) demoModal.classList.remove('active');
        if (e.target === certModal) certModal.classList.remove('active');
        if (e.target === cvModal) cvModal.classList.remove('active');
    });


    /* ----------------------------------------------------------------------
       13. BACK TO TOP BUTTON
       ---------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
