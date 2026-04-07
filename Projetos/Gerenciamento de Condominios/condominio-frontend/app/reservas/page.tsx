"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
export default function ReservasPage() {
 const [reservas, setReservas] = useState<any[]>([]);
 const [form, setForm] = useState({ ID_MORADOR: "", ID_AREA_COMUM: "",
DATA_RESERVA: "", HR_INICIO: "", HR_FIM: "" });
 const [editId, setEditId] = useState<number | null>(null);
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
 const res = await api.get("/reservas");
 setReservas(res.data);
 };
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/reservas/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/reservas", form);
 }
 setForm({ ID_MORADOR: "", ID_AREA_COMUM: "", DATA_RESERVA: "", HR_INICIO:
"", HR_FIM: "" });
 carregar();
 };
 const handleDelete = async (id: number) => {
 await api.delete(`/reservas/${id}`);
 carregar();
 };
 const handleEdit = (r: any) => {
 setForm({ ID_MORADOR: r.ID_MORADOR, ID_AREA_COMUM: r.ID_AREA_COMUM,
DATA_RESERVA: r.DATA_RESERVA, HR_INICIO: r.HR_INICIO, HR_FIM: r.HR_FIM });
 setEditId(r.ID_RESERVA);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Reservas</h1>
 <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
 <input placeholder="ID Morador" value={form.ID_MORADOR} onChange={e =>
setForm({ ...form, ID_MORADOR: e.target.value })}/>
 <input placeholder="ID Área Comum" value={form.ID_AREA_COMUM}
onChange={e => setForm({ ...form, ID_AREA_COMUM: e.target.value })}/>
 <input type="date" value={form.DATA_RESERVA} onChange={e =>
setForm({ ...form, DATA_RESERVA: e.target.value })}/>
 <input type="time" value={form.HR_INICIO} onChange={e =>
setForm({ ...form, HR_INICIO: e.target.value })}/>
 <input type="time" value={form.HR_FIM} onChange={e => setForm({ ...form,
HR_FIM: e.target.value })}/>
 <button className="bg-blue-500 text-white px-4">{editId ? "Atualizar" :
"Salvar"}</button>
 </form>
 <ul className="mt-6">
 {reservas.map((r: any) => (
 <li key={r.ID_RESERVA} className="flex gap-2">
 {r.DATA_RESERVA} - {r.HR_INICIO} até {r.HR_FIM}
 <button onClick={() => handleEdit(r)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(r.ID_RESERVA)} className="bgred-500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}