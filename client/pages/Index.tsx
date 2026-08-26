import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { GamesHub } from "@/components/home/GamesHub";
import { PlayCtaBanner } from "@/components/home/PlayCtaBanner";
import { CosmicBackground } from "@/components/CosmicBackground";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="page-shell">
      <CosmicBackground />
      <div className="relative z-10">
        <Navbar onSearch={setSearchQuery} />
        <Hero />
        <GamesHub searchQuery={searchQuery} />
        <PlayCtaBanner />
        <Footer />
      </div>
    </div>
  );
}
