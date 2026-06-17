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
    "revision": "6e9cdda497956f192a211e78f6f25caf"
  }, {
    "url": "pwa-192x192.png",
    "revision": "bf8c2b54e966a95f956922ca8194d39d"
  }, {
    "url": "maskable-512x512.png",
    "revision": "c466533ef5c7da138d8299ffc96bc321"
  }, {
    "url": "index.html",
    "revision": "980bd33ada772c0b5d8bb312956d5d13"
  }, {
    "url": "favicon.svg",
    "revision": "60407eccbf1dcecb6d8e75d779cbc2c3"
  }, {
    "url": "favicon.png",
    "revision": "9dc7b245053f6aa6acbce9f80f566c0f"
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
    "revision": "9dc7b245053f6aa6acbce9f80f566c0f"
  }, {
    "url": "favicon.svg",
    "revision": "60407eccbf1dcecb6d8e75d779cbc2c3"
  }, {
    "url": "maskable-512x512.png",
    "revision": "c466533ef5c7da138d8299ffc96bc321"
  }, {
    "url": "pwa-192x192.png",
    "revision": "bf8c2b54e966a95f956922ca8194d39d"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6e9cdda497956f192a211e78f6f25caf"
  }, {
    "url": "manifest.webmanifest",
    "revision": "5e73237ee1a0910032f0f6ce44177aed"
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
