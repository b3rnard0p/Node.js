"use client";

import { useEffect, useState } from "react";
import api from "@/src/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Receipt } from "lucide-react";

type BoletoRow = { STATUS?: string };

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pessoas: 0,
    moradores: 0,
    unidades: 0,
    boletosAbertos: 0,
  });

  useEffect(() => {
    async function carregar() {
      try {
        const [pess, mor, unid, bol] = await Promise.all([
          api.get("/pessoas"),
          api.get("/moradores"),
          api.get("/unidades"),
          api.get("/boletos"),
        ]);
        const boletos: BoletoRow[] = bol.data ?? [];
        setStats({
          pessoas: pess.data?.length ?? 0,
          moradores: mor.data?.length ?? 0,
          unidades: unid.data?.length ?? 0,
          boletosAbertos: boletos.filter((b) => b.STATUS === "ABERTO").length,
        });
      } catch (err) {
        console.error("Erro ao carregar estatísticas", err);
      }
    }
    carregar();
  }, []);

  const cards = [
    { title: "Pessoas", value: stats.pessoas, icon: Users, color: "text-violet-400" },
    { title: "Moradores", value: stats.moradores, icon: Users, color: "text-indigo-400" },
    { title: "Unidades", value: stats.unidades, icon: Building2, color: "text-blue-400" },
    { title: "Boletos Abertos", value: stats.boletosAbertos, icon: Receipt, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel do Condomínio</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, color }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
