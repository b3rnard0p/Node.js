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
import { SELECT_EMPTY as TIPO_SELECT_EMPTY, formatDateInput } from "@/lib/crud-helpers";

type Pessoa = {
  ID_PESSOA: number;
  NOME: string;
  TIPO_PESSOA: "FISICA" | "JURIDICA" | string;
  CPF_CNPJ: string;
  DATA_CADASTRO: string;
};

type FormState = {
  NOME: string;
  TIPO_PESSOA: string;
  CPF_CNPJ: string;
  DATA_CADASTRO: string;
};

const formVazio = (): FormState => ({
  NOME: "",
  TIPO_PESSOA: "",
  CPF_CNPJ: "",
  DATA_CADASTRO: new Date().toISOString().split("T")[0],
});

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [form, setForm] = useState<FormState>(formVazio);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [excluirId, setExcluirId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    const res = await api.get<Pessoa[]>("/pessoas");
    setPessoas(res.data);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const abrirNovo = () => {
    setForm(formVazio());
    setEditId(null);
    setDialogOpen(true);
  };

  const abrirEditar = (p: Pessoa) => {
    setForm({
      NOME: p.NOME,
      TIPO_PESSOA: p.TIPO_PESSOA,
      CPF_CNPJ: p.CPF_CNPJ,
      DATA_CADASTRO: formatDateInput(p.DATA_CADASTRO),
    });
    setEditId(p.ID_PESSOA);
    setDialogOpen(true);
  };

  const salvar = async () => {
    if (!form.TIPO_PESSOA) {
      toast.error("Selecione o tipo de pessoa.");
      return;
    }
    setCarregando(true);
    const payload = {
      NOME: form.NOME,
      TIPO_PESSOA: form.TIPO_PESSOA,
      CPF_CNPJ: form.CPF_CNPJ,
      DATA_CADASTRO: new Date(`${form.DATA_CADASTRO}T12:00:00`),
    };
    try {
      if (editId) {
        await api.put(`/pessoas/${editId}`, payload);
        toast.success("Pessoa atualizada!", { description: form.NOME });
      } else {
        await api.post("/pessoas", payload);
        toast.success("Pessoa cadastrada!", { description: form.NOME });
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
      await api.delete(`/pessoas/${excluirId}`);
      toast.success("Pessoa excluída com sucesso.");
      setExcluirId(null);
      carregar();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pessoas</h2>
        <Button onClick={abrirNovo}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Pessoa
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pessoas.map((p) => (
              <TableRow key={p.ID_PESSOA}>
                <TableCell>{p.ID_PESSOA}</TableCell>
                <TableCell className="font-medium">{p.NOME}</TableCell>
                <TableCell>
                  <Badge variant="outline">{p.TIPO_PESSOA}</Badge>
                </TableCell>
                <TableCell>{p.CPF_CNPJ}</TableCell>
                <TableCell>
                  {new Date(p.DATA_CADASTRO).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" onClick={() => abrirEditar(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive"
                    onClick={() => setExcluirId(p.ID_PESSOA)}
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
            <DialogTitle>{editId ? "Editar Pessoa" : "Nova Pessoa"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nome completo"
              value={form.NOME}
              onChange={(e) => setForm({ ...form, NOME: e.target.value })}
            />
            <Select
              value={form.TIPO_PESSOA === "" ? TIPO_SELECT_EMPTY : form.TIPO_PESSOA}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  TIPO_PESSOA: v === TIPO_SELECT_EMPTY || v == null ? "" : v,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de pessoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TIPO_SELECT_EMPTY}>Selecione o tipo</SelectItem>
                <SelectItem value="FISICA">Física</SelectItem>
                <SelectItem value="JURIDICA">Jurídica</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="CPF ou CNPJ"
              value={form.CPF_CNPJ}
              onChange={(e) => setForm({ ...form, CPF_CNPJ: e.target.value })}
            />
            <Input
              type="date"
              value={form.DATA_CADASTRO}
              onChange={(e) => setForm({ ...form, DATA_CADASTRO: e.target.value })}
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

      <AlertDialog
        open={!!excluirId}
        onOpenChange={(open) => !open && setExcluirId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
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
