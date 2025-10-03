import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MasonryGalleryProps {
  images: { url: string; title: string }[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid cursor-pointer hover-elevate rounded-md overflow-hidden transition-all"
            onClick={() => setLightboxImage(image.url)}
            data-testid={`image-gallery-${index}`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setLightboxImage(null)}
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </Button>
          <img
            src={lightboxImage}
            alt="Lightbox"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
}
