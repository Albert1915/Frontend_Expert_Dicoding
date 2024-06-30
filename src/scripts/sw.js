import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan di-caching
const assetsToCache = [
  './',
  './icons/image-128x128.png',
  './icons/image-180x180.png',
  './icons/image-192x192.png',
  './icons/image-384x384.png',
  './icons/image-512x512.png',
  './index.html',
  './images/favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell(assetsToCache));
  console.log('Installing Service Worker ...');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());

  console.log('Activating Service Worker ...');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
