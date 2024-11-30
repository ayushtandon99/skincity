document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');

    const logo = document.querySelector('.logo img');

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    
    // const galleryItems = document.querySelectorAll('.gallery-item');
    // const lightbox = document.querySelector('.lightbox');
    // const lightboxImg = lightbox.querySelector('img');
    // const lightboxClose = lightbox.querySelector('.lightbox-close');
    // const lightboxDescription = lightbox.querySelector('.lightbox-description');

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Mobile menu functionality
    // mobileMenuBtn.addEventListener('click', () => {
    //     mobileMenu.classList.add('active');
    // });

    // closeMenuBtn.addEventListener('click', () => {
    //     mobileMenu.classList.remove('active');
    // });

    // Mobile menu functionality
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

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
                logo.style.maxHeight = '50px'; // Adjust this value as needed
            }
        } else {
            header.classList.remove('scrolled');
            if (logo) {
                logo.style.maxHeight = '90px'; // Adjust this value as needed
            }
        }
    });

    // Lightbox Functionality
    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Find the original image within the gallery item
                const originalImg = item.querySelector('img');
                
                // Set the lightbox image source to the clicked image
                lightboxImg.src = originalImg.src;

                // Show lightbox
                lightbox.style.display = 'flex';
            });
        });

        // Close lightbox when close button is clicked
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
     



    // galleryItems.forEach(item => {
    //     item.addEventListener('click', () => {
    //         const beforeImg = item.dataset.before;
    //         const afterImg = item.dataset.after;
    //         const title = item.querySelector('h3').textContent;
    //         const description = item.querySelector('p').textContent;

    //         // Create a before/after comparison image
    //         lightboxImg.src = beforeImg;
    //         lightboxDescription.textContent = `${title} - ${description}`;
    //         lightbox.style.display = 'flex';

    //         // Optional: Add image swapping on click
    //         lightboxImg.addEventListener('click', function() {
    //             this.src = this.src === beforeImg ? afterImg : beforeImg;
    //         });
    //     });
    // });

    // lightboxClose.addEventListener('click', () => {
    //     lightbox.style.display = 'none';
    // });

    // // Close lightbox when clicking outside the image
    // lightbox.addEventListener('click', (e) => {
    //     if (e.target === lightbox) {
    //         lightbox.style.display = 'none';
    //     }
    // });
});
