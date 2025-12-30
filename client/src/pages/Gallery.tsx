import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { useQuery } from "@tanstack/react-query";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";
import type { GalleryPhoto } from "@shared/schema";

export function Gallery() {
  const { data: photos, isLoading } = useQuery<GalleryPhoto[]>({
    queryKey: ["gallery-photos"],
    queryFn: async () => {
      const response = await fetch("/api/gallery/photos");
      if (!response.ok) throw new Error("Failed to fetch photos");
      return response.json();
    },
  });

  // Fallback images for demo
  const fallbackImages = [trailImg, waterfallImg, trailImg, waterfallImg, trailImg, waterfallImg];
  const displayImages = photos && photos.length > 0 
    ? photos.map(p => ({ src: p.url, caption: p.caption, author: p.authorName }))
    : fallbackImages.map((src, i) => ({ src, caption: null, author: null }));

  return (
    <Layout>
      <Hero 
        image={trailImg}
        title="Galeria Eu Fui no Casca"
        subtitle="Momentos inesquecíveis compartilhados por nossos visitantes. Use #EuFuiNoCasca"
        size="default"
      />
      <Section>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {displayImages.map((img, i) => (
                <div 
                  key={i} 
                  className="break-inside-avoid overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow relative group"
                  data-testid={`card-photo-${i}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.caption || `Galeria ${i}`} 
                    className="w-full h-auto hover:scale-105 transition-transform duration-500"
                  />
                  {(img.caption || img.author) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption && <p className="text-sm">{img.caption}</p>}
                      {img.author && <p className="text-xs text-white/80">Por: {img.author}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {(!photos || photos.length === 0) && (
              <p className="text-center text-muted-foreground mt-8 text-sm">
                Fotos em breve! Compartilhe suas experiências com #EuFuiNoCasca
              </p>
            )}
          </>
        )}
      </Section>
    </Layout>
  );
}
