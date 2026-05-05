"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDateInput, formatTimeInput } from "@/lib/crud-helpers";

type Reserva = {
  ID_RESERVA: number;
  ID_MORADOR: number;
  ID_AREA_COMUM: number;
  DATA_RESERVA: string | Date;
  HR_INICIO: string | null;
  HR_FIM: string | null;
};

type FormState = {
  ID_MORADOR: string;
  ID_AREA_COMUM: string;
  DATA_RESERVA: string;
  HR_INICIO: string;
  HR_FIM: string;
};

const formVazio = (): FormState => ({
  ID_MORADOR: "",
  ID_AREA_COMUM: "",
  DATA_RESERVA: new Date().toISOString().split("T")[0],
  HR_INICIO: "",
  HR_FIM: "",
});

function normalizeTimeForApi(t: string): string | null {
  if (!t || !t.trim()) return null;
  return t.length === 5 ? `${t}:00` : t;
}

export default function ReservasPage() {
  const [rows, setRows] = useState<Reserva[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Reserva[]>("/reservas");
    setRows(res.data);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const abrirNovo = () => {
    setForm(formVazio());
    setEditId(null);
    setDialogOpen(true);
  };

  const abrirEditar = (r: Reserva) => {
    setForm({
      ID_MORADOR: String(r.ID_MORADOR),
      ID_AREA_COMUM: String(r.ID_AREA_COMUM),
      DATA_RESERVA: formatDateInput(r.DATA_RESERVA),
      HR_INICIO: formatTimeInput(r.HR_INICIO),
      HR_FIM: formatTimeInput(r.HR_FIM),
    });
    setEditId(r.ID_RESERVA);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_MORADOR = Number(form.ID_MORADOR);
    const ID_AREA_COMUM = Number(form.ID_AREA_COMUM);
    if (!Number.isFinite(ID_MORADOR) || ID_MORADOR <= 0) {
      toast.error("Informe um ID de morador válido.");
      return;
    }
    if (!Number.isFinite(ID_AREA_COMUM) || ID_AREA_COMUM <= 0) {
      toast.error("Informe um ID de área comum válido.");
      return;
    }
    setCarregando(true);
    const payload = {
      ID_MORADOR,
      ID_AREA_COMUM,
      DATA_RESERVA: new Date(`${form.DATA_RESERVA}T12:00:00`),
      HR_INICIO: normalizeTimeForApi(form.HR_INICIO),
      HR_FIM: normalizeTimeForApi(form.HR_FIM),
    };
    try {
      if (editId) {
        await api.put(`/reservas/${editId}`, payload);
        toast.success("Reserva atualizada!");
      } else {
        await api.post("/reservas", payload);
        toast.success("Reserva cadastrada!");
      }
      setDialogOpen(false);
      carregar();
    } catch {
      toast.error("Não foi possível salvar.");
    } finally {
      setCarregando(false);
    }
  };

  const confirmarExclusao = async () => {
    if (!excluirId) return;
    try {
      await api.delete(`/reservas/${excluirId}`);
      toast.success("Reserva excluída.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reservas</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Reserva
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Morador</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.ID_RESERVA}>
                <TableCell>{r.ID_RESERVA}</TableCell>
                <TableCell className="font-medium">{r.ID_MORADOR}</TableCell>
                <TableCell>{r.ID_AREA_COMUM}</TableCell>
                <TableCell>
                  {new Date(r.DATA_RESERVA as string).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{formatTimeInput(r.HR_INICIO) || "—"}</TableCell>
                <TableCell>{formatTimeInput(r.HR_FIM) || "—"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(r)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(r.ID_RESERVA)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "Editar Reserva" : "Nova Reserva"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Morador"
              type="number"
              value={form.ID_MORADOR}
              onChange={(e) => setForm({ ...form, ID_MORADOR: e.target.value })}
            />
            <Input
              placeholder="ID Área comum"
              type="number"
              value={form.ID_AREA_COMUM}
              onChange={(e) => setForm({ ...form, ID_AREA_COMUM: e.target.value })}
            />
            <Input
              type="date"
              value={form.DATA_RESERVA}
              onChange={(e) => setForm({ ...form, DATA_RESERVA: e.target.value })}
            />
            <Input
              type="time"
              value={form.HR_INICIO}
              onChange={(e) => setForm({ ...form, HR_INICIO: e.target.value })}
            />
            <Input
              type="time"
              value={form.HR_FIM}
              onChange={(e) => setForm({ ...form, HR_FIM: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={salvar} disabled={carregando}>
              {carregando ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!excluirId} onOpenChange={(open) => !open && setExcluirId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmarExclusao}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
