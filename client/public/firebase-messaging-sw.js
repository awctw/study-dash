// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAgUY5d0kc556sShMaMogBmfcLRNZ_ClDU",
  authDomain: "studydash-fd048.firebaseapp.com",
  projectId: "studydash-fd048",
  storageBucket: "studydash-fd048.appspot.com",
  messagingSenderId: "66459387705",
  appId: "1:66459387705:web:8e01b1649d8fd481dd8ae8",
  measurementId: "G-ELZW5L303E",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function ({ data }) {
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
