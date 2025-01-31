import axios from "axios";

export const apiInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});
