import api from "./api";
import Cookies from "js-cookie";

export async function login(cpf: string, password: string) {
  const res = await api.post("/auth/login", { 
    CPF: cpf, 
    password: password 
  });
  
  Cookies.set("token", res.data.access_token, { secure: true });
  return res.data;
}

export function logout() {
  Cookies.remove("token");
}

export function getToken() {
  return Cookies.get("token");
}