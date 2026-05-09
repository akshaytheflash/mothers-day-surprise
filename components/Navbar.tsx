'use client';

import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'balloons', label: 'Balloons', emoji: '🎈' },
  { id: 'letter', label: 'Letter', emoji: '💌' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50"
      style={{ transform: 'translateX(-50%)' }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255, 255, 255, 0.5)',
          boxShadow:
            '0 8px 32px rgba(201, 107, 107, 0.12), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                color: isActive ? '#fff' : 'rgba(61, 44, 44, 0.7)',
                fontFamily: 'Poppins, sans-serif',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #c96b6b, #d4a853)',
                    boxShadow: '0 4px 16px rgba(201, 107, 107, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-base leading-none">{item.emoji}</span>
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
