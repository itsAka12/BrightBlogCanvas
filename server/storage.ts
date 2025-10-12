import { type User, type InsertUser, type Blog, type InsertBlog } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getBlogs(): Promise<Blog[]>;
  getBlog(id: string): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  deleteBlog(id: string): Promise<boolean>;
}

export class JsonStorage implements IStorage {
  private users: Map<string, User>;
  private blogs: Map<string, Blog>;
  private usersFilePath: string;
  private blogsFilePath: string;

  constructor() {
    this.users = new Map();
    this.blogs = new Map();
    this.usersFilePath = path.join(process.cwd(), "users.json");
    this.blogsFilePath = path.join(process.cwd(), "blogs.json");
    this.loadUsersFromFile();
    this.loadBlogsFromFile();
  }

  private loadUsersFromFile() {
    try {
      if (fs.existsSync(this.usersFilePath)) {
        const data = fs.readFileSync(this.usersFilePath, "utf-8");
        const usersArray: User[] = JSON.parse(data);
        this.users = new Map(usersArray.map(user => [user.id, user]));
      }
    } catch (error) {
      // File doesn't exist or invalid, start with empty
      this.users = new Map();
    }
  }

  private saveUsersToFile() {
    const usersArray = Array.from(this.users.values());
    fs.writeFileSync(this.usersFilePath, JSON.stringify(usersArray, null, 2));
  }

  private loadBlogsFromFile() {
    try {
      if (fs.existsSync(this.blogsFilePath)) {
        const data = fs.readFileSync(this.blogsFilePath, "utf-8");
        const blogsArray: Blog[] = JSON.parse(data);
        this.blogs = new Map(blogsArray.map(blog => [blog.id, blog]));
      }
    } catch (error) {
      // File doesn't exist or invalid, start with empty
      this.blogs = new Map();
    }
  }

  private saveBlogsToFile() {
    const blogsArray = Array.from(this.blogs.values());
    fs.writeFileSync(this.blogsFilePath, JSON.stringify(blogsArray, null, 2));
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
    this.saveUsersToFile();
    return user;
  }

  async getBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getBlog(id: string): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = randomUUID();
    const blog: Blog = { ...insertBlog, id, image: insertBlog.image || null };
    this.blogs.set(id, blog);
    this.saveBlogsToFile();
    return blog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    const deleted = this.blogs.delete(id);
    if (deleted) {
      this.saveBlogsToFile();
    }
    return deleted;
  }
}

export const storage = new JsonStorage();
