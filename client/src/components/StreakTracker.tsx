import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flame, Trophy } from "lucide-react";

export default function StreakTracker() {
  const currentStreak = 7;
  const bestStreak = 12;
  const totalPosts = 45;

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const hasPost = Math.random() > 0.4;
    const isToday = i === 29;
    return { date, hasPost, isToday };
  });

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Flame className="w-6 h-6 text-primary" />
          Blog Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary" data-testid="text-current-streak">
              {currentStreak}
            </div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chart-2" data-testid="text-best-streak">
              {bestStreak}
            </div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chart-3" data-testid="text-total-posts">
              {totalPosts}
            </div>
            <div className="text-xs text-muted-foreground">Total Posts</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </h4>
          <div className="grid grid-cols-10 gap-2">
            {last30Days.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-sm ${
                  day.isToday
                    ? "bg-primary ring-2 ring-primary ring-offset-2"
                    : day.hasPost
                    ? "bg-chart-2"
                    : "bg-muted"
                }`}
                title={day.date.toLocaleDateString()}
                data-testid={`day-${index}`}
              />
            ))}
          </div>
        </div>

        {currentStreak >= 7 && (
          <div className="flex items-center gap-2 p-3 bg-accent/20 rounded-md">
            <Trophy className="w-5 h-5 text-chart-2" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Achievement Unlocked!</p>
              <p className="text-xs text-muted-foreground">7-day streak milestone</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
