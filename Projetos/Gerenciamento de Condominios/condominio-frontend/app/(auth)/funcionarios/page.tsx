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
import { formatDateInput } from "@/lib/crud-helpers";

type Funcionario = {
  ID_FUNCIONARIO: number;
  ID_PESSOA: number;
  FUNCAO: string | null;
  DATA_ADMISSAO: string | Date | null;
  SALARIO: number | string | null;
};

type FormState = {
  ID_PESSOA: string;
  FUNCAO: string;
  DATA_ADMISSAO: string;
  SALARIO: string;
};

const formVazio = (): FormState => ({
  ID_PESSOA: "",
  FUNCAO: "",
  DATA_ADMISSAO: "",
  SALARIO: "",
});

export default function FuncionariosPage() {
  const [rows, setRows] = useState<Funcionario[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Funcionario[]>("/funcionarios");
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

  const abrirEditar = (f: Funcionario) => {
    setForm({
      ID_PESSOA: String(f.ID_PESSOA),
      FUNCAO: f.FUNCAO ?? "",
      DATA_ADMISSAO: f.DATA_ADMISSAO ? formatDateInput(f.DATA_ADMISSAO) : "",
      SALARIO: f.SALARIO != null ? String(f.SALARIO) : "",
    });
    setEditId(f.ID_FUNCIONARIO);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_PESSOA = Number(form.ID_PESSOA);
    if (!Number.isFinite(ID_PESSOA) || ID_PESSOA <= 0) {
      toast.error("Informe um ID de pessoa válido.");
      return;
    }
    setCarregando(true);
    const SALARIO =
      form.SALARIO.trim() === "" ? null : Number(form.SALARIO.replace(",", "."));
    if (form.SALARIO.trim() !== "" && !Number.isFinite(SALARIO)) {
      toast.error("Salário inválido.");
      setCarregando(false);
      return;
    }
    const payload = {
      ID_PESSOA,
      FUNCAO: form.FUNCAO.trim() || null,
      DATA_ADMISSAO: form.DATA_ADMISSAO
        ? new Date(`${form.DATA_ADMISSAO}T12:00:00`)
        : null,
      SALARIO,
    };
    try {
      if (editId) {
        await api.put(`/funcionarios/${editId}`, payload);
        toast.success("Funcionário atualizado!");
      } else {
        await api.post("/funcionarios", payload);
        toast.success("Funcionário cadastrado!");
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
      await api.delete(`/funcionarios/${excluirId}`);
      toast.success("Funcionário excluído.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Funcionários</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Funcionário
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ID Pessoa</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Admissão</TableHead>
              <TableHead>Salário</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((f) => (
              <TableRow key={f.ID_FUNCIONARIO}>
                <TableCell>{f.ID_FUNCIONARIO}</TableCell>
                <TableCell className="font-medium">{f.ID_PESSOA}</TableCell>
                <TableCell>{f.FUNCAO ?? "—"}</TableCell>
                <TableCell>
                  {f.DATA_ADMISSAO
                    ? new Date(f.DATA_ADMISSAO as string).toLocaleDateString("pt-BR")
                    : "—"}
                </TableCell>
                <TableCell>{f.SALARIO ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(f)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(f.ID_FUNCIONARIO)}
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
            <DialogTitle>{editId ? "Editar Funcionário" : "Novo Funcionário"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Pessoa"
              type="number"
              value={form.ID_PESSOA}
              onChange={(e) => setForm({ ...form, ID_PESSOA: e.target.value })}
            />
            <Input
              placeholder="Função"
              value={form.FUNCAO}
              onChange={(e) => setForm({ ...form, FUNCAO: e.target.value })}
            />
            <Input
              type="date"
              value={form.DATA_ADMISSAO}
              onChange={(e) => setForm({ ...form, DATA_ADMISSAO: e.target.value })}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Salário"
              value={form.SALARIO}
              onChange={(e) => setForm({ ...form, SALARIO: e.target.value })}
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
