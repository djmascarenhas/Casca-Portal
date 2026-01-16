import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Link } from "wouter";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Clock, Phone, Instagram, ArrowLeft, ShoppingBasket, Leaf, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function PatrocinadorMercearia() {
  return (
    <Layout>
      <Hero 
        image="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200"
        title="Mercearia Rio da Casca"
        subtitle="Produtos locais e artesanais da nossa comunidade"
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
            <h2 className="text-3xl font-serif font-bold text-primary">Sobre a Mercearia</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Mercearia Rio da Casca é mais do que um comércio local - é um verdadeiro tesouro da 
              comunidade. Fundada há três gerações, a mercearia preserva a tradição de oferecer 
              produtos frescos, artesanais e cultivados na própria região.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Aqui você encontra desde os ingredientes básicos do dia a dia até produtos únicos como 
              mel silvestre do cerrado, queijos artesanais, doces caseiros e temperos cultivados 
              pelos agricultores familiares da comunidade.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center p-6 bg-card rounded-lg border">
                <ShoppingBasket className="mx-auto text-secondary mb-3" size={32} />
                <h4 className="font-ui font-bold text-primary">Variedade</h4>
                <p className="text-sm text-muted-foreground">Produtos do básico ao especial</p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <Leaf className="mx-auto text-secondary mb-3" size={32} />
                <h4 className="font-ui font-bold text-primary">Orgânicos</h4>
                <p className="text-sm text-muted-foreground">Direto dos produtores locais</p>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <Heart className="mx-auto text-secondary mb-3" size={32} />
                <h4 className="font-ui font-bold text-primary">Tradição</h4>
                <p className="text-sm text-muted-foreground">3 gerações de história</p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-primary pt-6">Produtos em Destaque</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Mel silvestre do cerrado mato-grossense
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Queijo artesanal curado
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Doces de frutas do cerrado (pequi, cagaita, mangaba)
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Farinha de mandioca produzida localmente
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full mt-2"></span>
                Cachaça artesanal da região
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="font-ui font-bold uppercase tracking-wider text-primary mb-4">Informações</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="text-secondary" size={18} />
                  <span>Rua Principal, Rio da Casca - MT</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-secondary" size={18} />
                  <span>Seg a Sáb: 7h às 19h</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-secondary" size={18} />
                  <span>(65) 99999-0003</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="text-secondary" size={18} />
                  <span>@mercearia_riodacasca</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h3 className="font-ui font-bold uppercase tracking-wider text-primary mb-4">Apoie o Local</h3>
              <p className="text-sm text-muted-foreground">
                Ao comprar na Mercearia Rio da Casca, você ajuda a manter viva a economia local e 
                apoia diretamente os pequenos produtores da nossa comunidade.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
