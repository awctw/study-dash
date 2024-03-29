import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Typography, Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/SideBar";
import { userEditAsync } from "../store/authentication/thunks";

const ProfilePage = () => {
  // Referenced https://www.pluralsight.com/guides/uploading-files-with-reactjs for file upload
  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  const [username, setUsername] = useState(
    user.isLoggedIn ? user.user.username : ""
  );
  const [firstName, setFirstName] = useState(
    user.isLoggedIn ? user.user.firstName : ""
  );
  const [lastName, setLastName] = useState(
    user.isLoggedIn ? user.user.lastName : ""
  );
  const [email, setEmail] = useState(user.isLoggedIn ? user.user.email : "");

  const submitHandler = (event) => {
    event.preventDefault();
    const userID = user.user.userID;
    const updatedUser = {
      userID,
      username,
      firstName,
      lastName,
      email,
    };

    dispatch(userEditAsync(updatedUser));
  };

  useEffect(() => {
    if (user.error) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [user]);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <form className=" m-7">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Typography variant="h2">Profile</Typography>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              {alert && (
                <div className="flex justify-center w-full flex-col gap-2 my-4">
                  <Alert
                    className="bg-indigo-300"
                    icon={
                      <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                      />
                    }
                  >
                    Error: {user.error}
                  </Alert>
                </div>
              )}

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      onChange={usernameHandler}
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={firstNameHandler}
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={firstName}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={lastNameHandler}
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      value={lastName}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={emailHandler}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              type="submit"
              className="rounded-md bg-indigo-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
