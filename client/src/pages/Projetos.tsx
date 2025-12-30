import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Leaf, GraduationCap, Users, Building2, MapPin, TreePine, Droplets, Mountain, Ship, ArrowRight, CheckCircle } from "lucide-react";
import homeHeroImg from "@assets/1000730803_1767132686330.png";
import aliancaContent from "@/data/alianca-content.json";

const iconMap: Record<string, React.ReactNode> = {
  "Preservação Ambiental": <TreePine className="text-green-600" size={32} />,
  "Turismo Sustentável": <MapPin className="text-blue-600" size={32} />,
  "Educação e Pesquisa": <GraduationCap className="text-amber-600" size={32} />,
  "Desenvolvimento Comunitário": <Users className="text-orange-600" size={32} />,
};

const parceiroIcons: Record<string, React.ReactNode> = {
  "Educação": <GraduationCap size={24} />,
  "Preservação": <Leaf size={24} />,
  "Comunidade": <Users size={24} />,
  "Governo": <Building2 size={24} />,
};

const atrativoIcons: Record<string, React.ReactNode> = {
  "brejao": <Droplets size={24} />,
  "poco-do-pacu": <Droplets size={24} />,
  "cachoeiras": <Mountain size={24} />,
  "manso": <Ship size={24} />,
};

export function Projetos() {
  const { projeto, parceiros, atrativos } = aliancaContent;

  return (
    <Layout>
      <Hero 
        image={homeHeroImg}
        title={projeto.titulo}
        subtitle={projeto.subtitulo}
        size="default"
      />

      {/* Visão Geral */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Visão Geral</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {projeto.visaoGeral}
          </p>
        </div>
      </Section>

      {/* Fatos-chave */}
      <Section background="muted">
        <h2 className="text-2xl font-serif font-bold text-primary mb-8 text-center">Fatos-Chave</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {projeto.fatos.map((fato, i) => (
            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
              <span className="text-foreground">{fato}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Eixos */}
      <Section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Eixos de Atuação</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projeto.eixos.map((eixo, i) => (
            <Card key={i} className="border-none shadow-md text-center" data-testid={`card-eixo-${i}`}>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-muted rounded-full">
                  {iconMap[eixo.titulo] || <Leaf size={32} />}
                </div>
                <CardTitle className="font-serif text-lg">{eixo.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{eixo.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Atrativos */}
      <Section background="muted">
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Atrativos da Região</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {atrativos.map((atrativo, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow" data-testid={`card-atrativo-${atrativo.slug}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {atrativoIcons[atrativo.slug] || <MapPin size={24} />}
                  </div>
                  <CardTitle className="font-serif text-lg">{atrativo.nome}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{atrativo.resumo}</p>
                <Link 
                  href={`/projetos/${atrativo.slug}`}
                  className={cn(buttonVariants({ variant: "link", size: "sm" }), "p-0 text-primary")}
                >
                  Saiba mais <ArrowRight size={14} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Plano de Crescimento */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Plano de Crescimento</h2>
          <div className="space-y-4">
            {projeto.planoCrescimento.map((fase, i) => (
              <div key={i} className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="text-foreground">{fase}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Público-alvo */}
      <Section background="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Público-Alvo</h2>
            <p className="text-muted-foreground mb-6">{projeto.casoDeUso}</p>
            <ul className="space-y-3">
              {projeto.publicoAlvo.map((publico, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={18} />
                  <span>{publico}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Indicadores</h2>
            <ul className="space-y-3">
              {projeto.indicadores.map((indicador, i) => (
                <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  <span>{indicador}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Governança */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Governança</h2>
          <p className="text-muted-foreground leading-relaxed">{projeto.governanca}</p>
        </div>
      </Section>

      {/* Parceiros */}
      <Section background="primary">
        <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">Nossos Parceiros</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parceiros.map((parceiro, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center" data-testid={`card-parceiro-${i}`}>
              <div className="mx-auto mb-4 p-3 bg-white/20 rounded-full w-fit text-white">
                {parceiroIcons[parceiro.tipo] || <Building2 size={24} />}
              </div>
              <h3 className="font-bold text-white mb-2">{parceiro.nome}</h3>
              <p className="text-white/80 text-sm">{parceiro.descricao}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Faça Parte da Aliança</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Junte-se a nós na missão de preservar e desenvolver sustentavelmente a região do Rio da Casca.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contato" className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90")}>
            Quero Participar da Aliança
          </Link>
          <Link href="/projetos/voluntariado" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Ser Voluntário
          </Link>
        </div>
      </Section>
    </Layout>
  );
}
