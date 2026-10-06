"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Preloader } from "./Preloader";
import { SmoothScroll } from "./SmoothScroll";

const IntroContext = createContext(true);

/** True once the branded intro has finished (or was skipped). Hero animations wait for it. */
export const useIntroDone = () => useContext(IntroContext);

/** `reducedMotion="user"` makes every Framer Motion transform respect prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const done = useCallback(() => setIntroDone(true), []);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
      <IntroContext.Provider value={introDone}>
        <SmoothScroll />
        <Preloader onDone={done} />
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}
