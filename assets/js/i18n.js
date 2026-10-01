// Locale engine for internal pages.
//
// Loaded by shared-navigation.js after nav injection, so the nav's data-i18n
// elements are already in the DOM when init() runs. index.html is not in scope
// (it does not use shared-navigation.js).
//
// Locale strings live in assets/locales/{lang}/common.json (nav + shared) and
// assets/locales/{lang}/{page}.json (page-specific). Missing page files return
// an empty object silently -- stub pages have no translatable content anyway.
//
// Persistence: localStorage key "bba-locale". Same storage as the audio player
// uses for volume/track, different key -- no collision.
(function () {
    'use strict';

    var STORAGE_KEY = 'bba-locale';
    var SUPPORTED   = ['en', 'hi'];
    var DEFAULT     = 'en';
    var BASE        = 'assets/locales/';
    var SWITCHER_CSS = 'assets/css/lang-switcher.css?v=1';

    var current = localStorage.getItem(STORAGE_KEY) || DEFAULT;
    if (SUPPORTED.indexOf(current) === -1) current = DEFAULT;

    var strings = {};

    // 'vision.html' → 'vision', '' or '/' → 'index'
    function pageKey() {
        var file = window.location.pathname.split('/').pop() || 'index.html';
        return file.replace(/\.html$/, '') || 'index';
    }

    function fetchJSON(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                try { cb(JSON.parse(xhr.responseText)); } catch (e) { cb({}); }
            } else {
                cb({});
            }
        };
        xhr.onerror = function () { cb({}); };
        xhr.send();
    }

    function loadStrings(locale, done) {
        var page    = pageKey();
        var merged  = {};
        var pending = 2;

        function merge(data) {
            var k;
            for (k in data) {
                if (Object.prototype.hasOwnProperty.call(data, k)) merged[k] = data[k];
            }
            if (--pending === 0) done(merged);
        }

        fetchJSON(BASE + locale + '/common.json', merge);
        fetchJSON(BASE + locale + '/' + page + '.json', merge); // silent 404 → {}
    }

    // Walk every [data-i18n] element and apply the matching string.
    // data-i18n-attr="placeholder" sets an attribute instead of textContent.
    function apply() {
        document.documentElement.lang = current === 'hi' ? 'hi-IN' : 'en-IN';

        var nodes = document.querySelectorAll('[data-i18n]');
        Array.prototype.forEach.call(nodes, function (el) {
            var key  = el.getAttribute('data-i18n');
            var val  = strings[key];
            if (val === undefined) return;

            var attr = el.getAttribute('data-i18n-attr');
            if (attr) {
                el.setAttribute(attr, val);
            } else {
                el.textContent = val;
            }
        });

        updateSwitcher();
    }

    function updateSwitcher() {
        // Desktop chip label
        Array.prototype.forEach.call(
            document.querySelectorAll('.lang-chip'),
            function (chip) { chip.textContent = current === 'hi' ? 'हिं' : 'EN'; }
        );

        // Active state on all .lang-opt buttons (desktop panel + mobile toggle)
        Array.prototype.forEach.call(
            document.querySelectorAll('.lang-opt[data-lang]'),
            function (btn) {
                btn.classList.toggle('lang-opt--active',
                    btn.getAttribute('data-lang') === current);
            }
        );
    }

    // ── Mobile toggle ─────────────────────────────────────────────────────────
    // Injected into the top of the mobile panel via MutationObserver. Works
    // whether the panel is created before or after i18n.js loads.

    function injectMobileToggle(panel) {
        if (panel.querySelector('.mobile-lang-toggle')) return;

        var div = document.createElement('div');
        div.className = 'mobile-lang-toggle';

        var en = document.createElement('button');
        en.type = 'button';
        en.className = 'lang-opt';
        en.setAttribute('data-lang', 'en');
        en.textContent = 'English';

        var sep = document.createElement('span');
        sep.className = 'lang-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '|';

        var hi = document.createElement('button');
        hi.type = 'button';
        hi.className = 'lang-opt';
        hi.setAttribute('data-lang', 'hi');
        hi.textContent = 'हिंदी';

        div.appendChild(en);
        div.appendChild(sep);
        div.appendChild(hi);

        // Insert after the close button (first child of the panel)
        var closeBtn = panel.querySelector('.mobile-menu-close');
        if (closeBtn && closeBtn.nextSibling) {
            panel.insertBefore(div, closeBtn.nextSibling);
        } else {
            panel.appendChild(div);
        }
    }

    function watchForMobilePanel() {
        // Handle panel that may already exist (e.g. if i18n loaded late)
        var existing = document.querySelector('.mobile-menu-panel');
        if (existing) injectMobileToggle(existing);

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                m.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1 &&
                        node.classList.contains('mobile-menu-panel')) {
                        injectMobileToggle(node);
                        updateSwitcher();
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true });
    }

    // ── Locale switch ─────────────────────────────────────────────────────────

    function setLocale(lang) {
        if (SUPPORTED.indexOf(lang) === -1) return;
        current = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        loadStrings(lang, function (data) {
            strings = data;
            apply();

            // Mobile panel text is built from nav link text at panel-creation
            // time. Re-apply data-i18n now covers the panel links too (because
            // mobile-menu.js copies data-i18n keys onto the panel's <a> tags).
            // No full rebuild needed.
        });
    }

    // ── Stylesheet loader (dedup by base path) ────────────────────────────────

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

    // ── Event delegation for switcher clicks ──────────────────────────────────

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.lang-opt[data-lang]');
        if (!btn) return;
        setLocale(btn.getAttribute('data-lang'));
        // Remove focus so :focus-within no longer holds the panel open;
        // the panel then collapses as soon as the mouse leaves.
        btn.blur();
    });

    // ── Public API ────────────────────────────────────────────────────────────

    window.i18n = {
        setLocale:  setLocale,
        getLocale:  function () { return current; }
    };

    // ── Init ──────────────────────────────────────────────────────────────────

    function init() {
        styleSheet(SWITCHER_CSS);
        watchForMobilePanel();
        loadStrings(current, function (data) {
            strings = data;
            apply();
        });
    }

    // shared-navigation.js loads this after DOMContentLoaded so the nav
    // is already in the DOM -- just run.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
