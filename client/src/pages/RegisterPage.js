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
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAsync } from "../store/authentication/thunks";
import { Player } from "@lottiefiles/react-lottie-player";
import { v4 as uuidv4 } from "uuid";
import { fetchToken } from "../firebaseInit";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fbToken, setFbToken] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    /**
     * FCM token is unique per device! need to fetch this on signup & signin and
     * clear this token (convert to "") in the backend on logout to ensure correct
     * behavior for multiple accounts on the same device!!!!!!!!!!!!!!!!
     */
    fetchToken(setFbToken);
  }, []);

  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
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

  const registerHandler = async () => {
    if (!fbToken) {
      toast.error("Please grant notification permissions before signing up!");
      return;
    }

    const newUser = {
      userID: uuidv4(),
      groupID: [],
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      firebaseToken: fbToken,
    };

    dispatch(userRegisterAsync(newUser));
  };

  useEffect(() => {
    if (user.error) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [user]);

  return (
    <div>
      <div className="mt-7 sm:mt-12 mx-auto max-w-[16rem] relative mb-5">
        <div className="z-10 flex bg-white">
          <Typography className="font-sans font-bold text-6xl">
            StudyDash
          </Typography>
        </div>

        <div className="hidden md:block absolute top-0 right-0 -translate-y-7 translate-x-20">
          <svg
            className="w-12 h-auto text-pink-500"
            width="121"
            height="135"
            viewBox="0 0 121 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
              stroke="currentColor"
              stroke-width="10"
              stroke-linecap="round"
            />
            <path
              d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
              stroke="currentColor"
              stroke-width="10"
              stroke-linecap="round"
            />
            <path
              d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
              stroke="currentColor"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div className="hidden md:block absolute bottom-0 left-0 translate-y-7 -translate-x-24">
          <svg
            className="w-28 h-auto text-indigo-700"
            width="347"
            height="188"
            viewBox="0 0 347 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
              stroke="currentColor"
              stroke-width="7"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-center items-center mt-14">
        <Card className="m-10 w-full max-w-[30rem]">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-indigo-300"
          >
            <Typography variant="h3" color="white">
              Sign Up
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
            <Input label="Email" size="lg" onChange={emailHandler} />
            <Input label="First Name" size="lg" onChange={firstNameHandler} />
            <Input label="Last Name" size="lg" onChange={lastNameHandler} />
            <Input
              label="Password"
              type="password"
              size="lg"
              onChange={passwordHandler}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-indigo-300"
              fullWidth
              onClick={registerHandler}
            >
              Sign Up
            </Button>
            {user.isLoggedIn && <Navigate to="/dashboard" replace={true} />}
          </CardFooter>
        </Card>
        <Player
          src={"https://assets2.lottiefiles.com/packages/lf20_dT1E1P.json"}
          className="w-full max-w-[30rem] justify-start"
          autoplay
          loop
        />
      </div>
    </div>
  );
};

export default RegisterPage;
