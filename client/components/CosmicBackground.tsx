import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-mobile";

/** Fixed cosmic starfield + nebula backdrop for the whole site. */
export function CosmicBackground() {
  const reduced = useReducedMotion();

  const stars = useMemo(
    () =>
      Array.from({ length: reduced ? 40 : 90 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
        delay: `${(i % 12) * 0.35}s`,
        duration: `${2.8 + (i % 5) * 0.7}s`,
      })),
    [reduced],
  );

  return (
    <div className="cosmic-bg" aria-hidden="true">
      <div className="cosmic-nebula cosmic-nebula-a" />
      <div className="cosmic-nebula cosmic-nebula-b" />
      <div className="cosmic-nebula cosmic-nebula-c" />
      <div className="cosmic-dust" />
      <div className="cosmic-stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="cosmic-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: reduced ? "0s" : s.delay,
              animationDuration: reduced ? "0s" : s.duration,
            }}
          />
        ))}
      </div>
      {!reduced && <div className="cosmic-shooting" />}
      <div className="cosmic-vignette" />
    </div>
  );
}
