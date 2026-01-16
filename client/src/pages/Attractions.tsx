import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { AttractionCard } from "@/components/AttractionCard";
import waterfallImg from "@assets/generated_images/waterfall_at_usina_da_casca.png";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";
import chaleImg from "@assets/generated_images/historic_chalé_dos_governadores.png";

export function Attractions() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Layout>
      <Hero 
        image={waterfallImg}
        title="Atrativos"
        subtitle="Descubra as maravilhas naturais e históricas da Comunidade Rio da Casca"
        size="default"
      />
      
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="attractions-grid">
          
          <AttractionCard 
            image={waterfallImg}
            title="Cachoeira da Pedra Furada"
            description="Considerada uma das 5 cachoeiras mais bonitas da Chapada dos Guimarães. Localizada a 47km do centro, possui trilha autoguiada, entrada gratuita, é pet friendly e conta com bar e lanchonete."
            link="#pedra-furada"
            badges={["Natureza", "Banho", "Pet Friendly"]}
            onNavigate={() => scrollToSection('pedra-furada')}
          />
          
          <AttractionCard 
            image={chaleImg}
            title="Chalé dos Governadores"
            description="Patrimônio histórico da região, o imponente Chalé dos Governadores é um testemunho da época áurea da exploração local. Arquitetura preservada cercada pela mata atlântica."
            link="#chale"
            badges={["Patrimônio", "História"]}
            onNavigate={() => scrollToSection('chale')}
          />

          <AttractionCard 
            image={waterfallImg}
            title="Usina Casca 1"
            description="A primeira usina hidrelétrica da região, construída às margens do Rio da Casca. Suas ruínas contam a história do desenvolvimento energético do Mato Grosso."
            link="#usina1"
            badges={["História", "Patrimônio Industrial"]}
            onNavigate={() => scrollToSection('usina1')}
          />

          <AttractionCard 
            image={trailImg}
            title="Vila da Usina Casca 2"
            description="Antiga vila operária que abrigava os trabalhadores da segunda usina. Um passeio pelo tempo que revela o modo de vida das famílias que construíram a história da comunidade."
            link="#vila-usina2"
            badges={["História", "Cultura"]}
            onNavigate={() => scrollToSection('vila-usina2')}
          />

          <AttractionCard 
            image={waterfallImg}
            title="Casca 3"
            description="A terceira instalação do complexo hidrelétrico do Rio da Casca. Local de grande importância histórica que complementa o roteiro pelas antigas usinas da região."
            link="#casca3"
            badges={["História", "Patrimônio Industrial"]}
            onNavigate={() => scrollToSection('casca3')}
          />

          <AttractionCard 
            image={trailImg}
            title="Poço do Pacu"
            description="Piscina natural formada pelo Rio da Casca, ideal para banho em águas cristalinas. Um refúgio tranquilo cercado pela vegetação nativa, perfeito para relaxar."
            link="#poco-pacu"
            badges={["Natureza", "Banho", "Águas"]}
            onNavigate={() => scrollToSection('poco-pacu')}
          />

        </div>
      </Section>

      <Section className="bg-muted/30" id="pedra-furada">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6" data-testid="title-pedra-furada">Cachoeira da Pedra Furada</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={waterfallImg} 
                alt="Cachoeira da Pedra Furada" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-ui font-bold text-lg text-secondary mb-2">Localização</h3>
                <p className="text-muted-foreground">
                  Comunidade Rio da Casca, a 47km do centro de Chapada dos Guimarães.
                  Acesso pela MT-251 → MT-404 (14km de estrada de terra em boa condição).
                </p>
              </div>
              <div>
                <h3 className="font-ui font-bold text-lg text-secondary mb-2">Coordenadas GPS</h3>
                <p className="text-muted-foreground font-mono">-15.360021, -55.432272</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Trilha de Acesso</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Trilha autoguiada (não exige guia)</li>
                <li>• Trilha curta e íngreme</li>
                <li>• Caminhada a pé após estacionar</li>
                <li>• Som da cachoeira durante o percurso</li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Infraestrutura</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Entrada gratuita</li>
                <li>• Pet friendly</li>
                <li>• Bar e lanchonete no local</li>
                <li>• Opção de almoço (com reserva)</li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">O Que Levar</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Protetor solar e repelente</li>
                <li>• Chapéu ou boné</li>
                <li>• Sapato para trekking</li>
                <li>• Roupa de banho</li>
              </ul>
            </div>
          </div>

          <div className="bg-secondary/10 p-6 rounded-lg">
            <h3 className="font-ui font-bold text-lg text-primary mb-3">Melhor Época para Visitar</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-bold text-secondary">Abril a Junho:</span> Céu azul, baixo índice de chuvas - melhor período segundo guias locais.
              </div>
              <div>
                <span className="font-bold text-secondary">Julho a Outubro:</span> Seca e temperaturas elevadas, mas gratificante para banho nas cachoeiras.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="chale">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6" data-testid="title-chale">Chalé dos Governadores</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={chaleImg} 
                alt="Chalé dos Governadores" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                O Chalé dos Governadores é um marco histórico da Comunidade Rio da Casca. Construído no início do século XX, 
                serviu como residência de veraneio para autoridades governamentais da época, atraídas pelo clima ameno 
                e pela beleza natural da região.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A arquitetura preservada do chalé reflete o estilo colonial brasileiro, com detalhes em madeira 
                e amplas varandas que proporcionam vistas panorâmicas da mata atlântica de interior.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Importância Histórica</h3>
              <p className="text-muted-foreground text-sm">
                O chalé representa um período importante da história regional, quando a elite política 
                buscava refúgio nas áreas mais elevadas do estado durante os meses mais quentes.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Visitação</h3>
              <p className="text-muted-foreground text-sm">
                Atualmente é possível contemplar a arquitetura externa do chalé e conhecer sua história 
                através de guias locais. A visitação interna pode estar sujeita a agendamento.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30" id="usina1">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6" data-testid="title-usina1">Usina Casca 1</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={waterfallImg} 
                alt="Usina Casca 1" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                A Usina Casca 1 foi a primeira usina hidrelétrica construída às margens do Rio da Casca, 
                representando um marco no desenvolvimento energético da região. Suas estruturas preservadas 
                contam a história pioneira da eletrificação no interior do Mato Grosso.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O complexo original incluía a casa de máquinas, o canal de adução e a barragem, 
                elementos que ainda podem ser observados em meio à vegetação que gradualmente 
                foi recuperando o espaço.
              </p>
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="font-ui font-bold text-lg text-primary mb-3">Patrimônio Industrial</h3>
            <p className="text-muted-foreground text-sm">
              As ruínas da Usina Casca 1 são consideradas patrimônio industrial regional. A visitação 
              permite conhecer a tecnologia empregada na época e compreender a importância da força 
              hidráulica para o desenvolvimento local. Recomenda-se a companhia de um guia local 
              para melhor compreensão histórica do local.
            </p>
          </div>
        </div>
      </Section>

      <Section id="vila-usina2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6" data-testid="title-vila-usina2">Vila da Usina Casca 2</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={trailImg} 
                alt="Vila da Usina Casca 2" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                A Vila da Usina Casca 2 foi construída para abrigar os trabalhadores e suas famílias 
                que operavam a segunda usina hidrelétrica do complexo. O conjunto de casas e 
                edificações auxiliares formava uma comunidade autossuficiente em meio à natureza.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Caminhar pela antiga vila é fazer uma viagem no tempo, descobrindo como era a vida 
                cotidiana dos pioneiros que ajudaram a construir a história energética da região.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Vida Comunitária</h3>
              <p className="text-muted-foreground text-sm">
                A vila contava com escola, armazém e áreas de convivência, formando um núcleo 
                social que permaneceu ativo durante décadas de operação da usina.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Memória Preservada</h3>
              <p className="text-muted-foreground text-sm">
                Moradores antigos da região ainda guardam memórias e fotografias da época áurea da vila, 
                contribuindo para manter viva a história do local.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30" id="casca3">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6" data-testid="title-casca3">Casca 3</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={waterfallImg} 
                alt="Casca 3" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Casca 3 representa a terceira fase de expansão do complexo hidrelétrico do Rio da Casca. 
                Esta instalação foi planejada para aumentar a capacidade de geração de energia 
                e atender à crescente demanda da região.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O local integra o roteiro histórico das antigas usinas, oferecendo aos visitantes 
                uma visão completa da evolução do aproveitamento energético do rio ao longo das décadas.
              </p>
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="font-ui font-bold text-lg text-primary mb-3">Roteiro das Usinas</h3>
            <p className="text-muted-foreground text-sm">
              A visita a Casca 3 pode ser combinada com as outras instalações do complexo 
              (Usina Casca 1 e Vila da Usina Casca 2) para uma experiência histórica completa. 
              Recomenda-se reservar meio período para conhecer todo o roteiro das usinas.
            </p>
          </div>
        </div>
      </Section>

      <Section id="poco-pacu">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6" data-testid="title-poco-pacu">Poço do Pacu</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={trailImg} 
                alt="Poço do Pacu" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                O Poço do Pacu é uma piscina natural formada pelo Rio da Casca, conhecida por suas 
                águas cristalinas e ambiente tranquilo. O nome faz referência aos pacus, peixes 
                típicos da região que podem ser avistados nas águas transparentes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                É o local perfeito para quem busca relaxamento em contato com a natureza, 
                com sombra natural proporcionada pela vegetação das margens.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Banho Natural</h3>
              <p className="text-muted-foreground text-sm">
                Águas cristalinas e temperatura agradável, ideal para banho em qualquer época do ano.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Fauna Local</h3>
              <p className="text-muted-foreground text-sm">
                Observe os pacus e outras espécies de peixes nativos em seu habitat natural.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-ui font-bold text-lg text-primary mb-3">Dicas</h3>
              <p className="text-muted-foreground text-sm">
                Leve lanche e água. Não há infraestrutura no local, preserve a natureza.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
