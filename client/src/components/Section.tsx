import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  background?: "default" | "muted" | "primary" | "secondary";
  container?: boolean;
}

export function Section({ 
  children, 
  className, 
  background = "default", 
  container = true,
  ...props 
}: SectionProps) {
  const bgColors = {
    default: "bg-background",
    muted: "bg-muted/30",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  };

  return (
    <section 
      className={cn(
        "py-16 md:py-24", 
        bgColors[background], 
        className
      )} 
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </div>
      ) : (
        children
      )}
    </section>
  );
}
