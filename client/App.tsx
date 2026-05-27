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
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { user, isLoading } = useAuth();
  const [showPreloader, setShowPreloader] = useState(true);

  if (isLoading) return null; // wait for auth check before rendering anything

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <div style={{ opacity: showPreloader ? 0 : 1, transition: "opacity 0.6s ease" }}>
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
      </div>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <AIProfileProvider>
            <Routes>
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
          </AIProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Redirect to home if already logged in
function LoginRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}

createRoot(document.getElementById("root")!).render(<App />);
