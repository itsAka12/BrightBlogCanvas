import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Flame, Trophy } from "lucide-react";

export default function StreakTracker() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [last30Days, setLast30Days] = useState([]);

  useEffect(() => {
    async function fetchStreakData() {
      try {
        const res = await fetch("/api/streak");
        if (res.ok) {
          const data = await res.json();
          setCurrentStreak(data.streak);
        }
        const postsRes = await fetch("/api/blogs");
        if (postsRes.ok) {
          const posts = await postsRes.json();
          setTotalPosts(posts.length);

          // Calculate best streak
          let best = 0;
          let current = 1;
          const sortedDates = posts
            .map((p) => new Date(p.date))
            .sort((a, b) => a.getTime() - b.getTime());

          for (let i = 1; i < sortedDates.length; i++) {
            const diff = (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
              current++;
            } else if (diff > 1) {
              best = Math.max(best, current);
              current = 1;
            }
          }
          best = Math.max(best, current);
          setBestStreak(best);

          // Last 30 days posts
          const today = new Date();
          const days = Array.from({ length: 30 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (29 - i));
            const hasPost = posts.some((p) => {
              const postDate = new Date(p.date);
              return postDate.toDateString() === date.toDateString();
            });
            const isToday = i === 29;
            return { date, hasPost, isToday };
          });
          setLast30Days(days);
        }
      } catch (error) {
        console.error("Failed to fetch streak data", error);
      }
    }

    fetchStreakData();

    const interval = setInterval(fetchStreakData, 60000);
    return () => clearInterval(interval);
  }, []);

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
