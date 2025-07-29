       // Initialize AOS
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 800,
                once: true,
                mirror: false
            });
            
            // Create particles
            createParticles();
            // Initialize Forex Chart
            initForexChart();
            
            // Initialize typed text
            initTypedText();
            
            // Setup scroll progress
            setupScrollProgress();
            
            // Setup mobile menu
            setupMobileMenu();
            
            // Setup theme toggle
            setupThemeToggle();
            
            // Setup form validation
            setupFormValidation();
            
            // Setup navigation scroll behavior
            setupNavigation();
        });
        
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 5-20px
                const size = Math.random() * 15 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;
                
                // Random animation duration
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Random delay
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        function initForexChart() {
            const ctx = document.getElementById('forexChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        datasets: [{
                            label: 'Market Performance',
                            data: [10, 15, 13, 18, 16, 22, 28, 25, 32],
                            borderColor: 'rgba(76, 201, 240, 1)',
                            backgroundColor: 'rgba(76, 201, 240, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Our Strategy',
                            data: [12, 19, 18, 22, 25, 27, 30, 35, 40],
                            borderColor: 'rgba(58, 12, 163, 1)',
                            backgroundColor: 'rgba(58, 12, 163, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
        
        function initTypedText() {
            const texts = ["Innovative Tech Solutions", "Web Development Excellence", "Forex Trading Expertise", "Creative Design Solutions"];
            let index = 0;
            const typedElement = document.getElementById('typed-text');
            
            if (typedElement) {
                setInterval(() => {
                    gsap.to(typedElement, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            typedElement.textContent = texts[index];
                            gsap.to(typedElement, {
                                opacity: 1,
                                duration: 0.5
                            });
                            index = (index + 1) % texts.length;
                        }
                    });
                }, 3000);
            }
        }
        function setupScrollProgress() {
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.getElementById("progress-bar").style.width = scrolled + "%";
                
                // Add scrolled class to navbar
                const navbar = document.querySelector('.navbar');
                if (winScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
        
        function setupMobileMenu() {
            const menuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.navbar-menu');
            
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
        
        function setupThemeToggle() {
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = themeToggle.querySelector('i');
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('theme-dark');
                
                if (document.body.classList.contains('theme-dark')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('theme-dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
        
        function setupFormValidation() {
            const contactForm = document.getElementById('contact-form');
            
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    // Basic validation
                    const name = document.getElementById('name');
                    const email = document.getElementById('email');
                    const message = document.getElementById('message');
                    let isValid = true;
                    
                    if (!name.value.trim()) {
                        highlightField(name);
                        isValid = false;
                    } else {
                        resetField(name);
                    }
                    
                    if (!email.value.trim() || !validateEmail(email.value)) {
                        highlightField(email);
                        isValid = false;
                    } else {
                        resetField(email);
                    }
                    
                    if (!message.value.trim()) {
                        highlightField(message);
                        isValid = false;
                    } else {
                        resetField(message);
                    }
                    
                    if (isValid) {
                        // Simulate form submission
                        const submitBtn = contactForm.querySelector('button[type="submit"]');
                        const originalText = submitBtn.innerHTML;
                        submitBtn.innerHTML = 'Sending...';
                        submitBtn.disabled = true;
                        
                        setTimeout(() => {
                            contactForm.reset();
                            submitBtn.innerHTML = 'Message Sent!';
                            
                            setTimeout(() => {
                                submitBtn.innerHTML = originalText;
                                submitBtn.disabled = false;
                            }, 3000);
                        }, 1500);
                    }
                });
            }
        }
        
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        function highlightField(field) {
            field.style.borderColor = '#f72585';
            field.style.boxShadow = '0 0 0 3px rgba(247, 37, 133, 0.1)';
        }
        
        function resetField(field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
        
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
        }
 