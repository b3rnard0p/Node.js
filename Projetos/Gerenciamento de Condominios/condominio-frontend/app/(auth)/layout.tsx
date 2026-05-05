"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthenticated, logout } from "@/src/services/auth";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Building2,
  Wrench,
  Truck,
  UserCheck,
  Calendar,
  FileText,
  Receipt,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Painel", icon: Home },
  { href: "/pessoas", label: "Pessoas", icon: Users },
  { href: "/moradores", label: "Moradores", icon: Building2 },
  { href: "/funcionarios", label: "Funcionários", icon: Wrench },
  { href: "/fornecedores", label: "Fornecedores", icon: Truck },
  { href: "/visitantes", label: "Visitantes", icon: UserCheck },
  { href: "/unidades", label: "Unidades", icon: Building2 },
  { href: "/areas_comuns", label: "Áreas Comuns", icon: Calendar },
  { href: "/reservas", label: "Reservas", icon: Calendar },
  { href: "/boletos", label: "Boletos", icon: Receipt },
  { href: "/comunicados", label: "Comunicados", icon: FileText },
  { href: "/contratos", label: "Contratos", icon: FileText },
  { href: "/contas_pagar", label: "Contas Pagar", icon: Receipt },
  { href: "/contas_receber", label: "Contas Receber", icon: Receipt },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="flex w-64 flex-col border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-lg font-bold">Condomínio 🏢</span>
        </div>
        <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sistema de Gestão
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                pathname === href && "bg-accent text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
