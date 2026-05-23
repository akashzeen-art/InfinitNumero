import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  linkTo?: string;
  linkLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  iconClassName,
  linkTo,
  linkLabel = "See all",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8", className)}>
      <div className="flex items-start gap-4">
        {Icon && (
          <div
            className={cn(
              "shrink-0 p-3 rounded-2xl text-white shadow-lg",
              iconClassName ?? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/25"
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1 text-sm sm:text-base">{subtitle}</p>}
        </div>
      </div>
      {linkTo && (
        <Link to={linkTo} className="btn-ghost self-start sm:self-auto">
          {linkLabel}
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
