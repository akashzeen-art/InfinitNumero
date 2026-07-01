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

function scheduleScrollToTop() {
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

let globalListenersAttached = false;

function useGlobalScrollListeners() {
  useEffect(() => {
    if (globalListenersAttached) return;
    globalListenersAttached = true;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      scheduleScrollToTop();
    };

    const onLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
        forceScrollToTop();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("click", onLinkClick, true);

    return () => {
      globalListenersAttached = false;
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("click", onLinkClick, true);
    };
  }, []);
}

function useScrollToTopOnNavigate() {
  const { pathname, hash, key } = useLocation();

  useGlobalScrollListeners();

  useEffect(() => {
    if (hash) return;
    return scheduleScrollToTop();
  }, [pathname, hash, key]);
}

/** Route layout — scrolls to top whenever the active page changes. */
export function ScrollLayout() {
  useScrollToTopOnNavigate();
  return <Outlet />;
}

/** Mount once near the router (listeners + scroll on navigation). */
export function ScrollToTop() {
  useScrollToTopOnNavigate();
  return null;
}
