import { cn } from "@/lib/utils";
import { CATEGORY_FILTER_CONFIG } from "@/lib/game-utils";

interface CategoryFilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  counts?: Record<string, number>;
}

export function CategoryFilterBar({
  categories,
  selected,
  onSelect,
  counts,
}: CategoryFilterBarProps) {
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
                  ? "gradient-purple-pink text-white shadow-lg shadow-purple-500/30 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md"
              )}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{cat}</span>
              {counts?.[cat] !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md font-bold tabular-nums",
                    active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
                  )}
                >
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
