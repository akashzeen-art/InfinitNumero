import { MARQUEE_GAMES } from "./constants";

export function PreloaderMarquee() {
  return (
    <div className="absolute top-0 inset-x-0 py-4 overflow-hidden opacity-50 pointer-events-none">
      <div className="flex gap-6 animate-preloader-ticker w-max">
        {MARQUEE_GAMES.map((g, i) => (
          <div key={`${g.name}-${i}`} className="flex items-center gap-2 shrink-0">
            <img
              src={g.thumbnail_url}
              alt=""
              className="w-8 h-8 rounded-lg object-cover border border-white/10"
            />
            <span className="text-[10px] font-bold text-violet-300/90 uppercase tracking-widest">
              {g.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
