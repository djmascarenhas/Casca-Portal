import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Clock, Phone, Instagram, ArrowLeft, Heart, Star, Sparkles, Smile, Users, QrCode, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";
import type { Testimonial } from "@shared/schema";

const emotionIcons: Record<string, { icon: any; color: string; label: string }> = {
  amei: { icon: Heart, color: "text-red-500", label: "Amei" },
  inesquecivel: { icon: Star, color: "text-amber-500", label: "Inesquecível" },
  maravilhoso: { icon: Sparkles, color: "text-purple-500", label: "Maravilhoso" },
  incrivel: { icon: Smile, color: "text-green-500", label: "Incrível" },
};

export function PatrocinadorPedraFurada() {
  const { data: testimonialsData } = useQuery<{ testimonials: Testimonial[]; count: number }>({
    queryKey: ["testimonials", "pedra-furada"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials?attraction=pedra-furada");
      return res.json();
    },
  });

  const testimonials = testimonialsData?.testimonials || [];
  const count = testimonialsData?.count || 0;

  const qrCodeUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/pedra-furada/testemunho`
    : "/pedra-furada/testemunho";

  return (
    <Layout>
      <Hero 
        image={waterfallImg}
        title="Cachoeira da Pedra Furada"
        subtitle="Uma das cachoeiras mais famosas da Chapada dos Guimarães"
        location="Rio da Casca, MT"
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

            {/* QR Code CTA */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-white text-center">
              <QrCode size={48} className="mx-auto mb-4 opacity-90" />
              <h3 className="font-ui font-bold uppercase tracking-wider mb-2">
                Está visitando agora?
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Deixe seu testemunho e compartilhe sua experiência!
              </p>
              <Link
                href="/pedra-furada/testemunho"
                className={cn(buttonVariants({ variant: "secondary" }), "w-full bg-white text-primary hover:bg-white/90")}
                data-testid="link-submit-testimonial"
              >
                Deixar Testemunho
              </Link>
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

      {/* Testimonials Wall */}
      <Section background="muted">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Users size={20} className="text-primary" />
            <span className="font-bold text-primary">{count} visitantes compartilharam</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Mural de Testemunhos
          </h2>
          <p className="text-muted-foreground mt-2">
            Veja o que os visitantes estão dizendo sobre a Pedra Furada
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const emotionData = emotionIcons[testimonial.emotion] || emotionIcons.amei;
              const Icon = emotionData.icon;
              
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={cn("p-2 rounded-full bg-muted", emotionData.color)}>
                          <Icon size={18} />
                        </div>
                        <span className="text-sm font-medium">{emotionData.label}</span>
                      </div>
                      
                      <p className="text-foreground mb-4 leading-relaxed">
                        "{testimonial.message}"
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-semibold text-primary">{testimonial.authorName}</p>
                          {testimonial.authorCity && (
                            <p className="text-muted-foreground text-xs">{testimonial.authorCity}</p>
                          )}
                        </div>
                        {testimonial.instagramHandle && (
                          <a 
                            href={`https://instagram.com/${testimonial.instagramHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary flex items-center gap-1"
                          >
                            <Instagram size={14} />
                            <span className="text-xs">@{testimonial.instagramHandle}</span>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">
              Seja o primeiro a deixar seu testemunho!
            </p>
            <Link
              href="/pedra-furada/testemunho"
              className={buttonVariants()}
            >
              Deixar Testemunho
            </Link>
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/pedra-furada/testemunho"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              data-testid="link-add-testimonial"
            >
              <MessageSquare size={18} />
              Adicionar meu testemunho
            </Link>
          </div>
        )}
      </Section>

      {/* QR Code Download Section */}
      <Section className="text-center">
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">
          QR Code para o Atrativo
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Imprima este QR code e coloque nos pontos estratégicos da Pedra Furada 
          para que os visitantes possam deixar seus testemunhos facilmente.
        </p>
        <div className="inline-block bg-white p-6 rounded-xl shadow-lg border">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`}
            alt="QR Code para testemunhos"
            className="w-48 h-48 mx-auto"
            data-testid="img-qrcode"
          />
          <p className="text-sm text-muted-foreground mt-4">
            Escaneie para deixar seu testemunho
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          URL: {qrCodeUrl}
        </p>
      </Section>
    </Layout>
  );
}
