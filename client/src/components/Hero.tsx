import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface HeroProps {
  image: string;
  title: string;
  subtitle?: string;
  size?: "default" | "large" | "full";
  overlay?: boolean;
  align?: "center" | "left";
  icon?: string;
  location?: string;
  children?: React.ReactNode;
}

export function Hero({ 
  image, 
  title, 
  subtitle, 
  size = "default", 
  overlay = true, 
  align = "center",
  icon,
  location,
  children 
}: HeroProps) {
  const heightClass = {
    default: "h-[60vh] min-h-[400px]",
    large: "h-[80vh] min-h-[600px]",
    full: "h-screen",
  }[size];

  return (
    <div className={cn("relative w-full flex items-center overflow-hidden", heightClass)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />
        </>
      )}

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path 
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" 
            className="fill-background"
          />
        </svg>
      </div>

      {/* Content */}
      <div className={cn("container relative z-20 mx-auto px-4", align === "center" ? "text-center" : "text-left")}>
        {/* Floating Icon */}
        {icon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hero-icon text-5xl md:text-7xl mb-6"
            aria-hidden="true"
          >
            {icon}
          </motion.div>
        )}

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-tight"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-white/90 font-ui max-w-3xl mx-auto drop-shadow-md font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}

        {/* Location Badge */}
        {location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 text-white/80 text-sm md:text-base font-ui"
          >
            <MapPin size={18} className="text-secondary" />
            <span>{location}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
