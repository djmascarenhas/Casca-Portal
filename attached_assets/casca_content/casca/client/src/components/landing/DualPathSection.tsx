import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, Zap, PiggyBank, TrendingUp, Users, MapPin, CreditCard, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import familyImage from "@assets/generated_images/family_with_solar_home.png";
import installerImage from "@assets/generated_images/solar_installer_professional.png";

interface DualPathSectionProps {
  onConsumerClick?: () => void;
  onIntegratorClick?: () => void;
}

export default function DualPathSection({ onConsumerClick, onIntegratorClick }: DualPathSectionProps) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Duas Soluções, Um Objetivo
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Como Podemos Ajudar Você?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seja você um consumidor buscando economia ou uma empresa de instalação, 
            temos a solução ideal para suas necessidades.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-card-border group hover:shadow-xl transition-all duration-500 h-full">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={familyImage} 
                  alt="Família com energia solar" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/90 text-sm font-medium">Para Residências e Empresas</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                    <Home className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Para sua Casa ou Negócio</h3>
                    <p className="text-sm text-muted-foreground">Economia garantida</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 text-lg">Reduza sua conta de luz em até 80%. Receba uma simulação gratuita e propostas personalizadas em até 24 horas.</p>

                <ul className="space-y-4 mb-8">
                  {[
                    { icon: Zap, text: "Simulação gratuita em 2 minutos" },
                    { icon: PiggyBank, text: "Economia de até 95% na conta de luz" },
                    { icon: TrendingUp, text: "Retorno do investimento em até 4 anos" },
                    { icon: CheckCircle, text: "Garantia de 25 anos nos painéis" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-4 text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button 
                  className="w-full py-6 text-lg group/btn" 
                  onClick={onConsumerClick}
                  data-testid="button-consumer-path"
                >
                  Simular Minha Economia
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-card-border group hover:shadow-xl transition-all duration-500 h-full">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={installerImage} 
                  alt="Instalador profissional" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/90 text-sm font-medium">Para Integradores e Instaladores</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/5">
                    <Building2 className="h-7 w-7 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Para Integradores</h3>
                    <p className="text-sm text-muted-foreground">Venha crescer conosco</p>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: Users, text: "Leads pré-qualificados e verificados" },
                    { icon: MapPin, text: "Filtro por região de atuação" },
                    { icon: CreditCard, text: "Sistema de créditos flexível" },
                    { icon: TrendingUp, text: "Taxa de conversão de até 35%" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-4 text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-chart-2" />
                      </div>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full py-6 text-lg group/btn border-chart-2/30 hover:bg-chart-2/5" 
                  onClick={onIntegratorClick}
                  data-testid="button-integrator-path"
                >
                  Acessar Portal de Empresas
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
