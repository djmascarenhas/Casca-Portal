import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import homeHeroImg from "@assets/1000730803_1767132686330.png";
import { MapPin, Phone, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import type { InsertContactMessage } from "@shared/schema";

export function Contact() {
  const [formData, setFormData] = useState<InsertContactMessage>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao enviar mensagem");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderemos em breve.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome</label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                <Input 
                  id="subject" 
                  placeholder="Turismo, Imprensa, Parceria..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  data-testid="input-subject"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                <Textarea 
                  id="message" 
                  placeholder="Como podemos ajudar?" 
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  data-testid="input-message"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide"
                disabled={contactMutation.isPending}
                data-testid="button-submit"
              >
                {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
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
