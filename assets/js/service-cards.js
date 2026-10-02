// Service cards overlay.
//
// Visual state is a class rather than inline styles, so CSS can restyle the
// panel per device (see the (hover: none) block in service-cards.css) without
// inline styles overriding it.
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var logo = document.querySelector('.central-logo');
        var panel = document.querySelector('.services-quick-access');
        var aarti = document.getElementById('aartiCard');
        // Check both hover capability AND screen width
        // Small screens (≤768px) always get mobile version, even if they report hover support
        var canHover = window.matchMedia('(hover: hover)').matches && window.matchMedia('(min-width: 769px)').matches;

        function open() {
            if (panel) panel.classList.add('is-open');
            document.body.classList.add('services-open');
        }

        function close() {
            if (panel) panel.classList.remove('is-open');
            document.body.classList.remove('services-open');
            if (aarti) aarti.classList.remove('locked-expanded');
        }

        if (logo && panel) {
            if (canHover) {
                // Pointing devices: unchanged reveal-on-hover behaviour.
                var hideTimer;

                logo.addEventListener('mouseenter', function () {
                    clearTimeout(hideTimer);
                    open();
                });

                panel.addEventListener('mouseenter', function () {
                    clearTimeout(hideTimer);
                });

                logo.addEventListener('mouseleave', function () {
                    hideTimer = setTimeout(close, 300);
                });

                panel.addEventListener('mouseleave', function () {
                    hideTimer = setTimeout(close, 300);
                });
            } else {
                // Touch: a tap synthesises mouseenter but nothing ever fires
                // mouseleave, so the panel needs an explicit toggle to close.
                logo.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (panel.classList.contains('is-open')) {
                        close();
                    } else {
                        open();
                    }
                });

                // The panel covers the screen on touch, so it needs a visible
                // way out.
                var closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'services-close';
                closeBtn.setAttribute('aria-label', 'Close services');
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    close();
                });

                // Appended to body rather than the panel. The panel lives
                // inside .split-nav-container, which has z-index 25 and so
                // forms a stacking context -- meaning no z-index on the panel
                // or its children can lift them above .top-info-bar (z-index
                // 30). That bar spans the full width at top:0 and its
                // left-hand spacer covered this corner, swallowing the taps.
                document.body.appendChild(closeBtn);

                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape') close();
                });
            }
        }

        if (aarti) {
            aarti.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                aarti.classList.toggle('locked-expanded');
            });

            document.addEventListener('click', function (e) {
                if (!aarti.contains(e.target) && aarti.classList.contains('locked-expanded')) {
                    aarti.classList.remove('locked-expanded');
                }
            });
        }
    });
})();
