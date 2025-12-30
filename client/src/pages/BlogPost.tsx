import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import type { BlogPost as BlogPostType } from "@shared/schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

  if (isLoading) {
    return (
      <Layout>
        <Section className="py-24">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando...</p>
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
            <h2 className="text-2xl font-serif font-bold mb-4">Post não encontrado</h2>
            <p className="text-muted-foreground">O post que você procura não existe.</p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero 
        image={post.imageUrl || trailImg}
        title={post.title}
        size="default"
      />
      <Section>
        <article className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-ui font-bold uppercase text-primary" data-testid="text-category">
              {post.category}
            </span>
            <span data-testid="text-date">
              {format(new Date(post.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
          </div>
          
          <div className="prose prose-lg max-w-none" data-testid="text-content">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Section>
    </Layout>
  );
}
