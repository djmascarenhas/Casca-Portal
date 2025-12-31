import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";

export default function Privacidade() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />

      <section className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Shield className="h-3 w-3 mr-1" />
                Privacidade
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-page-title">
                Politica de Privacidade
              </h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Ultima atualizacao: 01 de Dezembro de 2025
              </p>
            </div>

            <Card className="p-8">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-xl font-bold text-foreground mb-4">1. Introducao</h2>
                <p className="text-muted-foreground mb-6">
                  A SolarLink ("nos", "nosso" ou "nossa") esta comprometida em proteger sua privacidade. 
                  Esta Politica de Privacidade explica como coletamos, usamos, divulgamos e protegemos 
                  suas informacoes quando voce utiliza nossa plataforma.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">2. Informacoes que Coletamos</h2>
                <p className="text-muted-foreground mb-4">Coletamos os seguintes tipos de informacoes:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Informacoes de contato (nome, e-mail, telefone)</li>
                  <li>Informacoes sobre o imovel (endereco, tipo, consumo de energia)</li>
                  <li>Dados de navegacao e uso da plataforma</li>
                  <li>Informacoes de empresas integradoras (CNPJ, dados comerciais)</li>
                </ul>

                <h2 className="text-xl font-bold text-foreground mb-4">3. Como Usamos Suas Informacoes</h2>
                <p className="text-muted-foreground mb-4">Utilizamos suas informacoes para:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Conectar consumidores a integradores de energia solar</li>
                  <li>Enviar orcamentos e propostas personalizadas</li>
                  <li>Melhorar nossos servicos e experiencia do usuario</li>
                  <li>Comunicar atualizacoes, promocoes e novidades</li>
                  <li>Cumprir obrigacoes legais e regulatorias</li>
                </ul>

                <h2 className="text-xl font-bold text-foreground mb-4">4. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground mb-6">
                  Compartilhamos dados de consumidores apenas com integradores parceiros que adquiriram 
                  creditos para acessar leads. Nao vendemos suas informacoes para terceiros nao 
                  relacionados ao servico.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">5. Seguranca</h2>
                <p className="text-muted-foreground mb-6">
                  Implementamos medidas de seguranca tecnicas e organizacionais para proteger suas 
                  informacoes contra acesso nao autorizado, alteracao, divulgacao ou destruicao.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">6. Seus Direitos</h2>
                <p className="text-muted-foreground mb-4">Voce tem direito a:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir informacoes incorretas</li>
                  <li>Solicitar a exclusao de seus dados</li>
                  <li>Revogar consentimentos previamente fornecidos</li>
                  <li>Receber seus dados em formato portatil</li>
                </ul>

                <h2 className="text-xl font-bold text-foreground mb-4">7. Cookies</h2>
                <p className="text-muted-foreground mb-6">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiencia, 
                  analisar o uso do site e personalizar conteudo. Voce pode gerenciar suas 
                  preferencias de cookies nas configuracoes do navegador.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">8. Contato</h2>
                <p className="text-muted-foreground">
                  Para exercer seus direitos ou tirar duvidas sobre esta politica, entre em 
                  contato conosco atraves do e-mail: privacidade@solarlink.com.br
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
