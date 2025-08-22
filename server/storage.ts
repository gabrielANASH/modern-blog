import { type User, type InsertUser, type Post, type InsertPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPosts(category?: string, limit?: number): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  getFeaturedPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  likePost(id: string): Promise<void>;
  searchPosts(query: string): Promise<Post[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.seedPosts();
  }

  private seedPosts() {
    const samplePosts: Post[] = [
      {
        id: randomUUID(),
        title: "Finding Peace in Mountain Solitude",
        content: "Discover how a solo journey through the Alps changed my perspective on life, mindfulness, and the power of disconnecting from the digital world. The mountains have always called to me, but this particular journey was different. It wasn't just about the breathtaking views or the physical challenge – it was about finding something I didn't even know I was looking for.",
        excerpt: "Discover how a solo journey through the Alps changed my perspective on life, mindfulness, and the power of disconnecting from the digital world...",
        category: "Travel",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        authorName: "Sarah Johnson",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        authorBio: "Travel Writer",
        readTime: 5,
        likes: 42,
        featured: "true",
        createdAt: new Date("2024-08-20T10:00:00Z"),
      },
      {
        id: randomUUID(),
        title: "Minimalist Design Principles",
        content: "Learn how less can be more in creating beautiful, functional spaces that inspire creativity and promote well-being. Minimalism isn't about having less for the sake of it – it's about making room for what truly matters.",
        excerpt: "Learn how less can be more in creating beautiful, functional spaces...",
        category: "Design",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        authorName: "Alex Chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        authorBio: "Design Director",
        readTime: 3,
        likes: 28,
        featured: "true",
        createdAt: new Date("2024-08-19T14:00:00Z"),
      },
      {
        id: randomUUID(),
        title: "The Future of Remote Work",
        content: "Exploring how technology is reshaping the way we work and collaborate across distances. The pandemic accelerated remote work adoption, but what does the future hold for distributed teams?",
        excerpt: "Exploring how technology is reshaping the way we work and collaborate...",
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        authorName: "Mike Rodriguez",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        authorBio: "Tech Writer",
        readTime: 7,
        likes: 56,
        featured: "true",
        createdAt: new Date("2024-08-18T09:00:00Z"),
      },
      {
        id: randomUUID(),
        title: "Street Art Renaissance",
        content: "How urban artists are transforming city walls into galleries of social commentary and beauty. Street art has evolved from underground rebellion to mainstream recognition.",
        excerpt: "How urban artists are transforming city walls into galleries of social commentary and beauty...",
        category: "Art",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        authorName: "Maya Patel",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        authorBio: "Art Critic",
        readTime: 4,
        likes: 24,
        featured: "false",
        createdAt: new Date("2024-08-17T16:00:00Z"),
      },
      {
        id: randomUUID(),
        title: "Mindful Living in 2024",
        content: "Simple practices to create more presence and intention in your daily routine. In our fast-paced world, mindfulness isn't a luxury – it's a necessity.",
        excerpt: "Simple practices to create more presence and intention in your daily routine...",
        category: "Wellness",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        authorName: "Emma Davis",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        authorBio: "Wellness Coach",
        readTime: 6,
        likes: 73,
        featured: "false",
        createdAt: new Date("2024-08-16T11:00:00Z"),
      },
      {
        id: randomUUID(),
        title: "Seasonal Cooking Guide",
        content: "Make the most of spring produce with these fresh and flavorful recipes. Cooking with the seasons connects us to nature and ensures we're eating at peak freshness.",
        excerpt: "Make the most of spring produce with these fresh and flavorful recipes...",
        category: "Food",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        authorName: "Chef Rodriguez",
        authorAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        authorBio: "Culinary Expert",
        readTime: 8,
        likes: 18,
        featured: "false",
        createdAt: new Date("2024-08-15T13:00:00Z"),
      },
    ];

    samplePosts.forEach(post => {
      this.posts.set(post.id, post);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPosts(category?: string, limit?: number): Promise<Post[]> {
    let posts = Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
    
    if (category && category !== "All") {
      posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getFeaturedPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.featured === "true")
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const post: Post = {
      ...insertPost,
      id,
      likes: 0,
      createdAt: new Date(),
    };
    this.posts.set(id, post);
    return post;
  }

  async likePost(id: string): Promise<void> {
    const post = this.posts.get(id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      this.posts.set(id, post);
    }
  }

  async searchPosts(query: string): Promise<Post[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.posts.values()).filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  }
}

export const storage = new MemStorage();
