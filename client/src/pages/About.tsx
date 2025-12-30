import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";

export function About() {
  return (
    <Layout>
      <Hero 
        image={chaleImg}
        title="Nossa Comunidade"
        subtitle="Gente que preserva, acolhe e constrói o futuro."
        size="default"
      />
      <Section>
        <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Quem Somos</h2>
          <p>
            A Comunidade do Rio da Casca é um exemplo vivo de resiliência e harmonia com a natureza. 
            Formada por famílias que há gerações cuidam desta terra, somos guardiões de um patrimônio 
            inestimável localizado nas encostas da Chapada dos Guimarães.
          </p>
          <p>
            Nossa missão é desenvolver um turismo sustentável que valorize nossa cultura, proteja 
            nossas águas e florestas, e ofereça aos visitantes uma experiência autêntica de conexão.
          </p>
          
          <h3 className="text-2xl font-serif font-bold text-primary mt-12 mb-4">Nossa Visão</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Preservação ambiental rigorosa das nascentes do Rio da Casca.</li>
            <li>Valorização da memória histórica da Usina e do Chalé.</li>
            <li>Fomento à economia local através do turismo de base comunitária.</li>
          </ul>
        </div>
      </Section>
    </Layout>
  );
}
