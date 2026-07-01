import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export function forceScrollToTop() {
  const html = document.documentElement;
  const body = document.body;
  const prevHtmlBehavior = html.style.scrollBehavior;
  const prevBodyBehavior = body.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";

  const scrollRoot = document.scrollingElement ?? html;
  scrollRoot.scrollTop = 0;
  html.scrollTop = 0;
  body.scrollTop = 0;

  const root = document.getElementById("root");
  if (root) root.scrollTop = 0;

  window.scrollTo(0, 0);

  html.style.scrollBehavior = prevHtmlBehavior;
  body.style.scrollBehavior = prevBodyBehavior;
}

export function scheduleScrollToTop() {
  forceScrollToTop();

  const rafId = requestAnimationFrame(() => {
    forceScrollToTop();
    requestAnimationFrame(forceScrollToTop);
  });

  const timeoutIds = [0, 50, 150, 300].map((delay) =>
    window.setTimeout(forceScrollToTop, delay),
  );

  return () => {
    cancelAnimationFrame(rafId);
    timeoutIds.forEach(window.clearTimeout);
  };
}

/** Call from navigation links (footer, navbar, etc.). */
export function scrollAfterNavigation() {
  scheduleScrollToTop();
}

function useScrollOnRouteChange() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) return;
    return scheduleScrollToTop();
  }, [pathname, hash, key]);
}

/** Mount once inside the router — sets up browser scroll restoration. */
export function ScrollToTop() {
  useScrollOnRouteChange();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      scheduleScrollToTop();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}

/** Wraps page routes so scroll resets when the active screen changes. */
export function ScrollLayout() {
  useScrollOnRouteChange();
  return <Outlet />;
}
