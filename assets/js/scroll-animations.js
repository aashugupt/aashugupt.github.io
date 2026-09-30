// Scroll entrance animations for the internal pages.
//
// They carry no data-aos markup of their own: there are 40 of them and the
// attributes would have to be hand-placed in each, so they are assigned here
// from the structural classes the shared page template already uses. New
// internal pages built on that template are covered without further work.
//
// The home page is not in scope -- it hand-places its own attributes and
// loads AOS from its own markup. Nothing here is reachable from it: this is
// loaded by shared-navigation.js, which index.html neither references nor
// satisfies (it has no #shared-header-nav placeholder). Anything that already
// carries a data-aos attribute is left untouched regardless.
(function () {
    'use strict';

    var CDN_CSS = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css';
    var CDN_JS = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js';
    var CLIP_CSS = 'assets/css/aos-internal.css?v=1';

    // AOS holds an element at opacity 0 until it scrolls into view. Nothing
    // here can survive that: the injected header holds a sticky nav,
    // section.hero is the banner already on screen at load, and the overlays
    // are fixed-position, so none of them ever cross the viewport threshold
    // and they would stay invisible for good.
    var SKIP_WITHIN = [
        'header',
        '#shared-header-nav',
        'section.hero',
        'footer',
        '.services-quick-access',
        '.mobile-menu-panel',
        '.aarti-modal'
    ].join(',');

    // Order matters: a rule listed earlier claims its matches first, and
    // anything inside an already-claimed element is then skipped. The call to
    // action is listed first so it animates as one block, the way the home
    // page treats it, rather than its heading breaking away on its own.
    var PLAN = [
        { effect: 'fade-up', selector: '.cta-section .container' },
        { effect: 'fade-up', selector: '.section-title' },
        { effect: 'fade-up', selector: '.lead-text' },
        { effect: 'fade-up', selector: '.feature-card', stagger: 100 },
        { effect: 'zoom-in', selector: '.activity-card', stagger: 100 },
        { effect: 'fade-right', selector: '.guruji-image' },
        { effect: 'fade-left', selector: '.guruji-text' },
        { selector: '.timeline-item', alternate: ['fade-right', 'fade-left'], stagger: 100 }
    ];

    // Compared without the cache-busting query, so a stylesheet already on the
    // page is not fetched a second time under a different version.
    function styleSheet(href) {
        var file = href.split('?')[0];
        var existing = document.querySelectorAll('link[rel="stylesheet"]');

        for (var i = 0; i < existing.length; i++) {
            if ((existing[i].getAttribute('href') || '').split('?')[0] === file) return;
        }

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    // Position among the siblings matching the same rule, so a stagger
    // restarts in each grid rather than running up to a long delay across a
    // page with several of them.
    function siblingPosition(el, selector) {
        if (!el.parentElement) return 0;

        var peers = Array.prototype.filter.call(el.parentElement.children, function (child) {
            return child.matches(selector);
        });

        return peers.indexOf(el);
    }

    function assign() {
        PLAN.forEach(function (rule) {
            var nodes = document.querySelectorAll(rule.selector);

            Array.prototype.forEach.call(nodes, function (el) {
                if (el.hasAttribute('data-aos')) return;
                if (el.closest(SKIP_WITHIN)) return;
                // An animating parent already carries its subtree in with it;
                // animating both reads as a stutter.
                if (el.parentElement && el.parentElement.closest('[data-aos]')) return;

                var position = siblingPosition(el, rule.selector);

                el.setAttribute('data-aos', rule.alternate
                    ? rule.alternate[position % rule.alternate.length]
                    : rule.effect);

                if (rule.stagger) {
                    el.setAttribute('data-aos-delay', String((position % 3) * rule.stagger));
                }
            });
        });
    }

    // A transformed box counts toward the page's scrollable overflow, so the
    // sideways start offset on a full-width row makes the document wider than
    // the viewport and the page paints a blank strip down its edge. Clipping
    // the section absorbs the offset at an edge flush with the viewport,
    // leaving the slide itself intact. Covers hand-placed attributes as well
    // as assigned ones.
    function containLateralOverflow() {
        var lateral = document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"]');

        Array.prototype.forEach.call(lateral, function (el) {
            var box = el.closest('section') || el.closest('.container');
            if (box) box.classList.add('aos-clip-x');
        });
    }

    // AOS's .aos-animate rule carries three compound selectors, which
    // outweighs a plain `.card:hover` -- so the transform it settles on was
    // permanently cancelling the cards' hover lift. Once an element has
    // animated AOS has no further use for it (once: true leaves it alone from
    // then on), so drop the attribute and hand the transform back to the
    // page's own CSS.
    function releaseWhenDone() {
        document.addEventListener('transitionend', function (e) {
            var el = e.target;

            if (e.propertyName !== 'transform') return;
            if (!el.hasAttribute || !el.hasAttribute('data-aos')) return;
            if (!el.classList.contains('aos-animate')) return;

            el.removeAttribute('data-aos');
            el.removeAttribute('data-aos-delay');
            el.classList.remove('aos-animate');
        });
    }

    function start() {
        if (!window.AOS) return;

        assign();
        containLateralOverflow();
        releaseWhenDone();

        window.AOS.init({
            duration: 600,
            easing: 'ease',
            once: true,
            offset: 80
        });
    }

    function init() {
        styleSheet(CDN_CSS);
        styleSheet(CLIP_CSS);

        if (window.AOS) {
            start();
            return;
        }

        var script = document.createElement('script');
        script.src = CDN_JS;
        script.onload = start;
        document.body.appendChild(script);
    }

    // Internal pages load this from shared-navigation.js once the nav has been
    // injected, which is after DOMContentLoaded -- initialising only then also
    // means AOS measures offsets against the finished layout.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
