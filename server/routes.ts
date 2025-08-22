import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all posts with optional category filter
  app.get("/api/posts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const posts = await storage.getPosts(category, limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Get featured posts
  app.get("/api/posts/featured", async (req, res) => {
    try {
      const posts = await storage.getFeaturedPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured posts" });
    }
  });

  // Get single post by ID
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Search posts
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const posts = await storage.searchPosts(query);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to search posts" });
    }
  });

  // Like a post
  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      await storage.likePost(req.params.id);
      const post = await storage.getPost(req.params.id);
      res.json({ likes: post?.likes || 0 });
    } catch (error) {
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // Create a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  // Newsletter subscription (placeholder)
  app.post("/api/subscribe", async (req, res) => {
    try {
      const emailSchema = z.object({
        email: z.string().email("Invalid email address"),
      });

      const { email } = emailSchema.parse(req.body);
      
      // In a real app, you'd save this to a database and send confirmation email
      console.log(`Newsletter subscription: ${email}`);
      
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
