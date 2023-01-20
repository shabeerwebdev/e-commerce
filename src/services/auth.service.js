import axios from "axios";
// export const BASE_URL = "https://crowded-loincloth-crow.cyclic.app/api/";
export const BASE_URL = "https://attractive-plum-nightshirt.cyclic.app/api";
// export const BASE_URL = "http://localhost:8800/api";

const register = (username, email, password) => {
  return axios.post(BASE_URL + "/auth/register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(BASE_URL + "/auth/login", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      // if (response.data.jwt) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
