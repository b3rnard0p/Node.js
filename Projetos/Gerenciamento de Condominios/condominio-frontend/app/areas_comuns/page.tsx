"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
export default function AreasComunsPage() {
 const [areas, setAreas] = useState<any[]>([]);
 const [form, setForm] = useState({ NOME_AREA: "", DESCR_AREA: "", CAPACIDADE:
"" });
 const [editId, setEditId] = useState<number | null>(null);
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
 const res = await api.get("/areas_comuns");
 setAreas(res.data);
 };
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/areas_comuns/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/areas_comuns", form);
 }
 setForm({ NOME_AREA: "", DESCR_AREA: "", CAPACIDADE: "" });
 carregar();
 };
 const handleDelete = async (id: number) => {
 await api.delete(`/areas_comuns/${id}`);
 carregar();
 };
 const handleEdit = (a: any) => {
 setForm({ NOME_AREA: a.NOME_AREA, DESCR_AREA: a.DESCR_AREA, CAPACIDADE:
a.CAPACIDADE });
 setEditId(a.ID_AREA_COMUM);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Áreas Comuns</h1>
 <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
 <input placeholder="Nome" value={form.NOME_AREA} onChange={e =>
setForm({ ...form, NOME_AREA: e.target.value })}/>
 <input placeholder="Descrição" value={form.DESCR_AREA} onChange={e =>
setForm({ ...form, DESCR_AREA: e.target.value })}/>
 <input type="number" placeholder="Capacidade" value={form.CAPACIDADE}
onChange={e => setForm({ ...form, CAPACIDADE: e.target.value })}/>
 <button className="bg-blue-500 text-white px-4">{editId ? "Atualizar" :
"Salvar"}</button>
 </form>
 <ul className="mt-6">
 {areas.map((a: any) => (
 <li key={a.ID_AREA_COMUM} className="flex gap-2">
 {a.NOME_AREA} - Capacidade {a.CAPACIDADE}
 <button onClick={() => handleEdit(a)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(a.ID_AREA_COMUM)} className="bgred-500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}