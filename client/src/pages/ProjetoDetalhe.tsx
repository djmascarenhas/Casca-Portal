import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { useRoute, Link } from "wouter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";
import aliancaContent from "@/data/alianca-content.json";

const pageImages: Record<string, string> = {
  brejao: trailImg,
  "poco-do-pacu": waterfallImg,
  cachoeiras: waterfallImg,
  manso: trailImg,
  voluntariado: trailImg,
  historia: chaleImg,
  natureza: trailImg,
  fontes: chaleImg,
};

const pageContent: Record<string, { title: string; content: React.ReactNode }> = {
  brejao: {
    title: "Brejão",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          O Brejão é uma área alagada de biodiversidade única, localizada no coração da região do Rio da Casca. 
          Este ecossistema é habitat de diversas espécies, incluindo a impressionante sucuri-verde (Eunectes murinus).
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Observação Ética</h3>
        <p className="text-muted-foreground mb-6">
          A observação de fauna no Brejão segue protocolos rigorosos para garantir o bem-estar dos animais e a segurança dos visitantes.
          Passarelas elevadas permitem a observação sem perturbação do ambiente natural.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Monitoramento</h3>
        <p className="text-muted-foreground">
          Pesquisadores do IFMT realizam monitoramento contínuo da fauna local, contribuindo para o conhecimento científico 
          e a conservação das espécies.
        </p>
      </>
    ),
  },
  "poco-do-pacu": {
    title: "Poço do Pacu",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          O Poço do Pacu é uma corredeira rasa localizada a aproximadamente 5 km do centro da comunidade. 
          Este local combina beleza natural com a tradição da pesca artesanal.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Tradição Local</h3>
        <p className="text-muted-foreground mb-6">
          A pesca do pacu é uma tradição cultural importante para a comunidade, transmitida de geração em geração.
          Visitantes podem conhecer as técnicas tradicionais com pescadores locais.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Lazer</h3>
        <p className="text-muted-foreground">
          As águas cristalinas e rasas são perfeitas para um banho refrescante, especialmente nos dias quentes de verão.
        </p>
      </>
    ),
  },
  cachoeiras: {
    title: "Cachoeiras",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          A região do Rio da Casca abriga diversas cachoeiras espetaculares, cada uma com sua beleza única.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Pedra Furada</h3>
        <p className="text-muted-foreground mb-6">
          A Cachoeira da Pedra Furada é um dos destaques da região, com sua formação rochosa única que dá nome ao local.
          O acesso é feito por trilha de dificuldade moderada.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Cachoeira da Usina</h3>
        <p className="text-muted-foreground">
          Formada pelo Rio da Casca junto às ruínas da antiga usina hidrelétrica, oferece uma experiência que une 
          natureza e história.
        </p>
      </>
    ),
  },
  manso: {
    title: "Lago Manso",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          O Lago Manso, formado pela Usina Hidrelétrica de Manso, está a poucos quilômetros da comunidade 
          e oferece opções variadas de lazer náutico.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Atividades</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> Pesca esportiva</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> Passeios de barco</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> Stand-up paddle</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> Praias de água doce</li>
        </ul>
      </>
    ),
  },
  voluntariado: {
    title: "Seja Voluntário",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          {aliancaContent.voluntariado.descricao}
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Como Participar</h3>
        <ul className="space-y-3 mb-8">
          {aliancaContent.voluntariado.comoParticipar.map((passo, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <span>{passo}</span>
            </li>
          ))}
        </ul>
        <Link href="/contato" className={cn(buttonVariants({ size: "lg" }), "bg-primary")}>
          Quero Ser Voluntário
        </Link>
      </>
    ),
  },
  historia: {
    title: "História & Patrimônio",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-8">
          A região do Rio da Casca guarda memórias fundamentais para a história de Mato Grosso, 
          desde os primórdios da eletrificação até a preservação do patrimônio arquitetônico.
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-6">Timeline da Eletrificação</h3>
        <div className="border-l-4 border-secondary pl-8 space-y-8">
          {aliancaContent.historia.timeline.map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-secondary ring-4 ring-white" />
              <span className="text-sm font-bold text-secondary">{item.ano}</span>
              <h4 className="text-xl font-serif font-bold text-primary mb-2">{item.evento}</h4>
              <p className="text-muted-foreground">{item.descricao}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  natureza: {
    title: "Natureza & Biodiversidade",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-6">
          {aliancaContent.natureza.corredorEcologico}
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">A Sucuri-Verde</h3>
        <p className="text-muted-foreground mb-8">
          {aliancaContent.natureza.sucuri}
        </p>
        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Protocolos de Visita Segura</h3>
        <ul className="space-y-3">
          {aliancaContent.natureza.protocolosVisita.map((protocolo, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle size={18} className="text-green-600 mt-1" />
              <span>{protocolo}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  fontes: {
    title: "Fontes & Referências",
    content: (
      <>
        <p className="text-lg text-muted-foreground mb-8">
          Confira as fontes e referências utilizadas para a construção do conteúdo sobre a região do Rio da Casca.
        </p>
        <div className="space-y-4">
          {aliancaContent.fontes.map((fonte, i) => (
            <div key={i} className="flex items-center gap-4 bg-muted p-4 rounded-lg">
              <ExternalLink size={20} className="text-primary" />
              <span>{fonte.titulo}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
};

export function ProjetoDetalhe() {
  const [, params] = useRoute("/projetos/:slug");
  const slug = params?.slug || "";

  const page = pageContent[slug];
  const heroImage = pageImages[slug] || trailImg;

  if (!page) {
    return (
      <Layout>
        <Section className="py-24 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Página não encontrada</h2>
          <Link href="/projetos" className={buttonVariants()}>Voltar para Projetos</Link>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero image={heroImage} title={page.title} size="default" />
      <Section>
        <div className="max-w-3xl mx-auto">
          <Link href="/projetos" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2")}>
            <ArrowLeft size={16} className="mr-2" /> Voltar para Projetos
          </Link>
          {page.content}
        </div>
      </Section>
    </Layout>
  );
}
