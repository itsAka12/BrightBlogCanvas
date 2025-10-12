import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import BlogCard from "@/components/BlogCard";
import ContactForm from "@/components/ContactForm";
import StreakTracker from "@/components/StreakTracker";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  interface BlogPost {
    id: string;
    title: string;
    content: string;
    tags: string[];
    image?: string | null;
    date: string;
  }

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch(() => setBlogPosts([]));
  }, []);

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(post.tags) ? post.tags : []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlogPosts((prev) => prev.filter((post) => post.id !== id));
    } else {
      alert("Failed to delete blog");
    }
  };

  const handleOpenBlog = (id: string) => {
    setLocation(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <Bio />

      <section className="py-16 px-4 bg-card/30">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="font-display text-3xl font-bold">Recent Blog Posts</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                tags={post.tags}
                image={post.image ?? undefined}
                date={post.date}
                onDelete={handleDelete}
                onClick={() => handleOpenBlog(post.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">My Progress</h2>
          <div className="max-w-md mx-auto">
            <StreakTracker />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Contact Me</h2>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
