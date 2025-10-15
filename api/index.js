// server/index.ts
import express2 from "express";
import path5 from "path";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  tags: text("tags").notNull(),
  // JSON string of array
  image: text("image"),
  // path to image
  date: text("date").notNull()
  // ISO string
});
var insertBlogSchema = createInsertSchema(blogs).pick({
  title: true,
  content: true,
  tags: true,
  image: true,
  date: true
});

// server/storage.ts
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
var JsonStorage = class {
  users;
  blogs;
  usersFilePath;
  blogsFilePath;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.blogs = /* @__PURE__ */ new Map();
    this.usersFilePath = path.join(process.cwd(), "users.json");
    this.blogsFilePath = path.join(process.cwd(), "blogs.json");
    this.loadUsersFromFile();
    this.loadBlogsFromFile();
  }
  loadUsersFromFile() {
    try {
      if (fs.existsSync(this.usersFilePath)) {
        const data = fs.readFileSync(this.usersFilePath, "utf-8");
        const usersArray = JSON.parse(data);
        this.users = new Map(usersArray.map((user) => [user.id, user]));
      }
    } catch (error) {
      this.users = /* @__PURE__ */ new Map();
    }
  }
  saveUsersToFile() {
    const usersArray = Array.from(this.users.values());
    fs.writeFileSync(this.usersFilePath, JSON.stringify(usersArray, null, 2));
  }
  loadBlogsFromFile() {
    try {
      if (fs.existsSync(this.blogsFilePath)) {
        const data = fs.readFileSync(this.blogsFilePath, "utf-8");
        const blogsArray = JSON.parse(data);
        this.blogs = new Map(blogsArray.map((blog) => [blog.id, blog]));
      }
    } catch (error) {
      this.blogs = /* @__PURE__ */ new Map();
    }
  }
  saveBlogsToFile() {
    const blogsArray = Array.from(this.blogs.values());
    fs.writeFileSync(this.blogsFilePath, JSON.stringify(blogsArray, null, 2));
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    this.saveUsersToFile();
    return user;
  }
  async getBlogs() {
    return Array.from(this.blogs.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  async getBlog(id) {
    return this.blogs.get(id);
  }
  async createBlog(insertBlog) {
    const id = randomUUID();
    const blog = { ...insertBlog, id, image: insertBlog.image || null };
    this.blogs.set(id, blog);
    this.saveBlogsToFile();
    return blog;
  }
  async deleteBlog(id) {
    const deleted = this.blogs.delete(id);
    if (deleted) {
      this.saveBlogsToFile();
    }
    return deleted;
  }
};
var DbStorage = class {
  db;
  constructor() {
    const sql2 = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql2, { schema: { users, blogs } });
  }
  async getUser(id) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  async createUser(insertUser) {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  async getBlogs() {
    const result = await this.db.select().from(blogs).orderBy(blogs.date);
    return result.reverse();
  }
  async getBlog(id) {
    const result = await this.db.select().from(blogs).where(eq(blogs.id, id));
    return result[0];
  }
  async createBlog(insertBlog) {
    const result = await this.db.insert(blogs).values(insertBlog).returning();
    return result[0];
  }
  async deleteBlog(id) {
    const result = await this.db.delete(blogs).where(eq(blogs.id, id));
    return result.rowCount > 0;
  }
};
var storage = process.env.DATABASE_URL ? new DbStorage() : new JsonStorage();

// server/routes.ts
import multer from "multer";
import path2 from "path";
import fs2 from "fs";
import nodemailer from "nodemailer";
var upload = multer({
  dest: path2.join(process.cwd(), "attached_assets", "uploaded_images"),
  limits: { fileSize: 10 * 1024 * 1024 },
  // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});
async function registerRoutes(app2) {
  app2.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to create user" });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
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
  app2.get("/api/users/username/:username", async (req, res) => {
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
  app2.get("/api/blogs", async (req, res) => {
    try {
      const blogs2 = await storage.getBlogs();
      res.json(blogs2);
    } catch (error) {
      res.status(400).json({ error: "Failed to get blogs" });
    }
  });
  app2.get("/api/blogs/:id", async (req, res) => {
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
  app2.post("/api/blogs", async (req, res) => {
    try {
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
  app2.delete("/api/blogs/:id", async (req, res) => {
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
  app2.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const relativePath = path2.relative(process.cwd(), req.file.path).replace(/\\/g, "/");
    res.json({ url: "/" + relativePath });
  });
  app2.get("/api/gallery", (req, res) => {
    const uploadDir = path2.join(process.cwd(), "attached_assets", "uploaded_images");
    try {
      const files = fs2.readdirSync(uploadDir);
      const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file)).map((file) => ({
        url: `/attached_assets/uploaded_images/${file}`,
        title: file.replace(/\.[^/.]+$/, "").replace(/_/g, " ")
      }));
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to load gallery" });
    }
  });
  app2.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "your-email@gmail.com",
          pass: process.env.EMAIL_PASS || "your-app-password"
        }
      });
      const mailOptions = {
        from: email,
        to: "akankshachoubey2003@gmail.com",
        subject: `New message from ${name}`,
        text: `Name: ${name}
Email: ${email}

Message:
${message}`
      };
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs3 from "fs";
import path4 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path3.resolve(import.meta.dirname, "client", "src"),
      "@shared": path3.resolve(import.meta.dirname, "shared"),
      "@assets": path3.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path3.resolve(import.meta.dirname, "client"),
  build: {
    outDir: "../dist/public",
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path4.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path4.resolve(import.meta.dirname, "..", "dist", "public");
  if (!fs3.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path4.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static(path5.join(process.cwd(), "attached_assets")));
app.use((req, res, next) => {
  const start = Date.now();
  const path6 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path6.startsWith("/api")) {
      let logLine = `${req.method} ${path6} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "127.0.0.1"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
