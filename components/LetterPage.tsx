'use client';

import { motion } from 'framer-motion';
import { SiteContent, DEFAULT_FINAL_MESSAGE } from '@/data/siteContent';

interface LetterPageProps {
  content: SiteContent;
}

export default function LetterPage({ content }: LetterPageProps) {
  const message = content.finalMessage || DEFAULT_FINAL_MESSAGE;
  const paragraphs = message.split('\n\n').filter(Boolean);

  return (
    <section className="min-h-screen flex flex-col items-center px-4 py-24 relative">
      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(61,44,44,0.45)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            A Letter Written Just For You
          </motion.p>

          <motion.h2
            className="font-playfair mt-3"
            style={{
              fontSize: 'clamp(36px, 9vw, 56px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            With All My Love
          </motion.h2>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        >
          {/* Paper shadows */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'white',
              transform: 'rotate(2deg) translateY(4px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              opacity: 0.6,
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'white',
              transform: 'rotate(-1deg) translateY(2px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              opacity: 0.7,
            }}
          />

          {/* Main Letter */}
          <div
            className="relative rounded-2xl paper-texture overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #fffef9 0%, #fff9f5 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(212, 168, 83, 0.15)',
            }}
          >
            {/* Left margin line */}
            <div
              className="absolute left-14 top-0 bottom-0 w-px"
              style={{ background: 'rgba(201, 107, 107, 0.12)' }}
            />

            {/* Hole punches */}
            <div className="absolute left-5 top-12 w-5 h-5 rounded-full" style={{ background: 'rgba(0,0,0,0.04)' }} />
            <div className="absolute left-5 top-1/2 w-5 h-5 rounded-full" style={{ background: 'rgba(0,0,0,0.04)' }} />
            <div className="absolute left-5 bottom-12 w-5 h-5 rounded-full" style={{ background: 'rgba(0,0,0,0.04)' }} />

            <div className="px-8 sm:px-16 py-12 notebook-lines">
              {/* Date */}
              <motion.p
                className="text-right text-sm mb-8"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  color: 'rgba(61,44,44,0.4)',
                  fontStyle: 'italic',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Mother's Day, May 2026
              </motion.p>

              {/* Greeting */}
              <motion.p
                className="mb-6"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#c96b6b',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                My dearest {content.motherName},
              </motion.p>

              {/* Letter content */}
              <div className="space-y-5">
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '18px',
                      lineHeight: 1.8,
                      color: '#3d2c2c',
                      fontWeight: 400,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div
                className="mt-10 text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', color: 'rgba(61,44,44,0.6)', fontStyle: 'italic' }}>
                  With all my love,
                </p>
                <p
                  className="font-playfair mt-1"
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {content.senderName}
                </p>
                <motion.p
                  className="mt-2 text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌸
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer quote */}
        <motion.p
          className="text-center mt-10"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '16px',
            fontStyle: 'italic',
            color: 'rgba(61,44,44,0.4)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          "A mother's love is the fuel that enables a normal human being to do the impossible."
        </motion.p>
      </div>
    </section>
  );
}
