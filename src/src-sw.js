import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import {registerRoute} from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin, Queue } from 'workbox-background-sync';

clientsClaim();


console.log('4444444444444444444444444444')

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName:'google-fonts-stylesheat'
    })
)

registerRoute(
    ({request}) => {
        console.log(request,"----request--------")
        return request.destination === 'image' || true
    },
    new StaleWhileRevalidate({
        cacheName:'new-data',
    })
);

registerRoute(
    ({ url }) => {
        console.log(url, " vvvvvvvvvvvvvvvvv", url.origin)
        return url.origin === `${process.env.REACT_APP_API}`
    },
    new StaleWhileRevalidate({
        cacheName: 'api-images-responce'
    })
)


registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName:'static-Resources'
    })
)


// const bgSyncPlugin = new BackgroundSyncPlugin('addUserPost', {
//     maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
// });

// registerRoute(
//     ({ url,request }) => {
//         console.log(url, " ppppppppppppppppppppppp", request)
//         return url.origin === `${process.env.REACT_APP_API}`
//     },
//     new NetworkOnly({
//         plugins: [bgSyncPlugin],
//     }),
//     'POST'
// );

const queue = new Queue('add-user-post');

self.addEventListener('fetch', event => {
    // Add in your own criteria here to return early if this
    // isn't a request that should use background sync.
    if (event.request.method !== 'POST') {
        return;
    }

    const bgSyncLogic = async () => {
        try {
            const response = await fetch(event.request.clone());
            console.log(response,'------responseresponse')
            return response;
        } catch (error) {
            await queue.pushRequest({ request: event.request });
            console.log('--------errrrrrrrrrrrrrr')
            return error;
        }
    };

    event.respondWith(bgSyncLogic());
});


