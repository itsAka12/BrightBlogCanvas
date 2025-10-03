import { Link, useLocation } from "wouter";
import { Home, PenTool, Images, Lightbulb, Gamepad2 } from "lucide-react";
import RedBalloonLogo from "./RedBalloonLogo";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/add-blog", label: "Add Blog", icon: PenTool },
    { path: "/gallery", label: "Gallery", icon: Images },
    { path: "/motivation", label: "Motivation", icon: Lightbulb },
    { path: "/games", label: "Games", icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-home">
            <RedBalloonLogo size="sm" animate={false} />
            <span className="font-display text-xl font-bold text-primary">
              My Bright Blog
            </span>
          </a>
        </Link>

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
