import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const login = (userID, username, password, fbToken) => {
  return axios
    .post(API_URL + "signin", { userID, username, password, fbToken })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.data.message !== undefined) {
        return response.data;
      }
      return response.data;
    });
};

const logout = (username, password) => {
  return axios.post(API_URL + "signout", { username, password }).then(() => {
    sessionStorage.removeItem("user");
  });
};

const register = (
  userID,
  groupID,
  username,
  firstName,
  lastName,
  email,
  password,
  firebaseToken
) => {
  return axios
    .post(API_URL + "signup", {
      userID,
      groupID,
      username,
      firstName,
      lastName,
      email,
      password,
      firebaseToken,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", response.data);
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
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const getUser = (userID) => {
  return axios.get(API_URL + `getUser/${userID}`).then((response) => {
    if (response.data.accessToken) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const getUserInvites = async (userID) => {
  return axios
    .get(API_URL + `invites/${userID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const AuthService = {
  login,
  logout,
  register,
  edit,
  getUser,
  getUserInvites,
};

export default AuthService;
