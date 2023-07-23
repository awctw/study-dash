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
import {
  updateFbTokenAsync,
  userLoginAsync,
} from "../store/authentication/thunks";
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
    const newUser = {
      username: username,
      password: password,
    };
    dispatch(userLoginAsync(newUser));
  };

  useEffect(() => {
    if (user.error) {
      setAlert(true);
    } else {
      setAlert(false);
    }

    if (user.isLoggedIn) {
      dispatch(
        updateFbTokenAsync({
          username: user.user.username,
          firebaseToken: fbToken,
        })
      );
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
    <div>
      <div className="flex justify-center mt-10">
        <Typography variant="h1">STUDYDASH</Typography>
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
