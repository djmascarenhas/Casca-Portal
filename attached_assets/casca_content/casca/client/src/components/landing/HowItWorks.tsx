import { Card } from "@/components/ui/card";
import { FileText, Search, Wrench, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    title: "Simule Grátis",
    description: "Preencha seus dados de consumo em menos de 2 minutos e receba uma análise personalizada do seu potencial de economia.",
    step: "01",
    color: "primary"
  },
  {
    icon: Search,
    title: "Receba Propostas",
    description: "Em até 24 horas, integradores certificados da sua região entrarão em contato com propostas competitivas.",
    step: "02",
    color: "chart-2"
  },
  {
    icon: Wrench,
    title: "Instalação Profissional",
    description: "Escolha a melhor proposta e acompanhe todo o processo de instalação com suporte completo da plataforma.",
    step: "03",
    color: "chart-3"
  },
  {
    icon: CheckCircle,
    title: "Comece a Economizar",
    description: "Após a instalação, acompanhe sua economia em tempo real e aproveite até 25 anos de energia limpa e barata.",
    step: "04",
    color: "chart-4"
  }
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Processo Simples
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em apenas quatro passos simples, você estará no caminho para economizar 
            com energia limpa e renovável.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-primary via-chart-2 via-chart-3 to-chart-4 rounded-full opacity-30" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="p-8 text-center border-card-border h-full relative group hover:shadow-lg transition-all duration-300">
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-5xl font-bold text-${step.color}/10 group-hover:text-${step.color}/20 transition-colors`}>
                    {step.step}
                  </div>
                  
                  <motion.div 
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-${step.color}/10 mb-6 relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className={`h-10 w-10 text-${step.color}`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
