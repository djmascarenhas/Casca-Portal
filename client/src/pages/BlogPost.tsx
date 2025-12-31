import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import heroImg from "@assets/1000730803_1767132686330.png";
import type { BlogPost as BlogPostType } from "@shared/schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const categoryColors: Record<string, string> = {
  "História Regional": "bg-amber-100 text-amber-800",
  "História da Eletricidade": "bg-blue-100 text-blue-800",
  "Natureza": "bg-green-100 text-green-800",
  "Personalidades": "bg-purple-100 text-purple-800",
  "Usinas Hidrelétricas": "bg-cyan-100 text-cyan-800",
  "Comunidade": "bg-orange-100 text-orange-800",
  "Eventos": "bg-pink-100 text-pink-800",
};

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside mb-4 space-y-2 text-foreground">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-2xl font-serif font-bold text-primary mt-8 mb-4">
          {trimmed.substring(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-xl font-serif font-bold text-primary mt-6 mb-3">
          {trimmed.substring(4)}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.substring(2));
    } else if (trimmed === '') {
      flushList();
    } else if (trimmed) {
      flushList();
      const formattedText = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      elements.push(
        <p 
          key={index} 
          className="mb-4 text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    }
  });
  
  flushList();
  return elements;
}

export function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery<BlogPostType>({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return response.json();
    },
    enabled: !!slug,
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Section className="py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando artigo...</p>
          </div>
        </Section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <Section className="py-24">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Artigo não encontrado</h2>
            <p className="text-muted-foreground mb-6">O artigo que você procura não existe ou foi removido.</p>
            <Link href="/blog" className={buttonVariants()}>
              Voltar para o Blog
            </Link>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero 
        image={post.imageUrl || heroImg}
        title={post.title}
        size="default"
      />
      <Section>
        <article className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 -ml-2")}
          >
            <ArrowLeft size={16} className="mr-2" /> Voltar para o Blog
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1",
              categoryColors[post.category] || "bg-gray-100 text-gray-800"
            )}>
              <Tag size={12} />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar size={14} />
              {format(new Date(post.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto"
            >
              <Share2 size={14} />
              Compartilhar
            </button>
          </div>
          
          <div className="prose prose-lg max-w-none" data-testid="text-content">
            {renderMarkdown(post.content)}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-serif font-bold text-lg mb-4">Continue explorando</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
                Ver mais artigos
              </Link>
              <Link href="/projetos/historia" className={buttonVariants({ variant: "outline" })}>
                História do Rio da Casca
              </Link>
              <Link href="/contato" className={buttonVariants({ variant: "outline" })}>
                Enviar sugestão
              </Link>
            </div>
          </div>
        </article>
      </Section>
    </Layout>
  );
}
