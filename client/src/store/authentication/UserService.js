import axios from "axios";
import authHeader from "./DataService";

const API_URL = "https://studyDash-server.onrender.com/user";

const getUserBoard = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const UserService = {
  getUserBoard,
};

export default UserService;
