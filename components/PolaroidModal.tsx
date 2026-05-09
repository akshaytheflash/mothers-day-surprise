'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BalloonData } from '@/data/siteContent';
import Image from 'next/image';

interface PolaroidModalProps {
  balloon: BalloonData | null;
  senderName: string;
  onClose: () => void;
  onNext: () => void;
  hasMore: boolean;
}

export default function PolaroidModal({
  balloon,
  senderName,
  onClose,
  onNext,
  hasMore,
}: PolaroidModalProps) {
  if (!balloon) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'rgba(61, 44, 44, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full"
          initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          exit={{ scale: 0.7, opacity: 0, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Polaroid Card */}
          <div className="relative">
            {/* Tape strip */}
            <div className="tape" />

            <div
              className="bg-white rounded-sm relative"
              style={{
                padding: '16px 16px 60px 16px',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.04)',
                maxWidth: 300,
                width: '100%',
              }}
            >
              {/* Photo area */}
              <div
                className="w-full aspect-square rounded-sm overflow-hidden mb-4 relative"
                style={{
                  background: 'linear-gradient(135deg, #fce4ec, #f3e5f5)',
                  minHeight: 220,
                }}
              >
                {balloon.image ? (
                  <img
                    src={balloon.image}
                    alt="Memory"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <motion.span
                      className="text-7xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🌸
                    </motion.span>
                    <p
                      className="text-sm text-center px-4"
                      style={{ color: 'rgba(61,44,44,0.5)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      A memory with love
                    </p>
                  </div>
                )}

                {/* Glossy overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Message */}
              <div className="text-center space-y-3 px-2">
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '17px',
                    color: '#3d2c2c',
                    fontStyle: 'italic',
                  }}
                >
                  "{balloon.message}"
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: 'rgba(61,44,44,0.55)',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                  }}
                >
                  — With love from {senderName} 🌺
                </p>
              </div>

              {/* Decorative corner dots */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-rose-200" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-rose-200" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {hasMore && (
              <motion.button
                onClick={onNext}
                className="btn-premium w-full text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🎈 Pop Another Balloon
              </motion.button>
            )}
            <motion.button
              onClick={onClose}
              className="w-full py-3 rounded-full text-sm font-medium text-center"
              style={{
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.5)',
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'Poppins, sans-serif',
              }}
              whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Close ✕
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
