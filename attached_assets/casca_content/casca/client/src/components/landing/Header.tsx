import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, MessageCircle, Settings, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/logo_1765314472963.png";
import UserInfo from "@/components/UserInfo";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
  onOpenConsumerForm?: () => void;
}

export default function Header({ onThemeToggle, isDark = false, onOpenConsumerForm }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      setLocation("/#" + id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleSimularGratis = () => {
    setMobileMenuOpen(false);
    if (onOpenConsumerForm) {
      onOpenConsumerForm();
    } else {
      scrollToSection("calculadora");
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          <Link href="/" data-testid="link-home-logo">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={logoImage} 
                alt="SolarLink" 
                className="h-20 w-auto"
              />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Como Funciona", id: "como-funciona" },
              { label: "Calculadora", id: "calculadora" },
              { label: "Depoimentos", id: "depoimentos" },
              { label: "FAQ", id: "faq" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
                }`}
                data-testid={`link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/consultoria-ia">
              <button
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
                }`}
                data-testid="link-consultoria-ia"
              >
                <MessageCircle className="h-4 w-4" />
                Consultoria IA
              </button>
            </Link>
            <Link href="/leads">
              <button
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
                }`}
                data-testid="link-oportunidades"
              >
                <Briefcase className="h-4 w-4" />
                Oportunidades
              </button>
            </Link>
            <Link href="/admin">
              <button
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? "text-muted-foreground" : "text-white/80 hover:text-white"
                }`}
                data-testid="link-admin"
              >
                <Settings className="h-4 w-4" />
                Admin
              </button>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <UserInfo variant={scrolled ? "dark" : "light"} compact />
            </div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={onThemeToggle}
                className={scrolled ? "" : "text-white hover:bg-white/10"}
                data-testid="button-theme-toggle"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            <Link href="/integradores">
              <Button 
                variant={scrolled ? "outline" : "ghost"} 
                className={`hidden sm:flex ${!scrolled && "text-white border-white/30 hover:bg-white/10"}`}
                data-testid="button-integrator-login"
              >
                Portal Empresas
              </Button>
            </Link>
            <Button 
              className="hidden sm:flex"
              onClick={handleSimularGratis}
              data-testid="button-get-quote"
            >
              Simular Grátis
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className={`md:hidden ${!scrolled && "text-white hover:bg-white/10"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden py-6 border-t border-border bg-background"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="pb-4 mb-4 border-b border-border">
                <UserInfo variant="dark" />
              </div>
              <nav className="flex flex-col gap-4">
                {[
                  { label: "Como Funciona", id: "como-funciona" },
                  { label: "Calculadora", id: "calculadora" },
                  { label: "Depoimentos", id: "depoimentos" },
                  { label: "FAQ", id: "faq" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground text-left py-2"
                    data-testid={`link-${item.id}-mobile`}
                  >
                    {item.label}
                  </button>
                ))}
                <Link href="/consultoria-ia">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left py-2"
                    data-testid="link-consultoria-ia-mobile"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Consultoria IA
                  </button>
                </Link>
                <Link href="/leads">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left py-2"
                    data-testid="link-oportunidades-mobile"
                  >
                    <Briefcase className="h-4 w-4" />
                    Oportunidades
                  </button>
                </Link>
                <Link href="/admin">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left py-2"
                    data-testid="link-admin-mobile"
                  >
                    <Settings className="h-4 w-4" />
                    Admin
                  </button>
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Link href="/integradores">
                    <Button variant="outline" className="w-full" data-testid="button-integrator-login-mobile">
                      Portal Empresas
                    </Button>
                  </Link>
                  <Button onClick={handleSimularGratis} data-testid="button-get-quote-mobile">
                    Simular Grátis
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
