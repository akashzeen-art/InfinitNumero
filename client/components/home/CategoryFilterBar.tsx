import { cn } from "@/lib/utils";
import { CATEGORY_FILTER_CONFIG } from "@/lib/game-utils";

interface CategoryFilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  counts?: Record<string, number>;
}

export function CategoryFilterBar({ categories, selected, onSelect, counts }: CategoryFilterBarProps) {
  return (
    <div className="overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      <div className="flex gap-2 min-w-max">
        {categories.map((cat) => {
          const config = CATEGORY_FILTER_CONFIG[cat];
          const Icon = config?.icon;
          const active = selected === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelect(cat)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                active
                  ? "text-white scale-105"
                  : "text-white/45 hover:text-white/80 hover:scale-[1.02]"
              )}
              style={active ? {
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
                border: "1px solid rgba(139,92,246,0.5)",
              } : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{cat}</span>
              {counts?.[cat] !== undefined && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-md font-bold tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-white/8 text-white/30"
                )}>
                  {counts[cat]}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
