// let public_key =
//   "BKRns56lTgiccLbI4tVnvoBrzAeKhbDcZzVSR1Kexd2yVZS3mal9_lPL6Ec8nsYL64acQHgsZbyuC5WZsiTZDic";

// // const base_url = "http://localhost:4000/";
// const base_url = "https://techbytebackend.onrender.com/";
// // let subscription = localStorage.getItem("subscription")
// //   ? JSON.parse(localStorage.getItem("subscription"))
// //   : "";
// // let register = localStorage.getItem("register")
// //   ? JSON.parse(localStorage.getItem("register"))
// //   : "";

// if (Notification.permission !== "granted") {
//   Notification.requestPermission().then((perm) => {
//     if (perm === "granted") {
//       // console.log("hello");
//       const n = new Notification("example notification", {
//         body: `Testing your Notification feature`,
//         data: {
//           type: "test",
//           message: "whats up silly user",
//         },
//         icon: "./logo192.png",
//         badge: "./logo128.png",
//         tag: "test",
//       });
//       setTimeout(() => {
//         n.close();
//       }, 2000);
//     } else {
//       //alert("Grant notifications!");
//     }
//   });
// }

// function urlBase64ToUint8Array(base64String) {
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

// async function send() {
//   console.log("Registering service worker");
//   register = await navigator.serviceWorker.register("service-worker.js");
//   // localStorage.setItem("register", register);

//   try {
//     subscription = await register.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: public_key,
//     });
//     // console.log(subscription);
//     console.log("Push registered!");
//     // send push notifications
//     const resp = await fetch(`${base_url}subscribe`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(subscription),
//     });

//     console.log("push sent", resp);
//   } catch (err) {
//     console.log(err);
//   }
// }

// // if ("serviceWorker" in navigator) {
// //   if (!navigator.serviceWorker.controller)
// //     send().catch((err) => console.log(err));
// // }

// // const pushBtn = document.querySelector("#push-btn");

// // pushBtn.addEventListener("click", () => {
// // console.log("hello");
// // });
// //
