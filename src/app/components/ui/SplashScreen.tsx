import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("vibe_district_splash_seen");
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("vibe_district_splash_seen", "true");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* VIBE Drops */}
            <div className="flex gap-2 mb-2">
              {"VIBE".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-7xl md:text-9xl font-black font-bebas text-[#FAF8F5] leading-none"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* DISTRICT Tracks In */}
            <motion.div
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.2em", opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="text-sm md:text-xl font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-8"
            >
              DISTRICT
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="text-[10px] md:text-xs font-medium text-[#D4AF37]/60 tracking-[0.4em] uppercase text-center"
            >
              The Fashion Street
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-1 bg-[#D4183D]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
