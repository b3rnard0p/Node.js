"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";
export default function FornecedoresPage() {
 const [fornecedores, setFornecedores] = useState<any[]>([]);
 const [form, setForm] = useState({ ID_PESSOA: "", AREA_ATUACAO: "" });
 const router = useRouter();
 const [editId, setEditId] = useState<number | null>(null);
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
    try {
        const res = await api.get("/fornecedores");
        setFornecedores(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push("/login");
        }
      }
 };
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/fornecedores/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/fornecedores", form);
 }
 setForm({ ID_PESSOA: "", AREA_ATUACAO: "" });
 carregar();
 };
 const handleDelete = async (id: number) => {
 await api.delete(`/fornecedores/${id}`);
 carregar();
 };
 const handleEdit = (f: any) => {
 setForm({ ID_PESSOA: f.ID_PESSOA, AREA_ATUACAO: f.AREA_ATUACAO });
 setEditId(f.ID_FORNECEDOR);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Fornecedores</h1>
 <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
 <input placeholder="ID Pessoa" value={form.ID_PESSOA} onChange={e =>
setForm({ ...form, ID_PESSOA: e.target.value })}/>
 <input placeholder="Área de Atuação" value={form.AREA_ATUACAO}
onChange={e => setForm({ ...form, AREA_ATUACAO: e.target.value })}/>
 <button className="bg-blue-500 text-white px-4">{editId ? "Atualizar" :
"Salvar"}</button>
 </form>
 <ul className="mt-6">
 {fornecedores.map((f: any) => (
 <li key={f.ID_FORNECEDOR} className="flex gap-2">
 Pessoa {f.ID_PESSOA} - Área {f.AREA_ATUACAO}
 <button onClick={() => handleEdit(f)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(f.ID_FORNECEDOR)} className="bgred-500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}