import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_SERVER_URL;

const login = (userID, username, password, fbToken) => {
  return axios
    .post(API_URL + "/auth/signin", { userID, username, password, fbToken })
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
  return axios
    .post(API_URL + "/auth/signout", { username, password })
    .then(() => {
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
    .post(API_URL + "/auth/signup", {
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
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const edit = (userID, username, firstName, lastName, email) => {
  return axios
    .put(API_URL + "/auth/edit", {
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
  return axios.get(API_URL + `/auth/getUser/${userID}`).then((response) => {
    if (response.data.accessToken) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const getUserInvites = async (userID) => {
  return axios
    .get(API_URL + `/auth/invites/${userID}`)
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
