import { motion } from "framer-motion";
import { 
  GraduationCap, 
  PlayCircle, 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle2,
  Lock,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const featuredCourses = [
  {
    id: 1,
    title: "Fundamentos da Energia Solar Fotovoltaica",
    description: "Aprenda os conceitos basicos sobre como funciona a geracao de energia solar e os componentes de um sistema fotovoltaico.",
    duration: "4 horas",
    lessons: 12,
    level: "Iniciante",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
    progress: 0,
    free: true
  },
  {
    id: 2,
    title: "Dimensionamento de Sistemas Fotovoltaicos",
    description: "Domine as tecnicas de calculo para dimensionar sistemas solares residenciais e comerciais com precisao.",
    duration: "6 horas",
    lessons: 18,
    level: "Intermediario",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=250&fit=crop",
    progress: 0,
    free: false
  },
  {
    id: 3,
    title: "Vendas Consultivas em Energia Solar",
    description: "Tecnicas avancadas de vendas para converter mais leads em clientes satisfeitos no mercado solar.",
    duration: "5 horas",
    lessons: 15,
    level: "Intermediario",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
    progress: 0,
    free: false
  },
  {
    id: 4,
    title: "Instalacao e Manutencao de Paineis Solares",
    description: "Guia pratico completo sobre instalacao segura e manutencao preventiva de sistemas fotovoltaicos.",
    duration: "8 horas",
    lessons: 24,
    level: "Avancado",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=250&fit=crop",
    progress: 0,
    free: false
  }
];

const upcomingWebinars = [
  {
    id: 1,
    title: "Tendencias do Mercado Solar 2025",
    date: "18 Dez 2024",
    time: "19:00",
    speaker: "Dr. Carlos Silva",
    attendees: 234
  },
  {
    id: 2,
    title: "Como Captar Clientes pelo Digital",
    date: "20 Dez 2024",
    time: "20:00",
    speaker: "Ana Paula Costa",
    attendees: 156
  },
  {
    id: 3,
    title: "Financiamento Solar: Opcoes e Estrategias",
    date: "22 Dez 2024",
    time: "19:30",
    speaker: "Roberto Mendes",
    attendees: 189
  }
];

const learningPaths = [
  {
    title: "Consultor Solar Certificado",
    courses: 5,
    duration: "20 horas",
    icon: Award,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  },
  {
    title: "Especialista Tecnico",
    courses: 8,
    duration: "40 horas",
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Gestor de Equipe Solar",
    courses: 6,
    duration: "30 horas",
    icon: Users,
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  }
];

const stats = [
  { value: "50+", label: "Cursos Disponiveis" },
  { value: "200+", label: "Video Aulas" },
  { value: "5.000+", label: "Alunos Ativos" },
  { value: "98%", label: "Satisfacao" }
];

export default function SolarAcademy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              <GraduationCap className="w-3 h-3 mr-1" />
              Sua Jornada Comeca Aqui
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-page-title">
              Solar Academy
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Desenvolva suas habilidades e conhecimentos no mercado de energia solar. 
              Cursos, treinamentos e certificacoes para profissionais que querem se destacar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" data-testid="button-start-learning">
                <PlayCircle className="w-4 h-4 mr-2" />
                Comecar a Aprender
              </Button>
              <Button size="lg" variant="outline" data-testid="button-view-catalog">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Catalogo Completo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trilhas de Aprendizado</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Siga uma trilha estruturada e obtenha certificacao reconhecida no mercado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-path-${index}`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${path.color} flex items-center justify-center mb-4`}>
                      <path.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {path.courses} cursos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {path.duration}
                      </span>
                    </div>
                    <Button variant="ghost" className="px-0 mt-4 text-primary">
                      Ver trilha completa
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Cursos em Destaque</h2>
              <p className="text-muted-foreground">
                Os cursos mais populares da nossa plataforma
              </p>
            </div>
            <Button variant="outline" data-testid="button-view-all-courses">
              Ver todos os cursos
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group" data-testid={`card-course-${course.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {course.free ? (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        Gratuito
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="absolute top-2 right-2">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {course.level}
                    </Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        {course.lessons} aulas
                      </span>
                    </div>
                    {course.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progresso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Webinars e Eventos</h2>
              <p className="text-muted-foreground">
                Participe de eventos ao vivo com especialistas do setor
              </p>
            </div>
            <Button variant="outline" data-testid="button-view-all-events">
              Ver agenda completa
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full" data-testid={`card-webinar-${webinar.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
                      <PlayCircle className="w-4 h-4" />
                      Ao Vivo
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{webinar.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Com {webinar.speaker}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {webinar.date} as {webinar.time}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {webinar.attendees}
                      </span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Inscrever-se
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Por que escolher a Solar Academy?
              </h2>
              <p className="text-muted-foreground">
                Beneficios exclusivos para acelerar sua carreira no setor solar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Conteudo Atualizado",
                  description: "Materiais sempre atualizados com as ultimas tendencias e tecnologias do mercado solar."
                },
                {
                  title: "Certificados Reconhecidos",
                  description: "Certificacoes que agregam valor ao seu curriculo e diferenciam voce no mercado."
                },
                {
                  title: "Suporte Especializado",
                  description: "Tire duvidas diretamente com instrutores experientes do setor."
                },
                {
                  title: "Comunidade Ativa",
                  description: "Conecte-se com outros profissionais e amplie seu networking."
                },
                {
                  title: "Acesso Vitalicio",
                  description: "Compre uma vez e tenha acesso ao conteudo para sempre, incluindo atualizacoes."
                },
                {
                  title: "Aplicacao Pratica",
                  description: "Exercicios e projetos reais para aplicar o conhecimento imediatamente."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para impulsionar sua carreira?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que estao se capacitando na Solar Academy 
            e transformando suas carreiras no mercado de energia solar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" data-testid="button-cta-start">
              Comecar Gratuitamente
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground" data-testid="button-cta-premium">
              Ver Planos Premium
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
