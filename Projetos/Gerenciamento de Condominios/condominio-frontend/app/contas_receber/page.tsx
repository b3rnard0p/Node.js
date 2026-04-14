"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
export default function ContasReceberPage() {
 const [contas, setContas] = useState<any[]>([]);
 const [form, setForm] = useState({ ID_MORADOR: "", DESCRICAO: "", VALOR: "",
DATA_VENCIMENTO: "", STATUS: "" });
 const [editId, setEditId] = useState<number | null>(null);
 // Carregar lista inicial
 useEffect(() => { carregar(); }, []);
 const carregar = async () => {
 const res = await api.get("/contas_receber");
 setContas(res.data);
 };
 // Criar ou editar
 const handleSubmit = async (e: any) => {
 e.preventDefault();
 if (editId) {
 await api.put(`/contas_receber/${editId}`, form);
 setEditId(null);
 } else {
 await api.post("/contas_receber", form);
 }
 setForm({ ID_MORADOR: "", DESCRICAO: "", VALOR: "", DATA_VENCIMENTO: "",
STATUS: "" });
 carregar();
 };
 // Excluir
 const handleDelete = async (id: number) => {
 await api.delete(`/contas_receber/${id}`);
 carregar();
 };
 // Preparar edição
 const handleEdit = (c: any) => {
 setForm({ ID_MORADOR: c.ID_MORADOR, DESCRICAO: c.DESCRICAO, VALOR: c.VALOR,
DATA_VENCIMENTO: c.DATA_VENCIMENTO, STATUS: c.STATUS });
 setEditId(c.ID_CONTA_RECEBER);
 };
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold">Contas a Receber</h1>
 <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
 <input placeholder="ID Morador" value={form.ID_MORADOR} onChange={e =>
setForm({ ...form, ID_MORADOR: e.target.value })}/>
 <input placeholder="Descrição" value={form.DESCRICAO} onChange={e =>
setForm({ ...form, DESCRICAO: e.target.value })}/>
 <input type="number" placeholder="Valor" value={form.VALOR} onChange={e=> setForm({ ...form, VALOR: e.target.value })}/>
 <input type="date" value={form.DATA_VENCIMENTO} onChange={e => setForm({
...form, DATA_VENCIMENTO: e.target.value })}/>
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
 {contas.map((c: any) => (
 <li key={c.ID_CONTA_RECEBER} className="flex gap-2">
 Morador {c.ID_MORADOR} - {c.DESCRICAO} - Valor {c.VALOR} -
{c.STATUS}
 <button onClick={() => handleEdit(c)} className="bg-yellow-500 px2">Editar</button>
 <button onClick={() => handleDelete(c.ID_CONTA_RECEBER)}
className="bg-red-500 px-2">Excluir</button>
 </li>
 ))}
 </ul>
 </div>
 );
}