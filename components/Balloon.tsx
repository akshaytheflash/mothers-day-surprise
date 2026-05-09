'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { getBalloonGradient, getBalloonHighlight } from '@/lib/utils';
import { BalloonData } from '@/data/siteContent';
import confetti from 'canvas-confetti';

interface BalloonProps {
  balloon: BalloonData;
  index: number;
  senderName: string;
  onPop: (id: string) => void;
  isPopped: boolean;
}

function BalloonSVG({ color, gradient }: { color: string; gradient: string }) {
  const highlight = getBalloonHighlight(color);
  return (
    <svg
      viewBox="0 0 80 110"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))' }}
    >
      {/* Balloon body */}
      <defs>
        <radialGradient id={`grad-${color}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="50%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={`body-${color}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color === 'rose' ? '#e8a0a0' : color === 'peach' ? '#ffd4b3' : color === 'lavender' ? '#c9a8e0' : color === 'sky' ? '#a8d8f0' : color === 'mint' ? '#a8e6cf' : color === 'gold' ? '#f5d592' : '#ff9a8b'} />
          <stop offset="100%" stopColor={color === 'rose' ? '#c96b6b' : color === 'peach' ? '#f5a077' : color === 'lavender' ? '#9b72c8' : color === 'sky' ? '#5bacd4' : color === 'mint' ? '#56b487' : color === 'gold' ? '#d4a853' : '#e05d4b'} />
        </linearGradient>
      </defs>

      {/* Balloon shape */}
      <ellipse cx="40" cy="42" rx="32" ry="38" fill={`url(#body-${color})`} />
      {/* Highlight */}
      <ellipse cx="40" cy="42" rx="32" ry="38" fill={`url(#grad-${color})`} />
      {/* Shine spot */}
      <ellipse cx="28" cy="28" rx="8" ry="10" fill="rgba(255,255,255,0.35)" />

      {/* Knot */}
      <ellipse cx="40" cy="81" rx="4" ry="3" fill={color === 'rose' ? '#c96b6b' : color === 'peach' ? '#f5a077' : '#9b72c8'} />

      {/* String */}
      <path
        d="M 40 84 Q 45 95 40 108"
        stroke="rgba(61,44,44,0.3)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PopParticle({ color, angle }: { color: string; angle: number }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 60 + Math.random() * 40;
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none"
      style={{ background: color, transformOrigin: 'center' }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        scale: 0,
        opacity: 0,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  );
}

export default function Balloon({ balloon, index, senderName, onPop, isPopped }: BalloonProps) {
  const [showPopParticles, setShowPopParticles] = useState(false);
  const gradient = getBalloonGradient(balloon.color);

  const floatDuration = 3 + (index % 3) * 0.7;
  const floatDelay = index * 0.3;

  const handlePop = useCallback(() => {
    if (isPopped) return;
    setShowPopParticles(true);

    // Micro-confetti
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.5, x: 0.3 + index * 0.1 },
      colors: ['#e8a0a0', '#ffd4b3', '#c9a8e0', '#f5d592', '#fff'],
      ticks: 100,
      gravity: 1.5,
    });

    setTimeout(() => {
      onPop(balloon.id);
    }, 300);
  }, [isPopped, onPop, balloon.id, index]);

  return (
    <AnimatePresence>
      {!isPopped && (
        <motion.div
          key={balloon.id}
          className="relative flex flex-col items-center cursor-pointer"
          style={{ width: 90, flexShrink: 0 }}
          initial={{ scale: 0, opacity: 0, y: 60 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{ scale: 0, opacity: 0, y: -40 }}
          transition={{
            delay: index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handlePop}
        >
          {/* Floating animation wrapper */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: floatDuration,
              delay: floatDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-20 h-28 relative"
          >
            <BalloonSVG color={balloon.color} gradient={gradient} />

            {/* Pop particles */}
            {showPopParticles && (
              <>
                {Array.from({ length: 8 }, (_, i) => (
                  <PopParticle
                    key={i}
                    color={getBalloonHighlight(balloon.color).replace('0.6)', '1)')}
                    angle={i * 45}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Tap hint */}
          <motion.p
            className="text-xs mt-1 font-medium"
            style={{ color: 'rgba(61,44,44,0.5)', fontFamily: 'Poppins, sans-serif' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap!
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
