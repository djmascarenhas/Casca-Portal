import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Link } from "wouter";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Clock, Phone, Instagram, ArrowLeft, Utensils, Music, Beer } from "lucide-react";
import { cn } from "@/lib/utils";

export function PatrocinadorBarDoLeo() {
  return (
    <Layout>
      <Hero 
        image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200"
        title="Bar do Léo"
        subtitle="O point da comunidade do Rio da Casca"
        size="default"
      />

      <Section>
        <Link 
          href="/" 
          className={cn(buttonVariants({ variant: "ghost" }), "mb-8 gap-2")}
        >
          <ArrowLeft size={16} /> Voltar para Início
        </Link>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-primary">Sobre o Bar do Léo</h2>
            <p className="text-muted-foreground leading-relaxed">
              O Bar do Léo é o coração social da comunidade do Rio da Casca. Há mais de 15 anos 
              servindo os moradores e visitantes, o estabelecimento se tornou um ponto de encontro 
              obrigatório para quem deseja experimentar a autêntica hospitalidade mato-grossense.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com um ambiente acolhedor e música ao vivo nos finais de semana, o Bar do Léo oferece 
              uma seleção de petiscos regionais, cervejas geladas e drinks especiais preparados pelo 
              próprio Léo, que está sempre por trás do balcão recebendo os clientes com um sorriso.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center p-6 bg-card rounded-lg border">
                <Utensils className="mx-auto text-secondary mb-3" size={32} />
                <h4 className="font-ui font-bold text-primary">Petiscos</h4>
                <p className="text-sm text-muted-foreground">Comida regional caseira</p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <Beer className="mx-auto text-secondary mb-3" size={32} />
                <h4 className="font-ui font-bold text-primary">Bebidas</h4>
                <p className="text-sm text-muted-foreground">Cerveja gelada e drinks</p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <Music className="mx-auto text-secondary mb-3" size={32} />
                <h4 className="font-ui font-bold text-primary">Música</h4>
                <p className="text-sm text-muted-foreground">Ao vivo nos finais de semana</p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-primary pt-6">Especialidades</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Porção de peixe frito do Rio Casca
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Espetinho de carne de sol
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Caipirinha de frutas do cerrado
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Tábua de queijos e embutidos artesanais
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="font-ui font-bold uppercase tracking-wider text-primary mb-4">Informações</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="text-secondary" size={18} />
                  <span>Centro, Rio da Casca - MT</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-secondary" size={18} />
                  <span>Ter a Dom: 17h às 23h</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-secondary" size={18} />
                  <span>(65) 99999-0002</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="text-secondary" size={18} />
                  <span>@bardoleo_riodacasca</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary/10 rounded-lg p-6">
              <h3 className="font-ui font-bold uppercase tracking-wider text-primary mb-4">Eventos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sexta: Pagode ao vivo</li>
                <li>• Sábado: Sertanejo raiz</li>
                <li>• Domingo: Roda de viola</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
