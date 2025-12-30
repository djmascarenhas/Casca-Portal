import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroProps {
  image: string;
  title: string;
  subtitle?: string;
  size?: "default" | "large" | "full";
  overlay?: boolean;
  align?: "center" | "left";
  children?: React.ReactNode;
}

export function Hero({ 
  image, 
  title, 
  subtitle, 
  size = "default", 
  overlay = true, 
  align = "center",
  children 
}: HeroProps) {
  const heightClass = {
    default: "h-[60vh] min-h-[400px]",
    large: "h-[80vh] min-h-[600px]",
    full: "h-screen",
  }[size];

  return (
    <div className={cn("relative w-full flex items-center overflow-hidden", heightClass)}>
      {/* Background Image with Parallax-like static attachment or simple cover */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 z-10" />
      )}

      {/* Content */}
      <div className={cn("container relative z-20 mx-auto px-4", align === "center" ? "text-center" : "text-left")}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-4 drop-shadow-lg leading-tight"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 font-ui max-w-2xl mx-auto drop-shadow-md font-light"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
