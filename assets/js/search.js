// Search Functionality for Bada Bhaktmaal Ashram Website
// Handles search form submission and displays results using Google Custom Search

(function() {
    'use strict';

    // Get search query from URL
    function getSearchQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q') || '';
    }

    // Initialize search on search-results page
    function initSearchResults() {
        const query = getSearchQuery();

        if (!query) {
            document.getElementById('loading-message').innerHTML =
                '<p style="color: #666;">No search query provided. Use the search bar above to search.</p>';
            return;
        }

        // Display the search query
        const displayEl = document.getElementById('search-query-display');
        if (displayEl) {
            displayEl.textContent = `Searching for: "${query}"`;
        }

        // Pre-fill the search again input
        const searchAgainInput = document.getElementById('search-again-input');
        if (searchAgainInput) {
            searchAgainInput.value = query;
        }

        console.log('Search query:', query);
    }

    // Display Google search results in iframe
    function displayGoogleResults() {
        const query = getSearchQuery();
        if (!query) return;

        // Hide loading message after a moment
        setTimeout(() => {
            const loadingEl = document.getElementById('loading-message');
            if (loadingEl) {
                loadingEl.style.display = 'none';
            }
        }, 1000);

        // Create iframe with Google search results
        const container = document.getElementById('search-results-container');
        if (container) {
            // Put user query in quotes to prioritize it, then filter by bada bhaktmal ayodhya
            const enhancedQuery = '"' + query + '" +bada +bhaktmal +ayodhya';
            const searchUrl = 'https://www.google.com/search?igu=1&q=' + encodeURIComponent(enhancedQuery);

            // Wrapper to hide the Google search bar at top
            container.innerHTML = `
                <div style="width: 100%; height: 800px; overflow: hidden; border: 2px solid #ddd; border-radius: 8px; background: white; position: relative;">
                    <iframe
                        src="${searchUrl}"
                        style="width: 100%; height: 950px; border: none; position: absolute; top: -150px; left: 0;"
                        title="Search Results"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    ></iframe>
                </div>
            `;
        }
    }

    // Handle search form submission (in navigation)
    function initSearchForm() {
        // Wait for navigation to load
        setTimeout(() => {
            const searchForm = document.querySelector('.search-bar');
            if (searchForm) {
                const searchInput = searchForm.querySelector('input[type="text"]');
                const searchButton = searchForm.querySelector('button');

                if (searchInput && searchButton) {
                    // Prevent default form submission
                    searchButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        performSearch(searchInput.value);
                    });

                    // Also handle Enter key
                    searchInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            performSearch(searchInput.value);
                        }
                    });
                }
            }
        }, 500); // Wait for shared navigation to load
    }

    // Handle "search again" form on results page
    function initSearchAgainForm() {
        const form = document.getElementById('search-again-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('search-again-input');
                if (input && input.value.trim()) {
                    performSearch(input.value.trim());
                }
            });
        }
    }

    // Perform search - redirect to search results page
    function performSearch(query) {
        if (!query || query.trim() === '') {
            alert('Please enter a search term');
            return;
        }

        // Redirect to search results page with query
        const encodedQuery = encodeURIComponent(query.trim());
        window.location.href = `search-results.html?q=${encodedQuery}`;
    }


    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', () => {
        // Check if we're on search results page
        if (window.location.pathname.includes('search-results.html')) {
            initSearchResults();
            initSearchAgainForm();
            displayGoogleResults();
        } else {
            // Initialize search form on all other pages
            initSearchForm();
        }
    });
})();
