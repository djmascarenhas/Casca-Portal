import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Link } from "wouter";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import heroImg from "@assets/1000730803_1767132686330.png";

interface TimelineEvent {
  id: string;
  year: string;
  period: string;
  title: string;
  description: string;
  category: "energia" | "politica" | "patrimonio" | "cultura";
  emoji: string;
  link?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "1889",
    period: "seculo-xix",
    title: "Proclamação da República e Início das Usinas",
    description: "Enquanto o Brasil virava República, Mato Grosso começava a explorar o potencial hidrelétrico de suas cachoeiras.",
    category: "energia",
    emoji: "⚡",
    link: "/historia"
  },
  {
    id: "2",
    year: "1891-1906",
    period: "seculo-xx",
    title: "Lutas Políticas em Mato Grosso",
    description: "Período de intensos conflitos políticos que moldaram a estrutura administrativa do estado.",
    category: "politica",
    emoji: "🏛️",
    link: "/historia"
  },
  {
    id: "3",
    year: "1920s",
    period: "seculo-xx",
    title: "A Luz Chega ao Interior",
    description: "Pequenas usinas hidrelétricas começam a iluminar comunidades rurais como Rio da Casca.",
    category: "energia",
    emoji: "💡",
    link: "/atracoes"
  },
  {
    id: "4",
    year: "1930s",
    period: "seculo-xx",
    title: "Construção do Chalé dos Governadores",
    description: "Edifício histórico construído para servir de refúgio aos governadores do estado.",
    category: "patrimonio",
    emoji: "🏠",
    link: "/atracoes"
  },
  {
    id: "5",
    year: "1970s",
    period: "seculo-xx",
    title: "Desenvolvimento da Comunidade",
    description: "Expansão das atividades agrícolas e consolidação da identidade cultural da região.",
    category: "cultura",
    emoji: "🌾",
    link: "/sobre"
  },
  {
    id: "6",
    year: "2012",
    period: "seculo-xxi",
    title: "Criação do Santuário de Elefantes",
    description: "O primeiro santuário de elefantes da América Latina é fundado na região, marcando um novo capítulo de preservação.",
    category: "patrimonio",
    emoji: "🐘",
    link: "/santuario"
  },
  {
    id: "7",
    year: "2020s",
    period: "seculo-xxi",
    title: "Aliança Rio da Casca Vivo",
    description: "Iniciativa comunitária para desenvolvimento sustentável e turismo consciente na região.",
    category: "cultura",
    emoji: "🤝",
    link: "/projetos"
  },
];

const filters = [
  { id: "todos", label: "Todos", emoji: "📜" },
  { id: "seculo-xix", label: "Século XIX", emoji: "🕰️" },
  { id: "seculo-xx", label: "Século XX", emoji: "📻" },
  { id: "seculo-xxi", label: "Século XXI", emoji: "🌐" },
];

const categoryColors = {
  energia: "bg-amber-500",
  politica: "bg-blue-500",
  patrimonio: "bg-green-600",
  cultura: "bg-purple-500",
};

export function Timeline() {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filteredEvents = activeFilter === "todos" 
    ? timelineEvents 
    : timelineEvents.filter(event => event.period === activeFilter);

  return (
    <Layout>
      <Hero 
        image={heroImg}
        title="Linha do Tempo"
        subtitle="Uma jornada através dos séculos que moldaram a história do Rio da Casca"
        icon="🕰️"
        location="Chapada dos Guimarães, MT"
        size="default"
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "filter-btn flex items-center gap-2",
                  activeFilter === filter.id && "active"
                )}
                data-testid={`filter-${filter.id}`}
              >
                <span>{filter.emoji}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="timeline-container">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="timeline-item"
                >
                  <div className={cn("timeline-marker", categoryColors[event.category])} />
                  
                  <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{event.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-secondary font-ui uppercase tracking-wider">
                            {event.year}
                          </span>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full text-white",
                            categoryColors[event.category]
                          )}>
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-primary mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        {event.link && (
                          <Link 
                            href={event.link}
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
                          >
                            Saber mais <span className="cta-arrow">→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum evento encontrado para este período.
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" className="text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-4">
          Quer Conhecer Mais da Nossa História?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Visite a comunidade do Rio da Casca e descubra pessoalmente os lugares que fizeram história.
        </p>
        <Link 
          href="/contato"
          className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90")}
        >
          Planejar sua Visita
        </Link>
      </Section>
    </Layout>
  );
}
