import BlogCard from "../BlogCard";
import blogImage1 from "@assets/generated_images/Creative_workspace_blog_image_3cb123df.png";

export default function BlogCardExample() {
  const handleDelete = (id: string) => {
    console.log("Delete blog:", id);
  };

  return (
    <div className="max-w-sm">
      <BlogCard
        id="1"
        title="The Art of Creative Writing"
        excerpt="Exploring the beautiful intersection between visual art and written expression. How Van Gogh's brushstrokes inspire my words."
        image={blogImage1}
        tags={["creativity", "writing", "art"]}
        date={new Date()}
        onDelete={handleDelete}
      />
    </div>
  );
}
