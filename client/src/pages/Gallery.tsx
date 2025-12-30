import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";

export function Gallery() {
  const images = [
    trailImg,
    waterfallImg,
    trailImg, // reusing for demo
    waterfallImg,
    trailImg,
    waterfallImg
  ];

  return (
    <Layout>
      <Hero 
        image={trailImg}
        title="Galeria Eu Fui no Casca"
        subtitle="Momentos inesquecíveis compartilhados por nossos visitantes. Use #EuFuiNoCasca"
        size="default"
      />
      <Section>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <img src={src} alt={`Galeria ${i}`} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
