import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PenTool, Upload, Smile, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emojiList = ["😊", "❤️", "🎨", "📸", "✨", "🌟", "🎭", "🖼️", "🌈", "🦋"];

export default function AddBlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { toast } = useToast();

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleEmojiClick = (emoji: string) => {
    setContent(content + emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Blog Post Created!",
      description: "Your artistic creation has been saved.",
    });
    setTitle("");
    setContent("");
    setTags([]);
  };

  return (
    <Card className="border-2 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-2xl">
          <PenTool className="w-6 h-6 text-primary" />
          Create New Blog Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              data-testid="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a beautiful title..."
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <div className="relative">
              <Textarea
                id="content"
                data-testid="input-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Pour your thoughts here..."
                rows={10}
                className="resize-none"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                data-testid="button-emoji-picker"
                className="absolute bottom-2 right-2"
              >
                <Smile className="w-4 h-4" />
              </Button>
              
              {showEmojiPicker && (
                <div className="absolute bottom-12 right-2 p-2 bg-popover border rounded-md shadow-lg grid grid-cols-5 gap-2 z-10">
                  {emojiList.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl hover-elevate active-elevate-2 p-2 rounded"
                      data-testid={`emoji-${index}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Image Upload</Label>
            <div className="border-2 border-dashed rounded-md p-8 text-center hover-elevate transition-all cursor-pointer" data-testid="upload-area">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
                data-testid="input-tag"
              />
              <Button type="button" variant="outline" onClick={handleAddTag} data-testid="button-add-tag">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1" data-testid={`badge-${tag}`}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" data-testid="button-publish" className="w-full">
            Publish Blog Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
