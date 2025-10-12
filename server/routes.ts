import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

import type { Request, Response, NextFunction } from "express";

// Configure multer for file uploads
const upload = multer({
  dest: path.join(process.cwd(), "attached_assets", "uploaded_images"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/users/username/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to get user" });
    }
  });

  // Blog routes
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(400).json({ error: "Failed to get blogs" });
    }
  });

  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to get blog" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      // Parse tags if sent as JSON string
      if (req.body.tags && typeof req.body.tags === "string") {
        try {
          req.body.tags = JSON.parse(req.body.tags);
        } catch {
          req.body.tags = [req.body.tags];
        }
      }
      const blog = await storage.createBlog(req.body);
      res.json(blog);
    } catch (error) {
      res.status(400).json({ error: "Failed to create blog" });
    }
  });

  app.delete("/api/blogs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlog(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to delete blog" });
    }
  });

  // Image upload route
  app.post("/api/upload", upload.single("image"), (req: Request & { file?: any }, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return the relative path to the uploaded image
    const relativePath = path.relative(process.cwd(), req.file.path).replace(/\\/g, "/");
    res.json({ url: "/" + relativePath });
  });

  // Gallery images route
  app.get("/api/gallery", (req: Request, res: Response) => {
    const uploadDir = path.join(process.cwd(), "attached_assets", "uploaded_images");
    try {
      const files = fs.readdirSync(uploadDir);
      const images = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(file => ({
          url: `/attached_assets/uploaded_images/${file}`,
          title: file.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        }));
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to load gallery" });
    }
  });

  // Email sending route
  app.post("/api/send-email", async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "your-email@gmail.com",
          pass: process.env.EMAIL_PASS || "your-app-password",
        },
      });

      const mailOptions = {
        from: email,
        to: "akankshachoubey2003@gmail.com",
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
