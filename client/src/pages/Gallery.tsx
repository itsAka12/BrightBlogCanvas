import { useState, useEffect } from "react";
import MasonryGallery from "@/components/MasonryGallery";
import { Images } from "lucide-react";
import image1 from "@assets/generated_images/Creative_workspace_blog_image_3cb123df.png";
import image2 from "@assets/generated_images/Abstract_art_blog_featured_image_aa8df5a9.png";
import image3 from "@assets/generated_images/Van_Gogh_landscape_blog_image_c3951796.png";
import image4 from "@assets/generated_images/Sunset_ocean_blog_featured_image_3d2f9a22.png";
import heroImage from "@assets/generated_images/Van_Gogh_swirl_hero_background_400d33bf.png";

export default function Gallery() {
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setUploadedImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const staticImages = [
    { url: image1, title: "Creative Workspace" },
    { url: image2, title: "Abstract Art" },
    { url: image3, title: "Van Gogh Landscape" },
    { url: image4, title: "Sunset Ocean" },
    { url: heroImage, title: "Van Gogh Swirls" },
  ];

  const allImages = [...staticImages, ...uploadedImages];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Images className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            A curated collection of artistic photography and visual inspiration
          </p>
        </div>

        <MasonryGallery images={allImages} />
      </div>
    </div>
  );
}
