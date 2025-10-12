import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import AddBlog from "@/pages/AddBlog";
import Gallery from "@/pages/Gallery";
import Motivation from "@/pages/Motivation";
import Games from "@/pages/Games";
import BlogDetail from "@/pages/BlogDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/add-blog" component={AddBlog} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/motivation" component={Motivation} />
      <Route path="/games" component={Games} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
