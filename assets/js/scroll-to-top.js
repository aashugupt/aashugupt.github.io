// Scroll to Top Button Functionality
(function() {
    'use strict';

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        const scrollButton = document.getElementById('scrollToTopBtn');

        if (!scrollButton) {
            console.warn('⚠️ Scroll to top button not found');
            return;
        }

        // Show/hide button based on scroll position
        function toggleButtonVisibility() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > 300) {
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        }

        // Scroll to top with smooth animation
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners
        window.addEventListener('scroll', toggleButtonVisibility);
        scrollButton.addEventListener('click', scrollToTop);

        // Initial check on page load
        toggleButtonVisibility();

        console.log('✅ Scroll to top button initialized');
    });
})();
