// Dropdown toggling for touch devices.
//
// Gated on (hover: none) rather than a width: a landscape phone can report a
// width well above any mobile breakpoint yet still have no hover, and a
// hover-opened menu there can never be tapped shut. Pointing devices are
// excluded, so they keep the pure CSS :hover behaviour untouched.
// Delegated from document rather than bound to each .dropdown: this file runs
// at parse time, while internal pages have their nav injected later by
// shared-navigation.js on DOMContentLoaded. Binding directly matched nothing
// there, so those dropdowns could not be opened at all.
if (window.matchMedia('(hover: none)').matches) {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.dropdown > a');
        if (!link) return;

        // only intercept parents that point at a fragment; real page links
        // should still navigate
        if ((link.getAttribute('href') || '').indexOf('#') === -1) return;

        e.preventDefault();
        // toggling just this link's own parent leaves any ancestor open
        link.parentElement.classList.toggle('active');
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

