import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";

export function History() {
  return (
    <Layout>
      <Hero 
        image={chaleImg}
        title="História & Patrimônio"
        subtitle="As pedras e as águas que contam a história de Mato Grosso."
        size="default"
      />
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-secondary pl-8 space-y-12">
            
            <div className="relative">
              <span className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-secondary ring-4 ring-white" />
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">Século XIX - O Início</h3>
              <p className="text-muted-foreground">
                A região do Rio da Casca desponta como um polo importante durante o ciclo da cana-de-açúcar. 
                A instalação da Usina da Casca marca o início de uma era de desenvolvimento industrial pioneiro no estado.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-secondary ring-4 ring-white" />
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">A Construção do Chalé</h3>
              <p className="text-muted-foreground">
                O Chalé dos Governadores foi erguido para servir de residência e ponto de apoio administrativo. 
                Sua arquitetura reflete a robustez e a elegância da época, servindo de palco para decisões importantes de Mato Grosso.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-secondary ring-4 ring-white" />
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">Declínio e Renascimento</h3>
              <p className="text-muted-foreground">
                Com o fim do ciclo da usina, a natureza retomou seu espaço, criando a paisagem única de ruínas abraçadas pela floresta que vemos hoje. 
                A comunidade local manteve viva a memória do lugar.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-secondary ring-4 ring-white" />
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">Hoje</h3>
              <p className="text-muted-foreground">
                O Rio da Casca se reinventa como destino de ecoturismo e preservação, abrigando o Santuário de Elefantes Brasil 
                e recebendo visitantes de todo o mundo.
              </p>
            </div>

          </div>
        </div>
      </Section>
    </Layout>
  );
}
