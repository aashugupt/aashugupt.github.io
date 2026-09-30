// Dropdown toggling for touch devices.
//
// Gated on (hover: none) rather than a width: a landscape phone can report a
// width well above any mobile breakpoint yet still have no hover, and a
// hover-opened menu there can never be tapped shut. Pointing devices are
// excluded, so they keep the pure CSS :hover behaviour untouched.
if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const link = dropdown.querySelector(':scope > a');
        if (!link) return;

        link.addEventListener('click', (e) => {
            // only intercept parents that point at a fragment; real page links
            // should still navigate
            if ((link.getAttribute('href') || '').indexOf('#') === -1) return;
            e.preventDefault();
            // without this, tapping a nested parent also toggles its ancestor
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

