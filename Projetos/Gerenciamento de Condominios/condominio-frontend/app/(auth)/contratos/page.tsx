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

type Contrato = {
  ID_CONTRATO: number;
  ID_FORNECEDOR: number;
  DESCRICAO: string | null;
  DATA_INICIO: string | Date | null;
  DATA_FIM: string | Date | null;
  VALOR: number | string | null;
};

type FormState = {
  ID_FORNECEDOR: string;
  DESCRICAO: string;
  DATA_INICIO: string;
  DATA_FIM: string;
  VALOR: string;
};

const formVazio = (): FormState => ({
  ID_FORNECEDOR: "",
  DESCRICAO: "",
  DATA_INICIO: "",
  DATA_FIM: "",
  VALOR: "",
});

export default function ContratosPage() {
  const [rows, setRows] = useState<Contrato[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Contrato[]>("/contratos");
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

  const abrirEditar = (c: Contrato) => {
    setForm({
      ID_FORNECEDOR: String(c.ID_FORNECEDOR),
      DESCRICAO: c.DESCRICAO ?? "",
      DATA_INICIO: c.DATA_INICIO ? formatDateInput(c.DATA_INICIO) : "",
      DATA_FIM: c.DATA_FIM ? formatDateInput(c.DATA_FIM) : "",
      VALOR: c.VALOR != null ? String(c.VALOR) : "",
    });
    setEditId(c.ID_CONTRATO);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_FORNECEDOR = Number(form.ID_FORNECEDOR);
    if (!Number.isFinite(ID_FORNECEDOR) || ID_FORNECEDOR <= 0) {
      toast.error("Informe um ID de fornecedor válido.");
      return;
    }
    const VALOR =
      form.VALOR.trim() === "" ? null : Number(String(form.VALOR).replace(",", "."));
    if (form.VALOR.trim() !== "" && !Number.isFinite(VALOR)) {
      toast.error("Valor inválido.");
      return;
    }
    setCarregando(true);
    const payload = {
      ID_FORNECEDOR,
      DESCRICAO: form.DESCRICAO.trim() || null,
      DATA_INICIO: form.DATA_INICIO ? new Date(`${form.DATA_INICIO}T12:00:00`) : null,
      DATA_FIM: form.DATA_FIM ? new Date(`${form.DATA_FIM}T12:00:00`) : null,
      VALOR,
    };
    try {
      if (editId) {
        await api.put(`/contratos/${editId}`, payload);
        toast.success("Contrato atualizado!");
      } else {
        await api.post("/contratos", payload);
        toast.success("Contrato cadastrado!");
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
      await api.delete(`/contratos/${excluirId}`);
      toast.success("Contrato excluído.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contratos</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Contrato
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.ID_CONTRATO}>
                <TableCell>{c.ID_CONTRATO}</TableCell>
                <TableCell className="font-medium">{c.ID_FORNECEDOR}</TableCell>
                <TableCell className="max-w-[160px] truncate">{c.DESCRICAO ?? "—"}</TableCell>
                <TableCell>
                  {c.DATA_INICIO
                    ? new Date(c.DATA_INICIO as string).toLocaleDateString("pt-BR")
                    : "—"}
                </TableCell>
                <TableCell>
                  {c.DATA_FIM
                    ? new Date(c.DATA_FIM as string).toLocaleDateString("pt-BR")
                    : "—"}
                </TableCell>
                <TableCell>{c.VALOR ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(c.ID_CONTRATO)}
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
            <DialogTitle>{editId ? "Editar Contrato" : "Novo Contrato"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Fornecedor"
              type="number"
              value={form.ID_FORNECEDOR}
              onChange={(e) => setForm({ ...form, ID_FORNECEDOR: e.target.value })}
            />
            <Input
              placeholder="Descrição"
              value={form.DESCRICAO}
              onChange={(e) => setForm({ ...form, DESCRICAO: e.target.value })}
            />
            <Input
              type="date"
              value={form.DATA_INICIO}
              onChange={(e) => setForm({ ...form, DATA_INICIO: e.target.value })}
            />
            <Input
              type="date"
              value={form.DATA_FIM}
              onChange={(e) => setForm({ ...form, DATA_FIM: e.target.value })}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Valor (opcional)"
              value={form.VALOR}
              onChange={(e) => setForm({ ...form, VALOR: e.target.value })}
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
