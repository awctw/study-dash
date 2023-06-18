import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegisterAsync } from "../store/authentication/thunks";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
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
    const user = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    dispatch(userRegisterAsync(user));
  };

  return (
    <div className="flex justify-center">
      <Card className="m-10 w-full max-w-[40rem]">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-indigo-300"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
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
          <NavLink to={"/dashboard"}>
            <Button
              className="bg-indigo-300"
              fullWidth
              onClick={registerHandler}
            >
              Sign Up
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
