import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  CreditCard, 
  ArrowLeft,
  Sun,
  Moon,
  Building2,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ShieldAlert,
  Shield,
  UserPlus,
  Lock
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import UserInfo from "@/components/UserInfo";
import type { Consumer, Integrator, FactCreditTransaction, Admin } from "@shared/schema";

export default function AdminPage() {
  const [isDark, setIsDark] = useState(true);
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const { data: adminData, isLoading: adminLoading, error: adminError } = useQuery<Admin & { isAdmin: boolean }>({
    queryKey: ["/api/admin/auth/me"],
    enabled: isAuthenticated,
    retry: false,
  });

  const isAdmin = adminData?.isAdmin === true;

  const { data: consumers, isLoading: consumersLoading } = useQuery<Consumer[]>({
    queryKey: ["/api/consumers"],
    enabled: isAuthenticated && isAdmin,
  });

  const { data: integrators, isLoading: integratorsLoading } = useQuery<Integrator[]>({
    queryKey: ["/api/integrators"],
    enabled: isAuthenticated && isAdmin,
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<FactCreditTransaction[]>({
    queryKey: ["/api/admin/transactions"],
    enabled: isAuthenticated && isAdmin,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Area Administrativa</CardTitle>
            <CardDescription>
              Acesso exclusivo para administradores da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-destructive">Acesso Restrito</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Esta area e exclusiva para administradores cadastrados. 
                      Se voce e um integrador, acesse o Dashboard do Integrador. 
                      Tentativas de acesso nao autorizado sao registradas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="w-full"
              data-testid="button-admin-login"
            >
              <Shield className="h-4 w-4 mr-2" />
              Entrar como Administrador
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full" size="sm" data-testid="button-integrator-dashboard">
                  <Building2 className="h-4 w-4 mr-2" />
                  Integrador
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Sua conta nao possui permissoes de administrador
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-destructive">Voce nao e um administrador</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      O email {user?.email || "associado a sua conta"} nao esta cadastrado como administrador. 
                      Se voce acredita que isso e um erro, entre em contato com o suporte.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2">
              <UserInfo variant="dark" compact />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full" data-testid="button-integrator-dashboard">
                  <Building2 className="h-4 w-4 mr-2" />
                  Ir para Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full" data-testid="button-back-home">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalLeads = consumers?.length || 0;
  const newLeads = consumers?.filter(c => c.status === "new").length || 0;
  const totalIntegrators = integrators?.length || 0;
  const activeIntegrators = integrators?.filter(i => i.isActive).length || 0;
  const totalCredits = transactions?.reduce((sum, t) => t.status === "completed" ? sum + t.creditsAmount : sum, 0) || 0;
  const totalRevenue = transactions?.reduce((sum, t) => t.status === "completed" ? sum + parseFloat(t.priceAmount) : sum, 0) || 0;

  const roleLabels: Record<string, string> = {
    administrador_total: "Administrador Total",
    revisao: "Revisao",
    editor: "Editor",
    leitor: "Leitor"
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Painel Administrativo</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {roleLabels[adminData?.role || "leitor"]}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {adminData?.role === "administrador_total" && (
                <Link href="/admin/criar">
                  <Button variant="outline" size="sm" data-testid="button-create-admin">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Novo Admin
                  </Button>
                </Link>
              )}
              <UserInfo variant="dark" compact />
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card data-testid="card-total-leads">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                {newLeads} novos leads
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-integrators">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium">Integradores</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalIntegrators}</div>
              <p className="text-xs text-muted-foreground">
                {activeIntegrators} ativos
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-credits-sold">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium">Creditos Vendidos</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCredits}</div>
              <p className="text-xs text-muted-foreground">
                creditos totais
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-revenue">
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                em vendas de creditos
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads" data-testid="tab-leads">
              <FileText className="h-4 w-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="integrators" data-testid="tab-integrators">
              <Building2 className="h-4 w-4 mr-2" />
              Integradores
            </TabsTrigger>
            <TabsTrigger value="transactions" data-testid="tab-transactions">
              <CreditCard className="h-4 w-4 mr-2" />
              Transacoes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leads Recentes</CardTitle>
                <CardDescription>
                  Consumidores que solicitaram orcamentos de energia solar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {consumersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : consumers && consumers.length > 0 ? (
                  <div className="space-y-4">
                    {consumers.slice(0, 10).map((consumer) => (
                      <div 
                        key={consumer.id} 
                        className="flex items-center justify-between gap-4 p-4 border rounded-md"
                        data-testid={`lead-row-${consumer.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{consumer.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{consumer.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">R$ {consumer.monthlyBill}/mes</p>
                          <Badge variant={consumer.status === "new" ? "default" : "secondary"}>
                            {consumer.status === "new" ? "Novo" : consumer.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum lead cadastrado ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integradores Cadastrados</CardTitle>
                <CardDescription>
                  Empresas instaladoras de energia solar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {integratorsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : integrators && integrators.length > 0 ? (
                  <div className="space-y-4">
                    {integrators.slice(0, 10).map((integrator) => (
                      <div 
                        key={integrator.id} 
                        className="flex items-center justify-between gap-4 p-4 border rounded-md"
                        data-testid={`integrator-row-${integrator.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{integrator.companyName}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {integrator.city}, {integrator.state}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <Badge variant="outline">
                            {integrator.creditsBalance} creditos
                          </Badge>
                          <Badge variant={integrator.isActive ? "default" : "secondary"}>
                            {integrator.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum integrador cadastrado ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transacoes de Creditos</CardTitle>
                <CardDescription>
                  Historico de compras de pacotes de creditos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactionsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : transactions && transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.slice(0, 10).map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex items-center justify-between gap-4 p-4 border rounded-md"
                        data-testid={`transaction-row-${transaction.id}`}
                      >
                        <div className="flex items-center gap-3">
                          {transaction.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : transaction.status === "pending" ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <div>
                            <p className="font-medium">{transaction.packageType}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.creditsAmount} creditos
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            R$ {parseFloat(transaction.priceAmount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </p>
                          <Badge variant={
                            transaction.status === "completed" ? "default" : 
                            transaction.status === "pending" ? "outline" : "destructive"
                          }>
                            {transaction.status === "completed" ? "Concluido" : 
                             transaction.status === "pending" ? "Pendente" : "Cancelado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma transacao realizada ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
