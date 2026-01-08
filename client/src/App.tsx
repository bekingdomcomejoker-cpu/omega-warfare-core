import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Suspense, lazy } from "react";

// Lazy load page components for better performance
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const PayloadBuilder = lazy(() => import("@/pages/PayloadBuilder"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Search = lazy(() => import("@/pages/Search"));
const PayloadTesting = lazy(() => import("@/pages/PayloadTesting"));
const ThroneDashboard = lazy(() => import("@/pages/ThroneDashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mb-4"></div>
        <p className="text-slate-300">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path={"/"}>
        <Home />
      </Route>
      <Route path={"/dashboard"}>
        <Dashboard />
      </Route>
      <Route path={"/analytics"}>
        <Analytics />
      </Route>
      <Route path={"/payload-builder"}>
        <PayloadBuilder />
      </Route>
      <Route path={"/notifications"}>
        <Notifications />
      </Route>
      <Route path={"/search"}>
        <Search />
      </Route>
      <Route path={"/payload-testing"}>
        <PayloadTesting />
      </Route>
      <Route path={"/throne"}>
        <ThroneDashboard />
      </Route>
      <Route path={"/404"}>
        <NotFound />
      </Route>
      {/* Fallback route for undefined paths */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<LoadingFallback />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
