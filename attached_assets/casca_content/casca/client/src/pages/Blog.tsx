import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Calendar, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Leaf
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";

const blogPosts = [
  {
    id: 1,
    title: "Como Funciona a Energia Solar: Guia Completo para Iniciantes",
    excerpt: "Entenda o passo a passo de como os paineis solares transformam luz do sol em energia eletrica para sua casa ou empresa.",
    category: "Educacional",
    readTime: "8 min",
    date: "05 Dez 2025",
    icon: Lightbulb,
    featured: true
  },
  {
    id: 2,
    title: "Quanto Custa Instalar Energia Solar em 2025?",
    excerpt: "Analise completa de precos, financiamentos e o tempo de retorno do investimento em diferentes cenarios.",
    category: "Financeiro",
    readTime: "6 min",
    date: "02 Dez 2025",
    icon: TrendingUp,
    featured: true
  },
  {
    id: 3,
    title: "Energia Solar para Empresas: Vale a Pena?",
    excerpt: "Descubra como empresas de todos os portes estao economizando ate 90% na conta de energia com sistemas fotovoltaicos.",
    category: "Comercial",
    readTime: "5 min",
    date: "28 Nov 2025",
    icon: Sun,
    featured: false
  },
  {
    id: 4,
    title: "Manutencao de Paineis Solares: O Que Voce Precisa Saber",
    excerpt: "Dicas praticas para manter seu sistema funcionando com maxima eficiencia por mais de 25 anos.",
    category: "Manutencao",
    readTime: "4 min",
    date: "25 Nov 2025",
    icon: BookOpen,
    featured: false
  },
  {
    id: 5,
    title: "Energia Solar no Agronegocio: Irrigacao e Muito Mais",
    excerpt: "Como fazendeiros brasileiros estao usando energia solar para reduzir custos e aumentar a produtividade.",
    category: "Agronegocio",
    readTime: "7 min",
    date: "20 Nov 2025",
    icon: Leaf,
    featured: false
  },
  {
    id: 6,
    title: "Usinas Solares de Investimento: Retorno de ate 18% ao Ano",
    excerpt: "Conheca o modelo de negocios que esta atraindo investidores para o mercado de geracao distribuida.",
    category: "Investimento",
    readTime: "9 min",
    date: "15 Nov 2025",
    icon: TrendingUp,
    featured: false
  }
];

export default function Blog() {
  const [isDark, setIsDark] = useState(true);

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

  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

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
              <BookOpen className="h-3 w-3 mr-1" />
              Blog SolarLink
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-page-title">
              Aprenda Sobre Energia Solar
            </h1>
            <p className="text-lg text-muted-foreground">
              Dicas, novidades e tudo que voce precisa saber para economizar 
              com energia limpa e renovavel.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Destaques</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-post-${post.id}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge>{post.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <Button variant="ghost" size="sm">
                      Ler mais <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-8">Todos os Artigos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5 h-full hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-post-${post.id}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <post.icon className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Economizar?</h2>
          <p className="text-primary-foreground/80 mb-8">
            Faca uma simulacao gratuita e descubra quanto voce pode economizar com energia solar.
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" data-testid="button-simulate">
              Simular Agora
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
