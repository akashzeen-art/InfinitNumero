import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./components/preloader";
import { GamePlayer } from "./components/GamePlayer";
import { GamePlayerProvider } from "./contexts/GamePlayerContext";
import { AIProfileProvider } from "./context/AIProfileContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { user, isLoading } = useAuth();
  const [showPreloader, setShowPreloader] = useState(true);

  // Show nothing while checking auth token
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#05020f" }}>
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <div style={{ opacity: showPreloader ? 0 : 1, transition: "opacity 0.6s ease" }}>
        <AIProfileProvider>
          <GamePlayerProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:category" element={<Categories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GamePlayer />
          </GamePlayerProvider>
        </AIProfileProvider>
      </div>
    </>
  );
}

function LoginRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
