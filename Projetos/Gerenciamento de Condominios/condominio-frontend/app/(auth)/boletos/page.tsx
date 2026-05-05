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

type Boleto = {
  ID_BOLETO: number;
  ID_MORADOR: number;
  VL_BOLETO: number | string;
  DT_VENCIMENTO: string | Date;
  STATUS: string | null;
};

type FormState = {
  ID_MORADOR: string;
  VL_BOLETO: string;
  DT_VENCIMENTO: string;
  STATUS: string;
};

const formVazio = (): FormState => ({
  ID_MORADOR: "",
  VL_BOLETO: "",
  DT_VENCIMENTO: new Date().toISOString().split("T")[0],
  STATUS: "",
});

export default function BoletosPage() {
  const [rows, setRows] = useState<Boleto[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Boleto[]>("/boletos");
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

  const abrirEditar = (b: Boleto) => {
    setForm({
      ID_MORADOR: String(b.ID_MORADOR),
      VL_BOLETO: String(b.VL_BOLETO),
      DT_VENCIMENTO: formatDateInput(b.DT_VENCIMENTO),
      STATUS: b.STATUS ?? "",
    });
    setEditId(b.ID_BOLETO);
    setDialogOpen(true);
  };

  const salvar = async () => {
    const ID_MORADOR = Number(form.ID_MORADOR);
    if (!Number.isFinite(ID_MORADOR) || ID_MORADOR <= 0) {
      toast.error("Informe um ID de morador válido.");
      return;
    }
    const VL_BOLETO = Number(String(form.VL_BOLETO).replace(",", "."));
    if (!Number.isFinite(VL_BOLETO) || VL_BOLETO < 0) {
      toast.error("Valor do boleto inválido.");
      return;
    }
    if (!form.STATUS) {
      toast.error("Selecione o status.");
      return;
    }
    setCarregando(true);
    const payload = {
      ID_MORADOR,
      VL_BOLETO,
      DT_VENCIMENTO: new Date(`${form.DT_VENCIMENTO}T12:00:00`),
      STATUS: form.STATUS,
    };
    try {
      if (editId) {
        await api.put(`/boletos/${editId}`, payload);
        toast.success("Boleto atualizado!");
      } else {
        await api.post("/boletos", payload);
        toast.success("Boleto cadastrado!");
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
      await api.delete(`/boletos/${excluirId}`);
      toast.success("Boleto excluído.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Boletos</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Boleto
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Morador</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((b) => (
              <TableRow key={b.ID_BOLETO}>
                <TableCell>{b.ID_BOLETO}</TableCell>
                <TableCell className="font-medium">{b.ID_MORADOR}</TableCell>
                <TableCell>{b.VL_BOLETO}</TableCell>
                <TableCell>
                  {new Date(b.DT_VENCIMENTO as string).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{b.STATUS ?? "—"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(b)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(b.ID_BOLETO)}
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
            <DialogTitle>{editId ? "Editar Boleto" : "Novo Boleto"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="ID Morador"
              type="number"
              value={form.ID_MORADOR}
              onChange={(e) => setForm({ ...form, ID_MORADOR: e.target.value })}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Valor"
              value={form.VL_BOLETO}
              onChange={(e) => setForm({ ...form, VL_BOLETO: e.target.value })}
            />
            <Input
              type="date"
              value={form.DT_VENCIMENTO}
              onChange={(e) => setForm({ ...form, DT_VENCIMENTO: e.target.value })}
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
