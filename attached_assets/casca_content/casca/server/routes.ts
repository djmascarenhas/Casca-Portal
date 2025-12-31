import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import rateLimit from "express-rate-limit";
import { insertArticleSchema, insertCategorySchema, adminRoleHierarchy } from "@shared/schema";

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "Muitas requisicoes. Tente novamente em alguns minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { error: "Limite de API atingido. Tente novamente em alguns minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  
  app.use("/api", generalLimiter);
  
  // Seed data on startup
  await storage.seedCategories();
  await storage.seedArticles();

  // ==================== AUTH API ====================
  app.get("/api/auth/user", apiLimiter, isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Erro ao buscar usuario" });
    }
  });

  // ==================== PUBLIC ARTICLES API ====================
  app.get("/api/articles", apiLimiter, async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let articles;
      if (search && typeof search === "string") {
        articles = await storage.searchArticles(search);
      } else if (category && typeof category === "string") {
        const cat = await storage.getCategoryBySlug(category);
        if (cat) {
          articles = await storage.getArticlesByCategory(cat.id);
        } else {
          articles = await storage.getAllArticles("published");
        }
      } else {
        articles = await storage.getAllArticles("published");
      }
      
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Erro ao buscar artigos" });
    }
  });

  app.get("/api/articles/:slug", apiLimiter, async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ error: "Artigo nao encontrado" });
      }
      
      // Increment view count
      await storage.incrementViewCount(article.id);
      
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ error: "Erro ao buscar artigo" });
    }
  });

  // ==================== PUBLIC CATEGORIES API ====================
  app.get("/api/categories", apiLimiter, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  });

  // ==================== ADMIN AUTH HELPERS ====================
  const ensureAdmin = async (req: any, res: any, next: any) => {
    try {
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ error: "Nao autenticado" });
      }
      const user = await storage.getUser(userId);
      if (!user?.email) {
        return res.status(401).json({ error: "Usuario nao encontrado" });
      }
      const admin = await storage.getAdminByEmail(user.email);
      if (!admin) {
        return res.status(403).json({ error: "Acesso restrito a administradores" });
      }
      req.admin = admin;
      next();
    } catch (error) {
      console.error("Error in ensureAdmin:", error);
      res.status(500).json({ error: "Erro de autorizacao" });
    }
  };

  const requireRole = (minRole: keyof typeof adminRoleHierarchy) => {
    return (req: any, res: any, next: any) => {
      const admin = req.admin;
      if (!admin) {
        return res.status(403).json({ error: "Admin nao encontrado" });
      }
      const adminLevel = adminRoleHierarchy[admin.role as keyof typeof adminRoleHierarchy] || 0;
      const requiredLevel = adminRoleHierarchy[minRole];
      if (adminLevel < requiredLevel) {
        return res.status(403).json({ error: "Nivel de acesso insuficiente" });
      }
      next();
    };
  };

  // ==================== ADMIN ARTICLES API ====================
  app.get("/api/admin/articles", isAuthenticated, ensureAdmin, async (req: any, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching admin articles:", error);
      res.status(500).json({ error: "Erro ao buscar artigos" });
    }
  });

  app.post("/api/admin/articles", isAuthenticated, ensureAdmin, requireRole("editor"), async (req: any, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error: any) {
      console.error("Error creating article:", error);
      res.status(400).json({ error: error.message || "Erro ao criar artigo" });
    }
  });

  app.put("/api/admin/articles/:id", isAuthenticated, ensureAdmin, requireRole("editor"), async (req: any, res) => {
    try {
      const { id } = req.params;
      const article = await storage.updateArticle(id, req.body);
      if (!article) {
        return res.status(404).json({ error: "Artigo nao encontrado" });
      }
      res.json(article);
    } catch (error: any) {
      console.error("Error updating article:", error);
      res.status(400).json({ error: error.message || "Erro ao atualizar artigo" });
    }
  });

  app.delete("/api/admin/articles/:id", isAuthenticated, ensureAdmin, requireRole("editor"), async (req: any, res) => {
    try {
      const { id } = req.params;
      await storage.deleteArticle(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ error: "Erro ao excluir artigo" });
    }
  });

  // ==================== ADMIN CATEGORIES API ====================
  app.post("/api/admin/categories", isAuthenticated, ensureAdmin, requireRole("editor"), async (req: any, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: error.message || "Erro ao criar categoria" });
    }
  });

  app.put("/api/admin/categories/:id", isAuthenticated, ensureAdmin, requireRole("editor"), async (req: any, res) => {
    try {
      const { id } = req.params;
      const category = await storage.updateCategory(id, req.body);
      if (!category) {
        return res.status(404).json({ error: "Categoria nao encontrada" });
      }
      res.json(category);
    } catch (error: any) {
      console.error("Error updating category:", error);
      res.status(400).json({ error: error.message || "Erro ao atualizar categoria" });
    }
  });

  app.delete("/api/admin/categories/:id", isAuthenticated, ensureAdmin, requireRole("editor"), async (req: any, res) => {
    try {
      const { id } = req.params;
      await storage.deleteCategory(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Erro ao excluir categoria" });
    }
  });

  // ==================== ADMIN MANAGEMENT ====================
  app.get("/api/admin/admins", isAuthenticated, ensureAdmin, requireRole("administrador_total"), async (req: any, res) => {
    try {
      const admins = await storage.getAllAdmins();
      res.json(admins);
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ error: "Erro ao buscar administradores" });
    }
  });

  app.get("/api/admin/check", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user?.email) {
        return res.json({ isAdmin: false });
      }
      const admin = await storage.getAdminByEmail(user.email);
      res.json({ isAdmin: !!admin, admin: admin || null });
    } catch (error) {
      console.error("Error checking admin status:", error);
      res.status(500).json({ error: "Erro ao verificar status de admin" });
    }
  });

  return httpServer;
}
