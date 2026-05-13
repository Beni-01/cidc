"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  padStart?: number;
}

export default function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 760,
  padStart = 0,
}: CountUpNumberProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const runAnimation = () => {
      if (hasAnimated.current) {
        return;
      }

      hasAnimated.current = true;
      const start = performance.now();

      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, target]);

  const displayValue = String(value).padStart(padStart, "0");

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
