import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import brazilMapImage from "@assets/efc4894c-f326-44f4-9ac2-619d8277cd75_1765570947013.png";

const opportunities = [
  { id: 1, x: 28, y: 25, city: "Manaus", state: "AM", leads: 45 },
  { id: 2, x: 55, y: 22, city: "Belem", state: "PA", leads: 38 },
  { id: 3, x: 62, y: 35, city: "Fortaleza", state: "CE", leads: 72 },
  { id: 4, x: 68, y: 40, city: "Recife", state: "PE", leads: 65 },
  { id: 5, x: 65, y: 48, city: "Salvador", state: "BA", leads: 89 },
  { id: 6, x: 50, y: 55, city: "Brasilia", state: "DF", leads: 56 },
  { id: 7, x: 45, y: 52, city: "Cuiaba", state: "MT", leads: 34 },
  { id: 8, x: 55, y: 62, city: "Goiania", state: "GO", leads: 48 },
  { id: 9, x: 58, y: 70, city: "Belo Horizonte", state: "MG", leads: 95 },
  { id: 10, x: 62, y: 75, city: "Rio de Janeiro", state: "RJ", leads: 120 },
  { id: 11, x: 55, y: 78, city: "Sao Paulo", state: "SP", leads: 156 },
  { id: 12, x: 48, y: 82, city: "Curitiba", state: "PR", leads: 67 },
  { id: 13, x: 50, y: 88, city: "Florianopolis", state: "SC", leads: 43 },
  { id: 14, x: 45, y: 92, city: "Porto Alegre", state: "RS", leads: 58 },
  { id: 15, x: 38, y: 65, city: "Campo Grande", state: "MS", leads: 29 },
];

const BrazilMapWithSweep = ({ sweepAngle }: { sweepAngle: number }) => {
  const sweepWidth = 45;
  const startAngle = sweepAngle;
  const endAngle = sweepAngle + sweepWidth;
  
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${brazilMapImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.15) drop-shadow(0 0 4px rgba(34, 197, 94, 0.15))',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${brazilMapImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.95) drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))',
          maskImage: `conic-gradient(from ${startAngle}deg at 50% 50%, black 0deg, black ${sweepWidth}deg, transparent ${sweepWidth}deg, transparent 360deg)`,
          WebkitMaskImage: `conic-gradient(from ${startAngle}deg at 50% 50%, black 0deg, black ${sweepWidth}deg, transparent ${sweepWidth}deg, transparent 360deg)`,
        }}
      />
    </div>
  );
};

const RadarSweep = ({ angle }: { angle: number }) => (
  <div
    className="absolute inset-0"
    style={{
      background: `conic-gradient(from ${angle}deg, transparent 0deg, rgba(34, 197, 94, 0.4) 20deg, rgba(34, 197, 94, 0.2) 35deg, transparent 45deg)`,
      borderRadius: "50%",
    }}
  />
);

const OpportunityPoint = ({ 
  x, y, city, state, leads, delay, isFullscreen 
}: { 
  x: number; 
  y: number; 
  city: string; 
  state: string; 
  leads: number;
  delay: number;
  isFullscreen: boolean;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const baseSize = Math.min(Math.max(leads / 15, 6), 14);
  const size = baseSize * (isFullscreen ? 1.5 : 1);

  return (
    <div
      className="absolute cursor-pointer"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        transform: "translate(-50%, -50%)",
        zIndex: showTooltip ? 60 : 50,
        padding: "12px"
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
      data-testid={`opportunity-point-${city.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div
        className="rounded-full bg-primary"
        style={{ 
          width: size, 
          height: size,
          boxShadow: "0 0 10px 5px rgba(34, 197, 94, 0.6)",
          animation: `pulse-glow 1.5s ease-in-out infinite`,
          animationDelay: `${delay * 0.15}s`
        }}
      />
      
      {showTooltip && (
        <div
          className="bg-card border border-border rounded-lg p-3 shadow-xl whitespace-nowrap pointer-events-none"
          style={{ 
            position: "fixed",
            zIndex: 9999,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -150%)"
          }}
          data-testid={`tooltip-${city.toLowerCase().replace(/\s/g, '-')}`}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{city}, {state}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            <span className="text-primary font-bold">{leads}</span> oportunidades
          </div>
        </div>
      )}
    </div>
  );
};

export default function RadarBrasil() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sweepAngle, setSweepAngle] = useState(0);
  const totalLeads = opportunities.reduce((acc, opp) => acc + opp.leads, 0);

  useEffect(() => {
    const sweepDuration = 4000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) % sweepDuration;
      const angle = (elapsed / sweepDuration) * 360;
      setSweepAngle(angle);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const RadarBackground = ({ fullscreen = false }: { fullscreen?: boolean }) => (
    <div className="absolute inset-0 rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/30 overflow-hidden">
      <div className="absolute inset-2 rounded-full border border-primary/20" />
      <div className="absolute inset-4 rounded-full border border-primary/15" />
      <div className="absolute inset-8 rounded-full border border-primary/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1px] h-full bg-primary/10" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-primary/10" />
      </div>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RadarSweep angle={sweepAngle} />
      </div>
      
      <div className="absolute inset-2 z-10 pointer-events-none">
        <BrazilMapWithSweep sweepAngle={sweepAngle} />
      </div>
    </div>
  );

  return (
    <>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Radar de Oportunidades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitore em tempo real as oportunidades de energia solar em todo o Brasil. 
              <span className="text-primary font-semibold"> {totalLeads.toLocaleString('pt-BR')} leads</span> disponiveis agora.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <RadarBackground />
              <div 
                className="absolute z-30 pointer-events-auto"
                style={{ top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }}
              >
                {opportunities.map((opp, index) => (
                  <OpportunityPoint
                    key={opp.id}
                    x={opp.x}
                    y={opp.y}
                    city={opp.city}
                    state={opp.state}
                    leads={opp.leads}
                    delay={index}
                    isFullscreen={false}
                  />
                ))}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Rastreando oportunidades em tempo real
                </span>
              </div>
            </div>
            
            <motion.button
              onClick={() => setIsFullscreen(true)}
              className="mt-8 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-fullscreen-radar"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Expandir Radar em Tela Cheia</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground"
                onClick={() => setIsFullscreen(false)}
                data-testid="button-close-fullscreen"
              >
                <X className="w-6 h-6" />
              </Button>
              
              <div className="relative w-[80vh] h-[80vh] max-w-[90vw] max-h-[90vw]">
                <RadarBackground fullscreen />
                <div 
                  className="absolute z-30 pointer-events-auto"
                  style={{ top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }}
                >
                  {opportunities.map((opp, index) => (
                    <OpportunityPoint
                      key={opp.id}
                      x={opp.x}
                      y={opp.y}
                      city={opp.city}
                      state={opp.state}
                      leads={opp.leads}
                      delay={index}
                      isFullscreen={true}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                <p className="text-lg font-semibold text-foreground">
                  <span className="text-primary">{totalLeads.toLocaleString('pt-BR')}</span> oportunidades ativas
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Clique nos pontos para ver detalhes
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
