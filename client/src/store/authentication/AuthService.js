import axios from "axios";

const API_URL = "https://studyDash-server.onrender.com/auth/";

const login = (userID, username, password) => {
  return axios
    .post(API_URL + "signin", { userID, username, password })
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
  password
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

const groupChat = (username, groupID) => {
  return axios
    .put(API_URL + "groupChat", {
      username,
      groupID,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const inviteUser = (username, groupID) => {
  return axios
    .put(API_URL + "inviteUser", {
      username,
      groupID,
    })
    .then((response) => {
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

const leaveChat = async (userInfo) => {
  return await axios
    .patch(API_URL + "leaveChat", userInfo)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const getGroupMembers = async (groupID) => {
  return await axios
    .get(API_URL + `members/${groupID}`)
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
  groupChat,
  inviteUser,
  getUser,
  leaveChat,
  getGroupMembers,
};

export default AuthService;
