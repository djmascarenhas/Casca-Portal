import { storage } from "./storage";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed blog posts
  const blogPosts = [
    {
      title: "Festival de Inverno no Rio da Casca 2025",
      slug: "festival-inverno-2025",
      excerpt: "Venha participar de um fim de semana com música local, gastronomia típica e muita cultura na nossa tradicional festa de inverno.",
      content: `O Festival de Inverno do Rio da Casca é um dos eventos mais esperados do ano! Durante três dias, a comunidade se reúne para celebrar nossas tradições com apresentações musicais, oficinas de artesanato, pratos típicos da região e muito mais.

Este ano teremos apresentações especiais de grupos folclóricos, feira de produtos locais e uma programação infantil completa. Não perca!

Data: 15 a 17 de julho
Local: Centro Comunitário do Rio da Casca
Entrada gratuita`,
      category: "Eventos",
      imageUrl: "/attached_assets/generated_images/hiking_trail_in_rio_da_casca.png",
      published: true,
      publishedAt: new Date("2025-06-01"),
    },
    {
      title: "Novos Moradores no Santuário de Elefantes",
      slug: "novos-elefantes-santuario",
      excerpt: "O Santuário de Elefantes Brasil recebeu duas novas moradoras vindas de circos desativados. Conheça Maia e Guida.",
      content: `É com grande alegria que anunciamos a chegada de Maia e Guida ao Santuário de Elefantes Brasil! 

Ambas as elefantas foram resgatadas de circos onde passaram décadas em condições inadequadas. Agora, elas terão a oportunidade de viver em amplos espaços naturais, com cuidados veterinários especializados e a liberdade que merecem.

A adaptação está sendo acompanhada de perto por nossa equipe, e as duas já demonstram sinais de bem-estar, explorando o terreno e interagindo com as outras moradoras do santuário.

Visitação: Mediante agendamento e com restrições para garantir o bem-estar dos animais.`,
      category: "Preservação",
      imageUrl: "/attached_assets/generated_images/elephant_in_nature_sanctuary.png",
      published: true,
      publishedAt: new Date("2025-05-15"),
    },
    {
      title: "Projeto de Restauração do Chalé dos Governadores",
      slug: "restauracao-chale-governadores",
      excerpt: "Iniciamos o projeto de restauração e preservação do histórico Chalé dos Governadores, patrimônio cultural de Mato Grosso.",
      content: `O Chalé dos Governadores, construído no século XIX, é um dos mais importantes marcos históricos da região. Para preservar essa memória para as gerações futuras, iniciamos um projeto abrangente de restauração.

O trabalho inclui:
- Estabilização estrutural das paredes de pedra
- Restauro de elementos arquitetônicos originais  
- Documentação histórica completa
- Criação de um centro de interpretação histórica

O projeto é realizado em parceria com o IPHAN e conta com o apoio de historiadores e arquitetos especializados em patrimônio histórico.

Acompanhe o progresso pelos nossos canais!`,
      category: "Patrimônio",
      imageUrl: "/attached_assets/generated_images/historic_chalé_dos_governadores.png",
      published: true,
      publishedAt: new Date("2025-04-20"),
    },
  ];

  for (const post of blogPosts) {
    try {
      await storage.createBlogPost(post);
      console.log(`✅ Created blog post: ${post.title}`);
    } catch (error: any) {
      if (error.code === "23505") {
        console.log(`⏭️  Post already exists: ${post.title}`);
      } else {
        console.error(`❌ Error creating post ${post.title}:`, error);
      }
    }
  }

  console.log("✨ Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
