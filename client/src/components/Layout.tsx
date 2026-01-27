import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, MapPin, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { NewsletterForm } from "@/components/NewsletterForm";
import { useTheme } from "next-themes";

function ThemeToggle({ scrolled }: { scrolled: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`p-2 rounded-full transition-colors ${
        scrolled 
          ? 'hover:bg-muted text-foreground' 
          : 'hover:bg-white/20 text-white'
      }`}
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      data-testid="button-theme-toggle"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "História", href: "/historia" },
    { name: "Atrações", href: "/atracoes" },
    { name: "Projetos", href: "/projetos" },
    { name: "Galeria", href: "/galeria" },
    { name: "Notícias", href: "/blog" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={`text-2xl font-serif font-bold tracking-tighter ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}>
            Rio da Casca
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-ui font-medium uppercase tracking-wider hover:text-secondary transition-colors ${
                location === link.href ? "text-secondary" : scrolled ? "text-foreground" : "text-white drop-shadow-sm"
              }`}
            >
                {link.name}
            </Link>
          ))}
          <ThemeToggle scrolled={scrolled} />
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle scrolled={scrolled} />
          <button
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className={scrolled ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background shadow-lg border-t md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-ui font-bold uppercase tracking-wider ${
                    location === link.href ? "text-secondary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                    {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-white">Rio da Casca</h3>
          <p className="text-primary-foreground/80 font-ui text-sm leading-relaxed">
            Preservando a história, celebrando a natureza e acolhendo o futuro.
            O portal oficial de turismo e cultura da nossa comunidade.
          </p>
        </div>
        
        <div>
          <h4 className="font-ui font-bold uppercase tracking-wider mb-4 text-secondary">Navegação</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre a Comunidade</Link></li>
            <li><Link href="/historia" className="hover:text-white transition-colors">História & Patrimônio</Link></li>
            <li><Link href="/atracoes" className="hover:text-white transition-colors">Pontos Turísticos</Link></li>
            <li><Link href="/projetos" className="hover:text-white transition-colors">Projetos & Parceiros</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Notícias & Eventos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-ui font-bold uppercase tracking-wider mb-4 text-secondary">Contato</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><MapPin size={16} /> Chapada dos Guimarães, MT</li>
            <li>contato@riodacasca.com.br</li>
            <li className="pt-2 flex gap-4">
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            </li>
          </ul>
        </div>

        <NewsletterForm />
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50 font-ui">
        &copy; {new Date().getFullYear()} Comunidade do Rio da Casca. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
