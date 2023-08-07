import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../../firebaseInit";

const Notif = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () =>
    toast.custom(
      (t) => (
        <DisplayToast
          t={t}
          title={notification.title}
          body={notification.body}
        />
      ),
      {
        duration: 4000,
        position: "top-right",
      }
    );

  useEffect(() => {
    if (notification.title) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.data?.title,
        body: payload?.data?.body,
      });
    })
    .catch((err) => {
      console.log("failed: ", err);
    });

  return <Toaster />;
};

const DisplayToast = (props) => {
  const path = window.location.pathname.split("/");
  const showNotif =
    path[1] !== "chat" || props.title === "You have an invitation";

  return (
    <>
      {showNotif ? (
        <div
          className={`${
            props.t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {props.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">{props.body}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(props.t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Notif;
