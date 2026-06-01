import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

interface GamesEmptyStateProps {
  onReset: () => void;
}

export function GamesEmptyState({ onReset }: GamesEmptyStateProps) {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden rounded-3xl p-12 sm:p-16 text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
        <Search className="w-8 h-8 text-violet-400" />
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold font-outfit text-white mb-2">
        {t.empty.title}
      </h3>
      <p className="text-white/40 mb-6 max-w-sm mx-auto">{t.empty.subtitle}</p>
      <Button
        variant="outline"
        className="rounded-xl text-violet-400 hover:text-white"
        style={{ border: "1px solid rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.1)" }}
        onClick={onReset}
      >
        {t.empty.reset}
      </Button>
    </div>
  );
}
