"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

type Comunicado = {
  ID_COMUNICADO: number;
  TITULO: string;
  MENSAGEM: string;
  DT_COMUNICADO: string | Date;
  HR_COMUNICADO: string | null;
  TIPO: string | null;
};

type FormState = {
  TITULO: string;
  MENSAGEM: string;
  DT_COMUNICADO: string;
  HR_COMUNICADO: string;
  TIPO: string;
};

const formVazio = (): FormState => ({
  TITULO: "",
  MENSAGEM: "",
  DT_COMUNICADO: new Date().toISOString().split("T")[0],
  HR_COMUNICADO: "",
  TIPO: "",
});

function normalizeTimeForApi(t: string): string | null {
  if (!t || !t.trim()) return null;
  return t.length === 5 ? `${t}:00` : t;
}

export default function ComunicadosPage() {
  const [rows, setRows] = useState<Comunicado[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Comunicado[]>("/comunicados");
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

  const abrirEditar = (c: Comunicado) => {
    setForm({
      TITULO: c.TITULO ?? "",
      MENSAGEM: c.MENSAGEM ?? "",
      DT_COMUNICADO: formatDateInput(c.DT_COMUNICADO),
      HR_COMUNICADO: formatTimeInput(c.HR_COMUNICADO),
      TIPO: c.TIPO ?? "",
    });
    setEditId(c.ID_COMUNICADO);
    setDialogOpen(true);
  };

  const salvar = async () => {
    if (!form.TITULO.trim()) {
      toast.error("Informe o título.");
      return;
    }
    if (!form.MENSAGEM.trim()) {
      toast.error("Informe a mensagem.");
      return;
    }
    setCarregando(true);
    const payload = {
      TITULO: form.TITULO.trim(),
      MENSAGEM: form.MENSAGEM.trim(),
      DT_COMUNICADO: new Date(`${form.DT_COMUNICADO}T12:00:00`),
      HR_COMUNICADO: normalizeTimeForApi(form.HR_COMUNICADO),
      TIPO: form.TIPO.trim() || null,
    };
    try {
      if (editId) {
        await api.put(`/comunicados/${editId}`, payload);
        toast.success("Comunicado atualizado!", { description: form.TITULO });
      } else {
        await api.post("/comunicados", payload);
        toast.success("Comunicado cadastrado!", { description: form.TITULO });
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
      await api.delete(`/comunicados/${excluirId}`);
      toast.success("Comunicado excluído.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Comunicados</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Comunicado
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.ID_COMUNICADO}>
                <TableCell>{c.ID_COMUNICADO}</TableCell>
                <TableCell className="max-w-[220px] truncate font-medium">{c.TITULO}</TableCell>
                <TableCell>{c.TIPO ?? "—"}</TableCell>
                <TableCell>
                  {new Date(c.DT_COMUNICADO as string).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(c.ID_COMUNICADO)}
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Editar Comunicado" : "Novo Comunicado"}</DialogTitle>
          </DialogHeader>
          <div className="grid max-h-[70vh] gap-4 overflow-y-auto py-4">
            <Input
              placeholder="Título"
              value={form.TITULO}
              onChange={(e) => setForm({ ...form, TITULO: e.target.value })}
            />
            <Textarea
              placeholder="Mensagem"
              className="min-h-[100px]"
              value={form.MENSAGEM}
              onChange={(e) => setForm({ ...form, MENSAGEM: e.target.value })}
            />
            <Input
              type="date"
              value={form.DT_COMUNICADO}
              onChange={(e) => setForm({ ...form, DT_COMUNICADO: e.target.value })}
            />
            <Input
              type="time"
              value={form.HR_COMUNICADO}
              onChange={(e) => setForm({ ...form, HR_COMUNICADO: e.target.value })}
            />
            <Input
              placeholder="Tipo (opcional)"
              value={form.TIPO}
              onChange={(e) => setForm({ ...form, TIPO: e.target.value })}
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
