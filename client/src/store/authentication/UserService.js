import axios from "axios";
import authHeader from "./DataService";

const API_URL = "http://localhost:8080/user";

const getUserBoard = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const UserService = {
  getUserBoard,
};

export default UserService;
