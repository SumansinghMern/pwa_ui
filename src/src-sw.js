import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';

clientsClaim();




self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);