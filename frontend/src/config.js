import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://kedarpin.herokuapp.com/api/",
});
