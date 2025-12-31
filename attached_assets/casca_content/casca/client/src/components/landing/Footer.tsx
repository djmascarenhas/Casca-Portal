import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import logoImage from "@assets/logo_1765314472963.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src={logoImage} 
                alt="SolarLink" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A plataforma que conecta quem deseja economizar com energia solar 
              a instaladores certificados em todo o Brasil. Mais de 2.500 projetos 
              realizados com sucesso.
            </p>
            
            <div className="flex gap-3 mb-6">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" }
              ].map((social) => (
                <motion.a 
                  key={social.label}
                  href="#" 
                  className="p-3 rounded-xl bg-muted hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                <Shield className="h-4 w-4 text-primary" />
                Homologada ANEEL
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                <Award className="h-4 w-4 text-primary" />
                ISO 9001
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Para Consumidores</h4>
            <ul className="space-y-4">
              {[
                { label: "Fazer Simulação", id: "simulation" },
                { label: "Como Funciona", id: "how-works" },
                { label: "Calculadora Solar", id: "calculator" },
                { label: "Perguntas Frequentes", id: "faq" },
                { label: "Blog Solar", id: "blog" }
              ].map((item) => (
                <li key={item.id}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Para Empresas</h4>
            <ul className="space-y-4">
              {[
                { label: "Cadastrar Empresa", id: "register-company" },
                { label: "Comprar Créditos", id: "buy-credits" },
                { label: "Portal do Parceiro", id: "partner-portal" },
                { label: "Casos de Sucesso", id: "success-cases" },
                { label: "API para Integradores", id: "api" }
              ].map((item) => (
                <li key={item.id}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-muted">
                  <Mail className="h-4 w-4" />
                </div>
                contato@solarlink.com.br
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-muted">
                  <Phone className="h-4 w-4" />
                </div>
                0800 123 4567
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-muted">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>São Paulo, SP<br />Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 SolarLink. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Política de Privacidade", id: "privacy" },
                { label: "Termos de Uso", id: "terms" },
                { label: "Cookies", id: "cookies" }
              ].map((item) => (
                <a 
                  key={item.id}
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`link-${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
