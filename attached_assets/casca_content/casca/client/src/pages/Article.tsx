import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, User, Eye, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header, Footer } from "@/components/Layout";
import type { Article as ArticleType, Category } from "@shared/schema";

export default function Article() {
  const [, params] = useRoute("/artigo/:slug");
  const slug = params?.slug;

  const { data: article, isLoading: articleLoading, error } = useQuery<ArticleType>({
    queryKey: ["/api/articles", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) throw new Error("Article not found");
      return res.json();
    },
    enabled: !!slug
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  const category = categories?.find(c => c.id === article?.categoryId);
  const formattedDate = article?.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          {articleLoading ? (
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-60 mb-8" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : error || !article ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Artigo nao encontrado</h2>
              <p className="text-muted-foreground mb-4">
                O artigo que voce procura nao existe ou foi removido.
              </p>
              <Link href="/">
                <Button data-testid="button-go-home">Voltar para o inicio</Button>
              </Link>
            </div>
          ) : (
            <article>
              {category && (
                <Link href={`/categoria/${category.slug}`}>
                  <Badge 
                    variant="secondary" 
                    className="mb-4 cursor-pointer"
                    style={{ backgroundColor: (category.color || "#3B82F6") + "20", color: category.color || "#3B82F6" }}
                    data-testid={`badge-category-${category.id}`}
                  >
                    {category.name}
                  </Badge>
                </Link>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-article-title">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.authorName}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.viewCount} visualizacoes
                </span>
              </div>

              {article.featuredImage && (
                <div className="aspect-video overflow-hidden rounded-md mb-8">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-testid="text-article-content"
              />
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
