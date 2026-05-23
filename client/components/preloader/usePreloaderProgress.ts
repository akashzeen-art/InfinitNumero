import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gamesData } from "@/data/games";
import {
  MIN_DISPLAY_MS,
  PRELOAD_URLS,
  PRELOADER_STEPS,
  TOTAL_GAMES,
  FEATURED_GAMES,
} from "./constants";

async function preloadImagesWithProgress(
  urls: string[],
  onProgress: (loaded: number, total: number) => void
) {
  let loaded = 0;
  const total = urls.length;
  onProgress(0, total);

  await Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          const done = () => {
            loaded += 1;
            onProgress(loaded, total);
            resolve();
          };
          img.onload = done;
          img.onerror = done;
          img.src = url;
        })
    )
  );
}

export function usePreloaderProgress(onComplete: () => void) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const finishedRef = useRef(false);
  const imagesLoadedRef = useRef(0);

  const loadedGames = useMemo(
    () => Math.min(TOTAL_GAMES, Math.floor((progress / 100) * TOTAL_GAMES)),
    [progress]
  );

  const featuredIndex = useMemo(() => {
    if (FEATURED_GAMES.length === 0) return 0;
    return Math.min(
      FEATURED_GAMES.length - 1,
      Math.floor((progress / 100) * FEATURED_GAMES.length)
    );
  }, [progress]);

  const featuredGame = FEATURED_GAMES[featuredIndex] ?? gamesData[0];

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);
    setStep(PRELOADER_STEPS.length - 1);
    setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 950);
    }, 350);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (canSkip && !finishedRef.current) finish();
  }, [canSkip, finish]);

  useEffect(() => {
    const skipTimer = setTimeout(() => setCanSkip(true), 1600);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    let frame: number;
    let cancelled = false;
    const t0 = Date.now();

    const run = async () => {
      const tick = () => {
        if (cancelled) return;
        const elapsed = Date.now() - t0;
        const timePct = Math.min(elapsed / MIN_DISPLAY_MS, 0.9) * 48;
        const imgPct = Math.floor((imagesLoadedRef.current / PRELOAD_URLS.length) * 42);
        const combined = Math.min(90, Math.floor(timePct + imgPct));
        setProgress(combined);
        setStep(
          Math.min(Math.floor((combined / 100) * PRELOADER_STEPS.length), PRELOADER_STEPS.length - 1)
        );
        if (elapsed < MIN_DISPLAY_MS) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      await Promise.all([
        preloadImagesWithProgress(PRELOAD_URLS, (loaded) => {
          if (!cancelled) {
            imagesLoadedRef.current = loaded;
            setImagesLoaded(loaded);
          }
        }),
        new Promise((r) => setTimeout(r, MIN_DISPLAY_MS)),
      ]);
      if (cancelled) return;

      const t1 = Date.now();
      const ramp = () => {
        if (cancelled) return;
        const p = Math.min((Date.now() - t1) / 480, 1);
        setProgress(Math.floor(90 + p * 10));
        if (p < 1) frame = requestAnimationFrame(ramp);
        else finish();
      };
      frame = requestAnimationFrame(ramp);
    };

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [finish]);

  return {
    progress,
    step,
    exiting,
    canSkip,
    imagesLoaded,
    loadedGames,
    featuredGame,
    featuredIndex,
    handleSkip,
  };
}
