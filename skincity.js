document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    const logo = document.querySelector('.logo img');

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');

    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;

    const slidesGallery = document.querySelectorAll('.gallery-carousel-slide');
    const prevButtonGallery = document.querySelector('.gallery-prev');
    const nextButtonGallery = document.querySelector('.gallery-next');
    let currentSlideGallery = 0;


    //Gallery
    function showSlideGallery(index) {
        // Remove active class from all slides
        slidesGallery.forEach(slide => slide.classList.remove('active'));

        // Handle wrapping around when reaching end or beginning
        if (index >= slidesGallery.length) {
            currentSlideGallery = 0;
        } else if (index < 0) {
            currentSlideGallery = slidesGallery.length - 1;
        } else {
            currentSlideGallery = index;
        }

        // Add active class to current slide
        slidesGallery[currentSlideGallery].classList.add('active');
    }

    // Initial slide setup
    showSlideGallery(currentSlideGallery);

    // Next slide functionality
    nextButtonGallery.addEventListener('click', () => {
        showSlideGallery(currentSlideGallery + 1);
    });

    // Previous slide functionality
    prevButtonGallery.addEventListener('click', () => {
        showSlideGallery(currentSlideGallery - 1);
    });

    // Optional: Auto-advance slides every 5 seconds
    setInterval(() => {
        showSlideGallery(currentSlideGallery + 1);
    }, 5000);



    // carousel function
    function showSlide(index) {
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Remove 'active' class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add 'active' class to current slide
        slides[currentSlide].classList.add('active');
        
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Show the first slide initially
    showSlide(0);

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 7000);



    // Touch events for swipe functionality
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            isSwiping = false;
        }
    });

    carousel.addEventListener('touchend', () => {
        isSwiping = false;
    });



    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });



    // Header scroll effect
    window.addEventListener('scroll', () => {
    
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logo) {
                logo.style.maxHeight = '80px'; // Adjust this value as needed
            }
        } else {
            header.classList.remove('scrolled');
            if (logo) {
                logo.style.maxHeight = '90px'; // Adjust this value as needed
            }
        }
    });



    // Smooth scrolling function
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Apply smooth scrolling to hero carousel buttons
    const carouselButtons = document.querySelectorAll('.hero-carousel .btn');
    carouselButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('href');
            smoothScroll(target, 1000); // 1000ms duration for the scroll animation
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScroll(targetId, 1000); // 1000ms duration for the scroll animation
        });
    });

    // Check if we're on the services page
    if (window.location.pathname.includes('services.html')) {
        // Scroll to the correct service if coming from another page
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerOffset = 100; // Adjust based on your header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }

    // Tab functionality for services
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Intersection Observer for fade-in effect
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

});