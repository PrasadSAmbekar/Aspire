// const cacheName = "v1";

// self.addEventListener("install", (e) => {
//   console.log("start the invasion");
//   self.skipWaiting();
// });

// self.addEventListener("activate", (e) => {
//   console.log("invasion started");
//   e.waitUntil(clients.claim());
//   e.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache !== cacheName) {
//             // console.log("service worker: clearing old cache!");
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.open(cacheName).then(async function (cache) {
//       return cache.match(event.request).then(function (response) {
//         return (
//           response ||
//           fetch(event.request).then(function (response) {
//             if (
//               event.request.url !==
//               "https://techbytebackend.onrender.com/check_login/"
//             )
//               cache.put(event.request, response.clone());
//             return response;
//           })
//         );
//       });
//     })
//   );
// });

// const applicationServerPublicKey =
//   "BKRns56lTgiccLbI4tVnvoBrzAeKhbDcZzVSR1Kexd2yVZS3mal9_lPL6Ec8nsYL64acQHgsZbyuC5WZsiTZDic";
// /* eslint-enable max-len */

// function urlB64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// self.addEventListener("push", function (event) {
//   // console.log(event);
//   console.log("[Service Worker] Push Received.");
//   const push = JSON.parse(event.data.text());
//   const title = push.title;
//   const options = {
//     body: push.body,
//     data: push,
//     icon: "./logo192.png",
//     badge: "./logo128.png",
//     tag: "push",
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener("notificationclick", function (event) {
//   console.log("[Service Worker] Notification click Received.");

//   event.notification.close();

//   event.waitUntil(clients.openWindow("https://tech-byte.vercel.app/posts"));
// });

// self.addEventListener("pushsubscriptionchange", function (event) {
//   console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   event.waitUntil(
//     self.registration.pushManager
//       .subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: applicationServerKey,
//       })
//       .then(function (newSubscription) {
//         // TODO: Send to application server
//         console.log("[Service Worker] New subscription: ", newSubscription);
//       })
//   );
// });
