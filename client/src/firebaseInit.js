import firebase from "firebase/compat/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const config = {
  apiKey: "AIzaSyAgUY5d0kc556sShMaMogBmfcLRNZ_ClDU",
  authDomain: "studydash-fd048.firebaseapp.com",
  projectId: "studydash-fd048",
  storageBucket: "studydash-fd048.appspot.com",
  messagingSenderId: "66459387705",
  appId: "1:66459387705:web:8e01b1649d8fd481dd8ae8",
  measurementId: "G-ELZW5L303E",
};

const app = firebase.initializeApp(config);
const messaging = getMessaging(app);

export const fetchToken = async (setToken) => {
  await Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey:
          "BEjfQkiaz4wqPa8N2sge89BfrKXH9egA7eHU2KwghM_tITIS-rrxOHOKQq2Bjez4-W-nMU2VTdGjW-agyfHdTf8",
      }).then((currToken) => {
        if (currToken) {
          setToken(currToken);
          return true;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

/**
 * References
 * - https://github.com/chidimo/Fireact
 * - https://www.audreyhal.com/blog/push-notifications-with-firebase-in-react
 */
