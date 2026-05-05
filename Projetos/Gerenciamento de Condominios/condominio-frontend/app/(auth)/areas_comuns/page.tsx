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

type AreaComum = {
  ID_AREA_COMUM: number;
  NOME_AREA: string;
  DESCR_AREA: string | null;
  CAPACIDADE: number | null;
};

type FormState = { NOME_AREA: string; DESCR_AREA: string; CAPACIDADE: string };

const formVazio = (): FormState => ({
  NOME_AREA: "",
  DESCR_AREA: "",
  CAPACIDADE: "",
});

export default function AreasComunsPage() {
  const [rows, setRows] = useState<AreaComum[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<AreaComum[]>("/areas_comuns");
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

  const abrirEditar = (a: AreaComum) => {
    setForm({
      NOME_AREA: a.NOME_AREA ?? "",
      DESCR_AREA: a.DESCR_AREA ?? "",
      CAPACIDADE: a.CAPACIDADE != null ? String(a.CAPACIDADE) : "",
    });
    setEditId(a.ID_AREA_COMUM);
    setDialogOpen(true);
  };

  const salvar = async () => {
    if (!form.NOME_AREA.trim()) {
      toast.error("Informe o nome da área.");
      return;
    }
    setCarregando(true);
    const CAPACIDADE =
      form.CAPACIDADE.trim() === "" ? null : Number(form.CAPACIDADE);
    if (form.CAPACIDADE.trim() !== "" && !Number.isFinite(CAPACIDADE)) {
      toast.error("Capacidade inválida.");
      setCarregando(false);
      return;
    }
    const payload = {
      NOME_AREA: form.NOME_AREA.trim(),
      DESCR_AREA: form.DESCR_AREA.trim() || null,
      CAPACIDADE,
    };
    try {
      if (editId) {
        await api.put(`/areas_comuns/${editId}`, payload);
        toast.success("Área atualizada!", { description: form.NOME_AREA });
      } else {
        await api.post("/areas_comuns", payload);
        toast.success("Área cadastrada!", { description: form.NOME_AREA });
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
      await api.delete(`/areas_comuns/${excluirId}`);
      toast.success("Área excluída.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Áreas comuns</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Área
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Capacidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => (
              <TableRow key={a.ID_AREA_COMUM}>
                <TableCell>{a.ID_AREA_COMUM}</TableCell>
                <TableCell className="font-medium">{a.NOME_AREA}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {a.DESCR_AREA ?? "—"}
                </TableCell>
                <TableCell>{a.CAPACIDADE ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(a)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(a.ID_AREA_COMUM)}
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
            <DialogTitle>{editId ? "Editar Área" : "Nova Área"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nome"
              value={form.NOME_AREA}
              onChange={(e) => setForm({ ...form, NOME_AREA: e.target.value })}
            />
            <Input
              placeholder="Descrição"
              value={form.DESCR_AREA}
              onChange={(e) => setForm({ ...form, DESCR_AREA: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Capacidade (opcional)"
              value={form.CAPACIDADE}
              onChange={(e) => setForm({ ...form, CAPACIDADE: e.target.value })}
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
