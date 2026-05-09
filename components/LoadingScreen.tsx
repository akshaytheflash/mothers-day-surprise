'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setShow(false), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #fff0f5 0%, #ffe8d6 50%, #f9e8ff 100%)',
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Petals ring */}
          <div className="relative flex items-center justify-center mb-8">
            {['🌸', '🌺', '🌹', '🌷', '💐', '🌸'].map((p, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{
                  transform: `rotate(${i * 60}deg) translateY(-50px)`,
                }}
                animate={
                  phase >= 1
                    ? {
                        rotate: [`${i * 60}deg`, `${i * 60 + 360}deg`],
                        opacity: [0, 1, 1],
                      }
                    : { opacity: 0 }
                }
                transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              >
                {p}
              </motion.span>
            ))}

            {/* Center icon */}
            <motion.div
              className="text-5xl"
              animate={
                phase >= 1
                  ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }
                  : { scale: 0.8, opacity: 0.5 }
              }
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              💝
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-playfair"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {phase >= 2 ? 'With love ❤️' : 'Loading your surprise...'}
            </p>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '15px',
                fontStyle: 'italic',
                color: 'rgba(61,44,44,0.5)',
                marginTop: 8,
              }}
            >
              Mother's Day · May 2026
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
            style={{ width: 160, height: 3, background: 'rgba(201,107,107,0.15)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #c96b6b, #d4a853)' }}
              animate={{ width: phase === 0 ? '20%' : phase === 1 ? '70%' : '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
