import axios from "axios";
import authHeader from "./DataService";

const API_URL = process.env.REACT_APP_BASE_SERVER_URL + "/user";

const getUserBoard = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const UserService = {
  getUserBoard,
};

export default UserService;
