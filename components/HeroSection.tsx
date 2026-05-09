'use client';

import { motion } from 'framer-motion';
import { SiteContent } from '@/data/siteContent';

interface HeroSectionProps {
  content: SiteContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative">
      <motion.div
        className="flex flex-col items-center gap-8 text-center max-w-lg w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top badge */}
        <motion.div variants={itemVariants}>
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255,255,255,0.7)',
              color: '#c96b6b',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 4px 20px rgba(201, 107, 107, 0.1)',
            }}
          >
            <span>🌺</span>
            <span>Mother's Day · May 2026</span>
            <span>🌺</span>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div variants={itemVariants} className="relative">
          {/* Outer decorative ring */}
          <motion.div
            className="absolute inset-0 rounded-full animate-rotate-ring"
            style={{
              background:
                'conic-gradient(from 0deg, #e8a0a0, #ffd4b3, #c9a8e0, #f5d592, #e8a0a0)',
              padding: 3,
              margin: -16,
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-0 rounded-full animate-rotate-ring-reverse"
            style={{
              border: '2px dashed rgba(212, 168, 83, 0.4)',
              margin: -8,
              borderRadius: '50%',
            }}
          />

          {/* Photo container */}
          <motion.div
            className="relative z-10 rounded-full overflow-hidden animate-pulse-glow"
            style={{
              width: 200,
              height: 200,
              background: 'linear-gradient(135deg, #fce4ec, #f3e5f5, #fff3e0)',
              border: '4px solid rgba(255,255,255,0.9)',
              boxShadow: '0 20px 60px rgba(201, 107, 107, 0.25)',
            }}
          >
            {content.heroPhoto ? (
              <img
                src={content.heroPhoto}
                alt={content.motherName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <motion.span
                  className="text-6xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌸
                </motion.span>
                <span
                  className="text-xs"
                  style={{ color: 'rgba(201, 107, 107, 0.7)', fontFamily: 'Poppins, sans-serif' }}
                >
                  Add a photo
                </span>
              </div>
            )}
          </motion.div>

          {/* Floating flower particles around image */}
          {['🌸', '🌺', '💕', '✨', '🌷'].map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-lg pointer-events-none select-none"
              style={{
                top: `${15 + i * 18}%`,
                left: i % 2 === 0 ? '-35px' : 'calc(100% + 10px)',
              }}
              animate={{
                y: [0, -12, 0],
                rotate: [-10, 10, -10],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                delay: i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '16px',
            fontStyle: 'italic',
            color: 'rgba(61,44,44,0.6)',
            letterSpacing: '0.5px',
          }}
        >
          To the woman who is my entire world
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-playfair"
          style={{
            fontSize: 'clamp(52px, 12vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #c96b6b, #d4a853, #c96b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
          }}
        >
          {content.motherName}
        </motion.h1>

        {/* Celebrated card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card-premium px-8 py-4 cursor-default"
        >
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '15px',
              color: '#c96b6b',
              letterSpacing: '0.3px',
            }}
          >
            Celebrated & Endlessly Loved 🌺
          </p>
        </motion.div>

        {/* Sender signature */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '14px',
            color: 'rgba(61,44,44,0.45)',
            fontStyle: 'italic',
          }}
        >
          — made with love by {content.senderName}
        </motion.p>
      </motion.div>
    </section>
  );
}
