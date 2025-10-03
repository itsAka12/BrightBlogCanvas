import MiniGames from "@/components/MiniGames";
import { Gamepad2 } from "lucide-react";

export default function Games() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-4">Mini Games</h1>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            Take a creative break with fun interactive games
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <MiniGames />
        </div>
      </div>
    </div>
  );
}
