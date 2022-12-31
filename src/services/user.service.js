import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "https://crowded-loincloth-crow.cyclic.app/api/";

const getPublicContent = () => {
  return axios.get(BASE_URL + "all");
};

const getUserBoard = () => {
  return axios.get(BASE_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(BASE_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(BASE_URL + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService;
