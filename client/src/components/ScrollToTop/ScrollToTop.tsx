import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // remove '#'
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // 100ms delay to ensure DOM is ready
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
