import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  id: string;
  title: string;
  content?: string;
  image?: string;
  tags: string[];
  date: string | Date;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

export default function BlogCard({ id, title, content, image, tags, date, onDelete, onClick }: BlogCardProps) {
  const excerpt = content ? content.slice(0, 100) + (content.length > 100 ? "..." : "") : "";

  return (
    <Card
      className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer"
      data-testid={`card-blog-${id}`}
      onClick={onClick}
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <CardContent className="p-4">
        <h3 className="font-display text-xl font-semibold mb-2 line-clamp-2" data-testid={`text-blog-title-${id}`}>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {(Array.isArray(tags) ? tags : []).map((tag, index) => (
            <Badge key={index} variant="secondary" data-testid={`badge-tag-${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{format(new Date(date), "MMM d, yyyy")}</span>
        </div>

        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            data-testid={`button-delete-${id}`}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
