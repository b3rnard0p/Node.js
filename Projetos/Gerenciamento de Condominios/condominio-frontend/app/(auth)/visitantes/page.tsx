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

type Visitante = {
  ID_VISITANTE: number;
  ID_PESSOA: number;
  DOCUMENTO: string | null;
};

type FormState = { ID_PESSOA: string; DOCUMENTO: string };

const formVazio = (): FormState => ({ ID_PESSOA: "", DOCUMENTO: "" });

export default function VisitantesPage() {
  const [rows, setRows] = useState<Visitante[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Visitante[]>("/visitantes");
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

  const abrirEditar = (v: Visitante) => {
    setForm({
      ID_PESSOA: String(v.ID_PESSOA),
      DOCUMENTO: v.DOCUMENTO ?? "",
    });
    setEditId(v.ID_VISITANTE);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_PESSOA = Number(form.ID_PESSOA);
    if (!Number.isFinite(ID_PESSOA) || ID_PESSOA <= 0) {
      toast.error("Informe um ID de pessoa válido.");
      return;
    }
    setCarregando(true);
    const payload = {
      ID_PESSOA,
      DOCUMENTO: form.DOCUMENTO.trim() || null,
    };
    try {
      if (editId) {
        await api.put(`/visitantes/${editId}`, payload);
        toast.success("Visitante atualizado!");
      } else {
        await api.post("/visitantes", payload);
        toast.success("Visitante cadastrado!");
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
      await api.delete(`/visitantes/${excluirId}`);
      toast.success("Visitante excluído.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Visitantes</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Visitante
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ID Pessoa</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((v) => (
              <TableRow key={v.ID_VISITANTE}>
                <TableCell>{v.ID_VISITANTE}</TableCell>
                <TableCell className="font-medium">{v.ID_PESSOA}</TableCell>
                <TableCell>{v.DOCUMENTO ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(v)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(v.ID_VISITANTE)}
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
            <DialogTitle>{editId ? "Editar Visitante" : "Novo Visitante"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Pessoa"
              type="number"
              value={form.ID_PESSOA}
              onChange={(e) => setForm({ ...form, ID_PESSOA: e.target.value })}
            />
            <Input
              placeholder="Documento"
              value={form.DOCUMENTO}
              onChange={(e) => setForm({ ...form, DOCUMENTO: e.target.value })}
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
