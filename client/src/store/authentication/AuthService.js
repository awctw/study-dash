import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = (username, password) => {
  return axios.post(API_URL + "signout", { username, password }).then(() => {
    localStorage.removeItem("user");
  });
};

const register = (username, firstName, lastName, email, password) => {
  return axios
    .post(API_URL + "signup", {
      username,
      firstName,
      lastName,
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const AuthService = {
  login,
  logout,
  register,
};

export default AuthService;
