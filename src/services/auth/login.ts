import type { ILogin } from "../../types/requests/IAuth";
import { apiClient } from "../config";

async function login(data: ILogin) {
  const res = await apiClient.post("/api/auth/login/", data);
  console.log("Login response:", res.data);
  return res.data;
}

export default login;
