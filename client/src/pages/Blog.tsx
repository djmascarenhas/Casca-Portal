import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import type { BlogPost } from "@shared/schema";

export function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  return (
    <Layout>
      <Hero 
        image={trailImg}
        title="Notícias & Blog"
        subtitle="Fique por dentro das novidades, eventos e histórias da comunidade."
        size="default"
      />
      <Section>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="border-none shadow-md hover:shadow-lg transition-shadow" data-testid={`card-post-${post.id}`}>
                <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={post.imageUrl || trailImg} 
                    className="w-full h-full object-cover" 
                    alt={post.title}
                    data-testid={`img-post-${post.id}`}
                  />
                </div>
                <CardHeader>
                  <div className="text-xs font-ui text-primary font-bold uppercase mb-2" data-testid={`text-category-${post.id}`}>
                    {post.category}
                  </div>
                  <CardTitle className="font-serif text-xl" data-testid={`text-title-${post.id}`}>
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4" data-testid={`text-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className={cn(buttonVariants({ variant: "link" }), "p-0 text-primary")}
                    data-testid={`link-read-more-${post.id}`}
                  >
                    Ler mais
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum post publicado ainda.</p>
          </div>
        )}
      </Section>
    </Layout>
  );
}
