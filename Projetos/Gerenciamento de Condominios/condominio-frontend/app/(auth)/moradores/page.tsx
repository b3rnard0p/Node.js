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

type Morador = {
  ID_MORADOR: number;
  ID_PESSOA: number;
  ID_UNIDADE: number;
};

type FormState = { ID_PESSOA: string; ID_UNIDADE: string };

const formVazio = (): FormState => ({ ID_PESSOA: "", ID_UNIDADE: "" });

export default function MoradoresPage() {
  const [rows, setRows] = useState<Morador[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Morador[]>("/moradores");
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

  const abrirEditar = (m: Morador) => {
    setForm({
      ID_PESSOA: String(m.ID_PESSOA),
      ID_UNIDADE: String(m.ID_UNIDADE),
    });
    setEditId(m.ID_MORADOR);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_PESSOA = Number(form.ID_PESSOA);
    const ID_UNIDADE = Number(form.ID_UNIDADE);
    if (!Number.isFinite(ID_PESSOA) || ID_PESSOA <= 0) {
      toast.error("Informe um ID de pessoa válido.");
      return;
    }
    if (!Number.isFinite(ID_UNIDADE) || ID_UNIDADE <= 0) {
      toast.error("Informe um ID de unidade válido.");
      return;
    }
    setCarregando(true);
    try {
      const payload = { ID_PESSOA, ID_UNIDADE };
      if (editId) {
        await api.put(`/moradores/${editId}`, payload);
        toast.success("Morador atualizado!");
      } else {
        await api.post("/moradores", payload);
        toast.success("Morador cadastrado!");
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
      await api.delete(`/moradores/${excluirId}`);
      toast.success("Morador excluído.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Moradores</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Morador
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ID Pessoa</TableHead>
              <TableHead>ID Unidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((m) => (
              <TableRow key={m.ID_MORADOR}>
                <TableCell>{m.ID_MORADOR}</TableCell>
                <TableCell className="font-medium">{m.ID_PESSOA}</TableCell>
                <TableCell>{m.ID_UNIDADE}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(m)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(m.ID_MORADOR)}
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
            <DialogTitle>{editId ? "Editar Morador" : "Novo Morador"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Pessoa"
              type="number"
              value={form.ID_PESSOA}
              onChange={(e) => setForm({ ...form, ID_PESSOA: e.target.value })}
            />
            <Input
              placeholder="ID Unidade"
              type="number"
              value={form.ID_UNIDADE}
              onChange={(e) => setForm({ ...form, ID_UNIDADE: e.target.value })}
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
