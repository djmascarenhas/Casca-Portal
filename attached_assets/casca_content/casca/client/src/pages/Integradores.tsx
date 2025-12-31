import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sun, 
  Building2, 
  Users, 
  MapPin, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Shield,
  Zap,
  BarChart3,
  Target,
  Award,
  Wrench,
  LogIn
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import installerImage from "@assets/generated_images/solar_installer_professional.png";
import Header from "@/components/landing/Header";
import logoImage from "@assets/logo_1765314472963.png";
import SocialShare from "@/components/landing/SocialShare";
import { useAuth } from "@/hooks/useAuth";

export default function Integradores() {
  const [isDark, setIsDark] = useState(true);
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    responsibleName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    serviceRadius: "",
    employees: "",
    experience: "",
    website: "",
    about: "",
    services: [] as string[]
  });

  const serviceOptions = [
    { id: "installation", label: "Instalação" },
    { id: "projects", label: "Projetos" },
    { id: "maintenance", label: "Manutenção" },
    { id: "monitoring", label: "Monitoramento" },
    { id: "inspection", label: "Vistoria" }
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, serviceId] });
    } else {
      setFormData({ ...formData, services: formData.services.filter(s => s !== serviceId) });
    }
  };
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch("/api/integrators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          cnpj: formData.cnpj,
          responsibleName: formData.responsibleName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          serviceRadius: formData.serviceRadius ? parseInt(formData.serviceRadius) : 50,
          services: formData.services
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || "Erro ao cadastrar empresa";
        if (errorData.details) {
          if (Array.isArray(errorData.details)) {
            const fieldErrors = errorData.details.map((d: any) => `${d.path?.join('.') || 'campo'}: ${d.message}`).join(', ');
            errorMessage = `${errorMessage}: ${fieldErrors}`;
          } else if (typeof errorData.details === 'string') {
            errorMessage = `${errorMessage}: ${errorData.details}`;
          }
        }
        throw new Error(errorMessage);
      }
      
      setSubmitted(true);
    } catch (error: any) {
      setSubmitError(error.message || "Erro ao cadastrar empresa. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "Leads Qualificados",
      description: "Receba clientes que já querem instalar energia solar, com dados completos e verificados."
    },
    {
      icon: MapPin,
      title: "Filtro por Região",
      description: "Escolha leads apenas da sua área de atuação, otimizando tempo e recursos."
    },
    {
      icon: CreditCard,
      title: "Sistema de Créditos",
      description: "Compre apenas os leads que interessam. Sem mensalidade, pague pelo que usar."
    },
    {
      icon: TrendingUp,
      title: "Alta Conversão",
      description: "Taxa média de conversão de 35%. Leads pré-qualificados fecham mais rápido."
    },
    {
      icon: BarChart3,
      title: "Dashboard Completo",
      description: "Acompanhe suas métricas, histórico de leads e performance em tempo real."
    },
    {
      icon: Shield,
      title: "Suporte Dedicado",
      description: "Equipe especializada para ajudar você a maximizar seus resultados."
    }
  ];

  const stats = [
    { value: "350+", label: "Empresas Parceiras" },
    { value: "15.000+", label: "Leads Entregues" },
    { value: "35%", label: "Taxa de Conversão" },
    { value: "R$ 2.5M+", label: "Em Negócios Gerados" }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      company: "SunPower Instalações",
      location: "São Paulo, SP",
      text: "Desde que entrei na SolarLink, meu faturamento dobrou. Os leads são muito mais qualificados que em outras plataformas.",
      rating: 5
    },
    {
      name: "Ana Rodrigues",
      company: "EcoSolar Energia",
      location: "Belo Horizonte, MG",
      text: "O sistema de créditos é justo - pago apenas pelos leads que realmente me interessam. Excelente custo-benefício!",
      rating: 5
    },
    {
      name: "Pedro Santos",
      company: "Verde Energia",
      location: "Curitiba, PR",
      text: "A plataforma é muito fácil de usar e o suporte é excepcional. Recomendo para todos os integradores.",
      rating: 5
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3" data-testid="text-success-title">
              Cadastro Recebido!
            </h2>
            <p className="text-muted-foreground mb-6">
              Obrigado pelo interesse em fazer parte da SolarLink! Nossa equipe analisará 
              seu cadastro e entrará em contato em até 48 horas úteis.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button className="w-full" data-testid="button-back-home">
                  Voltar para o Início
                </Button>
              </Link>
            </div>
            <SocialShare type="integrator" />
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />

      <section className="relative min-h-[80vh] flex items-center pt-20">
        <div className="absolute inset-0">
          <img 
            src={installerImage} 
            alt="Instalador profissional de energia solar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Badge className="mb-6 bg-chart-2/20 text-chart-2 border-chart-2/30">
              <Zap className="h-3 w-3 mr-1" />
              Para Integradores e Instaladores
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              Cresça Seu Negócio com Leads Qualificados
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Conecte-se com clientes que já decidiram investir em energia solar. 
              Receba leads verificados da sua região e aumente suas vendas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-cta"
              >
                Cadastrar Minha Empresa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 bg-white/10 backdrop-blur-md border-white/30 text-white"
                onClick={() => {
                  if (isAuthenticated) {
                    setLocation("/dashboard");
                  } else {
                    window.location.href = "/api/login";
                  }
                }}
                data-testid="button-company-login"
              >
                <LogIn className="mr-2 h-5 w-5" />
                {isAuthenticated ? "Acessar Dashboard" : "Entrar na Minha Conta"}
              </Button>
              <Link href="/compra-creditos">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 bg-white/10 backdrop-blur-md border-white/30 text-white"
                  data-testid="button-buy-credits"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Comprar Créditos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1" data-testid={`stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Target className="h-3 w-3 mr-1" />
              Por que a SolarLink?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que Você Precisa para Vender Mais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A plataforma completa para integradores que querem crescer de forma sustentável.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Award className="h-3 w-3 mr-1" />
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que Nossos Parceiros Dizem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Sun key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cadastro" className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Building2 className="h-3 w-3 mr-1" />
              Cadastro
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cadastre Sua Empresa
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Preencha o formulário abaixo e nossa equipe entrará em contato 
              para ativar sua conta no portal de integradores.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Nome fantasia"
                      required
                      data-testid="input-company-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                      required
                      data-testid="input-cnpj"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="responsibleName">Nome do Responsável *</Label>
                    <Input
                      id="responsibleName"
                      value={formData.responsibleName}
                      onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
                      placeholder="Seu nome completo"
                      required
                      data-testid="input-responsible-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail Comercial *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contato@empresa.com"
                        className="pl-10"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className="pl-10"
                        required
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Website (opcional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="www.empresa.com.br"
                        className="pl-10"
                        data-testid="input-website"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Sua cidade"
                      required
                      data-testid="input-city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => setFormData({ ...formData, state: value })}
                      required
                    >
                      <SelectTrigger data-testid="select-state">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="AL">AL</SelectItem>
                        <SelectItem value="AP">AP</SelectItem>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="BA">BA</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                        <SelectItem value="DF">DF</SelectItem>
                        <SelectItem value="ES">ES</SelectItem>
                        <SelectItem value="GO">GO</SelectItem>
                        <SelectItem value="MA">MA</SelectItem>
                        <SelectItem value="MT">MT</SelectItem>
                        <SelectItem value="MS">MS</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="PA">PA</SelectItem>
                        <SelectItem value="PB">PB</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="PE">PE</SelectItem>
                        <SelectItem value="PI">PI</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="RN">RN</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="RO">RO</SelectItem>
                        <SelectItem value="RR">RR</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="SE">SE</SelectItem>
                        <SelectItem value="TO">TO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="serviceRadius">Raio de Atendimento *</Label>
                    <Select 
                      value={formData.serviceRadius} 
                      onValueChange={(value) => setFormData({ ...formData, serviceRadius: value })}
                      required
                    >
                      <SelectTrigger data-testid="select-service-radius">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">Até 50 km</SelectItem>
                        <SelectItem value="100">Até 100 km</SelectItem>
                        <SelectItem value="200">Até 200 km</SelectItem>
                        <SelectItem value="500">Até 500 km</SelectItem>
                        <SelectItem value="state">Todo o estado</SelectItem>
                        <SelectItem value="national">Nacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="employees">Número de Funcionários</Label>
                    <Select 
                      value={formData.employees} 
                      onValueChange={(value) => setFormData({ ...formData, employees: value })}
                    >
                      <SelectTrigger data-testid="select-employees">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1 a 5</SelectItem>
                        <SelectItem value="6-15">6 a 15</SelectItem>
                        <SelectItem value="16-50">16 a 50</SelectItem>
                        <SelectItem value="50+">Mais de 50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Tempo de Mercado</Label>
                    <Select 
                      value={formData.experience} 
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                    >
                      <SelectTrigger data-testid="select-experience">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">Menos de 1 ano</SelectItem>
                        <SelectItem value="1-3">1 a 3 anos</SelectItem>
                        <SelectItem value="3-5">3 a 5 anos</SelectItem>
                        <SelectItem value="5+">Mais de 5 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="about">Sobre a Empresa (opcional)</Label>
                  <Textarea
                    id="about"
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    placeholder="Conte um pouco sobre sua empresa, serviços e diferenciais..."
                    rows={4}
                    data-testid="textarea-about"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4" />
                    Serviços Oferecidos *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {serviceOptions.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={formData.services.includes(service.id)}
                          onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                          data-testid={`checkbox-service-${service.id}`}
                        />
                        <Label 
                          htmlFor={service.id} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md mb-4">
                    <p className="text-sm text-destructive" data-testid="text-submit-error">{submitError}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting} data-testid="button-submit-form">
                    {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Ao enviar, você concorda com nossos Termos de Uso e Política de Privacidade.
                  </p>
                </div>
              </form>
            </Card>
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
