        // Initialize AOS
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
            
            // Mobile Menu Toggle
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Navbar Scroll
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Animate Skill Bars
            const skillBars = document.querySelectorAll('.skill-bar-fill');
            
            const animateSkillBars = function() {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            };
            
            // Back to top button
            const backToTopButton = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            });
            
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Typing Animation
            const typingTextElement = document.querySelector('.typing-text');
            const textArray = ['Web Developer', 'Graphic Designer', 'FiveM Lua Developer', 'Video Editor'];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingDelay = 100;
            
            function type() {
                const currentText = textArray[textIndex];
                
                if (isDeleting) {
                    typingTextElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingDelay = 50;
                } else {
                    typingTextElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingDelay = 150;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingDelay = 1500;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textArray.length;
                    typingDelay = 500;
                }
                
                setTimeout(type, typingDelay);
            }
            
            setTimeout(type, 1000);
            
            // Create Particles
            const particlesContainer = document.getElementById('particles-container');
            
            function createParticles() {
                const numberOfParticles = 50;
                
                for (let i = 0; i < numberOfParticles; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    // Random size between 2-6px
                    const size = Math.random() * 4 + 2;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // Random position
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    
                    // Random opacity
                    particle.style.opacity = Math.random() * 0.5 + 0.1;
                    
                    // Animation
                    const duration = Math.random() * 20 + 10;
                    const delay = Math.random() * 5;
                    
                    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
                    
                    particlesContainer.appendChild(particle);
                }
            }
            
            createParticles();
            
            // Animate on scroll triggers
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === 'skills') {
                            animateSkillBars();
                        }
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                observer.observe(section);
            });
            
            // Smooth Scrolling for Anchor Links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (!mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                        }
                    }
                });
            });
            
            // Active Navigation Link based on Scroll
            function setActiveNavLink() {
                const navLinks = document.querySelectorAll('.nav-link');
                const scrollPosition = window.scrollY;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }
            
            window.addEventListener('scroll', setActiveNavLink);
            
            // Initialize active state
            setActiveNavLink();
        });