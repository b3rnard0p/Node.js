import api from "./api";
import Cookies from "js-cookie";

/** O backend NestJS espera `CPF` e `password` no corpo da requisição. */
export async function login(cpf: string, password: string) {
  const res = await api.post("/auth/login", { CPF: cpf, password });
  Cookies.set("token", res.data.access_token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 1,
  });
  return res.data;
}

export function logout() {
  Cookies.remove("token");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export function getToken(): string | undefined {
  return Cookies.get("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
