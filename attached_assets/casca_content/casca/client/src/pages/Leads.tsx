import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  MapPin,
  Zap,
  Home,
  Building2,
  Factory,
  Tractor,
  Coins,
  Unlock,
  ArrowLeft,
  Loader2,
  Filter,
  Lock,
  LogIn,
  UserPlus,
  AlertTriangle
} from "lucide-react";
import { Link } from "wouter";
import UserInfo from "@/components/UserInfo";
import { motion } from "framer-motion";
import type { Consumer, Integrator } from "@shared/schema";

const propertyIcons = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  rural: Tractor
};

const propertyLabels = {
  residential: "Residencial",
  commercial: "Comercial",
  industrial: "Industrial",
  rural: "Rural"
};

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
  "SP", "SE", "TO"
];

const fictionalLeads = [
  {
    id: "demo-1",
    name: "Maria S.",
    email: "demo@example.com",
    phone: "(11) 9••••-••••",
    city: "Sao Paulo",
    state: "SP",
    monthlyBill: "850",
    propertyType: "residential",
    roofType: "ceramica",
    status: "new"
  },
  {
    id: "demo-2",
    name: "Joao P.",
    email: "demo@example.com",
    phone: "(21) 9••••-••••",
    city: "Rio de Janeiro",
    state: "RJ",
    monthlyBill: "1200",
    propertyType: "commercial",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-3",
    name: "Carlos M.",
    email: "demo@example.com",
    phone: "(31) 9••••-••••",
    city: "Belo Horizonte",
    state: "MG",
    monthlyBill: "2500",
    propertyType: "industrial",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-4",
    name: "Ana L.",
    email: "demo@example.com",
    phone: "(41) 9••••-••••",
    city: "Curitiba",
    state: "PR",
    monthlyBill: "650",
    propertyType: "residential",
    roofType: "fibrocimento",
    status: "new"
  },
  {
    id: "demo-5",
    name: "Pedro R.",
    email: "demo@example.com",
    phone: "(51) 9••••-••••",
    city: "Porto Alegre",
    state: "RS",
    monthlyBill: "4500",
    propertyType: "rural",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-6",
    name: "Fernanda C.",
    email: "demo@example.com",
    phone: "(62) 9••••-••••",
    city: "Goiania",
    state: "GO",
    monthlyBill: "980",
    propertyType: "residential",
    roofType: "ceramica",
    status: "new"
  },
  {
    id: "demo-7",
    name: "Roberto C.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Cuiaba",
    state: "MT",
    monthlyBill: "780",
    propertyType: "residential",
    roofType: "ceramica",
    status: "new"
  },
  {
    id: "demo-8",
    name: "Juliana M.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Cuiaba",
    state: "MT",
    monthlyBill: "1650",
    propertyType: "commercial",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-9",
    name: "Antonio R.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Cuiaba",
    state: "MT",
    monthlyBill: "920",
    propertyType: "residential",
    roofType: "fibrocimento",
    status: "new"
  },
  {
    id: "demo-10",
    name: "Beatriz H.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Cuiaba",
    state: "MT",
    monthlyBill: "2100",
    propertyType: "commercial",
    roofType: "concreto",
    status: "new"
  },
  {
    id: "demo-11",
    name: "Carlos E.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Cuiaba",
    state: "MT",
    monthlyBill: "850",
    propertyType: "residential",
    roofType: "ceramica",
    status: "new"
  },
  {
    id: "demo-12",
    name: "Maria F.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Varzea Grande",
    state: "MT",
    monthlyBill: "1200",
    propertyType: "commercial",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-13",
    name: "Jose R.",
    email: "demo@example.com",
    phone: "(66) 9••••-••••",
    city: "Rondonopolis",
    state: "MT",
    monthlyBill: "2500",
    propertyType: "industrial",
    roofType: "concreto",
    status: "new"
  },
  {
    id: "demo-14",
    name: "Ana P.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Sinop",
    state: "MT",
    monthlyBill: "650",
    propertyType: "residential",
    roofType: "fibrocimento",
    status: "new"
  },
  {
    id: "demo-15",
    name: "Luciano M.",
    email: "demo@example.com",
    phone: "(66) 9••••-••••",
    city: "Sorriso",
    state: "MT",
    monthlyBill: "5800",
    propertyType: "rural",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-16",
    name: "Fernanda A.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Lucas do Rio Verde",
    state: "MT",
    monthlyBill: "1800",
    propertyType: "commercial",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-17",
    name: "Marcos V.",
    email: "demo@example.com",
    phone: "(66) 9••••-••••",
    city: "Tangara da Serra",
    state: "MT",
    monthlyBill: "950",
    propertyType: "residential",
    roofType: "ceramica",
    status: "new"
  },
  {
    id: "demo-18",
    name: "Patricia S.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Primavera do Leste",
    state: "MT",
    monthlyBill: "3200",
    propertyType: "rural",
    roofType: "metalica",
    status: "new"
  },
  {
    id: "demo-19",
    name: "Ricardo G.",
    email: "demo@example.com",
    phone: "(66) 9••••-••••",
    city: "Alta Floresta",
    state: "MT",
    monthlyBill: "720",
    propertyType: "residential",
    roofType: "fibrocimento",
    status: "new"
  },
  {
    id: "demo-20",
    name: "Claudia R.",
    email: "demo@example.com",
    phone: "(65) 9••••-••••",
    city: "Caceres",
    state: "MT",
    monthlyBill: "1450",
    propertyType: "commercial",
    roofType: "concreto",
    status: "new"
  }
];

export default function Leads() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");

  // Get unique cities for selected state from fictional leads
  const citiesForState = stateFilter === "all" 
    ? [] 
    : Array.from(new Set(fictionalLeads.filter(l => l.state === stateFilter).map(l => l.city))).sort();

  // Handle state change - reset city filter
  const handleStateChange = (value: string) => {
    setStateFilter(value);
    setCityFilter("all");
  };

  const { data: integrator } = useQuery<Integrator>({
    queryKey: ["/api/auth/integrator"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: leads = [], isLoading: leadsLoading } = useQuery<Consumer[]>({
    queryKey: ["/api/leads/available", stateFilter !== "all" ? stateFilter : undefined],
    enabled: isAuthenticated,
  });

  const acquireMutation = useMutation({
    mutationFn: async (consumerId: string) => {
      const response = await apiRequest("POST", "/api/integrators/me/acquire-lead", {
        consumerId,
        creditsSpent: 1
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Lead Adquirido!",
        description: "O lead foi adicionado a sua lista. Confira no dashboard.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/leads/available"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/integrator"] });
      queryClient.invalidateQueries({ queryKey: ["/api/integrators/me/leads"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao adquirir lead",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  });

  const filteredLeads = leads.filter(l => {
    if (stateFilter !== "all" && l.state !== stateFilter) return false;
    if (cityFilter !== "all" && l.city !== cityFilter) return false;
    return true;
  });

  const filteredFictionalLeads = fictionalLeads.filter(l => {
    if (stateFilter !== "all" && l.state !== stateFilter) return false;
    if (cityFilter !== "all" && l.city !== cityFilter) return false;
    return true;
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
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-lg text-foreground">Oportunidades de Leads</h1>
                <p className="text-sm text-muted-foreground">
                  Conecte-se com clientes interessados em energia solar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="/api/login">
                <Button variant="outline" size="sm" data-testid="button-login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </a>
              <Link href="/cadastro-integrador">
                <Button size="sm" data-testid="button-register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6 border-chart-4/50 bg-chart-4/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-chart-4/20">
                  <AlertTriangle className="h-6 w-6 text-chart-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Dados de Demonstracao
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Os leads abaixo são exemplos ficticios para demonstrar como funciona a plataforma. Faca login ou cadastre-se como integrador para acessar leads reais da sua regiao.</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="/api/login">
                      <Button size="sm" data-testid="button-login-cta">
                        <LogIn className="h-4 w-4 mr-2" />
                        Fazer Login
                      </Button>
                    </a>
                    <Link href="/cadastro-integrador">
                      <Button variant="outline" size="sm" data-testid="button-register-cta">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Criar Conta de Integrador
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={stateFilter} onValueChange={handleStateChange}>
                <SelectTrigger className="w-[150px]" data-testid="select-state-filter">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {brazilianStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {citiesForState.length > 0 && (
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-[220px]" data-testid="select-city-filter">
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as cidades</SelectItem>
                    {citiesForState.map(city => {
                      const count = fictionalLeads.filter(l => l.state === stateFilter && l.city === city).length;
                      return (
                        <SelectItem key={city} value={city}>{city} ({count})</SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            </div>
            <Badge variant="secondary">
              {filteredFictionalLeads.length} lead(s) de exemplo
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFictionalLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DemoLeadCard lead={lead} />
              </motion.div>
            ))}
          </div>

          {filteredFictionalLeads.length === 0 && (
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Nenhum lead de exemplo para este estado</h3>
              <p className="text-muted-foreground">
                Selecione "Todos" para ver os leads de demonstracao.
              </p>
            </Card>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-lg text-foreground">Leads Disponiveis</h1>
              <p className="text-sm text-muted-foreground">
                {integrator?.creditsBalance || 0} creditos disponiveis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/compra-creditos">
              <Button variant="outline" size="sm" data-testid="button-buy-credits">
                <Coins className="h-4 w-4 mr-2" />
                Comprar
              </Button>
            </Link>
            <UserInfo variant="dark" compact />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {integrator?.state && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="p-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Mostrando leads da sua regiao: {integrator.city}, {integrator.state}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Leads filtrados pelo raio de atendimento de {integrator.serviceRadius || 100}km
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={stateFilter} onValueChange={handleStateChange}>
              <SelectTrigger className="w-[150px]" data-testid="select-state-filter">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {brazilianStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stateFilter !== "all" && leads.filter(l => l.state === stateFilter).length > 0 && (
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[220px]" data-testid="select-city-filter-auth">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  {Array.from(new Set(leads.filter(l => l.state === stateFilter).map(l => l.city))).sort().map(city => {
                    const count = leads.filter(l => l.state === stateFilter && l.city === city).length;
                    return (
                      <SelectItem key={city} value={city}>{city} ({count})</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
          <Badge variant="secondary">
            {filteredLeads.length} lead(s) encontrado(s)
          </Badge>
        </div>

        {leadsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Nenhum lead disponivel</h3>
            <p className="text-muted-foreground">
              {stateFilter !== "all" 
                ? cityFilter !== "all"
                  ? `Nao ha leads disponiveis em ${cityFilter}, ${stateFilter}. Tente outra cidade.`
                  : `Nao ha leads disponiveis em ${stateFilter}. Tente outro estado.`
                : "Novos leads serao adicionados em breve."
              }
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <LeadCard 
                  lead={lead} 
                  onAcquire={() => acquireMutation.mutate(lead.id)}
                  isAcquiring={acquireMutation.isPending}
                  hasCredits={(integrator?.creditsBalance || 0) >= 1}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function DemoLeadCard({ lead }: { lead: typeof fictionalLeads[0] }) {
  const PropertyIcon = propertyIcons[lead.propertyType as keyof typeof propertyIcons] || Home;
  const propertyLabel = propertyLabels[lead.propertyType as keyof typeof propertyLabels] || "Imovel";

  return (
    <Card className="p-4 opacity-80 relative overflow-visible" data-testid={`card-demo-lead-${lead.id}`}>
      <Badge 
        variant="outline" 
        className="absolute -top-2 -right-2 bg-chart-4/10 text-chart-4 border-chart-4/30 text-xs"
      >
        Exemplo
      </Badge>
      
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <PropertyIcon className="h-4 w-4 text-primary" />
          </div>
          <Badge variant="secondary">{propertyLabel}</Badge>
        </div>
        <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
          <Coins className="h-3 w-3 mr-1" />
          1 credito
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-foreground font-medium">
          {lead.name}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{lead.city}, {lead.state}</span>
        </div>
        {lead.monthlyBill && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Conta: R$ {Number(lead.monthlyBill).toLocaleString('pt-BR')}/mes</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
          <Lock className="h-3 w-3" />
          <span className="italic">Contato oculto ate a compra</span>
        </div>
      </div>

      <a href="/api/login">
        <Button 
          className="w-full" 
          variant="outline"
          data-testid={`button-login-lead-${lead.id}`}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Fazer Login para Desbloquear
        </Button>
      </a>
    </Card>
  );
}

function LeadCard({ 
  lead, 
  onAcquire, 
  isAcquiring,
  hasCredits 
}: { 
  lead: Consumer; 
  onAcquire: () => void;
  isAcquiring: boolean;
  hasCredits: boolean;
}) {
  const PropertyIcon = propertyIcons[lead.propertyType as keyof typeof propertyIcons] || Home;
  const propertyLabel = propertyLabels[lead.propertyType as keyof typeof propertyLabels] || "Imovel";

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow" data-testid={`card-lead-${lead.id}`}>
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <PropertyIcon className="h-4 w-4 text-primary" />
          </div>
          <Badge variant="secondary">{propertyLabel}</Badge>
        </div>
        <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
          <Coins className="h-3 w-3 mr-1" />
          1 credito
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-foreground font-medium">
          {lead.name}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{lead.city}, {lead.state}</span>
        </div>
        {lead.monthlyBill && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Conta: R$ {Number(lead.monthlyBill).toLocaleString('pt-BR')}/mes</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
          <Lock className="h-3 w-3" />
          <span className="italic">Contato oculto ate a compra</span>
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={onAcquire}
        disabled={isAcquiring || !hasCredits}
        data-testid={`button-acquire-${lead.id}`}
      >
        {isAcquiring ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Unlock className="h-4 w-4 mr-2" />
        )}
        {hasCredits ? "Desbloquear Lead" : "Sem Creditos"}
      </Button>
    </Card>
  );
}
