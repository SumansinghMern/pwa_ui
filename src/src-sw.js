import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';

clientsClaim();


console.log('4444444444444444444444444444')

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);