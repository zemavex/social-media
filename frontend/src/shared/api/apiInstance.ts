import axios from "axios";
import { BACKEND_BASE_URL } from "shared/config";

export const apiInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});
