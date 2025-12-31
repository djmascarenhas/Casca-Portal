import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Check, 
  Zap,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Star,
  MessageCircle,
  Phone,
  Target,
  Coins,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/Header";
import logoImage from "@assets/logo_1765314472963.png";
import type { Integrator } from "@shared/schema";

interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  pricePerCredit: number;
  totalPrice: number;
  popular: boolean;
  savings: number;
  features: string[];
}

const creditPlans: CreditPlan[] = [
  {
    id: "iniciante",
    name: "Iniciante",
    credits: 5,
    pricePerCredit: 9.98,
    totalPrice: 49.90,
    popular: false,
    savings: 0,
    features: [
      "R$ 9,98 por credito",
      "Sem validade de uso",
      "Suporte basico",
      "Acesso ao painel"
    ]
  },
  {
    id: "profissional",
    name: "Profissional",
    credits: 25,
    pricePerCredit: 7.98,
    totalPrice: 199.50,
    popular: true,
    savings: 20,
    features: [
      "R$ 7,98 por credito",
      "Economia de 20%",
      "Sem validade de uso",
      "Suporte prioritario",
      "Filtros avancados"
    ]
  },
  {
    id: "empresarial",
    name: "Empresarial",
    credits: 50,
    pricePerCredit: 6.98,
    totalPrice: 349.00,
    popular: false,
    savings: 30,
    features: [
      "R$ 6,98 por credito",
      "Economia de 30%",
      "Sem validade de uso",
      "Gerente de conta",
      "Leads exclusivos",
      "API de integracao"
    ]
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Como funciona o sistema de créditos?",
    answer: "Você compra pacotes de créditos conforme sua necessidade. Cada lead disponível na plataforma custa 1 crédito para desbloquear. Pacotes maiores saem com desconto."
  },
  {
    question: "Os créditos têm validade?",
    answer: "Não! Seus créditos não expiram. Use quando quiser, sem pressa."
  },
  {
    question: "Posso escolher quais leads desbloquear?",
    answer: "Sim! Você visualiza informações básicas dos leads (região, consumo, tipo de imóvel) antes de gastar seus créditos. Só desbloqueie os que realmente interessam."
  },
  {
    question: "Como recebo os dados do lead?",
    answer: "Ao desbloquear um lead, você tem acesso imediato ao nome completo, telefone, e-mail e todos os detalhes do projeto."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartão de crédito, débito, PIX e boleto bancário. O pagamento via PIX tem liberação imediata dos créditos."
  }
];

export default function CompraCreditos() {
  const [isDark, setIsDark] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: integrator } = useQuery<Integrator>({
    queryKey: ["/api/auth/integrator"],
    enabled: isAuthenticated,
    retry: false,
  });

  const checkoutMutation = useMutation({
    mutationFn: async (packageType: string) => {
      const response = await apiRequest("POST", "/api/stripe/create-checkout-session", {
        packageType,
        integratorId: integrator?.id,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Necessario",
        description: "Faca login para comprar creditos.",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
    if (!integrator) {
      toast({
        title: "Cadastro Necessario",
        description: "Cadastre sua empresa antes de comprar creditos.",
      });
      setTimeout(() => {
        window.location.href = "/integradores";
      }, 500);
      return;
    }
    setSelectedPlan(planId);
    checkoutMutation.mutate(planId);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />

      <section className="pt-28 pb-16 bg-gradient-to-br from-primary/5 via-background to-chart-2/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4">
              <Coins className="h-3 w-3 mr-1" />
              Sistema de Créditos
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-page-title">
              Pacotes de Créditos
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Compre créditos e desbloqueie os contatos de clientes interessados em energia solar.
              Sem mensalidade, sem compromisso. Pague apenas pelo que usar.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Target, value: "Rápido", label: "Acesso imediato aos leads" },
              { icon: Shield, value: "Seguro", label: "Dados verificados" },
              { icon: TrendingUp, value: "Eficiente", label: "Alta taxa de conversão" },
              { icon: Users, value: "Flexível", label: "Sem mensalidade" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 justify-center"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Escolha Seu Pacote
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Quanto mais créditos você compra, maior o desconto por lead.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {creditPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 h-full relative flex flex-col ${
                    plan.popular ? "border-primary border-2 shadow-lg" : ""
                  } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
                  data-testid={`card-plan-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Mais Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-muted-foreground">R$</span>
                      <span className="text-5xl font-bold text-foreground">
                        {plan.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).replace('.', ',')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 bg-muted py-2 px-4 rounded-lg">
                      <Coins className="h-5 w-5 text-primary" />
                      <span className="font-bold text-foreground">{plan.credits} Créditos</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={checkoutMutation.isPending && selectedPlan === plan.id}
                    data-testid={`button-select-${plan.id}`}
                  >
                    {checkoutMutation.isPending && selectedPlan === plan.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Comprar Agora"
                    )}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="h-3 w-3 mr-1" />
              Dúvidas
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                  data-testid={`faq-item-${index}`}
                >
                  <div className="p-4 flex items-center justify-between gap-4">
                    <h3 className="font-medium text-foreground">{item.question}</h3>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-muted-foreground text-sm">{item.answer}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Precisa de um Plano Personalizado?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Para empresas com grande demanda, oferecemos pacotes customizados 
                com preços especiais e benefícios exclusivos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" data-testid="button-contact-whatsapp">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Falar no WhatsApp
                </Button>
                <Button data-testid="button-contact-sales">
                  <Phone className="h-4 w-4 mr-2" />
                  Falar com Vendas
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ainda Não é Cadastrado?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Cadastre sua empresa gratuitamente e comece a receber leads qualificados 
              na sua região.
            </p>
            <Link href="/integradores">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg"
                data-testid="button-register-company"
              >
                Criar Conta Grátis
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/">
            <div className="inline-flex items-center mb-4 cursor-pointer">
              <img src={logoImage} alt="SolarLink" className="h-16 w-auto" />
            </div>
          </Link>
          <p className="text-sm text-muted-foreground">
            Tecnologia SolarLink &copy; {new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
