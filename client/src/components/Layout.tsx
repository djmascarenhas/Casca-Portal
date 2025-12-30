import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
        <Link href="/">
          <a className={`text-2xl font-serif font-bold tracking-tighter ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}>
            Rio da Casca
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`text-sm font-ui font-medium uppercase tracking-wider hover:text-secondary transition-colors ${
                  location === link.href ? "text-secondary" : scrolled ? "text-foreground" : "text-white drop-shadow-sm"
                }`}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
        </button>
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
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-sm font-ui font-bold uppercase tracking-wider ${
                      location === link.href ? "text-secondary" : "text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
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
            <li><Link href="/sobre"><a className="hover:text-white transition-colors">Sobre a Comunidade</a></Link></li>
            <li><Link href="/historia"><a className="hover:text-white transition-colors">História & Patrimônio</a></Link></li>
            <li><Link href="/atracoes"><a className="hover:text-white transition-colors">Pontos Turísticos</a></Link></li>
            <li><Link href="/blog"><a className="hover:text-white transition-colors">Notícias & Eventos</a></Link></li>
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

        <div>
          <h4 className="font-ui font-bold uppercase tracking-wider mb-4 text-secondary">Newsletter</h4>
          <p className="text-xs text-primary-foreground/70 mb-2">Receba novidades e histórias da região.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Seu email" 
              className="bg-primary-foreground/10 border border-primary-foreground/20 rounded px-3 py-2 text-sm w-full placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary text-white"
            />
            <Button size="sm" variant="secondary" className="bg-secondary text-white hover:bg-secondary/90">OK</Button>
          </div>
        </div>
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
