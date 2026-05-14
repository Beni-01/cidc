"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SmoothCursor.module.scss";

const interactiveSelector = [
  "a",
  "button",
  "summary",
  "select",
  "label",
  "[role='button']",
  "input[type='button']",
  "input[type='checkbox']",
  "input[type='radio']",
  "input[type='submit']",
].join(",");

const textSelector = "input:not([type='button']):not([type='checkbox']):not([type='radio']):not([type='submit']), textarea, [contenteditable='true']";

export default function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncEnabled() {
      setIsEnabled(pointerQuery.matches && !reducedMotionQuery.matches);
    }

    syncEnabled();
    pointerQuery.addEventListener("change", syncEnabled);
    reducedMotionQuery.addEventListener("change", syncEnabled);

    return () => {
      pointerQuery.removeEventListener("change", syncEnabled);
      reducedMotionQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let animationFrame = 0;

    function handlePointerMove(event: PointerEvent) {
      target.current = { x: event.clientX, y: event.clientY };
      setIsVisible(true);

      const element = event.target instanceof Element ? event.target : null;
      setIsInteractive(Boolean(element?.closest(interactiveSelector)));
      setIsText(Boolean(element?.closest(textSelector)));

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
    }

    function handlePointerLeave() {
      setIsVisible(false);
    }

    function animate() {
      const easing = isInteractive ? 0.28 : 0.18;
      current.current.x += (target.current.x - current.current.x) * easing;
      current.current.y += (target.current.y - current.current.y) * easing;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = requestAnimationFrame(animate);
    }

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [isEnabled, isInteractive]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className={[
          styles.cursor,
          isVisible ? styles.visible : "",
          isInteractive ? styles.interactive : "",
          isText ? styles.text : "",
        ].join(" ")}
        ref={cursorRef}
      />
      <span
        aria-hidden="true"
        className={[
          styles.dot,
          isVisible ? styles.visible : "",
          isInteractive ? styles.interactive : "",
          isText ? styles.text : "",
        ].join(" ")}
        ref={dotRef}
      />
    </>
  );
}
