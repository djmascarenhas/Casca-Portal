import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Carlos Silva",
    location: "São Paulo, SP",
    role: "Proprietário Residencial",
    content: "Minha conta de luz caiu de R$ 800 para R$ 60 por mês. O processo foi super simples e os instaladores foram extremamente profissionais. Melhor investimento que já fiz!",
    rating: 5,
    savings: "92%",
    initials: "CS",
    projectValue: "R$ 28.000"
  },
  {
    name: "Marina Santos",
    location: "Belo Horizonte, MG", 
    role: "Empresária - Padaria",
    content: "Instalei em minha padaria e o retorno foi mais rápido do que esperava. Em 3 anos já terei recuperado todo o investimento. Recomendo a todos os empresários!",
    rating: 5,
    savings: "88%",
    initials: "MS",
    projectValue: "R$ 45.000"
  },
  {
    name: "Roberto Oliveira",
    location: "Curitiba, PR",
    role: "Integrador Parceiro",
    content: "Como integrador, a plataforma revolucionou meu negócio. Leads super qualificados e sistema de créditos justo. Já fechei mais de 50 instalações através do SolarLink!",
    rating: 5,
    savings: "50+ projetos",
    initials: "RO",
    projectValue: "Parceiro desde 2023"
  },
  {
    name: "Fernanda Lima",
    location: "Rio de Janeiro, RJ",
    role: "Síndica - Condomínio",
    content: "Conseguimos instalar energia solar no condomínio inteiro. A economia é dividida entre todos os moradores. Foi uma decisão unânime depois de ver a simulação!",
    rating: 5,
    savings: "85%",
    initials: "FL",
    projectValue: "R$ 120.000"
  },
  {
    name: "André Costa",
    location: "Florianópolis, SC",
    role: "Proprietário Rural",
    content: "Na fazenda, a conta de luz era altíssima por causa das bombas de irrigação. Hoje praticamente zerou. O suporte durante todo o processo foi impecável.",
    rating: 5,
    savings: "95%",
    initials: "AC",
    projectValue: "R$ 85.000"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section id="depoimentos" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Depoimentos Reais
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 2.500 famílias e empresas já transformaram sua relação com a energia elétrica.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="hidden sm:flex"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex-1 mx-4 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-${currentIndex}-${index}`}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.4 }}
                      className={index > 0 ? "hidden md:block" : ""}
                    >
                      <Card className="p-6 border-card-border h-full hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                          <Avatar className="h-14 w-14 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-lg">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-bold text-foreground text-lg" data-testid={`text-testimonial-name-${index}`}>
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.location}
                            </div>
                            <div className="text-xs text-primary font-semibold mt-1">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 mb-5">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-chart-4 text-chart-4" />
                          ))}
                        </div>

                        <div className="relative mb-6">
                          <Quote className="absolute -top-2 -left-1 h-8 w-8 text-primary/10" />
                          <p className="text-muted-foreground pl-6 leading-relaxed">
                            "{testimonial.content}"
                          </p>
                        </div>

                        <div className="pt-5 border-t border-border flex items-center justify-between">
                          <div>
                            <div className="text-xs text-muted-foreground">Economia alcançada</div>
                            <div className="text-xl font-bold text-primary" data-testid={`text-testimonial-savings-${index}`}>
                              {testimonial.savings}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Projeto</div>
                            <div className="text-sm font-semibold text-foreground">
                              {testimonial.projectValue}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="hidden sm:flex"
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 sm:hidden">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
