import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSubscriberSchema, 
  insertContactMessageSchema,
  insertBlogPostSchema,
  insertGalleryPhotoSchema 
} from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const data = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.subscribeNewsletter(data);
      res.json({ success: true, subscriber });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      // Handle unique constraint violation
      if (error.code === "23505") {
        return res.status(400).json({ error: "Este email já está cadastrado." });
      }
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ error: "Erro ao processar inscrição." });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.json({ success: true, message });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Erro ao enviar mensagem." });
    }
  });

  // Blog posts - Get all published
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts(true);
      res.json(posts);
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ error: "Erro ao buscar posts." });
    }
  });

  // Blog posts - Get by slug
  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }
      res.json(post);
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ error: "Erro ao buscar post." });
    }
  });

  // Blog posts - Create (admin only - simplified for MVP)
  app.post("/api/blog/posts", async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.json({ success: true, post });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      if (error.code === "23505") {
        return res.status(400).json({ error: "Já existe um post com este slug." });
      }
      console.error("Create blog post error:", error);
      res.status(500).json({ error: "Erro ao criar post." });
    }
  });

  // Gallery - Get approved photos
  app.get("/api/gallery/photos", async (req, res) => {
    try {
      const photos = await storage.getApprovedGalleryPhotos();
      res.json(photos);
    } catch (error) {
      console.error("Get gallery photos error:", error);
      res.status(500).json({ error: "Erro ao buscar fotos." });
    }
  });

  // Gallery - Submit photo
  app.post("/api/gallery/photos", async (req, res) => {
    try {
      const data = insertGalleryPhotoSchema.parse(req.body);
      const photo = await storage.createGalleryPhoto(data);
      res.json({ success: true, photo });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      console.error("Submit gallery photo error:", error);
      res.status(500).json({ error: "Erro ao enviar foto." });
    }
  });

  return httpServer;
}
