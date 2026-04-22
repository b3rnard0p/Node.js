"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";
export default function ComunicadosPage() {
 const [comunicados, setComunicados] = useState<any[]>([]);
 const [form, setForm] = useState({ TITULO: "", MENSAGEM: "", DT_COMUNICADO:
"", HR_COMUNICADO: "", TIPO: "" });
 const [editId, setEditId] = useState<number | null>(null);
 const router = useRouter();
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
    try {
        const res = await api.get("/comunicados");
        setComunicados(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push("/login");
        }
      }
 };
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/comunicados/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/comunicados", form);
 }
 setForm({ TITULO: "", MENSAGEM: "", DT_COMUNICADO: "", HR_COMUNICADO: "",
TIPO: "" });
 carregar();
 };
 const handleDelete = async (id: number) => {
 await api.delete(`/comunicados/${id}`);
 carregar();
 };
 const handleEdit = (c: any) => {
 setForm({ TITULO: c.TITULO, MENSAGEM: c.MENSAGEM, DT_COMUNICADO:
c.DT_COMUNICADO, HR_COMUNICADO: c.HR_COMUNICADO, TIPO: c.TIPO });
 setEditId(c.ID_COMUNICADO);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Comunicados</h1>
 <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
 <input placeholder="Título" value={form.TITULO} onChange={e => setForm({
...form, TITULO: e.target.value })}/>
 <textarea placeholder="Mensagem" value={form.MENSAGEM} onChange={e =>
setForm({ ...form, MENSAGEM: e.target.value })}/>
 <input type="date" value={form.DT_COMUNICADO} onChange={e =>
setForm({ ...form, DT_COMUNICADO: e.target.value })}/>
 <input type="time" value={form.HR_COMUNICADO} onChange={e =>
setForm({ ...form, HR_COMUNICADO: e.target.value })}/>
 <input placeholder="Tipo" value={form.TIPO} onChange={e =>
setForm({ ...form, TIPO: e.target.value })}/>
 <button className="bg-blue-500 text-white px-4">{editId ? "Atualizar" :
"Salvar"}</button>
 </form>
 <ul className="mt-6">
 {comunicados.map((c: any) => (
 <li key={c.ID_COMUNICADO} className="flex gap-2">
 {c.TITULO} - {c.TIPO}
 <button onClick={() => handleEdit(c)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(c.ID_COMUNICADO)} className="bgred-500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}