"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
export default function BoletosPage() {
 const [boletos, setBoletos] = useState<any[]>([]);
 const [form, setForm] = useState({ ID_MORADOR: "", VL_BOLETO: "",
DT_VENCIMENTO: "", STATUS: "" });
 const [editId, setEditId] = useState<number | null>(null);
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
 const res = await api.get("/boletos");
 setBoletos(res.data);
 };
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/boletos/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/boletos", form);
 }
 setForm({ ID_MORADOR: "", VL_BOLETO: "", DT_VENCIMENTO: "", STATUS: "" });
 carregar();
 };
 const handleDelete = async (id: number) => {
 await api.delete(`/boletos/${id}`);
 carregar();
 };
 const handleEdit = (b: any) => {
 setForm({ ID_MORADOR: b.ID_MORADOR, VL_BOLETO: b.VL_BOLETO, DT_VENCIMENTO:
b.DT_VENCIMENTO, STATUS: b.STATUS });
 setEditId(b.ID_BOLETO);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Boletos</h1>
 <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
 <input placeholder="ID Morador" value={form.ID_MORADOR} onChange={e =>
setForm({ ...form, ID_MORADOR: e.target.value })}/>
 <input type="number" placeholder="Valor" value={form.VL_BOLETO}
onChange={e => setForm({ ...form, VL_BOLETO: e.target.value })}/>
 <input type="date" value={form.DT_VENCIMENTO} onChange={e =>
setForm({ ...form, DT_VENCIMENTO: e.target.value })}/>
 <select value={form.STATUS} onChange={e => setForm({ ...form, STATUS:
e.target.value })}>
 <option value="">Selecione</option>
 <option value="ABERTO">Aberto</option>
 <option value="PAGO">Pago</option>
 <option value="ATRASADO">Atrasado</option>
 </select>
 <button className="bg-blue-500 text-white px-4">{editId ? "Atualizar" :
"Salvar"}</button>
 </form>
 <ul className="mt-6">
 {boletos.map((b: any) => (
 <li key={b.ID_BOLETO} className="flex gap-2">
 Morador {b.ID_MORADOR} - Valor {b.VL_BOLETO} - {b.STATUS}
 <button onClick={() => handleEdit(b)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(b.ID_BOLETO)} className="bg-red500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}
