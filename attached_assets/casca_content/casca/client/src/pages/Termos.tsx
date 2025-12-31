import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";

export default function Termos() {
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
                <FileText className="h-3 w-3 mr-1" />
                Termos
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-page-title">
                Termos de Uso
              </h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Ultima atualizacao: 01 de Dezembro de 2025
              </p>
            </div>

            <Card className="p-8">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-xl font-bold text-foreground mb-4">1. Aceitacao dos Termos</h2>
                <p className="text-muted-foreground mb-6">
                  Ao acessar e utilizar a plataforma SolarLink, voce concorda com estes Termos de Uso. 
                  Se voce nao concordar com qualquer parte destes termos, nao devera utilizar nossa plataforma.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">2. Descricao do Servico</h2>
                <p className="text-muted-foreground mb-6">
                  A SolarLink e uma plataforma que conecta consumidores interessados em energia solar 
                  a empresas integradoras certificadas. Atuamos como intermediarios, facilitando o 
                  contato entre as partes atraves de um sistema de leads qualificados.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">3. Cadastro de Consumidores</h2>
                <p className="text-muted-foreground mb-4">Ao se cadastrar como consumidor, voce:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Declara que as informacoes fornecidas sao verdadeiras e precisas</li>
                  <li>Autoriza o compartilhamento de seus dados com integradores parceiros</li>
                  <li>Concorda em receber contatos de empresas interessadas em seu projeto</li>
                  <li>Pode solicitar a exclusao de seus dados a qualquer momento</li>
                </ul>

                <h2 className="text-xl font-bold text-foreground mb-4">4. Cadastro de Integradores</h2>
                <p className="text-muted-foreground mb-4">Ao se cadastrar como integrador, voce:</p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Declara possuir CNPJ ativo e regular</li>
                  <li>Garante que possui qualificacao tecnica para realizar instalacoes solares</li>
                  <li>Concorda com o modelo de creditos para aquisicao de leads</li>
                  <li>Compromete-se a tratar os dados dos consumidores com sigilo</li>
                </ul>

                <h2 className="text-xl font-bold text-foreground mb-4">5. Sistema de Creditos</h2>
                <p className="text-muted-foreground mb-6">
                  Os creditos adquiridos nao possuem prazo de validade e podem ser utilizados para 
                  desbloquear leads disponiveis na plataforma. Uma vez adquirido, o lead e de uso 
                  exclusivo do integrador. Nao ha reembolso de creditos ja utilizados.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">6. Responsabilidades</h2>
                <p className="text-muted-foreground mb-6">
                  A SolarLink nao se responsabiliza pela qualidade dos servicos prestados pelos 
                  integradores, nem pela concretizacao de negocios entre as partes. Nossa 
                  responsabilidade se limita a disponibilizar a plataforma e os leads qualificados.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">7. Propriedade Intelectual</h2>
                <p className="text-muted-foreground mb-6">
                  Todo o conteudo da plataforma, incluindo textos, imagens, logos e software, 
                  e de propriedade da SolarLink ou de seus licenciadores. E proibida a reproducao 
                  sem autorizacao previa.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">8. Modificacoes</h2>
                <p className="text-muted-foreground mb-6">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alteracoes serao comunicadas atraves da plataforma e entrarao em vigor 
                  imediatamente apos a publicacao.
                </p>

                <h2 className="text-xl font-bold text-foreground mb-4">9. Foro</h2>
                <p className="text-muted-foreground">
                  Estes Termos de Uso sao regidos pelas leis brasileiras. Fica eleito o foro 
                  da comarca de Sao Paulo/SP para dirimir quaisquer controversias decorrentes 
                  destes termos.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
