/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-b717800f'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "style.css",
    "revision": "8f214ee88cbae3575b275dfe65e1af60"
  }, {
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-512x512.png",
    "revision": "b9121a67b4dfa0a0e510f748d4176150"
  }, {
    "url": "pwa-192x192.png",
    "revision": "035075d82a0210cfed502e71a4a6053e"
  }, {
    "url": "maskable-512x512.png",
    "revision": "18b0acb1ba1f1a8381762dcccd881a38"
  }, {
    "url": "index.html",
    "revision": "3cf85bb4b11ab4b3b880dc98c6be7ba3"
  }, {
    "url": "favicon.svg",
    "revision": "60407eccbf1dcecb6d8e75d779cbc2c3"
  }, {
    "url": "favicon.png",
    "revision": "b9121a67b4dfa0a0e510f748d4176150"
  }, {
    "url": "assets/rapper_09-mT2KKvz1.png",
    "revision": null
  }, {
    "url": "assets/rapper_07-Bt5mFZYV.png",
    "revision": null
  }, {
    "url": "assets/rapper_05-CNCBex4x.png",
    "revision": null
  }, {
    "url": "assets/rapper_04-cEopL-z8.png",
    "revision": null
  }, {
    "url": "assets/rapper_03-DvgDrG1d.png",
    "revision": null
  }, {
    "url": "assets/rapper_01-BC33ibpv.png",
    "revision": null
  }, {
    "url": "assets/rapper_00-B7AHhuiu.png",
    "revision": null
  }, {
    "url": "assets/phaser--qN7-NCm.js",
    "revision": null
  }, {
    "url": "assets/logo.png",
    "revision": null
  }, {
    "url": "assets/index-BhFSe5vB.js",
    "revision": null
  }, {
    "url": "assets/bg.png",
    "revision": null
  }, {
    "url": "assets/TE_RAP-DF8oV9P0.png",
    "revision": null
  }, {
    "url": "assets/IMPROLAB-DFJ5HsbM.png",
    "revision": null
  }, {
    "url": "assets/FUS-eSYpZJ1-.png",
    "revision": null
  }, {
    "url": "favicon.png",
    "revision": "b9121a67b4dfa0a0e510f748d4176150"
  }, {
    "url": "favicon.svg",
    "revision": "60407eccbf1dcecb6d8e75d779cbc2c3"
  }, {
    "url": "maskable-512x512.png",
    "revision": "18b0acb1ba1f1a8381762dcccd881a38"
  }, {
    "url": "pwa-192x192.png",
    "revision": "035075d82a0210cfed502e71a4a6053e"
  }, {
    "url": "pwa-512x512.png",
    "revision": "b9121a67b4dfa0a0e510f748d4176150"
  }, {
    "url": "manifest.webmanifest",
    "revision": "626525331cd1d2ff694aef81f9c3f822"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/\.mp3$/, new workbox.CacheFirst({
    "cacheName": "rijmspel-music",
    plugins: [new workbox.RangeRequestsPlugin(), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), new workbox.ExpirationPlugin({
      maxEntries: 30,
      maxAgeSeconds: 31536000
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\//, new workbox.StaleWhileRevalidate({
    "cacheName": "google-fonts-stylesheets",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\//, new workbox.CacheFirst({
    "cacheName": "google-fonts-webfonts",
    plugins: [new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 31536000
    })]
  }), 'GET');

}));
