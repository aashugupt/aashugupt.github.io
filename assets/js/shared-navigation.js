// Shared Navigation Menu for Internal Pages (Simple Style)
// Edit this file once to update the menu on all internal pages
// Note: index.html (home page) is separate and uses parmarth-style

(function() {
    'use strict';

    const navigationHTML = `
        <div class="top-bar">
            <div class="container">
                <div class="top-bar-left">
                    <div class="search-bar">
                        <input type="text" placeholder="Search..." id="site-search-input">
                        <button type="button" id="site-search-button">🔍</button>
                    </div>
                </div>
                <div class="top-bar-center">
                    <a href="index.html" class="top-logo">
                        <img src="assets/images/logo.png" alt="Bada Bhaktmaal Ashram">
                    </a>
                </div>
                <div class="top-bar-right">
                    <div class="contact-icons">
                        <a href="tel:+919461400650" class="contact-icon" title="Call Us">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/>
                                <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.086-1.391l-4.064-3.696z"/>
                            </svg>
                        </a>
                        <a href="mailto:care@badabhaktmaal.org" class="contact-icon" title="Email Us">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="social-icons-divider"></div>
                    <div class="social-icons">
                        <a href="https://www.facebook.com/badabhaktmaal" target="_blank" class="social-icon" aria-label="Facebook">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/badabhaktmaal/" target="_blank" class="social-icon" aria-label="Instagram">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"/>
                                <circle cx="16.806" cy="7.207" r="1.078"/>
                                <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com/badabhaktmaal" target="_blank" class="social-icon" aria-label="Twitter">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@badabhaktmaal" target="_blank" class="social-icon" aria-label="YouTube">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <nav>
            <div class="container">
                <ul class="nav-menu">
                    <li><a href="index.html">Home</a></li>
                    <li class="dropdown">
                        <a href="#about">About Us ▾</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown">
                                <a href="#about-ashram">About Ashram</a>
                                <ul class="dropdown-menu">
                                    <li><a href="vision.html">Our Vision</a></li>
                                    <li><a href="history.html">Our History</a></li>
                                    <li><a href="gaushala.html">Our Gaushala</a></li>
                                    <li><a href="gurukul.html">Gurukul</a></li>
                                    <li><a href="trust.html">Trust</a></li>
                                    <li><a href="accommodation.html">Accommodation</a></li>
                                </ul>
                            </li>
                            <li><a href="facilities.html">Facilities</a></li>
                            <li><a href="guidelines.html">Guidelines</a></li>
                            <li><a href="visiting.html">Visiting to the Ashram</a></li>
                            <li><a href="associated-centers.html">Associated Centers</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#our-sevas">Our Sevas ▾</a>
                        <ul class="dropdown-menu">
                            <li class="dropdown">
                                <a href="#satkarm">Satkarm</a>
                                <ul class="dropdown-menu">
                                    <li><a href="gurukul.html">Gurukul</a></li>
                                    <li><a href="healthcare.html">Healthcare</a></li>
                                    <li><a href="serene-programs.html">Serene Programs</a></li>
                                    <li><a href="education.html">Education</a></li>
                                    <li><a href="bhandara.html">Bhandara</a></li>
                                    <li><a href="how-can-you-help.html">How Can You Help</a></li>
                                </ul>
                            </li>
                            <li><a href="daily-schedule.html">Daily Ashram Schedule</a></li>
                            <li><a href="blessings.html">Blessings and Messages</a></li>
                            <li><a href="satsang.html">Satsang</a></li>
                            <li class="dropdown">
                                <a href="#sanskara">Sanskara</a>
                                <ul class="dropdown-menu">
                                    <li><a href="yagnopavit.html">Yagnopavit (Upnayan sanskara)</a></li>
                                    <li><a href="diksha.html">Diksha</a></li>
                                    <li><a href="vivah-sanskara.html">Vivah Sanskara</a></li>
                                </ul>
                            </li>
                            <li><a href="cow-protection.html">Cow Protection</a></li>
                        </ul>
                    </li>
                    <li><a href="guruji.html">Spiritual Guides</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="services.html">Events</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="accommodation.html">Stay With Us</a></li>
                    <li class="dropdown">
                        <a href="#downloads">Downloads ▾</a>
                        <ul class="dropdown-menu">
                            <li><a href="wallpapers.html">Wallpapers</a></li>
                            <li><a href="kirtans.html">Kirtans</a></li>
                            <li><a href="quotes.html">Quotes</a></li>
                            <li><a href="audio.html">Audio</a></li>
                        </ul>
                    </li>
                    <li><a href="#donate" class="btn-donate-nav">Donate</a></li>
                </ul>
                <div class="mobile-toggle">☰</div>
            </div>
        </nav>
    `;

    // Inject navigation into the page
    document.addEventListener('DOMContentLoaded', function() {
        const headerPlaceholder = document.getElementById('shared-header-nav');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = navigationHTML;
            console.log('✅ Shared internal navigation loaded');

            // Initialize search functionality after navigation loads
            setTimeout(initSearchFunctionality, 100);

            arrangeMobileHeader();

            // The mobile menu panel is built from the nav above, so it can only
            // be loaded once that markup exists.
            loadMobileMenuPanel();

            // After the nav, so AOS measures its offsets against the finished
            // layout rather than the page's pre-injection height.
            loadScrollAnimations();
        }
    });

    // Portrait phones use a different header arrangement: icons, centred logo
    // and menu toggle on the top bar, with the search field on its own row
    // below. The search cell and the toggle live in different parents, so CSS
    // `order` cannot swap them -- the nodes have to move.
    //
    // Landscape phones and desktop keep the original arrangement, and the move
    // is reversed if the viewport stops matching.
    const PORTRAIT_PHONE = '(orientation: portrait) and (max-width: 768px)';

    function arrangeMobileHeader() {
        const header = document.getElementById('shared-header-nav');
        if (!header) return;

        const topRow = header.querySelector('.top-bar .container');
        const navRow = header.querySelector('nav .container');
        const searchCell = header.querySelector('.top-bar-left');
        const toggle = header.querySelector('.mobile-toggle');
        if (!topRow || !navRow || !searchCell || !toggle) return;

        if (window.matchMedia(PORTRAIT_PHONE).matches) {
            if (searchCell.parentElement !== navRow) navRow.appendChild(searchCell);
            if (toggle.parentElement !== topRow) topRow.appendChild(toggle);
        } else {
            // restore: search first in the top bar, toggle back in the nav
            if (searchCell.parentElement !== topRow) {
                topRow.insertBefore(searchCell, topRow.firstChild);
            }
            if (toggle.parentElement !== navRow) navRow.appendChild(toggle);
        }
    }

    window.addEventListener('orientationchange', function () {
        setTimeout(arrangeMobileHeader, 100);
    });

    window.addEventListener('resize', arrangeMobileHeader);

    // Loaded from here rather than a <script> tag on all 35 internal pages.
    function loadMobileMenuPanel() {
        if (!document.querySelector('link[data-mobile-menu-css]')) {
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = 'assets/css/mobile-menu.css?v=2';
            css.setAttribute('data-mobile-menu-css', '');
            document.head.appendChild(css);
        }

        if (window.initMobileMenuPanel) {
            window.initMobileMenuPanel();
            return;
        }

        const script = document.createElement('script');
        script.src = 'assets/js/mobile-menu.js?v=2';
        document.body.appendChild(script);
    }

    // Also loaded from here rather than a <script> tag on all 40 internal
    // pages. The script assigns its own data-aos attributes from the shared
    // structural classes, so the pages themselves need no markup changes.
    function loadScrollAnimations() {
        if (document.querySelector('script[data-scroll-animations]')) return;

        const script = document.createElement('script');
        script.src = 'assets/js/scroll-animations.js?v=1';
        script.setAttribute('data-scroll-animations', '');
        document.body.appendChild(script);
    }

    // Search functionality
    function initSearchFunctionality() {
        const searchInput = document.getElementById('site-search-input');
        const searchButton = document.getElementById('site-search-button');

        if (!searchInput || !searchButton) {
            console.log('⚠️ Search elements not found');
            return;
        }

        console.log('✅ Search functionality initialized');

        // Handle button click
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            console.log('🔍 Search button clicked, query:', query);

            if (query) {
                window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
            } else {
                alert('Please enter a search term');
            }
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                console.log('🔍 Enter pressed, query:', query);

                if (query) {
                    window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
                } else {
                    alert('Please enter a search term');
                }
            }
        });
    }
})();
