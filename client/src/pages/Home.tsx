import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { AttractionCard } from "@/components/AttractionCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Leaf, History, Camera, Map as MapIcon } from "lucide-react";
import homeHeroImg from "@assets/generated_images/aerial_view_of_rio_da_casca_nature.png";
import elephantImg from "@assets/generated_images/elephant_in_nature_sanctuary.png";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import { cn } from "@/lib/utils";

export function Home() {
  return (
    <Layout>
      <Hero 
        image={homeHeroImg}
        title="Rio da Casca"
        subtitle="Um refúgio de natureza, história e preservação na Chapada dos Guimarães."
        size="large"
      >
        <Link 
          href="/sobre" 
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-primary hover:bg-primary/90 text-white font-ui uppercase tracking-wider text-sm px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
          )}
        >
          Descubra a Comunidade
        </Link>
      </Hero>

      {/* Intro Section */}
      <Section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Bem-vindo à Nossa História</h2>
        <p className="text-lg text-muted-foreground leading-relaxed font-light">
          Localizada no coração da Chapada dos Guimarães, a Comunidade do Rio da Casca é mais do que um destino turístico; 
          é um santuário de vida. Lar do primeiro Santuário de Elefantes da América Latina e guardiã de um patrimônio histórico 
          que remonta ao ciclo da cana-de-açúcar. Aqui, o passado e o futuro se encontram sob a copa das árvores.
        </p>
        <div className="flex justify-center gap-8 mt-12">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-primary/5 rounded-full text-primary mb-2">
              <Leaf size={32} />
            </div>
            <span className="font-ui text-sm font-bold uppercase tracking-wider text-primary">Natureza</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-primary/5 rounded-full text-primary mb-2">
              <History size={32} />
            </div>
            <span className="font-ui text-sm font-bold uppercase tracking-wider text-primary">História</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-primary/5 rounded-full text-primary mb-2">
              <Camera size={32} />
            </div>
            <span className="font-ui text-sm font-bold uppercase tracking-wider text-primary">Turismo</span>
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section background="muted">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-2">Experiências Únicas</h2>
            <p className="text-muted-foreground">O que você não pode deixar de conhecer.</p>
          </div>
          <Link 
            href="/atracoes" 
            className={cn(buttonVariants({ variant: "outline" }), "hidden md:flex gap-2")}
          >
            Ver todas <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AttractionCard 
            image={elephantImg}
            title="Santuário de Elefantes"
            description="Um refúgio de paz e recuperação para elefantes resgatados, pioneiro na América Latina. Conheça este projeto de amor e liberdade."
            link="/atracoes"
            badges={["Preservação", "Vida Selvagem"]}
          />
          <AttractionCard 
            image={chaleImg}
            title="Chalé dos Governadores"
            description="Uma joia da arquitetura colonial, testemunha de séculos de história política e social de Mato Grosso."
            link="/atracoes"
            badges={["História", "Arquitetura"]}
          />
          <AttractionCard 
            image={trailImg}
            title="Trilhas e Natureza"
            description="Caminhos que levam a cachoeiras secretas, mirantes deslumbrantes e o encontro puro com a biodiversidade do cerrado."
            link="/atracoes"
            badges={["Aventura", "Ecoturismo"]}
          />
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/atracoes" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
            Ver todas atrações
          </Link>
        </div>
      </Section>

      {/* Quote / Atmosphere */}
      <Section background="primary" className="text-center py-24">
        <blockquote className="text-2xl md:text-4xl font-serif italic text-white/90 max-w-4xl mx-auto leading-relaxed">
          "O Rio da Casca não é apenas um lugar que você visita, é uma memória que você leva para sempre."
        </blockquote>
      </Section>

      {/* Map Teaser */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Planeje sua Visita</h2>
            <p className="text-muted-foreground mb-6">
              Nossa comunidade está pronta para recebê-lo. Confira o mapa com os principais pontos de interesse, 
              pousadas e restaurantes parceiros.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapIcon className="text-secondary mt-1" />
                <span>Localização privilegiada na Chapada dos Guimarães.</span>
              </li>
              <li className="flex items-start gap-3">
                <Leaf className="text-secondary mt-1" />
                <span>Roteiros integrados com a natureza.</span>
              </li>
            </ul>
            <Link href="/contato" className={buttonVariants()}>
              Como Chegar
            </Link>
          </div>
          <div className="bg-muted rounded-lg h-[300px] flex items-center justify-center text-muted-foreground">
            {/* Map placeholder or image */}
            <div className="text-center p-8">
              <MapIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Mapa Interativo disponível na página de Contato</p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
