import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./components/auth/AuthPage";
import RoleSelector from "./components/auth/RoleSelector";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import TouristDashboard from "./pages/TouristDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-foreground text-lg">Loading SafeGuard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (!userRole) {
    return <RoleSelector />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tourist" element={<TouristDashboard />} />
        <Route path="/police" element={<PoliceDashboard />} />
        <Route path="/incidents" element={<PoliceDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
