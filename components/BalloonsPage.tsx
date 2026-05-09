'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Balloon from './Balloon';
import PolaroidModal from './PolaroidModal';
import { BalloonData } from '@/data/siteContent';

interface BalloonsPageProps {
  balloons: BalloonData[];
  senderName: string;
}

export default function BalloonsPage({ balloons, senderName }: BalloonsPageProps) {
  const [poppedIds, setPoppedIds] = useState<Set<string>>(new Set());
  const [activeBalloon, setActiveBalloon] = useState<BalloonData | null>(null);

  const handlePop = (id: string) => {
    setPoppedIds((prev) => new Set([...prev, id]));
    const b = balloons.find((b) => b.id === id);
    if (b) setActiveBalloon(b);
  };

  const handleNext = () => {
    const remaining = balloons.filter((b) => !poppedIds.has(b.id) && b.id !== activeBalloon?.id);
    setActiveBalloon(null);
    if (remaining.length > 0) {
      // Small delay before popping next
      setTimeout(() => {
        const next = remaining[0];
        setPoppedIds((prev) => new Set([...prev, next.id]));
        setActiveBalloon(next);
      }, 300);
    }
  };

  const remainingCount = balloons.filter((b) => !poppedIds.has(b.id)).length;
  const allPopped = remainingCount === 0;

  return (
    <section className="min-h-screen flex flex-col items-center px-4 py-24 relative">
      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-playfair mb-3"
            style={{
              fontSize: 'clamp(32px, 8vw, 52px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Pop the Balloons 🎈
          </motion.h2>
          <motion.p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '18px',
              fontStyle: 'italic',
              color: 'rgba(61,44,44,0.6)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Each one holds a little surprise — tap to reveal
          </motion.p>

          {/* Progress */}
          {balloons.length > 0 && (
            <motion.div
              className="mt-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {balloons.map((b) => (
                <motion.div
                  key={b.id}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: poppedIds.has(b.id)
                      ? 'linear-gradient(135deg, #c96b6b, #d4a853)'
                      : 'rgba(201, 107, 107, 0.2)',
                    border: poppedIds.has(b.id) ? 'none' : '1.5px solid rgba(201,107,107,0.3)',
                  }}
                  animate={poppedIds.has(b.id) ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />
              ))}
              <span
                className="text-sm ml-1"
                style={{ color: 'rgba(61,44,44,0.5)', fontFamily: 'Poppins, sans-serif' }}
              >
                {poppedIds.size}/{balloons.length}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Balloons grid */}
        {!allPopped ? (
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {balloons.map((balloon, i) => (
              <Balloon
                key={balloon.id}
                balloon={balloon}
                index={i}
                senderName={senderName}
                onPop={handlePop}
                isPopped={poppedIds.has(balloon.id)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              🎉
            </motion.div>
            <h3
              className="font-playfair mb-3"
              style={{
                fontSize: '32px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              All surprises revealed!
            </h3>
            <p style={{ color: 'rgba(61,44,44,0.6)', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontStyle: 'italic' }}>
              Every balloon was filled with so much love 💕
            </p>
          </motion.div>
        )}
      </div>

      {/* Polaroid Modal */}
      {activeBalloon && (
        <PolaroidModal
          balloon={activeBalloon}
          senderName={senderName}
          onClose={() => setActiveBalloon(null)}
          onNext={handleNext}
          hasMore={balloons.filter((b) => !poppedIds.has(b.id)).length > 0}
        />
      )}
    </section>
  );
}
