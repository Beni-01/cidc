"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/features/shared/hooks/useScrollAnimation";
import styles from "./AnimatedSection.module.scss";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInDown" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn" | "softZoom";
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  threshold,
  rootMargin,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin });

  const animationClass = styles[animation];

  return (
    <div
      ref={ref}
      className={`${styles.animatedSection} ${animationClass} ${isVisible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
