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

type Unidade = {
  ID_UNIDADE: number;
  NUM_UNIDADE: string;
  BLOCO: string;
  TIPO: string | null;
  AREA_TOTAL: number | string | null;
};

type FormState = {
  NUM_UNIDADE: string;
  BLOCO: string;
  TIPO: string;
  AREA_TOTAL: string;
};

const formVazio = (): FormState => ({
  NUM_UNIDADE: "",
  BLOCO: "",
  TIPO: "",
  AREA_TOTAL: "",
});

export default function UnidadesPage() {
  const [rows, setRows] = useState<Unidade[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Unidade[]>("/unidades");
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

  const abrirEditar = (u: Unidade) => {
    setForm({
      NUM_UNIDADE: u.NUM_UNIDADE ?? "",
      BLOCO: u.BLOCO ?? "",
      TIPO: u.TIPO ?? "",
      AREA_TOTAL: u.AREA_TOTAL != null ? String(u.AREA_TOTAL) : "",
    });
    setEditId(u.ID_UNIDADE);
    setDialogOpen(true);
  };

  const salvar = async () => {
    if (!form.NUM_UNIDADE.trim() || !form.BLOCO.trim()) {
      toast.error("Preencha número e bloco.");
      return;
    }
    setCarregando(true);
    const AREA_TOTAL =
      form.AREA_TOTAL.trim() === "" ? null : Number(form.AREA_TOTAL.replace(",", "."));
    if (form.AREA_TOTAL.trim() !== "" && !Number.isFinite(AREA_TOTAL)) {
      toast.error("Área total inválida.");
      setCarregando(false);
      return;
    }
    const payload = {
      NUM_UNIDADE: form.NUM_UNIDADE.trim(),
      BLOCO: form.BLOCO.trim(),
      TIPO: form.TIPO.trim() || null,
      AREA_TOTAL,
    };
    try {
      if (editId) {
        await api.put(`/unidades/${editId}`, payload);
        toast.success("Unidade atualizada!", { description: form.NUM_UNIDADE });
      } else {
        await api.post("/unidades", payload);
        toast.success("Unidade cadastrada!", { description: form.NUM_UNIDADE });
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
      await api.delete(`/unidades/${excluirId}`);
      toast.success("Unidade excluída.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Unidades</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Unidade
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Bloco</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Área total</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((u) => (
              <TableRow key={u.ID_UNIDADE}>
                <TableCell>{u.ID_UNIDADE}</TableCell>
                <TableCell className="font-medium">{u.NUM_UNIDADE}</TableCell>
                <TableCell>{u.BLOCO}</TableCell>
                <TableCell>{u.TIPO ?? "—"}</TableCell>
                <TableCell>{u.AREA_TOTAL ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(u)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(u.ID_UNIDADE)}
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
            <DialogTitle>{editId ? "Editar Unidade" : "Nova Unidade"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Número"
              value={form.NUM_UNIDADE}
              onChange={(e) => setForm({ ...form, NUM_UNIDADE: e.target.value })}
            />
            <Input
              placeholder="Bloco"
              value={form.BLOCO}
              onChange={(e) => setForm({ ...form, BLOCO: e.target.value })}
            />
            <Input
              placeholder="Tipo (opcional)"
              value={form.TIPO}
              onChange={(e) => setForm({ ...form, TIPO: e.target.value })}
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Área total (opcional)"
              value={form.AREA_TOTAL}
              onChange={(e) => setForm({ ...form, AREA_TOTAL: e.target.value })}
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
