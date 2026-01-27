import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Search, Calendar, Tag, BookOpen } from "lucide-react";
import heroImg from "@assets/1000730803_1767132686330.png";
import type { BlogPost } from "@shared/schema";

const categoryColors: Record<string, string> = {
  "História Regional": "bg-amber-100 text-amber-800",
  "História da Eletricidade": "bg-blue-100 text-blue-800",
  "Natureza": "bg-green-100 text-green-800",
  "Personalidades": "bg-purple-100 text-purple-800",
  "Usinas Hidrelétricas": "bg-cyan-100 text-cyan-800",
  "Comunidade": "bg-orange-100 text-orange-800",
  "Eventos": "bg-pink-100 text-pink-800",
};

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  const categories = useMemo(() => {
    if (!posts) return [];
    const cats = Array.from(new Set(posts.map(p => p.category)));
    return cats.sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === null || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <Hero 
        image={heroImg}
        title="📰 Blog & Notícias"
        subtitle="Histórias que o tempo não contou: descubra os segredos da região"
        icon="📜"
        location="Memórias do Rio da Casca"
        size="default"
      />

      {/* Search and Filters */}
      <Section background="muted" className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-full border-none shadow-md"
              data-testid="input-search"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
              data-testid="filter-all"
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
                data-testid={`filter-${category}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats */}
      {posts && posts.length > 0 && (
        <Section className="py-6 border-b">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              <span className="text-muted-foreground">
                <strong className="text-foreground">{posts.length}</strong> artigos publicados
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="text-primary" size={20} />
              <span className="text-muted-foreground">
                <strong className="text-foreground">{categories.length}</strong> categorias
              </span>
            </div>
          </div>
        </Section>
      )}

      {/* Posts Grid with Sidebar */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando artigos...</p>
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <>
                {searchQuery || selectedCategory ? (
                  <p className="text-muted-foreground mb-8">
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                    {selectedCategory && ` em "${selectedCategory}"`}
                    {searchQuery && ` para "${searchQuery}"`}
                  </p>
                ) : null}
                
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden" 
                      data-testid={`card-post-${post.id}`}
                    >
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden relative">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            alt={post.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="text-primary/40" size={64} />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold",
                            categoryColors[post.category] || "bg-gray-100 text-gray-800"
                          )}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="font-serif text-xl line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className={cn(buttonVariants({ variant: "link" }), "p-0 text-primary font-semibold")}
                        >
                          Ler artigo completo →
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="mx-auto text-muted-foreground/30 mb-4" size={64} />
                {searchQuery || selectedCategory ? (
                  <>
                    <p className="text-muted-foreground text-lg mb-2">Nenhum artigo encontrado</p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Tente ajustar sua busca ou filtros
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                    >
                      Limpar filtros
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground text-lg">Nenhum artigo publicado ainda.</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" className="text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-4">
          Tem uma história para contar?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Conhece algum fato histórico, curiosidade ou evento relacionado à região do Rio da Casca? 
          Entre em contato conosco e contribua para preservar nossa memória.
        </p>
        <Link 
          href="/contato" 
          className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "bg-white text-primary hover:bg-white/90")}
        >
          Enviar sua história
        </Link>
      </Section>
    </Layout>
  );
}
