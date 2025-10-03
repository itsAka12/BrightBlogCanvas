import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quotes = [
  { text: "I dream my painting and I paint my dream.", author: "Vincent van Gogh" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "What would life be if we had no courage to attempt anything?", author: "Vincent van Gogh" },
  { text: "I feel that there is nothing more truly artistic than to love people.", author: "Vincent van Gogh" },
  { text: "The way to know life is to love many things.", author: "Vincent van Gogh" },
];

export default function MotivationQuote() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const currentQuote = quotes[currentQuoteIndex];
  const isFavorite = favorites.includes(currentQuoteIndex);

  const handleNext = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((i) => i !== currentQuoteIndex));
      toast({ description: "Removed from favorites" });
    } else {
      setFavorites([...favorites, currentQuoteIndex]);
      toast({ description: "Added to favorites" });
    }
  };

  return (
    <Card className="border-2 max-w-2xl mx-auto">
      <CardContent className="p-8 text-center space-y-6">
        <Quote className="w-12 h-12 text-primary mx-auto opacity-50" />
        
        <div>
          <p className="font-serif text-2xl italic mb-4" data-testid="text-quote">
            "{currentQuote.text}"
          </p>
          <p className="text-muted-foreground font-display" data-testid="text-author">
            — {currentQuote.author}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFavorite}
            data-testid="button-favorite"
            className={isFavorite ? "text-destructive" : ""}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          
          <Button
            variant="default"
            onClick={handleNext}
            data-testid="button-next-quote"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
