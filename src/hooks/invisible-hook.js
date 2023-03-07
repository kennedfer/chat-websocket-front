import { useEffect, useState } from "react";

export const useIsInvisible = (ref) => {
  const [isInvisible, setIsInvisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInvisible(!entry.isIntersecting);
    });

    if (!ref.current) return setIsInvisible(false);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return !isInvisible;
};
