import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Neo-Mystical Technomancy Design Philosophy:
// - Sacred geometry as structural foundation
// - Layered depth through translucency and blur
// - Deep indigo (#0F0B1F) with luminous cyan (#00D9FF), gold (#FFB800), violet (#9D4EDD)
// - Radial emanation layout inspired by Kabbalistic Tree of Life
// - Cinzel serif for mystical headers, JetBrains Mono for technical data, Inter for body

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
