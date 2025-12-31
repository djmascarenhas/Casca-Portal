import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Home, Shield, Award, Star, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import residencialImage from "@assets/generated_images/residential_solar_panels_house.png";
import comercialImage from "@assets/generated_images/commercial_solar_panels_building.png";
import industrialImage from "@assets/generated_images/industrial_solar_panels_factory.png";
import agronegocioImage from "@assets/generated_images/agricultural_solar_panels_farm.png";
import usinasImage from "@assets/generated_images/solar_power_plant_investment.png";

interface HeroProps {
  onConsumerClick?: () => void;
  onIntegratorClick?: () => void;
}

const marketSegments = [
  {
    id: "residencial",
    headline: "Economize até 80% na Conta de Energia",
    subtitle: "Residencial",
    description: "Reduza drasticamente sua conta de luz com energia solar em casa.",
    image: residencialImage
  },
  {
    id: "comercial",
    headline: "Reduza Custos Operacionais com Energia Solar",
    subtitle: "Comercial",
    description: "Lojas, escritorios e comercios economizam ate 90% na conta de energia.",
    image: comercialImage
  },
  {
    id: "industrial",
    headline: "Maximize a Eficiencia Industrial com Energia Limpa",
    subtitle: "Industrial",
    description: "Fabricas e industrias reduzem custos e ganham competitividade.",
    image: industrialImage
  },
  {
    id: "fazendas",
    headline: "Produza Energia na Sua Fazenda",
    subtitle: "Agronegocio",
    description: "Irrigacao, refrigeracao e maquinario com energia solar rural.",
    image: agronegocioImage
  },
  {
    id: "usinas",
    headline: "Invista em Usinas Solares com Alto Retorno",
    subtitle: "Usinas de Investimento",
    description: "Rentabilidade de ate 18% ao ano com usinas fotovoltaicas.",
    image: usinasImage
  }
];

export default function Hero({ onConsumerClick, onIntegratorClick }: HeroProps) {
  const [counter, setCounter] = useState({ projects: 0, savings: 0, integrators: 0 });
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  useEffect(() => {
    const segmentInterval = setInterval(() => {
      setCurrentSegmentIndex((prev) => (prev + 1) % marketSegments.length);
    }, 5600);
    
    return () => clearInterval(segmentInterval);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounter({
        projects: Math.floor(2500 * progress),
        savings: Math.floor(15 * progress),
        integrators: Math.floor(350 * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const currentSegment = marketSegments[currentSegmentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSegment.id}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentSegment.image})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-chart-4/20 blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "20%", right: "15%" }}
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Plataforma #1 em Energia Solar
          </Badge>
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Homologada ANEEL
          </Badge>
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            4.9/5 Avaliação
          </Badge>
        </motion.div>

        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-2 mb-4"
          >
            {marketSegments.map((segment, index) => (
              <button
                key={segment.id}
                onClick={() => setCurrentSegmentIndex(index)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  index === currentSegmentIndex
                    ? "bg-primary text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
                data-testid={`button-segment-${segment.id}`}
              >
                {segment.subtitle}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="h-[120px] sm:h-[140px] lg:h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSegment.id}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              data-testid="text-hero-headline"
            >
              {currentSegment.headline.includes("80%") ? (
                <>
                  {currentSegment.headline.split("80%")[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">
                    80%
                  </span>
                  {currentSegment.headline.split("80%")[1]}
                </>
              ) : currentSegment.headline.includes("90%") ? (
                <>
                  {currentSegment.headline.split("90%")[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">
                    90%
                  </span>
                  {currentSegment.headline.split("90%")[1]}
                </>
              ) : currentSegment.headline.includes("18%") ? (
                <>
                  {currentSegment.headline.split("18%")[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">
                    18%
                  </span>
                  {currentSegment.headline.split("18%")[1]}
                </>
              ) : (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
                  {currentSegment.headline}
                </span>
              )}
            </motion.h1>
          </AnimatePresence>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${currentSegment.id}`}
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            data-testid="text-hero-description"
          >
            {currentSegment.description}
          </motion.p>
        </AnimatePresence>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 text-white/80 text-sm mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Simulação 100% Gratuita
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Instaladores Certificados
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Garantia de 25 Anos
          </span>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onConsumerClick}
            className="w-full sm:w-auto text-lg px-8 py-7 bg-gradient-to-r from-primary to-chart-3 hover:opacity-90 text-white shadow-lg shadow-primary/30 transition-all duration-300"
            data-testid="button-consumer-cta"
          >
            <Home className="mr-2 h-5 w-5" />
            Simular Minha Economia
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={onIntegratorClick}
            className="w-full sm:w-auto text-lg px-8 py-7 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 transition-all duration-300"
            data-testid="button-integrator-cta"
          >
            <Building2 className="mr-2 h-5 w-5" />
            Sou Integrador
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-4xl font-bold text-white" data-testid="text-stat-projects">
              {counter.projects.toLocaleString('pt-BR')}+
            </div>
            <div className="text-xs sm:text-sm text-white/70 mt-1">Projetos Instalados</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-4xl font-bold text-white" data-testid="text-stat-savings">
              R$ {counter.savings}M+
            </div>
            <div className="text-xs sm:text-sm text-white/70 mt-1">Economia Gerada</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-4xl font-bold text-white" data-testid="text-stat-integrators">
              {counter.integrators}+
            </div>
            <div className="text-xs sm:text-sm text-white/70 mt-1">Integradores</div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
