import axios from "axios";
import { backendBaseUrl } from "shared/config";

export const apiInstance = axios.create({
  baseURL: backendBaseUrl,
  withCredentials: true,
});
