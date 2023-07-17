import axios from "axios";

const API_URL = process.env.BASE_SERVER_URL;

const login = (userID, username, password) => {
  return axios
    .post(API_URL + "auth/signin", { userID, username, password })
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
  password
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

const groupChat = (username, groupID) => {
  return axios
    .put(API_URL + "/auth/groupChat", {
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
    .put(API_URL + "/auth/inviteUser", {
      username,
      groupID,
    })
    .then((response) => {
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

const leaveChat = async (userInfo) => {
  return await axios
    .patch(API_URL + "/auth/leaveChat", userInfo)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const getGroupMembers = async (groupID) => {
  return await axios
    .get(API_URL + `/auth/members/${groupID}`)
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
