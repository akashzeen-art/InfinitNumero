import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Preloader } from "./components/preloader";
import { GamePlayer } from "./components/GamePlayer";
import { GamePlayerProvider } from "./contexts/GamePlayerContext";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  // Preloader runs on every page load / refresh
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <BrowserRouter>
          <GamePlayerProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:category" element={<Categories />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GamePlayer />
          </GamePlayerProvider>
        </BrowserRouter>
      </motion.div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
