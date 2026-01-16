import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Link } from "wouter";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Clock, Phone, Instagram, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PatrocinadorPedraFurada() {
  return (
    <Layout>
      <Hero 
        image="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200"
        title="Cachoeira da Pedra Furada"
        subtitle="Uma das cachoeiras mais famosas da Chapada dos Guimarães"
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
            <h2 className="text-3xl font-serif font-bold text-primary">Sobre a Cachoeira</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Cachoeira da Pedra Furada é um dos destinos mais procurados da região de Rio da Casca. 
              Com suas águas cristalinas e a formação rochosa única que dá nome ao local, oferece uma 
              experiência inesquecível para visitantes de todas as idades.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              O local conta com estrutura para receber turistas, incluindo área de estacionamento, 
              trilhas sinalizadas e guias locais disponíveis para acompanhar os visitantes.
            </p>

            <h3 className="text-2xl font-serif font-bold text-primary pt-6">O que você vai encontrar</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Queda d'água de aproximadamente 15 metros
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Piscina natural para banho
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Trilha de nível fácil a moderado
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Formação rochosa com furo natural
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="font-ui font-bold uppercase tracking-wider text-primary mb-4">Informações</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="text-secondary" size={18} />
                  <span>Rio da Casca, Chapada dos Guimarães - MT</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-secondary" size={18} />
                  <span>Aberto das 8h às 17h</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-secondary" size={18} />
                  <span>(65) 99999-0001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="text-secondary" size={18} />
                  <span>@pedrafurada_chapada</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h3 className="font-ui font-bold uppercase tracking-wider text-primary mb-4">Dicas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Leve protetor solar e repelente</li>
                <li>• Use calçados apropriados para trilha</li>
                <li>• Traga lanche e água</li>
                <li>• Respeite a natureza</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
