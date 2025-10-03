import MotivationQuote from "@/components/MotivationQuote";
import { Lightbulb } from "lucide-react";

export default function Motivation() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold mb-4">Daily Motivation</h1>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            Words of wisdom to inspire your creative journey
          </p>
        </div>

        <MotivationQuote />
      </div>
    </div>
  );
}
