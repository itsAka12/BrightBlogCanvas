import { Card, CardContent } from "@/components/ui/card";
import { User, Palette, Camera, Heart } from "lucide-react";

export default function Bio() {
  const interests = [
    { icon: Palette, text: "Artistic Expression" },
    { icon: Camera, text: "Photography" },
    { icon: Heart, text: "Creative Writing" },
  ];

  return (
    <section id="bio-section" className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <User className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            A creative soul inspired by Van Gogh's swirling skies and vibrant colors.
            I blend art, words, and photography to tell stories that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {interests.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover-elevate transition-all">
                <CardContent className="p-6 text-center">
                  <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-lg font-semibold">{item.text}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
