import heroBackground from "@assets/generated_images/Van_Gogh_swirl_hero_background_400d33bf.png";
import RedBalloonLogo from "./RedBalloonLogo";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToBio = () => {
    document.getElementById("bio-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      <div className="absolute top-10 right-10 opacity-20">
        <div className="animate-swirl">
          <svg className="w-32 h-32 text-primary" viewBox="0 0 100 100">
            <path
              d="M50,10 Q70,30 50,50 Q30,70 50,90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <RedBalloonLogo size="lg" />
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Welcome to <span className="text-primary">My Bright Blog</span>
        </h1>
        
        <p className="font-serif text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A personal space for creative thoughts, artistic photography, and daily inspiration.
          Painted with the spirit of Van Gogh.
        </p>

        <Button 
          variant="default" 
          size="lg" 
          onClick={scrollToBio}
          data-testid="button-explore"
          className="gap-2"
        >
          Explore My World
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
