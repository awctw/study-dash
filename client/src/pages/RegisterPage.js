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

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

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

  const registerHandler = () => {
    const newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
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
      <div className="flex justify-center mt-10">
        <Typography variant="h1">StudyDash</Typography>
      </div>
      <div className="flex justify-center items-center mt-10">
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
