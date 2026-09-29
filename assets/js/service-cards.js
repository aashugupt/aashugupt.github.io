// Service Cards Functionality
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const centralLogo = document.querySelector('.central-logo');
        const serviceCards = document.querySelector('.services-quick-access');
        const aartiModal = document.getElementById('aartiModal');
        const aartiCard = document.getElementById('aartiCard');
        const closeModal = document.querySelector('.modal-close');

        // Show/Hide service cards on logo hover
        if (centralLogo && serviceCards) {
            let hideTimeout;

            // Show cards when hovering logo
            centralLogo.addEventListener('mouseenter', function() {
                clearTimeout(hideTimeout);
                serviceCards.style.opacity = '1';
                serviceCards.style.visibility = 'visible';
                serviceCards.style.transform = 'translateY(0)';
                serviceCards.style.pointerEvents = 'all';
                console.log('✅ Service cards shown');
            });

            // Keep cards visible when hovering them
            serviceCards.addEventListener('mouseenter', function() {
                clearTimeout(hideTimeout);
            });

            // Hide cards when leaving logo
            centralLogo.addEventListener('mouseleave', function() {
                hideTimeout = setTimeout(function() {
                    serviceCards.style.opacity = '0';
                    serviceCards.style.visibility = 'hidden';
                    serviceCards.style.transform = 'translateY(-20px)';
                    serviceCards.style.pointerEvents = 'none';
                }, 300);
            });

            // Hide cards when leaving the cards area
            serviceCards.addEventListener('mouseleave', function() {
                hideTimeout = setTimeout(function() {
                    serviceCards.style.opacity = '0';
                    serviceCards.style.visibility = 'hidden';
                    serviceCards.style.transform = 'translateY(-20px)';
                    serviceCards.style.pointerEvents = 'none';
                }, 300);
            });
        }

        // Hover to expand, Click to lock expansion
        if (aartiCard) {
            // Click to lock/unlock expansion
            aartiCard.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Toggle locked state
                aartiCard.classList.toggle('locked-expanded');
            });

            // Close locked state when clicking outside
            document.addEventListener('click', function(e) {
                if (!aartiCard.contains(e.target) && aartiCard.classList.contains('locked-expanded')) {
                    aartiCard.classList.remove('locked-expanded');
                }
            });
        }

        console.log('✅ Service cards initialized');
    });
})();
