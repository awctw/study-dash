import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const login = (userID, username, password) => {
  return axios
    .post(API_URL + "signin", { userID, username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.data.message !== undefined) {
        return response.data;
      }
      return response.data;
    });
};

const logout = (username, password) => {
  return axios.post(API_URL + "signout", { username, password }).then(() => {
    localStorage.removeItem("user");
  });
};

const register = (userID, username, firstName, lastName, email, password) => {
  return axios
    .post(API_URL + "signup", {
      userID,
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

const edit = (userID, username, firstName, lastName, email) => {
  return axios
    .put(API_URL + "edit", {
      userID,
      username,
      firstName,
      lastName,
      email,
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
  edit,
};

export default AuthService;
