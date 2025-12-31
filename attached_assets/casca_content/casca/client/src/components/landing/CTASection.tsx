import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Building2, CheckCircle, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
  onConsumerClick?: () => void;
  onIntegratorClick?: () => void;
}

export default function CTASection({ onConsumerClick, onIntegratorClick }: CTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-chart-3 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-white/90 text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield className="w-4 h-4" />
              Garantia de 25 anos
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Award className="w-4 h-4" />
              +350 integradores certificados
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle className="w-4 h-4" />
              Homologação ANEEL
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Pronto para Economizar?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
            Junte-se a mais de 2.500 brasileiros que já transformaram 
            sua relação com a energia elétrica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                onClick={onConsumerClick}
                className="w-full sm:w-auto text-lg px-10 py-7 bg-white text-primary hover:bg-white/95 shadow-xl shadow-black/20 group"
                data-testid="button-cta-consumer"
              >
                <Zap className="mr-2 h-5 w-5" />
                Simular Minha Economia
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={onIntegratorClick}
                className="w-full sm:w-auto text-lg px-10 py-7 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                data-testid="button-cta-integrator"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Sou Integrador
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
