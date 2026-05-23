import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { GamesHub } from "@/components/home/GamesHub";
import { PlayCtaBanner } from "@/components/home/PlayCtaBanner";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="page-shell mesh-bg">
      <Navbar onSearch={setSearchQuery} />
      <Hero />
      <GamesHub searchQuery={searchQuery} />
      <PlayCtaBanner />
      <Footer />
    </div>
  );
}
