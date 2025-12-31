import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, User, Eye, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { Header, Footer } from "@/components/Layout";
import type { Article, Category } from "@shared/schema";

function ArticleCard({ article, categories }: { article: Article; categories: Category[] }) {
  const category = categories.find(c => c.id === article.categoryId);
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
          {category && (
            <Link href={`/categoria/${category.slug}`}>
              <Badge 
                variant="secondary" 
                className="mb-2 text-xs cursor-pointer"
                style={{ backgroundColor: (category.color || "#3B82F6") + "20", color: category.color || "#3B82F6" }}
                data-testid={`badge-category-${category.id}`}
              >
                {category.name}
              </Badge>
            </Link>
          )}
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

function ArticleSkeleton() {
  return (
    <Card className="overflow-visible">
      <CardContent className="p-4">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.append("category", selectedCategory);
    if (searchQuery) params.append("search", searchQuery);
    return params.toString();
  }, [selectedCategory, searchQuery]);

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", queryParams],
    queryFn: async () => {
      let url = "/api/articles";
      if (queryParams) url += "?" + queryParams;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return res.json();
    }
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Historia e Cultura de Rio da Casca
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Explore a rica historia da eletricidade no Brasil, personalidades marcantes e a cultura da regiao de Mato Grosso.
            </p>
            <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Button type="submit" data-testid="button-search">
                Buscar
              </Button>
            </form>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              data-testid="button-category-all"
            >
              Todos
            </Button>
            {categoriesLoading ? (
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </>
            ) : categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                data-testid={`button-category-${cat.slug}`}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ArticleSkeleton key={i} />
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  categories={categories || []} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
