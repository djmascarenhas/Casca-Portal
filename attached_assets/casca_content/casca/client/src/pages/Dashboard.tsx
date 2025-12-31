import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Coins,
  LogOut,
  Building2,
  Loader2
} from "lucide-react";
import { Link } from "wouter";
import UserInfo from "@/components/UserInfo";
import { motion } from "framer-motion";
import type { Integrator, FactLeadAcquisition, FactQuote, FactCreditTransaction, Consumer } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Acesso Restrito",
        description: "Voce precisa estar logado para acessar o dashboard.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: integrator, isLoading: integratorLoading } = useQuery<Integrator>({
    queryKey: ["/api/auth/integrator"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: leads = [] } = useQuery<(FactLeadAcquisition & { consumer: Consumer })[]>({
    queryKey: ["/api/integrators/me/leads"],
    enabled: !!integrator?.id,
  });

  const { data: quotes = [] } = useQuery<FactQuote[]>({
    queryKey: ["/api/integrators/me/quotes"],
    enabled: !!integrator?.id,
  });

  const { data: transactions = [] } = useQuery<FactCreditTransaction[]>({
    queryKey: ["/api/integrators/me/transactions"],
    enabled: !!integrator?.id,
  });

  if (authLoading || integratorLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!integrator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Empresa nao encontrada</h2>
          <p className="text-muted-foreground mb-6">
            Sua conta ainda nao esta vinculada a uma empresa integradora. 
            Cadastre sua empresa para acessar o dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/integradores">
              <Button className="w-full" data-testid="button-register-company">
                Cadastrar Empresa
              </Button>
            </Link>
            <a href="/api/logout">
              <Button variant="outline" className="w-full" data-testid="button-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </a>
          </div>
        </Card>
      </div>
    );
  }

  const stats = [
    { label: "Creditos", value: integrator.creditsBalance || 0, icon: Coins, color: "text-primary" },
    { label: "Leads Adquiridos", value: leads.length, icon: Users, color: "text-chart-2" },
    { label: "Propostas Enviadas", value: quotes.length, icon: FileText, color: "text-chart-3" },
    { label: "Conversoes", value: leads.filter(l => l.isConverted).length, icon: TrendingUp, color: "text-chart-4" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="font-bold text-xl text-primary cursor-pointer">SolarLink</span>
            </Link>
            <Badge variant="secondary">Dashboard</Badge>
          </div>
          <UserInfo variant="dark" compact />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-company-name">
              {integrator.companyName}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {integrator.city}, {integrator.state}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/leads">
              <Button data-testid="button-view-leads">
                <Users className="h-4 w-4 mr-2" />
                Ver Leads Disponiveis
              </Button>
            </Link>
            <Link href="/compra-creditos">
              <Button variant="outline" data-testid="button-buy-credits">
                <CreditCard className="h-4 w-4 mr-2" />
                Comprar Creditos
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="leads" className="space-y-4">
            <TabsList>
              <TabsTrigger value="leads" data-testid="tab-leads">Meus Leads</TabsTrigger>
              <TabsTrigger value="quotes" data-testid="tab-quotes">Propostas</TabsTrigger>
              <TabsTrigger value="transactions" data-testid="tab-transactions">Transacoes</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-4">
              {leads.length === 0 ? (
                <Card className="p-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Nenhum lead adquirido</h3>
                  <p className="text-muted-foreground mb-4">
                    Compre creditos e desbloqueie leads qualificados na sua regiao.
                  </p>
                  <Link href="/leads">
                    <Button data-testid="button-explore-leads">
                      Explorar Leads
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {leads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="quotes" className="space-y-4">
              {quotes.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Nenhuma proposta enviada</h3>
                  <p className="text-muted-foreground">
                    Adquira leads e envie propostas personalizadas.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {quotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              {transactions.length === 0 ? (
                <Card className="p-8 text-center">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Nenhuma transacao</h3>
                  <p className="text-muted-foreground mb-4">
                    Compre seu primeiro pacote de creditos.
                  </p>
                  <Link href="/compra-creditos">
                    <Button data-testid="button-first-purchase">
                      Comprar Creditos
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {transactions.map((tx) => (
                    <TransactionCard key={tx.id} transaction={tx} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}

function LeadCard({ lead }: { lead: FactLeadAcquisition & { consumer: Consumer } }) {
  const consumer = lead.consumer;
  
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground">{consumer.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {consumer.city}, {consumer.state}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lead.isConverted ? (
              <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Convertido
              </Badge>
            ) : lead.contactedAt ? (
              <Badge variant="secondary">
                <Phone className="h-3 w-3 mr-1" />
                Contatado
              </Badge>
            ) : (
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                Pendente
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pl-11">
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>{consumer.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{consumer.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{lead.acquisitionDate ? new Date(lead.acquisitionDate).toLocaleDateString('pt-BR') : '-'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function QuoteCard({ quote }: { quote: FactQuote }) {
  const statusLabels: Record<string, string> = {
    proposal_sent: "Enviada",
    negotiating: "Em Negociacao",
    closed_won: "Fechada",
    closed_lost: "Perdida"
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-chart-3/10">
            <FileText className="h-5 w-5 text-chart-3" />
          </div>
          <div>
            <div className="font-medium text-foreground">
              {quote.systemPowerKwp ? `${quote.systemPowerKwp} kWp` : 'Proposta'}
            </div>
            <div className="text-sm text-muted-foreground">
              {quote.estimatedPrice ? `R$ ${Number(quote.estimatedPrice).toLocaleString('pt-BR')}` : '-'}
            </div>
          </div>
        </div>
        <Badge variant={quote.status === 'closed_won' ? 'default' : 'secondary'}>
          {statusLabels[quote.status || 'proposal_sent'] || quote.status}
        </Badge>
      </div>
    </Card>
  );
}

function TransactionCard({ transaction }: { transaction: FactCreditTransaction }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-foreground capitalize">
              Pacote {transaction.packageType}
            </div>
            <div className="text-sm text-muted-foreground">
              {transaction.creditsAmount} creditos
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-foreground">
            R$ {Number(transaction.priceAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
            {transaction.status === 'completed' ? 'Pago' : transaction.status === 'pending' ? 'Pendente' : transaction.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
