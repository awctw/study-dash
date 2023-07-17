import axios from "axios";
import authHeader from "./DataService";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/user"
    : "https://studyDash-server.onrender.com/user";

const getUserBoard = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const UserService = {
  getUserBoard,
};

export default UserService;
