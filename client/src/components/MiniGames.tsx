import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, RefreshCw } from "lucide-react";

export default function MiniGames() {
  const [memoryCards, setMemoryCards] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: ["bg-primary", "bg-chart-2", "bg-chart-3", "bg-destructive"][Math.floor(i / 2)],
      flipped: false,
      matched: false,
    }))
  );

  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (memoryCards[index].flipped || memoryCards[index].matched) return;
    if (flippedIndices.length >= 2) return;

    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].color === memoryCards[second].color) {
        setTimeout(() => {
          const updatedCards = [...memoryCards];
          updatedCards[first].matched = true;
          updatedCards[second].matched = true;
          setMemoryCards(updatedCards);
          setFlippedIndices([]);
        }, 500);
      } else {
        setTimeout(() => {
          const updatedCards = [...memoryCards];
          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setMemoryCards(updatedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffled = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: ["bg-primary", "bg-chart-2", "bg-chart-3", "bg-destructive"][Math.floor(i / 2)],
      flipped: false,
      matched: false,
    })).sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedIndices([]);
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-display">
            <Gamepad2 className="w-6 h-6 text-primary" />
            Memory Card Game
          </CardTitle>
          <Button variant="outline" size="sm" onClick={resetGame} data-testid="button-reset-game">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          {memoryCards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-md transition-all hover-elevate active-elevate-2 ${
                card.flipped || card.matched
                  ? card.color
                  : "bg-muted"
              } ${card.matched ? "opacity-50" : ""}`}
              data-testid={`card-${index}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
