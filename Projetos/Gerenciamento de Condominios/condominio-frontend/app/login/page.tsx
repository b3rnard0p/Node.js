"use client";
import { useState } from "react";
import { login } from "../../services/auth";
import { useRouter } from "next/navigation";
export default function LoginPage() {
 const [cpf, setCpf] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const router = useRouter();
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 try {
 await login(cpf, password);
 router.push("/");
 } catch {
 setError("Credenciais inválidas");
 }
 };
 return (
 <div className="flex flex-col items-center justify-center h-screen">
 <h1 className="text-2xl font-bold mb-4">Login</h1>
 <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
 <input
 type="text"
 placeholder="CPF"
 value={cpf}
 onChange={(e) => setCpf(e.target.value)}
 className="border p-2"
 />
 <input
 type="password"
 placeholder="Senha"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="border p-2"
 />
 {error && <p className="text-red-500">{error}</p>}
 <button className="bg-blue-500 text-white p-2">Entrar</button>
 </form>
 </div>
 );
}
