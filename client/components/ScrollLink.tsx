import { Link, type LinkProps } from "react-router-dom";
import { scrollAfterNavigation } from "@/components/ScrollToTop";

function isSamePageHashLink(to: LinkProps["to"]): boolean {
  if (typeof to !== "string" || !to.includes("#")) return false;
  const url = new URL(to, window.location.origin);
  return Boolean(url.hash) && url.pathname === window.location.pathname;
}

export function ScrollLink({ onClick, to, ...props }: LinkProps) {
  return (
    <Link
      to={to}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (isSamePageHashLink(to)) return;
        scrollAfterNavigation();
      }}
    />
  );
}
