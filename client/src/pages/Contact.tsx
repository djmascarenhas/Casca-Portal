import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import homeHeroImg from "@assets/generated_images/aerial_view_of_rio_da_casca_nature.png";
import { MapPin, Phone, Mail } from "lucide-react";

export function Contact() {
  return (
    <Layout>
      <Hero 
        image={homeHeroImg}
        title="Contato"
        subtitle="Estamos aqui para ajudar você a planejar sua visita."
        size="default"
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Fale Conosco</h2>
              <p className="text-muted-foreground mb-8">
                Tem dúvidas sobre roteiros, horários ou parcerias? Envie uma mensagem e responderemos em breve.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Endereço</h3>
                  <p className="text-muted-foreground">Estrada da Usina, km 5<br/>Chapada dos Guimarães - MT</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Telefone</h3>
                  <p className="text-muted-foreground">(65) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Email</h3>
                  <p className="text-muted-foreground">contato@riodacasca.com.br</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 shadow-lg border-muted">
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome</label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                <Input id="subject" placeholder="Turismo, Imprensa, Parceria..." />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                <Textarea id="message" placeholder="Como podemos ajudar?" className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide">
                Enviar Mensagem
              </Button>
            </form>
          </Card>

        </div>
      </Section>

      <Section background="muted">
        <h2 className="text-2xl font-serif font-bold text-primary mb-8 text-center">Localização</h2>
        <InteractiveMap />
      </Section>
    </Layout>
  );
}
