'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  shape: 'circle' | 'petal' | 'star' | 'heart';
  driftX: number;
  driftY: number;
  rotation: number;
}

const PETAL_COLORS = [
  '#ffb7c5', '#ffd4b3', '#e8a0a0', '#c9a8e0',
  '#f5d592', '#a8e6cf', '#ff9a8b', '#fce4ec',
];

const SHAPES = ['circle', 'petal', 'star', 'heart'] as const;

function StarShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HeartShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PetalShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <ellipse cx="12" cy="12" rx="5" ry="10" />
    </svg>
  );
}

interface FloatingPetalsProps {
  count?: number;
  intensity?: 'light' | 'medium' | 'heavy';
  includeSparkles?: boolean;
}

export default function FloatingPetals({
  count = 20,
  intensity = 'medium',
  includeSparkles = true,
}: FloatingPetalsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const baseCount = intensity === 'light' ? count * 0.5 : intensity === 'heavy' ? count * 1.5 : count;
    const generated: Particle[] = Array.from({ length: Math.round(baseCount) }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -20,
      size: Math.random() * 14 + 8,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      driftX: (Math.random() - 0.5) * 200,
      driftY: Math.random() * 100 + 80,
      rotation: Math.random() * 720 - 360,
    }));
    setParticles(generated);
  }, [count, intensity]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [`${p.y}vh`, `${p.y + p.driftY + 120}vh`],
            x: [`0px`, `${p.driftX}px`],
            rotate: [0, p.rotation],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.shape === 'circle' && (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.color,
                opacity: 0.6,
              }}
            />
          )}
          {p.shape === 'petal' && <PetalShape size={p.size} color={p.color} />}
          {p.shape === 'star' && includeSparkles && <StarShape size={p.size * 0.7} color={p.color} />}
          {p.shape === 'heart' && <HeartShape size={p.size * 0.8} color={p.color} />}
        </motion.div>
      ))}
    </div>
  );
}
