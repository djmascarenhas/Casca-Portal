import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { 
  newsletterSubscribers, 
  contactMessages, 
  blogPosts, 
  galleryPhotos,
  type InsertNewsletterSubscriber,
  type NewsletterSubscriber,
  type InsertContactMessage,
  type ContactMessage,
  type InsertBlogPost,
  type BlogPost,
  type InsertGalleryPhoto,
  type GalleryPhoto
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export interface IStorage {
  // Newsletter
  subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Blog Posts
  getAllBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Gallery Photos
  getApprovedGalleryPhotos(): Promise<GalleryPhoto[]>;
  getAllGalleryPhotos(): Promise<GalleryPhoto[]>;
  createGalleryPhoto(photo: InsertGalleryPhoto): Promise<GalleryPhoto>;
  approveGalleryPhoto(id: number): Promise<GalleryPhoto | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Newsletter
  async subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [result] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return result;
  }

  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }

  // Blog Posts
  async getAllBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    if (publishedOnly) {
      return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt));
    }
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [result] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [result] = await db.insert(blogPosts).values(post).returning();
    return result;
  }

  // Gallery Photos
  async getApprovedGalleryPhotos(): Promise<GalleryPhoto[]> {
    return await db.select().from(galleryPhotos).where(eq(galleryPhotos.approved, true)).orderBy(desc(galleryPhotos.createdAt));
  }

  async getAllGalleryPhotos(): Promise<GalleryPhoto[]> {
    return await db.select().from(galleryPhotos).orderBy(desc(galleryPhotos.createdAt));
  }

  async createGalleryPhoto(photo: InsertGalleryPhoto): Promise<GalleryPhoto> {
    const [result] = await db.insert(galleryPhotos).values(photo).returning();
    return result;
  }

  async approveGalleryPhoto(id: number): Promise<GalleryPhoto | undefined> {
    const [result] = await db.update(galleryPhotos).set({ approved: true }).where(eq(galleryPhotos.id, id)).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
