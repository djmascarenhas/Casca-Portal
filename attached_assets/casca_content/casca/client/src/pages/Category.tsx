import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, User, Eye, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header, Footer } from "@/components/Layout";
import type { Article, Category as CategoryType } from "@shared/schema";

function ArticleCard({ article, category }: { article: Article; category?: CategoryType }) {
  const formattedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <Card className="overflow-visible hover-elevate transition-all" data-testid={`card-article-${article.id}`}>
      <CardContent className="p-0">
        {article.featuredImage && (
          <div className="aspect-video overflow-hidden rounded-t-md">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <Link href={`/artigo/${article.slug}`}>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer" data-testid={`link-article-${article.id}`}>
              {article.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.authorName}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.viewCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Category() {
  const [, params] = useRoute("/categoria/:slug");
  const slug = params?.slug;

  const { data: categories, isLoading: categoriesLoading } = useQuery<CategoryType[]>({
    queryKey: ["/api/categories"]
  });

  const category = categories?.find(c => c.slug === slug);

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", "category", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles?category=${slug}`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    },
    enabled: !!slug && !categoriesLoading && !!category
  });

  const isLoading = categoriesLoading || articlesLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          {categoriesLoading ? (
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
          ) : !category ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Categoria nao encontrada</h2>
              <p className="text-muted-foreground mb-4">
                A categoria que voce procura nao existe.
              </p>
              <Link href="/">
                <Button data-testid="button-go-home">Voltar para o inicio</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <Badge 
                  variant="secondary" 
                  className="mb-2"
                  style={{ backgroundColor: (category.color || "#3B82F6") + "20", color: category.color || "#3B82F6" }}
                >
                  Categoria
                </Badge>
                <h1 className="text-3xl font-bold mb-2" data-testid="text-category-title">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-muted-foreground">{category.description}</p>
                )}
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-visible">
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : articles && articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum artigo encontrado nesta categoria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
