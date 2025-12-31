import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ExternalLink, Youtube, Mail, ShoppingBag, Users } from "lucide-react";
import heroImg from "@assets/1000730803_1767132686330.png";

const elefantas = [
  { nome: "Maia", descricao: "Buscando novos padrões de força emocional", link: "https://elefantesbrasil.org.br/maia/" },
  { nome: "Rana", descricao: "Vocalizações doces e profunda alegria de viver", link: "https://elefantesbrasil.org.br/rana/" },
  { nome: "Mara", descricao: "Face meiga e infantil inocência", link: "https://elefantesbrasil.org.br/mara/" },
  { nome: "Bambi", descricao: "Jeitinho travesso, vivendo intensamente", link: "https://elefantesbrasil.org.br/bambi/" },
  { nome: "Guillermina", descricao: "Nossa caçula, impossível de resistir", link: "https://elefantesbrasil.org.br/guillermina/" },
];

export function Santuario() {
  return (
    <Layout>
      <Hero 
        image={heroImg}
        title="Santuário de Elefantes Brasil"
        subtitle="Ajudando elefantes a serem elefantes de novo"
        size="default"
      />
      {/* Introdução */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Conheça o SEB</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">O Santuário de Elefantes Brasil (SEB) é uma organização sem fins lucrativos que ajuda a transformar as vidas e o futuro dos elefantes cativos da América do Sul, devolvendo a eles a liberdade de poder ser quem querem e merecem ser – elefantes.</p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O Santuário está localizado no município de <strong>Chapada dos Guimarães, Mato Grosso</strong>, na região 
            do Rio da Casca. O SEB é uma colaboração com duas renomadas organizações internacionais: 
            <strong> ElephantVoices</strong> e <strong>Global Sanctuary for Elephants</strong>.
          </p>
        </div>
      </Section>
      {/* Por que o Brasil */}
      <Section background="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Por que o Brasil?</h2>
            <p className="text-muted-foreground mb-4">
              Após análises cuidadosas, o Brasil foi escolhido para que o crescente número de elefantes desalojados 
              na América do Sul, devido à proibição de animais em apresentações, recebam cuidados detalhados e intensivos.
            </p>
            <p className="text-muted-foreground mb-4">
              A Chapada dos Guimarães oferece clima e topografia ideais, cursos d'água intocados e vegetação exuberante, 
              perfeitos para elefantes africanos e asiáticos.
            </p>
            <p className="text-muted-foreground">
              A incrível diversidade natural permite que os elefantes fiquem soltos durante todo o ano, 
              expressando seus comportamentos naturais e atendendo suas necessidades básicas.
            </p>
          </div>
          <div className="bg-primary/5 p-8 rounded-2xl">
            <h3 className="font-serif font-bold text-primary mb-4">Mais de 40 anos de experiência</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-bold text-foreground">Scott Blais</p>
                <p className="text-muted-foreground">
                  Presidente e cofundador, com mais de 30 anos de experiência com elefantes asiáticos e africanos. 
                  Cofundador do Santuário de Elefantes no Tennessee, o maior dos EUA.
                </p>
              </div>
              <div>
                <p className="font-bold text-foreground">Kat Blais</p>
                <p className="text-muted-foreground">
                  Cofundadora e diretora do programa de bem-estar. Mais de 15 anos de experiência como técnica veterinária 
                  e especialista em reabilitação de animais selvagens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* As Elefantas */}
      <Section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-4 text-center">Conheça Nossas Elefantas</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Atualmente, o Santuário tem cinco habitantes: todas elefantas asiáticas, resgatadas após décadas 
          trabalhando em circos e zoológicos.
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {elefantas.map((elefanta) => (
            <Card key={elefanta.nome} className="text-center border-none shadow-md hover:shadow-lg transition-shadow" data-testid={`card-elefanta-${elefanta.nome.toLowerCase()}`}>
              <CardHeader className="pb-2">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="text-primary" size={32} />
                </div>
                <CardTitle className="font-serif text-xl">{elefanta.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{elefanta.descricao}</p>
                <a 
                  href={elefanta.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "link", size: "sm" }), "p-0 text-primary")}
                >
                  Conhecer <ExternalLink size={12} className="ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      {/* A Crise */}
      <Section background="primary">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-6">A Crise dos Elefantes</h2>
          <p className="text-white/90 leading-relaxed mb-6">
            Milhares de elefantes em cativeiro, ao redor do mundo, estão sofrendo. Ano após ano de isolamento, 
            contenção, má alimentação, abuso, falta de exercícios físicos adequados e cuidados médicos apropriados, 
            afetam física e psicologicamente essas criaturas extremamente inteligentes, sensíveis e sociais.
          </p>
          <p className="text-white/90 leading-relaxed">
            O Santuário oferece aos elefantes uma nova vida. Cabe a nós promover o futuro que, desesperadamente, 
            precisam e certamente merecem.
          </p>
        </div>
      </Section>
      {/* Como Ajudar */}
      <Section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Faça Parte da Manada!</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a 
            href="https://elefantesbrasil.org.br/doe/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="text-center border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full" data-testid="card-doar">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Heart className="text-secondary" size={28} />
                </div>
                <CardTitle className="font-serif">Doe Agora</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Sua doação ajuda a manter o Santuário funcionando e nossos elefantes saudáveis.
                </p>
              </CardContent>
            </Card>
          </a>
          
          <a 
            href="https://elefantes.colabore.org/adote" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="text-center border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full" data-testid="card-adotar">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="text-primary" size={28} />
                </div>
                <CardTitle className="font-serif">Adote um Elefante</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Torne-se padrinho ou madrinha de uma de nossas elefantas.
                </p>
              </CardContent>
            </Card>
          </a>
          
          <a 
            href="https://lojaelefantesbrasil.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="text-center border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full" data-testid="card-loja">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center">
                  <ShoppingBag className="text-amber-600" size={28} />
                </div>
                <CardTitle className="font-serif">Loja Oficial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Adquira produtos oficiais e ajude nossa causa.
                </p>
              </CardContent>
            </Card>
          </a>
        </div>
      </Section>
      {/* Links e Contato */}
      <Section background="muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8">Links Úteis</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://elefantesbrasil.org.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "bg-primary")}
            >
              <ExternalLink size={18} className="mr-2" /> Site Oficial
            </a>
            <a 
              href="https://www.youtube.com/channel/UCaDNMt8i7bc4HzW8s2eZbUg" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              <Youtube size={18} className="mr-2" /> YouTube
            </a>
            <a 
              href="mailto:info@elefantesbrasil.org.br"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              <Mail size={18} className="mr-2" /> Contato
            </a>
          </div>
          <p className="mt-8 text-muted-foreground">
            info@elefantesbrasil.org.br
          </p>
        </div>
      </Section>
    </Layout>
  );
}
