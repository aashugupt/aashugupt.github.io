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
    // Closes every open dropdown except the branch `keep` sits on, so opening
    // a nested submenu does not collapse the parent it lives in.
    const closeDropdowns = (keep) => {
        document.querySelectorAll('.dropdown.active').forEach((open) => {
            if (keep && open.contains(keep)) return;
            open.classList.remove('active');
        });
    };

    document.addEventListener('click', (e) => {
        const link = e.target.closest('.dropdown > a');

        if (!link) {
            // A tap outside the menus dismisses them. Taps on a leaf link
            // inside one are left alone -- that navigates away regardless.
            if (!e.target.closest('.dropdown')) closeDropdowns(null);
            return;
        }

        // only intercept parents that point at a fragment; real page links
        // should still navigate
        if ((link.getAttribute('href') || '').indexOf('#') === -1) {
            closeDropdowns(null);
            return;
        }

        e.preventDefault();

        const dropdown = link.parentElement;
        const wasOpen = dropdown.classList.contains('active');

        // Drop any branch this one is not part of, so switching between two
        // top-level menus closes the first along with its open submenus.
        closeDropdowns(dropdown);

        dropdown.classList.toggle('active', !wasOpen);
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

