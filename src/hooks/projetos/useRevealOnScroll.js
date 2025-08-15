import { useEffect, useRef, useState } from "react";

export default function useRevealOnScroll(options = {}) {
  const { threshold = 0.2, root = null, rootMargin = "0px" } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, root, rootMargin]);

  return { ref, isVisible };
}
