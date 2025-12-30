import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { AttractionCard } from "@/components/AttractionCard";
import elephantImg from "@assets/generated_images/elephant_in_nature_sanctuary.png";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";

export function Attractions() {
  return (
    <Layout>
      <Hero 
        image={waterfallImg}
        title="Atrações"
        subtitle="Descubra as maravilhas naturais e históricas que esperam por você."
        size="default"
      />
      
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          
          <AttractionCard 
            image={elephantImg}
            title="Santuário de Elefantes Brasil"
            description="O primeiro santuário de elefantes da América Latina. Uma organização sem fins lucrativos que resgata elefantes em cativeiro e lhes devolve a dignidade e a liberdade em um ambiente natural protegido. *Visitação restrita, consulte regras.*"
            link="#"
            badges={["Internacional", "Vida Selvagem"]}
          />
          
          <AttractionCard 
            image={chaleImg}
            title="Chalé dos Governadores & Usina"
            description="Visite as ruínas históricas da antiga Usina da Casca e o imponente Chalé dos Governadores. Um passeio pelo tempo cercado pela mata atlântica de interior."
            link="#"
            badges={["Patrimônio", "História"]}
          />

          <AttractionCard 
            image={waterfallImg}
            title="Cachoeira da Usina"
            description="Uma queda d'água espetacular formada pelo Rio da Casca, perfeita para contemplação e fotografia. O som da água e o frescor da mata renovam as energias."
            link="#"
            badges={["Natureza", "Águas"]}
          />

          <AttractionCard 
            image={trailImg}
            title="Trilhas Ecológicas"
            description="Diversas opções de trilhas para todos os níveis, permitindo a observação de pássaros, flora nativa e vistas panorâmicas da Chapada."
            link="#"
            badges={["Esporte", "Aventura"]}
          />

        </div>
      </Section>
    </Layout>
  );
}
