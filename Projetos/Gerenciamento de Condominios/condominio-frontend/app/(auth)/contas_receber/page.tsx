"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { SELECT_EMPTY, formatDateInput } from "@/lib/crud-helpers";

type ContaReceber = {
  ID_CONTA_RECEBER: number;
  ID_MORADOR: number;
  DESCRICAO: string | null;
  VALOR: number | string | null;
  DATA_VENCIMENTO: string | Date | null;
  STATUS: string | null;
};

type FormState = {
  ID_MORADOR: string;
  DESCRICAO: string;
  VALOR: string;
  DATA_VENCIMENTO: string;
  STATUS: string;
};

const formVazio = (): FormState => ({
  ID_MORADOR: "",
  DESCRICAO: "",
  VALOR: "",
  DATA_VENCIMENTO: "",
  STATUS: "",
});

export default function ContasReceberPage() {
  const [rows, setRows] = useState<ContaReceber[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<ContaReceber[]>("/contas_receber");
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

  const abrirEditar = (c: ContaReceber) => {
    setForm({
      ID_MORADOR: String(c.ID_MORADOR),
      DESCRICAO: c.DESCRICAO ?? "",
      VALOR: c.VALOR != null ? String(c.VALOR) : "",
      DATA_VENCIMENTO: c.DATA_VENCIMENTO ? formatDateInput(c.DATA_VENCIMENTO) : "",
      STATUS: c.STATUS ?? "",
    });
    setEditId(c.ID_CONTA_RECEBER);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_MORADOR = Number(form.ID_MORADOR);
    if (!Number.isFinite(ID_MORADOR) || ID_MORADOR <= 0) {
      toast.error("Informe um ID de morador válido.");
      return;
    }
    if (!form.STATUS) {
      toast.error("Selecione o status.");
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
      ID_MORADOR,
      DESCRICAO: form.DESCRICAO.trim() || null,
      VALOR,
      DATA_VENCIMENTO: form.DATA_VENCIMENTO
        ? new Date(`${form.DATA_VENCIMENTO}T12:00:00`)
        : null,
      STATUS: form.STATUS,
    };
    try {
      if (editId) {
        await api.put(`/contas_receber/${editId}`, payload);
        toast.success("Conta atualizada!");
      } else {
        await api.post("/contas_receber", payload);
        toast.success("Conta cadastrada!");
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
      await api.delete(`/contas_receber/${excluirId}`);
      toast.success("Conta excluída.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contas a receber</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Morador</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => (
              <TableRow key={c.ID_CONTA_RECEBER}>
                <TableCell>{c.ID_CONTA_RECEBER}</TableCell>
                <TableCell className="font-medium">{c.ID_MORADOR}</TableCell>
                <TableCell className="max-w-[180px] truncate">{c.DESCRICAO ?? "—"}</TableCell>
                <TableCell>{c.VALOR ?? "—"}</TableCell>
                <TableCell>
                  {c.DATA_VENCIMENTO
                    ? new Date(c.DATA_VENCIMENTO as string).toLocaleDateString("pt-BR")
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{c.STATUS ?? "—"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(c.ID_CONTA_RECEBER)}
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
            <DialogTitle>{editId ? "Editar Conta" : "Nova Conta a Receber"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Morador"
              type="number"
              value={form.ID_MORADOR}
              onChange={(e) => setForm({ ...form, ID_MORADOR: e.target.value })}
            />
            <Input
              placeholder="Descrição"
              value={form.DESCRICAO}
              onChange={(e) => setForm({ ...form, DESCRICAO: e.target.value })}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Valor (opcional)"
              value={form.VALOR}
              onChange={(e) => setForm({ ...form, VALOR: e.target.value })}
            />
            <Input
              type="date"
              value={form.DATA_VENCIMENTO}
              onChange={(e) => setForm({ ...form, DATA_VENCIMENTO: e.target.value })}
            />
            <Select
              value={form.STATUS === "" ? SELECT_EMPTY : form.STATUS}
              onValueChange={(v) =>
                setForm({ ...form, STATUS: v === SELECT_EMPTY || v == null ? "" : v })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SELECT_EMPTY}>Selecione</SelectItem>
                <SelectItem value="ABERTO">Aberto</SelectItem>
                <SelectItem value="PAGO">Pago</SelectItem>
                <SelectItem value="ATRASADO">Atrasado</SelectItem>
              </SelectContent>
            </Select>
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
