import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GamesEmptyStateProps {
  onReset: () => void;
}

export function GamesEmptyState({ onReset }: GamesEmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/30 p-12 sm:p-16 text-center">
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-5">
        <Search className="w-8 h-8 text-violet-500" />
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold font-outfit text-gray-900 mb-2">
        No games found
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Try another search term or pick a different category.
      </p>
      <Button
        variant="outline"
        className="rounded-xl border-violet-200 text-violet-700 hover:bg-violet-50"
        onClick={onReset}
      >
        Reset filters
      </Button>
    </div>
  );
}
