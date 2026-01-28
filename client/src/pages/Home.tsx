import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { AttractionCard } from "@/components/AttractionCard";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Leaf, History, Camera, Map as MapIcon } from "lucide-react";
import homeHeroImg from "@assets/1000730803_1767132686330.png";
import elephantImg from "@assets/generated_images/elephant_in_nature_sanctuary.png";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import { cn } from "@/lib/utils";

const allSponsors = [
  { name: "Cachoeira da Pedra Furada", link: "/patrocinadores/pedra-furada", tier: "diamante", icon: "💎", color: "text-yellow-300" },
  { name: "Bar do Léo", link: "/patrocinadores/bar-do-leo", tier: "ouro", icon: "🥇", color: "text-amber-400" },
  { name: "Mercearia Rio da Casca", link: "/patrocinadores/mercearia", tier: "prata", icon: "🥈", color: "text-gray-300" },
];

export function Home() {
  return (
    <Layout>
      <Hero 
        image={homeHeroImg}
        title="Rio da Casca"
        subtitle="Descubra os segredos escondidos nas águas de Mato Grosso. Um refúgio de natureza, história e preservação."
        location="Chapada dos Guimarães, MT"
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

      {/* Sponsors Section */}
      <div className="bg-primary py-6 overflow-hidden" data-testid="sponsors-section">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-white font-serif text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">PATROCINADORES</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {allSponsors.map((sponsor, index) => (
              <Link 
                key={`sponsor-${sponsor.tier}-${index}`}
                href={sponsor.link}
                className="flex items-center gap-2 text-white font-serif text-lg md:text-xl font-bold hover:scale-105 transition-transform"
                data-testid={`sponsor-${sponsor.tier}-${index}`}
              >
                <span className={cn("text-xl md:text-2xl", sponsor.color)}>{sponsor.icon}</span>
                <span className="hover:text-white/80">{sponsor.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Destaques da Semana */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 text-center">
            ✨ Destaques da Semana
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Histórias e descobertas que você não pode perder
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Grande */}
            <Link href="/santuario" className="md:col-span-2 featured-card group">
              <div className="relative h-72 rounded-xl overflow-hidden bg-card shadow-md">
                <img 
                  src={elephantImg} 
                  alt="Santuário de Elefantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-2xl mb-2 block">🐘</span>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    Maia e Guida: As Pioneiras do Santuário
                  </h3>
                  <p className="text-white/80 text-sm">
                    Conheça a história das primeiras elefantas a encontrarem liberdade na América Latina
                  </p>
                </div>
              </div>
            </Link>

            {/* Cards menores */}
            <div className="flex flex-col gap-6">
              <Link href="/historia" className="featured-card group">
                <div className="relative h-32 rounded-xl overflow-hidden bg-card shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-center">
                    <h3 className="text-base font-serif font-bold text-white">
                      História & Patrimônio
                    </h3>
                    <p className="text-white/80 text-xs">
                      Navegue pelos séculos de história
                    </p>
                  </div>
                </div>
              </Link>

              <Link href="/atracoes" className="featured-card group">
                <div className="relative h-32 rounded-xl overflow-hidden bg-card shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-center">
                    <span className="text-lg mb-1">🏞️</span>
                    <h3 className="text-base font-serif font-bold text-white">
                      6 Atrações Imperdíveis
                    </h3>
                    <p className="text-white/80 text-xs">
                      Cachoeiras, trilhas e patrimônio
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Section>

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
            link="/santuario"
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

      {/* Projetos & Parceiros CTA */}
      <Section background="muted">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Aliança Rio da Casca Vivo</h2>
          <p className="text-muted-foreground mb-8">
            Conheça a iniciativa que une comunidade, instituições e organizações para o desenvolvimento sustentável da região. 
            Parcerias com IFMT, Santuário de Elefantes e mais.
          </p>
          <Link 
            href="/projetos" 
            className={cn(buttonVariants({ size: "lg" }), "bg-secondary hover:bg-secondary/90 text-white")}
          >
            Conheça os Projetos & Parceiros
          </Link>
        </div>
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
