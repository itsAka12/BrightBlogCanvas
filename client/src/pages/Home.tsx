import { useState } from "react";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import BlogCard from "@/components/BlogCard";
import ContactForm from "@/components/ContactForm";
import StreakTracker from "@/components/StreakTracker";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import image1 from "@assets/generated_images/Creative_workspace_blog_image_3cb123df.png";
import image2 from "@assets/generated_images/Abstract_art_blog_featured_image_aa8df5a9.png";
import image3 from "@assets/generated_images/Van_Gogh_landscape_blog_image_c3951796.png";
import image4 from "@assets/generated_images/Sunset_ocean_blog_featured_image_3d2f9a22.png";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: "1",
      title: "The Art of Creative Writing",
      excerpt: "Exploring the beautiful intersection between visual art and written expression. How Van Gogh's brushstrokes inspire my words and creative process.",
      image: image1,
      tags: ["creativity", "writing", "art"],
      date: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Colors That Speak",
      excerpt: "A journey through the emotional palette of impressionism. Understanding how crimson reds and golden yellows convey feelings beyond words.",
      image: image2,
      tags: ["color theory", "art", "emotion"],
      date: new Date("2024-01-12"),
    },
    {
      id: "3",
      title: "Capturing Nature's Beauty",
      excerpt: "Photography tips inspired by landscape masters. Learning to see the world through an artist's eye and capturing fleeting moments of beauty.",
      image: image3,
      tags: ["photography", "nature", "inspiration"],
      date: new Date("2024-01-10"),
    },
    {
      id: "4",
      title: "Sunset Reflections",
      excerpt: "Finding peace in the golden hour. How the changing light teaches us about transitions, endings, and new beginnings in our creative journey.",
      image: image4,
      tags: ["reflection", "photography", "peace"],
      date: new Date("2024-01-08"),
    },
  ];

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    console.log("Delete post:", id);
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
              <BlogCard key={post.id} {...post} onDelete={handleDelete} />
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
