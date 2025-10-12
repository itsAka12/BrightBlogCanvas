import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

export default function BlogDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Blog Not Found</h1>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span>{format(new Date(blog.date), "MMMM d, yyyy")}</span>
            <div className="flex gap-2">
              {(Array.isArray(blog.tags) ? blog.tags : []).map((tag: string, index: number) => (
                <span key={index} className="bg-secondary px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
            </div>
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            )}
          </header>

          <div className="whitespace-pre-wrap">{blog.content}</div>
        </article>
      </div>
    </div>
  );
}
