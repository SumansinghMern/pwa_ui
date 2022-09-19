let CACHE_NAME = "version-1";
let urlToCache = ['index.html','offline.html'];

// Install Service Worker

self.addEventListener('install',(event) => {
    console.log(event," ----------event---------------install")
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(cache,"-----cachecache")

                return cache.addAll(urlToCache)
            })
    )
})

// Listen For Request
self.addEventListener('fetch', (event) => {
    console.log(event, " ----------event---------------fetch")
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                console.log(event.request,"----event.request")
                return fetch(event.request)
                        .catch(() => {
                            caches.match('offline.html')
                        })
            })
    )
})

// Activate Service worker
self.addEventListener('activate', (event) => {
    console.log(event, " ----------event---------------activate")
})