import { Link } from "wouter";
import { ArrowLeft, MapPin, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/Layout";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Sobre o Rio da Casca
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Preservando e compartilhando a historia e cultura da regiao
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <h2>Nossa Missao</h2>
            <p>
              O portal Rio da Casca tem como missao preservar, documentar e compartilhar a rica historia 
              e cultura da regiao de Rio da Casca e do estado de Mato Grosso. Nosso objetivo e manter 
              viva a memoria de personalidades, eventos e acontecimentos que moldaram nossa identidade regional.
            </p>

            <h2>O que Voce Encontra Aqui</h2>
            <p>
              Nosso acervo digital inclui artigos sobre diversos temas relacionados a historia regional:
            </p>
            <ul>
              <li>Historia da eletricidade no Brasil e as primeiras usinas hidreletricas</li>
              <li>Personalidades historicas como Bernardo Mascarenhas e Delmiro Gouveia</li>
              <li>Historia politica e social de Mato Grosso</li>
              <li>Fauna e flora da regiao</li>
              <li>Expedicoes cientificas historicas</li>
            </ul>

            <h2>Contribua</h2>
            <p>
              Se voce possui documentos, fotos ou informacoes historicas sobre a regiao, 
              entre em contato conosco. Sua contribuicao e fundamental para enriquecer 
              nosso acervo e preservar a memoria coletiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-visible">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <h3 className="font-semibold mb-1">Localizacao</h3>
                <p className="text-sm text-muted-foreground">Mato Grosso, Brasil</p>
              </CardContent>
            </Card>
            <Card className="overflow-visible">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <h3 className="font-semibold mb-1">Desde</h3>
                <p className="text-sm text-muted-foreground">Preservando a historia</p>
              </CardContent>
            </Card>
            <Card className="overflow-visible">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <h3 className="font-semibold mb-1">Acervo</h3>
                <p className="text-sm text-muted-foreground">Artigos e documentos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
