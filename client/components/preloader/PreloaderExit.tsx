import { motion, AnimatePresence } from "framer-motion";

interface PreloaderExitProps {
  exiting: boolean;
}

export function PreloaderExit({ exiting }: PreloaderExitProps) {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.55) 0%, transparent 65%)",
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={
          exiting
            ? { width: "300vmax", height: "300vmax", opacity: [1, 0] }
            : { width: 0, height: 0, opacity: 0 }
        }
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-300/50 pointer-events-none z-30"
        animate={
          exiting
            ? { width: "240vmax", height: "240vmax", opacity: [0.8, 0], borderWidth: 0 }
            : { width: 0, height: 0, opacity: 0 }
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence>
        {exiting &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-[42%] z-30 w-2 h-2 rounded-full gradient-brand pointer-events-none"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i / 20) * Math.PI * 2) * (100 + (i % 4) * 35),
                y: Math.sin((i / 20) * Math.PI * 2) * (100 + (i % 4) * 35),
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.025 }}
            />
          ))}
      </AnimatePresence>
    </>
  );
}
