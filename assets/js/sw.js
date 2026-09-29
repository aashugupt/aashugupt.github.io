// Service Worker for Caching Audio Files
const CACHE_NAME = 'sitaram-audio-cache-v1';
const AUDIO_CACHE = 'sitaram-audio-files';

// Files to cache immediately
const STATIC_CACHE = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/css/custom-audio-player.css',
    '/assets/js/custom-audio-player.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME && cache !== AUDIO_CACHE) {
                        console.log('Service Worker: Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, cache audio files
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Cache audio files separately
    if (url.pathname.includes('/assets/audio/')) {
        event.respondWith(
            caches.open(AUDIO_CACHE).then(cache => {
                return cache.match(event.request).then(response => {
                    if (response) {
                        console.log('Service Worker: Serving audio from cache:', url.pathname);
                        return response;
                    }

                    console.log('Service Worker: Fetching and caching audio:', url.pathname);
                    return fetch(event.request).then(fetchResponse => {
                        // Cache the audio file
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }

    // For other files, use cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
