import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import trailImg from "@assets/generated_images/hiking_trail_in_rio_da_casca.png";

export function Blog() {
  return (
    <Layout>
      <Hero 
        image={trailImg}
        title="Notícias & Blog"
        subtitle="Fique por dentro das novidades, eventos e histórias da comunidade."
        size="default"
      />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
                <img src={trailImg} className="w-full h-full object-cover" alt="Blog post" />
              </div>
              <CardHeader>
                <div className="text-xs font-ui text-primary font-bold uppercase mb-2">Eventos</div>
                <CardTitle className="font-serif text-xl">Festival de Inverno no Casca</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Venha participar de um fim de semana com música local, gastronomia típica e muita cultura...
                </p>
                <Button variant="link" className="p-0 text-primary">Ler mais</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
