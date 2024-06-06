import { AxiosHeaders } from "axios";

export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);


  const headers = new AxiosHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  if (user && user.token) {
    headers.set("Authorization", `Bearer ${user.token}`);
  }
  return headers;
}
