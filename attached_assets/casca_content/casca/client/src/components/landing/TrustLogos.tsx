import { motion } from "framer-motion";

const partners = [
  { name: "SunPower", color: "text-chart-4" },
  { name: "Canadian Solar", color: "text-chart-2" },
  { name: "JinkoSolar", color: "text-primary" },
  { name: "Trina Solar", color: "text-chart-3" },
  { name: "LONGi", color: "text-chart-5" },
  { name: "BYD", color: "text-chart-1" },
];

export default function TrustLogos() {
  return (
    <section className="py-12 bg-muted/30 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p 
          className="text-center text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trabalhamos com as melhores marcas do mercado
        </motion.p>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ x: [0, -600, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 text-xl font-bold ${partner.color} opacity-60 hover:opacity-100 transition-opacity`}
              >
                {partner.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
