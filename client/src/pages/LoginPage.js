import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Alert,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Player } from "@lottiefiles/react-lottie-player";
import { NavLink, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAsync } from "../store/authentication/thunks";
import { fetchToken } from "../firebaseInit";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fbToken, setFbToken] = useState("");
  const [alert, setAlert] = useState(false);

  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchToken(setFbToken);
  }, []);

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };

  const handleLogin = () => {
    if (!fbToken) {
      toast.error("Please grant notification permissions before continuing");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      fbToken: fbToken,
    };
    dispatch(userLoginAsync(newUser));
  };

  useEffect(() => {
    if (user.error) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [user]);

  const userNameHandler = (event) => {
    setAlert(false);
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="pt-5">
      <div className="mt-7 sm:mt-12 mx-auto max-w-xs relative mb-5">
        <div className="z-10 flex bg-white">
          <Typography className="font-sans font-bold text-7xl">
            StudyDash
          </Typography>
        </div>

        <div className="hidden md:block absolute top-0 right-0 -translate-y-12 translate-x-20">
          <svg
            className="w-16 h-auto text-indigo-500"
            width="121"
            height="135"
            viewBox="0 0 121 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="hidden md:block absolute bottom-0 left-0 translate-y-10 -translate-x-32">
          <svg
            className="w-40 h-auto text-pink-500"
            width="347"
            height="188"
            viewBox="0 0 347 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex mb-20">
          <Player
            src={"https://assets7.lottiefiles.com/packages/lf20_K7aZUG.json"}
            className="w-full max-w-[30rem] justify-start"
            autoplay
            loop
          />
        </div>
        <div className="flex m-10 w-full max-w-[30rem]">
          <Card className="w-full">
            <CardHeader
              variant="gradient"
              className="mb-4 grid h-28 place-items-center bg-indigo-300"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
              {alert && (
                <div className="flex w-full flex-col gap-2">
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

              <Input label="Username" size="lg" onChange={userNameHandler} />
              <Input
                label="Password"
                type="Password"
                size="lg"
                onChange={passwordHandler}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button className="bg-indigo-300" onClick={handleLogin} fullWidth>
                Sign In
              </Button>
              {user.isLoggedIn && <Navigate to="/dashboard" replace={true} />}
              <div className="mt-6 flex justify-center items-center">
                <Typography variant="small">
                  Don&apos;t have an account?
                </Typography>
                <NavLink to={"/register"}>
                  <Typography
                    variant="small"
                    className="ml-1 font-bold text-indigo-300"
                    onClick={handleOpenLogin}
                  >
                    Sign up
                  </Typography>
                </NavLink>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
