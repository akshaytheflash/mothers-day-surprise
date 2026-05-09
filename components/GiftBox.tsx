'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
  onOpen: () => void;
}

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'opening' | 'open'>('idle');
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate sparkle positions
    const s = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      delay: Math.random() * 0.5,
    }));
    setSparkles(s);
  }, []);

  const handleClick = useCallback(async () => {
    if (isOpening) return;
    setIsOpening(true);
    setPhase('shaking');

    await new Promise((r) => setTimeout(r, 600));
    setPhase('opening');

    // Confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#e8a0a0', '#ffd4b3', '#c9a8e0', '#f5d592', '#ffb7c5', '#fff'],
        ticks: 200,
      });
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { y: 0.5, x: 0.3 },
        colors: ['#c96b6b', '#d4a853', '#9b72c8'],
        ticks: 200,
      });
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { y: 0.5, x: 0.7 },
        colors: ['#56b487', '#5bacd4', '#e05d4b'],
        ticks: 200,
      });
    }, 300);

    await new Promise((r) => setTimeout(r, 800));
    setPhase('open');

    await new Promise((r) => setTimeout(r, 600));
    onOpen();
  }, [isOpening, onOpen]);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Sparkles around box */}
      <div className="relative">
        <AnimatePresence>
          {phase === 'opening' &&
            sparkles.map((s) => (
              <motion.div
                key={s.id}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                style={{
                  background: `hsl(${Math.random() * 60 + 330}, 70%, 70%)`,
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: s.x,
                  y: s.y,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.8, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
        </AnimatePresence>

        {/* Gift Box Container */}
        <motion.div
          className="relative cursor-pointer"
          animate={
            phase === 'shaking'
              ? { rotate: [-3, 3, -3, 3, -2, 2, 0], x: [-4, 4, -4, 4, 0] }
              : phase === 'opening' || phase === 'open'
              ? { scale: [1, 1.05, 0.98, 1] }
              : {}
          }
          transition={{ duration: 0.5 }}
          onClick={handleClick}
          whileHover={phase === 'idle' ? { scale: 1.05 } : {}}
          whileTap={phase === 'idle' ? { scale: 0.97 } : {}}
        >
          {/* Box Lid */}
          <motion.div
            className="relative z-10"
            animate={
              phase === 'opening' || phase === 'open'
                ? { y: -80, rotate: -20, opacity: 0 }
                : { y: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Lid */}
            <div
              className="w-52 h-16 rounded-t-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #e8a0a0 0%, #c96b6b 100%)',
                boxShadow: '0 4px 20px rgba(201, 107, 107, 0.4)',
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 shimmer"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Lid top stripe */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              />
            </div>
          </motion.div>

          {/* Box Body */}
          <motion.div
            className="w-52 h-44 rounded-b-2xl relative overflow-hidden -mt-1"
            style={{
              background: 'linear-gradient(160deg, #f5a0a0 0%, #d4607a 100%)',
              boxShadow: '0 16px 50px rgba(201, 107, 107, 0.35), 0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Vertical ribbon */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.2))' }}
            />

            {/* Horizontal ribbon */}
            <div
              className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.35), rgba(255,255,255,0.2))' }}
            />

            {/* Center bow dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/40" />

            {/* Gift icon */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌸
            </motion.div>
          </motion.div>

          {/* Bow */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
            animate={
              phase === 'opening' || phase === 'open'
                ? { y: -60, scale: 0, opacity: 0 }
                : { y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative flex items-center justify-center">
              {/* Left loop */}
              <div
                className="w-12 h-10 rounded-full absolute -left-5"
                style={{
                  background: 'linear-gradient(135deg, #f5d0d0, #e8a0a0)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  transform: 'rotate(-20deg)',
                  boxShadow: '2px 2px 8px rgba(201, 107, 107, 0.3)',
                }}
              />
              {/* Right loop */}
              <div
                className="w-12 h-10 rounded-full absolute -right-5"
                style={{
                  background: 'linear-gradient(135deg, #e8a0a0, #f5d0d0)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  transform: 'rotate(20deg)',
                  boxShadow: '-2px 2px 8px rgba(201, 107, 107, 0.3)',
                }}
              />
              {/* Center knot */}
              <div
                className="w-7 h-7 rounded-full z-10"
                style={{
                  background: 'linear-gradient(135deg, #fff, #ffd4d4)',
                  boxShadow: '0 2px 8px rgba(201, 107, 107, 0.4)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating animation when idle */}
      <motion.div
        animate={phase === 'idle' ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-0"
      />
    </div>
  );
}
