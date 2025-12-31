import { db } from "./db";
import { eq, and, desc, ilike, sql } from "drizzle-orm";
import {
  users, type User, type UpsertUser,
  admins, type Admin, type InsertAdmin, type AdminRoleType,
  categories, type Category, type InsertCategory,
  articles, type Article, type InsertArticle,
  siteSettings, type SiteSetting, type InsertSiteSetting
} from "@shared/schema";

export interface IStorage {
  // Users (for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Admins
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByUserId(userId: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  getAllAdmins(): Promise<Admin[]>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  updateAdminRole(id: string, role: AdminRoleType): Promise<Admin | undefined>;
  deactivateAdmin(id: string): Promise<Admin | undefined>;

  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  // Articles
  getAllArticles(status?: "draft" | "published" | "archived"): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(categoryId: string): Promise<Article[]>;
  searchArticles(query: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  incrementViewCount(id: string): Promise<void>;

  // Site Settings
  getSetting(key: string): Promise<string | null>;
  setSetting(key: string, value: string): Promise<void>;
  getAllSettings(): Promise<SiteSetting[]>;

  // Seed data
  seedCategories(): Promise<void>;
  seedArticles(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // ==================== USERS (Replit Auth) ====================
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // ==================== ADMINS ====================
  async getAdmin(id: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin;
  }

  async getAdminByUserId(userId: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins)
      .where(and(eq(admins.userId, userId), eq(admins.isActive, true)));
    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins)
      .where(and(eq(admins.email, email), eq(admins.isActive, true)));
    return admin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    return db.select().from(admins)
      .where(eq(admins.isActive, true))
      .orderBy(desc(admins.createdAt));
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db.insert(admins).values(insertAdmin).returning();
    return admin;
  }

  async updateAdminRole(id: string, role: AdminRoleType): Promise<Admin | undefined> {
    const [admin] = await db.update(admins)
      .set({ role, updatedAt: new Date() })
      .where(eq(admins.id, id))
      .returning();
    return admin;
  }

  async deactivateAdmin(id: string): Promise<Admin | undefined> {
    const [admin] = await db.update(admins)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(admins.id, id))
      .returning();
    return admin;
  }

  // ==================== CATEGORIES ====================
  async getAllCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  async updateCategory(id: string, data: Partial<InsertCategory>): Promise<Category | undefined> {
    const [category] = await db.update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();
    return category;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return true;
  }

  // ==================== ARTICLES ====================
  async getAllArticles(status?: "draft" | "published" | "archived"): Promise<Article[]> {
    if (status) {
      return db.select().from(articles)
        .where(eq(articles.status, status))
        .orderBy(desc(articles.publishedAt));
    }
    return db.select().from(articles).orderBy(desc(articles.publishedAt));
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }

  async getArticlesByCategory(categoryId: string): Promise<Article[]> {
    return db.select().from(articles)
      .where(and(eq(articles.categoryId, categoryId), eq(articles.status, "published")))
      .orderBy(desc(articles.publishedAt));
  }

  async searchArticles(query: string): Promise<Article[]> {
    return db.select().from(articles)
      .where(and(
        eq(articles.status, "published"),
        ilike(articles.title, `%${query}%`)
      ))
      .orderBy(desc(articles.publishedAt));
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }

  async updateArticle(id: string, data: Partial<InsertArticle>): Promise<Article | undefined> {
    const [article] = await db.update(articles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return article;
  }

  async deleteArticle(id: string): Promise<boolean> {
    await db.delete(articles).where(eq(articles.id, id));
    return true;
  }

  async incrementViewCount(id: string): Promise<void> {
    await db.update(articles)
      .set({ viewCount: sql`${articles.viewCount} + 1` })
      .where(eq(articles.id, id));
  }

  // ==================== SITE SETTINGS ====================
  async getSetting(key: string): Promise<string | null> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting?.value || null;
  }

  async setSetting(key: string, value: string): Promise<void> {
    await db.insert(siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, updatedAt: new Date() }
      });
  }

  async getAllSettings(): Promise<SiteSetting[]> {
    return db.select().from(siteSettings);
  }

  // ==================== SEED DATA ====================
  async seedCategories(): Promise<void> {
    const defaultCategories = [
      { name: "Historia da Eletricidade", slug: "historia-eletricidade", description: "Historia da eletricidade no Brasil", color: "#F59E0B" },
      { name: "Personalidades", slug: "personalidades", description: "Figuras historicas importantes", color: "#3B82F6" },
      { name: "Usinas Hidreletricas", slug: "usinas-hidreletricas", description: "Historia das usinas hidreletricas", color: "#10B981" },
      { name: "Historia Regional", slug: "historia-regional", description: "Historia de Mato Grosso e regiao", color: "#8B5CF6" },
      { name: "Natureza", slug: "natureza", description: "Fauna e flora da regiao", color: "#EC4899" }
    ];

    for (const cat of defaultCategories) {
      const existing = await this.getCategoryBySlug(cat.slug);
      if (!existing) {
        await this.createCategory(cat);
      }
    }
  }

  async seedArticles(): Promise<void> {
    const existingArticles = await this.getAllArticles();
    if (existingArticles.length > 0) return;

    const cats = await this.getAllCategories();
    const getCatId = (slug: string) => cats.find(c => c.slug === slug)?.id || null;

    const defaultArticles: InsertArticle[] = [
      {
        title: "Companhia Mineira de Eletricidade",
        slug: "companhia-mineira-de-eletricidade",
        excerpt: "Pequenas usinas hidreletricas: o caso da usina de Marmelos. Um estudo sobre a historia da eletrificacao no Brasil.",
        content: `<h2>Pequenas usinas hidreletricas: o caso da usina de Marmelos</h2>
<p>Almir Pita Freitas Filho Dr. Sc – IE/UFRJ – almir@ie.ufrj.br</p>
<p>Antonio Lopes de Souza PhD – LANTEG/DEE/UFRJ – lopes@dee.ufrj.br</p>
<p>Margareth Guimaraes</p>

<p>A Companhia Mineira de Eletricidade foi fundada em 1888 por Bernardo Mascarenhas, sendo pioneira no setor eletrico brasileiro. A empresa foi responsavel pela construcao da Usina de Marmelos, considerada a primeira usina hidreletrica de grande porte da America Latina.</p>

<h3>O Legado Historico</h3>
<p>A usina de Marmelos representa um marco na historia da energia eletrica no Brasil, demonstrando a visao empreendedora de seus fundadores e a capacidade tecnica da epoca em desenvolver projetos de infraestrutura de grande escala.</p>`,
        categoryId: getCatId("historia-eletricidade"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Primeira usina hidreletrica da America Latina",
        slug: "primeira-usina-hidreletrica-america-latina",
        excerpt: "O Complexo Hidreletrico de Marmelos foi fundado em 1889, em Juiz de Fora, na Zona da Mata mineira.",
        content: `<h2>Usina de Marmelos - O Pioneirismo Brasileiro</h2>
<p>O Complexo Hidreletrico de Marmelos foi fundado em 1889, em Juiz de Fora, na Zona da Mata mineira. Marmelos e considerado o primeiro grande parque gerador de energia do Brasil e da America Latina.</p>

<h3>Contexto Historico</h3>
<p>No final do seculo XIX, o Brasil vivia um momento de transformacao economica e social. A abolicao da escravatura em 1888 e a Proclamacao da Republica em 1889 marcaram uma nova era para o pais.</p>

<h3>A Construcao</h3>
<p>A usina foi construida no Rio Paraibuna, utilizando tecnologia importada da Europa. Os equipamentos foram transportados por navio ate o porto do Rio de Janeiro e depois por ferrovia ate Juiz de Fora.</p>

<h3>Impacto na Regiao</h3>
<p>A eletrificacao de Juiz de Fora transformou a cidade em um polo industrial, atraindo fabricas texteis e outras industrias que se beneficiavam da energia eletrica disponivel.</p>`,
        categoryId: getCatId("usinas-hidreletricas"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Bernardo Mascarenhas",
        slug: "bernardo-mascarenhas",
        excerpt: "Nascido em Curvelo, Minas Gerais, em 30 de maio de 1847, Bernardo Mascarenhas foi um dos maiores empreendedores brasileiros.",
        content: `<h2>Bernardo Mascarenhas - O Visionario da Energia Brasileira</h2>
<p>Nascido em Curvelo, Minas Gerais, em 30 de maio de 1847, e falecido em Juiz de Fora, no mesmo estado, em 09 de outubro de 1899.</p>

<h3>Primeiros Anos</h3>
<p>Aos 16 anos, Bernardo ja demonstrava aptidao para os negocios, trabalhando no comercio local. Sua visao empreendedora o levou a investir em diversos setores da economia.</p>

<h3>O Empreendedor</h3>
<p>Mascarenhas fundou a Companhia Textil Bernardo Mascarenhas e posteriormente a Companhia Mineira de Eletricidade. Sua capacidade de identificar oportunidades e mobilizar recursos foi fundamental para o desenvolvimento industrial de Minas Gerais.</p>

<h3>Legado</h3>
<p>Seu legado perdura ate hoje, sendo considerado um dos pioneiros da industrializacao brasileira. O complexo hidreletrico que fundou continua em operacao, agora como patrimonio historico.</p>`,
        categoryId: getCatId("personalidades"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Delmiro Gouveia",
        slug: "delmiro-gouveia",
        excerpt: "No ano de 1914, em plena caatinga, surge o lugarejo com o nome de Pedra, onde se materializa toda a forca do empreendedorismo.",
        content: `<h2>Delmiro Gouveia - O Empreendedor do Sertao</h2>
<p>No ano de 1914, em plena caatinga, surge o lugarejo com o nome de Pedra, onde se materializa toda a forca do empreendedorismo brasileiro.</p>

<h3>A Historia</h3>
<p>Delmiro Gouveia nasceu em 1863 e se tornou um dos mais importantes industriais do Nordeste brasileiro. Sua historia e marcada por desafios superados com determinacao e visao de futuro.</p>

<h3>A Fabrica da Pedra</h3>
<p>A Fabrica da Pedra, construida por Delmiro Gouveia em Alagoas, utilizava a forca das aguas do Rio Sao Francisco para gerar energia eletrica. Foi um marco da industrializacao nordestina.</p>

<h3>O Legado</h3>
<p>Delmiro Gouveia e lembrado como um homem a frente de seu tempo, que soube aproveitar os recursos naturais de forma sustentavel para desenvolver a regiao onde vivia.</p>`,
        categoryId: getCatId("personalidades"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Historia da Eletricidade no Brasil",
        slug: "historia-eletricidade-brasil",
        excerpt: "O emprego da energia eletrica no pais teve como marcos pioneiros a instalacao da Usina Hidreletrica Ribeirao do Inferno, em 1883.",
        content: `<h2>Historia da Eletricidade no Brasil</h2>
<p>O emprego da energia eletrica no pais teve como marcos pioneiros a instalacao da Usina Hidreletrica Ribeirao do Inferno, em 1883, destinada ao fornecimento de forca motriz a servicos de mineracao em Diamantina, Minas Gerais.</p>

<h3>Os Primordios</h3>
<p>A eletrificacao brasileira comecou de forma timida, com pequenas usinas atendendo demandas locais. O crescimento urbano e industrial do final do seculo XIX impulsionou a expansao do setor.</p>

<h3>Expansao Nacional</h3>
<p>Ao longo do seculo XX, o Brasil desenvolveu um dos maiores sistemas hidreletricos do mundo, aproveitando seu imenso potencial hidrico. Usinas como Itaipu se tornaram referencias mundiais.</p>

<h3>O Futuro</h3>
<p>Hoje, o Brasil busca diversificar sua matriz energetica, investindo em energia solar, eolica e outras fontes renovaveis, mantendo seu compromisso com a sustentabilidade.</p>`,
        categoryId: getCatId("historia-eletricidade"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Conflitos pelo governo de Mato Grosso na Primeira Republica",
        slug: "conflitos-governo-mato-grosso",
        excerpt: "Os conflitos pelo governo de Mato Grosso na Primeira Republica envolveram a violencia armada em varios momentos entre 1892 e 1916.",
        content: `<h2>Conflitos pelo Governo de Mato Grosso</h2>
<p>Os conflitos pelo governo de Mato Grosso na Primeira Republica envolveram a violencia armada em varios momentos entre 1892 e 1916, opondo coroneis situacionistas e oposicionistas.</p>

<h3>Contexto Politico</h3>
<p>A Primeira Republica (1889-1930) foi marcada pelo coronelismo e pelo dominio das oligarquias estaduais. Em Mato Grosso, as disputas pelo poder resultaram em conflitos armados.</p>

<h3>Os Coroneis</h3>
<p>Os coroneis locais mantinham milicias particulares e disputavam o controle do estado. A Forca Publica estadual, a Guarda Nacional, o Exercito e a Marinha foram envolvidos nesses conflitos.</p>

<h3>Consequencias</h3>
<p>Os conflitos deixaram marcas profundas na historia de Mato Grosso, influenciando sua organizacao politica e social nas decadas seguintes.</p>`,
        categoryId: getCatId("historia-regional"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Os nossos Andorinhoes, onde estao?",
        slug: "andorinhoes-onde-estao",
        excerpt: "Os andorinhoes compoem uma familia de aves que se assemelham a andorinhas mas que sao parentes dos beija-flores.",
        content: `<h2>Os Andorinhoes da Regiao</h2>
<p>Os andorinhoes compoem uma familia de aves que se assemelham a andorinhas mas que sao parentes dos beija-flores, compondo a ordem Apodiformes.</p>

<h3>Caracteristicas</h3>
<p>Sao insetivoros extremamente especializados que passam todo o tempo no ar, exceto quando estao nos ninhos. Suas patas sao muito pequenas, adaptadas para se agarrar em superficies verticais.</p>

<h3>Habitat</h3>
<p>Na regiao de Rio da Casca, os andorinhoes podem ser vistos em grandes bandos, especialmente ao entardecer, quando retornam para seus abrigos coletivos.</p>

<h3>Conservacao</h3>
<p>A preservacao desses animais depende da manutencao de seus habitats naturais, incluindo as formacoes rochosas e edificacoes antigas onde constroem seus ninhos.</p>`,
        categoryId: getCatId("natureza"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      },
      {
        title: "Langsdorff chega a Cuiaba",
        slug: "langsdorff-chega-cuiaba",
        excerpt: "Aporta, finalmente na capital da provincia em 30 de janeiro de 1827, a expedicao cientifica, chefiada pelo barao Jorge Henrique de Langsdorff.",
        content: `<h2>Expedicao Langsdorff chega a Cuiaba</h2>
<p>Aporta, finalmente na capital da provincia em 30 de janeiro de 1827, a expedicao cientifica, chefiada pelo barao Jorge Henrique de Langsdorff, consul da Russia no Brasil.</p>

<h3>A Expedicao</h3>
<p>A Expedicao Langsdorff foi uma das mais importantes expedicoes cientificas realizadas no Brasil no seculo XIX. Partindo do Rio de Janeiro, a expedicao percorreu milhares de quilometros pelo interior do pais.</p>

<h3>Descobertas Cientificas</h3>
<p>A equipe de cientistas e artistas que acompanhava Langsdorff documentou fauna, flora, povos indigenas e aspectos geograficos ainda desconhecidos pela ciencia europeia.</p>

<h3>Legado</h3>
<p>Os desenhos, mapas e colecoes reunidos pela expedicao encontram-se hoje em museus russos e brasileiros, constituindo um acervo inestimavel para a historia natural do Brasil.</p>`,
        categoryId: getCatId("historia-regional"),
        authorName: "Rio da Casca",
        status: "published",
        featuredImage: null
      }
    ];

    for (const article of defaultArticles) {
      await this.createArticle(article);
    }
  }
}

export const storage = new DatabaseStorage();
