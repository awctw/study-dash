import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchToken, onMessageListener } from "../../firebaseInit";

const Notif = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () =>
    toast((t) => (
      <span>
        <p>{notification.title}</p>
        <p className="mb-2">{notification.body}</p>
        <button className="font-bold" onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </span>
    ));

  useEffect(() => {
    if (notification.title) {
      notify();
    }
  }, [notification]);

  fetchToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => {
      console.log("failed: ", err);
    });

  return <Toaster />;
};

export default Notif;
