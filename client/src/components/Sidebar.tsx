import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { name: "História Regional", emoji: "🏛️", count: 5 },
  { name: "Natureza", emoji: "🌿", count: 8 },
  { name: "Usinas Hidrelétricas", emoji: "⚡", count: 4 },
  { name: "Comunidade", emoji: "👥", count: 6 },
  { name: "Eventos", emoji: "🎉", count: 3 },
];

const maisLidos = [
  { title: "Como a luz chegou ao interior de MT", emoji: "💡", slug: "luz-interior-mt", views: 1250 },
  { title: "Maia e Guida: história de liberdade", emoji: "🐘", slug: "maia-guida-elefantas", views: 980 },
  { title: "O mistério da Pedra Furada", emoji: "🌊", slug: "misterio-pedra-furada", views: 756 },
  { title: "Chalé dos Governadores: segredos", emoji: "🏠", slug: "chale-governadores", views: 634 },
];

export function Sidebar() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Falha ao cadastrar");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Você foi cadastrado na nossa newsletter.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar seu email.",
        variant: "destructive",
      });
    },
  });

  return (
    <aside className="space-y-6">
      {/* Newsletter Destaque */}
      <Card className="bg-primary text-primary-foreground border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
            📧 Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/80 mb-4">
            Receba histórias exclusivas sobre a região diretamente no seu email.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (email) subscribeMutation.mutate(email);
            }}
            className="space-y-2"
          >
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              data-testid="input-sidebar-email"
            />
            <Button 
              type="submit" 
              variant="secondary"
              className="w-full"
              disabled={subscribeMutation.isPending}
              data-testid="button-sidebar-subscribe"
            >
              {subscribeMutation.isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categorias */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-primary flex items-center gap-2">
            📂 Categorias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/blog?categoria=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors group"
              data-testid={`link-category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="flex items-center gap-2">
                <span>{cat.emoji}</span>
                <span className="text-sm group-hover:text-primary transition-colors">{cat.name}</span>
              </span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {cat.count}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Mais Lidos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-primary flex items-center gap-2">
            🔥 Mais Lidos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {maisLidos.map((artigo, index) => (
            <Link
              key={artigo.slug}
              href={`/blog/${artigo.slug}`}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors group"
              data-testid={`link-maisLido-${index}`}
            >
              <span className="text-2xl">{artigo.emoji}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {artigo.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {artigo.views.toLocaleString('pt-BR')} visualizações
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* CTA para Timeline */}
      <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-none">
        <CardContent className="pt-6">
          <div className="text-center">
            <span className="text-3xl block mb-3">🕰️</span>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Linha do Tempo
            </h3>
            <p className="text-sm text-white/80 mb-4">
              Navegue pelos séculos de história da região
            </p>
            <Link 
              href="/linha-do-tempo"
              className="inline-block bg-white text-secondary font-bold px-4 py-2 rounded-md hover:bg-white/90 transition-colors text-sm"
              data-testid="link-sidebar-timeline"
            >
              Explorar →
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
