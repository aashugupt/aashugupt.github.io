// Full-screen mobile menu panel.
//
// The menu is not duplicated in markup: it is rebuilt at runtime from whatever
// nav the page already has (.nav-left/.nav-right on the home page, ul.nav-menu
// on pages using shared-navigation.js), so adding a menu item anywhere still
// only needs doing once.
(function () {
    'use strict';

    var LOGO_SRC = 'assets/images/logo.png';
    var SOURCE_LISTS = ['.nav-left > ul', '.nav-right > ul', 'ul.nav-menu'];

    function svgChevron() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"' +
            ' stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function svgSearch() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' +
            '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>' +
            '<path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2"' +
            ' stroke-linecap="round"/></svg>';
    }

    // Desktop parent links carry a caret in their text; the panel draws a real one.
    function cleanLabel(text) {
        return text.replace(/[▾▼▸►]/g, '').replace(/\s+/g, ' ').trim();
    }

    function firstChild(el, tag) {
        for (var i = 0; i < el.children.length; i++) {
            if (el.children[i].tagName === tag) return el.children[i];
        }
        return null;
    }

    // Rebuild one nav <li> as a panel row. Classes are deliberately not copied:
    // .dropdown-menu is position:absolute/opacity:0 with !important colours, which
    // would fight the accordion.
    function buildItem(sourceLi) {
        var srcLink = firstChild(sourceLi, 'A');
        if (!srcLink) return null;
        var srcSub = firstChild(sourceLi, 'UL');

        var li = document.createElement('li');
        var row = document.createElement('div');
        row.className = 'row';

        var link = document.createElement('a');
        link.setAttribute('href', srcLink.getAttribute('href') || '#');
        link.textContent = cleanLabel(srcLink.textContent);
        // Copy i18n key so locale switches update panel text without a rebuild.
        // The key may be on srcLink directly, or on an inner <span> (used for
        // links that also carry a caret outside the translatable text).
        var i18nKey = srcLink.getAttribute('data-i18n');
        if (!i18nKey) {
            var i18nChild = srcLink.querySelector('[data-i18n]');
            if (i18nChild) i18nKey = i18nChild.getAttribute('data-i18n');
        }
        if (i18nKey) link.setAttribute('data-i18n', i18nKey);
        if (srcLink.classList.contains('btn-donate-nav')) li.classList.add('is-donate');
        if (srcLink.classList.contains('active')) li.classList.add('is-current');
        row.appendChild(link);

        if (srcSub) {
            li.classList.add('has-children');
            var chev = document.createElement('button');
            chev.type = 'button';
            chev.className = 'chev';
            chev.setAttribute('aria-expanded', 'false');
            chev.setAttribute('aria-label', 'Toggle ' + link.textContent + ' submenu');
            chev.innerHTML = svgChevron();
            row.appendChild(chev);
        }

        li.appendChild(row);

        if (srcSub) {
            var sub = document.createElement('ul');
            sub.className = 'submenu';
            for (var i = 0; i < srcSub.children.length; i++) {
                if (srcSub.children[i].tagName !== 'LI') continue;
                var child = buildItem(srcSub.children[i]);
                if (child) sub.appendChild(child);
            }
            li.appendChild(sub);
        }

        return li;
    }

    function collectItems() {
        var items = [];
        SOURCE_LISTS.forEach(function (selector) {
            var lists = document.querySelectorAll(selector);
            for (var i = 0; i < lists.length; i++) {
                var list = lists[i];
                for (var j = 0; j < list.children.length; j++) {
                    if (list.children[j].tagName !== 'LI') continue;
                    var item = buildItem(list.children[j]);
                    if (item) items.push(item);
                }
            }
        });
        return items;
    }

    function buildSearch() {
        var wrap = document.createElement('div');
        wrap.className = 'mobile-menu-search';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search';
        input.setAttribute('aria-label', 'Search');

        var button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Search');
        button.innerHTML = svgSearch();

        function submit() {
            var query = input.value.trim();
            if (query) {
                window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
            }
        }

        button.addEventListener('click', submit);
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submit();
            }
        });

        wrap.appendChild(input);
        wrap.appendChild(button);
        return wrap;
    }

    function buildSocial() {
        // phone/email are .icon-contact on the home page but .contact-icon in
        // shared-navigation.js -- similar names, different classes.
        var contacts = document.querySelectorAll(
            '.top-bar-right .icon-contact, .top-bar-right .contact-icon');
        var socials = document.querySelectorAll('.top-bar-right .social-icon');
        if (!contacts.length && !socials.length) return null;

        var wrap = document.createElement('div');
        wrap.className = 'mobile-menu-social';

        function addAll(list) {
            for (var i = 0; i < list.length; i++) {
                var link = list[i].cloneNode(true);
                // the source styling is white on a translucent disc, which is
                // invisible against this panel's cream background
                link.removeAttribute('class');
                link.removeAttribute('data-tooltip');
                wrap.appendChild(link);
            }
        }

        addAll(contacts);

        if (contacts.length && socials.length) {
            var sep = document.createElement('span');
            sep.className = 'sep';
            sep.setAttribute('aria-hidden', 'true');
            wrap.appendChild(sep);
        }

        addAll(socials);
        return wrap;
    }

    function buildPanel(items) {
        var panel = document.createElement('div');
        panel.className = 'mobile-menu-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', 'Menu');

        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'mobile-menu-close';
        close.setAttribute('aria-label', 'Close menu');
        close.innerHTML = '&times;';
        panel.appendChild(close);

        var logo = document.createElement('div');
        logo.className = 'mobile-menu-logo';
        var disc = document.createElement('div');
        disc.className = 'logo-disc';
        var img = document.createElement('img');
        img.src = LOGO_SRC;
        img.alt = 'Bada Bhaktmaal Ashram';
        disc.appendChild(img);
        logo.appendChild(disc);
        panel.appendChild(logo);

        var nav = document.createElement('nav');
        nav.className = 'mobile-menu-nav';
        var list = document.createElement('ul');
        items.forEach(function (item) {
            list.appendChild(item);
        });
        nav.appendChild(list);
        panel.appendChild(nav);

        panel.appendChild(buildSearch());

        var social = buildSocial();
        if (social) panel.appendChild(social);

        return panel;
    }

    function toggleBranch(li) {
        var isOpen = li.classList.toggle('is-open');
        var row = firstChild(li, 'DIV');
        var chev = row ? row.querySelector('.chev') : null;
        if (chev) chev.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    var initialised = false;

    function init() {
        // two load paths reach this (a script tag on the home page, and
        // shared-navigation.js on internal pages) -- only build once
        if (initialised) return;

        var toggles = document.querySelectorAll('.mobile-toggle');
        if (!toggles.length) return;

        var items = collectItems();
        if (!items.length) return;

        initialised = true;

        var panel = buildPanel(items);
        document.body.appendChild(panel);

        function open() {
            panel.classList.add('is-open');
            document.body.classList.add('mobile-menu-open');
        }

        function close() {
            panel.classList.remove('is-open');
            document.body.classList.remove('mobile-menu-open');
        }

        for (var i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                open();
            });
        }

        panel.querySelector('.mobile-menu-close').addEventListener('click', close);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
        });

        panel.addEventListener('click', function (e) {
            var chev = e.target.closest('.chev');
            if (chev) {
                e.preventDefault();
                toggleBranch(chev.closest('li'));
                return;
            }

            var link = e.target.closest('.mobile-menu-nav a');
            if (!link) return;

            var li = link.closest('li');
            var href = link.getAttribute('href') || '';

            // Parent entries point at fragments rather than real pages, so a tap
            // on the label should expand the branch instead of navigating.
            if (li.classList.contains('has-children') && href.indexOf('#') !== -1) {
                e.preventDefault();
                toggleBranch(li);
                return;
            }

            close();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // shared-navigation.js injects the nav after load on internal pages.
    window.initMobileMenuPanel = init;
})();
