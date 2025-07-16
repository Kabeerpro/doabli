import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Tasks from "@/pages/tasks";
import CalendarPage from "@/pages/calendar";
import PagesPage from "@/pages/pages";
import Sidebar from "@/components/sidebar";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={AuthenticatedApp} />
          <Route path="/tasks" component={AuthenticatedApp} />
          <Route path="/calendar" component={AuthenticatedApp} />
          <Route path="/pages" component={AuthenticatedApp} />
          <Route path="/views" component={AuthenticatedApp} />
          <Route path="/automations" component={AuthenticatedApp} />
          <Route path="/projects/:id" component={AuthenticatedApp} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const [location] = useLocation();
  
  const getPageComponent = () => {
    switch (location) {
      case "/":
        return <Dashboard />;
      case "/tasks":
        return <Tasks />;
      case "/calendar":
        return <CalendarPage />;
      case "/pages":
        return <PagesPage />;
      case "/views":
        return <div className="p-6"><h1>Views - Coming Soon</h1></div>;
      case "/automations":
        return <div className="p-6"><h1>Automations - Coming Soon</h1></div>;
      default:
        if (location.startsWith("/projects/")) {
          return <div className="p-6"><h1>Project View - Coming Soon</h1></div>;
        }
        return <NotFound />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {getPageComponent()}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
