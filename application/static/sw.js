const VERSION = 'v6';

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

async function installServiceWorker() {

    log("Service Worker installation started ");

    const cache = await caches.open(getCacheName());

    await cache.addAll([
        "https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
    ]);

    return self.skipWaiting();
}
self.addEventListener('activate', event => {
    log("ACTIVATING");
    // const activationCompleted = Promise.resolve()
    //     .then((activationCompleted) => log("ACTIVATED"))
    //     .catch(error => console.error('Failed to activate sw'));

    event.waitUntil(activateSW);
});

async function activateSW() {

    log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        console.log(cacheKey);
        if (cacheKey !== getCacheName() ) {
            caches.delete(cacheKey);
        }
    });

    return self.clients.claim();
}

// handling service worker installation
self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));

async function cacheThenNetwork(event) {

    const cache = await caches.open(getCacheName());

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        log('Serving From Cache: ' + event.request.url);
        return cachedResponse;
    }

    const networkResponse = await fetch(event.request);

    log('Calling network: ' + event.request.url);

    return networkResponse;
}

// each logging line will be prepended with the service worker version
function log(message) {
    console.log(VERSION, message);
}

function getCacheName() {
    return 'app-cache-' + VERSION;
}