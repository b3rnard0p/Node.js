"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
export default function VisitantesPage() {
 const [visitantes, setVisitantes] = useState<any[]>([]);
 const [form, setForm] = useState({ ID_PESSOA: "", DOCUMENTO: "" });
 const [editId, setEditId] = useState<number | null>(null);
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
 const res = await api.get("/visitantes");
 setVisitantes(res.data);
 };
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/visitantes/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/visitantes", form);
 }
 setForm({ ID_PESSOA: "", DOCUMENTO: "" });
 carregar();
 };
 const handleDelete = async (id: number) => {
 await api.delete(`/visitantes/${id}`);
 carregar();
 };
 const handleEdit = (v: any) => {
 setForm({ ID_PESSOA: v.ID_PESSOA, DOCUMENTO: v.DOCUMENTO });
 setEditId(v.ID_VISITANTE);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Visitantes</h1>
 <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
 <input placeholder="ID Pessoa" value={form.ID_PESSOA} onChange={e =>
setForm({ ...form, ID_PESSOA: e.target.value })}/>
 <input placeholder="Documento" value={form.DOCUMENTO} onChange={e =>
setForm({ ...form, DOCUMENTO: e.target.value })}/>
 <button className="bg-blue-500 text-white px-4">{editId ? "Atualizar" :
"Salvar"}</button>
 </form>
 <ul className="mt-6">
 {visitantes.map((v: any) => (
 <li key={v.ID_VISITANTE} className="flex gap-2">
 Pessoa {v.ID_PESSOA} - Documento {v.DOCUMENTO}
 <button onClick={() => handleEdit(v)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(v.ID_VISITANTE)} className="bgred-500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}