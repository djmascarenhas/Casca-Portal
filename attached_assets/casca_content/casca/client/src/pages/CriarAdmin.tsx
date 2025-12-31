import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Loader2,
  ShieldAlert,
  Shield,
  UserPlus,
  Lock,
  Users,
  CheckCircle,
  Trash2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import UserInfo from "@/components/UserInfo";
import type { Admin } from "@shared/schema";

const roleLabels: Record<string, string> = {
  administrador_total: "Administrador Total",
  revisao: "Revisao",
  editor: "Editor",
  leitor: "Leitor"
};

const roleDescriptions: Record<string, string> = {
  administrador_total: "Acesso total ao sistema, pode criar e gerenciar outros admins",
  revisao: "Pode revisar e aprovar conteudos, visualizar relatorios",
  editor: "Pode editar dados e visualizar informacoes",
  leitor: "Apenas visualizacao de dados"
};

export default function CriarAdmin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isLoading: authLoading, isAuthenticated } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("leitor");

  const { data: adminData, isLoading: adminLoading } = useQuery<Admin & { isAdmin: boolean }>({
    queryKey: ["/api/admin/auth/me"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: admins, isLoading: adminsLoading } = useQuery<Admin[]>({
    queryKey: ["/api/admin/admins"],
    enabled: isAuthenticated && adminData?.role === "administrador_total",
  });

  const isAdminTotal = adminData?.role === "administrador_total";

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; role: string }) => {
      const response = await apiRequest("POST", "/api/admin/admins", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Administrador criado!",
        description: "O novo administrador foi cadastrado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/admins"] });
      setName("");
      setEmail("");
      setRole("leitor");
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar administrador",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/admins/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Administrador desativado",
        description: "O administrador foi desativado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/admins"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao desativar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Campos obrigatorios",
        description: "Preencha nome e email.",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate({ name, email, role });
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !adminData?.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Voce precisa estar logado como administrador para acessar esta pagina
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/admin">
              <Button className="w-full" data-testid="button-go-admin">
                <Shield className="h-4 w-4 mr-2" />
                Ir para Admin
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdminTotal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Permissao Insuficiente</CardTitle>
            <CardDescription>
              Apenas Administradores Totais podem criar novos administradores
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Card className="border-muted">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Seu nivel atual</p>
                    <Badge variant="outline">{roleLabels[adminData?.role || "leitor"]}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Link href="/admin">
              <Button variant="outline" className="w-full" data-testid="button-back-admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Admin
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Gerenciar Administradores</h1>
                <p className="text-sm text-muted-foreground">Criar e gerenciar contas de administradores</p>
              </div>
            </div>
            <UserInfo variant="dark" compact />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Criar Novo Administrador
            </CardTitle>
            <CardDescription>
              Adicione um novo administrador a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do administrador"
                    data-testid="input-admin-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    data-testid="input-admin-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Nivel de Acesso</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger data-testid="select-admin-role">
                    <SelectValue placeholder="Selecione o nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador_total">
                      <div className="flex flex-col">
                        <span className="font-medium">Administrador Total</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="revisao">
                      <div className="flex flex-col">
                        <span className="font-medium">Revisao</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex flex-col">
                        <span className="font-medium">Editor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="leitor">
                      <div className="flex flex-col">
                        <span className="font-medium">Leitor</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{roleDescriptions[role]}</p>
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={createMutation.isPending}
                data-testid="button-submit-admin"
              >
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                Criar Administrador
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Administradores Cadastrados
            </CardTitle>
            <CardDescription>
              Lista de todos os administradores ativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {adminsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : admins && admins.length > 0 ? (
              <div className="space-y-3">
                {admins.map((admin) => (
                  <div 
                    key={admin.id}
                    className="flex items-center justify-between gap-4 p-4 border rounded-md"
                    data-testid={`admin-row-${admin.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={admin.role === "administrador_total" ? "default" : "outline"}>
                        {roleLabels[admin.role]}
                      </Badge>
                      {admin.id !== adminData?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(admin.id)}
                          disabled={deleteMutation.isPending}
                          data-testid={`button-delete-${admin.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum administrador cadastrado</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Niveis de Acesso</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li><strong>Administrador Total:</strong> {roleDescriptions.administrador_total}</li>
                  <li><strong>Revisao:</strong> {roleDescriptions.revisao}</li>
                  <li><strong>Editor:</strong> {roleDescriptions.editor}</li>
                  <li><strong>Leitor:</strong> {roleDescriptions.leitor}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
