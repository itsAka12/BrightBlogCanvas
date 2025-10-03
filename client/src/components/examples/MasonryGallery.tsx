import MasonryGallery from "../MasonryGallery";
import image1 from "@assets/generated_images/Creative_workspace_blog_image_3cb123df.png";
import image2 from "@assets/generated_images/Abstract_art_blog_featured_image_aa8df5a9.png";
import image3 from "@assets/generated_images/Van_Gogh_landscape_blog_image_c3951796.png";

export default function MasonryGalleryExample() {
  const images = [
    { url: image1, title: "Creative Workspace" },
    { url: image2, title: "Abstract Art" },
    { url: image3, title: "Van Gogh Landscape" },
    { url: image1, title: "Creative Workspace 2" },
  ];

  return <MasonryGallery images={images} />;
}
