'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { getDisplayContent } from '@/lib/utils';
import { SiteContent } from '@/data/siteContent';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingPetals from '@/components/FloatingPetals';
import GiftBox from '@/components/GiftBox';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BalloonsPage from '@/components/BalloonsPage';
import LetterPage from '@/components/LetterPage';
import CustomizeForm from '@/components/CustomizeForm';

type AppMode = 'loading' | 'landing' | 'surprise' | 'customize';
type SurpriseSection = 'home' | 'balloons' | 'letter';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeInOut' as const } },
};

export default function Home() {
  const [mode, setMode] = useState<AppMode>('loading');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeSection, setActiveSection] = useState<SurpriseSection>('home');
  const [isViewingData, setIsViewingData] = useState(false);

  useEffect(() => {
    // Check if URL has data param (mother viewing)
    const params = new URLSearchParams(window.location.search);
    const hasData = params.has('data');
    const isCustomize = params.has('customize');

    const c = getDisplayContent();
    setContent(c);
    setIsViewingData(hasData);

    const timer = setTimeout(() => {
      if (isCustomize) {
        setMode('customize');
      } else if (hasData) {
        setMode('landing');
      } else {
        setMode('customize');
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => {
    setMode('surprise');
  }, []);

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section as SurpriseSection);
  }, []);

  if (!content && mode !== 'loading') return null;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #ffe8d6 35%, #fff5e6 65%, #f9e8ff 100%)' }}
    >
      {/* Loading */}
      {mode === 'loading' && <LoadingScreen />}

      {/* Floating petals — always visible after loading */}
      {mode !== 'loading' && (
        <FloatingPetals count={18} intensity="medium" includeSparkles />
      )}

      <AnimatePresence mode="wait">
        {/* ============ CUSTOMIZE MODE ============ */}
        {mode === 'customize' && (
          <motion.div key="customize" variants={pageVariants} initial="initial" animate="enter" exit="exit">
            {/* Sticky top bar */}
            <div
              className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between"
              style={{
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌸</span>
                <span
                  className="font-playfair font-semibold"
                  style={{ fontSize: '16px', color: '#c96b6b' }}
                >
                  Mother's Day
                </span>
              </div>
              {isViewingData && (
                <button
                  onClick={() => setMode('landing')}
                  className="text-sm px-4 py-1.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Preview →
                </button>
              )}
            </div>
            <div className="pt-14">
              <CustomizeForm />
            </div>
          </motion.div>
        )}

        {/* ============ LANDING — GIFT BOX ============ */}
        {mode === 'landing' && content && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="min-h-screen flex flex-col items-center justify-center px-4 relative"
          >
            {/* Sparkle ambient */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: ['#e8a0a0', '#ffd4b3', '#c9a8e0', '#f5d592'][i % 4],
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="flex flex-col items-center gap-8 text-center z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Date badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(255,255,255,0.7)',
                    color: '#c96b6b',
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow: '0 4px 20px rgba(201,107,107,0.12)',
                  }}
                >
                  🌺 Mother's Day · May 2026 🌺
                </div>
              </motion.div>

              {/* Gift Box */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <GiftBox onOpen={handleOpen} />
              </motion.div>

              {/* Text */}
              <div className="space-y-2">
                <motion.p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: 'rgba(61,44,44,0.55)',
                  }}
                >
                  Made with love
                </motion.p>
                <motion.h1
                  className="font-playfair"
                  style={{
                    fontSize: 'clamp(28px, 7vw, 42px)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  A surprise just for you, {content.motherName} 💝
                </motion.h1>
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleOpen}
                className="btn-premium text-lg px-10 py-4"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ['0 4px 20px rgba(201,107,107,0.35)', '0 8px 40px rgba(201,107,107,0.55)', '0 4px 20px rgba(201,107,107,0.35)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎁 Open Your Surprise
              </motion.button>

              <p
                className="text-xs"
                style={{ color: 'rgba(61,44,44,0.35)', fontFamily: 'Poppins, sans-serif' }}
              >
                Or click the gift box above
              </p>
            </motion.div>

            {/* Bottom: Make your own */}
            <motion.button
              onClick={() => setMode('customize')}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full"
              style={{
                color: 'rgba(61,44,44,0.4)',
                fontFamily: 'Poppins, sans-serif',
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
              whileHover={{ color: '#c96b6b', scale: 1.02 }}
            >
              🌸 Make your own surprise
            </motion.button>
          </motion.div>
        )}

        {/* ============ SURPRISE EXPERIENCE ============ */}
        {mode === 'surprise' && content && (
          <motion.div key="surprise" variants={pageVariants} initial="initial" animate="enter" exit="exit">
            <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

            <AnimatePresence mode="wait">
              {activeSection === 'home' && (
                <motion.div key="home" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                  <HeroSection content={content} />
                </motion.div>
              )}
              {activeSection === 'balloons' && (
                <motion.div key="balloons" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                  <BalloonsPage balloons={content.balloons} senderName={content.senderName} />
                </motion.div>
              )}
              {activeSection === 'letter' && (
                <motion.div key="letter" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                  <LetterPage content={content} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom nav hint */}
            <motion.div
              className="fixed bottom-6 right-6 z-40"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
            >
              <button
                onClick={() => setMode('customize')}
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  color: '#c96b6b',
                }}
                title="Make your own"
              >
                ✏️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
